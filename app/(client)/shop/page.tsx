import { getAllCategories, getBrand, getAllProducts} from "@/sanity/queries"
import Shop from "@/components/shop/Shop"

export default async function ShopPage(){
  const categories = await getAllCategories();
  const brands = await getBrand();
  const products = await getAllProducts();

  return(
    <div>
      <Shop categories={categories} brands={brands} products={products} />
    </div>
  )
}