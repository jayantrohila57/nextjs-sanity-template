import { UserIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Full Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL Path",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "firstName",
      type: "string",
      title: "First Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastName",
      type: "string",
      title: "Last Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      type: "email",
      title: "Email Address",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      title: "Role/Title",
      description: "e.g., Senior Developer, Content Writer, etc.",
    }),
    defineField({
      name: "bio",
      type: "text",
      title: "Short Bio",
      rows: 3,
      description: "Brief biography (used in author lists)",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "extendedBio",
      type: "array",
      title: "Extended Bio",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        }),
      ],
      description: "Full biography (used in author profile pages)",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Profile Picture",
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
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "GitHub", value: "github" },
                  { title: "Website", value: "website" },
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              type: "url",
              title: "URL",
              validation: (Rule) => Rule.required(),
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
      name: "expertise",
      type: "array",
      title: "Areas of Expertise",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "isActive",
      type: "boolean",
      title: "Active Author",
      initialValue: true,
      description: "Only active authors will be displayed on the site",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured Author",
      initialValue: false,
      description: "Highlight this author in featured sections",
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO Settings",
    }),
  ],
  preview: {
    select: {
      name: "name",
      role: "role",
      image: "image",
      isActive: "isActive",
      featured: "featured",
    },
    prepare({ name, role, image, isActive, featured }) {
      const status = isActive ? "✓" : "📝";
      const featuredBadge = featured ? "⭐" : "";
      return {
        title: name,
        subtitle: role
          ? `${role} ${status} ${featuredBadge}`
          : `${status} ${featuredBadge}`,
        media: image,
      };
    },
  },
});
