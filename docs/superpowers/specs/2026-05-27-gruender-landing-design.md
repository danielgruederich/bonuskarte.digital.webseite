# Gründer-Landing-Page — Design-Spec

**Datum:** 2026-05-27
**Branch:** `feat/gruender-landing`
**URL (v1):** `/koeln/gruender`

## Ziel

Standalone Conversion-Landing für 100 Lifetime-Plätze à 100 € einmalig. Primär für Köln, erweiterbar auf weitere Städte. Nur über Google Ads und Outreach erreichbar (noindex).

## Entscheidungen

1. **Angebot:** Lifetime-Deal — 100 € einmal, nie wieder Kosten.
2. **Funnel:** Bestehender `LeadForm.tsx` mit voller 3-Stufen-Flow (Form → Boomerang-Demo-Karte → Wallet-Install). Gründer-Banner über Form. Salesflare-Tags: `gruender-100`, `lifetime-100eur`, `koeln`. Opportunity-Wert 100 €.
3. **URL-Pattern:** Per-Stadt-Wrapper (`src/pages/koeln/gruender.astro`), nicht dynamic `[city]`-Route. Konsistent mit bestehender Repo-Konvention.
4. **Restplatz-Zähler:** Keiner. Nur Aussage „Für die ersten 100 Kölner Betriebe".
5. **Verlinkung:** Standalone. Keine Eingriffe in Navbar, Footer, index.astro, preise.astro oder FR-Seiten.
6. **Trust-Frame:** 90-Tage-Geld-zurück-Garantie statt Trial. Kunde zahlt sofort, Refund-Option bei Unzufriedenheit.
7. **Lifetime-Wording:** Suffix „für immer" wird nicht in Value-Bullets wiederholt. Die Botschaft trägt Headline + Vergleichstabelle + Banner.
8. **SEO:** Noindex + aus Sitemap-Filter ausgeschlossen. Saubere A/B-Test-Quelle, keine Organic-Verunreinigung.

## Datei-Struktur

### Neu
- `src/components/GruenderLanding.astro` — komplette Page-Logik, parametrisiert per Props
- `src/data/gruender.ts` — City-Config (city-name, slug, ggf. später Branchen-Hinweis)
- `src/pages/koeln/gruender.astro` — 5-Zeilen-Wrapper: importiert Component + Köln-Config

### Modifiziert
- `src/components/LeadForm.tsx` — 4 neue optional Props (kein Breaking-Change)
- `public/api/submit.php` — Mode-Handler für Gründer-Tagging und Opportunity-Wert
- `src/layouts/BaseLayout.astro` — optionale `noindex`-Prop
- `astro.config.mjs` — Sitemap-Filter erweitert um `/gruender`

## Page-Sektionen (top → bottom)

1. **Hero**
   - Pre-Headline (Gold, all-caps, tracking): „FÜR DIE ERSTEN 100 KÖLNER BETRIEBE"
   - Headline 2-zeilig: „Einmal 100 €." / „Nie wieder ein Abo."
   - Sub-Headline: „Sichere dir den Gründer-Preis, solange Plätze frei sind."
   - Trust-Line: „90 Tage Geld-zurück-Garantie · Apple & Google Wallet · Setup in 24h"
   - CTA-Button: „Platz sichern" (Anker `#form`)
   - Visual: bestehende `PhoneMockup` (Desktop rechts / Mobile oben)

2. **Value-Block** — 6 Bullets in 2 Spalten (Desktop), gestapelt (Mobile):
   - Unbegrenzte Karten
   - Push-Nachrichten an Stammkunden
   - Apple & Google Wallet
   - Eigenes Branding (Logo, Farbe)
   - Live-Statistiken
   - Setup in unter 24h

3. **ROI-Block**
   - Big-Number: „9 Cent / Tag" (Rechnung: 100 € ÷ 3 Jahre ÷ 365)
   - Kern-Satz: „Kommt nur ein Gast einmal mehr wegen der Karte, hat es sich bezahlt."

4. **Vergleichs-Tabelle** — Regulär (29 €/Monat) vs. Gründer (100 € einmal):

   | Zeitraum | Solo-Abo | Gründer |
   |---|---|---|
   | Nach 12 Monaten | 348 € | 100 € |
   | Nach 3 Jahren | 1.044 € | 100 € |
   | Nach 5 Jahren | 1.740 € | 100 € |
   | Nach 10 Jahren | 3.480 € | 100 € |

   - Gold-Highlight der Gründer-Spalte, gedämpfte linke Spalte

5. **Story-Block** (3 Sätze): „bonuskarte.digital wird bootstrapped aufgebaut. Die ersten 100 Betriebe finanzieren das Wachstum — und sichern sich dafür den Lifetime-Preis. Danach gilt der reguläre Monatstarif für alle Neuen."

6. **Form-Block**
   - Gold-Banner über Form: „Du sicherst dir einen der 100 Lifetime-Plätze. Wir melden uns innerhalb 24 h zur Bezahlung und zum Setup."
   - `LeadForm.tsx` mit Props: `mode="gruender"`, `city="koeln"`, `niche="cafes"` (Fallback für Demo-Karte), `bannerText`, `submitLabel="Platz sichern"`, `successHeadline="Dein Platz ist reserviert"`
   - Anker-ID `#form`

7. **FAQ** — 5 Fragen:
   - Was passiert nach dem Absenden?
   - Wie zahle ich die 100 €?
   - Was bedeutet die 90-Tage-Geld-zurück-Garantie?
   - Was, wenn ich später Standorte dazunehme?
   - Was, wenn die 100 Plätze voll sind?
   - JSON-LD `FAQPage` Schema (konsistent mit `preise.astro`)

