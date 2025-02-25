import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getMyOrders } from '@/lib/actions/order.action';
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import Pagination from '@/components/shared/pagination';
export const metadata: Metadata = {
  title: 'My Orders',
};

const OrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await props.searchParams;
  const orders = await getMyOrders({
    page: Number(page) || 1,
  });

  return (
    <>
      {' '}
      <div className="space-y-2">
        <h2 className="h2-bold">Orders</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>DATE</TableHead>
                <TableHead>TOTAL PRICE</TableHead>
                <TableHead>PAID</TableHead>
                <TableHead>DELIVERED</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.data.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{formatId(order.id)}</TableCell>
                  <TableCell>
                    {' '}
                    {formatDateTime(order.createdAt).dateTime}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(Number(order.totalPrice))}
                  </TableCell>
                  <TableCell>
                    {order.isPaid && order.paidAt
                      ? formatDateTime(order.paidAt).dateTime
                      : 'not paid'}
                  </TableCell>
                  <TableCell>
                    {order.isDelivered && order.deliveredAt
                      ? formatDateTime(order.deliveredAt).dateTime
                      : 'not delivered'}
                  </TableCell>
                  <TableCell>
                    <Link href={`/order/${order.id}`}>
                      <span className="px-2">Details</span>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {(orders.totalPages as number) > 1 && (
            <Pagination
              page={Number(page) || 1}
              totalPages={orders?.totalPages as number}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
