# bonuskarte.digital — Entwicklungsplan

**Tech Stack:** Astro + React (Islands) + Tailwind CSS
**Hosting:** Starthost (StackCP) via FTP Deploy
**Deploy:** GitHub Actions → FTP auf `/public_html/bonuskarte/`
**Ziel:** Hyper-lokale B2B Lead-Gen-Website für digitale Stempelkarten

---

## Projektstruktur

```
bonuskarte-digital/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions: Build + FTP Deploy
├── public/
│   ├── api/
│   │   └── submit.php              # PHP: Boomerang Cards API Handler
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── dark-gradient-pricing.tsx
│   │   ├── Footer.astro
│   │   ├── LeadForm.tsx            # Vollformular (Café, Pizza, Restaurant)
│   │   ├── LeadFormDoener.tsx      # Vereinfachtes Formular (Döner)
│   │   ├── Navbar.astro
│   │   └── WalletMockup.astro
│   ├── content/
│   │   ├── blog/                   # Markdown Blog-Artikel (11 vorhanden)
│   │   └── config.ts               # Astro Content Collections Config
│   ├── data/
│   │   ├── berlin.ts               # Berliner Stadtteile + FOMO-Counts
│   │   ├── bonn.ts                 # Bonner Stadtteile
│   │   ├── duesseldorf.ts          # Düsseldorfer Stadtteile
│   │   ├── huerth.ts               # Hürther Stadtteile
│   │   ├── niches.ts               # Nischen-Config (slug, SEO, Copy, Wallet)
│   │   └── veedel.ts               # 15 Kölner Veedel + FOMO-Counts
│   ├── layouts/
│   │   └── BaseLayout.astro        # HTML Head, Fonts, Meta
│   ├── lib/
│   │   └── utils.ts                # clsx + tailwind-merge helper
│   ├── pages/
│   │   ├── blog/                   # Globaler Blog
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── berlin/                 # Berlin (Struktur bereit)
│   │   │   ├── index.astro
│   │   │   ├── blog/
│   │   │   └── [viertel]/
│   │   │       ├── index.astro
│   │   │       └── [niche].astro
│   │   ├── bonn/                   # Bonn (Struktur bereit)
│   │   ├── duesseldorf/            # Düsseldorf (Struktur bereit)
│   │   ├── huerth/                 # Hürth (Struktur bereit)
│   │   ├── koeln/                  # Köln — LIVE ✅
│   │   │   ├── index.astro         # Redirect → /koeln/innenstadt
│   │   │   ├── blog/
│   │   │   └── [veedel]/
│   │   │       ├── index.astro     # Veedel Hub (Nischen-Auswahl)
│   │   │       └── [niche].astro   # Landing Page (15×4 = 60 statische Seiten)
│   │   ├── cafes-koeln.astro       # Legacy Redirect → /koeln/innenstadt/cafes
│   │   ├── doener-koeln.astro      # Legacy Redirect
│   │   ├── pizza-koeln.astro       # Legacy Redirect
│   │   ├── restaurant-koeln.astro  # Legacy Redirect
│   │   ├── datenschutz.astro
│   │   ├── impressum.astro
│   │   ├── preise.astro
│   │   ├── 404.astro
│   │   └── index.astro             # Homepage (Nischen-Grid)
│   └── env.d.ts
├── astro.config.mjs
├── CLAUDE.md
├── package.json
├── PLAN.md
├── tailwind.config.mjs
└── tsconfig.json
```

---

## URL-Architektur

```
bonuskarte.digital/
├── koeln/                              # Stadt-Hub
│   ├── innenstadt/                     # Veedel-Hub (Nischen-Auswahl)
│   │   ├── cafes                       # Landing Page
│   │   ├── doener
│   │   ├── pizza
│   │   └── restaurant
│   ├── nippes/
│   │   ├── cafes
│   │   └── …
│   └── blog/
│       └── [slug]
├── berlin/                             # ⏳ Struktur bereit, Content fehlt
├── duesseldorf/                        # ⏳ Struktur bereit
├── huerth/                             # ⏳ Struktur bereit
├── bonn/                               # ⏳ Struktur bereit
└── blog/                               # Globaler Blog
    └── [slug]

koeln.bonuskarte.digital/*  →  (Cloudflare 301)  →  bonuskarte.digital/koeln/*
```

