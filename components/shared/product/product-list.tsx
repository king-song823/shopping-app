import ProductCard from "./product-card";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductList = ({ data, title }: { data: any; title?: string }) => {
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-clos-4 gap-4">
          {data.map((product: { name: string; slug: string }) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <>
          <p>No prodcut found</p>
        </>
      )}
    </div>
  );
};

export default ProductList;
