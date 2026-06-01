import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import path from 'path'

export default defineConfig({
  site: 'https://bonuskarte.digital',
  integrations: [react(), tailwind(), sitemap({ filter: (page) => !page.includes('/preview-') && !page.includes('/gruender') && !page.includes('/walkin') }), mdx()],
  output: 'static',
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
})
