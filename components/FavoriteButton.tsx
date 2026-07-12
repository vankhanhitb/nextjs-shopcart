"use client"

import type { Product } from '@/sanity.types';
import { HeartIcon } from 'lucide-react';
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import useStore from "@/store";
import { toast } from 'react-hot-toast';
import { Button } from "./ui/button";

type Props = {
  showProduct: boolean;
  product: Product
}

export default function FavoriteButton({showProduct, product}: Props) {
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);
  const {favoriteProduct, addToFavorite} = useStore();

  useEffect(() => {
    const checkExistProduct = () => {
      const availableProduct = favoriteProduct?.find((item) => item?._id === product?._id);
      setExistingProduct(availableProduct || null);
    }
    checkExistProduct();
  }, [product, favoriteProduct])

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if(product?._id){
      addToFavorite(product).then(()=>{
        toast.success(existingProduct ? "Product removed successfully" : "Product added successfully")
      })
    }
  }

  return (
    <div>
      {!showProduct ? (
        <Link href={"/wishlist"} className="group relative">
          <HeartIcon className="w-5 h-5 hover:text-shop-light-green hoverEffect" />
          <span className="absolute -top-1 -right-1 bg-shop-dark-green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
            {(favoriteProduct.length) > 0 ? favoriteProduct.length : 0}
          </span>
        </Link>
      ):(
        <Button
        onClick={handleFavorite}
        className="group relative hover:text-shop_light_green hoverEffect border border-shop_light_green/80 hover:border-shop_light_green p-1.5 rounded-sm">
          {(existingProduct) ? (
            <HeartIcon fill="#3b9c3c" className="text-shop_light_green/80 group-hover:text-shop_light_green hoverEffect mt-.5 w-5 h-5" />
          ):(
            <HeartIcon className="text-shop_light_green/80 group-hover:text-shop_light_green hoverEffect mt-.5 w-5 h-5" />
          )}
        </Button>
      )}
      
    </div>
  )
}
