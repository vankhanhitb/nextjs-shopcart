"use client"

import React, { useEffect, useState } from 'react'
import type { Category } from "@/sanity.types";
import type { Product } from "@/types";
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";

export default function CategoryProducts({categories, slug}: {categories: Category[], slug: string}) {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFilterByCategory = (slug?: string) => {
    if (!slug || slug === currentSlug) return;
    setCurrentSlug(slug);
    // Update URL without 
    router.push(`/category/${slug}`, { scroll: false }); 
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/getProductBySlug?slug=${encodeURIComponent(currentSlug)}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Unable to fetch products");
        }
        setProducts(data.products)
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router])

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      <div className="flex flex-col md:min-w-40 border">
        {categories?.map((item)=>(
          <Button 
            onClick={() => handleFilterByCategory(item?.slug?.current)}
            key={item?._id} 
            className={`bg-transparent border-0 p-0  rounded-none text-dark shadow-none hover:bg-shop-orange hover:text-white font-semibold hoverEffect border-b last:border-b-0 transition-colors capitalize ${item?.slug?.current === currentSlug && "bg-shop-orange text-white border-shop-orange"}`}>
            <p className="w-full text-left px-2">{item?.title}</p>
          </Button>
        ))}
      </div>
      <div className="flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full">
            <div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Product is loading...</span>
            </div>
          </div>
        ) : products?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {products?.map((product: Product) => (
              <AnimatePresence key={product._id}>
                <motion.div>
                  <ProductCard product={product} />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        ) : (
          <NoProductAvailable
            selectedTab={currentSlug}
            className="mt-0 w-full"
          />
        )}
      </div>
    </div>
  )
}
