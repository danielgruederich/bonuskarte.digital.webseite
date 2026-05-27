# Gründer-Landing Implementation Plan

> **STATUS: COMPLETED 2026-05-27** — alle 8 Tasks executed, gemerged in `main` (commit `6fb8def`), via GitHub Actions zu Starthost deployed, live auf https://bonuskarte.digital/koeln/gruender/. Visueller Browser-Check + Test-Lead durch Daniel noch offen.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone, noindex Gründer landing page at `/koeln/gruender` that converts visitors via the existing LeadForm (with a Gründer-Banner + Salesflare tagging) into 100 €-Lifetime leads.

**Architecture:** One reusable Astro component (`GruenderLanding.astro`) parameterised by city config. Existing `LeadForm.tsx` gets four optional props (no breaking change for 75+ live pages). `submit.php` gets a `mode='gruender'` branch that adds tags to the Salesflare lead. `BaseLayout.astro` gets a `noindex` prop. `astro.config.mjs` excludes the page from sitemap.

**Tech Stack:** Astro 4 + React 18 + Tailwind CSS, PHP 8 (submit.php), Salesflare REST API, Boomerang Cards API. Static build, FTP deploy to Starthost.

**Spec:** `docs/superpowers/specs/2026-05-27-gruender-landing-design.md`

**Branch:** `feat/gruender-landing` (already created, spec already committed).

**Frontend-design skill:** Execute Task 6 with `frontend-design:frontend-design` active. Visual style must match brand: black `#000000` + gold `#8B7300` (Tailwind `gold-600`), thin/extralight typography, all-caps tracking for labels, geometric layout, mobile-first. Reference: `src/pages/preise.astro` for visual tone.

---

## File Overview

| File | Action | Lines (approx.) |
|---|---|---|
| `src/data/gruender.ts` | Create | 80 |
| `src/components/LeadForm.tsx` | Modify (add 4 props) | +20 |
| `src/layouts/BaseLayout.astro` | Modify (add `noindex` prop) | +3 |
| `public/api/submit.php` | Modify (add gruender branch in tag-build) | +12 |
| `astro.config.mjs` | Modify (sitemap filter) | +1 |
| `src/components/GruenderLanding.astro` | Create | ~300 |
| `src/pages/koeln/gruender.astro` | Create | 6 |

---

## Task 1: City config + FAQ data

**Files:**
- Create: `src/data/gruender.ts`

- [ ] **Step 1: Create the file with city config and FAQ**

```ts
export interface GruenderCityConfig {
  city: string                        // slug, lowercase, e.g. 'koeln'
  cityCapitalized: string             // e.g. 'Köln'
  cityDative: string                  // e.g. 'Kölner' (used in pre-headline)
  faq: { q: string; a: string }[]
}

export const koeln: GruenderCityConfig = {
  city: 'koeln',
  cityCapitalized: 'Köln',
  cityDative: 'Kölner',
  faq: [
    {
      q: 'Was passiert nach dem Absenden?',
      a: 'Wir melden uns innerhalb 24 h per WhatsApp und Telefon. Im Gespräch klären wir Branding (Logo, Farbe, Belohnung), Bezahlweg (Rechnung per E-Mail, SEPA oder klassische Überweisung) und den Setup-Termin. Deine Karte ist in unter 24 h nach Zahlungseingang live.',
    },
    {
      q: 'Wie zahle ich die 100 €?',
      a: 'Nach unserem Telefonat schicken wir dir eine Rechnung per E-Mail. Du zahlst per SEPA-Überweisung oder klassischer Überweisung. Keine Kreditkarte nötig, kein Abo-Vertrag mit versteckten Klauseln.',
    },
    {
      q: 'Was bedeutet die 90-Tage-Geld-zurück-Garantie?',
      a: 'Du startest mit dem vollen Funktionsumfang. Wenn du innerhalb von 90 Tagen ab Zahlungseingang merkst, dass die Karte für deinen Betrieb nicht das Richtige ist, schreibst du uns kurz — wir erstatten die 100 € ohne Rückfragen.',
    },
    {
      q: 'Was, wenn ich später Standorte dazunehme?',
      a: 'Dein Gründer-Tarif gilt für einen Standort. Zusätzliche Standorte buchst du regulär als Solo-Abos (29 €/Monat pro Standort) oder steigst ab 10 Standorten auf den Kette-Tarif (100 €/Monat Flatrate) um. Dein Gründer-Standort bleibt ohne Folgekosten.',
    },
    {
      q: 'Was, wenn die 100 Plätze voll sind?',
      a: 'Dann gibt es das Angebot nicht mehr. Wir vergeben Plätze in der Reihenfolge, in der bezahlte Verträge bei uns eingehen. Eine Reservierungs-Anfrage zählt zeitlich; der Platz ist aber erst bestätigt, sobald die Bezahlung bei uns eingegangen ist.',
    },
  ],
}
```

