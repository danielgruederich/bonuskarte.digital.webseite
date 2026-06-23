# bonuskarte.digital Rebranding — Implementierungsplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Vollständiger Austausch der fuerte.digital-Brand (Schwarz + Gold + Inter) durch die bonuskarte.digital-Brand (Paper + Amber + Ink + Geist) laut Brand Book v1.0.

**Architecture:** Drei Ebenen: (1) Design-Tokens in `tailwind.config.mjs`, (2) Schrift-Assets in `public/fonts/` + `fonts.css`, (3) Farbklassen in allen Komponenten und Seiten via globaler Ersetzung + manueller Feinschliff der 10 Kern-Dateien.

**Tech Stack:** Astro 5, Tailwind CSS, React (Islands), Geist Variable Font (.woff2), SVG Brand Assets

## Global Constraints

- Farben exakt nach Brand Book: Amber `#F25C24`, Ink `#1A1410`, Paper `#F6F1E8`
- Farbverteilung: 80% Paper · 15% Ink · 5% Amber — kein Gradient auf Brand-Farben
- Amber NUR für: CTA-Buttons, aktive Links, gefüllte Stempel — nie als Fläche
- Font: Geist (400 + 600) + Geist Mono (500) — selbst gehostet in `public/fonts/`
- SVG-Assets: fertig unter `public/brand/` (bereits committed)
- Kein Löschen von Inhalten, SEO-Daten oder Funktionalität
- Deploy: direkt auf `main` (nur Style-Änderungen, kein Breaking Change)
- Build-Check nach jedem Task: `npm run build` muss fehlerfrei durchlaufen

---

## File Map

