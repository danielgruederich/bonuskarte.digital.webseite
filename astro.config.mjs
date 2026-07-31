import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import path from 'path'
import { isIndexablePath } from './src/lib/indexability.ts'

export default defineConfig({
  site: 'https://bonuskarte.digital',
  // Sitemap meldet ausschließlich indexierbare Seiten. Die Regel liegt in
  // src/lib/indexability.ts und wird identisch von CityNichePage und der
  // Köln-Route genutzt — so können Sitemap und Seiten-Meta nicht auseinanderlaufen.
  integrations: [react(), tailwind(), sitemap({ filter: isIndexablePath }), mdx()],
  output: 'static',
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
})
