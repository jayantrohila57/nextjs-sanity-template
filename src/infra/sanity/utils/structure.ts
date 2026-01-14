import {
  ArrowRightLeft,
  Compass,
  FileText,
  Folder,
  Settings,
  Tags,
  Users,
} from "lucide-react";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Site Configuration
      S.listItem()
        .title("Site Configuration")
        .icon(Settings)
        .child(
          S.list()
            .title("Site Configuration")
            .items([
              S.listItem()
                .title("Site Settings")
                .icon(Settings)
                .child(
                  S.document()
                    .schemaType("siteSettings")
                    .title("Site Settings")
                    .id("siteSettings"),
                ),
              S.listItem()
                .title("Navigation")
                .icon(Compass)
                .child(
                  S.document()
                    .schemaType("navigation")
                    .title("Navigation")
                    .id("navigation"),
                ),
              S.documentTypeListItem("redirect")
                .title("URL Redirects")
                .icon(ArrowRightLeft),
            ]),
        ),

      S.divider(),

      // Content
      S.listItem()
        .title("Content")
        .icon(Folder)
        .child(
          S.list()
            .title("Content")
            .items([
              S.documentTypeListItem("page").title("Pages").icon(FileText),
              S.documentTypeListItem("post").title("Blog Posts").icon(FileText),
              S.documentTypeListItem("legal")
                .title("Legal Pages")
                .icon(FileText),
            ]),
        ),

      S.divider(),

      // Taxonomy
      S.listItem()
        .title("Taxonomy")
        .icon(Tags)
        .child(
          S.list()
            .title("Taxonomy")
            .items([
              S.documentTypeListItem("category").title("Categories").icon(Tags),
              S.documentTypeListItem("author").title("Authors").icon(Users),
            ]),
        ),

      S.divider(),

      // Other document types
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return (
          id &&
          ![
            "siteSettings",
            "navigation",
            "redirect",
            "page",
            "post",
            "legal",
            "category",
            "author",
          ].includes(id)
        );
      }),
    ]);
