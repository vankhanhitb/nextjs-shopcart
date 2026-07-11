import { urlFor } from '@/sanity/lib/image';
import React from 'react'
import Image from "next/image"
import Link from 'next/link';
import { Flame, StarIcon } from 'lucide-react';
import AddToWishlistButton from './AddToWishlistButton';
import { Title } from './ui/text';
import PriceView from './PriceView';
import AddToCartButton from './AddToCartButton';

import type { Product } from "@/sanity.types";

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="text-sm border border-dark-blue/20 rounded-md bg-white group">
      <div className="relative group overflow-hidden bg-shop-light-bg">
        {product?.images && 
          <Link href={`/product/${product?.slug?.current}`}>
            <Image 
              src={urlFor(product?.images[0]).url()}
              alt="imageProductCard"
              loading="lazy"
              width={700}
              height={700}
              className={`w-full h-64 object-contain overflow-hidden transition-transform bg-shop-light-bg hoverEffect ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
            />
          </Link>
        }
        {/* WishList Icon */}
        <AddToWishlistButton product={product} />
        {/* Sale */}
        {product?.status === "sale" && (
          <p className="absolute top-2 px-2 py-1 left-2 z-10 text-xs border border-dart/50 rounded-full group-hover:border-shop-light-green  group-hover:text-shop-light-green hoverEffect">Sale!</p>
        )}
        {/* Hot */}
        {product?.status === "hot" && (
          <Link href={"/deal"}
            className="absolute top-2 p-1.5 left-2 z-10 border border-shop-orange/50 rounded-full group-hover:border-shop-orange hover:text-shop-dark-green hoverEffect"
          >
            <Flame 
              size={20}
              fill="#fb5c08"
              className="text-shop-orange/50 group-hover:text-shop-orange hoverEffect"
            />
          </Link>
        )}
         {/* New */}
        {product?.status === "new" && (
          <p className="absolute p-1 top-2 left-2 z-10 text-xs border border-dart/50 px-2 py-1 rounded-full group-hover:border-shop-light-green  group-hover:text-shop-light-green hoverEffect">New Arivable!</p>
        )}
      </div>
      <div className="flex gap-1.5 p-3 flex-col">
        {product?.categories && (
          <p className="uppercase line-clamp-1 text-xs text-gray-400">{product?.categories?.map((cat) => cat).join(",") }</p>
        )}
        <Link href={`/product/${product?.slug?.current}`}>
          <Title className="md:text-xl line-clamp-1">{product?.name}</Title>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, index)=>(
              <StarIcon size={12} key={index} className={index < 4 ? "text-shop-light-green" : "text-ligh-text"} />
            ))}
          </div>
          <p className="text-ligh-text text-xs tracking-wide">5 Reviews</p>
        </div>
        <div className="flex items-center gap-2.5">
          <p className="text-[12px] font-semibold">In Stock: </p>
          <p className={`${product?.stock === 0 ? "text-red-600" : "text-shop-light-green/90 font-semibold"}`}>
            {(product?.stock as number) > 0 ? product?.stock : "unavalable"}
          </p>
        </div>
        <PriceView 
          price={product?.price} 
          discount={product?.discount}
          classname="md:text-md"
        />
        <AddToCartButton product={product} className="w-36 rounded-full" />
      </div>
    </div>
  )
}
