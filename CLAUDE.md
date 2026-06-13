# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev              # Start dev server at localhost:4321
npm run build            # Full production build (see note below)
npm run preview          # Serve the production build locally

# Code quality
npm run lint             # ESLint
npm run format:check     # Prettier check
npm run format           # Prettier auto-fix

# Data
npm run fetch-maps-stats # Fetch Google Maps stats into src/data/google-maps-stats.json
npm run sync             # Sync Astro content collection types
```

> **Note on `npm run build`:** The full build pipeline is `fetch-maps-stats && astro check && astro build && pagefind --site dist && cp -r dist/pagefind public/`. The `pagefind` step indexes content for the client-side search feature — skipping it leaves `/search` broken. There is no `npm test` script; Playwright is installed but not yet wired up.

The package manager used in CI is **pnpm**. Either `npm` or `pnpm` works locally.

## Architecture

This is an **Astro 6** static site (personal blog + portfolio) built on the [AstroPaper](https://github.com/satnaing/astro-paper) theme, deployed to GitHub Pages and mirrored as a Docker image to GHCR.

### Key configuration files

| File | Purpose |
|------|---------|
| `src/config.ts` | Single source of truth for site metadata (URL, author, pagination, timezone, feature flags) |
| `src/constants.ts` | Social links (`SOCIALS`), share links (`SHARE_LINKS`), and Giscus comment config (`GISCUS`) |
| `src/content.config.ts` | Zod schema for the `blog` content collection; defines every valid frontmatter field |
| `astro.config.ts` | Astro integrations (sitemap, React), Shiki code themes, remark plugins |

### Content

Blog posts live in `src/data/blog/` as Markdown files. Required frontmatter: `title`, `pubDatetime`, `description`. Optional: `modDatetime`, `tags`, `featured`, `draft`, `ogImage`, `canonicalURL`, `hideEditPost`, `timezone`. Files prefixed with `_` are ignored by the glob loader.

### Path alias

`@/` resolves to `src/` (configured in `tsconfig.json`). Use this everywhere — avoid relative imports that traverse `..`.

### React islands

React components (`src/components/*.tsx`) are used only for interactive features: `GoogleMapsStats.tsx`, `UnsplashStats.tsx`, and `Comments.tsx` (Giscus). Everything else is `.astro`. Keep the React surface minimal.

### OG image generation

Dynamic OG images are generated at build time via Satori + `@resvg/resvg-js`. The entry point is `src/pages/og.png.ts`, templates live in `src/utils/og-templates/`, and orchestration is in `src/utils/generateOgImages.ts`. `@resvg/resvg-js` is excluded from Vite's `optimizeDeps` because it's a native module.

### Theming

Light/dark mode is driven by CSS variables defined in `src/styles/global.css` using `@theme inline`. Key variables: `--color-accent`, `--color-background`, `--color-foreground`, `--color-border`, `--color-muted`. The theme toggle runs from `public/toggle-theme.js` (vanilla JS, no framework).

### Search

Search is powered by [Pagefind](https://pagefind.app/), which requires a completed `astro build` to generate the index under `dist/pagefind/`. The build script copies that index into `public/pagefind/` so `astro preview` can serve it. The search UI is at `src/pages/search.astro`.

### Deployment

- **GitHub Pages**: triggered on push to `main` via `.github/workflows/astro.yml`
- **Docker**: multi-stage build (Node → Nginx) published to GHCR via `.github/workflows/docker-image.yml`
- **Google Maps stats**: updated on a schedule via `.github/workflows/update-google-maps-stats.yml`, which runs `scripts/update-maps-cache.mjs` and commits the result to `src/data/google-maps-stats.json`

## Conventions

- ESLint disallows `console.log` everywhere except `scripts/`
- Prettier: 2-space indent, 80-char print width, double quotes, LF line endings, `es5` trailing commas
- Tailwind class order is enforced by `prettier-plugin-tailwindcss` using `src/styles/global.css` as the stylesheet reference
- Timezone for post dates defaults to `America/Vancouver` (set in `src/config.ts`); individual posts can override via the `timezone` frontmatter field
