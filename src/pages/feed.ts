import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import { getCollection } from "astro:content";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import { SITE } from "@/config";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";

const markdownProcessor = await createMarkdownProcessor({
  remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of Contents" }]],
  shikiConfig: {
    themes: { light: "min-light", dark: "night-owl" },
    wrap: true,
  },
});

const escapeXml = (value: string) =>
  value.replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const escapeCdata = (value: string) => value.replaceAll("]]>", "]]]]><![CDATA[>");

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);

  const entries = await Promise.all(
    sortedPosts.map(async ({ data, id, filePath, body }) => {
      const postPath = getPath(id, filePath);
      const postUrl = new URL(postPath, SITE.website).href;
      const content = await markdownProcessor.render(body ?? "");
      const publishedDate = new Date(data.pubDatetime).toISOString();
      const updatedDate = new Date(data.modDatetime ?? data.pubDatetime).toISOString();

      return `<entry>
  <id>${escapeXml(postUrl)}</id>
  <title>${escapeXml(data.title)}</title>
  <link href="${escapeXml(postUrl)}" />
  <published>${publishedDate}</published>
  <updated>${updatedDate}</updated>
  <summary>${escapeXml(data.description)}</summary>
  <author>
    <name>${escapeXml(data.author)}</name>
  </author>
  ${data.tags.map(tag => `<category term="${escapeXml(tag)}" />`).join("\n  ")}
  <content type="html"><![CDATA[${escapeCdata(content.code)}]]></content>
</entry>`;
    })
  );

  const latestPost = sortedPosts[0];
  const updatedDate = new Date(
    latestPost?.data.modDatetime ?? latestPost?.data.pubDatetime ?? Date.now()
  ).toISOString();
  const feedUrl = new URL("/feed", SITE.website).href;
  const siteUrl = new URL("/", SITE.website).href;

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${escapeXml(feedUrl)}</id>
  <title>${escapeXml(SITE.title)}</title>
  <updated>${updatedDate}</updated>
  <link rel="self" href="${escapeXml(feedUrl)}" />
  <link rel="alternate" href="${escapeXml(siteUrl)}" />
  <subtitle>${escapeXml(SITE.desc)}</subtitle>
  <author>
    <name>${escapeXml(SITE.author)}</name>
    <uri>${escapeXml(SITE.profile)}</uri>
  </author>
  ${entries.join("\n  ")}
</feed>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
