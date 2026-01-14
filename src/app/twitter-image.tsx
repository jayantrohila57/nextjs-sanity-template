import { ImageResponse } from "next/og";
import { siteSettingsQuery } from "@/domain/settings/settings.query";
import { client } from "@/infra/sanity/clients/client";
import { urlFor } from "@/infra/sanity/utils/image";
import type { SiteSettings } from "@/types";

export const size = { width: 1200, height: 600 }; // Twitter's preferred ratio
export const contentType = "image/png";

export default async function TwitterImage() {
  const { query } = siteSettingsQuery;

  const [settings] = await client.fetch<SiteSettings[]>(query);

  if (!settings) {
    // Fallback Twitter image
    return new ImageResponse(
      <div
        style={{
          background: "linear-gradient(135deg, #1DA1F2 0%, #0d8bd9 100%)", // Twitter Blue gradient
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
        <h1 style={{ fontSize: 64, fontWeight: "bold", marginBottom: 20 }}>
          My Site
        </h1>
        <p style={{ fontSize: 32, opacity: 0.9 }}>
          Generated with Next.js and Sanity
        </p>
      </div>,
      { ...size },
    );
  }

  const siteName = settings.siteName || "My Site";
  const siteDescription =
    settings.siteDescription || "Generated with Next.js and Sanity";
  const _twitterCard =
    settings.defaultSEO?.twitter?.card || "summary_large_image";
  const ogImage = settings.defaultSEO?.image;
  const ogImageUrl = ogImage
    ? urlFor(ogImage).width(1200).height(600).fit("crop").auto("format").url()
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
          : "linear-gradient(135deg, #1DA1F2 0%, #0d8bd9 100%)", // Twitter Blue gradient
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
          height={600}
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
              width={120}
              height={120}
              alt={siteName}
              style={{
                marginBottom: 30,
                objectFit: "contain",
              }}
            />
          )}
          <h1
            style={{
              fontSize: 64,
              fontWeight: "bold",
              color: "white",
              marginBottom: 20,
              textAlign: "center",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {siteName}
          </h1>
          <p
            style={{
              fontSize: 32,
              color: "white",
              opacity: 0.9,
              textAlign: "center",
              maxWidth: 900,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {siteDescription}
          </p>
        </>
      )}
    </div>,
    { ...size },
  );
}