**Seitenanzahl (statisch gebaut):**
- Köln: 15 Veedel × 4 Nischen = **60 Landing Pages**
- Köln: 15 Veedel-Hubs + 1 Stadt-Hub = 16 weitere Seiten

---

## Boomerang Cards API

```
POST https://api.digitalwallet.cards/api/v2/customers   → Customer anlegen
POST https://api.digitalwallet.cards/api/v2/cards       → Demo-Karte erstellen
GET  https://api.digitalwallet.cards/api/v2/customers   → Customer suchen (bei 409)
```

**Template IDs** (in `public/api/submit.php` → `TEMPLATE_IDS` Array):

| Nische | Template ID | Status |
|--------|------------|--------|
| cafe | `1046392` | ✅ aktiv |
| doener | `null` | ⏳ muss im Boomerang-Dashboard erstellt werden |
| pizza | `null` | ⏳ muss im Boomerang-Dashboard erstellt werden |
| restaurant | `null` | ⏳ muss im Boomerang-Dashboard erstellt werden |

**Fallback:** Solange `null`, wird Template `1046392` für alle Nischen verwendet.

---

## Phase 1 — Fundament ✅ (abgeschlossen, Stand März 2026)

- [x] Astro + React + Tailwind Setup
- [x] GitHub Actions → FTP Deploy auf Starthost
- [x] SSL via Cloudflare (Full Mode)
- [x] URL-Struktur `/[city]/[viertel]/[niche]`
- [x] Boomerang Cards API Integration (LeadForm → Auto-Demo-Card)
- [x] Sitemap via `@astrojs/sitemap` (`/sitemap-index.xml`)
- [x] 15 Kölner Veedel mit FOMO-Badges
- [x] Stadtstruktur für Berlin, Düsseldorf, Hürth, Bonn angelegt
- [x] 11 Blog-Artikel in `/src/content/blog/`
- [x] Datenschutz + Impressum + Preisseite

---

## Phase 2 — Conversion & Hero (aktuelle Phase)

### 2.1 Boomerang Templates vervollständigen