- [ ] **Step 2: Type-check works**

Run: `npx tsc --noEmit` (oder `npm run build` weiter unten reicht).
Expected: keine Type-Fehler.

- [ ] **Step 3: Commit**

```bash
git add src/data/gruender.ts
git commit -m "feat(data): gründer city-config + FAQ für Köln"
```

---

## Task 2: LeadForm.tsx — 4 neue optionale Props

**Files:**
- Modify: `src/components/LeadForm.tsx`

- [ ] **Step 1: Erweitere Props-Interface (Lines 4-9)**

Ersetze:
```tsx
interface Props {
  niche: string
  city: string
  formspreeId?: string
  whatsappUrl?: string
}
```
mit:
```tsx
interface Props {
  niche: string
  city: string
  formspreeId?: string
  whatsappUrl?: string
  mode?: 'standard' | 'gruender'
  bannerText?: string
  submitLabel?: string
  successHeadline?: string
}
```

- [ ] **Step 2: Erweitere Funktions-Signatur + Destructuring (Line 24)**

Ersetze:
```tsx
export default function LeadForm({ niche, city, whatsappUrl }: Props) {
```
mit:
```tsx
export default function LeadForm({
  niche,
  city,
  whatsappUrl,
  mode = 'standard',
  bannerText,
  submitLabel = 'Demo-Karte erstellen',
  successHeadline,
}: Props) {
```

- [ ] **Step 3: Submit-Body erweitern (Line 62-69)**

Ersetze:
```tsx
body: JSON.stringify({
  vorname:   data.vorname,
  instagram: cleanInstagram,
  telefon:   data.telefon,
  niche:     niche.toLowerCase(),
  utm:       getUtmParams(),
}),
```
mit:
```tsx
body: JSON.stringify({
  vorname:   data.vorname,
  instagram: cleanInstagram,
  telefon:   data.telefon,
  niche:     niche.toLowerCase(),
  city:      city.toLowerCase(),
  mode,
  utm:       getUtmParams(),
}),
```

- [ ] **Step 4: Success-State-Headline ersetzen (Line 105-107)**

Ersetze:
```tsx
<h3 className="text-xl font-semibold tracking-wide text-white mb-3">
  {vorname ? `Deine Demo-Karte ist fertig, ${vorname}!` : 'Deine Demo-Karte ist fertig!'}
</h3>
```
mit:
```tsx
<h3 className="text-xl font-semibold tracking-wide text-white mb-3">
  {(() => {
    if (successHeadline) {
      return vorname ? `${successHeadline}, ${vorname}!` : `${successHeadline}!`
    }
    return vorname ? `Deine Demo-Karte ist fertig, ${vorname}!` : 'Deine Demo-Karte ist fertig!'
  })()}
</h3>
```

- [ ] **Step 5: Success-State-Body je nach Mode (Line 108-110)**

Ersetze:
```tsx
<p className="text-white text-sm leading-relaxed max-w-sm mx-auto mb-8">
  Lade sie jetzt ins Wallet — kein Download, keine App nötig.
</p>
```
mit:
```tsx
<p className="text-white text-sm leading-relaxed max-w-sm mx-auto mb-8">
  {mode === 'gruender'
    ? 'Wir melden uns innerhalb 24 h. Lade jetzt deine Demo-Karte ins Wallet — so siehst du schon mal, wie es aussieht.'
    : 'Lade sie jetzt ins Wallet — kein Download, keine App nötig.'}
</p>
```

