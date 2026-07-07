/**
 * Integrationstests für die Lead-Pipeline (public/api/submit.php).
 *
 * Der echte PHP-Code läuft in einem `php -S`-Server; Boomerang, Salesflare und
 * Telegram sind durch einen lokalen Mock ersetzt (siehe harness.mjs).
 *
 * Getestet wird der komplette Vertrag:
 *   Formular-Payload → Validierung → Salesflare (CRM) → Telegram (Alert)
 *   → Boomerang (Demo-Karte) → Response mit Wallet-Links.
 */
import { test, before, after, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import { startMockUpstream, startPhpServer, CANNED_CARD, TEST_KEYS } from './harness.mjs'

let mock, php

before(async () => {
  mock = await startMockUpstream()
  // Rate-Limit im Haupt-Server aus (die Suite feuert viele Requests von 127.0.0.1).
  php = await startPhpServer(mock.url, { RATE_LIMIT_MAX: '0' })
})

after(async () => {
  php?.close()
  await mock?.close()
})

beforeEach(() => mock.reset())

/** Standard-Payload, wie LeadForm.tsx ihn abschickt */
function standardLead(overrides = {}) {
  return {
    vorname: 'Testkunde',
    instagram: 'test_laden',
    telefon: '0170 5551234',
    email: 'test@example.com',
    niche: 'café',
    city: 'köln',
    mode: 'standard',
    source: 'standard',
    utm: {
      utm_source: 'bonuskarte.digital',
      utm_medium: 'landing-page',
      utm_campaign: 'koeln-nippes-cafes',
    },
    ...overrides,
  }
}

// ── HTTP-Grundvertrag ─────────────────────────────────────────────────────────

test('OPTIONS (CORS-Preflight) → 204', async () => {
  const res = await fetch(`${php.url}/api/submit.php`, { method: 'OPTIONS' })
  assert.equal(res.status, 204)
})

test('GET → 405 Method Not Allowed', async () => {
  const res = await fetch(`${php.url}/api/submit.php`)
  assert.equal(res.status, 405)
})

test('ungültiges JSON → 400, keine Upstream-Calls', async () => {
  const res = await php.submit('this is not json')
  assert.equal(res.status, 400)
  assert.equal(mock.state.requests.length, 0)
})

test('fehlender Vorname → 400 mit deutscher Fehlermeldung', async () => {
  const res = await php.submit(standardLead({ vorname: '' }))
  assert.equal(res.status, 400)
  const json = await res.json()
  assert.match(json.error, /Name ist erforderlich/)
  assert.equal(mock.state.requests.length, 0, 'kein Lead darf ohne Namen ins CRM')
})

test('weder E-Mail noch Telefon → 400', async () => {
  const res = await php.submit(standardLead({ telefon: '', email: '', kontakt: '' }))
  assert.equal(res.status, 400)
  const json = await res.json()
  assert.match(json.error, /E-Mail oder Telefon/)
})

// ── Happy Path: die komplette Pipeline ────────────────────────────────────────

test('Standard-Lead: Salesflare → Telegram → Boomerang, in dieser Reihenfolge', async () => {
  const res = await php.submit(standardLead())
  assert.equal(res.status, 200)
  const json = await res.json()
  assert.equal(json.success, true)

  const paths = mock.state.requests.map((r) => `${r.method} ${r.path}`)
  assert.deepEqual(paths, [
    'GET /contacts', // Dedup-Lookup (findet nichts → legt neu an)
    'POST /accounts',
    'POST /contacts',
    'POST /opportunities',
    `POST /bot${TEST_KEYS.TELEGRAM_BOT_TOKEN}/sendMessage`,
    'POST /api/v2/customers',
    'POST /api/v2/cards',
  ])
})

test('Standard-Lead: Response enthält alle Wallet-Links mit UTM-Parametern', async () => {
  const res = await php.submit(standardLead())
  const json = await res.json()

  for (const link of [json.installLink, json.shareLink, json.directInstallLink.universal, json.directInstallLink.apple, json.directInstallLink.google]) {
    assert.match(link, /utm_source=bonuskarte\.digital/)
    assert.match(link, /utm_campaign=koeln-nippes-cafes/)
  }
  // qrLink wird bewusst NICHT mit UTM versehen (ist ein Bild)
  assert.equal(json.qrLink, CANNED_CARD.qrLink)
})

test('Boomerang-Customer erhält Name, E-Mail, Telefon + korrekten API-Key', async () => {
  await php.submit(standardLead())
  const [customer] = mock.sent('/api/v2/customers')
  assert.equal(customer.headers['x-api-key'], TEST_KEYS.BOOMERANG_API_KEY)
  assert.equal(customer.body.firstName, 'Testkunde')
  assert.equal(customer.body.email, 'test@example.com')
  assert.equal(customer.body.phone, '0170 5551234')
})

test('Salesflare: Account, Kontakt und Opportunity korrekt verknüpft und getaggt', async () => {
  await php.submit(standardLead())

  const [account] = mock.sent('/accounts')
  assert.equal(account.headers['authorization'], `Bearer ${TEST_KEYS.SALESFLARE_API_KEY}`)
  assert.equal(account.body.name, '@test_laden')
  assert.deepEqual(account.body.tags, ['cafe', 'koeln', 'koeln-nippes-cafes'])
  assert.equal(account.body.phone_numbers[0].number, '0170 5551234')
  assert.equal(account.body.social_profiles[0].username, 'test_laden')

  const [contact] = mock.sent('/contacts', 'POST')
  assert.equal(contact.body.firstname, 'Testkunde')
  assert.equal(contact.body.email, 'test@example.com', 'E-Mail muss im CRM-Kontakt landen')
  assert.equal(contact.body.account, 9001, 'Kontakt muss am Account hängen')

  const [opp] = mock.sent('/opportunities')
  assert.equal(opp.body.account, 9001)
  assert.match(opp.body.name, /Café · @test_laden · \/koeln\/nippes\/cafes/)
})

test('Telegram-Alert: enthält Lead-Daten + fertigen wa.me-Link (0… → 49…)', async () => {
  await php.submit(standardLead())
  const [tg] = mock.sent('/bot')
  assert.equal(tg.body.chat_id, TEST_KEYS.TELEGRAM_CHAT_ID)
  assert.match(tg.body.text, /Neuer Lead/)
  assert.match(tg.body.text, /Testkunde/)
  assert.match(tg.body.text, /test@example\.com/)
  assert.match(tg.body.text, /@test_laden/)
  assert.match(tg.body.text, /wa\.me\/491705551234/, 'führende 0 muss zu 49 werden')
})

// ── Nischen-Routing: jede Nische → richtiges Boomerang-Template ───────────────
// LeadForm sendet das Label (lowercased), das Gründer-Formular den Slug.
// BEIDE müssen auf dieselbe Template-ID auflösen — sonst bekommt der Lead
// die falsche Demo-Karte.

const NICHE_ROUTING = [
  // [gesendeter Wert, erwartete Template-ID]
  ['café', 1046392], ['cafés', 1046392], ['cafes', 1046392],
  ['döner', 1115375], ['doener', 1115375],
  ['pizzeria', 1115406], ['pizza', 1115406],
  ['restaurant', 1115409],
  ['eiscafé', 1060441], ['eiscafe', 1060441],
  ['bäckerei', 1115411], ['baeckerei', 1115411],
  ['friseur', 1115412],
  ['fitnessstudio', 1115413],
  ['yoga-studio', 1115414], ['yoga', 1115414],
  ['blumenladen', 1115415],
]

for (const [sent, templateId] of NICHE_ROUTING) {
  test(`Nischen-Routing: "${sent}" → Template ${templateId}`, async () => {
    await php.submit(standardLead({ niche: sent }))
    const [card] = mock.sent('/api/v2/cards')
    assert.ok(card, 'Karte muss erstellt werden')
    assert.equal(card.body.templateId, templateId)
  })
}

test('unbekannte Nische → Fallback-Template (Café), Lead geht nicht verloren', async () => {
  const res = await php.submit(standardLead({ niche: 'schreinerei' }))
  assert.equal((await res.json()).success, true)
  const [card] = mock.sent('/api/v2/cards')
  assert.equal(card.body.templateId, 1046392)
})

// ── Döner-Legacy-Felder (kontakt / ladenname) ────────────────────────────────

test('kontakt-Feld mit @ wird als E-Mail interpretiert', async () => {
  await php.submit({ vorname: 'Ali', kontakt: 'ali@doener.de', niche: 'doener', utm: {} })
  const [customer] = mock.sent('/api/v2/customers')
  assert.equal(customer.body.email, 'ali@doener.de')
  assert.equal(customer.body.phone, undefined)
})

test('kontakt-Feld mit Nummer wird als Telefon interpretiert', async () => {
  await php.submit({ vorname: 'Ali', kontakt: '0221 123456', niche: 'doener', utm: {} })
  const [customer] = mock.sent('/api/v2/customers')
  assert.equal(customer.body.phone, '0221 123456')
})

test('ladenname ersetzt fehlenden Vornamen', async () => {
  const res = await php.submit({ ladenname: 'Bestes Döner Haus', kontakt: '0221 99887', niche: 'doener', utm: {} })
  assert.equal((await res.json()).success, true)
  const [customer] = mock.sent('/api/v2/customers')
  assert.equal(customer.body.firstName, 'Bestes Döner Haus')
})

// ── Fehler-Resilienz: ein ausgefallenes System darf nie den Lead kosten ───────

test('Boomerang-Kunde existiert bereits (409) → Lookup per E-Mail, Karte wird trotzdem erstellt', async () => {
  mock.state.mode = 'customer409'
  const res = await php.submit(standardLead())
  assert.equal((await res.json()).success, true)

  const lookups = mock.sent('/api/v2/customers').filter((r) => r.method === 'GET')
  assert.equal(lookups.length, 1)
  assert.equal(lookups[0].query.email, 'test@example.com')
})

test('Boomerang komplett down → 500-Antwort, ABER Lead ist in Salesflare + Telegram gesichert', async () => {
  mock.state.mode = 'customerFail'
  const res = await php.submit(standardLead())
  assert.equal(res.status, 500, 'Nutzer sieht Fehler (kann es erneut versuchen)')

  assert.equal(mock.sent('/accounts', 'POST').length, 1, 'CRM hat den Lead trotzdem')
  assert.equal(mock.sent('/contacts', 'POST').length, 1)
  assert.equal(mock.sent('/bot').length, 1, 'Telegram-Alert ging trotzdem raus')
})

test('Salesflare down → Demo-Karte wird trotzdem erstellt (fire & forget)', async () => {
  mock.state.mode = 'salesflareFail'
  const res = await php.submit(standardLead())
  assert.equal(res.status, 200)
  assert.equal((await res.json()).success, true)
  assert.equal(mock.sent('/api/v2/cards').length, 1)
})

// ── Gründer- / Walk-in-Modus ─────────────────────────────────────────────────

test('Gründer-Walk-in: Salesflare-Tags enthalten gruender-100, lifetime, Stadt und walkin', async () => {
  await php.submit(standardLead({
    niche: 'pizza',
    mode: 'gruender',
    source: 'gruender_walkin',
    city: 'koeln',
    utm: { utm_campaign: 'koeln-walkin' },
  }))
  const [account] = mock.sent('/accounts')
  for (const tag of ['pizza', 'gruender-100', 'lifetime-100eur', 'koeln', 'walkin']) {
    assert.ok(account.body.tags.includes(tag), `Tag "${tag}" fehlt: ${JSON.stringify(account.body.tags)}`)
  }
  const [tg] = mock.sent('/bot')
  assert.match(tg.body.text, /Gründer/)
})

test('Gründer (nicht Walk-in): KEIN walkin-Tag', async () => {
  await php.submit(standardLead({ mode: 'gruender', source: 'gruender', city: 'koeln' }))
  const [account] = mock.sent('/accounts')
  assert.ok(!account.body.tags.includes('walkin'))
  assert.ok(account.body.tags.includes('gruender-100'))
})

// ── Frankreich / Lead-only-Modus ─────────────────────────────────────────────

test('FR-Lead (mode=lead): NUR Salesflare, kein Boomerang, keine Karte', async () => {
  const res = await php.submit({
    vorname: 'Marie',
    telefon: '06 12 34 56 78',
    instagram: 'boulangerie_marie',
    niche: 'boulangerie',
    lang: 'fr',
    mode: 'lead',
    arr: 'Paris 11e',
    utm: { utm_campaign: 'fr-paris-11e-boulangerie' },
  })
  assert.equal((await res.json()).success, true)

  assert.equal(mock.sent('/api/v2').length, 0, 'Boomerang darf für FR-Leads nicht angefasst werden')
  const [account] = mock.sent('/accounts')
  assert.deepEqual(account.body.tags, ['paris', 'lead-fr', 'boulangerie', 'fr-paris-11e-boulangerie'])
  const [opp] = mock.sent('/opportunities')
  assert.match(opp.body.name, /Boulangerie · Paris 11e/)
})

// ── UTM-Hygiene ──────────────────────────────────────────────────────────────

test('nur erlaubte UTM-Parameter werden an Wallet-Links angehängt', async () => {
  const res = await php.submit(standardLead({
    utm: {
      utm_source: 'google',
      utm_campaign: 'test',
      fbclid: 'fb123',
      gclid: 'EVIL',            // nicht in der Allowlist
      random_junk: 'nope',      // nicht in der Allowlist
    },
  }))
  const json = await res.json()
  assert.match(json.installLink, /fbclid=fb123/)
  assert.doesNotMatch(json.installLink, /gclid/)
  assert.doesNotMatch(json.installLink, /random_junk/)
})

// ── Dedup (früher offene Bugs, jetzt gefixt) ─────────────────────────────────

test('Dedup: existierender Kontakt (gleiche E-Mail) → kein zweiter Account/Kontakt/Opportunity', async () => {
  mock.state.mode = 'existingContact'
  const res = await php.submit(standardLead())
  assert.equal((await res.json()).success, true, 'Demo-Karte läuft trotzdem durch')

  assert.equal(mock.sent('/accounts', 'POST').length, 0, 'kein doppelter Account')
  assert.equal(mock.sent('/contacts', 'POST').length, 0, 'kein doppelter Kontakt')
  assert.equal(mock.sent('/opportunities', 'POST').length, 0, 'keine doppelte Opportunity')
  assert.equal(mock.sent('/api/v2/cards').length, 1, 'Boomerang-Karte kommt trotzdem')
})

// ── Honeypot & Rate-Limit (Spam-Schutz) ──────────────────────────────────────

test('Honeypot: ausgefülltes `website`-Feld → still verworfen, KEINE Upstream-Calls', async () => {
  const res = await php.submit(standardLead({ website: 'http://spam.example' }))
  assert.equal(res.status, 200)
  assert.equal((await res.json()).success, true, 'Bot sieht Fake-Erfolg (kein Retry-Anreiz)')
  assert.equal(mock.state.requests.length, 0, 'kein CRM, kein Telegram, kein Boomerang')
})

test('Rate-Limit: nach RATE_LIMIT_MAX Anfragen derselben IP → 429, Lead-Verarbeitung stoppt', async () => {
  const mock2 = await startMockUpstream()
  const php2 = await startPhpServer(mock2.url, {
    RATE_LIMIT_MAX: '3',
    RATE_LIMIT_WINDOW: '600',
    RATE_LIMIT_DIR: `/tmp/bk_rl_${Date.now()}_${process.pid}`,
  })
  try {
    for (let i = 0; i < 3; i++) {
      const ok = await php2.submit(standardLead())
      assert.equal(ok.status, 200, `Anfrage ${i + 1} muss durchgehen`)
    }
    const blocked = await php2.submit(standardLead())
    assert.equal(blocked.status, 429, '4. Anfrage muss geblockt werden')
    const before = mock2.state.requests.length
    await php2.submit(standardLead())
    assert.equal(mock2.state.requests.length, before, 'geblockte Anfrage darf keine Upstreams treffen')
  } finally {
    php2.close()
    await mock2.close()
  }
})
