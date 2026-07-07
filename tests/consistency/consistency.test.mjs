/**
 * Konsistenztests: verhindern, dass die Sales-Configs auseinanderdriften.
 *
 * Die Lead-Pipeline hat drei Stellen, die zueinander passen MÜSSEN:
 *   1. src/data/niches.ts        — was die Formulare senden (Label/Slug)
 *   2. public/api/submit.php     — Alias-Map + Boomerang-Template-IDs
 *   3. src/config/integrations.ts — Booking-URL (auch hardcodet in Seiten)
 *
 * Diese Tests parsen die Quelldateien und schlagen fehl, sobald jemand eine
 * Nische hinzufügt/umbenennt, ohne alle Stellen nachzuziehen.
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const read = (p) => readFileSync(path.join(ROOT, p), 'utf8')

// ── Parser ───────────────────────────────────────────────────────────────────

const submitPhp = read('public/api/submit.php')
const nichesTs = read('src/data/niches.ts')

/** TEMPLATE_IDS aus submit.php: { cafe: 1046392, … } */
function parseTemplateIds() {
  const block = submitPhp.match(/const TEMPLATE_IDS = \[([\s\S]*?)\];/)[1]
  const ids = {}
  for (const m of block.matchAll(/'([^']+)'\s*=>\s*(\d+)/g)) ids[m[1]] = Number(m[2])
  return ids
}

/** $nicheAliases aus submit.php: { 'café': 'cafe', … } */
function parseAliases() {
  const block = submitPhp.match(/\$nicheAliases = \[([\s\S]*?)\];/)[1]
  const aliases = {}
  for (const m of block.matchAll(/'([^']+)'\s*=>\s*'([^']+)'/g)) aliases[m[1]] = m[2]
  return aliases
}

/** Nischen aus niches.ts: [{slug, label, formType}] */
function parseNiches() {
  const out = []
  for (const m of nichesTs.matchAll(/slug:\s*'([^']+)',[\s\S]*?label:\s*'([^']+)',[\s\S]*?formType:\s*'([^']+)'/g)) {
    out.push({ slug: m[1], label: m[2], formType: m[3] })
  }
  return out
}

const TEMPLATE_IDS = parseTemplateIds()
const ALIASES = parseAliases()
const NICHES = parseNiches()
const resolve = (sent) => ALIASES[sent] ?? sent

// ── Nischen-Verdrahtung ──────────────────────────────────────────────────────

test('niches.ts wurde korrekt geparst (10 Nischen)', () => {
  assert.equal(NICHES.length, 10, `geparst: ${JSON.stringify(NICHES.map((n) => n.slug))}`)
})

test('jedes Formular-Label (LeadForm sendet label.toLowerCase()) erreicht ein Boomerang-Template', () => {
  for (const n of NICHES) {
    const sent = n.label.toLowerCase()
    const key = resolve(sent)
    assert.ok(
      key in TEMPLATE_IDS,
      `Label "${n.label}" → sendet "${sent}" → löst auf "${key}" — FEHLT in TEMPLATE_IDS. ` +
        `Alias in public/api/submit.php ($nicheAliases) ergänzen!`
    )
  }
})

test('jeder Nischen-Slug (Gründer-Dropdown sendet slug) erreicht ein Boomerang-Template', () => {
  for (const n of NICHES) {
    const key = resolve(n.slug)
    assert.ok(
      key in TEMPLATE_IDS,
      `Slug "${n.slug}" → löst auf "${key}" — FEHLT in TEMPLATE_IDS in public/api/submit.php`
    )
  }
})

test('Salesflare- und Telegram-Label-Maps kennen jeden Template-Key', () => {
  // Es gibt zwei $nicheLabels-Maps (Salesflare + Telegram) — beide prüfen
  const labelBlocks = [...submitPhp.matchAll(/\$nicheLabels\s*=\s*\[([^\]]+)\]/g)]
    .map((m) => m[1])
    // FR-Map ausnehmen (eigener Markt, eigene Keys)
    .filter((b) => !b.includes('boulangerie'))
  assert.ok(labelBlocks.length >= 2, 'Salesflare- und Telegram-Label-Maps erwartet')

  for (const block of labelBlocks) {
    const keys = [...block.matchAll(/'([^']+)'\s*=>/g)].map((m) => m[1])
    for (const templateKey of Object.keys(TEMPLATE_IDS)) {
      assert.ok(
        keys.includes(templateKey),
        `Template-Key "${templateKey}" fehlt in einer $nicheLabels-Map — Lead würde mit rohem Slug statt Label angezeigt`
      )
    }
  }
})