- [ ] **Step 6: Banner über Form rendern (vor `<form …>` Zeile 177-178)**

Ersetze:
```tsx
return (
  <form onSubmit={handleSubmit} className="space-y-5">
    <p className="text-xs tracking-[0.2em] uppercase text-white/55 mb-1">2 Pflichtfelder · 30 Sekunden</p>
```
mit:
```tsx
return (
  <>
    {mode === 'gruender' && bannerText && (
      <div className="mb-6 border border-gold-600/60 bg-gradient-to-b from-gold-600/[0.08] to-transparent p-5">
        <p className="text-xs tracking-[0.3em] uppercase text-gold-600 mb-2">Platz sichern</p>
        <p className="text-sm text-white/90 font-light leading-relaxed">{bannerText}</p>
      </div>
    )}
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-xs tracking-[0.2em] uppercase text-white/55 mb-1">2 Pflichtfelder · 30 Sekunden</p>
```

- [ ] **Step 7: Submit-Button-Label ersetzen (Line 230-237)**

Ersetze den `else`-Zweig im Submit-Button:
```tsx
) : (
  <>
    Demo-Karte erstellen
    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
    </svg>
  </>
)}
```
mit:
```tsx
) : (
  <>
    {submitLabel}
    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
    </svg>
  </>
)}
```

- [ ] **Step 8: Trust-Line am Form-Footer mode-abhängig (Line 241-243)**

Ersetze:
```tsx
<p className="text-xs tracking-widest uppercase text-center text-white">
  Kein Risiko · Keine Kreditkarte · 90 Tage kostenlos
</p>
```
mit:
```tsx
<p className="text-xs tracking-widest uppercase text-center text-white">
  {mode === 'gruender'
    ? '90 Tage Geld-zurück · Verbindlich erst nach Telefonat · DSGVO'
    : 'Kein Risiko · Keine Kreditkarte · 90 Tage kostenlos'}
</p>
```

- [ ] **Step 9: Schließendes Fragment für Banner-Wrapper (am Ende der return-JSX)**

Direkt nach `</form>` und vor `)` am Ende der Funktion: füge `</>` ein, um das Fragment aus Step 6 zu schließen.

Vorher:
```tsx
      </p>
    </form>
  )
}
```
Nachher:
```tsx
      </p>
    </form>
    </>
  )
}
```

- [ ] **Step 10: Build-Check — keine Type-Fehler, keine Regression**

Run: `npm run build`
Expected: erfolgreich. Output zeigt `Generating 1798 page(s)` (oder ähnliche Zahl, kein Fehler).

- [ ] **Step 11: Commit**

```bash
git add src/components/LeadForm.tsx
git commit -m "feat(form): LeadForm erweitert um mode/banner/submitLabel/successHeadline"
```

---

## Task 3: BaseLayout.astro — optionale `noindex`-Prop

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Props-Interface erweitern (Frontmatter)**

Ersetze:
```astro
interface Props {
  title: string
  description: string
  ogImage?: string
  lang?: 'de' | 'fr'
  locale?: string
  alternates?: { hreflang: string; href: string }[]
}

const { title, description, ogImage, lang = 'de', locale = 'de_DE', alternates = [] } = Astro.props
```
mit:
```astro
interface Props {
  title: string
  description: string
  ogImage?: string
  lang?: 'de' | 'fr'
  locale?: string
  alternates?: { hreflang: string; href: string }[]
  noindex?: boolean
}

const { title, description, ogImage, lang = 'de', locale = 'de_DE', alternates = [], noindex = false } = Astro.props
```

- [ ] **Step 2: Meta-Robots-Tag in `<head>` einfügen**

Direkt nach `<meta name="description" content={description} />` (Zeile ~21) einfügen:
```astro
{noindex && <meta name="robots" content="noindex, follow" />}
```

- [ ] **Step 3: Smoke-Build, dass DE-Seiten unverändert rendern**

