# willtheorangeguy.github.io — Configuration

Four files decide almost everything. None of them needs environment variables — the site is
static and builds the same way everywhere.

## `src/config.ts` — site identity and behaviour

The single source of truth for site metadata.

| Key | Current | Effect |
|---|---|---|
| `website` | `https://williamvdg.me/` | Canonical URL. Feeds sitemap, RSS, and canonical tags. |
| `author`, `profile` | `willtheorangeguy` | Author name and profile link |
| `title`, `desc` | "To Be Continued" | Site title and description |
| `ogImage` | `hero.jpg` | Fallback social preview image |
| `lightAndDarkMode` | `true` | Whether the theme toggle appears |
| `postPerIndex` | `5` | Posts on the home page |
| `postPerPage` | `10` | Posts per page in listings |
| `scheduledPostMargin` | 15 minutes | Grace window for posts dated slightly in the future |
| `showArchives` | `true` | The archive page |
| `showBackButton` | `true` | Back button on post pages |
| `editPost` | enabled | The "Suggest Changes" link and the branch it edits |
| `dynamicOgImage` | `true` | Generate per-post OG images at build time |
| `lang` | `en` | `html lang` attribute |
| `timezone` | `America/Vancouver` | Default for post dates; a post may override it in frontmatter |

## `src/constants.ts` — links

`SOCIALS` is the icon row: GitHub, Instagram, LinkedIn, X, Mastodon, Bluesky, Stack Overflow,
YouTube, Steam, and email. Each entry is a name, an href, a link title for screen readers, and an
imported SVG. Adding one means adding the icon to `src/assets/icons/` and importing it here.

`SHARE_LINKS` is the per-post share row. `GISCUS` configures the comment system, which is backed
by GitHub Discussions on this repository — the ids there come from the Giscus setup page and are
public by design.

## `src/content.config.ts` — what a post may contain

A Zod schema for the `blog` collection. It defines every valid frontmatter field and rejects
anything else at build time, so a typo in a key fails the build rather than being silently
ignored. [Usage](./usage.md) lists the fields.

## `astro.config.ts` — the build

Integrations (sitemap, React), Shiki syntax-highlighting themes, and remark plugins. `site` is
read from `SITE.website` rather than duplicated.

## The custom domain

`CNAME` contains `williamvdg.me`. It is what makes GitHub Pages serve the site from that domain
rather than `willtheorangeguy.github.io`, and it must stay in the published output — see
[Deployment](./deployment.md).

## Google Maps stats

The one piece of data fetched from outside. It is cached into `src/data/google-maps-stats.json`
and `src/utils/googleMapsCache.ts`, refreshed on a schedule, and documented in
[Google Maps automation](./google-maps-automation.md).
