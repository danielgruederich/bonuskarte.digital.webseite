# CLAUDE.md — bonuskarte.digital

## Projekt-Überblick
B2B Lead-Gen-Website für digitale Stempelkarten. Hyper-lokalisierte Landing Pages pro Nische & Stadt. Sprache: Deutsch. Hook: "90 Tage kostenlos testen."

## Tech Stack
- **Framework:** Astro + React (Islands) + Tailwind CSS
- **Build:** Static Site (`astro build`)
- **Deploy:** GitHub Actions → FTP auf Starthost (StackCP)
- **Forms:** POST JSON → `/api/submit.php` (PHP) → Boomerang Cards API

## Lokaler Pfad
```
/Users/danielgruederich/bonuskarte-digital/
```

## GitHub
- **Website Repo:** https://github.com/danielgruederich/bonuskarte.digital.webseite ← HIER arbeiten
- **Docs Repo:** github.com/danielgruederich/bonuskarte ← NICHT anfassen

## Hosting
| | |
|---|---|
| SSH Server | ssh.gb.stackcp.com |
| SSH User | fuerte.digital |
| Deploy Path | bonuskarte/ (relativ zu Home) |
| Deploy Methode | rsync über SSH (GitHub Actions Secret: SSH_PRIVATE_KEY) |

## Boomerang Cards API
- Base URL: `https://api.digitalwallet.cards`
- Auth: `X-API-Key` Header
- API Key: per Env-Var `BOOMERANG_API_KEY` überschreibbar (Fallback im Code — **muss rotiert & rein per Env gesetzt werden**, siehe TODOs). Analog `SALESFLARE_API_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`. Rate-Limit via `RATE_LIMIT_MAX`/`RATE_LIMIT_WINDOW`.
- Template IDs (alle 10 verdrahtet):
  - `cafes` → 1046392 ✅
  - `eiscafe` → 1060441 ✅
  - `doener` → 1115375 ✅
  - `pizza` → 1115406 ✅
  - `restaurant` → 1115409 ✅
  - `baeckerei` → 1115411 ✅
  - `friseur` → 1115412 ✅
  - `fitnessstudio` → 1115413 ✅
  - `yoga` → 1115414 ✅
  - `blumenladen` → 1115415 ✅

## URL-Struktur
```
bonuskarte.digital/koeln/[veedel]/[niche]
Beispiel: bonuskarte.digital/koeln/nippes/cafes
```
- 15 Veedel × 5 Nischen = 75 statische Seiten
- Subdomain `koeln.bonuskarte.digital/*` → Cloudflare Redirect → `bonuskarte.digital/koeln/*`

## Wichtige Dateien
| Datei | Zweck |
|---|---|
| `src/data/niches.ts` | Zentrale Nischen-Config (slug, SEO, Copy, Template ID) |
| `src/data/veedel.ts` | 15 Kölner Veedel mit FOMO-Counts |
| `src/components/NicheLanding.astro` | **Gemeinsame** Stadt/Nischen-Landingpage (das „Köln-Layout"). Alle Städte-Seiten sind dünne Wrapper darum. |
| `src/pages/koeln/[veedel]/[niche].astro` | Wrapper um `NicheLanding` (Köln, + orts-spezifischer Content) |
| `src/pages/<stadt>/[viertel]/[niche].astro` | Wrapper um `NicheLanding` (14 weitere Städte, uniform generiert) |
| `src/pages/koeln/walkin.astro` | Walk-in-Landingpage fürs iPad (noindex, `source='gruender_walkin'`), nische-unabhängig |
| `src/components/LeadForm.tsx` | Einziges Lead-Formular. `variant='full'` (mit E-Mail) oder `variant='simple'` (Döner, ohne E-Mail). Honeypot-Feld `website`. |
| `src/config/integrations.ts` | Zentrale Config: Zipchat-Widget + Trafft-Buchung (`termin.fuerte.digital`). Einzige Quelle der Booking-URL. |
| `src/components/ui/gooey-text-morphing.tsx` | GooeyText-Animation (morphende Wörter, nur Eiscafé-Hero) |
| `public/api/submit.php` | PHP API Handler → Salesflare (CRM) + Telegram (Alert) + Boomerang (Karte). Honeypot + IP-Rate-Limit. |
| `tests/` | Automatisierte Testsuite (Konsistenz, submit.php-Integration, E2E). `npm test`. Siehe `tests/README.md`. |

## Brand
- **Farben:** Schwarz `#000000` + Gold `#8B7300` (Tailwind: `text-yellow-600` als Annäherung)
- **Stil:** Geometrisch, minimal, thin Typography, all-caps

## Offene TODOs
- [ ] **KRITISCH:** API-Keys rotieren (Boomerang, Salesflare, Telegram-Bot lagen im Klartext im Repo) und nur noch per Env-Var auf Starthost setzen; Code-Fallbacks danach entfernen
- [ ] Logo SVG durch echtes PNG ersetzen
- [ ] FTP-Passwort rotieren (wurde im Klartext geteilt)
- [ ] Blog-Sektion aufbauen (2×/Monat, hyper-lokal, SEO)

## Städte-Roadmap
- ✅ Köln (live)
- ⏳ Berlin
- ⏳ Düsseldorf
- ⏳ Hürth
- ⏳ Bonn

## Deploy-Befehl
```bash
# Lokal bauen und testen
npm run dev

# Build
npm run build

# Deploy läuft automatisch via GitHub Actions beim Push auf main
git push origin main
```

## Regeln
- Nie in das `bonuskarte` Docs-Repo pushen
- Kein `git push` ohne Daniels Bestätigung
- Keine Dateien löschen ohne ausdrückliche Freigabe
- API Keys und Passwörter gehören nicht in Commit-Messages oder öffentliche Dateien
