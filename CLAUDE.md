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
- API Key: in `public/api/submit.php` (nicht öffentlich committen)
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
| `src/pages/koeln/[veedel]/[niche].astro` | Unified Landing Page (60 Seiten) |
| `src/pages/funktionen.astro` | Feature-Übersicht (Boomerangme-Featureset, Stand Juli 2026) |
| `src/pages/koeln/walkin.astro` | Walk-in-Landingpage fürs iPad (noindex, `source='gruender_walkin'`), nische-unabhängig |
| `src/components/LeadForm.tsx` | Hauptformular (Café, Restaurant, Pizza, Eiscafé) |
| `src/components/LeadFormDoener.tsx` | Vereinfachtes Formular für Döner |
| `src/components/ui/gooey-text-morphing.tsx` | GooeyText-Animation (morphende Wörter, nur Eiscafé-Hero) |
| `public/api/submit.php` | PHP API Handler → Boomerang |

## Brand
- **Farben:** Schwarz `#000000` + Gold `#8B7300` (Tailwind: `text-yellow-600` als Annäherung)
- **Stil:** Geometrisch, minimal, thin Typography, all-caps

## Offene TODOs
- [ ] Boomerang Templates für Döner, Pizza, Restaurant, Eiscafé erstellen → IDs in `submit.php` eintragen
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
