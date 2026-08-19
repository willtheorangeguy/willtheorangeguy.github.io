# willtheorangeguy.github.io — Roadmap

Known gaps and direction. Actual defects are in
[`internal/known-issues.md`](./internal/known-issues.md).

## Where it is

A working personal site: blog with tags and archives, projects, labs, and uses pages, generated
OG images, client-side search, light and dark themes, a published style guide, short links, and a
scheduled stats scraper. Deployed to Pages on every push and mirrored as a container.

## Considered

**Moving the project images to the central icon directory.** The Projects page hardcodes URLs
into other repositories' `docs/images/` folders. That directory is being retired account-wide in
favour of `willtheorangeguy/.github/icons/`, so those images break as the work merges. The
replacements all exist already; this is a find-and-replace, and it is the most urgent item here.

**Generating the Projects page instead of hand-writing it.** Every entry is a hand-maintained
block with a hardcoded URL, which is why the images could drift out of date without anything
noticing. The GitHub API already knows the repository list, the descriptions, and the topics.

**One package manager.** Two committed lockfiles can disagree, and only pnpm's governs CI.

**Pinning the container base images.** `node:lts` and `nginx:alpine` both move.

**Versioned container tags.** Only `:main` is published, so there is nothing to roll back to.

**Tests.** `astro check` is the only automated gate and it checks types, not behaviour.
Playwright is already installed for the stats scraper, so a couple of smoke tests — the home page
renders, a post renders, `/search` finds something — would cost little.

**Retiring `PLANNING.md`.** Three lines pointing at GitHub Issues.

## Non-goals

**Becoming a theme.** [AstroPaper](https://github.com/satnaing/astro-paper) is the theme; this is
one person's site built on it. Generalising it would mean maintaining a product.

**A CMS or a server.** Posts are Markdown in the repository, and the deployed artefact is static
files. That is what makes it cheap to host, fast, and trivially archivable.

**More React.** Three interactive islands is the budget. The site is fast because almost nothing
hydrates.

**Self-hosted analytics or comments.** Simple Analytics and Giscus are deliberate: neither needs
a database, and both keep the deployment static.

## Contributing

It is a personal site, so feature suggestions are less useful than bug reports. See the org-wide
[Contributing Guide](https://github.com/willtheorangeguy/.github/blob/main/CONTRIBUTING.md).
