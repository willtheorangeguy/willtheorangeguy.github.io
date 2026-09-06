import { defineConfig } from "astro/config";
import type { AstroIntegration } from "astro";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import { SITE } from "./src/config";
import { readFile, writeFile } from "node:fs/promises";

import react from "@astrojs/react";

/**
 * The Quartz digital garden at /notes/ is a separate build with its own
 * sitemap. @astrojs/sitemap only indexes routes it generated, so the index it
 * writes has to be reopened and the external sitemap appended -- otherwise the
 * ~900 URLs under /notes/ are reachable only through robots.txt.
 */
const NOTES_SITEMAP = new URL("notes/sitemap.xml", SITE.website).href;

function notesSitemap(): AstroIntegration {
  return {
    name: "notes-sitemap",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const indexPath = new URL("sitemap-index.xml", dir);
        let xml: string;
        try {
          xml = await readFile(indexPath, "utf-8");
        } catch {
          logger.warn("sitemap-index.xml not found; skipping /notes/ entry");
          return;
        }

        if (xml.includes(NOTES_SITEMAP)) return;

        await writeFile(
          indexPath,
          xml.replace(
            "</sitemapindex>",
            `<sitemap><loc>${NOTES_SITEMAP}</loc></sitemap></sitemapindex>`
          )
        );
        logger.info(`added ${NOTES_SITEMAP} to sitemap-index.xml`);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
    }),
    react(),
    notesSitemap(),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkToc,
        [remarkCollapse, { test: "Table of Contents" }],
      ],
    }),
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
