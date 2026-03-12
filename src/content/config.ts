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
  }),
})

export const collections = { blog }
