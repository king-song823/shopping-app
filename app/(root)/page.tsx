import ProductList from '@/components/shared/product/product-list';
import { getLastestProdcuts } from '@/lib/actions/product.actions';
export default async function Home() {
  const lastestProdcuts = await getLastestProdcuts();
  console.log('lastestProdcuts', lastestProdcuts);
  return (
    <div className="space-y-8">
      <h2 className="h2-bold">Latest Products</h2>
      <ProductList title="Newest Arrivals" data={lastestProdcuts} />
    </div>
  );
}
