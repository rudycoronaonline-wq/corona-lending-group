import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
    generateId: ({ entry }) => entry,
  }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    slug: z.string().optional(),
    date: z.coerce.date(),
    category: z.string(),
    image: z.string().optional(),
    toc: z.array(z.object({ title: z.string(), slug: z.string() })).optional(),
  }),
});

export const collections = { blog };
