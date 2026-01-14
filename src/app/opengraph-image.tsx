import { ImageResponse } from "next/og";
import { siteSettingsQuery } from "@/domain/settings/settings.query";
import { client } from "@/infra/sanity/clients/client";
import { urlFor } from "@/infra/sanity/utils/image";
import type { SiteSettings } from "@/types";

export default async function Image() {
  const { query } = siteSettingsQuery;

  const [settings] = await client.fetch<SiteSettings[]>(query);

  if (!settings) {
    // Fallback OG image
    return new ImageResponse(
      <div
        style={{
          fontSize: 64,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ fontSize: 80, fontWeight: "bold", marginBottom: 20 }}>
          My Site
        </div>
        <div style={{ fontSize: 32, opacity: 0.9 }}>
          Generated with Next.js and Sanity
        </div>
      </div>,
      { width: 1200, height: 630 },
    );
  }

  const siteName = settings.siteName || "My Site";
  const siteDescription =
    settings.siteDescription || "Generated with Next.js and Sanity";
  const ogImage = settings.defaultSEO?.image;
  const ogImageUrl = ogImage
    ? urlFor(ogImage).width(1200).height(630).fit("crop").auto("format").url()
    : null;
  const logoUrl = settings.logo
    ? urlFor(settings.logo)
        .width(200)
        .height(200)
        .fit("max")
        .auto("format")
        .url()
    : null;

  return new ImageResponse(
    <div
      style={{
        background: ogImageUrl
          ? "transparent"
          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {ogImageUrl ? (
        // biome-ignore lint/performance/noImgElement: ImageResponse requires img elements
        <img
          src={ogImageUrl}
          width={1200}
          height={630}
          alt={siteName}
          style={{
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      ) : (
        <>
          {logoUrl && (
            // biome-ignore lint/performance/noImgElement: ImageResponse requires img elements
            <img
              src={logoUrl}
              width={150}
              height={150}
              alt={siteName}
              style={{
                marginBottom: 30,
                objectFit: "contain",
              }}
            />
          )}
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "white",
              marginBottom: 20,
              textAlign: "center",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {siteName}
          </div>
          <div
            style={{
              fontSize: 36,
              color: "white",
              opacity: 0.9,
              textAlign: "center",
              maxWidth: 900,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {siteDescription}
          </div>
        </>
      )}
    </div>,
    { width: 1200, height: 630 },
  );
}
