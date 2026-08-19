# willtheorangeguy.github.io — Architecture

An Astro static site on the [AstroPaper](https://github.com/satnaing/astro-paper) theme. Astro 7,
Tailwind 4, React 19 for a few interactive islands, TypeScript throughout. Output is static HTML
— there is no server.

## Layout

```
src/
├── config.ts           site metadata, pagination, feature flags, timezone
├── constants.ts        SOCIALS, SHARE_LINKS, GISCUS
├── content.config.ts   Zod schema for the blog collection
├── data/blog/          posts, as Markdown
├── pages/              routes, including projects.astro and og.png.ts
├── layouts/            page shells
├── components/         .astro components, plus three .tsx islands
├── stories/            Storybook stories
├── styles/global.css   theme variables via @theme inline
├── utils/              OG generation, caches, helpers
└── assets/icons/       SVGs imported by constants.ts

public/
├── r/                  short-link redirects, with an index
├── toggle-theme.js     the theme switcher, vanilla JS
├── pagefind/           search index, copied in by the build
└── styleguide/         Storybook output, built by the build
```

`@/` resolves to `src/`, configured in `tsconfig.json`. Relative imports that climb out of a
directory are avoided.

## Content

Posts are a Zod-validated Astro content collection. The schema is the contract: it names every
legal frontmatter field, and anything else fails the build. Files prefixed `_` are skipped by
the loader.

## React islands, kept small

Only three components are React, and only because they are interactive: `GoogleMapsStats.tsx`,
`UnsplashStats.tsx`, and `Comments.tsx` (Giscus). Everything else is `.astro` and ships no
JavaScript. That boundary is worth keeping — the reason the site is fast is that almost none of
it hydrates.

## OG images

Generated at build time with Satori and `@resvg/resvg-js`. `src/pages/og.png.ts` is the entry
point, templates are in `src/utils/og-templates/`, and orchestration is in
`src/utils/generateOgImages.ts`. `@resvg/resvg-js` is excluded from Vite's `optimizeDeps`
because it is a native module, which is the sort of thing that looks like a stray config line
until you remove it.

## Search

[Pagefind](https://pagefind.app/), which indexes built output rather than source. The build runs
`pagefind --site dist` and copies the result into `public/pagefind/` so `astro preview` can serve
it. Search therefore does not work under `npm run dev`, and a partial build leaves `/search`
broken — which is why the build script is longer than `astro build`.

## Theming

Light and dark are CSS variables in `src/styles/global.css`, declared with `@theme inline`:
`--color-accent`, `--color-background`, `--color-foreground`, `--color-border`, `--color-muted`.
The toggle is `public/toggle-theme.js`, plain JavaScript with no framework, so the theme applies
before hydration and the page does not flash.

## The build pipeline

```
npm run build
  = fetch-maps-stats      # scrape/refresh Google Maps contribution stats
  && storybook:build      # Storybook -> public/styleguide
  && astro check          # type-check
  && astro build          # -> dist/
  && pagefind --site dist # search index
  && cp -r dist/pagefind public/
```

Each step leaves something visibly missing if skipped. The Storybook step means a normal build
also publishes the style guide at `/styleguide`.

## Deployment

Two targets from the same source: GitHub Pages on push to `main`, and a Docker image (Node build
stage, Nginx serving stage) published to GHCR. [Deployment](./deployment.md) covers both.

## The Projects page

`src/pages/projects.astro` is a hand-maintained list of projects with a hardcoded image URL each.
Those URLs point into other repositories' `docs/images/` directories, which are being retired
across the account in favour of `willtheorangeguy/.github/icons/`. Most of them will 404 as that
work lands — see [`internal/known-issues.md`](./internal/known-issues.md), which lists the
replacement URLs.
