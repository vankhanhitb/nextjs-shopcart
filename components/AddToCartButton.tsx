"use client"

import React from 'react'
import { Button } from './ui/button';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from "@/sanity.types";
import useStore from '@/store';
import toast from 'react-hot-toast';
import PriceFormatter from './PriceFormatter';
import QuantityButtons from "@/components/QuantityButtons";
interface Props {
  product: Product;
  className?: string 
}

export default function AddToCartButton({product, className}: Props) {

  const isOutOfStock = product?.stock === 0;
  const {addItem, getItemCount} = useStore();
  const itemCount = getItemCount(product?._id);

  const handleAddToCart = () => {
    if((product?.stock as number) > itemCount){
      addItem(product);
      toast.success(`${product?.name?.substring(0,12)}... Added Successfully`);
    }
  }

  return (
    <div className="w-full">
      { itemCount ? (
        <div className="w-full text-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-shop-dark-green/80">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="font-semibold text-xs">Subtotal</span>
            <PriceFormatter amount={product?.price ? product?.price*itemCount : 0} />
          </div>
        </div>
      ):(
        <Button 
        onClick={() => handleAddToCart()}
        disabled={isOutOfStock}
        className={cn("w-full mt-1.5 h-auto bg-shop-dark-green/80 text-white shadow-none border border-shop-dark-green/80 font-semibold rounded-full tracking-wide pt-3 pb-3 hover:text-white hover:bg-shop-dark-green hover:border-shop-dark-green hoverEffect", className)}>
          <ShoppingBag /> {isOutOfStock ? "Out of Stock" : "Add To Cart"}
        </Button>
      )}
    </div>
  )
}
