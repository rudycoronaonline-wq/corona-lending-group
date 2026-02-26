import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Rudy Corona'),
    category: z.enum(['first-time-buyers', 'refinance', 'seniors', 'investors', 'market-news']),
    image: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
};
