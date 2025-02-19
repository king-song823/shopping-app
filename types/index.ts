import { z } from 'zod';

import {
  cartItemSchema,
  insertCartSchema,
  insertProductSchema,
} from '@/lib/validator';

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  createdAt: Date;
  rating: string;
  numReviews: number;
};

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