| Datei | Änderung |
|---|---|
| `tailwind.config.mjs` | `gold` + altes `ink` entfernen → `amber`, `ink` (#1A1410), `paper` hinzufügen; Font-Stack Inter → Geist |
| `src/styles/fonts.css` | Inter-Deklarationen → Geist + Geist Mono |
| `public/fonts/` | Geist-VF.woff2 + GeistMono-VF.woff2 hinzufügen |
| `src/layouts/BaseLayout.astro` | Font-Preload Inter → Geist; `body` Klasse: `bg-white` → `bg-paper text-ink` |
| `src/layouts/HilfeLayout.astro` | Gleich wie BaseLayout |
| `src/components/Navbar.astro` | F-Mark ersetzen durch Zwei-Kreise-SVG; `gold-*` → `amber`; Scroll-Verhalten auf Paper-Hintergrund anpassen; `dark` Default → `false` |
| `src/components/NavbarFr.astro` | Identisch wie Navbar.astro |
| `src/components/Footer.astro` | F-Mark ersetzen; `gold-*` → `amber`; `bg-black` → `bg-ink` |
| `src/components/FooterFr.astro` | Identisch wie Footer.astro |
| `src/components/ui/button.tsx` | `gold-*` → `amber`; Button-Style: rounded, amber-bg |
| `src/components/ui/dark-gradient-pricing.tsx` | `gold-*` → `amber`; Hintergrund anpassen |
| `src/components/WalletMockup.astro` | `gold-*` → `amber` |
| `src/components/LeadForm.tsx` | `gold-*` → `amber` |
| `src/components/LeadFormFr.tsx` | Gleich |
| `src/components/LeadFormDoener.tsx` | Gleich |
| `src/pages/index.astro` | Hauptseite: `bg-black` Sections → `bg-paper`; dunkle Hero-Sektion → `bg-ink`; `gold-*` → `amber` |
| `src/pages/preise.astro` | Gleich wie index |
| `src/pages/karten.astro` | Gleich |
| Alle ~90 übrigen Dateien | Automatisches sed-Replace: alle verbleibenden `gold-*` → `amber` |

---

## Task 1: Geist Font herunterladen und einbinden

**Files:**
- Create: `public/fonts/GeistVF.woff2`
- Create: `public/fonts/GeistMonoVF.woff2`
- Modify: `src/styles/fonts.css`

- [ ] **Schritt 1: Geist Variable Font herunterladen**

```bash
cd "/Users/danielgruederich/Developer/Claude projects/bonuskarte-digital"

# Geist Variable Font von Vercel GitHub herunterladen
curl -L "https://github.com/vercel/geist-font/raw/main/packages/next/dist/fonts/geist-sans/Geist-Variable.woff2" \
  -o "public/fonts/GeistVF.woff2"

curl -L "https://github.com/vercel/geist-font/raw/main/packages/next/dist/fonts/geist-mono/GeistMono-Variable.woff2" \
  -o "public/fonts/GeistMonoVF.woff2"

# Verifizieren (beide sollten >50KB sein)
ls -lh public/fonts/
```

Erwartete Ausgabe: `GeistVF.woff2` ~90 KB, `GeistMonoVF.woff2` ~60 KB, plus die alten Inter-Dateien.

- [ ] **Schritt 2: fonts.css ersetzen**

Datei `src/styles/fonts.css` komplett ersetzen mit:

```css
@font-face {
  font-family: 'Geist';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/GeistVF.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Geist Mono';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/GeistMonoVF.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

- [ ] **Schritt 3: Build prüfen**

```bash
npm run build 2>&1 | tail -5
```

Erwartete Ausgabe: `build complete` ohne Fehler.

- [ ] **Schritt 4: Commit**

```bash
git add public/fonts/GeistVF.woff2 public/fonts/GeistMonoVF.woff2 src/styles/fonts.css
git commit -m "brand: add Geist variable font, replace Inter in fonts.css"
```

---

## Task 2: Tailwind Config — neue Design-Tokens

**Files:**
- Modify: `tailwind.config.mjs`

- [ ] **Schritt 1: tailwind.config.mjs komplett ersetzen**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // ── bonuskarte.digital Brand (Brand Book v1.0) ──
        amber: {
          DEFAULT: '#F25C24',
          light:   '#f47a4a',
          dark:    '#c94b1c',
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
      },
      fontFamily: {
        sans:    ['Geist', 'system-ui', 'sans-serif'],
        display: ['Geist', 'system-ui', 'sans-serif'],
        mono:    ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'grid-amber': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' width='40' height='40' fill='none' stroke='rgb(242 92 36 / 0.08)'%3e%3cpath d='M0 .5H39.5V40'/%3e%3c/svg%3e\")",
        'grid-ink':   "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' width='40' height='40' fill='none' stroke='rgb(26 20 16 / 0.06)'%3e%3cpath d='M0 .5H39.5V40'/%3e%3c/svg%3e\")",
        'grid-paper': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' width='40' height='40' fill='none' stroke='rgb(246 241 232 / 0.04)'%3e%3c/svg%3e\")",
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease forwards',
        'fade-in':    'fadeIn 0.4s ease forwards',
        'float':      'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'blink':      'blink 1s step-end infinite',
      },
      keyframes: {
        fadeUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        float:  { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        blink:  { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
      },
    },
  },
  plugins: [],
}
```

- [ ] **Schritt 2: Build prüfen**

```bash
npm run build 2>&1 | tail -5
```

Erwartete Ausgabe: Build läuft durch — aber Seiten sehen noch broken aus (gold-* Klassen unbekannt → kein Styling). Das ist erwartet.

- [ ] **Schritt 3: Commit**

```bash
git add tailwind.config.mjs
git commit -m "brand: replace gold/Inter tokens with amber/ink/paper/Geist in tailwind config"
```

---

## Task 3: BaseLayout + HilfeLayout — Grundgerüst

**Files:**
- Modify: `src/layouts/BaseLayout.astro` (Zeile 41–42, 89)
- Modify: `src/layouts/HilfeLayout.astro`

- [ ] **Schritt 1: BaseLayout.astro — Font-Preload und Body-Klasse**

Zeile 41 ändern (Inter-Preload → Geist):
```astro
<!-- ALT -->
<link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin />

<!-- NEU -->
<link rel="preload" href="/fonts/GeistVF.woff2" as="font" type="font/woff2" crossorigin />
```

Zeile 89 ändern (body-Klasse):
```astro
<!-- ALT -->
<body class="bg-white text-gray-900 antialiased">

<!-- NEU -->
<body class="bg-paper text-ink antialiased">
```

- [ ] **Schritt 2: HilfeLayout.astro lesen und gleiche Änderungen anwenden**

Prüfe mit `grep -n "inter\|bg-white\|text-gray-900" src/layouts/HilfeLayout.astro` welche Zeilen betroffen sind, dann entsprechend anpassen:
- Font-Preload: `inter-latin.woff2` → `GeistVF.woff2`
- body: `bg-white text-gray-900` → `bg-paper text-ink`

- [ ] **Schritt 3: Build + visuelle Prüfung**

```bash
npm run build && npm run preview
```

Seite öffnet auf `localhost:4321`. Hintergrund sollte jetzt `#F6F1E8` (Paper, warmes Hellbeige) sein statt Weiß/Schwarz.

- [ ] **Schritt 4: Commit**

```bash
git add src/layouts/BaseLayout.astro src/layouts/HilfeLayout.astro
git commit -m "brand: update BaseLayout + HilfeLayout — Geist font, paper background"
```

---

## Task 4: Navbar.astro — Logo + Farben + Scroll-Verhalten

**Files:**
- Modify: `src/components/Navbar.astro`

Die Navbar hat aktuell: F-Mark SVG, `gold-*`-Klassen, schwarzes Scroll-Overlay, `dark=true` als Default. Nach dem Rebranding: Zwei-Kreise-Logo, `amber`, Paper-Hintergrund, `dark` Default → `false`.

- [ ] **Schritt 1: Navbar.astro komplett neu schreiben**

```astro
---
interface Props {
  ctaHref?: string
  ctaLabel?: string
  dark?: boolean
}
const { ctaHref = '#demo', ctaLabel = '90 Tage gratis starten', dark = false } = Astro.props
---

<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "name": ["Wie es funktioniert", "Branchen", "Preise", "Blog", "FAQ", "Köln"],
  "url": [
    "https://bonuskarte.digital/#wie-es-funktioniert",
    "https://bonuskarte.digital/#branchen",
    "https://bonuskarte.digital/preise",
    "https://bonuskarte.digital/koeln/blog",
    "https://bonuskarte.digital/faq",
    "https://bonuskarte.digital/koeln"
  ]
})} />

<header id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
  <div class="max-w-6xl mx-auto px-5 sm:px-8">
    <div class="flex items-center justify-between h-16">

      <!-- Logo: Zwei-Kreise-Mark + Wordmark -->
      <a href="/" class="flex items-center gap-3 group" aria-label="bonuskarte.digital — Startseite">
        <svg viewBox="0 0 44 28" class="w-9 h-auto flex-shrink-0" aria-hidden="true">
          <circle cx="12" cy="14" r="11" fill="none"
            stroke={dark ? '#F6F1E8' : '#1A1410'} stroke-width="1.5"/>
          <circle cx="28" cy="14" r="11" fill="#F25C24"/>
        </svg>
        <span class="text-sm font-semibold leading-none" class:list={[dark ? 'text-paper' : 'text-ink']}>
          bonuskarte<span class="text-amber">.digital</span>
        </span>
      </a>

      <!-- Desktop nav -->
      <nav class="hidden lg:flex items-center gap-5 lg:gap-8 ml-12">
        {[
          { href: '/#wie-es-funktioniert', label: 'Wie es funktioniert' },
          { href: '/#branchen',            label: 'Branchen' },
          { href: '/karten',               label: 'Karten' },
          { href: '/preise',               label: 'Preise' },
          { href: '/koeln/blog',           label: 'Blog' },
          { href: '/faq',                  label: 'FAQ' },
          { href: '/hilfe',                label: 'Hilfe' },
        ].map(link => (
          <a href={link.href}
            class="text-xs font-medium tracking-widest uppercase transition-colors hover:text-amber"
            class:list={[dark ? 'text-paper/80' : 'text-ink/60']}>
            {link.label}
          </a>
        ))}
        <span class="text-xs font-medium tracking-widest uppercase"
          class:list={[dark ? 'text-paper/40' : 'text-ink/30']}>
          <span class="text-amber">DE</span>
          <span class="mx-1">|</span>
          <a href="/fr/" class="hover:text-amber transition-colors">FR</a>
        </span>
        <a
          href={ctaHref}
          class="group inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-colors"
        >
          {ctaLabel}
          <svg class="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
      </nav>

      <!-- Mobile toggle -->
      <button id="mobile-toggle" class="lg:hidden p-2 transition-colors hover:text-amber"
        class:list={[dark ? 'text-paper' : 'text-ink']}
        aria-label="Menü öffnen" aria-expanded="false" aria-controls="mobile-menu">
        <svg id="icon-open" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg id="icon-close" class="w-7 h-7 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div id="mobile-menu" class="lg:hidden hidden border-t border-ink/10 py-6 flex flex-col gap-5 bg-paper/98 backdrop-blur-md">
      <a href="/#wie-es-funktioniert" class="text-xs font-medium tracking-widest uppercase text-ink/70 hover:text-amber transition-colors">Wie es funktioniert</a>
      <a href="/#branchen"            class="text-xs font-medium tracking-widest uppercase text-ink/70 hover:text-amber transition-colors">Branchen</a>
      <a href="/karten"               class="text-xs font-medium tracking-widest uppercase text-ink/70 hover:text-amber transition-colors">Karten</a>
      <a href="/preise"               class="text-xs font-medium tracking-widest uppercase text-ink/70 hover:text-amber transition-colors">Preise</a>
      <a href="/koeln/blog"           class="text-xs font-medium tracking-widest uppercase text-ink/70 hover:text-amber transition-colors">Blog</a>
      <a href="/faq"                  class="text-xs font-medium tracking-widest uppercase text-ink/70 hover:text-amber transition-colors">FAQ</a>
      <a href="/hilfe"                class="text-xs font-medium tracking-widest uppercase text-ink/70 hover:text-amber transition-colors">Hilfe</a>
      <a href="/fr/"                  class="text-xs font-medium tracking-widest uppercase text-ink/70 hover:text-amber transition-colors">🇫🇷 Version française (FR)</a>
      <a href={ctaHref} class="block w-full bg-amber hover:bg-amber-dark text-white text-xs font-bold tracking-widest uppercase px-5 py-3 rounded-full text-center transition-colors">
        {ctaLabel}
      </a>
    </div>
  </div>
</header>

<script>
  const navbar = document.getElementById('navbar')!
  const toggle = document.getElementById('mobile-toggle')!
  const menu   = document.getElementById('mobile-menu')!
  const iconO  = document.getElementById('icon-open')!
  const iconC  = document.getElementById('icon-close')!

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('bg-paper/95', 'backdrop-blur-md', 'border-b', 'border-ink/5', 'shadow-sm')
    } else {
      navbar.classList.remove('bg-paper/95', 'backdrop-blur-md', 'border-b', 'border-ink/5', 'shadow-sm')
    }
  })

  toggle.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden')
    menu.classList.toggle('hidden')
    iconO.classList.toggle('hidden')
    iconC.classList.toggle('hidden')
    toggle.setAttribute('aria-expanded', String(!isOpen))
  })
</script>
```

- [ ] **Schritt 2: Build prüfen**

```bash
npm run build 2>&1 | tail -5
```

Erwartete Ausgabe: Build fehlerfrei.

- [ ] **Schritt 3: Commit**

```bash
git add src/components/Navbar.astro
git commit -m "brand: Navbar — Zwei-Kreise-Logo, amber, paper-Hintergrund"
```

---

## Task 5: NavbarFr.astro — identische Änderungen wie Navbar.astro

**Files:**
- Modify: `src/components/NavbarFr.astro`

- [ ] **Schritt 1: NavbarFr.astro lesen**

```bash
cat "src/components/NavbarFr.astro"
```

- [ ] **Schritt 2: Gleiche Änderungen wie Task 4 anwenden**

Folgende Ersetzungen in NavbarFr.astro durchführen (analog zu Task 4):
- F-Mark SVG → Zwei-Kreise-SVG (identische `<svg>` wie in Navbar.astro, aber `stroke` prop-abhängig)
- `text-gold-*` → `text-amber`
- `bg-gold-*` → `bg-amber`
- `hover:text-gold-*` → `hover:text-amber`
- `bg-black/95` → `bg-paper/95` im Scroll-Handler
- `border-white/10` → `border-ink/10` im Mobile Menu
- `bg-black/95` im Mobile Menu → `bg-paper/98`
- CTA-Button: `bg-gold-600 text-black` → `bg-amber text-white rounded-full`
- `dark` Default: `true` → `false`

- [ ] **Schritt 3: Build + Commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/NavbarFr.astro
git commit -m "brand: NavbarFr — Zwei-Kreise-Logo, amber, paper-Hintergrund"
```

---

## Task 6: Footer.astro + FooterFr.astro

**Files:**
- Modify: `src/components/Footer.astro`
- Modify: `src/components/FooterFr.astro`

- [ ] **Schritt 1: Footer.astro — F-Mark und Farben ersetzen**

Zeile 3: `bg-black border-t border-white/5 text-white` → `bg-ink border-t border-paper/10 text-paper`

Zeile 10–16 (F-Mark SVG) ersetzen mit Zwei-Kreise-Mark:
```astro
<!-- ALT: die gesamte SVG-Block mit F-Mark entfernen -->

<!-- NEU: -->
<img src="/brand/lockup-horizontal-on-dark.svg"
  alt="bonuskarte.digital"
  class="h-7 w-auto"
  width="380" height="70" />
```

Alle `hover:text-gold-600` → `hover:text-amber`

Zeile 27–28 (Telefon/WhatsApp Links):
`hover:text-gold-600` → `hover:text-amber`

Alle weiteren `text-gold-*`, `bg-gold-*`, `border-gold-*` → `text-amber`, `bg-amber`, `border-amber`

Zeile 69: `border-white/5` → `border-paper/10`

- [ ] **Schritt 2: FooterFr.astro — gleiche Änderungen**

```bash
grep -n "gold\|bg-black\|border-white\|text-white" src/components/FooterFr.astro
```
Alle gefundenen Zeilen analog zu Footer.astro anpassen.

- [ ] **Schritt 3: Build + Commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/Footer.astro src/components/FooterFr.astro
git commit -m "brand: Footer — Lockup-Logo, ink-Hintergrund, amber statt gold"
```

---

## Task 7: button.tsx + ui-Komponenten

**Files:**
- Modify: `src/components/ui/button.tsx`
- Modify: `src/components/ui/dark-gradient-pricing.tsx`
- Modify: `src/components/ui/card.tsx`

- [ ] **Schritt 1: button.tsx — Varianten auf amber umstellen**

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-amber text-white hover:bg-amber-dark font-bold tracking-wide uppercase text-xs rounded-full",
        ghost:   "border border-amber/60 text-amber hover:bg-amber hover:text-white tracking-wide uppercase text-xs rounded-full",
        outline: "border border-amber/60 text-amber hover:bg-amber hover:text-white tracking-wide uppercase text-xs rounded-full",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm:      "h-9 px-4",
        lg:      "h-12 px-8",
        icon:    "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "default",
    },
  },
)
```

- [ ] **Schritt 2: dark-gradient-pricing.tsx lesen und `gold-*` → `amber` ersetzen**

```bash
grep -n "gold\|black\|zinc" src/components/ui/dark-gradient-pricing.tsx
```
Alle gefundenen `gold-*` → `amber-*`, `bg-black` → `bg-ink`.

- [ ] **Schritt 3: card.tsx lesen und anpassen**

```bash
grep -n "gold\|black\|zinc\|gray" src/components/ui/card.tsx
```
Alle `gold-*` → `amber`, `bg-black` → `bg-ink`.

- [ ] **Schritt 4: Build + Commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/ui/button.tsx src/components/ui/dark-gradient-pricing.tsx src/components/ui/card.tsx
git commit -m "brand: ui components — amber statt gold, rounded-full CTAs"
```

