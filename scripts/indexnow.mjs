/**
 * Pushes the site's URLs to IndexNow (Bing, Yandex, Naver, Seznam) after a
 * deploy, so those engines learn about new and updated posts instead of waiting
 * to crawl.
 *
 * Google does not participate in IndexNow and ignores this entirely.
 *
 * Scope: the main Astro sitemap only. The Quartz garden at /notes/ builds
 * elsewhere and ships its own sitemap, so its URLs are not ours to submit here.
 *
 * On submitting everything rather than only what changed: IndexNow asks callers
 * to send changed URLs. Working out "changed" reliably would mean diffing
 * against the previously deployed sitemap, and at 33 URLs the bookkeeping costs
 * more than it saves -- one small batch per push sits far inside the 10,000-URL
 * limit. Revisit if this sitemap ever grows into the thousands.
 */

import { readdir } from "node:fs/promises";

const ENDPOINT = "https://api.indexnow.org/indexnow";
const KEY_DIR = "public";

/**
 * The key is the name of the file that proves ownership of the host, so the
 * filename is the single source of truth -- hardcoding it here as well would
 * let the two drift, and a literal high-entropy string in source also trips
 * secret scanners. It is not a credential: IndexNow requires it to be served
 * publicly at https://<host>/<key>.txt, and it only authorises submitting URLs
 * that are already on that host.
 */
async function readKey() {
  const names = await readdir(KEY_DIR);
  const keyFiles = names.filter(name => /^[0-9a-f]{8,128}\.txt$/i.test(name));

  if (keyFiles.length !== 1) {
    throw new Error(
      `Expected exactly one IndexNow key file in ${KEY_DIR}/, found ${keyFiles.length}.`
    );
  }

  return keyFiles[0].replace(/\.txt$/i, "");
}

// Read from the deployed sitemap rather than dist/, so this runs after the
// Pages deploy and never announces a URL that isn't serving yet.
const SITEMAP =
  process.env.SITEMAP_URL ?? "https://williamvdg.me/sitemap-0.xml";

async function main() {
  const key = await readKey();

  const sitemapResponse = await fetch(SITEMAP);

  if (!sitemapResponse.ok) {
    console.error(
      `Could not fetch ${SITEMAP}: ${sitemapResponse.status} ${sitemapResponse.statusText}`
    );
    process.exit(1);
  }

  const xml = await sitemapResponse.text();

  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match =>
    match[1].trim()
  );

  if (urls.length === 0) {
    console.error("No <loc> entries in the sitemap; nothing to submit.");
    process.exit(1);
  }

  const { host } = new URL(urls[0]);

  if (process.argv.includes("--dry-run")) {
    console.log(
      `IndexNow (dry run): would submit ${urls.length} URLs for ${host}:`
    );
    urls.forEach(url => console.log(`  ${url}`));
    return;
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `https://${host}/${key}.txt`,
      urlList: urls,
    }),
  });

  // 200 accepted, 202 accepted but the key is still being verified. Anything
  // else is worth seeing in the log -- but a search engine refusing a ping is
  // not a reason to fail a deploy that already succeeded.
  if (response.ok) {
    console.log(`IndexNow: submitted ${urls.length} URLs for ${host}.`);
    return;
  }

  console.warn(
    `IndexNow: ${response.status} ${response.statusText} -- ${await response
      .text()
      .catch(() => "no response body")}`
  );
}

main().catch(error => {
  console.warn(`IndexNow: submission failed -- ${error.message}`);
});
