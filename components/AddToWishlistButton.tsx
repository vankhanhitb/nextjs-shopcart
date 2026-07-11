import { Heart } from 'lucide-react';
import { cn } from "@/lib/utils";
import type { Product } from "@/sanity.types";
import { useEffect, useState } from 'react';
import useStore from '@/store';
import { toast } from 'react-hot-toast';

interface Props {
  product: Product;
  className?: string;
}

export default function AddToWishlistButton({product, className}: Props) {
  const {favoriteProduct, addToFavorite} = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(product);

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
    <div className={cn("absolute top-2 right-2 z-10", className)}>
      <button
        onClick={handleFavorite}
        value={product?._id}
        type="button" 
        rel="butotn" 
        className={`p-2.5 rounded-full hover:bg-shop-dark-green hover:text-white hoverEffect ${existingProduct ? "bg-shop-dark-green/80 text-white" : "bg-white text-dark"}`} 
      >
        <Heart
         size={15}
        />
      </button>
    </div>
  )
}
