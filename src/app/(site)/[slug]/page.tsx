import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import { siteSettingsQuery } from "@/domain/settings/settings.query";
import { pageBySlugQuery } from "@/domain/site/page.query";
import { client } from "@/infra/sanity/clients/client";
import { draftClient } from "@/infra/sanity/clients/draft-client";
import { urlFor } from "@/infra/sanity/utils/image";
import type { Page, SiteSettings } from "@/types";

// Enable ISR to handle dynamic metadata while allowing static generation
export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const defaultSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Get site settings
  const { query: siteQuery } = siteSettingsQuery;
  let settings: SiteSettings | null = null;

  try {
    const [settingsData] = await client.fetch<SiteSettings[]>(siteQuery);
    settings = settingsData || null;
  } catch (error) {
    console.warn("Failed to fetch site settings:", error);
    settings = null;
  }

  // Get page data
  const { query: pageQuery } = pageBySlugQuery;

  const pageData = await client.fetch<Page>(pageQuery, { slug });

  if (!pageData) {
    return {
      metadataBase: new URL(defaultSiteUrl),
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }

  const siteUrl = settings?.siteUrl || defaultSiteUrl;
  const pageUrl = pageData.slug?.current
    ? `${siteUrl}/${pageData.slug.current === "/" ? "" : pageData.slug.current}`
    : siteUrl;

  const seo = pageData.seo;
  const title = seo?.title || pageData.title;
  const description =
    seo?.description || pageData.excerpt || settings?.siteDescription;
  const ogImage = seo?.image || pageData.featuredImage;
  const ogImageUrl = ogImage
    ? urlFor(ogImage).width(1200).height(630).url()
    : null;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: seo?.canonicalUrl || pageUrl,
    },
    robots: {
      index: seo?.noIndex !== true,
      follow: seo?.noFollow !== true,
    },
    openGraph: {
      type: (seo?.openGraph?.type as "website" | "article") || "website",
      locale: seo?.openGraph?.locale || "en_US",
      siteName: seo?.openGraph?.siteName || settings?.siteName,
      title,
      description,
      url: pageUrl,
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

export default async function SitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const { query: pageQuery } = pageBySlugQuery;

  const data = await draftClient.fetch(
    pageQuery,
    { slug },
    isEnabled
      ? {
          perspective: "drafts",
          useCdn: false,
          stega: true,
        }
      : undefined,
  );

  if (!data) {
    notFound();
  }

  // Check if page is published (unless in draft mode)
  if (!isEnabled && !data.isPublished) {
    notFound();
  }

  // Get site settings for JSON-LD
  const { query: siteQuery } = siteSettingsQuery;
  const [settings] = await client.fetch<SiteSettings[]>(siteQuery);
  const defaultSiteUrl =
    settings?.siteUrl ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  // Generate JSON-LD structured data for the page
  const pageUrl = data.slug?.current
    ? `${defaultSiteUrl}/${data.slug.current === "/" ? "" : data.slug.current}`
    : defaultSiteUrl;

  console.log("🔗 Structured data from SEO:", data.seo?.structuredData);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.title,
    description: data.excerpt || data.seo?.description,
    url: pageUrl,
    ...(data.featuredImage && {
      image: urlFor(data.featuredImage).url(),
    }),
    ...(data.publishDate && {
      datePublished: data.publishDate,
    }),
    ...(data.lastModified && {
      dateModified: data.lastModified,
    }),
    ...(data.seo?.structuredData &&
      (() => {
        const result: Record<string, unknown> = {};
        for (const item of data.seo.structuredData) {
          try {
            console.log(
              "📋 Processing structured data item:",
              item.type,
              item.data,
            );
            const parsedData = JSON.parse(item.data);
            console.log("✅ Parsed structured data:", parsedData);
            Object.assign(result, parsedData);
          } catch (error) {
            console.error(
              "❌ Failed to parse structured data:",
              error,
              item.data,
            );
            // Skip invalid JSON
          }
        }
        console.log("🎯 Final structured data result:", result);
        return result;
      })()),
  };

  console.log("🏗️ Final JSON-LD object:", JSON.stringify(jsonLd, null, 2));

  const featuredImageUrl = data.featuredImage
    ? urlFor(data.featuredImage).width(1200).height(630).url()
    : null;

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data, content is safely escaped
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* Featured Image */}
      {featuredImageUrl && (
        <div className="mb-8">
          <Image
            src={featuredImageUrl}
            alt={data.featuredImage?.alt || data.title || ""}
            width={1200}
            height={630}
            className="w-full h-auto rounded-lg"
            priority
          />
          {data.featuredImage?.caption && (
            <p className="text-sm text-gray-600 mt-2 italic">
              {data.featuredImage.caption}
            </p>
          )}
        </div>
      )}

      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
        {data.excerpt && (
          <p className="text-xl text-gray-600 leading-relaxed">
            {data.excerpt}
          </p>
        )}
      </header>

      {/* Page Content */}
      {data.body && data.body.length > 0 && (
        <div className="prose prose-lg max-w-none">
          {/* TODO: Replace with proper block content renderer */}
          <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded">
            {JSON.stringify(data.body, null, 2)}
          </pre>
        </div>
      )}

      {/* Page Metadata */}
      {(data.publishDate || data.lastModified) && (
        <footer className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-600">
          {data.publishDate && (
            <p>Published: {new Date(data.publishDate).toLocaleDateString()}</p>
          )}
          {data.lastModified && (
            <p>
              Last Modified: {new Date(data.lastModified).toLocaleDateString()}
            </p>
          )}
        </footer>
      )}
    </article>
  );
}
