import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import { SITE } from "./src/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [sitemap({
    filter: page => SITE.showArchives || !page.endsWith("/archives"),
  }), react()],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of Contents" }]],
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
  image: {
    // Used for all Markdown images; not configurable per-image
    // Used for all `<Image />` and `<Picture />` components unless overridden with a prop
    experimentalLayout: "responsive",
  },
  experimental: {
    responsiveImages: true,
    preserveScriptOrder: true,
  },
});