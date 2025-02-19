'use client';
import { CartItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { addItemToCart } from '@/lib/actions/cart.action';

const AddToCart = ({ item }: { item: Omit<CartItem, 'cartId'> }) => {
  const router = useRouter();
  const { toast } = useToast();
  const handleAddToCart = async () => {
    // addItemCart
    const res = await addItemToCart(item);

    if (!res.success) {
      toast({
        variant: 'destructive',
        description: res.messages,
      });
      return;
    }

    toast({
      description: `${item.name} added to the cart`,
      action: (
        <ToastAction
          className="bg-primary text-white hover:bg-gray-800"
          onClick={() => router.push('/cart')}
          altText="Go to cart"
        >
          Go to cart
        </ToastAction>
      ),
    });
  };
  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus />
      Add to cart
    </Button>
  );
};

export default AddToCart;
