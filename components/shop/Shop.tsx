"use client"

import { Brand, Category, Product } from '@/sanity.types';
import {useEffect, useState} from 'react'
import Container from '../Container';
import { Title } from '../ui/text';
import { Loader2 } from "lucide-react";
import NoProductAvailable from "../NoProductAvailable";
import ProductCard from "../ProductCard";
import CategoryList from "@/components/shop/CategoryList";
import BrandList from "@/components/shop/BrandList";
import PriceList from "@/components/shop/PriceList";
import { useSearchParams } from 'next/navigation';

type Props = {
  categories: Category[];
  brands: Brand[];
  products: Product[];
}

export default function Shop({categories, brands, products}: Props) {
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");

  const [productsList, setProductsList] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string|null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string|null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string|null>(null)

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
          let minPrice = 0;
          let maxPrice = 10000;
          if (selectedPrice) {
            const [min, max] = selectedPrice.split("-").map(Number);
            minPrice = min;
            maxPrice = max;
          }

          const params = new URLSearchParams({
            minPrice: String(minPrice),
            maxPrice: String(maxPrice),
          });

          if (selectedCategory) {
            params.set("selectedCategory", selectedCategory);
          }

          if (selectedBrand) {
            params.set("selectedBrand", selectedBrand);
          }
          
          const response = await fetch(`/api/getProductByFilter?${params.toString()}`);

          if(!response.ok) {
            console.log("Error Fetching Data");
          }
          const responData = await response.json();
          setProductsList(responData.products);

        } catch (error) {
          console.error("Error Fetching Data:", error);
        }finally {
          setLoading(false);
        }
    }
    fetchData();
  }, [selectedCategory,selectedBrand,selectedPrice])

  const resetFilter = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSelectedPrice(null);
  }

  return (
    <div className="border-t">
       <Container className="mt-5">
           <div className="sticky top-0 z-10 mb-5">
              <div className="flex items-center justify-between">
                <Title>Get the product as you needs</Title>
              {
                (selectedBrand !== null || selectedCategory !== null || selectedPrice !== null) && (
                  <button 
                  onClick={() => {resetFilter()}}
                  className="text-shop-dark-green underline text-sm mt-2 font-medium hover:text-darkRed hoverEffect">
                    Reset Filter
                  </button>
                )
              }
              </div>
           </div>

           <div className="flex flex-col md:flex-row gap-5 border-t border-t-shop-dark-green/50">
              <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 md:border-r border-r-shop_btn_dark_green/50 scrollbar-hide">
                <CategoryList categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <BrandList brands={brands} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />
                <PriceList selectedPrice={selectedPrice} setSelectedPrice={setSelectedPrice} />
              </div>
              
              <div className="flex-1 pt-5">
            <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide">
              {loading ? (
                <div className="p-20 flex flex-col gap-2 items-center justify-center bg-white">
                  <Loader2 className="w-10 h-10 text-shop_dark_green animate-spin" />
                  <p className="font-semibold tracking-wide text-base">
                    Product is loading . . .
                  </p>
                </div>
              ) : productsList?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {productsList?.map((product) => (
                    <ProductCard key={product?._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoProductAvailable className="bg-white mt-0" />
              )}
            </div>
          </div>
           </div>
       </Container>
    </div>
  )
}
