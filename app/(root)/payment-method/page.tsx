import { auth } from '@/auth';
import { Metadata } from 'next';
import CheckoutSteps from '@/components/shared/check-steps';
import PaymentMethodForm from './payment-method-form';
import { getUserById } from '@/lib/actions/user.actions';
export const metadata: Metadata = {
  title: 'Payment Method',
};

const PaymentMthodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  const currentUser = await getUserById(userId as string);

  if (!userId) {
    throw new Error('User ID not found');
  }
  return (
    <>
      <CheckoutSteps current={2} />
      <PaymentMethodForm
        preferredPaymentMethod={currentUser.paymentMethod}
      ></PaymentMethodForm>
    </>
  );
};

export default PaymentMthodPage;
