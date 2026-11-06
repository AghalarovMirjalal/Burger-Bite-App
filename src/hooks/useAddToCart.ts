import { useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import type { Burger } from '../data/burgers';

export function useAddToCart() {
  const { add } = useCart();
  const toast = useToast();

  return useCallback(
    (burger: Burger, qty = 1) => {
      add(burger.id, qty);
      toast(qty > 1 ? `${qty} × ${burger.name} added to cart` : `${burger.name} added to cart`);
    },
    [add, toast],
  );
}
