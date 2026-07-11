import Container from '@/components/Container';
import ProductDetailPage from "@/components/ProductDetailPage"

export default async function ProductPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const { slug } = await params;

  return (
    <div>
      <Container>
        <ProductDetailPage slug={slug} />
      </Container>
    </div>
  )
}
