import ProductList from '@/components/shared/product/product-list';
import { getLastestProdcuts } from '@/lib/actions/product.actions';
import { main } from '@/db/seed';
export default async function Home() {
  main();
  const lastestProdcuts = await getLastestProdcuts();
  return (
    <div className="space-y-8">
      <h2 className="h2-bold">Latest Products</h2>
      <ProductList title="Newest Arrivals" data={lastestProdcuts} />
    </div>
  );
}
