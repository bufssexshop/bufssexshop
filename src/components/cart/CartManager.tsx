"use client";

import { useUiStore } from "@/store/useUiStore";
import { CartDrawer } from "./cartDrawer";

export const CartManager = () => {
  const { isCartOpen, closeCart } = useUiStore();

  return (
    <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
  );
};