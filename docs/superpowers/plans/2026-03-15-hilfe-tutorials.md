# Hilfe & Tutorials Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Help & Tutorials section at `/hilfe/` for bonuskarte.digital B2B customers using Astro Content Collections + MDX.

**Architecture:** MDX files in `src/content/hilfe/` organized by category folders. A `HilfeLayout.astro` provides two-column layout (sidebar + content). Reusable Astro components for video embeds, callouts, and screenshots. Content is rewritten from Boomerangme docs for the bonuskarte.digital brand.

**Tech Stack:** Astro 4.x, @astrojs/mdx, Tailwind CSS, existing Black + Gold design system.

**Project Path:** `/Users/danielgruederich/Documents/Claude projects/bonuskarte-digital/`

---

## File Structure

### New Files
| File | Responsibility |
|------|---------------|
| `src/data/hilfe-categories.ts` | Category config (slug, label, icon, order) |
| `src/components/hilfe/VideoEmbed.astro` | Responsive YouTube/Loom embed |
| `src/components/hilfe/Callout.astro` | Info/Tipp/Warnung boxes |
| `src/components/hilfe/Screenshot.astro` | Image with caption |
| `src/components/hilfe/HilfeSidebar.astro` | Sidebar navigation |
| `src/components/hilfe/PrevNext.astro` | Previous/Next tutorial links |
| `src/layouts/HilfeLayout.astro` | Two-column layout (sidebar + content) |
| `src/pages/hilfe/index.astro` | Overview page with category grid |
| `src/pages/hilfe/[...slug].astro` | Dynamic tutorial pages |
| `src/content/hilfe/erste-schritte/onboarding.mdx` | Tutorial content |
| `src/content/hilfe/erste-schritte/karte-verteilen.mdx` | Tutorial content |
| `src/content/hilfe/scanner-app/stempel-vergeben.mdx` | Tutorial content |
| `src/content/hilfe/scanner-app/belohnung-einloesen.mdx` | Tutorial content |
| `src/content/hilfe/kartentypen/stempelkarte.mdx` | Tutorial content |
| `src/content/hilfe/kartentypen/multipass.mdx` | Tutorial content |
| `src/content/hilfe/kartentypen/cashback.mdx` | Tutorial content |
| `src/content/hilfe/kartentypen/geschenkkarte.mdx` | Tutorial content |
| `src/content/hilfe/kartentypen/coupon.mdx` | Tutorial content |
| `src/content/hilfe/kartentypen/mitgliedskarte.mdx` | Tutorial content |
| `src/content/hilfe/kartentypen/rabattkarte.mdx` | Tutorial content |
| `src/content/hilfe/kartentypen/belohnungskarte.mdx` | Tutorial content |
| `src/content/hilfe/kartentypen/aktionen.mdx` | Tutorial content |
| `src/content/hilfe/push-nachrichten/push-erstellen.mdx` | Tutorial content |
| `src/content/hilfe/push-nachrichten/automatisierung.mdx` | Tutorial content |
| `src/content/hilfe/support/kontakt.mdx` | Tutorial content |

### Modified Files
| File | Change |
|------|--------|
| `src/content/config.ts` | Add `hilfe` collection |
| `src/components/Navbar.astro` | Add "Hilfe" link |
| `astro.config.mjs` | Add `mdx()` integration |
| `package.json` | Add `@astrojs/mdx` dependency |
| `tailwind.config.mjs` | Add `mdx` to content glob |

---

## Chunk 1: Foundation (MDX + Content Collection + Data)

### Task 1: Install @astrojs/mdx

**Files:**
- Modify: `package.json`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Install the MDX integration**

```bash
cd "/Users/danielgruederich/Documents/Claude projects/bonuskarte-digital"
npm install @astrojs/mdx
```

- [ ] **Step 2: Add MDX to astro.config.mjs**

In `astro.config.mjs`, add the import and integration:

```js
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import path from 'path'

export default defineConfig({
  site: 'https://bonuskarte.digital',
  integrations: [react(), tailwind(), sitemap(), mdx()],
  output: 'static',
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
})
```

- [ ] **Step 3: Update Tailwind content glob**

In `tailwind.config.mjs`, add `mdx` to the content array:

```js
content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,mdx}'],
```

- [ ] **Step 4: Verify build works**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tailwind.config.mjs
git commit -m "feat: add @astrojs/mdx integration for help tutorials"
```

---

### Task 2: Add hilfe content collection + category config

**Files:**
- Modify: `src/content/config.ts`
- Create: `src/data/hilfe-categories.ts`

- [ ] **Step 1: Add hilfe collection to content config**

In `src/content/config.ts`:

```ts
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string(),
    category: z.enum(['Ratgeber', 'Strategie', 'How-to', 'News']),
    readingTime: z.number(),
    featured: z.boolean().default(false),
    city: z.string(),
  }),
})

const hilfe = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    video: z.string().url().optional(),
  }),
})

export const collections = { blog, hilfe }
```

- [ ] **Step 2: Create category configuration**

Create `src/data/hilfe-categories.ts`:

```ts
export interface HilfeCategory {
  slug: string
  label: string
  icon: string
  order: number
}

export const hilfeCategories: HilfeCategory[] = [
  { slug: 'erste-schritte', label: 'Erste Schritte', icon: '🚀', order: 1 },
  { slug: 'scanner-app', label: 'Scanner App', icon: '📱', order: 2 },
  { slug: 'kartentypen', label: 'Kartentypen', icon: '💳', order: 3 },
  { slug: 'push-nachrichten', label: 'Push-Nachrichten', icon: '🔔', order: 4 },
  { slug: 'support', label: 'Support', icon: '💬', order: 5 },
]

/** Get display label for a category slug */
export function getCategoryLabel(slug: string): string {
  return hilfeCategories.find(c => c.slug === slug)?.label ?? slug
}

/** Get category from a tutorial slug like "scanner-app/stempel-vergeben" */
export function getCategoryFromSlug(slug: string): string {
  return slug.split('/')[0]
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/content/config.ts src/data/hilfe-categories.ts
git commit -m "feat: add hilfe content collection schema and category config"
```

---

## Chunk 2: MDX Components

### Task 3: Create VideoEmbed component

**Files:**
- Create: `src/components/hilfe/VideoEmbed.astro`

- [ ] **Step 1: Create the component**

Create `src/components/hilfe/VideoEmbed.astro`:

```astro
---
interface Props {
  url: string
  title?: string
}

const { url, title = 'Video' } = Astro.props

// Extract YouTube video ID from various URL formats
function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?#]+)/)
  return match ? match[1] : null
}

// Extract Loom video ID
function getLoomId(url: string): string | null {
  const match = url.match(/loom\.com\/(?:share|embed)\/([a-f0-9]+)/)
  return match ? match[1] : null
}

const youtubeId = getYouTubeId(url)
const loomId = getLoomId(url)

let embedUrl = url
if (youtubeId) {
  embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}`
} else if (loomId) {
  embedUrl = `https://www.loom.com/embed/${loomId}`
}
---

