'use server';

import { CartItem } from '@/types';
import { converToPlainObject, formatError, round2 } from '../utils';
import { cookies } from 'next/headers';
import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { cartItemSchema, insertCartSchema } from '../validator';
import { revalidatePath } from 'next/cache';

// Calculate cart price based on items
const calcPrice = (items: CartItem[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 10),
    taxPrice = round2(0.15 * itemsPrice),
    totalPrice = round2(itemsPrice + taxPrice + shippingPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export async function addItemToCart(data: CartItem) {
  try {
    // Check for session car cookie
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCartId) throw new Error('Cart Session not found');
    // Get session and user ID
    const session = await auth();
    const userId = session?.user?.id ? session.user.id : undefined;
    // Parse and validate submitted item data
    const item = cartItemSchema.parse(data);
    // Find product from database
    const product = await prisma.product.findFirst({
      where: {
        id: item.productId,
      },
    });
    console.log('product', product);
    if (!product) throw new Error('Product not found');
    // Get cart from database
    const cart = await getMyCart();

    if (!cart) {
      // Create new cart object
      const newCart = insertCartSchema.parse({
        userId: userId || null,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any;
      // Add to database
      await prisma.cart.create({
        data: newCart,
      });
      // Revalidate product page
      revalidatePath(`/product/${product.slug}`);
      return {
        success: true,
        message: 'Item added to cart successfully',
      };
    }

    // Revalidate product page
    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: 'Item added to cart successfully',
    };
  } catch (error) {
    return {
      success: false,
      messages: formatError(error),
    };
  }
}

// Get user cart from database
export async function getMyCart() {
  // Check for cart cookie
  const sessionCartId = (await cookies()).get('sessionCartId')?.value;
  if (!sessionCartId) throw new Error('Cart session not found');

  // Get session and user ID
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;
  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  // Convert decimals and return
  return converToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}
