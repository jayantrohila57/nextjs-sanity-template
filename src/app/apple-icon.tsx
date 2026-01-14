import { ImageResponse } from "next/og";
import { siteSettingsQuery } from "@/domain/settings/settings.query";
import { client } from "@/infra/sanity/clients/client";
import { urlFor } from "@/infra/sanity/utils/image";
import type { SiteSettings } from "@/types";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const { query } = siteSettingsQuery;

  const [settings] = await client.fetch<SiteSettings[]>(query);

  if (!settings) {
    // Fallback Apple icon
    return new ImageResponse(
      <div
        style={{
          background: "#ffffff",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 48,
          fontWeight: "bold",
          color: "#000",
        }}
      >
        S
      </div>,
      { ...size },
    );
  }

  const logoUrl = settings.logo
    ? urlFor(settings.logo)
        .width(180)
        .height(180)
        .fit("max")
        .auto("format")
        .url()
    : null;
  const siteName = settings.siteName || "Site";
  const firstLetter = siteName.slice(0, 1).toUpperCase();

  return new ImageResponse(
    <div
      style={{
        background: "#ffffff",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {logoUrl ? (
        // biome-ignore lint/performance/noImgElement: ImageResponse requires img elements
        <img
          src={logoUrl}
          width="160"
          height="160"
          alt={siteName}
          style={{
            objectFit: "contain",
          }}
        />
      ) : (
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "#000",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {firstLetter}
        </div>
      )}
    </div>,
    { ...size },
  );
}