<div class="my-8">
  <div class="relative w-full overflow-hidden rounded-lg border border-white/10" style="padding-bottom: 56.25%;">
    <iframe
      src={embedUrl}
      title={title}
      class="absolute inset-0 w-full h-full"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  {title !== 'Video' && (
    <p class="mt-2 text-sm text-white/40 text-center">{title}</p>
  )}
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/hilfe/VideoEmbed.astro
git commit -m "feat: add VideoEmbed component for help tutorials"
```

---

### Task 4: Create Callout component

**Files:**
- Create: `src/components/hilfe/Callout.astro`

- [ ] **Step 1: Create the component**

Create `src/components/hilfe/Callout.astro`:

```astro
---
interface Props {
  type?: 'tipp' | 'warnung' | 'info'
}

const { type = 'info' } = Astro.props

const styles = {
  tipp: {
    border: 'border-gold-600/30',
    bg: 'bg-gold-600/5',
    icon: '💡',
    label: 'Tipp',
  },
  warnung: {
    border: 'border-red-500/30',
    bg: 'bg-red-500/5',
    icon: '⚠️',
    label: 'Wichtig',
  },
  info: {
    border: 'border-white/10',
    bg: 'bg-white/5',
    icon: 'ℹ️',
    label: 'Info',
  },
}

const s = styles[type]
---

<div class={`my-6 rounded-lg border ${s.border} ${s.bg} p-4`}>
  <div class="flex items-start gap-3">
    <span class="text-lg flex-shrink-0 mt-0.5">{s.icon}</span>
    <div>
      <p class="text-xs font-bold tracking-widest uppercase text-white/60 mb-1">{s.label}</p>
      <div class="text-sm text-white/80 leading-relaxed [&>p]:mb-0">
        <slot />
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/hilfe/Callout.astro
git commit -m "feat: add Callout component for help tutorials"
```

---

### Task 5: Create Screenshot component

**Files:**
- Create: `src/components/hilfe/Screenshot.astro`

- [ ] **Step 1: Create the component**

Create `src/components/hilfe/Screenshot.astro`:

```astro
---
interface Props {
  src: string
  alt: string
  caption?: string
}

const { src, alt, caption } = Astro.props
---

<figure class="my-8">
  <div class="overflow-hidden rounded-lg border border-white/10">
    <img
      src={src}
      alt={alt}
      class="w-full h-auto"
      loading="lazy"
      decoding="async"
    />
  </div>
  {caption && (
    <figcaption class="mt-2 text-sm text-white/40 text-center">{caption}</figcaption>
  )}
</figure>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/hilfe/Screenshot.astro
git commit -m "feat: add Screenshot component for help tutorials"
```

---

## Chunk 3: Layout + Pages

### Task 6: Create HilfeSidebar component

**Files:**
- Create: `src/components/hilfe/HilfeSidebar.astro`

- [ ] **Step 1: Create the sidebar**

Create `src/components/hilfe/HilfeSidebar.astro`:

```astro
---
import { getCollection } from 'astro:content'
import { hilfeCategories, getCategoryFromSlug } from '@/data/hilfe-categories'

interface Props {
  currentSlug?: string
}

const { currentSlug } = Astro.props
const allEntries = await getCollection('hilfe')

// Group entries by category
const grouped = hilfeCategories.map(cat => ({
  ...cat,
  entries: allEntries
    .filter(e => getCategoryFromSlug(e.slug) === cat.slug)
    .sort((a, b) => a.data.order - b.data.order),
}))
---

