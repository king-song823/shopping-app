import ProductList from '@/components/shared/product/product-list';
import { getLastestProdcuts } from '@/lib/actions/product.actions';
import { getFeaturedProducts } from '@/lib/actions/product.actions';
import ProductCarousel from '@/components/shared/product/product-carousel';
export default async function Home() {
  const lastestProdcuts = await getLastestProdcuts();
  const featuredProducts = await getFeaturedProducts();
  return (
    <div className="space-y-8">
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList title="Newest Arrivals" data={lastestProdcuts} />
    </div>
  );
}
