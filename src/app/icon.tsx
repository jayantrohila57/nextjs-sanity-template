import { ImageResponse } from "next/og";
import { siteSettingsQuery } from "@/domain/settings/settings.query";
import { client } from "@/infra/sanity/clients/client";
import { urlFor } from "@/infra/sanity/utils/image";
import type { SiteSettings } from "@/types";

// Image metadata
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const { query } = siteSettingsQuery;

  const [settings] = await client.fetch<SiteSettings[]>(query);

  if (!settings) {
    // Fallback icon
    return new ImageResponse(
      <div
        style={{
          fontSize: 20,
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: "20%",
        }}
      >
        S
      </div>,
      { ...size },
    );
  }

  const faviconUrl = settings.favicon
    ? urlFor(settings.favicon)
        .width(32)
        .height(32)
        .fit("max")
        .auto("format")
        .url()
    : null;
  const logoUrl = settings.logo
    ? urlFor(settings.logo).width(32).height(32).fit("max").auto("format").url()
    : null;
  const siteName = settings.siteName || "Site";
  const firstLetter = siteName.slice(0, 1).toUpperCase();

  return new ImageResponse(
    <div
      style={{
        fontSize: 20,
        background: "black",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        borderRadius: "20%",
      }}
    >
      {faviconUrl || logoUrl ? (
        // biome-ignore lint/performance/noImgElement: ImageResponse requires img elements
        <img
          src={faviconUrl || logoUrl || ""}
          width="28"
          height="28"
          alt={siteName}
          style={{
            objectFit: "contain",
          }}
        />
      ) : (
        <span>{firstLetter}</span>
      )}
    </div>,
    { ...size },
  );
}
