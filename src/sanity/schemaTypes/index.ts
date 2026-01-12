import type { SchemaTypeDefinition } from "sanity";

import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { legalType } from "./legalType";
import { navigationType } from "./navigationType";
import { pageType } from "./pageType";
import { postType } from "./postType";
import { redirectType } from "./redirectType";
import { seoType } from "./seoType";
import { siteSettingsType } from "./siteSettingsType";

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
