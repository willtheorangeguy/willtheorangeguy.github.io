import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
      /**
       * Marks a post as a review of a named thing, so it can emit Review
       * JSON-LD. `rating` is the author's own score out of 5 -- omit it and
       * the schema is still valid, just not eligible for a star snippet.
       */
      review: z
        .object({
          itemName: z.string(),
          itemType: z.string().default("Product"),
          itemUrl: z.string().optional(),
          rating: z.number().min(1).max(5).optional(),
        })
        .optional(),
    }),
});

export const collections = { blog };
