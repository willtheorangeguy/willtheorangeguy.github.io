import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import getSortedPosts from "@/utils/getSortedPosts";
import { getPath } from "@/utils/getPath";
import { SITE } from "@/config";

/**
 * https://llmstxt.org/ -- a plain-text map of the site for LLM crawlers and
 * agents that look for one.
 *
 * Worth being clear about what this does and doesn't buy: Google ignores it
 * entirely, and it is not a ranking or citation signal anywhere. It is cheap to
 * generate from the content collection and costs nothing to serve, which is the
 * whole argument for it.
 */
export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const sortedPosts = getSortedPosts(posts);

  const absolute = (path: string) => new URL(path, site).href;

  const postLines = sortedPosts.map(({ data, id, filePath }) => {
    const url = absolute(`${getPath(id, filePath)}/`);
    return `- [${data.title}](${url}): ${data.description}`;
  });

  const body = `# ${SITE.title}

> ${SITE.desc}

Personal site of ${SITE.author}: a blog, a portfolio of open source projects,
and a public reading/watching/playing log. Written and maintained by one person.

## Pages

- [Resume](${absolute("/resume/")}): background, experience and skills.
- [Projects](${absolute("/projects/")}): open source projects, CLI tools, scrapers, web apps and Docker images.
- [Uses](${absolute("/uses/")}): the hardware, software and tools used day to day.
- [Purpose](${absolute("/purpose/")}): why this site exists.
- [Labs](${absolute("/labs/")}): homelab stats, distributed computing and running experiments.
- [Bucket List](${absolute("/bucket-list/")}): countries visited and travel goals.
- [Reviews](${absolute("/reviews/")}): index of every rated book, film, series, game, app, podcast, hotel and place.
- [Archives](${absolute("/archives/")}): every post grouped by year and month.

## Posts

${postLines.join("\n")}

## Notes

- [Notes](${absolute("/notes/")}): a separately built Obsidian/Quartz digital garden of short review and reference notes. Most entries are brief by design.

## Feeds

- [RSS](${absolute("/rss.xml")})
- [Atom](${absolute("/feed")})
- [Sitemap index](${absolute("/sitemap-index.xml")})
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
