# bonuskarte.digital — Rebranding Design Spec
**Version:** 1.0  
**Datum:** 2026-06-23  
**Grundlage:** Brand Book v1.0 (fuerte.digital)

---

## Problem

Die aktuelle Website nutzt die fuerte.digital-Brand (Schwarz + Gold, Inter-Font, F-Favicon). bonuskarte.digital hat keine eigene visuelle Identität und verschmilzt optisch mit der Agentur-Marke.

---

## Ziel

Vollständige Umsetzung der im Brand Book definierten bonuskarte.digital-Identität auf der Website. Nach dem Rebranding ist die Marke auf den ersten Blick eigenständig erkennbar — unabhängig von fuerte.digital.

---

## 1. Farbsystem

### Palette (ersetzt bestehende `gold`/`ink`-Tokens komplett)

| Token | Hex | RGB | Rolle |
|---|---|---|---|
| `amber` | `#F25C24` | 242 / 92 / 36 | Aktiv · CTA · gefüllter Stempel · Akzent |
| `ink` | `#1A1410` | 26 / 20 / 16 | Text · Kontur · Tiefe · dunkle Sektion |
| `paper` | `#F6F1E8` | 246 / 241 / 232 | Haupthintergrund · Ruhe |

### Farbverteilung — 80 / 15 / 5 Regel
- **80 % Paper** — trägt jede Fläche
- **15 % Ink** — strukturiert, Text, Linien
- **5 % Amber** — ausschließlich für: CTA-Buttons, aktive Links, gefüllte Stempel

### Verbote
- Kein Verlauf (Gradient) auf Brand-Farben
- Kein Amber als Hintergrundfläche (Ausnahme: Amber-Promo-Lockup)
- Kein `gold-*`-Token darf im Code verbleiben

### Tailwind-Config — neue Tokens

```js
colors: {
  amber: {
    DEFAULT: '#F25C24',
    light: '#f47a4a',
    dark: '#c94b1c',
  },
  ink: {
    DEFAULT: '#1A1410',
    50:  '#f5f4f3',
    100: '#e8e6e3',
    200: '#cbc7c0',
    300: '#a09990',
    400: '#736960',
    500: '#524841',
    600: '#3a3229',
    700: '#2a231b',
    800: '#1A1410',
    900: '#0d0a07',
  },
  paper: {
    DEFAULT: '#F6F1E8',
    dark:    '#ede6d8',
  },
}
```

---

## 2. Typografie

### Geist (ersetzt Inter)

- **Geist** — Vercel Open Source Grotesk, frei, selbst gehostet
  - Weight 400 → Body-Text
  - Weight 600 → Headings, Subheadings, Display
- **Geist Mono** — für Zahlen, Codes, Daten (z.B. Stempel-Counter `7 / 10`, UTM-Codes)
  - Weight 500

### Type Scale (aus Brand Book)

| Rolle | Klasse | Specs |
|---|---|---|
| Display / H1 | `font-display` | Geist 600, letter-spacing -2.5% |
| Heading / H2 | — | Geist 600, letter-spacing -1.8% |
| Subhead / H3 | — | Geist 600, letter-spacing -1% |
| Body | — | Geist 400, letter-spacing 0 |
| Caption / Data | `font-mono` | Geist Mono 500 |

### Font-Hosting

Geist und Geist Mono werden als `.woff2` lokal unter `public/fonts/` abgelegt. Kein CDN-Request, kein FOUT.

---

## 3. Logo & Favicon

### Marke: Zwei Kreise

- **Konzept:** Ein offener Kreis (Stempel-Slot) überlappt einen gefüllten Kreis (Belohnung). Symbol für Sammeln & Einlösen.
- **Konstruktion:** Radius `r`. Mittelpunkt-Abstand `1.45r`. Strichstärke `0.13r`.
- **Primärfarben:** Ink-Ring + Amber-Filled-Circle auf Paper/transparentem Grund.

### Zu erstellende SVG-Assets

