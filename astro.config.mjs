import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
    site: "https://williamvdg.me/williamvdg.me/", // replace this with your deployed domain
    integrations: [
        tailwind({
            applyBaseStyles: false,
        }),
        react(),
        sitemap(),
    ],
    markdown: {
        remarkPlugins: [
            remarkToc,
            remarkReadingTime,
            [
                remarkCollapse,
                {
                    test: "Table of contents",
                },
            ],
        ],
        rehypePlugins: [
            [
                rehypeExternalLinks,
                {
                    content: { type: "text", value: "🔗" },
                },
            ],
        ],
        shikiConfig: {
            theme: "one-dark-pro",
            wrap: true,
        },
        extendDefaultPlugins: true,
    },
    vite: {
        optimizeDeps: {
            exclude: ["@resvg/resvg-js"],
        },
    },
    scopedStyleStrategy: "where",
});
