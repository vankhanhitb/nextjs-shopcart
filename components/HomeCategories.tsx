import React from 'react'
import { Title } from './ui/text';
import type { Category } from "@/types";

export default function HomeCategories({categories}: {categories: Category[]}) {
  return (
    <div className="bg-white border border-shop-light-green/20 mb-10 mt-10 md:mb-20 p-5 lg:p7 rounded-md">
      <Title className="border-b pb-3">Popular</Title>
      <div>
        {categories?.map((category)=>(
          <>category</>
        ))}
      </div>
    </div>
  )
}
