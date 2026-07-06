# Tests — Lead-Pipeline / Sales-Prozess

Diese Suite sichert den kompletten Sales-Prozess ab. **Kein Test spricht echte
APIs an** — Boomerang, Salesflare, Telegram und Google Analytics sind gemockt
bzw. geblockt. Es entstehen keine echten Leads, Karten oder Ads-Conversions.

## Ausführen

```bash
npm test                  # alles: Konsistenz → API → E2E
npm run test:consistency  # nur Config-Drift-Checks (~0,2 s)
npm run test:api          # nur submit.php-Integration (~1 s, braucht PHP CLI)
npm run test:e2e          # nur Browser-Tests (braucht dist/: vorher npm run build)
```

E2E setzt einen Build voraus (`npm run build`), der Preview-Server startet
automatisch. Playwright-Browser: `npx playwright install chromium` (einmalig;
in der Claude-Remote-Umgebung wird das vorinstallierte Chromium automatisch
erkannt).

CI: `.github/workflows/test.yml` läuft bei jedem Push/PR.

## Die drei Ebenen

### 1. `tests/consistency/` — Config-Drift (Node, ohne Server)

Parst `niches.ts`, `submit.php`, `integrations.ts`, `CLAUDE.md` und schlägt
fehl, wenn sie auseinanderlaufen:

- Jedes Formular-Label **und** jeder Slug muss über die Alias-Map auf eine
  Boomerang-Template-ID auflösen (sonst: falsche Demo-Karte).
- Salesflare-/Telegram-Label-Maps müssen jeden Template-Key kennen.
- Doku-Template-IDs in CLAUDE.md == Code.
- Hardcodete Booking-URLs == `trafft.bookingUrl` (eine Quelle der Wahrheit).
- Jede Stadt-Nischen-Seite bindet beide Formulare mit `city`-Prop ein.

**Beim Anlegen einer neuen Nische oder Stadt zuerst diese Tests laufen lassen.**

### 2. `tests/api/` — submit.php-Integration (echtes PHP, gemockte Upstreams)

`harness.mjs` startet `php -S` mit dem echten `public/api/submit.php` und
biegt die Upstreams per Env-Var (`BOOMERANG_BASE` …) auf einen lokalen
Mock-Server um, der jeden Request aufzeichnet. Abgedeckt:

- Happy Path: Salesflare → Telegram → Boomerang in korrekter Reihenfolge,
  Wallet-Links mit UTM, wa.me-Link-Bau (0… → 49…).
- Nischen-Routing: 17 Eingabe-Varianten → korrekte Template-ID.
- Validierung (400/405), CORS-Preflight, Legacy-Felder (`kontakt`, `ladenname`).
- **Resilienz:** Boomerang down → Lead trotzdem in CRM + Telegram;
  Salesflare down → Demo-Karte kommt trotzdem; 409 → Kunden-Lookup.
- Modi: Gründer/Walk-in-Tags, FR-Lead-only (kein Boomerang).
- `test.todo`-Einträge dokumentieren bekannte, noch offene Bugs.

### 3. `tests/e2e/` — Formulare im Browser (Playwright)

Gebaute Seiten via `astro preview`; `/api/submit.php` ist im Browser gemockt
(der PHP-Teil ist ja in Ebene 2 getestet). Externe Hosts sind geblockt.

- Payload-Verträge pro Flow: Landing (Köln + Berlin), Döner, Gründer, Walk-in
  (`source=gruender_walkin`).
- Success-Screens: Desktop (QR + WhatsApp-Selfsend) vs. Mobile (Wallet-Buttons).
- Fehlerpfad: Meldung sichtbar, Formular bleibt nutzbar, kein Conversion-Event.
- GA4-Funnel: Event-Reihenfolge + Google-Ads-`conversion` mit korrektem
  `send_to`. (Dieser Test hat den fehlenden `is:inline` am gtag-Snippet
  gefunden — ohne ihn feuert **kein einziges** Event.)
- Booking-Pfad: CTAs auf Landingpages, `demo_booking`-Event, `/termin/`-iframe.

## Wenn ein Test rot ist

Die Testnamen sind bewusst als Verhaltensbeschreibung formuliert — der Name
sagt, welcher Teil des Sales-Prozesses gebrochen ist. Konsistenz-Fehler nennen
direkt die Datei + was nachzuziehen ist.
