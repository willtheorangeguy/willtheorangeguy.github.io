# willtheorangeguy.github.io — Troubleshooting

## `/search` returns nothing, or 404s

Pagefind indexes built output. Under `npm run dev` there is no index. Run:

```bash
npm run build && npm run preview
```

If it is still empty after a full build, check that the `cp -r dist/pagefind public/` step ran —
running `astro build` on its own skips it.

## The Docker container does not respond on localhost:8000

Map to 8080, not 80:

```bash
docker run -d -p 8000:8080 ghcr.io/willtheorangeguy/willtheorangeguy.github.io:main
```

`nginx/nginx.conf` has `listen 8080` and the Dockerfile declares `EXPOSE 8080`. The `-p 8000:80`
in the older instructions maps to a port nothing is listening on, so the container looks dead
when it is fine. Recorded in [`internal/known-issues.md`](./internal/known-issues.md).

## `https://localhost:4321` refuses to connect

The Astro dev server is plain HTTP. Use `http://localhost:4321`.

## The build fails in `astro check`

A type error, most often in frontmatter: `src/content.config.ts` validates every post's
frontmatter with Zod and rejects unknown keys. The message names the file and the field. This is
deliberate — a typo'd `draft` key would otherwise publish a post you meant to hold back.

## A post does not appear

Three usual causes: `draft: true`, a filename starting with `_` (which the loader skips), or a
`pubDatetime` more than 15 minutes in the future.

## The Google Maps numbers are stale or wrong

The scrape runs daily and falls back to the committed cache when it fails, so stale numbers mean
the scrape has been failing quietly. Run it by hand:

```bash
npm run fetch-maps-stats
```

[Google Maps automation](./google-maps-automation.md) covers the fallback layers.

## `npm install` keeps changing a lockfile

Both `package-lock.json` and `pnpm-lock.yaml` are committed, so whichever manager you did not use
looks modified. CI uses pnpm. Pick one for a session and discard the other file's churn rather
than committing both.

## Project images are broken on `/projects`

They point into other repositories' `docs/images/` directories, which are being removed in
favour of `willtheorangeguy/.github/icons/`. The replacement URLs are listed in
[`internal/known-issues.md`](./internal/known-issues.md).

## OG images fail to generate

`@resvg/resvg-js` is a native module and is deliberately excluded from Vite's `optimizeDeps`.
If it fails to load, reinstall dependencies for your platform — a `node_modules` copied between
operating systems will not work.

## Prettier reorders my Tailwind classes

Intended: `prettier-plugin-tailwindcss` enforces class order against `src/styles/global.css`.
Run `npm run format` before committing and the diff stays clean.

## Still stuck

[Open an issue](https://github.com/willtheorangeguy/willtheorangeguy.github.io/issues/new/choose)
with the command you ran and the full output.