---

## Task 8: LeadForm-Komponenten

**Files:**
- Modify: `src/components/LeadForm.tsx`
- Modify: `src/components/LeadFormFr.tsx`
- Modify: `src/components/LeadFormDoener.tsx`

- [ ] **Schritt 1: Alle drei Formulare — gold → amber**

```bash
grep -n "gold\|bg-black\|bg-zinc\|bg-gray-9\|text-white" src/components/LeadForm.tsx | head -20
grep -n "gold\|bg-black\|bg-zinc\|bg-gray-9\|text-white" src/components/LeadFormFr.tsx | head -20
grep -n "gold\|bg-black\|bg-zinc\|bg-gray-9\|text-white" src/components/LeadFormDoener.tsx | head -20
```

Für jede gefundene Zeile:
- `bg-gold-600` → `bg-amber`
- `bg-gold-500` → `bg-amber`
- `hover:bg-gold-500` → `hover:bg-amber-dark`
- `text-gold-600` → `text-amber`
- `border-gold-600` → `border-amber`
- `focus:ring-gold-600` → `focus:ring-amber`
- `bg-black` → `bg-ink` (wenn Formular-Hintergrund)
- `bg-zinc-900` → `bg-ink`
- `bg-gray-900` → `bg-ink`

- [ ] **Schritt 2: Build + Commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/LeadForm.tsx src/components/LeadFormFr.tsx src/components/LeadFormDoener.tsx
git commit -m "brand: LeadForms — amber statt gold, ink statt black"
```

---

## Task 9: WalletMockup + RotatingWord

**Files:**
- Modify: `src/components/WalletMockup.astro`
- Modify: `src/components/RotatingWord.tsx`
- Modify: `src/components/RotatingWordFr.tsx`

- [ ] **Schritt 1: WalletMockup.astro — Stempel-Farben und Hintergrund**

```bash
grep -n "gold\|black\|zinc\|#A38A00\|#000" src/components/WalletMockup.astro
```

Änderungen:
- Stempel-Kreise: Hintergrund `bg-gold-600` → `bg-amber`
- Leere Stempel: `border-white/20` → `border-ink/20` (falls auf Paper-Fläche)
- Karten-Hintergrund wenn schwarz: `bg-zinc-900` oder `bg-black` → `bg-ink`

- [ ] **Schritt 2: RotatingWord.tsx + RotatingWordFr.tsx**

```bash
grep -n "gold\|black\|zinc" src/components/RotatingWord.tsx
grep -n "gold\|black\|zinc" src/components/RotatingWordFr.tsx
```

`text-gold-*` → `text-amber`, `bg-gold-*` → `bg-amber`.

- [ ] **Schritt 3: Build + Commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/WalletMockup.astro src/components/RotatingWord.tsx src/components/RotatingWordFr.tsx
git commit -m "brand: WalletMockup + RotatingWord — amber Stempel, ink Hintergrund"
```

