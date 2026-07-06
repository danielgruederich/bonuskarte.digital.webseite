/**
 * E2E-Tests der Lead-Formulare — echte gebaute Seiten im Browser.
 *
 * /api/submit.php ist hier gemockt (der PHP-Endpoint hat eigene Integrations-
 * tests in tests/api/). Geprüft wird der Browser-Teil des Sales-Prozesses:
 *   - Sendet jedes Formular den korrekten Payload (Nische, Stadt, Mode, Source, UTM)?
 *   - Funktionieren Success-/Error-Screens (Desktop-QR vs. Mobile-Wallet)?
 *   - Feuern die GA4-Funnel-Events in der richtigen Reihenfolge?
 */
import { test, expect } from '@playwright/test'
import { makeHermetic, mockSubmit, gtagEvents, waitForHydration } from './helpers'

test.beforeEach(async ({ page }) => {
  await makeHermetic(page)
})

async function fillAndSubmitLeadForm(page) {
  await waitForHydration(page, '#vorname')
  await page.locator('#vorname').fill('Testkunde E2E')
  await page.locator('#telefon').fill('0170 5551234')
  await page.locator('#email').fill('e2e@example.com')
  await page.getByRole('button', { name: /Demo-Karte erstellen|Platz sichern/ }).click()
}

// ── Landing Page: Köln (Referenz-Flow mit Hero-Formular) ─────────────────────

test('Köln/Nippes/Cafés: Formular sendet korrekten Payload (Nische, Stadt, UTM)', async ({ page }) => {
  const captured = await mockSubmit(page)
  await page.goto('/koeln/nippes/cafes/')
  await fillAndSubmitLeadForm(page)

  await expect(page.getByRole('heading', { name: /Deine Demo-Karte ist fertig, Testkunde E2E/ })).toBeVisible()

  expect(captured.payloads).toHaveLength(1)
  const p = captured.payloads[0]
  expect(p).toMatchObject({
    vorname: 'Testkunde E2E',
    telefon: '0170 5551234',
    email: 'e2e@example.com',
    niche: 'café',
    city: 'köln',
    mode: 'standard',
    source: 'standard',
  })
  expect(p.utm).toMatchObject({
    utm_source: 'bonuskarte.digital',
    utm_medium: 'landing-page',
    utm_campaign: 'koeln-nippes-cafes',
  })
})

test('Köln: GA4-Funnel feuert in korrekter Reihenfolge inkl. Ads-Conversion', async ({ page }) => {
  await mockSubmit(page)
  await page.goto('/koeln/nippes/cafes/')
  await fillAndSubmitLeadForm(page)
  await expect(page.getByRole('heading', { name: /Demo-Karte ist fertig/ })).toBeVisible()

  const events = await gtagEvents(page)
  const names = events.map(([n]) => n)

  const order = ['signup_form_start', 'signup_submit_attempt', 'demo_card_created', 'signup_submit', 'conversion']
  const indices = order.map((n) => names.indexOf(n))
  for (const [i, n] of order.entries()) {
    expect(indices[i], `Event "${n}" fehlt (dataLayer: ${names.join(', ')})`).toBeGreaterThan(-1)
  }
  expect([...indices].sort((a, b) => a - b)).toEqual(indices) // Reihenfolge korrekt

  const conversion = events.find(([n]) => n === 'conversion')![1]
  expect(conversion.send_to).toBe('AW-18176373682/jWsvCIyIj7AcELLnldtD')
  const submit = events.find(([n]) => n === 'signup_submit')![1]
  expect(submit).toMatchObject({ niche: 'Café', city: 'Köln', source: 'standard' })
})

test('Köln Desktop-Success: QR-Code + "Link aufs Handy schicken" mit wa.me-Selfsend', async ({ page }) => {
  await mockSubmit(page)
  await page.goto('/koeln/nippes/cafes/')
  await fillAndSubmitLeadForm(page)

  await expect(page.getByAltText('QR-Code zur Demo-Karte')).toBeVisible()
  const selfSend = page.getByRole('link', { name: /Link aufs Handy schicken/ })
  await expect(selfSend).toBeVisible()
  // Nummer 0170… muss zu 49170… normalisiert sein und den Kartenlink tragen
  await expect(selfSend).toHaveAttribute('href', /wa\.me\/491705551234\?text=.+cards\.example/)
})

