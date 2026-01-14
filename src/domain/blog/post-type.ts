import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
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
      name: "excerpt",
      type: "text",
      title: "Excerpt",
      rows: 3,
      description: "Brief description of the post content",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "author",
      type: "reference",
      title: "Author",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      type: "array",
      title: "Categories",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
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
      name: "readingTime",
      type: "number",
      title: "Reading Time (minutes)",
      description: "Estimated reading time in minutes",
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(60),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published Date",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isPublished",
      type: "boolean",
      title: "Published",
      initialValue: false,
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured Post",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO Settings",
    }),
    defineField({
      name: "body",
      type: "blockContent",
      title: "Content",
      validation: (Rule) => Rule.required(),
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
      author: "author.name",
      featuredImage: "featuredImage",
      publishedAt: "publishedAt",
      isPublished: "isPublished",
      featured: "featured",
    },
    prepare({
      title,
      author,
      featuredImage,
      publishedAt,
      isPublished,
      featured,
    }) {
      const publishDate = new Date(publishedAt).toLocaleDateString();
      const status = isPublished ? "✓" : "📝";
      const featuredBadge = featured ? "⭐" : "";
      return {
        title,
        subtitle: `${author} • ${publishDate} ${status} ${featuredBadge}`,
        media: featuredImage,
      };
    },
  },
});
