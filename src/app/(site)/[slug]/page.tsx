import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import { draftClient } from "@/sanity/draft-client";

const query = defineQuery(
  `*[_type == "page" && slug.current == $slug][0]{title, body}`,
);

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();

  const data = await draftClient.fetch(
    query,
    { slug },
    isEnabled
      ? {
          perspective: "drafts",
          useCdn: false,
          stega: true,
        }
      : undefined,
  );

  if (!data) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{data.title}</h1>
      {data.body && (
        <div className="prose prose-lg max-w-none">
          {/* Render block content here - you'll need a block content renderer */}
          <pre>{JSON.stringify(data.body, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
