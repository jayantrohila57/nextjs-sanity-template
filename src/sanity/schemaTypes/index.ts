import type { SchemaTypeDefinition } from "sanity";

import { authorType } from "./author-type";
import { blockContentType } from "./block-content-type";
import { categoryType } from "./category-type";
import { legalType } from "./legal-type";
import { navigationType } from "./navigation-type";
import { pageType } from "./page-type";
import { postType } from "./post-type";
import { redirectType } from "./redirect-type";
import { seoType } from "./seo-type";
import { siteSettingsType } from "./site-settings-type";

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
