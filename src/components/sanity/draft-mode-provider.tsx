import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/sanity/lib/live";
import { DisableDraftMode } from "./disable-draft-mode";

export default async function DraftModeProvider() {
  const enable = (await draftMode()).isEnabled;
  if (!enable) return null;
  return (
    <>
      <VisualEditing />
      <DisableDraftMode />
      <SanityLive />
    </>
  );
}