---

## Task 10: Hilfe-Komponenten

**Files:**
- Modify: `src/components/hilfe/Callout.astro`
- Modify: `src/components/hilfe/HilfeSidebar.astro`
- Modify: `src/components/hilfe/HilfeSidebarMobile.astro`
- Modify: `src/components/hilfe/PrevNext.astro`
- Modify: `src/components/hilfe/Screenshot.astro`
- Modify: `src/components/hilfe/VideoEmbed.astro`

- [ ] **Schritt 1: Alle Hilfe-Komponenten — gold → amber, black → ink/paper**

```bash
grep -rn "gold\|bg-black\|bg-zinc\|bg-gray-9\|text-white" src/components/hilfe/
```

Für jede betroffene Zeile die Standard-Ersetzungen durchführen:
- `bg-gold-*` → `bg-amber`
- `text-gold-*` → `text-amber`
- `border-gold-*` → `border-amber`
- `hover:text-gold-*` → `hover:text-amber`
- `bg-black` → `bg-ink`
- `bg-zinc-900` → `bg-ink`
- `text-white` auf Ink-Hintergrund → bleibt `text-paper`
- `text-white` auf Paper-Hintergrund → `text-ink`

- [ ] **Schritt 2: Build + Commit**

```bash
npm run build 2>&1 | tail -3
git add src/components/hilfe/
git commit -m "brand: Hilfe-Komponenten — amber, ink, paper"
```

