import type { MetadataRoute } from "next";
import { siteSettingsQuery } from "@/domain/settings/settings.query";
import { client } from "@/infra/sanity/clients/client";
import { q } from "@/infra/sanity/clients/groqd-client";
import type { SiteSettings } from "@/types";

const allPagesQuery = q.star
  .filterByType("page")
  .filterRaw("isPublished == true && defined(slug.current)")
  .project((p) => ({
    _id: p.field("_id"),
    slug: p.field("slug.current"),
    pageType: p.field("pageType"),
    lastModified: p.field("lastModified"),
    publishDate: p.field("publishDate"),
    seo: p.field("seo").project((seo) => ({
      noIndex: seo.field("noIndex"),
    })),
  }));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { query: siteQuery } = siteSettingsQuery;

  const [settings] = await client.fetch<SiteSettings[]>(siteQuery);

  if (!settings) return [];

  const siteUrl = settings.siteUrl || "https://example.com";

  // Fetch all published pages
  const { query } = allPagesQuery;
  const pages =
    await client.fetch<
      Array<{
        _id: string;
        slug: string;
        pageType?: string;
        lastModified?: string;
        publishDate?: string;
        seo?: { noIndex?: boolean };
      }>
    >(query);

  const entries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  if (pages && Array.isArray(pages)) {
    const pageEntries = pages
      .map((page) => {
        // Skip pages with noIndex in SEO
        if (page.seo?.noIndex) return null;

        if (!page.slug) return null;

        const slug = page.slug === "/" ? "" : `/${page.slug}`;
        const lastModifiedDate = page.lastModified || page.publishDate;

        return {
          url: `${siteUrl}${slug}`,
          lastModified: lastModifiedDate
            ? new Date(lastModifiedDate)
            : new Date(),
          changeFrequency: getPageChangeFrequency(page.pageType || "standard"),
          priority: getPagePriority(page.pageType || "standard"),
        };
      })
      .filter(Boolean) as MetadataRoute.Sitemap;

    entries.push(...pageEntries);
  }

  return entries;
}

function getPageChangeFrequency(
  pageType: string,
): "daily" | "weekly" | "monthly" | "yearly" | "always" | "never" {
  switch (pageType) {
    case "homepage":
      return "daily";
    case "contact":
    case "about":
      return "monthly";
    case "services":
      return "weekly";
    default:
      return "monthly";
  }
}

function getPagePriority(pageType: string): number {
  switch (pageType) {
    case "homepage":
      return 1.0;
    case "about":
    case "services":
      return 0.8;
    case "contact":
      return 0.6;
    default:
      return 0.5;
  }
}