Run: `npm run build`
Expected: erfolgreich, keine Astro-Warnings über Layout-Props.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat(seo): BaseLayout optionale noindex-prop"
```

---

## Task 4: submit.php — Gründer-Tagging

**Files:**
- Modify: `public/api/submit.php`

- [ ] **Step 1: `$mode` und `$city` aus Body lesen (nach Zeile 55)**

Direkt nach `$utm = $body['utm'] ?? [];` einfügen:
```php
$mode = strtolower(trim($body['mode'] ?? 'standard'));
$reqCity = strtolower(trim($body['city'] ?? ''));
```

- [ ] **Step 2: Gründer-Tags an Standard-Salesflare-Flow anhängen (Zeile 229)**

Ersetze:
```php
$tags          = array_values(array_filter([$niche, $leadCity, $utmCampaign]));
```
mit:
```php
$baseTags = [$niche, $leadCity, $utmCampaign];
if ($mode === 'gruender') {
    $baseTags[] = 'gruender-100';
    $baseTags[] = 'lifetime-100eur';
    if ($reqCity) {
        $baseTags[] = $reqCity;
    }
}
$tags = array_values(array_filter($baseTags));
```

- [ ] **Step 3: PHP-Syntax-Check lokal**

Run: `php -l public/api/submit.php`
Expected: `No syntax errors detected in public/api/submit.php`

- [ ] **Step 4: Commit**

```bash
git add public/api/submit.php
git commit -m "feat(api): submit.php gründer-tags für salesflare"
```

---

## Task 5: astro.config.mjs — Sitemap-Filter

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Filter erweitern**

Ersetze:
```js
integrations: [react(), tailwind(), sitemap({ filter: (page) => !page.includes('/preview-') }), mdx()],
```
mit:
```js
integrations: [react(), tailwind(), sitemap({ filter: (page) => !page.includes('/preview-') && !page.includes('/gruender') }), mdx()],
```

- [ ] **Step 2: Build-Check, Sitemap stimmt**

Run: `npm run build`
Expected: erfolgreich.

Run: `grep -c "gruender" dist/sitemap-index.xml dist/sitemap-0.xml`
Expected: `0` für beide Dateien (Gründer-URL fehlt in Sitemap).

- [ ] **Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "feat(seo): sitemap-filter schließt /gruender aus"
```

---

## Task 6: GruenderLanding-Komponente

**Files:**
- Create: `src/components/GruenderLanding.astro`

**Skill-Aktivierung für diese Task: `frontend-design:frontend-design`** — die Komponente muss aussehen wie eine Premium-Conversion-Landing. Brand-Tokens: `bg-black`, `text-gold-600` (`#8B7300`), `font-extralight` für Headlines, `tracking-[0.3em] uppercase` für Labels. Layout-Referenz: `src/pages/preise.astro` für Section-Padding und Container-Breiten.

- [ ] **Step 1: Datei mit komplettem Inhalt erstellen**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro'
import Navbar from './Navbar.astro'
import Footer from './Footer.astro'
import Icon from './icons/TrustIcons.astro'
import LeadForm from './LeadForm.tsx'
import type { GruenderCityConfig } from '../data/gruender'

interface Props {
  config: GruenderCityConfig
}

const { config } = Astro.props
const { cityCapitalized, cityDative, faq } = config

const title = `Gründer-Aktion ${cityCapitalized} — 100 € einmalig, kein Abo | bonuskarte.digital`
const description = `Für die ersten 100 ${cityDative} Betriebe: digitale Stempelkarte für 100 € einmalig. Kein Abo, 90 Tage Geld-zurück-Garantie. Apple & Google Wallet.`
const bannerText = 'Du sicherst dir einen der 100 Lifetime-Plätze. Wir melden uns innerhalb 24 h zur Bezahlung und zum Setup.'
---

