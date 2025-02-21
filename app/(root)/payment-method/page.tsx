import { auth } from '@/auth';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Payment Method',
};

const PaymentMthodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('User ID not found');
  }
  return <>PaymentMethod</>;
};

export default PaymentMthodPage;
