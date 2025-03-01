import ProductList from '@/components/shared/product/product-list';
import { getLastestProdcuts } from '@/lib/actions/product.actions';
import { getFeaturedProducts } from '@/lib/actions/product.actions';
import ProductCarousel from '@/components/shared/product/product-carousel';
import ViewAllProductsButton from '@/components/view-all-products-button';
import IconBoxes from '@/components/icon-boxes';
export default async function Home() {
  const lastestProdcuts = await getLastestProdcuts();
  const featuredProducts = await getFeaturedProducts();
  return (
    <div className="space-y-8">
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList title="Newest Arrivals" data={lastestProdcuts} />
      {featuredProducts.length > 0 && <ViewAllProductsButton />}
      <IconBoxes />
    </div>
  );
}
