import { createClient } from "next-sanity";
import { NextResponse } from "next/server";

import { apiVersion, dataset, projectId } from "@/sanity/env";

const ADDRESS_QUERY = `*[_type=="address"] | order(publishedAt desc){
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
  try {
    const address = await serverClient.fetch(ADDRESS_QUERY);
    return NextResponse.json({ address });
  } catch (error) {
    console.error("Address API fetching error:", error);
    return NextResponse.json(
      { error: "Unable to fetch blog" },
      { status: 500 },
    );
  }
}
