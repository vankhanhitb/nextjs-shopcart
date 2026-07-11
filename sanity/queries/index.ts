import "server-only";

import { client } from "../lib/client";

import { BRAND_QUERY, BLOGS_QUERY, DEAL_PRODUCTS, CATEGORY_QUERY, PRODUCT_QUERY, PRODUCT_FILLTER_QUERY } from "./query";

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

export const getBrand = async () => {
  const query = BRAND_QUERY;
  try {
    return await categoryClient.fetch(query);
  } catch (error) {
    console.error("Error fetching categories", error);
    return [];
  }
};

export const getLatestBlogs = async () => {
  const query = BLOGS_QUERY;
  try {
    return await categoryClient.fetch(query);
  } catch (error) {
    console.error("Error fetching categories", error);
    return [];
  }
}

export const getDealProducts = async () => {
  const query = DEAL_PRODUCTS;
  try {
    return await categoryClient.fetch(query);
  } catch (error) {
    console.error("Error fetching categories", error);
    return [];
  }
}

export const getAllCategories = async () => {
  const query = CATEGORY_QUERY;
  try {
    return await categoryClient.fetch(query);
  } catch (error) {
    console.error("Error fetching categories", error);
    return [];
  }
}

export const getAllProducts = async () => {
  const query = PRODUCT_QUERY;
  try {
    return await categoryClient.fetch(query);
  } catch (error) {
    console.error("Error fetching categories", error);
    return [];
  }
}

interface Props {
  selectedCategory: string | null;
  selectedBrand: string | null;
  minPrice: number;
  maxPrice: number;
}

export const getProductFilterBy = async ({selectedCategory, selectedBrand, minPrice, maxPrice} : Props ) => {
  const query = PRODUCT_FILLTER_QUERY;
  try {
    return await client.fetch(query, {
      selectedCategory, selectedBrand, minPrice, maxPrice
    });
  } catch (error) {
    console.error("Error fetching categories", error);
    return [];
  }
}