test('CLAUDE.md-Template-IDs stimmen mit submit.php überein (Doku-Drift)', () => {
  const claudeMd = read('CLAUDE.md')
  // Zeilen wie: `cafes` → 1046392
  const documented = [...claudeMd.matchAll(/`([a-z]+)`\s*→\s*(\d+)/g)]
  assert.ok(documented.length >= 10, 'CLAUDE.md sollte 10 Template-IDs dokumentieren')
  for (const [, slug, id] of documented) {
    const key = resolve(slug)
    assert.equal(
      TEMPLATE_IDS[key],
      Number(id),
      `CLAUDE.md sagt ${slug} → ${id}, submit.php sagt ${TEMPLATE_IDS[key]} — Doku oder Code anpassen`
    )
  }
})

// ── Booking-URL: eine Quelle der Wahrheit ────────────────────────────────────

test('hardcodete Booking-URLs in Seiten == trafft.bookingUrl aus integrations.ts', () => {
  const integrations = read('src/config/integrations.ts')
  const configured = integrations.match(/bookingUrl:\s*'([^']+)'/)[1]

  const grep = execSync(
    `grep -rn "termin\\.fuerte\\.digital\\|bookingUrl=\\"http" src/pages src/components --include='*.astro' || true`,
    { cwd: ROOT, encoding: 'utf8' }
  )
  const urls = [...grep.matchAll(/https:\/\/[a-z0-9.\-]+/g)].map((m) => m[0])
  for (const url of urls) {
    assert.equal(
      url,
      configured,
      `Hardcodete Booking-URL "${url}" weicht von integrations.ts (${configured}) ab — zentrale Config nutzen`
    )
  }
})

// ── Formular-Einbindung in allen Städten ─────────────────────────────────────

test('jede Stadt-Nischen-Seite ist ein Wrapper um NicheLanding mit cityName + nicheData + fomoCount', () => {
  const pagesDir = path.join(ROOT, 'src/pages')
  const nichePages = []
  for (const city of readdirSync(pagesDir, { withFileTypes: true })) {
    if (!city.isDirectory()) continue
    for (const sub of readdirSync(path.join(pagesDir, city.name), { withFileTypes: true })) {
      if (sub.isDirectory() && /^\[(viertel|veedel)\]$/.test(sub.name)) {
        nichePages.push(path.join('src/pages', city.name, sub.name, '[niche].astro'))
      }
    }
  }
  assert.ok(nichePages.length >= 15, `erwartet ≥15 Stadt-Seiten, gefunden: ${nichePages.length}`)

  for (const p of nichePages) {
    const src = read(p)
    assert.match(src, /<NicheLanding/, `${p}: rendert nicht NicheLanding`)
    assert.match(src, /cityName="[^"]+"/, `${p}: cityName-Prop fehlt — Analytics/SEO wäre stadtlos`)
    assert.match(src, /citySlug="[^"]+"/, `${p}: citySlug-Prop fehlt`)
    assert.match(src, /nicheData=\{nicheData\}/, `${p}: nicheData wird nicht durchgereicht`)
    assert.match(src, /fomoCount=\{fomoCount\}/, `${p}: fomoCount fehlt`)
  }
})

test('NicheLanding bindet das gemeinsame Formular ein: LeadForm (full + variant=simple) + Booking-CTA', () => {
  const src = read('src/components/NicheLanding.astro')
  assert.match(src, /client:load/, 'LeadForm muss hydratisiert sein')
  assert.match(src, /variant="simple"/, 'simple-Variante (früher LeadFormDoener) fehlt')
  assert.match(src, /source="doener"/, 'source=doener für simple-Nische fehlt')
  assert.match(src, /city=\{cityName\}/, 'city wird nicht aus cityName gespeist → Analytics stadtlos')
  assert.match(src, /bookingUrl=\{bookingUrl\}/, 'Termin-CTA (bookingUrl) fehlt im Hero-Formular')
  assert.doesNotMatch(src, /LeadFormDoener/, 'alte LeadFormDoener-Referenz darf nicht zurückkommen')
})