<BaseLayout title={title} description={description} noindex={true}>
  <script type="application/ld+json" set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  })} />

  <Navbar ctaHref="#form" ctaLabel="Platz sichern" />

  <!-- ── HERO ─────────────────────────────────────────────────── -->
  <section class="relative bg-black overflow-hidden pt-32 pb-16 px-5 sm:px-8">
    <div class="absolute inset-0 bg-grid-white"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-600 rounded-full blur-[200px] opacity-5 pointer-events-none"></div>

    <div class="relative max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div>
        <div class="inline-flex items-center gap-3 border border-gold-600/40 px-4 py-2 mb-8">
          <span class="w-1 h-1 bg-gold-600 animate-pulse-slow"></span>
          <span class="text-gold-600 text-[10px] font-bold tracking-[0.3em] uppercase">
            Für die ersten 100 {cityDative} Betriebe
          </span>
        </div>

        <h1 class="text-5xl sm:text-6xl leading-[1.05] tracking-tight mb-6">
          <span class="font-extralight text-white block mb-2">Einmal 100 €.</span>
          <span class="font-bold text-gold-600 block">Nie wieder ein Abo.</span>
        </h1>

        <p class="text-white/85 text-base font-light leading-relaxed max-w-lg mb-8">
          Sichere dir den Gründer-Preis von bonuskarte.digital — solange Plätze frei sind. Voller Funktionsumfang, dauerhaft. Kein Monatsbeitrag.
        </p>

        <div class="flex flex-wrap gap-x-6 gap-y-3 mb-10">
          {['✓ 90 Tage Geld-zurück', '✓ Apple & Google Wallet', '✓ Setup in 24 h'].map(t => (
            <span class="text-[11px] tracking-widest uppercase text-white/80">{t}</span>
          ))}
        </div>

        <a href="#form"
          class="group inline-flex items-center gap-3 bg-gold-600 hover:bg-gold-500 text-black px-10 py-5 text-xs font-bold tracking-[0.25em] uppercase transition-all">
          Platz sichern
          <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
      </div>

      <!-- Phone-Visual (Platzhalter; mit frontend-design Skill konkretisieren — kann PhoneMockup.tsx mit client:only="react" sein) -->
      <div class="hidden md:flex justify-center">
        <div class="w-72 h-[560px] border border-gold-600/30 bg-gradient-to-b from-gold-600/[0.04] to-transparent rounded-[2.5rem] flex items-center justify-center">
          <span class="text-white/30 text-xs tracking-widest uppercase">Wallet-Mockup</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ── VALUE-BLOCK ──────────────────────────────────────────── -->
  <section class="py-12 sm:py-20 px-5 sm:px-8 bg-ink-950 relative overflow-hidden">
    <div class="absolute inset-0 bg-grid-white opacity-50"></div>
    <div class="relative max-w-4xl mx-auto">
      <div class="flex items-center gap-4 mb-14">
        <div class="h-px flex-1 bg-white/5"></div>
        <span class="text-xs tracking-[0.4em] uppercase text-white">Was du bekommst</span>
        <div class="h-px flex-1 bg-white/5"></div>
      </div>

      <div class="grid sm:grid-cols-2 gap-y-5 gap-x-10">
        {[
          'Unbegrenzte Karten',
          'Push-Nachrichten an Stammkunden',
          'Apple & Google Wallet',
          'Eigenes Branding (Logo, Farbe)',
          'Live-Statistiken',
          'Setup in unter 24 h',
        ].map(f => (
          <div class="flex items-start gap-3">
            <Icon name="diamond" class="w-3.5 h-3.5 text-gold-600 mt-1 flex-shrink-0" />
            <span class="text-sm text-white font-light">{f}</span>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- ── ROI-BLOCK ────────────────────────────────────────────── -->
  <section class="py-12 sm:py-20 px-5 sm:px-8 bg-black">
    <div class="max-w-3xl mx-auto text-center">
      <p class="text-xs tracking-[0.4em] uppercase text-gold-600 mb-6">Was es dich kostet</p>
      <h2 class="text-6xl sm:text-7xl font-extralight text-white tracking-tight mb-2">
        9 Cent
      </h2>
      <p class="text-white/60 text-sm tracking-widest uppercase mb-10">am Tag · bei 3 Jahren Nutzung</p>
      <p class="text-white/90 text-lg font-light leading-relaxed max-w-xl mx-auto">
        Kommt nur ein Gast einmal mehr wegen der Karte — hat es sich bezahlt.
      </p>
    </div>
  </section>

  <!-- ── VERGLEICHS-TABELLE ───────────────────────────────────── -->
  <section class="py-12 sm:py-20 px-5 sm:px-8 bg-ink-950 relative overflow-hidden">
    <div class="absolute inset-0 bg-grid-white opacity-50"></div>
    <div class="relative max-w-3xl mx-auto">
      <div class="flex items-center gap-4 mb-14">
        <div class="h-px flex-1 bg-white/5"></div>
        <span class="text-xs tracking-[0.4em] uppercase text-white">Regulär vs. Gründer</span>
        <div class="h-px flex-1 bg-white/5"></div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-white/5">
              <th class="text-left text-white/60 text-xs tracking-[0.3em] uppercase font-normal pb-4 pr-8">Zeitraum</th>
              <th class="text-right text-white/60 text-xs tracking-[0.3em] uppercase font-normal pb-4 px-4">Solo-Abo (29 €/Monat)</th>
              <th class="text-right text-gold-600 text-xs tracking-[0.3em] uppercase font-normal pb-4 pl-4">Gründer (100 € einmal)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            {[
              ['Nach 12 Monaten', '348 €', '100 €'],
              ['Nach 3 Jahren',   '1.044 €', '100 €'],
              ['Nach 5 Jahren',   '1.740 €', '100 €'],
              ['Nach 10 Jahren',  '3.480 €', '100 €'],
            ].map(([t, regular, gruender]) => (
              <tr>
                <td class="py-4 pr-8 text-white font-light">{t}</td>
                <td class="py-4 px-4 text-right text-white/50">{regular}</td>
                <td class="py-4 pl-4 text-right text-gold-600 font-bold">{gruender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p class="text-center text-white/40 text-xs tracking-wide mt-6">
        Solo-Abo-Preis: bonuskarte.digital regulär · zzgl. MwSt.
      </p>
    </div>
  </section>

  <!-- ── STORY-BLOCK ──────────────────────────────────────────── -->
  <section class="py-12 sm:py-20 px-5 sm:px-8 bg-black">
    <div class="max-w-2xl mx-auto">
      <p class="text-xs tracking-[0.4em] uppercase text-gold-600 mb-6 text-center">Warum gibt's das?</p>
      <p class="text-white/85 text-base font-light leading-relaxed text-center">
        bonuskarte.digital wird bootstrapped aufgebaut. Die ersten 100 Betriebe finanzieren das Wachstum — und sichern sich dafür den Lifetime-Preis. Danach gilt der reguläre Monatstarif für alle Neuen.
      </p>
    </div>
  </section>

  <!-- ── FORM-BLOCK ───────────────────────────────────────────── -->
  <section id="form" class="py-12 sm:py-20 px-5 sm:px-8 bg-ink-950 relative overflow-hidden">
    <div class="absolute inset-0 bg-grid-white opacity-50"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-600 rounded-full blur-[150px] opacity-5 pointer-events-none"></div>

    <div class="relative max-w-md mx-auto">
      <div class="text-center mb-10">
        <p class="text-xs tracking-[0.4em] uppercase text-gold-600 mb-4">Platz sichern</p>
        <h2 class="text-4xl font-extralight text-white tracking-tight mb-2">
          Einer von 100.
        </h2>
        <p class="text-white/60 text-sm font-light">
          2 Felder · 30 Sekunden · keine Kreditkarte.
        </p>
      </div>

      <LeadForm
        client:load
        niche="cafes"
        city={config.city}
        mode="gruender"
        bannerText={bannerText}
        submitLabel="Platz sichern"
        successHeadline="Dein Platz ist reserviert"
      />
    </div>
  </section>

  <!-- ── FAQ ──────────────────────────────────────────────────── -->
  <section class="py-12 sm:py-20 px-5 sm:px-8 bg-black">
    <div class="max-w-3xl mx-auto">
      <div class="flex items-center gap-4 mb-14">
        <div class="h-px flex-1 bg-white/5"></div>
        <span class="text-xs tracking-[0.4em] uppercase text-white">Häufige Fragen</span>
        <div class="h-px flex-1 bg-white/5"></div>
      </div>

      <div class="space-y-px">
        {faq.map(item => (
          <div class="border border-white/5 p-6 hover:border-gold-600/20 transition-colors">
            <p class="text-white text-sm font-semibold mb-2">{item.q}</p>
            <p class="text-white/80 text-sm font-light leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- ── FINAL CTA ────────────────────────────────────────────── -->
  <section class="py-12 sm:py-20 px-5 sm:px-8 bg-ink-950 border-t border-white/5 relative overflow-hidden">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-600 rounded-full blur-[150px] opacity-5"></div>

    <div class="relative max-w-2xl mx-auto text-center">
      <p class="text-gold-600 text-xs tracking-[0.4em] uppercase mb-6">Solange Plätze frei sind</p>
      <h2 class="text-4xl sm:text-5xl font-extralight text-white tracking-tight mb-2">
        Einmal 100 €.
      </h2>
      <h2 class="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-10">
        Nie wieder ein Abo.
      </h2>

      <a href="#form"
        class="group inline-flex items-center gap-3 bg-gold-600 hover:bg-gold-500 text-black px-10 py-5 text-xs font-bold tracking-[0.25em] uppercase transition-all">
        Jetzt Platz sichern
        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </a>

      <div class="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
        {['✓ 90 Tage Geld-zurück', '✓ Apple & Google Wallet', '✓ Setup in 24 h'].map(t => (
          <span class="text-[11px] tracking-widest uppercase text-white/80">{t}</span>
        ))}
      </div>
    </div>
  </section>

  <Footer />
</BaseLayout>
```

- [ ] **Step 2: Build-Check, GruenderLanding rendert ohne Fehler**

Run: `npm run build`
Expected: erfolgreich; im Output `Generating` zeigt sich `/koeln/gruender` als statisch gebaut (sobald Task 7 ergänzt ist, ansonsten erst dort prüfbar).

- [ ] **Step 3: Polish-Pass mit `frontend-design`-Skill**

Mit `frontend-design`-Skill aktiv prüfen:
- Mobile-Layout (375 px): Hero-2-Spalten kollabiert sauber, Phone-Mockup oben, CTA-Button full-width
- Tablet (768 px): Übergang flüssig
- Desktop (1280 px): Hero 2-spaltig, Vergleichs-Tabelle ohne Scroll
- Kein Layout-Shift, kein Schrift-Hierarchie-Bruch, kein zu-niedriger Kontrast
- Spacing zwischen Sektionen konsistent mit `preise.astro`
- WalletMockup oder PhoneMockup statt Platzhalter, falls einer schon Brand-konform ist

Wenn Anpassungen nötig, in dieser Datei editieren — nichts auf andere Seiten ausweiten.

- [ ] **Step 4: Commit**

```bash
git add src/components/GruenderLanding.astro
git commit -m "feat(landing): GruenderLanding-component mit 8 sections + brand-styling"
```

---

## Task 7: Köln-Wrapper-Seite

**Files:**
- Create: `src/pages/koeln/gruender.astro`

- [ ] **Step 1: Datei erstellen**

```astro
---
import GruenderLanding from '../../components/GruenderLanding.astro'
import { koeln } from '../../data/gruender'
---
<GruenderLanding config={koeln} />
```

- [ ] **Step 2: Build-Check, Page wird statisch gebaut**

Run: `npm run build`
Expected: erfolgreich. Output enthält `▶ src/pages/koeln/gruender.astro` und Generierung von `/koeln/gruender/index.html`.

- [ ] **Step 3: Preview lokal starten**

Run: `npm run preview` (NICHT `npm run dev` — iCloud-Falle laut Memory `project_bonuskarte_digital`)
Expected: Server läuft, typischerweise auf `http://localhost:4321`.

Öffne `http://localhost:4321/koeln/gruender` im Browser:
- Alle 8 Sektionen sichtbar (Hero → Value → ROI → Compare → Story → Form → FAQ → FinalCTA)
- Navbar zeigt CTA-Button „Platz sichern" mit Anker `#form`
- Lead-Form hat Gold-Banner über sich
- Submit-Button-Label = „Platz sichern"
- Trust-Line unter Form = „90 Tage Geld-zurück · Verbindlich erst nach Telefonat · DSGVO"

Öffne `http://localhost:4321/koeln/nippes/cafes` (Smoke-Test einer bestehenden Page):
- Form-Banner NICHT sichtbar
- Submit-Button-Label = „Demo-Karte erstellen"
- Trust-Line = „Kein Risiko · Keine Kreditkarte · 90 Tage kostenlos"

- [ ] **Step 4: Robots-Meta + Sitemap prüfen**

```bash
curl -s http://localhost:4321/koeln/gruender | grep "robots"
```
Expected: `<meta name="robots" content="noindex, follow">`

```bash
grep "gruender" dist/sitemap-*.xml
```
Expected: keine Ausgabe (Gründer-URL ist ausgeschlossen).

- [ ] **Step 5: Mobile-Check im Browser (375 px Viewport)**

Chrome DevTools → Device Toolbar → iPhone SE.
Expected: alle 8 Sektionen ohne horizontalen Scroll, Vergleichs-Tabelle scrollt horizontal innerhalb der Sektion.

- [ ] **Step 6: Commit**

```bash
git add src/pages/koeln/gruender.astro
git commit -m "feat(landing): /koeln/gruender wrapper-seite"
```

---

## Task 8: review-pr + Daniel-Handoff

- [ ] **Step 1: `review-pr` Skill auf den Diff laufen lassen**

Aktiviere `review-pr` Skill. Der Skill prüft den Branch-Diff gegen Repo-Regeln + High-Confidence-Bugs.
Expected: ggf. ein paar Findings; ich (Claude) reviewe und beheben oder begründet ablehnen.

- [ ] **Step 2: Daniel-Handoff für Live-Check**

Sage Daniel:
- Branch `feat/gruender-landing` ist fertig, X Commits seit Spec
- URL lokal: `http://localhost:4321/koeln/gruender`
- Was er prüfen soll: Hero, Form-Banner, Submit-Klick mit echtem Test-Lead (Boomerang Demo + Salesflare-Tag-Check)
- Was er NICHT machen soll: nicht pushen, nicht mergen — das passiert nach seiner Freigabe

- [ ] **Step 3: Bei Freigabe**

Daniel sagt explizit „push" → `git push -u origin feat/gruender-landing`.
Daniel sagt explizit „merge" → optional `gh pr create` oder direkter Merge nach main.

**Stop hier** — keine Pushes ohne Daniels Freigabe (CLAUDE.md absolute Regel).

---

## Out of Scope (bewusst nicht in diesem Plan, gem. Spec)

- Restplatz-Zähler (statisch oder dynamisch)
- Testimonials
- Stadt-Switcher / FR-Übersetzung
- Stripe-Integration für Sofort-Bezahlung
- Sticky-Mobile-Bottom-CTA
- Verlinkung aus Navbar / index.astro / preise.astro
- Eigenes OG-Image (Default `/og-default.png` reicht)
- AGB / Rechts-Update für Lifetime-Modell (vor Live-Schaltung mit Daniel klären — nicht Teil des Codes)
- Salesflare-Opportunity-Wert via API (Tags reichen für Filter; Daniel kann Wert manuell in Salesflare-UI setzen)

---

## Verifikation vor Merge (Final-Checkliste)

- [ ] `npm run build` erfolgreich, keine Warnings über fehlerhafte Layouts/Props
- [ ] `npm run preview`: `/koeln/gruender` rendert mit allen 8 Sektionen, Desktop + Mobile
- [ ] Robots-Meta auf `/koeln/gruender` = `noindex, follow`
- [ ] Sitemap (`dist/sitemap-*.xml`) enthält `/koeln/gruender` NICHT
- [ ] Smoke-Test: `/koeln/nippes/cafes` rendert wie heute, kein Banner, kein neuer Button-Text
- [ ] Echter Test-Lead über `/koeln/gruender` → Salesflare-Lead vorhanden mit Tags `gruender-100`, `lifetime-100eur`, `koeln`
- [ ] review-pr-Skill ohne offene High-Confidence-Findings
- [ ] Daniel hat lokal getestet und Freigabe gegeben
