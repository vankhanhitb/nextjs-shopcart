import { createClient } from "next-sanity";
import { NextResponse } from "next/server";

import { apiVersion, dataset, projectId } from "@/sanity/env";

const PRODUCT_QUERY = `*[_type == "product" && variant == $variant] | order(name desc){
  ...,
  "categories": categories[]->title
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
  const variant = searchParams.get("variant")?.toLowerCase();

  if (!variant) {
    return NextResponse.json(
      { error: "Missing variant search param" },
      { status: 400 },
    );
  }

  try {
    const products = await serverClient.fetch(PRODUCT_QUERY, { variant });
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Product API fetching error:", error);
    return NextResponse.json(
      { error: "Unable to fetch products" },
      { status: 500 },
    );
  }
}
