import type { MetadataRoute } from "next";
import { siteSettingsQuery } from "@/domain/settings/settings.query";
import { client } from "@/infra/sanity/clients/client";
import type { SiteSettings } from "@/types";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { query } = siteSettingsQuery;

  const [settings] = await client.fetch<SiteSettings[]>(query);

  if (!settings) {
    // Fallback robots
    return {
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: "https://example.com/sitemap.xml",
    };
  }

  const siteUrl = settings.siteUrl || "https://example.com";
  const sitemapUrl = `${siteUrl}/sitemap.xml`;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio/", "/admin/"],
      },
    ],
    sitemap: sitemapUrl,
  };
}
