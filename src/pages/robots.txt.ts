import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURLs: URL[]) => `
User-agent: *
Allow: /

${sitemapURLs.map(url => `Sitemap: ${url.href}`).join("\n")}
`;

/**
 * Only the index is declared. The Quartz garden's own sitemap at
 * /notes/sitemap.xml is reachable through it -- the `sitemapPostProcess`
 * integration in astro.config.ts appends it as a child -- so naming it a second
 * time here bought nothing and meant the path lived in two constants that could
 * drift apart.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemapURLs = [new URL("sitemap-index.xml", site)];
  return new Response(getRobotsTxt(sitemapURLs));
};