---

## Task 11: Kern-Seiten manuell anpassen (index + preise + karten)

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/preise.astro`
- Modify: `src/pages/karten.astro`

Diese drei Seiten sind am komplexesten weil sie viele Section-Hintergründe haben die von schwarz → paper wechseln müssen.

- [ ] **Schritt 1: index.astro — Sections überarbeiten**

```bash
grep -n "bg-black\|bg-zinc\|bg-gray-9\|gold-\|text-white" src/pages/index.astro | head -40
```

Regeln für Section-Hintergründe:
- Hauptsections: `bg-black` → `bg-paper`
- Genau eine dunkle Sektion (z.B. How-it-Works oder Hero-Dunkelsection): bleibt `bg-ink` (nicht `bg-black`)
- `text-white` auf Paper-Hintergrund → `text-ink`
- `text-white` auf Ink-Hintergrund → `text-paper`
- `gold-*` überall → `amber`
- `border-white/10` auf Paper → `border-ink/10`
- `border-white/10` auf Ink → `border-paper/10`

- [ ] **Schritt 2: preise.astro — gleiche Logik**

```bash
grep -n "bg-black\|bg-zinc\|bg-gray-9\|gold-\|text-white" src/pages/preise.astro | head -40
```
Gleiche Ersetzungen wie index.astro.

- [ ] **Schritt 3: karten.astro — gleiche Logik**

```bash
grep -n "bg-black\|bg-zinc\|bg-gray-9\|gold-\|text-white" src/pages/karten.astro | head -40
```
Gleiche Ersetzungen.

- [ ] **Schritt 4: Build + visueller Check**

```bash
npm run build && npm run preview
```

Alle drei Seiten im Browser prüfen: Paper-Hintergrund, Amber-CTAs, Ink-Text, keine Gold-Elemente mehr sichtbar.

- [ ] **Schritt 5: Commit**

```bash
git add src/pages/index.astro src/pages/preise.astro src/pages/karten.astro
git commit -m "brand: Hauptseiten — paper background, amber CTAs, ink text"
```

---

## Task 12: Massen-Ersetzung aller übrigen Dateien (sed-Script)

**Files:**
- Modify: alle ~90 übrigen `.astro` + `.tsx` Dateien in `src/`

Dieser Task ersetzt alle verbliebenen `gold-*`-Klassen in den generierten Stadtseiten, Blog-Seiten, FAQ, Impressum etc.

- [ ] **Schritt 1: Audit — was ist noch übrig**

```bash
grep -r "gold-" src/ --include="*.astro" --include="*.tsx" -l | wc -l
```

Erwartete Ausgabe: noch ~70-80 Dateien (Stadtseiten, Blog, etc.)

- [ ] **Schritt 2: Automatische Ersetzung ausführen**

```bash
# macOS-kompatibles sed (BSD sed braucht '' nach -i)
find src/ \( -name "*.astro" -o -name "*.tsx" \) -exec sed -i '' \
  -e 's/bg-gold-600/bg-amber/g' \
  -e 's/bg-gold-500/bg-amber/g' \
  -e 's/bg-gold-400/bg-amber/g' \
  -e 's/text-gold-600/text-amber/g' \
  -e 's/text-gold-500/text-amber/g' \
  -e 's/text-gold-400/text-amber/g' \
  -e 's/text-gold-300/text-amber/g' \
  -e 's/border-gold-600/border-amber/g' \
  -e 's/border-gold-500/border-amber/g' \
  -e 's/border-gold-400/border-amber/g' \
  -e 's/hover:text-gold-600/hover:text-amber/g' \
  -e 's/hover:text-gold-500/hover:text-amber/g' \
  -e 's/hover:bg-gold-600/hover:bg-amber-dark/g' \
  -e 's/hover:bg-gold-500/hover:bg-amber-dark/g' \
  -e 's/hover:border-gold-600/hover:border-amber/g' \
  -e 's/from-gold-600/from-amber/g' \
  -e 's/to-gold-600/to-amber/g' \
  -e 's/ring-gold-600/ring-amber/g' \
  {} \;