test('@mobile Köln Mobile-Success: Wallet-Install-Buttons statt QR-Code', async ({ page }) => {
  await mockSubmit(page)
  await page.goto('/koeln/nippes/cafes/')
  await fillAndSubmitLeadForm(page)

  const install = page.getByRole('link', { name: /Demo-Karte ins Wallet laden/ })
  await expect(install).toBeVisible()
  await expect(install).toHaveAttribute('href', 'https://cards.example/u/abc')
  await expect(page.getByRole('link', { name: 'Apple Wallet', exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Google Wallet', exact: true })).toBeVisible()
  await expect(page.getByAltText('QR-Code zur Demo-Karte')).not.toBeVisible()
})

test('API-Fehler: verständliche Fehlermeldung, Formular bleibt nutzbar, Error-Event feuert', async ({ page }) => {
  await mockSubmit(page, { status: 500, body: { error: 'Karte konnte nicht erstellt werden' } })
  await page.goto('/koeln/nippes/cafes/')
  await fillAndSubmitLeadForm(page)

  await expect(page.getByText(/Etwas ist schiefgelaufen/)).toBeVisible()
  await expect(page.getByRole('button', { name: /Demo-Karte erstellen/ })).toBeEnabled()

  const names = (await gtagEvents(page)).map(([n]) => n)
  expect(names).toContain('signup_submit_error')
  expect(names).not.toContain('signup_submit')
  expect(names).not.toContain('conversion')
})

test('Pflichtfelder: leeres Formular löst keinen API-Call aus (HTML5-Validierung)', async ({ page }) => {
  const captured = await mockSubmit(page)
  await page.goto('/koeln/nippes/cafes/')
  await waitForHydration(page, '#vorname')
  await page.getByRole('button', { name: /Demo-Karte erstellen/ }).click()
  await page.waitForTimeout(300)
  expect(captured.payloads).toHaveLength(0)
})

// ── Döner-Formular (vereinfachte Variante) ───────────────────────────────────

test('Köln/Nippes/Döner: LeadFormDoener sendet Slug-Nische und zeigt Wallet-Success', async ({ page }) => {
  const captured = await mockSubmit(page)
  await page.goto('/koeln/nippes/doener/')
  await waitForHydration(page, 'input[name="vorname"]')

  const form = page.locator('form').filter({ has: page.locator('input[name="vorname"]') })
  await form.locator('input[name="vorname"]').fill('Ali E2E')
  await form.locator('input[name="telefon"]').fill('0221 998877')
  await form.getByRole('button', { name: /Demo-Karte erstellen/ }).click()

  await expect(page.getByRole('heading', { name: /Deine Demo-Karte ist fertig, Ali E2E/ })).toBeVisible()

  const p = captured.payloads[0]
  expect(p).toMatchObject({ vorname: 'Ali E2E', telefon: '0221 998877', niche: 'doener' })
  expect((p.utm as Record<string, string>).utm_campaign).toBe('koeln-nippes-doener')
})

// ── Gründer-Landing & Walk-in (Sales-Mitarbeiter draußen) ────────────────────

test('Gründer-Landing: Branchen-Dropdown ist Pflicht, Payload trägt mode=gruender + source=gruender', async ({ page }) => {
  const captured = await mockSubmit(page)
  await page.goto('/koeln/gruender/')
  await waitForHydration(page, '#niche-select')

  // Ohne Branche darf nichts abgehen
  await page.locator('#vorname').fill('Gründer E2E')
  await page.locator('#telefon').fill('0170 1112223')
  await page.getByRole('button', { name: 'Platz sichern' }).last().click()
  await page.waitForTimeout(300)
  expect(captured.payloads).toHaveLength(0)

  await page.locator('#niche-select').selectOption('pizza')
  await page.getByRole('button', { name: 'Platz sichern' }).last().click()

  await expect(page.getByRole('heading', { name: /Dein Platz ist reserviert, Gründer E2E/ })).toBeVisible()
  expect(captured.payloads[0]).toMatchObject({
    niche: 'pizza',
    city: 'koeln',
    mode: 'gruender',
    source: 'gruender',
  })
})

test('Walk-in (iPad des Verkäufers): identischer Flow, aber source=gruender_walkin', async ({ page }) => {
  const captured = await mockSubmit(page)
  await page.goto('/koeln/walkin/')
  await waitForHydration(page, '#niche-select')

  await page.locator('#niche-select').selectOption('doener')
  await page.locator('#vorname').fill('Walkin E2E')
  await page.locator('#telefon').fill('0170 4445556')
  await page.getByRole('button', { name: 'Platz sichern' }).last().click()

  await expect(page.getByRole('heading', { name: /Dein Platz ist reserviert/ })).toBeVisible()
  expect(captured.payloads[0]).toMatchObject({
    niche: 'doener',
    mode: 'gruender',
    source: 'gruender_walkin',
  })

  const submit = (await gtagEvents(page)).find(([n]) => n === 'signup_submit')![1]
  expect(submit.source).toBe('gruender_walkin')
})

// ── Andere Städte: gleicher Vertrag ──────────────────────────────────────────

test('Berlin/Mitte/Cafés: Payload trägt city=berlin (kein Köln-Leak)', async ({ page }) => {
  const captured = await mockSubmit(page)
  await page.goto('/berlin/mitte/cafes/')
  await fillAndSubmitLeadForm(page)

  await expect(page.getByRole('heading', { name: /Demo-Karte ist fertig/ })).toBeVisible()
  expect(captured.payloads[0]).toMatchObject({ niche: 'café', city: 'berlin' })
  expect((captured.payloads[0].utm as Record<string, string>).utm_campaign).toBe('berlin-mitte-cafes')
})
