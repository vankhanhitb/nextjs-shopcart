import { defineQuery } from "next-sanity"

export const BRAND_QUERY = defineQuery(`*[_type == "brand"] | order(title asc){
  _id,
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

export const CATEGORY_QUERY = defineQuery(`*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug
}`)

export const PRODUCT_QUERY = defineQuery(`*[_type == "product"] | order(name asc) {
  ...,
}`)

export const PRODUCT_FILLTER_QUERY = defineQuery(`*[_type == 'product' 
  && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
  && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
  && price >= $minPrice && price <= $maxPrice
] 
| order(name asc) {
  ...,"categories": categories[]->title
}`);