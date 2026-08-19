# willtheorangeguy.github.io — Quickstart

## Run it

```bash
git clone https://github.com/willtheorangeguy/willtheorangeguy.github.io.git
cd willtheorangeguy.github.io
npm install
npm run dev
```

Open `http://localhost:4321`. Note **http**, not https — the Astro dev server does not use TLS.

Either npm or pnpm works locally; CI uses pnpm, and both lockfiles are committed. Pick one and
stay with it for a session, or you will churn the other lockfile.

## Write something

Posts are Markdown in `src/data/blog/`. The minimum:

```markdown
---
title: A title
pubDatetime: 2026-08-19T10:00:00Z
description: One sentence, used for previews and the OG image.
---

Body copy.
```

Save it and the dev server picks it up. Prefix a filename with `_` to have the loader ignore it,
or set `draft: true`. [Usage](./usage.md) covers the rest of the frontmatter.

## Build it

```bash
npm run build
npm run preview
```

The build is longer than `astro build` alone: it fetches Google Maps stats, builds Storybook into
`public/styleguide`, type-checks, builds, then runs Pagefind and copies the search index into
`public/`. Skipping any of it leaves something visibly missing — most obviously `/search`, which
needs the Pagefind index. [Development](./development.md) breaks the pipeline down.

## What success looks like

The dev server prints a local URL, the home page lists your posts newest first, and `/search`
works after a full `npm run build` (it will not work from `npm run dev` alone, which is expected).
