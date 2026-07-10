"use client"

import { useEffect, useState } from "react";
import HomeTabBar from "./ui/HomeTabBar";
import { productType } from "@/constants/data";
import { AnimatePresence, motion } from "motion/react"
import { Loader2 } from "lucide-react";
import NoProductAvailable from "@/components/NoProductAvailable"
import ProductCard from "./ProductCard";
type Product = {
  _id: string;
  name: string;
};

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState(productType[0].value || "")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try{
        const params = { variant: selectedTab.toLowerCase() };
        const response = await fetch(`/api/products?variant=${params.variant}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Unable to fetch products");
        }
        setProducts(data.products);
      }catch(error){
        console.error("Product fetching Error: ", error);
      }finally{
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedTab])

  return (
    <div className="product-grid py-10">
      <HomeTabBar selectedTab={selectedTab} onTabselect={(tab) => setSelectedTab(tab)} />
      {loading ? (<div className="flex flex-col items-center justify-center py-10 min-h-80 gap-4 bg-gray-100 w-full mt-10">
        <div className="space-x-2 flex items-center text-blue-600">
          <Loader2  className="w-5 h-6 animate-spin"/>
          <span>Product is Loading....</span>  
        </div>  
      </div>) : (
        products?.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10">
          {products?.map((product) => {
            return(
              <AnimatePresence key={product?._id}>
                <motion.div 
                  layout 
                  initial={{ opacity: 0.2 }} 
                  animate={{opacity:1}} 
                  exit={{opacity:0}}
                >
                  <ProductCard product={product} />
                </motion.div>
              </AnimatePresence>
            )
          })}
        </div>
        ):(
          <NoProductAvailable selectedTab={selectedTab} />
        )
      )}
    </div>
  )
}
