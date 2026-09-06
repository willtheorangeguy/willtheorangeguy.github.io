import { SITE } from "@/config";
import { SOCIALS } from "@/constants";

/**
 * Builders for the JSON-LD block in `Layout.astro`.
 *
 * Every route used to emit `BlogPosting`, which meant a resume and a tag
 * listing both claimed to be blog articles. Each route now declares the type
 * that matches what a reader actually sees.
 */

export type Schema = Record<string, unknown>;

const CONTEXT = "https://schema.org";

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE.website).href;
}

/** `@id` of the single Person node the other schemas point back at. */
const PERSON_ID = absoluteUrl("#person");
const WEBSITE_ID = absoluteUrl("#website");

export function person(): Schema {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.author,
    url: SITE.profile,
    sameAs: SOCIALS.map(social => social.href),
  };
}

/** Reference to the Person node rather than a second copy of it. */
const authorRef = { "@id": PERSON_ID };

type PageInput = {
  title: string;
  description: string;
  url: string;
  image: string;
};

function base(type: string | string[], page: PageInput): Schema {
  return {
    "@context": CONTEXT,
    "@type": type,
    name: page.title,
    headline: page.title,
    description: page.description,
    url: page.url,
    image: page.image,
    inLanguage: SITE.lang || "en",
    isPartOf: { "@id": WEBSITE_ID },
    author: authorRef,
  };
}

/**
 * Homepage. The SearchAction advertises the Pagefind route, which really does
 * read its query from `?q=`.
 */
export function webSite(page: PageInput): Schema {
  return {
    "@context": CONTEXT,
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: SITE.title,
        alternateName: SITE.author,
        description: SITE.desc,
        url: absoluteUrl("/"),
        inLanguage: SITE.lang || "en",
        publisher: authorRef,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: absoluteUrl("/search?q={search_term_string}"),
          },
          "query-input": "required name=search_term_string",
        },
      },
      person(),
      {
        ...base("WebPage", page),
        primaryImageOfPage: page.image,
      },
    ],
  };
}

/** A page whose subject is the person themself, e.g. the resume. */
export function profilePage(page: PageInput): Schema {
  return {
    ...base("ProfilePage", page),
    mainEntity: person(),
  };
}

/** Listing routes: archives, tags, post pagination, projects, reviews. */
export function collectionPage(page: PageInput): Schema {
  return base("CollectionPage", page);
}

/** Anything that is a plain page and not an article. */
export function webPage(page: PageInput): Schema {
  return base("WebPage", page);
}

/** Scoped to real posts -- the only routes that carry a publication date. */
export function blogPosting(
  page: PageInput & { pubDatetime: Date; modDatetime?: Date | null }
): Schema {
  return {
    ...base("BlogPosting", page),
    datePublished: page.pubDatetime.toISOString(),
    ...(page.modDatetime && { dateModified: page.modDatetime.toISOString() }),
    mainEntityOfPage: { "@type": "WebPage", "@id": page.url },
  };
}
