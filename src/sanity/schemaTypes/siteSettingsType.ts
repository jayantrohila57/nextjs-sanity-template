import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "siteName",
      type: "string",
      title: "Site Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteDescription",
      type: "text",
      title: "Site Description",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteUrl",
      type: "url",
      title: "Site URL",
      description: "Base URL of the site (e.g., https://example.com)",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Site Logo",
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
      name: "favicon",
      type: "image",
      title: "Favicon",
      description: "Square image for favicon (recommended: 32x32px)",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "defaultSEO",
      type: "seo",
      title: "Default SEO Settings",
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      title: "Social Links",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              type: "string",
              title: "Platform",
              options: {
                list: [
                  { title: "Twitter", value: "twitter" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "GitHub", value: "github" },
                  { title: "YouTube", value: "youtube" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              type: "url",
              title: "URL",
              validation: (Rule) =>
                Rule.required()?.uri({ scheme: ["http", "https"] }),
            }),
          ],
          preview: {
            select: {
              platform: "platform",
              url: "url",
            },
            prepare({ platform, url }) {
              return {
                title: platform.charAt(0).toUpperCase() + platform.slice(1),
                subtitle: url,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "contactInfo",
      type: "object",
      title: "Contact Information",
      fields: [
        defineField({
          name: "email",
          type: "email",
          title: "Email Address",
        }),
        defineField({
          name: "phone",
          type: "string",
          title: "Phone Number",
        }),
        defineField({
          name: "address",
          type: "text",
          title: "Address",
          rows: 3,
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
        subtitle: "Global site configuration",
      };
    },
  },
});
