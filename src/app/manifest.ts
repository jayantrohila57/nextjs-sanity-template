import type { MetadataRoute } from "next";
import { siteSettingsQuery } from "@/domain/settings/settings.query";
import { client } from "@/infra/sanity/clients/client";
import { urlFor } from "@/infra/sanity/utils/image";
import type { SiteSettings } from "@/types";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { query } = siteSettingsQuery;

  const [settings] = await client.fetch<SiteSettings[]>(query);

  if (!settings) {
    // Fallback manifest
    return {
      name: "My Site",
      short_name: "Site",
      description: "Generated with Next.js and Sanity",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#000000",
      icons: [
        {
          src: "/icon.png",
          sizes: "any",
          type: "image/x-icon",
        },
      ],
    };
  }

  const siteName = settings.siteName || "My Site";
  const shortName =
    siteName
      .split(" ")
      .map((word: string) => word[0])
      .join("")
      .toUpperCase() || "Site";
  const description =
    settings.siteDescription || "Generated with Next.js and Sanity";
  const siteUrl = settings.siteUrl || "";
  const faviconUrl = settings.favicon
    ? urlFor(settings.favicon)
        .width(512)
        .height(512)
        .fit("max")
        .auto("format")
        .url()
    : null;
  const logoUrl = settings.logo
    ? urlFor(settings.logo)
        .width(512)
        .height(512)
        .fit("max")
        .auto("format")
        .url()
    : null;

  const icons: MetadataRoute.Manifest["icons"] = [];

  // Add favicon if available
  if (faviconUrl) {
    icons.push(
      {
        src: faviconUrl,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: faviconUrl,
        sizes: "512x512",
        type: "image/png",
      },
    );
  } else if (logoUrl) {
    // Fallback to logo if no favicon
    icons.push(
      {
        src: logoUrl,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: logoUrl,
        sizes: "512x512",
        type: "image/png",
      },
    );
  } else {
    // Default icon
    icons.push({
      src: "/icon.png",
      sizes: "any",
      type: "image/x-icon",
    });
  }

  return {
    name: siteName,
    short_name: shortName,
    description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons,
    ...(siteUrl && { scope: siteUrl }),
  };
}
