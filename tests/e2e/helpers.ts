import type { Page } from '@playwright/test'

/** Canned-Antwort, wie submit.php sie bei Erfolg liefert */
export const SUCCESS_RESPONSE = {
  success: true,
  installLink: 'https://cards.example/install/abc?utm_source=test',
  shareLink: 'https://cards.example/share/abc?utm_source=test',
  directInstallLink: {
    universal: 'https://cards.example/u/abc',
    apple: 'https://cards.example/a/abc',
    google: 'https://cards.example/g/abc',
    pwa: 'https://cards.example/p/abc',
  },
  qrLink: 'https://cards.example/qr/abc.png',
}

/**
 * Macht die Seite hermetisch: kein Request verlässt localhost.
 * Blockt Google Tag Manager, Zipchat, Boomerang-CDN etc. — dadurch ist
 * garantiert, dass Tests nie echte Analytics-Conversions oder Leads erzeugen.
 * (window.dataLayer sammelt gtag-Events trotzdem, da das Inline-Snippet läuft.)
 */
export async function makeHermetic(page: Page) {
  await page.route('**/*', (route) => {
    const url = new URL(route.request().url())
    if (url.hostname === '127.0.0.1' || url.hostname === 'localhost') return route.continue()
    return route.abort()
  })
}

/**
 * Mockt /api/submit.php im Browser und sammelt alle abgeschickten Payloads.
 * (Der echte PHP-Endpoint wird separat in tests/api/ integrationsgetestet.)
 */
export async function mockSubmit(
  page: Page,
  opts: { status?: number; body?: object } = {},
): Promise<{ payloads: Record<string, unknown>[] }> {
  const captured: { payloads: Record<string, unknown>[] } = { payloads: [] }
  await page.route('**/api/submit.php', async (route) => {
    captured.payloads.push(route.request().postDataJSON())
    await route.fulfill({
      status: opts.status ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(opts.body ?? SUCCESS_RESPONSE),
    })
  })
  return captured
}

/**
 * Wartet, bis das React-Island um `innerSelector` hydratisiert ist.
 * Astro entfernt das `ssr`-Attribut vom <astro-island> erst nach der Hydration —
 * vorher hätte das Formular keinen onSubmit-Handler und ein Klick würde einen
 * nativen GET-Submit auslösen (Race, die reale Nutzer auf langsamen Geräten
 * genauso treffen kann).
 */
export async function waitForHydration(page: Page, innerSelector: string) {
  await page
    .locator('astro-island:not([ssr])')
    .filter({ has: page.locator(innerSelector) })
    .first()
    .waitFor({ state: 'attached' })
}

/** Alle gtag('event', …)-Aufrufe aus window.dataLayer als [name, params][] */
export async function gtagEvents(page: Page): Promise<[string, Record<string, unknown>][]> {
  return page.evaluate(() => {
    const dl = (window as unknown as { dataLayer?: IArguments[] }).dataLayer ?? []
    return Array.from(dl)
      .map((args) => Array.from(args as unknown as unknown[]))
      .filter((a) => a[0] === 'event')
      .map((a) => [a[1], a[2] ?? {}]) as [string, Record<string, unknown>][]
  })
}
