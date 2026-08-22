# Known Issues — willtheorangeguy.github.io

Concrete defects and gaps found while writing this repository's documentation in
August 2026. **Nothing here was changed** — each one needs a code, configuration, or
licensing decision rather than a documentation one.

Ordered by severity. See [`docs/roadmap.md`](../roadmap.md) for the narrative version,
which also covers deliberate non-goals.

**8 open:** 1 high, 3 medium, 4 low.

## 1. The Projects page points at other repositories' docs/images/, which the docs sweep is deleting

**Severity:** High
**Where:** `src/pages/projects.astro`

**What:** The page hardcodes 16 image URLs into other repositories under this account, all of the form `.../{Repo}/{branch}/docs/images/{file}`. The account-wide documentation standardisation moves images to `willtheorangeguy/.github/icons/{Repo}/` and deletes each repository's `docs/images/`. Checked each URL against both the current default branch and the pending `docs/content` branch:

    BROKEN NOW              PyWorkout            docs/images/logo.png
    BREAKS WHEN PR MERGES   Apache-File-Directory, Auto-Anouncements, Chrome-File-Directory,
                            Craft-Clash, incremental-clicker, Maximum-PC-Builds-Archive,
                            Nginx-File-Directory, ProgramVer, PyAvatar, PyTricks-Archive,
                            Running-Calculator, wikipicture-web
    ok                      LEGO-Block-Creator, Snoopy-Landing-Page, this repo

That is one image already 404ing and twelve more that will as the open pull requests merge. Every replacement file already exists under `.github/icons/` -- verified filename by filename.

**Why it matters:** This is the public portfolio page of a personal site, and it is about to lose three quarters of its images -- not gradually, but as a batch, the moment a set of documentation pull requests is merged. Nothing in either repository connects the two: the sweep deletes a directory, and a hardcoded URL in an unrelated project silently stops resolving. Nobody finds out until they look at the page.

It is also the clearest argument for the central icon directory existing at all. The URLs reach into other repositories' internal layout, so any reorganisation anywhere breaks this page, and there are three different URL spellings in the file -- `raw.githubusercontent.com/...`, `github.com/.../raw/...`, and `github.com/.../blob/...?raw=true` -- which suggests they were each added by hand at different times.

**Suggested fix:** Replace every one with `https://raw.githubusercontent.com/willtheorangeguy/.github/main/icons/{Repo}/{file}`. All the files are already there. Do this before merging the remaining sweep pull requests. Longer term, generating the Projects page from the GitHub API would remove the hand-maintained URL list entirely -- see `docs/roadmap.md`.

## 2. The documented docker run command maps a port nothing listens on

**Severity:** Medium
**Where:** `README.md` and `docs/USAGE.md` (both corrected in this pass); `nginx/nginx.conf`; `Dockerfile`

**What:** Both documents gave `docker run -d -p 8000:80 ghcr.io/willtheorangeguy/willtheorangeguy.github.io:main`. `nginx/nginx.conf` line 9 is `listen 8080`, and the Dockerfile declares `EXPOSE 8080`. Port 80 inside the container is closed, so the published mapping reaches nothing. The correct command is `-p 8000:8080`. The README additionally said 'navigate to localhost', which is port 80 on the host and wrong even for a correct mapping.

**Why it matters:** The container runs, reports healthy, and serves nothing -- the worst shape for a first-run failure, because every signal says the image is fine and the user has no reason to suspect the instruction. Someone trying the published image is most likely evaluating whether the project works at all, and this is what they see. The listen port was presumably changed to 8080 at some point to allow running as a non-root user, and the documentation was not updated with it.

**Suggested fix:** Corrected in this pass in the README and `docs/usage.md`, and `docs/deployment.md` now states the listen port explicitly. Adding a `HEALTHCHECK` to the Dockerfile against the real port would make the mismatch fail loudly rather than silently.

## 3. The README logo used a github.com/blob URL, which serves HTML

**Severity:** Medium
**Where:** `README.md` (corrected in this pass)

**What:** The logo was `https://github.com/willtheorangeguy/willtheorangeguy.github.io/blob/main/docs/images/logo.png`. A `/blob/` URL returns the GitHub file-viewer page, not the image bytes, so the `<img>` renders as a broken-image glyph. The screenshot below it used a relative path, `./docs/images/welcome.jpg`, which works on GitHub but not when the README is rendered anywhere else.

**Why it matters:** The logo is the first element of the README, so the repository's front page opened with a broken image. This is the same defect the central `.github/icons/` directory was created to eliminate -- it was found in twelve READMEs during the sweep -- and it had survived here, in the repository belonging to the person doing the sweep.

**Suggested fix:** Corrected in this pass: both images now use `https://raw.githubusercontent.com/willtheorangeguy/.github/main/icons/willtheorangeguy.github.io/{file}`, and `docs/images/` is removed since the files already exist centrally.

## 4. Two lockfiles are committed and only one governs CI

**Severity:** Medium
**Where:** `package-lock.json`, `pnpm-lock.yaml`, `.github/workflows/update-google-maps-stats.yml`

