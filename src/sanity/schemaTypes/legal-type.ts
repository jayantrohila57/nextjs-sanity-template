import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const legalType = defineType({
  name: "legal",
  title: "Legal Page",
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
      name: "legalType",
      type: "string",
      title: "Legal Document Type",
      options: {
        list: [
          { title: "Privacy Policy", value: "privacy-policy" },
          { title: "Terms of Service", value: "terms-of-service" },
          { title: "Cookie Policy", value: "cookie-policy" },
          { title: "Disclaimer", value: "disclaimer" },
          { title: "GDPR Compliance", value: "gdpr-compliance" },
          { title: "Refund Policy", value: "refund-policy" },
          { title: "Shipping Policy", value: "shipping-policy" },
          { title: "Custom Legal Page", value: "custom" },
        ],
      },
      initialValue: "custom",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      title: "Summary",
      rows: 3,
      description: "Brief summary of the legal document",
    }),
    defineField({
      name: "effectiveDate",
      type: "date",
      title: "Effective Date",
      description: "When this legal document becomes effective",
      initialValue: () => new Date().toISOString().split("T")[0],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastUpdated",
      type: "date",
      title: "Last Updated",
      description: "When this legal document was last updated",
      initialValue: () => new Date().toISOString().split("T")[0],
    }),
    defineField({
      name: "jurisdiction",
      type: "string",
      title: "Jurisdiction",
      description: "Governing law jurisdiction (e.g., California, USA)",
    }),
    defineField({
      name: "content",
      type: "array",
      title: "Legal Content",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 1", value: "h1" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
          ],
          lists: [
            { title: "Numbered", value: "number" },
            { title: "Bulleted", value: "bullet" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sections",
      type: "array",
      title: "Document Sections",
      description: "Optional structured sections for better organization",
      of: [
        {
          type: "object",
          name: "section",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Section Title",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "content",
              type: "array",
              title: "Section Content",
              of: [{ type: "block" }],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
            },
            prepare({ title }) {
              return {
                title,
                subtitle: "Legal section",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO Settings",
    }),
    defineField({
      name: "isActive",
      type: "boolean",
      title: "Active",
      initialValue: true,
      description: "Only active legal pages will be accessible",
    }),
  ],
  preview: {
    select: {
      title: "title",
      legalType: "legalType",
      effectiveDate: "effectiveDate",
      isActive: "isActive",
    },
    prepare({ title, legalType, effectiveDate, isActive }) {
      const status = isActive ? "✓" : "📝";
      const typeLabel = legalType
        .split("-")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return {
        title,
        subtitle: `${typeLabel} • Effective: ${effectiveDate} ${status}`,
      };
    },
  },
});