8. **Final CTA** — Wiederholung Gold-Box + CTA-Button + Trust-Repeats. Kein Sticky-Mobile-Bottom-CTA in v1.

## Komponenten-API

### `GruenderLanding.astro` Props
```ts
interface Props {
  city: 'koeln'                              // erweiterbar
  cityCapitalized: string                    // "Köln"
  pricingNote?: string                       // optional, default "100 € einmalig"
  faq: { q: string; a: string }[]            // FAQ aus gruender.ts
}
```

### `LeadForm.tsx` — neue optionale Props
```ts
interface Props {
  niche: string
  city: string
  formspreeId?: string
  whatsappUrl?: string
  mode?: 'standard' | 'gruender'   // NEU, default 'standard'
  bannerText?: string              // NEU
  submitLabel?: string             // NEU, default 'Demo-Karte erstellen'
  successHeadline?: string         // NEU, default 'Deine Demo-Karte ist fertig!'
}
```

Verhalten `standard`: identisch zu heute (alle 75+ bestehenden Köln/Branchen-Seiten unverändert).
Verhalten `gruender`:
- Banner über Form sichtbar
- Submit-Button-Label: „Platz sichern"
- Footer-Trust-Line: „90 Tage Geld-zurück · Keine Kreditkarte · DSGVO" (statt heutige „Kein Risiko · Keine Kreditkarte · 90 Tage kostenlos")
- Success-Headline: „Dein Platz ist reserviert, {vorname}!"
- Submit-Body bekommt `mode: 'gruender'`
- Demo-Karten-Step bleibt erhalten (Wallet-WOW + niche='cafes' Fallback)

### `submit.php` — neue Logik
- Liest `mode` aus Request-Body
- Wenn `mode === 'gruender'`:
  - Salesflare-Opportunity-Wert: `100` (statt Standard)
  - Salesflare-Tags zusätzlich: `gruender-100`, `lifetime-100eur`, `<city>`
- Boomerang-API-Call unverändert
- Standard-Flow unangetastet

### `BaseLayout.astro` — neue Prop
```ts
interface Props {
  // ... existing
  noindex?: boolean                // NEU, default false
}
```
Wenn `noindex=true` → `<meta name="robots" content="noindex, follow">` im `<head>`.

### `astro.config.mjs` — Sitemap-Filter
```ts
sitemap({ filter: (page) => !page.includes('/preview-') && !page.endsWith('/gruender/') && !page.endsWith('/gruender') })
```

## Tracking

Wiederverwendung bestehender Events mit `niche='gruender'` als Diskriminator:
- `form_started` → bei erstem Focus
- `demo_card_created` → bei erfolgreicher Submission
- `leadConversion` → Google Ads Conversion (bestehend, feuert unverändert)
- `walletInstallClicked` → `location='gruender-success'` möglich (optional, bestehende Funktion akzeptiert beliebige strings)

Keine neuen gtag-Events. Keine `analytics.ts`-Änderungen.

Filter in GA4 / Google Ads:
- Form-Starts/Conversions für Gründer-Aktion: `niche=gruender`
- Wallet-Install-Klicks aus Gründer-Funnel: `niche=gruender`

## Brand-Konsistenz

- Schwarz `#000000` + Gold `#8B7300` (Tailwind `gold-600`)
- Thin Typography, all-caps Tracking auf Labels/Badges
- Geometrisch, minimal — folgt Pattern von `preise.astro` und `index.astro`
- Mobile-first (per Memory `feedback_mobile_first.md`)
- Hoher Kontrast aller Schriften (per Memory `feedback_font_contrast.md`)

## Out of Scope (bewusst nicht in v1)

- Restplatz-Zähler (statisch oder dynamisch)
- Testimonials (bestehende sind Dummy-Daten — werden separat ersetzt)
- Stadt-Switcher / FR-Übersetzung der Gründer-Page
- Stripe-Integration für Sofort-Bezahlung (manueller Bezahlweg via Telefonkontakt)
- Sticky-Mobile-Bottom-CTA
- Verlinkung aus Navbar / index / preise / Footer (Standalone-Ansatz)
- Eigenes OG-Image (Default `/og-default.png` reicht für Ads/Outreach)
- AGB-/Rechts-Update für Lifetime-Modell (vor Live-Schaltung mit Daniel zu klären, nicht Teil der Page-Implementierung)

## Branch + Commit-Plan

Branch: `feat/gruender-landing` (aktiv).

Geplante Commits (sequenziell, jeder einzeln reviewbar):
1. `docs: spec für gründer-landing`
2. `feat(data): src/data/gruender.ts city-config`
3. `feat(landing): GruenderLanding-component + koeln-wrapper`
4. `feat(form): LeadForm.tsx erweitert um mode/banner/submitLabel/successHeadline`
5. `feat(api): submit.php gründer-tags und opportunity-wert`
6. `feat(seo): BaseLayout noindex-prop + sitemap-filter für /gruender`

Kein Push, kein Deploy ohne Daniels ausdrückliche Freigabe.

## Verifikation vor PR / Merge

- `npm run build` erfolgreich (kein Type- oder Routing-Fehler)
- `npm run preview` lokal: alle 8 Sektionen rendern korrekt, Desktop + Mobile (per `feedback_test_before_deploy`)
- Submit-Test gegen `submit.php` (test-mode oder echter Lead): Tag `gruender-100` landet in Salesflare; Opportunity-Wert = 100 €
- Robots-Meta = `noindex,follow` auf `/koeln/gruender`
- `sitemap-index.xml` enthält `/koeln/gruender` NICHT
- Bestehende `/koeln/[veedel]/[niche]`-Pages bleiben funktional (kein Breaking-Change durch LeadForm-Props)
- review-pr Skill läuft auf dem Diff vor Push
