import React from 'react'
import { Title } from './ui/text';
import type { Category } from "@/types";
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';

export default function HomeCategories({categories}: {categories: Category[]}) {
  return (
    <div className="bg-white border border-shop-light-green/20 mb-10 mt-10 md:mb-20 p-5 lg:p7 rounded-md">
      <Title className="border-b pb-3">Popular</Title>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories?.map((category)=>(
          <div key={category?._id} className="bg-shop-light-bg p-5 flex items-center gap-3 group">
            {category?.image && (
              <div className="overflow-hidden border border-shop_orange/30 hover:border-shop_orange hoverEffect w-20 h-20 p-1">
                <Link href={{
                    pathname: "/shop",
                    query: {category: category?.slug?.current}
                  }}> 
                  <Image 
                    src={urlFor(category?.image).url()} 
                    alt="categoryImage" 
                    width={500} 
                    height={500} 
                    className="w-full h-full object-contain group-hover:scale-110 hoverEffect" 
                  /> 
                </Link>
              </div>  
            )}
            <div className="space-y-2">
              <h3 className="text-base font-semibold">{category?.title}</h3>
              <p className="text-sm">
                <span className="semibold text-shop-dark-green">{`${category?.productCount as number}`}</span> items Available
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
