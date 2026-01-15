import type { Metadata } from "next";
import { siteSettingsQuery } from "@/domain/settings/settings.query";
import { client } from "@/infra/sanity/clients/client";
import DraftModeProvider from "@/infra/sanity/components/draft-mode-provider";
import { urlFor } from "@/infra/sanity/utils/image";
import { font, fontMono } from "@/lib/font";
import type { SiteSettings } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const defaultSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const { query } = siteSettingsQuery;
  const [settings] = await client.fetch<SiteSettings[]>(query);

  if (!settings) {
    return {
      metadataBase: new URL(String(defaultSiteUrl)),
      title: "Next Sanity CMS Template",
      description: "CMS-driven websites powered by Next.js and Sanity",
    };
  }

  const seo = settings?.defaultSEO;
  const siteUrl = settings?.siteUrl || defaultSiteUrl;
  const title = seo?.title || settings?.siteName;
  const description = seo?.description || settings?.siteDescription;
  const ogImage = seo?.image;
  const ogImageUrl = ogImage
    ? urlFor(ogImage).width(1200).height(630).url()
    : null;

  return {
    metadataBase: new URL(String(siteUrl)),
    title: {
      default: String(title),
      template: `%s | ${settings?.siteName}`,
    },
    description,
    alternates: {
      canonical: seo?.canonicalUrl || siteUrl,
    },
    robots: {
      index: seo?.noIndex === false,
      follow: seo?.noFollow === false,
    },
    openGraph: {
      type: (seo?.openGraph?.type as "website" | "article") || "website",
      locale: seo?.openGraph?.locale || "en_US",
      siteName: seo?.openGraph?.siteName || settings.siteName,
      title,
      description,
      url: siteUrl,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: String(title),
            },
          ]
        : [],
    },
    twitter: {
      card: seo?.twitter?.card || "summary_large_image",
      site: seo?.twitter?.site,
      creator: seo?.twitter?.creator,
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const { query } = siteSettingsQuery;
  const [settings] = await client.fetch<SiteSettings[]>(query);

  // Generate JSON-LD structured data
  const jsonLd = settings
    ? {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: settings.siteName,
        description: settings.siteDescription,
        url: settings.siteUrl || defaultSiteUrl,
        logo: settings.logo ? urlFor(settings.logo).url() : undefined,
        ...(settings.contactInfo && {
          contactPoint: {
            "@type": "ContactPoint",
            email: settings.contactInfo.email,
            telephone: settings.contactInfo.phone,
            address: settings.contactInfo.address,
          },
        }),
        ...(() => {
          if (!settings.defaultSEO?.structuredData) return {};
          const result = {};
          for (const item of settings.defaultSEO.structuredData) {
            try {
              const parsedData = JSON.parse(String(item?.data));
              Object.assign(result, parsedData);
            } catch {
              // Skip invalid JSON
            }
          }
          return result;
        })(),
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Next Sanity CMS Template",
        description: "CMS-driven websites powered by Next.js and Sanity",
        url: defaultSiteUrl,
      };

  return (
    <html lang="en">
      <body className={`${font.variable} ${fontMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data, content is safely escaped
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <DraftModeProvider />
      </body>
    </html>
  );
}
