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

/** Where a sitemap <loc> lands on disk in the build output. */
function outputPathFor(loc: string, dir: URL): URL | undefined {
  const path = loc.slice(SITE.website.replace(/\/$/, "").length + 1);
  if (path === "" || path === "/") return new URL("index.html", dir);
  return new URL(`${path.replace(/\/$/, "")}/index.html`, dir);
}

function sitemapPostProcess(): AstroIntegration {
  return {
    name: "sitemap-post-process",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const indexPath = new URL("sitemap-index.xml", dir);
        let index: string;
        try {
          index = await readFile(indexPath, "utf-8");
        } catch {
          logger.warn("sitemap-index.xml not found; skipping post-process");
          return;
        }

        // A page that asks not to be indexed should not be advertised in the
        // sitemap either. The rendered robots meta is the single source of
        // truth, so nothing here has to duplicate the per-route rules.
        for (const file of index.matchAll(
          /<loc>([^<]*sitemap-\d+\.xml)<\/loc>/g
        )) {
          const url = new URL(file[1].slice(SITE.website.length), dir);
          const xml = await readFile(url, "utf-8");
          const kept: string[] = [];
          let dropped = 0;

          for (const entry of xml.matchAll(/<url>.*?<\/url>/gs)) {
            const loc = entry[0].match(/<loc>([^<]+)<\/loc>/)?.[1];
            const page = loc ? outputPathFor(loc, dir) : undefined;
            let html = "";
            if (page) {
              try {
                html = await readFile(page, "utf-8");
              } catch {
                // Route with no matching file on disk; leave it alone.
              }
            }
            if (/<meta name="robots" content="[^"]*noindex/.test(html)) {
              dropped++;
              continue;
            }
            kept.push(entry[0]);
          }

          if (dropped > 0) {
            const head = xml.slice(0, xml.indexOf("<url>"));
            await writeFile(url, `${head}${kept.join("")}</urlset>`);
            logger.info(
              `dropped ${dropped} noindex page(s) from ${file[1].split("/").pop()}`
            );
          }
        }

        if (!index.includes(NOTES_SITEMAP)) {
          index = index.replace(
            "</sitemapindex>",
            `<sitemap><loc>${NOTES_SITEMAP}</loc></sitemap></sitemapindex>`
          );
          await writeFile(indexPath, index);
          logger.info(`added ${NOTES_SITEMAP} to sitemap-index.xml`);
        }
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
    sitemapPostProcess(),
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
