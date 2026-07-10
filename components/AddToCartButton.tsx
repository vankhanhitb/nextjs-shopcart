import React from 'react'
import { Button } from './ui/button';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from "@/types";

interface Props {
  product: Product;
  className?: string 
}

export default function AddToCartButton({product, className}: Props) {

  const isOutOfStock = product?.stock === 0;

  const handleAddToCart = () => {

  }

  return (
    <div>
      <Button 
      onClick={() => handleAddToCart()}
      disabled={isOutOfStock}
      className={cn("w-full mt-1.5 h-auto bg-shop-dark-green/80 text-white shadow-none border border-shop-dark-green/80 font-semibold rounded-full tracking-wide pt-3 pb-3 hover:text-white hover:bg-shop-dark-green hover:border-shop-dark-green hoverEffect", className)}>
        <ShoppingBag /> {isOutOfStock ? "Out of Stock" : "Add To Cart"}
      </Button>
    </div>
  )
}
