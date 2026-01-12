import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Category Name",
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
      name: "description",
      type: "text",
      title: "Description",
      rows: 3,
      description: "Brief description of the category",
    }),
    defineField({
      name: "color",
      type: "string",
      title: "Color",
      description: "Hex color code for category branding (e.g., #FF0000)",
      validation: (Rule) =>
        Rule.regex(/^#[0-9A-F]{6}$/i, {
          name: "hexColor",
          invert: false,
        }).warning("Please provide a valid hex color code"),
    }),
    defineField({
      name: "icon",
      type: "string",
      title: "Icon",
      description: "Icon name or emoji for the category",
    }),
    defineField({
      name: "parentCategory",
      type: "reference",
      title: "Parent Category",
      to: [{ type: "category" }],
      description: "Create nested categories by selecting a parent",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured Category",
      initialValue: false,
      description: "Highlight this category in featured sections",
    }),
    defineField({
      name: "isActive",
      type: "boolean",
      title: "Active",
      initialValue: true,
      description: "Only active categories will be displayed",
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO Settings",
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      isActive: "isActive",
      featured: "featured",
    },
    prepare({ title, description, isActive, featured }) {
      const status = isActive ? "✓" : "📝";
      const featuredBadge = featured ? "⭐" : "";
      return {
        title,
        subtitle: description
          ? `${description} ${status} ${featuredBadge}`
          : `${status} ${featuredBadge}`,
      };
    },
  },
});
