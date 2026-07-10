import { urlFor } from '@/sanity/lib/image';
import React from 'react'
import Image from "next/image"
import Link from 'next/link';
import { Flame, StarIcon } from 'lucide-react';
import AddToWishlistButton from './AddToWishlistButton';
import { Title } from './ui/text';
import PriceView from './PriceView';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }:{product: Product}) {
  return (
    <div className="text-sm border border-dark-blue/20 rounded-md bg-white group">
      <div className="relative group overflow-hidden bg-shop-light-bg">
        {product?.images && 
          <Image 
            src={urlFor(product?.images[0]).url()}
            alt={product?.name.toLowerCase().replace(" ","-")}
            loading="lazy"
            width={700}
            height={700}
            className={`w-full h-64 object-contain overflow-hidden transition-transform bg-shop-light-bg hoverEffect ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
          />
        }
        {/* WishList Icon */}
        <AddToWishlistButton  product={product} />
        {/* Sale */}
        {product?.status === "sale" && (
          <p className="absolute top-2 left-2 z-10 text-xs border border-dart/50 px-2 rounded-full group-hover:border-shop-light-green  group-hover:text-shop-light-green hoverEffect">Sale!</p>
        )}
        {/* Hot */}
        {product?.status === "hot" && (
          <Link href={"/deal"}
            className="absolute top-2 left-2 z-10 border border-shop-orange/50 rounded-full group-hover:border-shop-orange hover:text-shop-dark-green hoverEffect"
          >
            <Flame 
              size={18}
              fill="#fb5c08"
              className="text-shop-orange/50 group-hover:text-shop-orange hoverEffect"
            />
          </Link>
        )}
         {/* New */}
        {product?.status === "new" && (
          <p className="absolute top-2 left-2 z-10 text-xs border border-dart/50 px-2 rounded-full group-hover:border-shop-light-green  group-hover:text-shop-light-green hoverEffect">New Arivable!</p>
        )}
      </div>
      <div className="flex p-3 flex-col">
        {product?.categories && (
          <p className="uppercase line-clamp-1 text-xs text-light-text">{product?.categories?.map((cat) => cat).join(",") }</p>
        )}
        <Title className="text-sm line-clamp-1">{product?.name}</Title>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, index)=>(
              <StarIcon size={12} key={index} className={index < 4 ? "text-shop-light-green" : "text-ligh-text"} />
            ))}
          </div>
          <p className="text-ligh-text text-xs tracking-wide">5 Reviews</p>
        </div>
        <div className="flex items-center gap-2.5">
          <p>In Stock</p>
          <p className={`${product?.stock === 0 ? "text-red-600" : "text-shop-light-green/80 font-semibold"}`}>
            {(product?.stock as number) > 0 ? product?.stock : "unavalable"}
          </p>
        </div>
        <PriceView 
          price={product?.price} 
          discount={product?.discount}
          classname="text-sm"
        />
        <AddToCartButton product={product} className="w-36 rounded-full" />
      </div>
    </div>
  )
}