<aside class="hilfe-sidebar w-64 flex-shrink-0 hidden lg:block">
  <nav class="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4">
    <a href="/hilfe" class="block text-xs font-bold tracking-widest uppercase text-gold-600 mb-6">
      Hilfe & Tutorials
    </a>

    {grouped.map(cat => (
      <div class="mb-5">
        <p class="text-xs font-bold tracking-widest uppercase text-white/40 mb-2">
          <span class="mr-1.5">{cat.icon}</span>{cat.label}
        </p>
        <ul class="space-y-1 ml-1 border-l border-white/10">
          {cat.entries.map(entry => {
            const isActive = entry.slug === currentSlug
            return (
              <li>
                <a
                  href={`/hilfe/${entry.slug}`}
                  class:list={[
                    'block pl-4 py-1.5 text-sm transition-colors border-l -ml-px',
                    isActive
                      ? 'text-gold-600 border-gold-600 font-medium'
                      : 'text-white/50 border-transparent hover:text-white hover:border-white/30',
                  ]}
                >
                  {entry.data.title}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    ))}
  </nav>
</aside>

<!-- Mobile sidebar toggle -->
<div class="lg:hidden mb-6">
  <button
    id="hilfe-sidebar-toggle"
    class="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white/70"
  >
    <span>Navigation</span>
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  <div id="hilfe-sidebar-mobile" class="hidden mt-2 bg-black/95 border border-white/10 rounded-lg p-4">
    <a href="/hilfe" class="block text-xs font-bold tracking-widest uppercase text-gold-600 mb-4">
      Hilfe & Tutorials
    </a>

    {grouped.map(cat => (
      <div class="mb-4">
        <p class="text-xs font-bold tracking-widest uppercase text-white/40 mb-2">
          <span class="mr-1.5">{cat.icon}</span>{cat.label}
        </p>
        <ul class="space-y-1">
          {cat.entries.map(entry => {
            const isActive = entry.slug === currentSlug
            return (
              <li>
                <a
                  href={`/hilfe/${entry.slug}`}
                  class:list={[
                    'block pl-4 py-1.5 text-sm transition-colors',
                    isActive ? 'text-gold-600 font-medium' : 'text-white/50',
                  ]}
                >
                  {entry.data.title}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    ))}
  </div>
</div>

<script>
  const toggle = document.getElementById('hilfe-sidebar-toggle')
  const mobile = document.getElementById('hilfe-sidebar-mobile')
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      mobile.classList.toggle('hidden')
    })
  }
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/hilfe/HilfeSidebar.astro
git commit -m "feat: add HilfeSidebar component with mobile dropdown"
```

---

### Task 7: Create PrevNext component

**Files:**
- Create: `src/components/hilfe/PrevNext.astro`

- [ ] **Step 1: Create the component**

Create `src/components/hilfe/PrevNext.astro`:

```astro
---
import { getCollection } from 'astro:content'
import { hilfeCategories, getCategoryFromSlug } from '@/data/hilfe-categories'

interface Props {
  currentSlug: string
}

const { currentSlug } = Astro.props
const allEntries = await getCollection('hilfe')

// Build a flat ordered list following category order, then entry order
const ordered = hilfeCategories.flatMap(cat =>
  allEntries
    .filter(e => getCategoryFromSlug(e.slug) === cat.slug)
    .sort((a, b) => a.data.order - b.data.order)
)

const currentIndex = ordered.findIndex(e => e.slug === currentSlug)
const prev = currentIndex > 0 ? ordered[currentIndex - 1] : null
const next = currentIndex < ordered.length - 1 ? ordered[currentIndex + 1] : null
---

{(prev || next) && (
  <div class="mt-12 pt-8 border-t border-white/10 flex justify-between gap-4">
    {prev ? (
      <a href={`/hilfe/${prev.slug}`} class="group flex items-center gap-2 text-sm text-white/50 hover:text-gold-600 transition-colors">
        <svg class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        <span>{prev.data.title}</span>
      </a>
    ) : <div />}
    {next ? (
      <a href={`/hilfe/${next.slug}`} class="group flex items-center gap-2 text-sm text-white/50 hover:text-gold-600 transition-colors ml-auto">
        <span>{next.data.title}</span>
        <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    ) : <div />}
  </div>
)}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/hilfe/PrevNext.astro
git commit -m "feat: add PrevNext navigation for help tutorials"
```

---

### Task 8: Create HilfeLayout

**Files:**
- Create: `src/layouts/HilfeLayout.astro`

- [ ] **Step 1: Create the layout**

Create `src/layouts/HilfeLayout.astro`:

```astro
---
import BaseLayout from './BaseLayout.astro'
import Navbar from '@/components/Navbar.astro'
import Footer from '@/components/Footer.astro'
import HilfeSidebar from '@/components/hilfe/HilfeSidebar.astro'
import PrevNext from '@/components/hilfe/PrevNext.astro'
import { getCategoryFromSlug, getCategoryLabel } from '@/data/hilfe-categories'

interface Props {
  title: string
  description: string
  slug: string
}

const { title, description, slug } = Astro.props
const categorySlug = getCategoryFromSlug(slug)
const categoryLabel = getCategoryLabel(categorySlug)
---

<BaseLayout title={`${title} — Hilfe | bonuskarte.digital`} description={description}>
  <Navbar ctaHref="/hilfe" ctaLabel="Hilfe" />

  <main class="min-h-screen bg-black pt-24 pb-16">
    <div class="max-w-6xl mx-auto px-5 sm:px-8">

      <!-- Breadcrumb -->
      <nav class="mb-8 text-xs text-white/40">
        <a href="/hilfe" class="hover:text-gold-600 transition-colors">Hilfe</a>
        <span class="mx-2">/</span>
        <a href={`/hilfe/${categorySlug}`} class="hover:text-gold-600 transition-colors">{categoryLabel}</a>
        <span class="mx-2">/</span>
        <span class="text-white/60">{title}</span>
      </nav>

      <div class="flex gap-12">
        <!-- Sidebar (desktop) -->
        <HilfeSidebar currentSlug={slug} />

        <!-- Content -->
        <article class="flex-1 min-w-0">
          <!-- Mobile sidebar -->
          <div class="lg:hidden">
            <HilfeSidebar currentSlug={slug} />
          </div>

          <h1 class="text-3xl sm:text-4xl font-bold text-white mb-8">{title}</h1>

          <div class="prose prose-invert prose-gold max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-white/70 prose-p:leading-relaxed
            prose-li:text-white/70
            prose-strong:text-white
            prose-a:text-gold-600 prose-a:no-underline hover:prose-a:underline
            prose-code:text-gold-600 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-ol:list-decimal prose-ul:list-disc
          ">
            <slot />
          </div>

          <PrevNext currentSlug={slug} />
        </article>
      </div>
    </div>
  </main>

  <Footer />
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/HilfeLayout.astro
git commit -m "feat: add HilfeLayout with two-column sidebar design"
```

---

### Task 9: Create hilfe overview page

**Files:**
- Create: `src/pages/hilfe/index.astro`

- [ ] **Step 1: Create the overview page**

Create `src/pages/hilfe/index.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
import Navbar from '@/components/Navbar.astro'
import Footer from '@/components/Footer.astro'
import { getCollection } from 'astro:content'
import { hilfeCategories, getCategoryFromSlug } from '@/data/hilfe-categories'

const allEntries = await getCollection('hilfe')

const categories = hilfeCategories.map(cat => ({
  ...cat,
  count: allEntries.filter(e => getCategoryFromSlug(e.slug) === cat.slug).length,
  firstSlug: allEntries
    .filter(e => getCategoryFromSlug(e.slug) === cat.slug)
    .sort((a, b) => a.data.order - b.data.order)[0]?.slug,
}))
---

<BaseLayout
  title="Hilfe & Tutorials — bonuskarte.digital"
  description="Anleitungen und Tutorials für deine digitale Stempelkarte. Schritt für Schritt erklärt."
>
  <Navbar ctaHref="/hilfe" ctaLabel="Hilfe" />

  <main class="min-h-screen bg-black pt-24 pb-16">
    <div class="max-w-4xl mx-auto px-5 sm:px-8">

      <!-- Hero -->
      <div class="text-center mb-16">
        <p class="text-xs font-medium tracking-[0.3em] uppercase text-gold-600 mb-4">
          Hilfe-Center
        </p>
        <h1 class="text-4xl sm:text-5xl font-bold text-white mb-4">
          Hilfe & Tutorials
        </h1>
        <p class="text-lg text-white/50 max-w-xl mx-auto">
          Alles, was du wissen musst, um deine digitale Stempelkarte erfolgreich einzusetzen.
        </p>
      </div>

      <!-- Category Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(cat => (
          <a
            href={cat.firstSlug ? `/hilfe/${cat.firstSlug}` : '#'}
            class="group block border border-white/10 rounded-lg p-6 hover:border-gold-600/30 hover:bg-white/[0.02] transition-all"
          >
            <span class="text-3xl mb-4 block">{cat.icon}</span>
            <h2 class="text-sm font-bold tracking-widest uppercase text-white group-hover:text-gold-600 transition-colors mb-2">
              {cat.label}
            </h2>
            <p class="text-xs text-white/40">
              {cat.count} {cat.count === 1 ? 'Artikel' : 'Artikel'}
            </p>
          </a>
        ))}
      </div>

    </div>
  </main>

  <Footer />
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/hilfe/index.astro
git commit -m "feat: add hilfe overview page with category grid"
```

---

### Task 10: Create dynamic tutorial page

**Files:**
- Create: `src/pages/hilfe/[...slug].astro`

- [ ] **Step 1: Create the catch-all route**

Create `src/pages/hilfe/[...slug].astro`:

```astro
---
import { getCollection } from 'astro:content'
import HilfeLayout from '@/layouts/HilfeLayout.astro'

export async function getStaticPaths() {
  const entries = await getCollection('hilfe')
  return entries.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }))
}

const { entry } = Astro.props
const { Content } = await entry.render()
---

<HilfeLayout title={entry.data.title} description={entry.data.description} slug={entry.slug}>
  {entry.data.video && (
    <div class="mb-8">
      <div class="relative w-full overflow-hidden rounded-lg border border-white/10" style="padding-bottom: 56.25%;">
        <iframe
          src={entry.data.video}
          title={entry.data.title}
          class="absolute inset-0 w-full h-full"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  )}
  <Content />
</HilfeLayout>
```

- [ ] **Step 2: Commit**

```bash
git add "src/pages/hilfe/[...slug].astro"
git commit -m "feat: add dynamic tutorial page route"
```

---

### Task 11: Add "Hilfe" link to Navbar

**Files:**
- Modify: `src/components/Navbar.astro`

- [ ] **Step 1: Add Hilfe link to desktop nav**

In `src/components/Navbar.astro`, add a "Hilfe" link after the "Blog" link in the desktop nav (line ~51):

```astro
        <a href="/hilfe" class="text-xs font-medium tracking-widest uppercase transition-colors"
          class:list={[dark ? 'text-white/50 hover:text-white' : 'text-black/50 hover:text-black']}>
          Hilfe
        </a>
```

- [ ] **Step 2: Add Hilfe link to mobile menu**

In `src/components/Navbar.astro`, add a "Hilfe" link after the "Blog" link in the mobile menu (line ~91):

```astro
      <a href="/hilfe" class="text-xs font-medium tracking-widest uppercase text-white/70 hover:text-white transition-colors">
        Hilfe
      </a>
```

- [ ] **Step 3: Verify dev server**

```bash
npm run dev
```

Open `http://localhost:4321` and verify "Hilfe" link appears in navbar.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.astro
git commit -m "feat: add Hilfe link to navbar"
```

---

## Chunk 3: MDX Content — Erste Schritte + Scanner App

### Task 12: Create "Onboarding" tutorial

**Files:**
- Create: `src/content/hilfe/erste-schritte/onboarding.mdx`

- [ ] **Step 1: Create the MDX file**

Create `src/content/hilfe/erste-schritte/onboarding.mdx`:

```mdx
---
title: "Onboarding — Deine Karte ist da"
description: "Dein Einstieg in bonuskarte.digital. So richtest du alles ein und startest mit deiner digitalen Stempelkarte."
order: 1
---

import Callout from '@/components/hilfe/Callout.astro'

Herzlichen Glueckwunsch! Deine digitale Stempelkarte ist bereit. In wenigen Minuten bist du startklar.

## Was du erhalten hast

Nach der Anmeldung hast du folgendes erhalten:

1. **Deine digitale Stempelkarte** — fertig designt und einsatzbereit
2. **Einen QR-Code** — damit deine Gaeste die Karte installieren koennen
3. **Einen Share-Link** — zum Teilen ueber WhatsApp, Instagram & Co.
4. **Zugang zur Scanner App** — zum Stempel vergeben und Belohnungen einloesen

## Deine ersten Schritte

### 1. Scanner App herunterladen

Lade die **Boomerang Scanner App** herunter:
- **iPhone:** Im App Store nach "Boomerang Scanner" suchen
- **Android:** Im Google Play Store nach "Boomerang Scanner" suchen

Melde dich mit deinen Zugangsdaten an.

### 2. QR-Code ausdrucken

Drucke deinen QR-Code aus und platziere ihn gut sichtbar:
- An der Kasse / Theke
- Am Eingang
- Auf dem Tresen

<Callout type="tipp">
Laminiere den QR-Code oder nutze einen Aufsteller — so haelt er laenger und sieht professioneller aus.
</Callout>

### 3. Ersten Stempel vergeben

Wenn ein Gast die Karte installiert hat:
1. Oeffne die **Scanner App**
2. Scanne den QR-Code auf dem Handy des Gastes
3. Der Stempel wird automatisch vergeben

<Callout type="info">
Detaillierte Anleitung zum Stempel vergeben findest du unter [Scanner App → Stempel vergeben](/hilfe/scanner-app/stempel-vergeben).
</Callout>

## Naechste Schritte

- [Karte an Gaeste verteilen](/hilfe/erste-schritte/karte-verteilen) — So bringst du deine Karte unter die Leute
- [Stempel vergeben](/hilfe/scanner-app/stempel-vergeben) — So funktioniert die Scanner App
```

- [ ] **Step 2: Commit**

```bash
git add src/content/hilfe/erste-schritte/onboarding.mdx
git commit -m "content: add onboarding tutorial"
```

---

### Task 13: Create "Karte verteilen" tutorial

**Files:**
- Create: `src/content/hilfe/erste-schritte/karte-verteilen.mdx`

- [ ] **Step 1: Create the MDX file**

Create `src/content/hilfe/erste-schritte/karte-verteilen.mdx`:

```mdx
---
title: "Karte an Gaeste verteilen"
description: "So verteilst du deine digitale Stempelkarte an Gaeste — per QR-Code, Link oder Social Media."
order: 2
---

import Callout from '@/components/hilfe/Callout.astro'

Je mehr Gaeste deine Karte installieren, desto staerker wirkt dein Treueprogramm. Hier sind die besten Wege, deine Karte zu verteilen.

## Per QR-Code (empfohlen)

Der einfachste Weg: Dein Gast scannt den QR-Code mit der Handy-Kamera und installiert die Karte direkt im Apple Wallet oder Google Wallet.

**Wo du den QR-Code platzieren solltest:**
- Kassenbereich / Theke
- Tischaufsteller
- Speisekarte
- Schaufenster
- Flyer / Visitenkarten

<Callout type="tipp">
Fuege einen kurzen Text hinzu wie: "Scanne mich und sammle Stempel — dein 10. Kaffee ist gratis!" Das erhoet die Scan-Rate deutlich.
</Callout>

## Per Share-Link

Du hast einen personalisierten Link, den du ueberall teilen kannst:

- **WhatsApp:** Sende den Link direkt an Stammkunden
- **Instagram:** Link in der Bio oder in Stories
- **Facebook:** Als Post oder in der Seitenbeschreibung
- **E-Mail:** In deiner Signatur oder als Newsletter

<Callout type="info">
Den Share-Link findest du in deinem Dashboard unter "Karte verteilen".
</Callout>

## Tipps fuer mehr Installationen

1. **Sprich Gaeste aktiv an** — "Wir haben jetzt eine digitale Stempelkarte, moechtest du mitmachen?"
2. **Erster Stempel gratis** — Vergib direkt einen Willkommensstempel bei der Installation
3. **Team einbinden** — Informiere dein Personal, damit alle Gaeste ansprechen
4. **Sichtbarkeit** — QR-Code an mehreren Stellen platzieren
```

- [ ] **Step 2: Commit**

```bash
git add src/content/hilfe/erste-schritte/karte-verteilen.mdx
git commit -m "content: add karte-verteilen tutorial"
```

---

### Task 14: Create Scanner App tutorials

**Files:**
- Create: `src/content/hilfe/scanner-app/stempel-vergeben.mdx`
- Create: `src/content/hilfe/scanner-app/belohnung-einloesen.mdx`

- [ ] **Step 1: Create stempel-vergeben.mdx**

Create `src/content/hilfe/scanner-app/stempel-vergeben.mdx`:

```mdx
---
title: "Stempel vergeben"
description: "So vergibst du Stempel an deine Gaeste mit der Scanner App."
order: 1
---

import Callout from '@/components/hilfe/Callout.astro'

Mit der Scanner App vergibst du Stempel an deine Gaeste — schnell, einfach und ohne Papierkarten.

## Voraussetzung

- Die **Boomerang Scanner App** ist auf deinem Smartphone installiert
- Du bist mit deinen Zugangsdaten eingeloggt

## So vergibst du einen Stempel

1. **Oeffne die Scanner App** auf deinem Smartphone
2. **Tippe auf "Scannen"**
3. **Scanne den QR-Code** auf dem Handy deines Gastes (der Gast oeffnet seine Karte im Wallet)
4. **Stempel wird vergeben** — du siehst eine Bestaetigung auf dem Bildschirm

<Callout type="tipp">
Du kannst auch mehrere Stempel auf einmal vergeben — zum Beispiel wenn ein Gast 3 Kaffees bestellt, gibst du 3 Stempel.
</Callout>

## Haeufige Fragen

**Was, wenn der Gast kein Internet hat?**
Die Karte funktioniert auch offline. Der QR-Code auf der Wallet-Karte ist immer sichtbar.

**Kann ich einen Stempel rueckgaengig machen?**
Ja, im Dashboard unter "Kunden" kannst du einzelne Stempel entfernen.

**Wer kann Stempel vergeben?**
Jeder, der Zugang zur Scanner App hat. Du kannst mehrere Mitarbeiter einladen.
```

- [ ] **Step 2: Create belohnung-einloesen.mdx**

Create `src/content/hilfe/scanner-app/belohnung-einloesen.mdx`:

```mdx
---
title: "Belohnung einloesen"
description: "So loest du die Belohnung fuer deine Gaeste ein, wenn die Stempelkarte voll ist."
order: 2
---

import Callout from '@/components/hilfe/Callout.astro'

Wenn ein Gast alle Stempel gesammelt hat, kann die Belohnung eingeloest werden.

## So funktioniert's

1. **Der Gast zeigt dir seine volle Karte** — alle Stempel sind gesammelt
2. **Oeffne die Scanner App**
3. **Scanne den QR-Code** des Gastes
4. **Tippe auf "Belohnung einloesen"**
5. **Fertig!** Die Karte wird automatisch zurueckgesetzt und der Gast kann erneut sammeln

<Callout type="info">
Nach dem Einloesen wird die Stempelkarte automatisch auf 0 zurueckgesetzt. Der Gast kann sofort wieder Stempel sammeln.
</Callout>

## Automatisch vs. Manuell

- **Automatisch:** Die Belohnung wird automatisch eingeloest, sobald die Karte voll ist (Standard-Einstellung)
- **Manuell:** Du entscheidest, wann die Belohnung eingeloest wird — z.B. erst beim naechsten Besuch

<Callout type="tipp">
Die manuelle Einloesung ist ideal, wenn die Belohnung ein bestimmtes Produkt ist (z.B. "1 Hauptgericht gratis"), das der Gast beim naechsten Besuch abholt.
</Callout>
```

- [ ] **Step 3: Commit**

```bash
git add src/content/hilfe/scanner-app/
git commit -m "content: add scanner app tutorials (stempel + belohnung)"
```

---

## Chunk 4: MDX Content — Kartentypen

### Task 15: Create all Kartentypen tutorials

**Files:**
- Create: 9 MDX files in `src/content/hilfe/kartentypen/`

- [ ] **Step 1: Create stempelkarte.mdx**

Create `src/content/hilfe/kartentypen/stempelkarte.mdx`:

```mdx
---
title: "Stempelkarte"
description: "Die klassische digitale Stempelkarte — Stempel sammeln und Belohnung erhalten."
order: 1
---

import Callout from '@/components/hilfe/Callout.astro'

Die Stempelkarte ist der Klassiker: Deine Gaeste sammeln Stempel bei jedem Besuch oder Einkauf und erhalten nach einer bestimmten Anzahl eine Belohnung.

## So funktioniert's

1. Dein Gast installiert die Karte im Apple Wallet oder Google Wallet
2. Bei jedem Besuch scannst du den QR-Code mit der Scanner App
3. Pro Scan wird ein Stempel vergeben
4. Ist die Karte voll → Belohnung einloesen
5. Die Karte wird zurueckgesetzt und der Gast sammelt weiter

## Funktionen

- **Stempelanzahl festlegen** — z.B. 5, 8, 10 oder 15 Stempel bis zur Belohnung
- **Willkommensstempel** — vergib automatisch einen Stempel bei der Installation
- **Geburtstags-Bonus** — Extra-Stempel am Geburtstag deines Gastes
- **Taegliches Stempel-Limit** — maximal X Stempel pro Tag pro Gast
- **Multi-Reward** — mehrere Belohnungsstufen (z.B. bei 5 Stempeln 10% Rabatt, bei 10 Stempeln Gratis-Produkt)
- **Empfehlungsprogramm** — Gaeste werben Gaeste und erhalten Bonus-Stempel

<Callout type="warnung">
Die Stempelanzahl kann nach Aktivierung der Karte **nicht** mehr geaendert werden. Ueberlege dir vorher gut, wie viele Stempel sinnvoll sind.
</Callout>

<Callout type="tipp">
Fuer Cafes empfehlen wir 8-10 Stempel. Fuer Restaurants 5-6 Stempel, da die Besuchsfrequenz niedriger ist.
</Callout>

## Ideal fuer

- Cafes & Baeckereien
- Restaurants & Imbisse
- Friseursalons
- Nagelstudios
- Jedes Geschaeft mit wiederkehrenden Kunden
```

- [ ] **Step 2: Create multipass.mdx**

Create `src/content/hilfe/kartentypen/multipass.mdx`:

```mdx
---
title: "Multipass"
description: "Vorab-gekaufte Mehrfachbesuche auf einer digitalen Karte — ideal fuer 10er-Karten."
order: 2
---

import Callout from '@/components/hilfe/Callout.astro'

Der Multipass ist eine digitale 10er-Karte: Dein Kunde kauft im Voraus eine bestimmte Anzahl an Besuchen oder Services und loest diese nach und nach ein.

## So funktioniert's

1. Dein Kunde kauft z.B. eine 10er-Karte
2. Die Karte wird mit dem Guthaben (z.B. 10 Besuche) ausgestellt
3. Bei jedem Besuch scannst du die Karte — ein Besuch wird abgezogen
4. Der Kunde sieht immer sein Restguthaben auf der Karte

## Funktionen

- **Frei waehlbare Anzahl** — 5er, 10er, 20er oder individuelle Pakete
- **Ablaufdatum** — optional zeitlich begrenzen
- **Punkte pro Einloesung** — zusaetzliche Treuepunkte sammeln
- **Geburtstags-Bonus** — Extra-Besuche am Geburtstag

<Callout type="tipp">
Biete einen Rabatt gegenueber Einzelbesuchen an — z.B. "10er-Karte fuer den Preis von 8". Das motiviert zum Kauf.
</Callout>

## Ideal fuer

- Yoga- & Fitness-Studios (10er-Karte Kurse)
- Waschsalons
- Beauty & Wellness (Manikeue, Massage)
- Autowaschanlagen
```

- [ ] **Step 3: Create cashback.mdx**

Create `src/content/hilfe/kartentypen/cashback.mdx`:

```mdx
---
title: "Cashback"
description: "Kunden sammeln Punkte als Prozentsatz ihrer Einkaeufe — mit progressiven Stufen."
order: 3
---

import Callout from '@/components/hilfe/Callout.astro'

Mit der Cashback-Karte erhalten deine Kunden bei jedem Einkauf einen Prozentsatz als Punkte gutgeschrieben. Diese Punkte koennen sie beim naechsten Einkauf einloesen.

## So funktioniert's

1. Dein Kunde kauft fuer 50 Euro ein
2. Bei 5% Cashback erhaelt er 2,50 Punkte auf seine Karte
3. Beim naechsten Einkauf kann er die Punkte einloesen
4. Je mehr der Kunde ausgibt, desto hoeher kann sein Cashback-Prozentsatz steigen

## Funktionen

- **Bis zu 6 Kundenstufen** — z.B. Bronze (3%), Silber (5%), Gold (8%)
- **Automatischer Stufenaufstieg** — basierend auf Gesamtausgaben
- **Punkt-Ablaufzeit** — Punkte koennen nach X Tagen verfallen
- **Startpunkte** — Willkommensguthaben bei Karteninstallation

<Callout type="tipp">
Starte mit einem grosszuegigen Cashback fuer Neukunden (z.B. 10% im ersten Monat), um die Installation zu foerdern.
</Callout>

## Ideal fuer

- Einzelhandel
- Online-Shops mit stationaerem Geschaeft
- Tankstellen
- Drogerien
```

- [ ] **Step 4: Create geschenkkarte.mdx**

Create `src/content/hilfe/kartentypen/geschenkkarte.mdx`:

```mdx
---
title: "Geschenkkarte"
description: "Digitale Gutscheine mit Guthaben — zum Verschenken oder als Kundenbindung."
order: 4
---

import Callout from '@/components/hilfe/Callout.astro'

Die digitale Geschenkkarte ist ein Gutschein mit Guthaben. Kunden koennen das Guthaben ganz oder teilweise ueber mehrere Besuche einloesen.

## So funktioniert's

1. Du erstellst eine Geschenkkarte mit einem bestimmten Guthaben (z.B. 50 Euro)
2. Die Karte wird per SMS, E-Mail oder QR-Code an den Empfaenger gesendet
3. Der Empfaenger installiert die Karte im Wallet
4. Bei jedem Besuch wird der eingeloeste Betrag abgezogen
5. Das Restguthaben ist immer auf der Karte sichtbar

## Funktionen

- **Einmalige oder mehrfache Einloesung** — Guthaben auf einmal oder stueckweise nutzen
- **Online-Verkauf** — ueber Stripe direkt online verkaufen
- **Verschenken** — Kunden koennen Karten an Freunde und Familie verschicken
- **Ablaufdatum** — optional zeitlich begrenzen

<Callout type="tipp">
Geschenkkarten sind ideal als Weihnachts- oder Geburtstagsaktion. Biete sie mit einem kleinen Bonus an: "50 Euro Gutschein kaufen, 5 Euro extra drauf."
</Callout>

## Ideal fuer

- Restaurants & Cafes
- Beauty & Wellness
- Einzelhandel
- Erlebnis-Anbieter
```

- [ ] **Step 5: Create coupon.mdx**

Create `src/content/hilfe/kartentypen/coupon.mdx`:

```mdx
---
title: "Coupon"
description: "Einmalige digitale Gutscheine zur Neukunden-Gewinnung."
order: 5
---

import Callout from '@/components/hilfe/Callout.astro'

Der Coupon ist ein einmaliger Gutschein, ideal um Neukunden in dein Geschaeft zu locken. Nach der Einloesung kann der Coupon automatisch in eine Treuekarte umgewandelt werden.

## So funktioniert's

1. Du erstellst einen Coupon mit einem Angebot (z.B. "20% auf den ersten Besuch")
2. Der Coupon wird ueber QR-Code, Link oder Social Media verteilt
3. Der Neukunde installiert den Coupon im Wallet
4. Beim ersten Besuch wird der Coupon eingeloest
5. Optional: Der Coupon wird automatisch zur Stempelkarte

## Funktionen

- **Einmaliger Gutschein** — Rabatt, Gratis-Produkt oder Gratis-Service
- **Verknuepfung mit Treuekarte** — nach Einloesung startet das Treueprogramm
- **Ablaufdatum** — zeitlich begrenzte Aktionen
- **Ausgabelimit** — maximale Anzahl Coupons begrenzen

<Callout type="tipp">
Verknuepfe den Coupon mit deiner Stempelkarte! So wird aus einem Erstbesucher ein Stammkunde.
</Callout>

## Ideal fuer

- Neuereoeffnungen
- Saisonale Aktionen
- Event-Marketing
- Social-Media-Kampagnen
```

- [ ] **Step 6: Create mitgliedskarte.mdx**

Create `src/content/hilfe/kartentypen/mitgliedskarte.mdx`:

```mdx
---
title: "Mitgliedskarte"
description: "Digitaler Clubausweis mit Mitgliedschaftsstufen und automatischer Verlaengerung."
order: 6
---

import Callout from '@/components/hilfe/Callout.astro'

Die Mitgliedskarte ist ein digitaler Clubausweis. Zeige den Mitgliedsstatus deiner Kunden an und gewaehre exklusive Vorteile.

## So funktioniert's

1. Du definierst Mitgliedschaftsstufen (z.B. Basis, Premium, VIP)
2. Kunden erhalten ihre digitale Mitgliedskarte im Wallet
3. Die Karte zeigt den aktuellen Status, Ablaufdatum und Vorteile
4. Optional: Automatische Verlaengerung ueber Stripe-Abo

## Funktionen

- **Mehrere Stufen** — individuelle Vorteile pro Stufe
- **Automatische Abo-Verlaengerung** — ueber Stripe
- **Testzeitraum** — 0-30 Tage kostenlos testen
- **Besuchszaehlung** — automatisch Besuche zaehlen
- **Foto & Name** — auf der Karte anzeigbar

<Callout type="info">
Wichtig: Die Karteneinstellungen werden nach der Aktivierung gesperrt. Teste alles gruendlich vorher.
</Callout>

## Ideal fuer

- Fitnessstudios
- Co-Working Spaces
- Clubs & Vereine
- Premium-Kundenclubs
```

- [ ] **Step 7: Create rabattkarte.mdx**

Create `src/content/hilfe/kartentypen/rabattkarte.mdx`:

```mdx
---
title: "Rabattkarte"
description: "Progressive Rabatte — je mehr der Kunde ausgibt, desto hoeher der Rabatt."
order: 7
---

import Callout from '@/components/hilfe/Callout.astro'

Die Rabattkarte belohnt treue Kunden mit steigenden Rabatten. Je mehr ein Kunde bei dir ausgibt, desto hoehere Rabattstufen werden freigeschaltet.

## So funktioniert's

1. Dein Kunde erhaelt eine Rabattkarte
2. Bei jedem Einkauf wird der Betrag erfasst
3. Erreicht der Kunde eine bestimmte Ausgabenschwelle, steigt sein Rabatt
4. Der aktuelle Rabatt ist immer auf der Karte sichtbar

## Funktionen

- **1-6 Rabattstufen** — z.B. ab 100 Euro: 5%, ab 500 Euro: 10%, ab 1000 Euro: 15%
- **Automatischer Stufenaufstieg** — basierend auf Gesamtausgaben
- **Happy Hours** — erhoehte Rabatte in bestimmten Zeitraeumen

<Callout type="tipp">
Setze die erste Stufe niedrig an (z.B. ab 50 Euro), damit Kunden schnell einen ersten Erfolg sehen.
</Callout>

## Ideal fuer

- Einzelhandel
- Mode & Accessoires
- Buchhandlungen
- Weinhandlungen
```

- [ ] **Step 8: Create belohnungskarte.mdx**

Create `src/content/hilfe/kartentypen/belohnungskarte.mdx`:

```mdx
---
title: "Belohnungskarte"
description: "Punktebasiertes Treueprogramm mit verschiedenen Belohnungsstufen."
order: 8
---

import Callout from '@/components/hilfe/Callout.astro'

Die Belohnungskarte ist ein flexibles Punkteprogramm. Kunden sammeln Punkte und loesen sie gegen verschiedene Belohnungen ein — ohne dass die Karte zurueckgesetzt wird.

## So funktioniert's

1. Dein Kunde sammelt Punkte (pro Einkauf, Besuch oder individuell)
2. Bei genug Punkten kann eine Belohnung eingeloest werden
3. Die entsprechenden Punkte werden abgezogen
4. Der Kunde sammelt weiter — unbegrenzt viele Belohnungen moeglich

## Unterschied zur Stempelkarte

| | Stempelkarte | Belohnungskarte |
|---|---|---|
| Sammeln | Stempel | Punkte |
| Belohnung | 1 Belohnung, dann Reset | Mehrere Stufen, kein Reset |
| Flexibilitaet | Fest | Hoch |

## Funktionen

- **3 Sammelmethoden** — Ausgaben, Besuche oder individuelle Punkte
- **Unbegrenzte Belohnungsstufen** — z.B. 50 Punkte: Getraenk, 100 Punkte: Dessert, 200 Punkte: Hauptgericht
- **3 Belohnungstypen** — Prozent-Rabatt, Festbetrag oder physisches Geschenk
- **Punkt-Ablauf** — Punkte koennen nach X Tagen verfallen

<Callout type="tipp">
Ideal, wenn du verschiedene Belohnungen auf verschiedenen Levels anbieten moechtest — das motiviert Kunden, mehr zu sammeln.
</Callout>

## Ideal fuer

- Restaurants mit verschiedenen Gerichten als Belohnung
- Geschaefte mit unterschiedlichen Produktkategorien
- Unternehmen, die ein komplexeres Treueprogramm wuenschen
```

- [ ] **Step 9: Create aktionen.mdx**

Create `src/content/hilfe/kartentypen/aktionen.mdx`:

```mdx
---
title: "Aktionen (Promotions)"
description: "Zeitlich begrenzte Kampagnen und Angebote direkt auf der Kundenkarte."
order: 9
---

import Callout from '@/components/hilfe/Callout.astro'

Aktionen sind zeitlich begrenzte Kampagnen, die du auf bestehenden Karten ausspielst. Perfekt fuer saisonale Angebote, Events oder besondere Aktionen.

## So funktioniert's

1. Du erstellst eine Aktion mit Namen, Beschreibung und Zeitraum
2. Die Aktion wird automatisch auf der Karte deiner Kunden angezeigt
3. Deine Kunden erhalten eine Push-Nachricht ueber die Aktion
4. Die Aktion kann in der Scanner App oder im Dashboard eingeloest werden

## Funktionen

- **Karten-Design aendert sich** — waehrend der Aktion wird ein spezielles Design angezeigt
- **Push-Benachrichtigung** — automatisch bei Start und Ende der Aktion
- **Eigenes Hintergrundbild** — fuer die Aktion hochladen
- **Nutzungslimits** — pro Kunde oder global begrenzen
- **Jederzeit aktivieren/deaktivieren** — volle Kontrolle ueber den Zeitpunkt

<Callout type="warnung">
Pro Kartenvorlage kann nur eine Aktion gleichzeitig aktiv sein.
</Callout>

<Callout type="tipp">
Nutze Aktionen fuer saisonale Highlights: "Adventskalender-Aktion", "Sommerspezial" oder "Happy Hour Freitags". So haeltst du deine Kunden bei Laune.
</Callout>

## Ideal fuer

- Saisonale Angebote (Weihnachten, Ostern, Sommerfest)
- Event-Ankuendigungen
- Flash Sales / Tagesangebote
- Jubilaeen & Geburtstage deines Geschaefts
```

- [ ] **Step 10: Commit all Kartentypen**

```bash
git add src/content/hilfe/kartentypen/
git commit -m "content: add all 9 kartentypen tutorials"
```

---

## Chunk 5: MDX Content — Push-Nachrichten + Support

### Task 16: Create Push-Nachrichten tutorials

**Files:**
- Create: `src/content/hilfe/push-nachrichten/push-erstellen.mdx`
- Create: `src/content/hilfe/push-nachrichten/automatisierung.mdx`

- [ ] **Step 1: Create push-erstellen.mdx**

Create `src/content/hilfe/push-nachrichten/push-erstellen.mdx`:

```mdx
---
title: "Push-Nachricht erstellen"
description: "So erstellst und sendest du Push-Nachrichten an deine Kunden."
order: 1
---

import Callout from '@/components/hilfe/Callout.astro'

Push-Nachrichten erscheinen direkt auf dem Sperrbildschirm deiner Kunden — ohne App, ohne E-Mail. Ideal, um Stammkunden an dein Geschaeft zu erinnern.

## So erstellst du eine Push-Nachricht

1. **Oeffne dein Dashboard** auf boomerangme.cards
2. **Gehe zu "Mailings"** in der linken Navigation
3. **Klicke auf "Neue Nachricht"**
4. **Waehle die Zielgruppe** — alle Karteninhaber oder gefiltert (z.B. nur Kunden mit 5+ Stempeln)
5. **Schreibe deine Nachricht** — kurz und knackig (max. 150 Zeichen empfohlen)
6. **Sende oder plane** — sofort senden oder fuer spaeter planen

<Callout type="tipp">
Halte Push-Nachrichten kurz und mit einem klaren Anreiz: "Heute 2x Stempel auf alle Getraenke! Nur bis 18 Uhr." Keine langen Texte.
</Callout>

## Best Practices

- **Nicht zu oft** — maximal 1-2 Push-Nachrichten pro Woche
- **Timing** — sende zu Zeiten, in denen deine Kunden empfaenglich sind (z.B. 11:30 vor dem Mittagessen)
- **Mehrwert** — jede Nachricht sollte einen konkreten Vorteil bieten
- **Personalisierung** — nutze den Namen des Kunden, wenn moeglich

<Callout type="warnung">
Zu viele Push-Nachrichten fuehren dazu, dass Kunden die Karte loeschen. Qualitaet vor Quantitaet!
</Callout>

## Geolocation-Push

Du kannst Push-Nachrichten automatisch senden, wenn sich ein Kunde in der Naehe deines Geschaefts befindet (100m Radius). Diese Funktion aktivierst du in den Karteneinstellungen unter "Standorte".
```

- [ ] **Step 2: Create automatisierung.mdx**

Create `src/content/hilfe/push-nachrichten/automatisierung.mdx`:

```mdx
---
title: "Automatisierung einrichten"
description: "So automatisierst du Push-Nachrichten — z.B. bei Inaktivitaet oder Geburtstag."
order: 2
---

import Callout from '@/components/hilfe/Callout.astro'

Mit automatisierten Push-Nachrichten erreichst du deine Kunden zum richtigen Zeitpunkt — ohne manuellen Aufwand.

## Verfuegbare Automatisierungen

### 1. Willkommensnachricht
- **Trigger:** Kunde installiert die Karte
- **Beispiel:** "Willkommen! Dein erster Stempel wartet schon auf dich."
- **Wann sinnvoll:** Immer — bestaerkt den Kunden in seiner Entscheidung

### 2. Inaktivitaets-Erinnerung
- **Trigger:** Kunde war X Tage nicht mehr da
- **Beispiel:** "Wir vermissen dich! Komm vorbei und hol dir deinen naechsten Stempel."
- **Wann sinnvoll:** Nach 14-30 Tagen Inaktivitaet

### 3. Geburtstags-Gruss
- **Trigger:** Geburtstag des Kunden
- **Beispiel:** "Happy Birthday! Heute erhaeltst du einen Extra-Stempel als Geschenk."
- **Wann sinnvoll:** Wenn du Geburtstage erfasst

### 4. Fast-volle-Karte
- **Trigger:** Kunde hat X von Y Stempeln
- **Beispiel:** "Nur noch 2 Stempel bis zu deiner Belohnung!"
- **Wann sinnvoll:** Motiviert den Kunden, die Karte vollzumachen

### 5. Geolocation-Push
- **Trigger:** Kunde ist in der Naehe (100m)
- **Beispiel:** "Du bist in der Naehe! Komm rein und sammle deinen naechsten Stempel."
- **Wann sinnvoll:** Fuer Laufkundschaft in belebten Vierteln

## So richtest du eine Automatisierung ein

1. **Gehe zu "Mailings" → "Automatisierungen"** im Dashboard
2. **Klicke auf "Neue Automatisierung"**
3. **Waehle den Trigger** (z.B. "Inaktivitaet")
4. **Definiere die Bedingung** (z.B. "nach 14 Tagen")
5. **Schreibe die Nachricht**
6. **Aktiviere die Automatisierung**

<Callout type="tipp">
Starte mit der Willkommensnachricht und der Inaktivitaets-Erinnerung — das sind die wichtigsten Automatisierungen mit dem groessten Effekt.
</Callout>
```

- [ ] **Step 3: Commit**

```bash
git add src/content/hilfe/push-nachrichten/
git commit -m "content: add push notification tutorials"
```

---

### Task 17: Create Support page

**Files:**
- Create: `src/content/hilfe/support/kontakt.mdx`

- [ ] **Step 1: Create kontakt.mdx**

Create `src/content/hilfe/support/kontakt.mdx`:

```mdx
---
title: "Kontakt & Hilfe"
description: "So erreichst du uns — per WhatsApp, Telefon oder E-Mail."
order: 1
---

import Callout from '@/components/hilfe/Callout.astro'

Du brauchst Hilfe oder hast eine Frage? Wir sind fuer dich da.

## So erreichst du uns

### WhatsApp (am schnellsten)
Schreib uns direkt per WhatsApp — wir antworten in der Regel innerhalb weniger Stunden.

**[+49 170 5594140](https://wa.me/491705594140)**

### Telefon
Ruf uns an — Mo-Fr, 9-18 Uhr.

**+49 173 7130733**

### E-Mail
Fuer ausfuehrliche Anfragen oder wenn du Dateien senden moechtest.

**info@fuerte.digital**

<Callout type="tipp">
Per WhatsApp geht's am schnellsten. Schick uns gerne auch Screenshots, wenn etwas nicht funktioniert — das hilft uns, dein Problem schneller zu loesen.
</Callout>

## Haeufig gestellte Fragen

**Wie aendere ich das Design meiner Karte?**
Schreib uns per WhatsApp — wir passen das Design fuer dich an.

**Kann ich mein Abo kuendigen?**
Ja, jederzeit. Schreib uns eine kurze Nachricht und wir kuemmern uns darum.

**Ich habe mein Passwort vergessen.**
Gehe auf [boomerangme.cards](https://boomerangme.cards) und klicke auf "Passwort vergessen". Du erhaeltst eine E-Mail zum Zuruecksetzen.

**Mein QR-Code funktioniert nicht.**
Stelle sicher, dass du den richtigen QR-Code verwendest (aus dem Dashboard, nicht aus der App). Bei Problemen schick uns einen Screenshot.
```

- [ ] **Step 2: Commit**

```bash
git add src/content/hilfe/support/
git commit -m "content: add support contact page"
```

---

## Chunk 6: Build verification + final commit

### Task 18: Full build and verification

- [ ] **Step 1: Run full build**

```bash
cd "/Users/danielgruederich/Documents/Claude projects/bonuskarte-digital"
npm run build
```

Expected: Build succeeds, all 16 tutorial pages are generated.

- [ ] **Step 2: Start dev server and verify**

```bash
npm run dev
```

Test these URLs:
- `http://localhost:4321/hilfe/` — overview page with 5 category cards
- `http://localhost:4321/hilfe/erste-schritte/onboarding` — first tutorial with sidebar
- `http://localhost:4321/hilfe/kartentypen/stempelkarte` — kartentypen tutorial
- `http://localhost:4321/hilfe/push-nachrichten/push-erstellen` — push tutorial
- Verify sidebar navigation works (active link gold-highlighted)
- Verify prev/next navigation at bottom
- Verify mobile sidebar toggle works (resize browser < 1024px)
- Verify "Hilfe" link in navbar

- [ ] **Step 3: Fix any issues found**

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete hilfe & tutorials section with 16 tutorials"
```
