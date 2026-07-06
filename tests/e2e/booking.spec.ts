/**
 * E2E-Tests für den Terminbuchungs-Pfad (Trafft / termin.fuerte.digital).
 * Zweiter Conversion-Weg neben der Demo-Karte: "Erst informieren? Termin buchen".
 */
import { test, expect } from '@playwright/test'
import { makeHermetic, gtagEvents, waitForHydration } from './helpers'

test.beforeEach(async ({ page }) => {
  await makeHermetic(page)
})

test('Köln-Landingpage: Booking-CTA im Hero und unter dem Formular vorhanden', async ({ page }) => {
  await page.goto('/koeln/nippes/cafes/')

  const heroCta = page.getByRole('link', { name: /Erst informieren\? Termin buchen/ })
  await expect(heroCta).toBeVisible()
  await expect(heroCta).toHaveAttribute('href', 'https://termin.fuerte.digital')
  await expect(heroCta).toHaveAttribute('target', '_blank')

  const formCta = page.getByRole('link', { name: /Kostenlosen Termin buchen/ })
  await expect(formCta).toBeVisible()
  await expect(formCta).toHaveAttribute('href', 'https://termin.fuerte.digital')
})

test('Booking-Klick unter dem Formular feuert demo_booking(source=form)', async ({ page }) => {
  await page.goto('/koeln/nippes/cafes/')
  await waitForHydration(page, '#vorname')
  // target=_blank + geblocktes externes Ziel: Klick-Event reicht, Navigation egal
  await page.getByRole('link', { name: /Kostenlosen Termin buchen/ }).click()

  const events = await gtagEvents(page)
  const booking = events.find(([n]) => n === 'demo_booking')
  expect(booking, `demo_booking fehlt (dataLayer: ${events.map(([n]) => n).join(', ')})`).toBeTruthy()
  expect(booking![1].source).toBe('form')
})

test('/termin/: Trafft-Buchungs-iframe zeigt auf die konfigurierte URL', async ({ page }) => {
  await page.goto('/termin/')
  const iframe = page.locator('#trafft-embed')
  await expect(iframe).toBeAttached()
  await expect(iframe).toHaveAttribute('src', 'https://termin.fuerte.digital')
})