```

- [ ] **Schritt 3: Verifizieren — keine gold-* mehr**

```bash
grep -r "gold-" src/ --include="*.astro" --include="*.tsx" | grep -v "node_modules"
```

Erwartete Ausgabe: leer (keine Treffer). Wenn noch Treffer: manuell prüfen und ersetzen.

- [ ] **Schritt 4: Build — muss fehlerfrei durchlaufen**

```bash
npm run build 2>&1 | grep -E "error|warn|✓|✗"
```

- [ ] **Schritt 5: Commit**

```bash
git add src/
git commit -m "brand: mass-replace gold-* → amber across all remaining pages"
```

---

## Task 13: Abschluss-Audit + Deploy

- [ ] **Schritt 1: Finaler gold-Check**

```bash
grep -r "gold\|#A38A00\|#8B7300\|inter-latin\|Inter" src/ --include="*.astro" --include="*.tsx" --include="*.css" --include="*.mjs"
```

Erwartete Ausgabe: keine Treffer.

- [ ] **Schritt 2: Visueller Browser-Test (Desktop + Mobile)**

```bash
npm run build && npm run preview
```

Folgende Seiten prüfen:
- `/` (Startseite) — Paper-Hintergrund, Amber-CTAs, Zwei-Kreise-Logo in Navbar
- `/preise` — Preiskarten mit Amber-Akzenten
- `/karten` — Karten-Übersichtsseite
- `/hilfe` — Hilfe-Sidebar auf Paper-Grund
- `/koeln` — Stadtseite mit neuen Farben

Checkliste:
- [ ] Navbar zeigt Zwei-Kreise-Logo (nicht F)
- [ ] Footer zeigt Lockup-Logo
- [ ] Favicon im Browser-Tab zeigt Zwei-Kreise (nicht F)
- [ ] CTA-Buttons sind orange-rot (Amber), nicht Gold
- [ ] Hintergrund ist Paper (warm-beige), nicht Schwarz
- [ ] Schrift ist Geist (serifenlose, klare Grotesk — erkennbar schlanker als Inter)
- [ ] Kein Gold-Ton irgendwo sichtbar

- [ ] **Schritt 3: Deploy auf main**

```bash
git push origin main
```

GitHub Actions baut und deployt automatisch. Status prüfen:
```bash
gh run list --limit 3
```

- [ ] **Schritt 4: Live-Check auf bonuskarte.digital**

Nach ~3 Min deploy: `curl -I https://bonuskarte.digital` prüfen ob 200 zurückkommt, dann manuell im Browser öffnen und visuell abnahmen.
