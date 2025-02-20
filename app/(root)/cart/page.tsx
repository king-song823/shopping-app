import { Metadata } from 'next';
import { getMyCart } from '@/lib/actions/cart.action';
import CartTable from './cart-table';
export const metadata: Metadata = {
  title: 'Shopping Cart',
};
const Cartpage = async () => {
  const cart = await getMyCart();
  return (
    <>
      <CartTable cart={cart} />
    </>
  );
};

export default Cartpage;
