import CategoryProducts from '@/components/CategoryProducts';
import Container from '@/components/Container';
import { Title } from '@/components/ui/text';
import { getCategories } from '@/sanity/queries';
import React from 'react';
import type { Category } from "@/sanity.types";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const categories: Category[] = await getCategories();
  const {slug} = await params;

  return (
    <div className="py-10">
      <Container>
        <Title>Products by Category: <span className="font-bold text-green-600 capitalize tracking-wide">{slug && slug}</span></Title>
        <CategoryProducts categories={categories} slug={slug} />
      </Container>
    </div>
  )
}
