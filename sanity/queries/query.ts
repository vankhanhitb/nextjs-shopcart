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

export const BLOG_QUERY = defineQuery(`*[_type == "blog"] | order(title asc) {
  ...,
  title,
  slug
}`)

export const BLOG_CATEGORIES = defineQuery(
  `*[_type == "blog"]{
     blogcategories[]->{
    ...
    }
  }`
);

export const OTHERS_BLOG_QUERY = defineQuery(`*[
  _type == "blog"
  && defined(slug.current)
  && slug.current != $slug
]|order(publishedAt desc)[0...$quantity]{
...
  publishedAt,
  title,
  mainImage,
  slug,
  author->{
    name,
    image,
  },
  categories[]->{
    title,
    "slug": slug.current,
  }
}`);

export const MY_ORDERS_QUERY = defineQuery(`*[_type == 'order' && clerkUserId == $userId] | order(createdAt desc){
...,products[]{
  ...,product->
}
}`);