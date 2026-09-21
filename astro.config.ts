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

            // @astrojs/sitemap emits bare <loc> entries, throwing away a
            // recrawl signal that matters on a blog that publishes follow-ups.
            // The dates come from frontmatter via the page's own JSON-LD, so
            // they reflect the content rather than the time of the build.
            const lastmod =
              html.match(/"dateModified":"([^"]+)"/)?.[1] ??
              html.match(/"datePublished":"([^"]+)"/)?.[1];

            kept.push(
              lastmod && !entry[0].includes("<lastmod>")
                ? entry[0].replace(
                    "</url>",
                    `<lastmod>${lastmod}</lastmod></url>`
                  )
                : entry[0]
            );
          }

          const head = xml.slice(0, xml.indexOf("<url>"));
          const rebuilt = `${head}${kept.join("")}</urlset>`;
          if (rebuilt !== xml) {
            await writeFile(url, rebuilt);
            const dated = kept.filter(e => e.includes("<lastmod>")).length;
            logger.info(
              `${file[1].split("/").pop()}: dropped ${dropped} noindex page(s), ` +
                `set lastmod on ${dated}`
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
  // Canonicals and sitemap entries all carry a trailing slash, so links must
  // too -- otherwise every internal navigation burns a 301 on GitHub Pages.
  // "always" makes a missing slash fail loudly in dev instead of silently
  // redirecting in production.
  trailingSlash: "always",
  integrations: [
    sitemap({
      // Emitted URLs end in a slash, so match on "/archives/" -- the old
      // "/archives" check never fired.
      filter: page => SITE.showArchives || !page.endsWith("/archives/"),
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
