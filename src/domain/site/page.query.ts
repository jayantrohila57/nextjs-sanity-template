import { q } from "@/infra/sanity/clients/groqd-client";

export const pageBySlugQuery = q
  .parameters<{ slug: string }>()
  .star.filterByType("page")
  .filterRaw("slug.current == $slug")
  .order("publishDate asc", "_updatedAt desc")
  .slice(0)
  .project((p) => ({
    _id: p.field("_id"),
    _type: p.field("_type"),
    title: p.field("title"),
    slug: p.field("slug").project((slug) => ({
      _type: slug.field("current"),
      current: slug.field("current"),
      source: slug.field("current"),
    })),
    pageType: p.field("pageType"),
    excerpt: p.field("excerpt"),
    template: p.field("template"),
    isPublished: p.field("isPublished"),
    publishDate: p.field("publishDate"),
    lastModified: p.field("lastModified"),
    showInNavigation: p.field("showInNavigation"),
    navigationTitle: p.field("navigationTitle"),

    featuredImage: p.field("featuredImage").project((img) => ({
      _type: img.field("_type"),
      asset: img.field("asset"),
      hotspot: img.field("hotspot"),
      crop: img.field("crop"),
      alt: img.field("alt"),
      caption: img.field("caption"),
    })),

    body: p.field("body[]"),

    seo: p.field("seo").project((seo) => ({
      title: seo.field("title"),
      description: seo.field("description"),
      keywords: seo.field("keywords[]"),
      noIndex: seo.field("noIndex"),
      noFollow: seo.field("noFollow"),
      canonicalUrl: seo.field("canonicalUrl"),
      structuredData: seo.field("structuredData[]"),

      image: seo.field("image").project((img) => ({
        _type: img.field("_type"),
        asset: img.field("asset"),
        hotspot: img.field("hotspot"),
        crop: img.field("crop"),
        alt: img.field("alt"),
      })),

      openGraph: seo.field("openGraph").project((og) => ({
        type: og.field("type"),
        locale: og.field("locale"),
        siteName: og.field("siteName"),
      })),

      twitter: seo.field("twitter").project((tw) => ({
        card: tw.field("card"),
        site: tw.field("site"),
        creator: tw.field("creator"),
      })),
    })),
  }));
