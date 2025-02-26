import { Metadata } from 'next';
import ProductForm from '@/components/shared/admin/prodcut-form';
export const metadata: Metadata = {
  title: 'Create product',
};

const CreateProductPage = () => {
  return (
    <>
      <h2 className="h2-bold">Create Product</h2>
      <div className="my-8">
        {' '}
        <ProductForm type="Create" />
      </div>
    </>
  );
};
export default CreateProductPage;
