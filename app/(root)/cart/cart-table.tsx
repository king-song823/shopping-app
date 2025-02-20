'use client';

import { Cart } from '@/types';
import Link from 'next/link';

const CartTable = ({ cart }: { cart?: Cart }) => {
  return (
    <>
      <h1 className=" py-4 h2-bold">Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3"></div>
        </div>
      )}
    </>
  );
};

export default CartTable;
