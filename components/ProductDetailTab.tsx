import React from 'react'
import type { Product } from "@/sanity.types"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

type Props = {
  product: Product;
}

export default function ProductDetailTab({ product }: Props) {
  return (
    <div className="my-20">
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger className="px-4 py-5 text-shop-btn-dark-green text-[16px] tracking-wide" value="details">Product Detail</TabsTrigger>
          <TabsTrigger className="px-4 py-5 text-shop-btn-dark-green text-[16px] tracking-wide" value="brand">Brand Info</TabsTrigger>
          <TabsTrigger className="px-4 py-5 text-shop-btn-dark-green text-[16px] tracking-wide" value="categories">Categories Info</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="p-4 border rounded-xs text-[15px]">
          {product?.description || "No product details available."}
        </TabsContent>
        <TabsContent value="brand" className="p-4 border rounded-xs text-[15px]">
          <h3>Brand Name: {product?.brand?.title}</h3>
          <p>Brand Info: {product?.brand?.description}</p>
        </TabsContent>
        <TabsContent value="categories" className="p-4 border rounded-xs text-[15px]">
           {product?.categories?.map((category) => (
              <div key={category?._id} className="mb-2">
                <h3>Category Name: {category.title}</h3>
                <p>Category Info: {category.description || "Category info content"}</p>
              </div>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
