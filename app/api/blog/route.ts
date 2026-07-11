import { createClient } from "next-sanity";
import { NextResponse } from "next/server";

import { apiVersion, dataset, projectId } from "@/sanity/env";

const BLOG_QUERY = `*[_type == "blog" && slug.current == "10-french-wine-regions-to-visit-for-amazing-views-and-delicious-vinos"] | order(title asc) {
  ...,
}`;

const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN?.trim(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug")?.toLowerCase();

  if (!slug) {
    return NextResponse.json(
      { error: "Missing varslugiant search param" },
      { status: 400 },
    );
  }

  try {
    const blog = await serverClient.fetch(BLOG_QUERY, { slug });
    return NextResponse.json({ blog });
  } catch (error) {
    console.error("Blog API fetching error:", error);
    return NextResponse.json(
      { error: "Unable to fetch blog" },
      { status: 500 },
    );
  }
}
