import { urlFor } from '@/sanity/lib/image';
import React from 'react'
import Image from "next/image"
import Link from 'next/link';
import { Flame } from 'lucide-react';

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
          />
        }
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
        
      </div>
    </div>
  )
}
