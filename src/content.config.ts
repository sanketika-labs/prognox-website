import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Use-case copy lives in Markdown so marketing edits never require touching a
 * component. The schema below is enforced at build time — a missing field or a
 * bad `order` fails the build rather than rendering a broken card.
 */
const usecases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/usecases' }),
  schema: z.object({
    title: z.string(),
    sector: z.string(),
    summary: z.string(),
    metrics: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        }),
      )
      .max(3),
    order: z.number(),
  }),
});

export const collections = { usecases };
