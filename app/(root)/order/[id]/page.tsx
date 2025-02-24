import { getOrderById } from '@/lib/actions/order.action';
import { notFound } from 'next/navigation';
import OrderDetailsTable from './order-detail-table';
import { Order } from '@/types';
export const metadata = {
  title: 'Order Details',
};

const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const params = await props.params;

  const { id } = params;

  const order = (await getOrderById(id)) as unknown as Order;
  if (!order) notFound();

  return <OrderDetailsTable order={order} />;
};

export default OrderDetailsPage;