**Schritte:**
1. Ins Boomerang Dashboard einloggen: [digitalwallet.cards](https://digitalwallet.cards)
2. 3 neue Card-Templates erstellen: **Döner, Pizza, Restaurant**
3. Jeweils Template-ID aus der URL kopieren
4. In `public/api/submit.php` eintragen:

```php
const TEMPLATE_IDS = [
    'cafe'       => 1046392,    // ✅ vorhanden
    'doener'     => XXXXXXX,    // ← hier neue ID eintragen
    'pizza'      => XXXXXXX,    // ← hier neue ID eintragen
    'restaurant' => XXXXXXX,    // ← hier neue ID eintragen
];
```

5. Committen und deployen:

```bash
cd /Users/danielgruederich/bonuskarte-digital
git add public/api/submit.php
git commit -m "feat: add Boomerang template IDs for Döner, Pizza, Restaurant"
git push origin main
```

### 2.2 Animiertes Phone Mockup (Hero-Section)

**Ziel:** CSS/JS Phone-Frame mit auto-cycling App-Screenshots (wie helloagain.com/de)

**Screenshots:** `/Users/danielgruederich/bonuskarte-digital/iphone mockups/`
→ 3–5 App-Screens platzieren (Home, Stempel, QR-Code, Rewards, …)

**Neue Komponente:** `src/components/PhoneMockup.tsx`

```tsx
// src/components/PhoneMockup.tsx
// Phone-Frame bleibt statisch, Screenshots wechseln automatisch (alle 3 Sek.)
// Framer Motion ist bereits installiert → für Fade-/Slide-Transition verwenden

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const screens = [
  '/iphone mockups/screen-1.png',
  '/iphone mockups/screen-2.png',
  '/iphone mockups/screen-3.png',
]

export default function PhoneMockup() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % screens.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-[280px] h-[560px]">
      {/* Phone frame SVG hier einfügen */}
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={screens[current]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full object-cover rounded-[40px]"
        />
      </AnimatePresence>
    </div>
  )
}
```

**Integration:** In `src/pages/index.astro` Hero-Section einbinden:
```astro
import PhoneMockup from '../components/PhoneMockup.tsx'
<PhoneMockup client:load />
```

### 2.3 Logo ersetzen

- Aktuell: SVG-Platzhalter in `src/components/Navbar.astro`
- Ziel: Echte PNG-Datei nach `public/logo.png` → im Navbar referenzieren

```astro
<!-- src/components/Navbar.astro -->
<img src="/logo.png" alt="bonuskarte.digital" class="h-8 w-auto" />
```

---

## Phase 3 — Städte-Content aktivieren

Die Seiten-Struktur für alle Städte ist bereits fertig. Fehlend: **Stadtteile-Daten** (analog `src/data/veedel.ts`).

### Vorgehen pro neue Stadt

**Schritt 1:** Stadtteile-Datei überprüfen und FOMO-Counts befüllen

```typescript
// Beispiel: src/data/berlin.ts
export const viertel: ViertelData[] = [
  { name: 'Mitte',       slug: 'mitte',       fomoCount: { cafe: 3, doener: 4, restaurant: 3, pizza: 2 } },
  { name: 'Prenzlauer Berg', slug: 'prenzlauer-berg', fomoCount: { cafe: 4, doener: 2, restaurant: 2, pizza: 1 } },
  // …
]
```

**Schritt 2:** Cloudflare Subdomain + Redirect einrichten

```
# Cloudflare DNS für neue Stadt:
CNAME: berlin → bonuskarte.digital (Proxied)
Redirect Rule: https://berlin.bonuskarte.digital/* → https://bonuskarte.digital/berlin/${1} (301)
```

**Schritt 3:** Deploy (automatisch via GitHub Actions):

```bash
git add src/data/berlin.ts
git commit -m "feat: add Berlin Stadtteile data"
git push origin main
```

### Städte-Status

| Stadt | Seiten-Struktur | Stadtteile-Daten | Live |
|-------|----------------|------------------|------|
| Köln | ✅ | ✅ (15 Veedel) | ✅ |
| Berlin | ✅ | ⏳ | ⏳ |
| Düsseldorf | ✅ | ⏳ | ⏳ |
| Hürth | ✅ | ⏳ | ⏳ |
| Bonn | ✅ | ⏳ | ⏳ |

---

## Phase 4 — Blog-Strategie

**Ziel:** 2 Artikel pro Monat, hyper-lokal, SEO + Vertrauen bei Gastronomen

**Artikel-Template:** 1 Vorlage × N Städte/Nischen
**Bestehende Artikel:** 11 Markdown-Dateien in `src/content/blog/`

### Neuen Artikel erstellen

```bash
# Datei anlegen
touch src/content/blog/[slug].md
```

**Frontmatter-Vorlage:**

```md
---
title: "Digitale Stempelkarte für Cafés in Nippes – so funktioniert's"
description: "..."
pubDate: 2026-04-01
city: "Köln"
niche: "cafes"
slug: "digitale-stempelkarte-cafes-nippes"
---
```

**Artikel-Themen-Pipeline:**

| Priorität | Thema | Stadt | Nische |
|-----------|-------|-------|--------|
| 🔴 hoch | Döner Kundenbindung | Köln | Döner |
| 🔴 hoch | Pizzeria Stammkunden | Köln | Pizza |
| 🟡 mittel | Restaurant Treueprogramm | Berlin | Restaurant |
| 🟡 mittel | Stempelkarte vs. App | — | allgemein |

---

## Phase 5 — SEO Optimierung (ab ~Sep 2026)

**Voraussetzung:** ~3–6 Monate Google Search Console Daten

**Technik: "Low Hanging Fruit Content Refresh" (Matt Kenyon)**

1. Google Search Console öffnen → **Performance** → nach Impressionen filtern
2. Keywords auf **Position 5–15** identifizieren (fast auf Seite 1)
3. Diese Seiten öffnen und Keyword in die **3 Kings** einbauen:
   - `<title>` Tag
   - `<h1>` Heading
   - Erster Satz des Fließtexts
4. Deployen → in 2–4 Wochen Rankings beobachten

**Anwendung:** Direkt auf alle 60 Veedel×Nischen-Seiten → `src/pages/koeln/[veedel]/[niche].astro`

**SEO-Zieldaten:**

```
seoTitle: 'Digitale Stempelkarte für Cafés in Nippes – 90 Tage gratis | bonuskarte.digital'
seoDescription: 'Digitale Kundenbindung für Cafés in Nippes. Ein fester Platz im Smartphone-Wallet ...'
```

→ Alles konfigurierbar in `src/data/niches.ts` pro Nische

---

## Deploy-Prozess

```bash
# 1. Lokal entwickeln
cd /Users/danielgruederich/bonuskarte-digital
npm run dev                    # → http://localhost:4321

# 2. Build lokal testen
npm run build
npm run preview               # → http://localhost:4321 (aus dist/)

# 3. Deploy (automatisch via GitHub Actions)
git add -p                    # Änderungen selektiv stagen
git commit -m "feat: ..."
git push origin main
# → GitHub Actions baut und deployt via FTP auf Starthost
# → Live unter https://bonuskarte.digital
```

**GitHub Actions Workflow:** `.github/workflows/deploy.yml`
**Secrets:** `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` → im GitHub Repo unter Settings → Secrets

---

## Technische Schulden

| Problem | Priorität | Aufwand | Nächster Schritt |
|---------|-----------|---------|------------------|
| FTP-Passwort rotieren | 🔴 kritisch | 10 Min | StackCP → neues Passwort setzen, GitHub Secret aktualisieren |
| Boomerang Templates Döner/Pizza/Restaurant | 🟡 mittel | 30 Min | Im Boomerang Dashboard erstellen, IDs in `submit.php` eintragen |
| Logo PNG | 🟡 mittel | — | PNG nach `public/logo.png`, Navbar anpassen |
| Animiertes Phone Mockup | 🟡 mittel | 2–3h | Screenshots in `/iphone mockups/` ablegen, dann bauen |

---

## Risk Assessment

| Risiko | Wahrscheinlichkeit | Impact | Maßnahme |
|--------|-------------------|--------|----------|
| Boomerang API ändert Endpoints | Niedrig | Hoch | `submit.php` versioniert, API-Version in URL fixieren |
| FTP-Passwort kompromittiert | Mittel | Hoch | Sofort rotieren (war im Klartext sichtbar) |
| GitHub Actions Deploy schlägt fehl | Niedrig | Mittel | Actions-Log prüfen, manuell per FTP als Fallback |
| FOMO-Counts nicht aktuell | Hoch | Niedrig | Counts in `veedel.ts` bei echten Signups manuell updaten |
| Stadtseiten ohne Content live | Niedrig | Mittel | Stadtteile-Daten prüfen vor Cloudflare-Subdomain-Setup |

---

## Nützliche Links

- [Boomerang Cards Dashboard](https://digitalwallet.cards) — Template-Verwaltung
- [Cloudflare Dashboard](https://dash.cloudflare.com) — DNS, Redirects, SSL
- [StackCP (Starthost)](https://stackcp.com) — FTP-Zugangsdaten, PHP-Logs
- [GitHub Repo](https://github.com/danielgruederich/bonuskarte.digital.webseite) — Code + Actions
- [Astro Docs](https://docs.astro.build) — Framework-Referenz
- [Boomerang API Docs](https://api.digitalwallet.cards/docs) — API v2 Referenz

---

## Nächster konkreter Schritt

**→ Boomerang Dashboard öffnen → 3 neue Card-Templates erstellen (Döner, Pizza, Restaurant) → Template-IDs in `public/api/submit.php` eintragen → pushen**
