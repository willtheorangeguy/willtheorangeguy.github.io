# willtheorangeguy.github.io — Documentation

The source of my personal site at [williamvdg.me](https://williamvdg.me): an Astro static site
built on the AstroPaper theme, deployed to GitHub Pages and mirrored as a Docker image.

```text
docs/
├── README.md                    this index
├── quickstart.md                clone to a running dev server
├── installation.md              prerequisites, npm and pnpm, Docker
├── usage.md                     writing posts, drafts, and the short-link redirects
├── configuration.md             site metadata, socials, feature flags, timezone
├── architecture.md              Astro layout, React islands, OG images, search, theming
├── development.md               lint, format, Storybook, conventions, CI
├── deployment.md                Pages, the custom domain, the Docker image
├── google-maps-automation.md    the scheduled contribution-stats scraper
├── faq.md                       questions this setup raises
├── troubleshooting.md           concrete errors and their causes
├── roadmap.md                   gaps and deliberate non-goals
├── legal/
│   ├── privacy.md               privacy policy served by the site
│   └── terms.md                 terms and conditions served by the site
└── internal/
    └── known-issues.md          defects found while documenting (not fixed)
```

## Start here

- Running it locally — [Quickstart](./quickstart.md)
- Writing a post — [Usage](./usage.md)
- Changing the site's identity, socials, or feature flags — [Configuration](./configuration.md)
- Understanding the build — [Architecture](./architecture.md), then [Deployment](./deployment.md)

## Note on the Projects page

`src/pages/projects.astro` hardcodes image URLs pointing into other repositories'
`docs/images/` directories. Those directories are being removed across the account in favour of
a central `willtheorangeguy/.github/icons/`, so most of those images will 404 as that work
merges. This is recorded in [`internal/known-issues.md`](./internal/known-issues.md) with the
replacement URLs.
