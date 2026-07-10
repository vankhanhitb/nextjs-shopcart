import React from 'react'
import { getDealProducts } from "@/sanity/queries"
import Container from '@/components/Container';
import { Title } from '@/components/ui/text';
import dayjs from 'dayjs';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

export default async function DealPage() {
  const products = await getDealProducts();

  return (
    <div className="py-10 bg-product-bg">
      <Container>
        <Title className="md:text-md mb-5 underline underline-offset-4 decoration-1 text-base uppercase tracking-wide">Hot Deals of the Week</Title>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {products?.map((product: Product)=>(
            //@ts-expected-error
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  )
}
