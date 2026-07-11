import { createClient } from "next-sanity";
import { NextResponse } from "next/server";

import { apiVersion, dataset, projectId } from "@/sanity/env";

const PRODUCT_QUERY = `*[
  _type == "product" && slug.current == $slug] | order(name asc) {
  ...,
  "categories": categories[]->{
    ...,
    "slug": slug.current
  },
  "brand": brand->{title, description}
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
      { error: "Missing slug search param" },
      { status: 400 },
    );
  }

  try {
    const products = await serverClient.fetch(PRODUCT_QUERY, { slug });
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Product API fetching error:", error);
    return NextResponse.json(
      { error: "Unable to fetch products" },
      { status: 500 },
    );
  }
}
