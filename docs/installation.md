# willtheorangeguy.github.io — Installation

## Prerequisites

| Requirement | Notes |
|---|---|
| Node 20+ | Astro 7 and the native OG-image module both want a current Node |
| npm or pnpm | CI uses pnpm; either works locally |
| Git | |
| Docker | Only for the container route |

## From source

```bash
git clone https://github.com/willtheorangeguy/willtheorangeguy.github.io.git
cd willtheorangeguy.github.io
npm install
npm run dev
```

`http://localhost:4321` — http, not https.

### A note on the two lockfiles

Both `package-lock.json` and `pnpm-lock.yaml` are committed. CI installs with
`pnpm install --frozen-lockfile`, so pnpm's is the one that governs what is actually built.
Running `npm install` updates the other, and the two can drift apart without anything
complaining. Recorded in [`internal/known-issues.md`](./internal/known-issues.md).

## Docker

```bash
docker pull ghcr.io/willtheorangeguy/willtheorangeguy.github.io:main
docker run -d -p 8000:80 ghcr.io/willtheorangeguy/willtheorangeguy.github.io:main
```

Then `http://localhost:8000` — port 8000, not plain `localhost`, because the container's port 80
is published there.

The image is a multi-stage build: Node builds the site, Nginx serves the result. It contains the
built output only, so nothing in it can be edited usefully — it is for running the site, not for
working on it.

## Building for production

```bash
npm run build
npm run preview
```

The full pipeline runs the Google Maps fetch, Storybook, a type check, the Astro build, Pagefind
indexing, and a copy of the search index into `public/`. See
[Architecture](./architecture.md) for what each step contributes.

`npm run build` reaches the network for the Google Maps stats. It falls back to the committed
cache if that fails, so an offline build still works — see
[Google Maps automation](./google-maps-automation.md).

## Verifying

```bash
npm run lint
npm run format:check
```

There is no test suite. Playwright is installed — the stats scraper uses it — but nothing is
wired up as tests.
