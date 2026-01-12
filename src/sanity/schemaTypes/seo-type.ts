import { SearchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO Settings",
  type: "object",
  icon: SearchIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "SEO Title",
      description: "Override the default page title for search engines",
      validation: (Rule) =>
        Rule.max(60).warning(
          "SEO titles should be under 60 characters for optimal display in search results",
        ),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Meta Description",
      rows: 3,
      description: "Brief description for search engine results",
      validation: (Rule) =>
        Rule.max(160).warning(
          "Meta descriptions should be under 160 characters for optimal display in search results",
        ),
    }),
    defineField({
      name: "keywords",
      type: "array",
      title: "Meta Keywords",
      description:
        "Legacy meta keywords (optional, mostly ignored by modern search engines)",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Open Graph Image",
      description: "Image for social media sharing (recommended: 1200x630px)",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "noIndex",
      type: "boolean",
      title: "No Index",
      description: "Tell search engines not to index this page",
      initialValue: false,
    }),
    defineField({
      name: "noFollow",
      type: "boolean",
      title: "No Follow",
      description: "Tell search engines not to follow links on this page",
      initialValue: false,
    }),
    defineField({
      name: "canonicalUrl",
      type: "url",
      title: "Canonical URL",
      description:
        "Specify the canonical URL to prevent duplicate content issues",
    }),
    defineField({
      name: "structuredData",
      type: "array",
      title: "Structured Data (JSON-LD)",
      description: "Add structured data for rich snippets",
      of: [
        {
          type: "object",
          name: "structuredDataItem",
          fields: [
            defineField({
              name: "type",
              type: "string",
              title: "Schema Type",
              options: {
                list: [
                  { title: "Article", value: "Article" },
                  { title: "BlogPosting", value: "BlogPosting" },
                  { title: "NewsArticle", value: "NewsArticle" },
                  { title: "Organization", value: "Organization" },
                  { title: "Person", value: "Person" },
                  { title: "Product", value: "Product" },
                  { title: "Recipe", value: "Recipe" },
                  { title: "Review", value: "Review" },
                  { title: "Event", value: "Event" },
                  { title: "FAQ", value: "FAQ" },
                  { title: "HowTo", value: "HowTo" },
                  { title: "LocalBusiness", value: "LocalBusiness" },
                  { title: "WebPage", value: "WebPage" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "data",
              type: "text",
              title: "JSON-LD Data",
              description: "Valid JSON-LD structured data",
              rows: 8,
              validation: (Rule) =>
                Rule.custom((value: string | undefined) => {
                  if (!value) return true;
                  try {
                    JSON.parse(value);
                    return true;
                  } catch {
                    return "Invalid JSON format";
                  }
                }),
            }),
          ],
          preview: {
            select: {
              type: "type",
            },
            prepare({ type }) {
              return {
                title: type,
                subtitle: "Structured data",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "openGraph",
      type: "object",
      title: "Open Graph Settings",
      fields: [
        defineField({
          name: "type",
          type: "string",
          title: "OG Type",
          initialValue: "website",
          description: "Open Graph object type",
        }),
        defineField({
          name: "locale",
          type: "string",
          title: "OG Locale",
          initialValue: "en_US",
          description: "Open Graph locale (e.g., en_US, fr_FR)",
        }),
        defineField({
          name: "siteName",
          type: "string",
          title: "OG Site Name",
          description: "Site name for Open Graph",
        }),
      ],
    }),
    defineField({
      name: "twitter",
      type: "object",
      title: " Twitter Card Settings",
      fields: [
        defineField({
          name: "card",
          type: "string",
          title: "Twitter Card Type",
          options: {
            list: [
              { title: "Summary", value: "summary" },
              {
                title: "Summary with Large Image",
                value: "summary_large_image",
              },
              { title: "App", value: "app" },
              { title: "Player", value: "player" },
            ],
          },
          initialValue: "summary_large_image",
        }),
        defineField({
          name: "site",
          type: "string",
          title: "Twitter Site",
          description: "Twitter site handle (@username)",
        }),
        defineField({
          name: "creator",
          type: "string",
          title: "Twitter Creator",
          description: "Content creator's Twitter handle (@username)",
        }),
      ],
    }),
  ],
});
