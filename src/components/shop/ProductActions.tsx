"use client";

import { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '@/types/product';
import { toast } from 'sonner';
import { useCartStore } from '@/store/useCartStore';
import { useUiStore } from '@/store/useUiStore';

export const ProductActions = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((state) => state.addItem);
  const openCart = useUiStore((state) => state.openCart);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }

    toast.info(`${quantity} unidad(es) agregadas`, {
      description: `${product.name} ya está en tu bolsa.`
    });

    openCart();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="p-3 text-gray-400 hover:text-white transition-colors"
        >
          <Minus size={16} />
        </button>
        <span className="w-12 text-center text-white font-black italic">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="p-3 text-gray-400 hover:text-white transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      <button
        onClick={handleAdd}
        className="flex-1 bg-brand-pink text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-pink-600 transition-all shadow-xl shadow-brand-pink/20 active:scale-95"
      >
        <ShoppingCart size={20} />
        Agregar al carrito
      </button>
    </div>
  );
};