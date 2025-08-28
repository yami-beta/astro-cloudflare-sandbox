import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const releases = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/releases" }),
  schema: z.object({
    version: z.string(),
    date: z.coerce.date(),
    category: z.enum(["major", "minor", "patch"]),
    breaking: z.boolean().optional(),
    features: z.array(z.string()).optional(),
    fixes: z.array(z.string()).optional(),
    deprecated: z.array(z.string()).optional(),
  }),
});

export const collections = { releases };
