# willtheorangeguy.github.io — Usage

## Writing a post

Create a Markdown file in `src/data/blog/`.

```markdown
---
title: A title
pubDatetime: 2026-08-19T10:00:00Z
description: One sentence, used for previews and the generated OG image.
tags:
  - astro
featured: false
draft: false
---

Body copy.
```

`title`, `pubDatetime`, and `description` are required. The rest are optional:

| Field | Effect |
|---|---|
| `modDatetime` | Shows an "updated" date |
| `tags` | Tag pages are generated from these |
| `featured` | Pins the post to the featured section |
| `draft` | Excluded from the build |
| `ogImage` | Overrides the generated social preview |
| `canonicalURL` | For posts published elsewhere first |
| `hideEditPost` | Hides the "Suggest Changes" link on that post |
| `timezone` | Overrides the site default for this post's dates |

The schema in `src/content.config.ts` is strict: an unrecognised frontmatter key fails the build
rather than being ignored. That is deliberate — a silently dropped `draft: true` would publish
something you meant to keep back.

Two ways to keep a post out of the build: `draft: true`, or a filename starting with `_`, which
the glob loader skips entirely.

Dates slightly in the future are still published, within the 15-minute
`scheduledPostMargin` in [Configuration](./configuration.md), so a post dated a few minutes ahead
does not vanish because of clock skew.

## Previewing

```bash
npm run dev       # http://localhost:4321
```

Search does not work in dev. It is powered by Pagefind, which indexes the built output, so
`/search` only works after a full `npm run build` followed by `npm run preview`.

## Short-link redirects

`public/r/` holds small redirect pages — `/r/gh`, `/r/yt`, `/r/git`, `/r/fs`, and a few numbered
ones — with an index at `/r/`. Add one with the helper script rather than by hand:

```powershell
.\add-redirect.ps1 -Slug gh -Description "GitHub Profile" -Destination "https://github.com/willtheorangeguy"
```

It creates the subfolder, writes the redirect page, and updates the index, which is three things
to forget if you do it manually.

## Running a built copy

```bash
npm run build
npm run preview
```

Or the published container:

```bash
docker run -d -p 8000:80 ghcr.io/willtheorangeguy/willtheorangeguy.github.io:main
```

Then `http://localhost:8000`. [Installation](./installation.md) covers both routes in full.
