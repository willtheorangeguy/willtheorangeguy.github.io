# willtheorangeguy.github.io — Development

## Commands

```bash
npm run dev              # dev server at http://localhost:4321
npm run build            # full production build (see below)
npm run preview          # serve the built output
npm run sync             # regenerate Astro content collection types

npm run lint             # ESLint
npm run format:check     # Prettier, check only
npm run format           # Prettier, write

npm run fetch-maps-stats # refresh the Google Maps cache
npm run storybook        # Storybook at :6006
npm run storybook:build  # Storybook -> public/styleguide
```

## The build is not just `astro build`

```
fetch-maps-stats && storybook:build && astro check && astro build
  && pagefind --site dist && cp -r dist/pagefind public/
```

Skipping the Pagefind steps leaves `/search` broken; skipping the Storybook step leaves
`/styleguide` missing. Run the script rather than its parts.

## Package managers

CI installs with pnpm (`pnpm install --frozen-lockfile`); either works locally. Both
`package-lock.json` and `pnpm-lock.yaml` are committed, which means the two can disagree without
anything noticing — pnpm's is the one that decides what ships. See
[`internal/known-issues.md`](./internal/known-issues.md).

## Conventions

- **ESLint disallows `console.log`** everywhere except `scripts/`.
- **Prettier**: 2-space indent, 80-column print width, double quotes, LF endings, `es5` trailing
  commas.
- **Tailwind class order** is enforced by `prettier-plugin-tailwindcss`, using
  `src/styles/global.css` as the stylesheet reference — so `npm run format` reorders classes and
  that reordering is not noise.
- **Imports use the `@/` alias** for `src/`. Avoid relative paths that climb out of a directory.
- **Keep React to interactive components.** Three `.tsx` islands exist; everything else is
  `.astro` and ships no JavaScript.

## Storybook

Stories live in `src/stories/`. `npm run storybook` serves them at `:6006`; the production build
emits them to `public/styleguide`, so the deployed site carries its own style guide.

## Tests

There are none. Playwright is a dependency because `scripts/update-maps-cache.mjs` drives a
headless browser, not because anything is tested with it. `astro check` in the build is the only
automated correctness gate, and it is a type check.

## CI

`astro.yml` builds and deploys, `codeql.yml` and `gitleaks.yml` scan, `diagram.yml` regenerates
`diagram.svg`, and `update-google-maps-stats.yml` refreshes the stats cache on a schedule.
[Deployment](./deployment.md) has the full table.

## Working on the Projects page

`src/pages/projects.astro` is hand-maintained: one block per project, each with a hardcoded
image URL. Those URLs currently point into other repositories' `docs/images/` folders, which are
being retired in favour of `willtheorangeguy/.github/icons/`. If you touch that file, move the
URLs over — [`internal/known-issues.md`](./internal/known-issues.md) lists each replacement.

## Contributing

See the org-wide
[Contributing Guide](https://github.com/willtheorangeguy/.github/blob/main/CONTRIBUTING.md).