| Datei | Verwendung |
|---|---|
| `public/favicon.svg` | Browser-Tab-Icon (ersetzt F-Favicon) |
| `public/brand/mark-primary.svg` | Mark allein — Avatar, App-Icon |
| `public/brand/mark-mono-ink.svg` | Einfarbig dunkel — Druck, Fax |
| `public/brand/lockup-horizontal-primary.svg` | Mark + Wordmark — Standard-Navbar |
| `public/brand/lockup-horizontal-on-dark.svg` | Navbar auf Ink-Hintergrund |

### Wordmark

`bonuskarte.digital` in Geist 600. Der Punkt im `.digital` wird in Amber gesetzt.

### Schutzraum

Mindestens ein Kreis-Radius (`r`) Abstand auf allen vier Seiten der Marke — kein Text, kein Bild in dieser Zone.

---

## 4. Komponenten-Änderungen

### Globale Farb-Ersetzungen

| Alt (fuerte-Brand) | Neu (bonuskarte-Brand) |
|---|---|
| `bg-black`, `bg-ink-950` | `bg-paper` (Hauptflächen) / `bg-ink` (dunkle Sektion) |
| `text-gold-600`, `text-gold-400`, `text-gold-300` | `text-amber` |
| `bg-gold-600`, `bg-gold-500` | `bg-amber` |
| `border-gold-*` | `border-ink/20` |
| `ring-gold-*` | `ring-amber` |
| `hover:bg-gold-*` | `hover:bg-amber-dark` |
| `text-white` auf hellem Grund | `text-ink` |
| `bg-zinc-*`, `bg-gray-*` | `bg-paper-dark` oder `bg-ink-100` |

### CTA-Button

```html
<button class="bg-amber text-white rounded-full px-6 py-3 font-semibold hover:bg-amber-dark transition-colors">
  Karte erstellen
</button>
```

### Dunkle Sektion (eine pro Seite)

Hintergrund `bg-ink`. Text `text-paper`. Amber nur für aktive Elemente darin.

### Stempel-Visualisierung

Gefüllte Stempel: `bg-amber`. Leere Stempel: `border-2 border-ink/30 bg-transparent`. Kreis-Form (`rounded-full`).

---

## 5. Implementierungs-Scope

### Dateien — direkt bearbeitet

- `tailwind.config.mjs` — Palette + Font-Stack
- `src/styles/fonts.css` — Inter-Deklarationen → Geist + Geist Mono
- `public/fonts/` — neue `.woff2`-Dateien, alte Inter-Dateien entfernt (nach Bestätigung)
- `public/favicon.svg` — Zwei-Kreise-Mark
- `public/brand/` — neue SVG-Assets (neues Verzeichnis)
- `src/layouts/BaseLayout.astro` — Favicon-Link, body-Hintergrundfarbe
- `src/layouts/HilfeLayout.astro` — gleich
- `src/components/Navbar.astro` — Logo-Lockup SVG eingebunden
- `src/components/NavbarFr.astro` — gleich

### Dateien — Massen-Ersetzung (sed/global replace)

~90 Dateien mit alten Farbklassen. Strategie: globale Suche-Ersetzen-Runde per Script, danach manueller Review der 10 Kern-Komponenten.

Kern-Komponenten für manuellen Review nach Auto-Replace:
1. `src/pages/index.astro`
2. `src/pages/preise.astro`
3. `src/pages/karten.astro`
4. `src/components/Navbar.astro`
5. `src/components/Footer.astro`
6. `src/components/ui/button.tsx`
7. `src/components/ui/dark-gradient-pricing.tsx`
8. `src/components/WalletMockup.astro`
9. `src/layouts/BaseLayout.astro`
10. `src/components/LeadForm.tsx`

### Was NICHT geändert wird

- Inhalte (Texte, SEO-Daten, Links)
- Seitenstruktur und Layout
- Funktionalität (Forms, Animations, UTM-Tracking)

---

## 6. Deployment

Kein separater Branch nötig (additive Änderungen, kein Breaking Change). Direkt auf `main`, da kein funktionaler Code berührt wird — nur Styles und Assets.

Nach Deploy: visueller Check auf `bonuskarte.digital` — Desktop + Mobile.

---

## Erfolgskriterium

Die Website sieht auf den ersten Blick nach bonuskarte.digital aus, nicht nach fuerte.digital. Kein Gold, kein schwarzer Hintergrund, kein F-Favicon mehr.
