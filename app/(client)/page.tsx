import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrand from "@/components/ShopByBrand";
import { getCategories } from "@/sanity/queries";

export default async function Home() {
  const categories = await getCategories(6);
  
  return (
    <Container>
      <HomeBanner />
      <ProductGrid />
      <HomeCategories categories={categories} />
      <ShopByBrand />
    </Container>
  );
}

