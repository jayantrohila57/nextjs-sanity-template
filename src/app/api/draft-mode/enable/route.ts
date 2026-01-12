import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { draftClient } from "@/sanity/draft-client";

export const { GET } = defineEnableDraftMode({
  client: draftClient.withConfig({
    token: process.env.SANITY_VIEWER_TOKEN,
  }),
});
