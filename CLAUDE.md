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
- API Key: liegt mit allen anderen Secrets (Salesflare, Telegram, Sheets-Webhook, MailerCloud) in `~/bonuskarte-secrets.php` auf dem Server, AUSSERHALB des Webroots. Vorlage: `bonuskarte-secrets.example.php` im Repo-Root. Keys gehören niemals ins Repo — das Repo ist öffentlich!
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
| `src/pages/v2.astro` | A/B-Test-Variante der Startseite („Bestellzettel"-Design, Orange #F25C24). Canonical → `/`, nicht in Sitemap, Leads mit `source='v2'` |
| `src/pages/koeln/walkin.astro` | Walk-in-Landingpage fürs iPad (noindex, `source='gruender_walkin'`), nische-unabhängig |
| `src/components/CityNichePage.astro` | Gemeinsames Landing-Page-Template aller Städte außer Köln (Formular im Hero, WhatsApp-CTA, Termin-Link, FAQ + Schema.org, Sticky-CTA) |
| `src/components/LandingFaq.astro` | FAQ-Sektion + FAQPage-Schema für Landing Pages |
| `src/components/StickyMobileCta.astro` | Sticky CTA-Leiste auf Mobile (versteckt sich, solange `#demo` sichtbar ist) |
| `src/components/LeadForm.tsx` | Hauptformular (Café, Restaurant, Pizza, Eiscafé) |
| `src/components/LeadFormDoener.tsx` | Vereinfachtes Formular für Döner (Props: `niche`, `city` für korrekte Lead-Attribution) |
| `src/components/ui/gooey-text-morphing.tsx` | GooeyText-Animation (morphende Wörter, nur Eiscafé-Hero) |
| `public/api/submit.php` | PHP API Handler → Salesflare + Boomerang + Telegram + Sheets + MailerCloud |
| `src/pages/v2.astro` | A/B-Redesign "Bestellzettel + Wallet-Demo" (Juli 2026), Forms → submit.php, canonical auf / |
| `src/components/StampGridV2.astro` | Pizza-Stempel-Grid für die v2-Wallet-Karten |
| `scripts/compose_karte.py` | Compositor für /karten-Mockups (Karten-Export → iPhone-Template → WebP); braucht AppScreens-Template in ~/Downloads |

## Brand
- **Farben:** Schwarz `#000000` + Gold `#8B7300` (Tailwind: `text-yellow-600` als Annäherung)
- **Stil:** Geometrisch, minimal, thin Typography, all-caps

## Offene TODOs
- [ ] API-Keys rotieren (Boomerang, Salesflare, Telegram-Bot, MailerCloud) — alte Keys lagen im öffentlichen Repo und in der Git-History
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

---

## ⚠️ AKTIVER SEO-INDEX-SCHADEN — von Claude verursacht (Stand 28.07.2026)

**Vollständige Analyse: [`docs/seo-index-analyse-2026-07-28.md`](docs/seo-index-analyse-2026-07-28.md) — vor jeder SEO-/Content-Arbeit lesen.**

### Was passiert ist
Am 29./30.06.2026 wurden in einer Claude-Session ~2.500 URLs an einem Tag ausgerollt
(Nischen 10 → 24, 10 neue Städte), erzeugt durch **Namens-Swap** eines Köln-Textes statt
einzigartigem Content. Ohne Spec, ohne PR, ohne Review. Die richtige Vorgehensweise stand
seit 20.05. im selben Repo (Paris-Spec: „einzigartiger Intro pro Arrondissement → gegen
Thin/Duplicate Content") und wurde ignoriert.

### Schaden (belegt aus GSC-Export)
| | |
|---|---|
| Indexierungsquote | **91 % → 35 %** |
| Bekannte URLs | 1.636 → 4.147 (**2,5×**) |
| Indexierte Seiten | 1.490 → 1.467 (**−23**) — **2.511 neue URLs = null zusätzliche indexierte Seiten** |
| Nie gecrawlt | **1.759 URLs** (Crawl-Budget-Entzug, host-weit) |
| Sichtbarkeit | 60 Impressionen/Tag auf 1.467 Seiten = **0,04/Seite/Tag** |
| Seiten ohne eigenen Inhalt | **3.066 von 3.216** (95 %) |
| Läuft seit | **13.06.2026**, durchgehend |

Das ist eine **B2B-Lead-Gen-Seite**. Der Schaden ist host-weit: Die inhaltslosen Seiten ziehen
Blog, Hilfe-Center und die 150 guten Köln-Seiten mit herunter.

### Daniels Position
Massiv unzufrieden — berechtigt. Seine Worte: *„gravierender Verstoß gegen meine Regeln"*,
*„du schädigst mein Geschäft"*, *„ich habe mich auf dich verlassen"*, *„du bist faul"*.
Zusätzlich zum ursprünglichen Schaden hat Claude in der Aufarbeitung ohne Freigabe gebaut,
interpretiert statt gefragt, eine „Referenz-Vorlage" vorgeschlagen (genau der Fehler-Reflex),
Behauptungen über nicht existierende Seiten aufgestellt und Zahlen abgeleitet statt gezählt.

### Verbindliche Arbeitsregeln (von Daniel gesetzt)
- **NICHT INTERPRETIEREN.** Keine Lücken mit eigenen Annahmen füllen. Bei Unklarheit: **fragen und warten.**
- **Nichts bauen, ändern, committen oder pushen ohne ausdrückliche Freigabe.**
- **Kein Muster, keine Vorlage, keine Referenzseite, kein Recycling.** Jede Seite von Grund auf neu.
- **Premium, gut recherchiert, nicht gelogen, SEO + GEO.** Maßstab: **Exzellenz**, nicht „gut".
- **Keine Ressourcen sparen, keinen leichteren Weg gehen.**
- Immer trennen: **[belegt] / [plausibel] / [unbekannt]**. **Ergebnis zählen, nicht ableiten.**

### Die Regel für allen künftigen Content
> **Eine Seite ist indexierbar, wenn — und nur wenn — sie eigenen, einzigartigen Inhalt hat.
> Token-Swap zählt NICHT.**

Google (März 2026, Scaled Content Abuse): Seiten, die nur Ortsnamen austauschen, verlieren
60–90 % Rankings. Überlebenskriterium: *„each page answers a distinct user query no other page
on your site already answers."*

### Offene Entscheidungen
1. GSC-**Leistungsbericht** exportieren (Seiten + Suchanfragen, 3 Monate) — **erst messen, dann schneiden**
2. Hubs: streng (`noindex`, ~620 URLs) oder moderat (~755)?
3. Freigabe für Reparatur-Schritte 1–5
4. GSC „Manuelle Maßnahmen": Eintrag oder leer?
5. Commit `c616452` auf dem Arbeitsbranch dieser Session (lokal, **nicht gepusht**) — löschen?
   *(Der Branch-Name stammt aus einem versehentlich falschen Thread und hat inhaltlich keinen Bezug.)*

### Google-Anbindung (CLI)
Web-Container kann es nicht (MCP-Server brauchen lokale stdio + Browser-OAuth). **In der CLI ja.**
`scripts/gsc-auth.py` existiert bereits → Token unter `~/.config/google-oauth-tokens/bonuskarte-gsc.json`.
Server: `googleanalytics/google-analytics-mcp` (offiziell Google, read-only) und
`AminForou/mcp-gsc` (MIT, ~20 Tools). Dauerhaft via `.mcp.json` im Repo + Credentials als
Env-Variable — **Keys niemals ins Repo, es ist öffentlich.**
Google Trends: keine offizielle API — nur manueller CSV-Export.
