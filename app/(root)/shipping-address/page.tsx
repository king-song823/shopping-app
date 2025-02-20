import { auth } from '@/auth';
import { getMyCart } from '@/lib/actions/cart.action';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ShippingAddressForm from './shipping-address-form';
export const metadata: Metadata = {
  title: 'Shipping Address',
};
const ShippingAddressPage = async () => {
  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) redirect('/cart');
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) throw new Error('User ID not found');

  return (
    <>
      <ShippingAddressForm address={null}></ShippingAddressForm>
    </>
  );
};

export default ShippingAddressPage;
