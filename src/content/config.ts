import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string(),
    category: z.enum(['Ratgeber', 'Strategie', 'How-to', 'News', 'Lokales']),
    readingTime: z.number(),
    featured: z.boolean().default(false),
    city: z.string(), // e.g. 'koeln', 'hamburg', 'berlin'
    niche: z.string().optional(), // e.g. 'cafe', 'eiscafe', 'baeckerei' — used for booking URL
    approved: z.boolean().default(true), // false = Entwurf, true = freigegeben
    needsEdit: z.boolean().default(false), // true = Änderungen nötig
    faqItems: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
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
