import React from 'react'

import type {Product} from "@/sanity.types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

type Props = {
  product: Product
}

export default function ProductCharacteristics({product}: Props) {
  
  return (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          {product?.name}: Characteristics
        </AccordionTrigger>
        <AccordionContent>
          <p className="flex items-center justify-between">Brand: {product?.brand?.title && (
            <span className="font-semibold tracking-wide">{product?.brand?.title}</span>
          )}</p>
          <p className="flex items-center justify-between">
            Collection:{" "}
            <span className="font-semibold tracking-wide">2025</span>
          </p>
          <p className="flex items-center justify-between">
            Type:{" "}
            <span className="font-semibold tracking-wide">
              {product?.variant}
            </span>
          </p>
          <p className="flex items-center justify-between">
            Stock:{" "}
            <span className="font-semibold tracking-wide">
              {product?.stock ? "Available" : "Out of Stock"}
            </span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
