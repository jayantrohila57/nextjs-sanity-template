import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Site Configuration
      S.listItem()
        .title("Site Configuration")
        .icon(() => "⚙️")
        .child(
          S.list()
            .title("Site Configuration")
            .items([
              S.listItem()
                .title("Site Settings")
                .icon(() => "⚙️")
                .child(
                  S.document()
                    .schemaType("siteSettings")
                    .title("Site Settings")
                    .id("siteSettings"),
                ),
              S.listItem()
                .title("Navigation")
                .icon(() => "🧭")
                .child(
                  S.document()
                    .schemaType("navigation")
                    .title("Navigation")
                    .id("navigation"),
                ),
              S.documentTypeListItem("redirect").title("URL Redirects"),
            ]),
        ),

      S.divider(),

      // Content
      S.listItem()
        .title("Content")
        .icon(() => "📄")
        .child(
          S.list()
            .title("Content")
            .items([
              S.documentTypeListItem("page").title("Pages"),
              S.documentTypeListItem("post").title("Blog Posts"),
              S.documentTypeListItem("legal").title("Legal Pages"),
            ]),
        ),

      S.divider(),

      // Taxonomy
      S.listItem()
        .title("Taxonomy")
        .icon(() => "🏷️")
        .child(
          S.list()
            .title("Taxonomy")
            .items([
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("author").title("Authors"),
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
