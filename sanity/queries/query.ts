import { defineQuery } from "next-sanity"

export const BRAND_QUERY = defineQuery(`*[_type == "brand"] | order(title asc){
  title,
  slug,
  image
}`);
