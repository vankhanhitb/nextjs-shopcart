import Container from '@/components/Container';
import React from 'react'
import BlogDetailPage from "@/components/BlogDetailPage"

export default async function SingleBlogPage(
  {
    params,
  }: {
    params: Promise<{slug: string}>
  }) {
  
  const { slug } = await params;
  
  return (
    <div>
      <Container>
        <BlogDetailPage slug={ slug } />
      </Container>
    </div>
  )
}
