'use server';
import { prisma } from '@/db/prisma';
import { converToPlainObject, formatError, handleError } from '../utils';
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from '../constants';
import { revalidatePath } from 'next/cache';

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

// Get single product by slug
export async function getProductBySlug(slug: string) {
  return prisma.product.findFirst({
    where: {
      slug,
    },
  });
}

// Get all products
export async function getAllProducts({
  limit = PAGE_SIZE,
  page,
}: {
  query: string;
  limit?: number;
  page: number;
  category: string;
}) {
  try {
    const data = await prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    const dataCount = await prisma.product.count();
    console.log(
      11,
      handleError('', {
        data: [],
        totalPages: 0,
      })
    );

    return {
      data,
      totalPages: Math.ceil(dataCount / limit),
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
      data: [],
      totalPages: 0,
    };
  }
}

// Delete Product
export async function deleteProduct(id: string) {
  try {
    const productExists = await prisma.product.findFirst({
      where: { id },
    });

    if (!productExists) throw new Error('Product not found');

    await prisma.product.delete({ where: { id } });

    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Product deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
