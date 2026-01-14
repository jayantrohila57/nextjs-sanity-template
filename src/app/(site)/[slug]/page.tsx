import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { draftClient } from "@/infra/sanity/clients/draft-client";
import { q } from "@/infra/sanity/clients/groqd-client";

const pageQuery = q.star
  .filterByType("page")
  .filterRaw("slug.current == $slug")
  .order("publishDate asc", "_updatedAt desc")
  .slice(0)
  .project((q) => ({
    _id: q.field("_id"),
    _type: q.field("_type"),
    title: q.field("title"),
    slug: q.field("slug"),
    body: q.field("body[]"),
  }));

export const { query } = pageQuery;

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
