import { ArrowRightIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const redirectType = defineType({
  name: "redirect",
  title: "URL Redirect",
  type: "document",
  icon: ArrowRightIcon,
  fields: [
    defineField({
      name: "source",
      type: "string",
      title: "Source URL",
      description: "The URL path to redirect from (e.g., /old-page)",
      validation: (Rule) =>
        Rule.required().custom((value: string | undefined) => {
          if (!value) return true;
          if (!value.startsWith("/")) {
            return 'Source URL must start with "/"';
          }
          return true;
        }),
    }),
    defineField({
      name: "destination",
      type: "string",
      title: "Destination URL",
      description:
        "The URL path to redirect to (e.g., /new-page or https://example.com)",
      validation: (Rule) =>
        Rule.required().custom((value: string | undefined) => {
          if (!value) return true;
          if (!value.startsWith("/") && !value.startsWith("http")) {
            return 'Destination URL must start with "/" for internal paths or "http" for external URLs';
          }
          return true;
        }),
    }),
    defineField({
      name: "type",
      type: "string",
      title: "Redirect Type",
      options: {
        list: [
          { title: "301 - Permanent", value: "301" },
          { title: "302 - Temporary", value: "302" },
          { title: "307 - Temporary (Method Preserved)", value: "307" },
          { title: "308 - Permanent (Method Preserved)", value: "308" },
        ],
      },
      initialValue: "301",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isActive",
      type: "boolean",
      title: "Active",
      initialValue: true,
      description: "Only active redirects will be processed",
    }),
    defineField({
      name: "priority",
      type: "number",
      title: "Priority",
      description:
        "Higher numbers take precedence (useful for conflicting redirects)",
      initialValue: 0,
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      rows: 2,
      description: "Optional notes about why this redirect exists",
    }),
    defineField({
      name: "expiryDate",
      type: "date",
      title: "Expiry Date",
      description:
        "Optional date when this redirect should be automatically disabled",
    }),
    defineField({
      name: "redirectCount",
      type: "number",
      title: "Redirect Count",
      description: "Number of times this redirect has been used",
      readOnly: true,
      initialValue: 0,
    }),
    defineField({
      name: "lastUsed",
      type: "datetime",
      title: "Last Used",
      description: "When this redirect was last accessed",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      source: "source",
      destination: "destination",
      type: "type",
      isActive: "isActive",
      priority: "priority",
    },
    prepare({ source, destination, type, isActive, priority }) {
      const status = isActive ? "✓" : "📝";
      const priorityBadge = priority > 0 ? `🔢${priority}` : "";
      const isExternal = destination.startsWith("http") ? "🌐" : "📄";

      return {
        title: source,
        subtitle: `${destination} ${isExternal} • ${type} ${status} ${priorityBadge}`,
      };
    },
  },
});
