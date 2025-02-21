import { auth } from '@/auth';
import { getMyCart } from '@/lib/actions/cart.action';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ShippingAddressForm from './shipping-address-form';
import CheckoutSteps from '@/components/shared/check-steps';
import { getUserById } from '@/lib/actions/user.actions';
import { ShippingAddress } from '@/types';

export const metadata: Metadata = {
  title: 'Shipping Address',
};
const ShippingAddressPage = async () => {
  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) redirect('/cart');
  const session = await auth();

  const user = await getUserById(session?.user?.id as string);

  return (
    <>
      <CheckoutSteps current={1} />
      <ShippingAddressForm
        address={user.address as ShippingAddress}
      ></ShippingAddressForm>
    </>
  );
};

export default ShippingAddressPage;
