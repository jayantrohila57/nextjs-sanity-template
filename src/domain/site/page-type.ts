import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Page Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL Path",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageType",
      type: "string",
      title: "Page Type",
      options: {
        list: [
          { title: "Standard Page", value: "standard" },
          { title: "Homepage", value: "homepage" },
          { title: "Contact Page", value: "contact" },
          { title: "About Page", value: "about" },
          { title: "Services Page", value: "services" },
          { title: "Custom Page", value: "custom" },
        ],
      },
      initialValue: "standard",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      title: "Excerpt",
      rows: 3,
      description: "Brief description of the page content",
    }),
    defineField({
      name: "featuredImage",
      type: "image",
      title: "Featured Image",
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
        defineField({
          name: "caption",
          type: "string",
          title: "Caption",
        }),
      ],
    }),
    defineField({
      name: "body",
      type: "blockContent",
      title: "Page Content",
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO Settings",
    }),
    defineField({
      name: "template",
      type: "string",
      title: "Template",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Full Width", value: "full-width" },
          { title: "Sidebar", value: "sidebar" },
          { title: "Landing Page", value: "landing" },
        ],
      },
      initialValue: "default",
    }),
    defineField({
      name: "showInNavigation",
      type: "boolean",
      title: "Show in Navigation",
      initialValue: true,
    }),
    defineField({
      name: "navigationTitle",
      type: "string",
      title: "Navigation Title",
      description: "Override the title used in navigation menus",
    }),
    defineField({
      name: "isPublished",
      type: "boolean",
      title: "Published",
      initialValue: true,
    }),
    defineField({
      name: "publishDate",
      type: "datetime",
      title: "Publish Date",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "lastModified",
      type: "datetime",
      title: "Last Modified",
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      pageType: "pageType",
      isPublished: "isPublished",
      featuredImage: "featuredImage",
    },
    prepare({ title, slug, pageType, isPublished, featuredImage }) {
      return {
        title,
        subtitle: `${pageType.charAt(0).toUpperCase() + pageType.slice(1)} • /${
          slug?.current || "no-slug"
        } ${isPublished ? "✓" : "📝"}`,
        media: featuredImage,
      };
    },
  },
});
