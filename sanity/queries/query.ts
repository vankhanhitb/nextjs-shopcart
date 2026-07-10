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