import type { Product } from '@/sanity.types';
import { HeartIcon } from 'lucide-react';
import Link from "next/link";
import React from 'react'

type Props = {
  showProduct: boolean;
  product: Product
}

export default function FavoriteButton({showProduct, product}: Props) {
  return (
    <div>
      {!showProduct ? (
        <Link href={"/wishlist"} className="group relative">
          <HeartIcon className="w-5 h-5 hover:text-shop-light-green hoverEffect" />
          <span className="absolute -top-1 -right-1 bg-shop-dark-green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">0</span>
        </Link>
      ):(
        <button className="group relative hover:text-shop_light_green hoverEffect border border-shop_light_green/80 hover:border-shop_light_green p-1.5 rounded-sm">
          <HeartIcon className="text-shop_light_green/80 group-hover:text-shop_light_green hoverEffect mt-.5 w-5 h-5" />
        </button>
      )}
      
    </div>
  )
}
