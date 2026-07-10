import { Heart } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function AddToWishlistButton({product, className}: {product: Product, className?: string}) {
  return (
    <div className={cn("absolute top-2 right-2 z-10", className)}>
      <button 
        type="button" 
        rel="butotn" 
        className={`p-2.5 rounded-full hover:bg-shop-dark-green hover:text-white hoverEffect bg-white`} 
      >
        <Heart
         size={15}
        />
      </button>
    </div>
  )
}
