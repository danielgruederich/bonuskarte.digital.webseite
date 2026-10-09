// Zentrale Gestaltung des Blogs (alle Städte + EN/FR).
// Palette: coolors.co/f25c24-2f4858-33658a-86bbd8-f6ae2d
// Jede Schriftfarbe ist gegen ihre Fläche geprüft (WCAG AA ≥ 4,5:1):
//   honey-bronze + ink 9,6:1 · baltic-blue + weiß 6,2:1 · sky-reflection + ink 8,8:1
//   charcoal-blue + weiß 9,6:1 · ink + paper 16,2:1
// Hover ändert nie die Schriftfarbe, nur Rahmen, Schatten und Bewegung.
import fs from 'node:fs'
import path from 'node:path'
import type { CollectionEntry } from 'astro:content'
import { BLOG_UI, getBlogCategoryLabel, type BlogLang } from './blog-i18n'

export type BlogCategory = 'Ratgeber' | 'Strategie' | 'How-to' | 'News' | 'Lokales'

export const categoryStyle: Record<BlogCategory, { surface: string; tag: string }> = {
  'Ratgeber':  { surface: 'bg-honey-bronze text-ink',    tag: 'bg-honey-bronze text-ink' },
  'Strategie': { surface: 'bg-baltic-blue text-white',   tag: 'bg-baltic-blue text-white' },
  'How-to':    { surface: 'bg-sky-reflection text-ink',  tag: 'bg-sky-reflection text-ink' },
  'News':      { surface: 'bg-ink text-paper',           tag: 'bg-ink text-paper' },
  'Lokales':   { surface: 'bg-charcoal-blue text-white', tag: 'bg-charcoal-blue text-white' },
}

/** Texte der Blog-Bausteine je Sprache (EN/FR aus BLOG_UI) */
export function blogLabels(lang: BlogLang = 'de') {
  if (lang === 'de') {
    return {
      readingTime: (min: number) => `${min} Min. Lesezeit`,
      read: 'Lesen',
      readArticle: 'Artikel lesen',
      featured: 'Empfohlen',
      authorRole: 'Gründer bonuskarte.digital',
      dateLocale: 'de-DE',
      category: (c: string) => c,
    }
  }
  const ui = BLOG_UI[lang]
  return {
    readingTime: (min: number) => `${min} ${ui.readingTime}`,
    read: ui.read,
    readArticle: ui.read,
    featured: ui.featured,
    authorRole: ui.authorRole,
    dateLocale: ui.dateLocale,
    category: (c: string) => getBlogCategoryLabel(c, lang),
  }
}

export function formatBlogDate(date: Date, lang: BlogLang = 'de') {
  return new Intl.DateTimeFormat(blogLabels(lang).dateLocale, { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

/**
 * Vorschaubild (og:image, Schema.org) eines Artikels: das per `npm run blog:og`
 * erzeugte Titelbild unter public/images/blog-og/<slug>.jpg, sonst heroImage.
 */
export function blogOgImage(post: CollectionEntry<'blog'>): string {
  const rel = `/images/blog-og/${post.slug}.jpg`
  return fs.existsSync(path.join(process.cwd(), 'public', rel)) ? rel : post.data.heroImage
}
