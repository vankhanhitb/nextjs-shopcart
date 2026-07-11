import { createClient } from "next-sanity";
import { NextResponse } from "next/server";

import { apiVersion, dataset, projectId } from "@/sanity/env";

const PRODUCT_QUERY = `*[
  _type == "product" &&
  (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id)) &&
  (!defined($selectedBrand) || brand._ref in *[_type == "brand" && slug.current == $selectedBrand]._id) &&
  price >= $minPrice &&
  price <= $maxPrice
] | order(name asc) {
  ...,
  "categories": categories[]->title,
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
  const selectedCategory = searchParams.get("selectedCategory")?.toLowerCase() || null;
  const selectedBrand = searchParams.get("selectedBrand")?.toLowerCase() || null;
  const minPrice = Number(searchParams.get("minPrice") ?? 0);
  const maxPrice = Number(searchParams.get("maxPrice") ?? 10000);

  if (Number.isNaN(minPrice) || Number.isNaN(maxPrice)) {
    return NextResponse.json(
      { error: "Invalid price search params" },
      { status: 400 },
    );
  }

  try {
    const products = await serverClient.fetch(PRODUCT_QUERY, {
      selectedCategory,
      selectedBrand,
      minPrice,
      maxPrice,
    });
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Product API fetching error:", error);
    return NextResponse.json(
      { error: "Unable to fetch products" },
      { status: 500 },
    );
  }
}
