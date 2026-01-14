import type { SchemaTypeDefinition } from "sanity";

import { authorType } from "../../domain/blog/author-type";
import { categoryType } from "../../domain/blog/category-type";
import { postType } from "../../domain/blog/post-type";
import { blockContentType } from "../../domain/common/block-content-type";
import { redirectType } from "../../domain/common/redirect-type";
import { legalType } from "../../domain/legal/legal-type";
import { navigationType } from "../../domain/navigation/navigation-type";
import { seoType } from "../../domain/seo/seo-type";
import { pageType } from "../../domain/site/page-type";
import { siteSettingsType } from "../../domain/site/site-settings-type";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    seoType,
    siteSettingsType,
    navigationType,
    blockContentType,
    categoryType,
    postType,
    authorType,
    pageType,
    legalType,
    redirectType,
  ],
};
