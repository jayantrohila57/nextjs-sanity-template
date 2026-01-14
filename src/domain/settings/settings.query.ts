import { q } from "@/infra/sanity/clients/groqd-client";

export const siteSettingsQuery = q.star
  .filterByType("siteSettings")
  .slice(0, 1)
  .project((s) => ({
    _id: s.field("_id"),
    _type: s.field("_type"),
    siteName: s.field("siteName"),
    siteDescription: s.field("siteDescription"),
    siteUrl: s.field("siteUrl"),

    logo: s.field("logo").project((img) => ({
      _type: img.field("_type"),
      asset: img.field("asset"),
      hotspot: img.field("hotspot"),
      crop: img.field("crop"),
    })),

    favicon: s.field("favicon").project((img) => ({
      _type: img.field("_type"),
      asset: img.field("asset"),
      hotspot: img.field("hotspot"),
      crop: img.field("crop"),
    })),

    socialLinks: s.field("socialLinks[]").project((link) => ({
      _key: link.field("_key"),
      _type: link.field("_type"),
      platform: link.field("platform"),
      url: link.field("url"),
    })),

    contactInfo: s.field("contactInfo").project((c) => ({
      email: c.field("email"),
      phone: c.field("phone"),
      address: c.field("address"),
    })),

    defaultSEO: s.field("defaultSEO").project((seo) => ({
      title: seo.field("title"),
      description: seo.field("description"),
      canonicalUrl: seo.field("canonicalUrl"),
      noIndex: seo.field("noIndex"),
      noFollow: seo.field("noFollow"),

      image: seo.field("image").project((img) => ({
        _type: img.field("_type"),
        asset: img.field("asset"),
        hotspot: img.field("hotspot"),
        crop: img.field("crop"),
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

      structuredData: seo.field("structuredData[]"),
    })),
  }));
