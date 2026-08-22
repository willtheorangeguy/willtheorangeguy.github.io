# willtheorangeguy.github.io — Deployment

Two targets, same source.

## GitHub Pages

`.github/workflows/docs.yml` runs on push to `main`: it installs from the pnpm lockfile, builds
Storybook, Astro, and the Material documentation, then uploads `dist/` as the Pages artifact.

The site is served at **[williamvdg.me](https://williamvdg.me)** rather than at
`willtheorangeguy.github.io`, because `CNAME` at the repository root contains `williamvdg.me`
and is copied into the published output. Deleting it, or dropping it from the artifact, moves
the site back to the github.io domain and breaks every existing link.

`SITE.website` in `src/config.ts` must agree with that domain — it drives canonical URLs, the
sitemap, and RSS. Changing one without the other produces a site that quietly advertises the
wrong address to search engines.

## Docker image

`.github/workflows/docker-image.yml` publishes to
`ghcr.io/willtheorangeguy/willtheorangeguy.github.io:main`.

The Dockerfile is two stages: `node:lts` installs and runs `npm run build`, then `nginx:alpine`
receives `dist/` plus `nginx/nginx.conf`.

**The container listens on 8080, not 80.** `nginx/nginx.conf` has `listen 8080` and the
Dockerfile declares `EXPOSE 8080`, so:

```bash
docker run -d -p 8000:8080 ghcr.io/willtheorangeguy/willtheorangeguy.github.io:main
```

The `-p 8000:80` that appeared in the README and older docs maps to a port nothing listens on,
and the container looks broken. Recorded in
[`internal/known-issues.md`](./internal/known-issues.md).

## Other scheduled workflows

| Workflow | Trigger | Purpose |
|---|---|---|
| `docs.yml` | push to `main` | Build and deploy the site and documentation to Pages |
| `docker-image.yml` | push to `main` | Build and publish the container |
| `update-google-maps-stats.yml` | daily, plus manual | Refresh contribution stats and commit them |
| `codeql.yml` | push, PR, schedule | Security analysis |
| `gitleaks.yml` | push, PR | Secret scanning |
| `diagram.yml` | scheduled | Regenerates `diagram.svg`, the codebase visualisation |

The Google Maps workflow commits back to the repository and then triggers a rebuild, so the
site's stats stay current without a manual step. [Google Maps
automation](./google-maps-automation.md) covers its fallbacks.

## Rolling back

Pages deploys the artifact from the latest `main`, so a rollback is a revert and a push. The
container is tagged `:main` only, with no version tags, so there is nothing older to pull —
rebuilding from an earlier commit is the only route.