**What:** Both lockfiles are tracked. The Pages workflow installs with pnpm, so `pnpm-lock.yaml` decides what is actually built and deployed. `package.json` scripts, the `Dockerfile` (`RUN npm install`), and `CLAUDE.md` all use npm.

**Why it matters:** The two files can resolve the same ranges to different versions and nothing reports it. A developer working locally with npm can test against one dependency tree while Pages deploys another, which is the kind of difference that surfaces as a bug reproducible only in production. The Dockerfile compounds it by running `npm install` rather than a locked install, so the container image is built from a third resolution that matches neither lockfile.

**Suggested fix:** Pick one. Given CI already uses pnpm, deleting `package-lock.json` and switching the Dockerfile to `pnpm install --frozen-lockfile` is the smaller change. Whichever is chosen, the Dockerfile should do a locked install rather than `npm install`.

## 5. docs/google-maps-stats.md was a tracked empty file

**Severity:** Low
**Where:** `docs/google-maps-stats.md` (deleted in this pass)

**What:** Zero bytes, committed in `8af25c4` ('fix: fix Docker build step'), and never written to since. Nothing generates it: the stats workflow commits `src/utils/googleMapsCache.ts` and `src/data/google-maps-stats.json`, neither of which is this file. Nothing links to it.

**Why it matters:** An empty file next to `google-maps-automation.md` reads as documentation that failed to generate, so anyone auditing the docs folder has to open it to find out it is nothing. Its name also suggests it holds the stats, which invites someone to wire something up to it. Given it arrived in a commit about the Docker build, it was almost certainly created by accident.

**Suggested fix:** Deleted in this pass. If a rendered stats page is wanted, it belongs under `src/pages/` where it would be served, not under `docs/`.

## 6. CLAUDE.md describes a build pipeline and an Astro version that have both moved on

**Severity:** Low
**Where:** `CLAUDE.md`; `package.json`

**What:** `CLAUDE.md` gives the build as `fetch-maps-stats && astro check && astro build && pagefind --site dist && cp -r dist/pagefind public/`. The actual script inserts `npm run storybook:build` after `fetch-maps-stats`. It also calls the site 'Astro 6'; `package.json` pins `astro: ^7.1.4`.

**Why it matters:** `CLAUDE.md` is written to orient an agent that has not read the code, so a wrong build pipeline propagates into work rather than merely misinforming a reader -- an agent told the pipeline has five steps has no reason to preserve a sixth it does not know about, and dropping the Storybook step silently removes `/styleguide` from the deployed site. The version being a major release out has the same character: advice correct for Astro 6 is not necessarily correct for 7.

**Suggested fix:** Update both lines. Describing the pipeline as 'whatever `npm run build` runs -- do not decompose it' would be more durable than transcribing the steps, since the transcription is what went stale.

## 7. The privacy policy and terms linked their contact address without a scheme

**Severity:** Low
**Where:** `docs/legal/privacy.md` and `docs/legal/terms.md` (both corrected and renamed in this pass)

**What:** Both documents ended with 'By visiting this page on our website: [github.com/willtheorangeguy/willtheorangeguy.github.io](https://github.com/willtheorangeguy/willtheorangeguy.github.io).' The original target had no scheme, so Markdown treated it as a relative path and resolved it to `docs/legal/github.com/...`, which does not exist. Both files were also uppercase, `PRIVACY.md` and `TERMS.md`, against the lowercase convention this sweep applies.

**Why it matters:** It is the Contact Us section of a privacy policy -- the single link a reader follows to ask what data is held about them or to have it removed -- and it 404s. A legal document that cannot be acted on is worse than a short one, and this is the part regulators and readers both care about. The same schemeless form appears in the terms, so it was copied rather than mistyped once.

**Suggested fix:** Corrected in this pass: both links now carry `https://`, and the files are renamed to `privacy.md` and `terms.md` with the README updated. Worth grepping the other repositories for `](github.com/` -- a schemeless Markdown link looks right in source and fails only when rendered.

## 8. PLANNING.md is a three-line stub

**Severity:** Low
**Where:** `PLANNING.md`

**What:** A heading and one sentence pointing at the Issues page and at `.../projects?type=classic`. Classic Projects were retired by GitHub, so that link no longer reaches a working board. The identical file exists in `Snoopy-Landing-Page`.

**Why it matters:** A root-level file implies content and has none, and half of what it does contain is a dead link. Its practical effect is one more row in the repository listing that a reader opens once and learns nothing from. That the same stub appears in more than one repository suggests it was templated rather than written.

**Suggested fix:** Delete it, here and in `Snoopy-Landing-Page`. GitHub Issues already serves the purpose and is where the file points anyway.

---

## Also, across every repository

**`.bandit` is present on disk but untracked in git.** Verified in PyWorkout, treklogger,
skyscanner-cli, booking-cli, piggy, and aibot — the config file exists locally in each but
`git ls-files` does not know about it, so none of it reached GitHub.

The August 2026 security sweep therefore looks complete locally and landed nowhere. Worth
checking across all 44 repositories it covered.
