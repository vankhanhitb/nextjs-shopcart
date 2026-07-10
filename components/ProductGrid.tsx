"use client"

import { useEffect, useState } from "react";
import HomeTabBar from "./ui/HomeTabBar";
import { productType } from "@/constants/data";

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
        console.log("GROQ params:", params);
        const response = await fetch(`/api/products?variant=${params.variant}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Unable to fetch products");
        }

        console.log(data.products);
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
    <div className="product-grid">
      <HomeTabBar selectedTab={selectedTab} onTabselect={(tab) => setSelectedTab(tab)} />
      <p className="mt-4 text-sm text-light">
        {loading ? "Loading products..." : `${products.length} products found`}
      </p>
    </div>
  )
}
