import { defineQuery } from "next-sanity"

export const BRAND_QUERY = defineQuery(`*[_type == "brand"] | order(title asc){
  title,
  slug,
  image
}`);

export const BLOGS_QUERY = defineQuery(`*[_type == "blog"] | order(title asc){
  ...,
  blogcategories[]->{title}
}`);

export const DEAL_PRODUCTS = defineQuery(`*[_type == 'product' && status == 'hot'] | order(name asc){
  ...,
  "categories": categories[]->{title}
  }`);