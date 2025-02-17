'use server';
import { prisma } from '@/db/prisma';
import { converToPlainObject } from '../utils';
import { LATEST_PRODUCTS_LIMIT } from '../constants';

// Get the lastest products
export async function getLastestProdcuts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return converToPlainObject(data);
}
