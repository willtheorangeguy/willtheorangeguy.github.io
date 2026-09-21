# willtheorangeguy.github.io — FAQ

## What is this?

The source of my personal site — a blog and portfolio at
[williamvdg.me](https://williamvdg.me). It is a static Astro site on the AstroPaper theme,
deployed to GitHub Pages.

## Can I use it as a template?

The code is MIT-licensed, so yes, but it is my site rather than a theme: the content, the
socials, the projects list, and the Google Maps stats are all mine.
[AstroPaper](https://github.com/satnaing/astro-paper) is the thing to start from if you want
this shape of site.

## Why does search not work locally?

Search is Pagefind, which indexes the *built* output. `npm run dev` never produces that index.
Run `npm run build` then `npm run preview`.

## Why is the build so long?

It is six steps, not one: fetch Google Maps stats, build Storybook, type-check, build, index for
search, copy the index. Each contributes something visible to the deployed site.
[Development](./development.md) breaks it down.

## npm or pnpm?

CI uses pnpm; both work locally. Both lockfiles are committed, which is not ideal — pnpm's is the
one that decides what actually ships.

## Does the site track me?

The privacy policy at [`legal/privacy.md`](./legal/privacy.md) is authoritative. Simple Analytics
is credited in the README, and Giscus loads GitHub Discussions on post pages when comments are
shown.

## Why are there so few React components?

Three, and only because they need interactivity. Everything else is `.astro`, which ships no
JavaScript at all. Keeping that boundary is why the site is fast.

## Where do the Google Maps numbers come from?

A scheduled scrape of my Google Maps contributor profile, cached in the repository and refreshed
daily by a workflow. It falls back to the committed cache when the scrape fails, so the site
never shows an error in place of a number — see
[Google Maps automation](./google-maps-automation.md).

## What is `/r/`?

Short links: `/r/gh`, `/r/yt`, and so on, each a small redirect page under `public/r/`. Add one
with `add-redirect.ps1` rather than by hand, so the index stays in step.

## Why is the site at williamvdg.me and not willtheorangeguy.github.io?

The `CNAME` file. It has to stay in the published output, and `SITE.website` in `src/config.ts`
has to agree with it.

## The Docker container does not respond

Publish port 8080, not 80: `docker run -d -p 8000:8080 ...`. nginx inside the image listens on
8080. The older `-p 8000:80` instruction was wrong.

## Why do some project images not load?

They point into other repositories' `docs/images/` folders, which are being retired in favour of
a central icon directory. See [`internal/known-issues.md`](./internal/known-issues.md).

## Is there a test suite?

No. `astro check` type-checks during the build, and that is the only automated gate. Playwright
is present for the stats scraper, not for tests.

## What licence?

MIT for the code — [`LICENSE.md`](../LICENSE.md). The posts and images are mine. The theme is
AstroPaper, MIT, credited in the README.
