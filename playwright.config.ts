import { defineConfig, devices } from '@playwright/test'
import { existsSync } from 'node:fs'

// Vorinstalliertes Chromium (Claude-Code-Remote-Umgebung) automatisch nutzen;
// in CI/lokal installiert `npx playwright install chromium` den Browser regulär.
const chromiumPath =
  process.env.PLAYWRIGHT_CHROMIUM_PATH ??
  (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined)

/**
 * E2E-Tests für die Lead-Formulare.
 * Läuft gegen den gebauten Static-Output (`astro build` → `astro preview`).
 * Alle externen Requests (Google Tag Manager, Zipchat, Boomerang …) werden in
 * den Tests geblockt/gemockt — kein Test erzeugt echte Leads oder Conversions.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['list'], ['github']] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4321',
    trace: 'on-first-retry',
    // Sandbox aus: Tests laufen in Containern teils als root (CI + Remote-Env).
    launchOptions: {
      args: ['--no-sandbox'],
      ...(chromiumPath ? { executablePath: chromiumPath } : {}),
    },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] }, grepInvert: /@mobile/ },
    {
      // iPhone-Emulation in Chromium (WebKit ist nicht installiert):
      // Viewport/UA/Touch reichen, damit LeadForm den Mobile-Pfad rendert.
      name: 'mobile',
      use: { ...devices['iPhone 13'], browserName: 'chromium', defaultBrowserType: 'chromium' },
      grep: /@mobile/,
    },
  ],
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4321',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
