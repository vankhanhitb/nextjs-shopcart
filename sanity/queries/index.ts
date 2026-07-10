import "server-only";

import { client } from "../lib/client";

const categoryFields = `{
  ...,
  "productCount": count(*[_type == "product" && references(^._id)])
}`;

const categoryClient = client.withConfig({
  token: process.env.SANITY_API_READ_TOKEN?.trim(),
  useCdn: false,
});

export const getCategories = async (quantity?: number) => {
  const query = quantity
    ? `*[_type == "category"] | order(title asc)[0...$quantity] ${categoryFields}`
    : `*[_type == "category"] | order(title asc) ${categoryFields}`;

  try {
    return await categoryClient.fetch(query, quantity ? { quantity } : {});
  } catch (error) {
    console.error("Error fetching categories", error);
    return [];
  }
};
