import React from 'react';
import useStore from "@/store";
import { Product } from '@/sanity.types';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Minus, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Props {
  product: Product;
  className?: string;
}

export default function QuantityButtons({product, className}: Props) {
  const { addItem, removeItem, getItemCount } = useStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  const handleRemoveProduct = () => {
    removeItem(product?._id);
    if(itemCount > 1) {
      toast.success("Quantity Decreased successfully");
    }else{
      toast.success(`${product?.name?.substring(0,12)} removed successfully!`);
    }
  }

  const handleAddToCart = () => {
    if((product?.stock as number) > itemCount){
      addItem(product);
      toast.success("Quantity Increased sucessfully!");
    }else{
      toast.error("Can not add more than available stock");
    }
  }

  return (
    <div className={cn("flex items-center gap-1 pb-1 text-base", className)}>
      <Button
          onClick={handleRemoveProduct} 
          variant="outline" 
          size="icon" 
          disabled={itemCount === 0 || isOutOfStock}
          className="w-6 h-6 border hover:bg-shop-dark-green/20 hoverEffect"
        >
        <Minus/>
      </Button>
      <span className="font-semibold text-sm w-6 text-center text-dark">{itemCount}</span>
      <Button
        onClick={handleAddToCart}
        variant="outline" 
        size="icon" 
        disabled={itemCount === 0 || isOutOfStock}
        className="w-6 h-6 border hover:bg-shop-dark-green/20 hoverEffect"
      >
        <Plus />
      </Button>
    </div>
  )
}
