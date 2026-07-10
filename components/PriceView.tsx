import React from 'react'
import PriceFormatter from './PriceFormatter';

interface Props {
  price: number | undefined;
  discount: number | undefined;
  classname?: string;
}

export default function PriceView({price, discount, classname}: Props) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <PriceFormatter amount={price} className="text-shop-dark-green" />
        {price && discount && (
          <PriceFormatter amount={price + (discount*price)/100} className="line-through font-normal text-ligh-text" />
        )}
      </div>
    </div>
  )
}
