import { MenuIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const navigationType = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "mainMenu",
      type: "array",
      title: "Main Navigation",
      of: [
        {
          type: "object",
          name: "navItem",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Title",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "type",
              type: "string",
              title: "Link Type",
              options: {
                list: [
                  { title: "Internal Page", value: "internal" },
                  { title: "External URL", value: "external" },
                  { title: "Email", value: "email" },
                  { title: "Phone", value: "phone" },
                ],
              },
              initialValue: "internal",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "internalLink",
              type: "reference",
              title: "Page",
              to: [{ type: "page" }, { type: "post" }],
              hidden: ({ parent }) => parent?.type !== "internal",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as
                    | { type?: string }
                    | undefined;
                  if (parent?.type === "internal" && !value) {
                    return "Please select a page for internal links";
                  }
                  return true;
                }),
            }),
            defineField({
              name: "externalUrl",
              type: "url",
              title: "URL",
              hidden: ({ parent }) => parent?.type !== "external",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as
                    | { type?: string }
                    | undefined;
                  if (parent?.type === "external" && !value) {
                    return "Please provide a URL for external links";
                  }
                  if (parent?.type === "external" && value) {
                    // Basic URL validation
                    try {
                      new URL(value);
                    } catch {
                      return "Please provide a valid URL";
                    }
                  }
                  return true;
                }),
            }),
            defineField({
              name: "email",
              type: "email",
              title: "Email Address",
              hidden: ({ parent }) => parent?.type !== "email",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as
                    | { type?: string }
                    | undefined;
                  if (parent?.type === "email" && !value) {
                    return "Please provide an email address";
                  }
                  return true;
                }),
            }),
            defineField({
              name: "phone",
              type: "string",
              title: "Phone Number",
              hidden: ({ parent }) => parent?.type !== "phone",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as
                    | { type?: string }
                    | undefined;
                  if (parent?.type === "phone" && !value) {
                    return "Please provide a phone number";
                  }
                  return true;
                }),
            }),
            defineField({
              name: "openInNewTab",
              type: "boolean",
              title: "Open in new tab",
              initialValue: false,
              hidden: ({ parent }) =>
                parent?.type === "email" || parent?.type === "phone",
            }),
            defineField({
              name: "subItems",
              type: "array",
              title: "Sub-menu Items",
              of: [
                {
                  type: "object",
                  name: "subNavItem",
                  fields: [
                    defineField({
                      name: "title",
                      type: "string",
                      title: "Title",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "type",
                      type: "string",
                      title: "Link Type",
                      options: {
                        list: [
                          { title: "Internal Page", value: "internal" },
                          { title: "External URL", value: "external" },
                          { title: "Email", value: "email" },
                          { title: "Phone", value: "phone" },
                        ],
                      },
                      initialValue: "internal",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "internalLink",
                      type: "reference",
                      title: "Page",
                      to: [{ type: "page" }, { type: "post" }],
                      hidden: ({ parent }) => parent?.type !== "internal",
                      validation: (Rule) =>
                        Rule.custom((value, context) => {
                          const parent = context.parent as
                            | { type?: string }
                            | undefined;
                          if (parent?.type === "internal" && !value) {
                            return "Please select a page for internal links";
                          }
                          return true;
                        }),
                    }),
                    defineField({
                      name: "externalUrl",
                      type: "url",
                      title: "URL",
                      hidden: ({ parent }) => parent?.type !== "external",
                      validation: (Rule) =>
                        Rule.custom((value, context) => {
                          const parent = context.parent as
                            | { type?: string }
                            | undefined;
                          if (parent?.type === "external" && !value) {
                            return "Please provide a URL for external links";
                          }
                          return true;
                        }),
                    }),
                    defineField({
                      name: "email",
                      type: "email",
                      title: "Email Address",
                      hidden: ({ parent }) => parent?.type !== "email",
                      validation: (Rule) =>
                        Rule.custom((value, context) => {
                          const parent = context.parent as
                            | { type?: string }
                            | undefined;
                          if (parent?.type === "email" && !value) {
                            return "Please provide an email address";
                          }
                          return true;
                        }),
                    }),
                    defineField({
                      name: "phone",
                      type: "string",
                      title: "Phone Number",
                      hidden: ({ parent }) => parent?.type !== "phone",
                      validation: (Rule) =>
                        Rule.custom((value, context) => {
                          const parent = context.parent as
                            | { type?: string }
                            | undefined;
                          if (parent?.type === "phone" && !value) {
                            return "Please provide a phone number";
                          }
                          return true;
                        }),
                    }),
                    defineField({
                      name: "openInNewTab",
                      type: "boolean",
                      title: "Open in new tab",
                      initialValue: false,
                      hidden: ({ parent }) =>
                        parent?.type === "email" || parent?.type === "phone",
                    }),
                  ],
                  preview: {
                    select: {
                      title: "title",
                      type: "type",
                      internalLink: "internalLink.title",
                      externalUrl: "externalUrl",
                      email: "email",
                      phone: "phone",
                    },
                    prepare({
                      title,
                      type,
                      internalLink,
                      externalUrl,
                      email,
                      phone,
                    }) {
                      let subtitle = "";
                      switch (type) {
                        case "internal":
                          subtitle = internalLink || "No page selected";
                          break;
                        case "external":
                          subtitle = externalUrl || "No URL provided";
                          break;
                        case "email":
                          subtitle = email || "No email provided";
                          break;
                        case "phone":
                          subtitle = phone || "No phone provided";
                          break;
                      }
                      return {
                        title,
                        subtitle,
                      };
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              type: "type",
              internalLink: "internalLink.title",
              externalUrl: "externalUrl",
              email: "email",
              phone: "phone",
              hasSubItems: "subItems.0",
            },
            prepare({
              title,
              type,
              internalLink,
              externalUrl,
              email,
              phone,
              hasSubItems,
            }) {
              let subtitle = "";
              switch (type) {
                case "internal":
                  subtitle = internalLink || "No page selected";
                  break;
                case "external":
                  subtitle = externalUrl || "No URL provided";
                  break;
                case "email":
                  subtitle = email || "No email provided";
                  break;
                case "phone":
                  subtitle = phone || "No phone provided";
                  break;
              }
              return {
                title,
                subtitle: hasSubItems ? `${subtitle} (has submenu)` : subtitle,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "footerMenu",
      type: "array",
      title: "Footer Navigation",
      of: [
        {
          type: "object",
          name: "footerNavItem",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Title",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "type",
              type: "string",
              title: "Link Type",
              options: {
                list: [
                  { title: "Internal Page", value: "internal" },
                  { title: "External URL", value: "external" },
                  { title: "Email", value: "email" },
                  { title: "Phone", value: "phone" },
                ],
              },
              initialValue: "internal",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "internalLink",
              type: "reference",
              title: "Page",
              to: [{ type: "page" }, { type: "post" }],
              hidden: ({ parent }) => parent?.type !== "internal",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as
                    | { type?: string }
                    | undefined;
                  if (parent?.type === "internal" && !value) {
                    return "Please select a page for internal links";
                  }
                  return true;
                }),
            }),
            defineField({
              name: "externalUrl",
              type: "url",
              title: "URL",
              hidden: ({ parent }) => parent?.type !== "external",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as
                    | { type?: string }
                    | undefined;
                  if (parent?.type === "external" && !value) {
                    return "Please provide a URL for external links";
                  }
                  return true;
                }),
            }),
            defineField({
              name: "email",
              type: "email",
              title: "Email Address",
              hidden: ({ parent }) => parent?.type !== "email",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as
                    | { type?: string }
                    | undefined;
                  if (parent?.type === "email" && !value) {
                    return "Please provide an email address";
                  }
                  return true;
                }),
            }),
            defineField({
              name: "phone",
              type: "string",
              title: "Phone Number",
              hidden: ({ parent }) => parent?.type !== "phone",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as
                    | { type?: string }
                    | undefined;
                  if (parent?.type === "phone" && !value) {
                    return "Please provide a phone number";
                  }
                  return true;
                }),
            }),
            defineField({
              name: "openInNewTab",
              type: "boolean",
              title: "Open in new tab",
              initialValue: false,
              hidden: ({ parent }) =>
                parent?.type === "email" || parent?.type === "phone",
            }),
          ],
          preview: {
            select: {
              title: "title",
              type: "type",
              internalLink: "internalLink.title",
              externalUrl: "externalUrl",
              email: "email",
              phone: "phone",
            },
            prepare({ title, type, internalLink, externalUrl, email, phone }) {
              let subtitle = "";
              switch (type) {
                case "internal":
                  subtitle = internalLink || "No page selected";
                  break;
                case "external":
                  subtitle = externalUrl || "No URL provided";
                  break;
                case "email":
                  subtitle = email || "No email provided";
                  break;
                case "phone":
                  subtitle = phone || "No phone provided";
                  break;
              }
              return {
                title,
                subtitle,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Navigation",
        subtitle: "Site navigation menus",
      };
    },
  },
});
