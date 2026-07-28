import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import path from 'path'

// Pages that must never end up in the sitemap.
// Rule: if a page carries noindex, is a redirect stub or is internal-only,
// it does not belong in the sitemap — otherwise GSC reports it as an error.
const SITEMAP_EXCLUDE_SUBSTRINGS = [
  '/preview-', // blog preview routes (internal)
  '/gruender', // founder landing (noindex)
  '/walkin', // iPad walk-in landing (noindex)
]

const SITEMAP_EXCLUDE_PATHS = [
  '/v2/', // A/B variant, canonical points to /
  '/preview/', // internal editorial overview
  '/termin/', // noindex
  '/danke/', // noindex
  '/cafes-koeln/', // legacy, noindex + redirect stub
  '/doener-koeln/', // legacy, noindex + redirect stub
  '/pizza-koeln/', // legacy, noindex + redirect stub
  '/restaurant-koeln/', // legacy, noindex + redirect stub
]

const sitemapFilter = (page) => {
  const url = new URL(page)
  if (SITEMAP_EXCLUDE_SUBSTRINGS.some((s) => url.pathname.includes(s))) return false
  if (SITEMAP_EXCLUDE_PATHS.includes(url.pathname)) return false
  return true
}

export default defineConfig({
  site: 'https://bonuskarte.digital',
  integrations: [react(), tailwind(), sitemap({ filter: sitemapFilter }), mdx()],
  output: 'static',
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
})
