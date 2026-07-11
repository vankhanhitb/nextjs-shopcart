import "server-only";

import { client } from "../lib/client";
import { sanityFetch } from "../lib/live";

import { BRAND_QUERY, BLOGS_QUERY, DEAL_PRODUCTS, CATEGORY_QUERY, PRODUCT_QUERY, BLOG_QUERY, BLOG_CATEGORIES, OTHERS_BLOG_QUERY } from "./query";

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

export const getAllBlog = async () => {
  const query = BLOG_QUERY;
  try {
    return await categoryClient.fetch(query);
  } catch (error) {
    console.error("Error fetching categories", error);
    return [];
  }
}

export const getBlogCategories = async () => {
  const query = BLOG_CATEGORIES;
  try {
    return await categoryClient.fetch(query);
  } catch (error) {
    console.error("Error fetching categories", error);
    return [];
  }
};

export const getOthersBlog = async (slug: string, quantity: number) => {
  try {
    const { data } = await sanityFetch({
      query: OTHERS_BLOG_QUERY,
      params: { slug, quantity },
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};