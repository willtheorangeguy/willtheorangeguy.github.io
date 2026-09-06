import type { APIRoute } from "astro";

/**
 * The Quartz digital garden at /notes/ is a separate build that ships its own
 * sitemap. Astro's sitemap integration never sees those routes, so the file has
 * to be declared here or the ~900 URLs under /notes/ stay undiscoverable.
 */
const NOTES_SITEMAP_PATH = "notes/sitemap.xml";

const getRobotsTxt = (sitemapURLs: URL[]) => `
User-agent: *
Allow: /

${sitemapURLs.map(url => `Sitemap: ${url.href}`).join("\n")}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURLs = [
    new URL("sitemap-index.xml", site),
    new URL(NOTES_SITEMAP_PATH, site),
  ];
  return new Response(getRobotsTxt(sitemapURLs));
};
