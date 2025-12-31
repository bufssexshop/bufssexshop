import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  code: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product | CartItem) => void;
  removeItem: (productId: string) => void;
  deleteFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item._id === product._id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          const newItem: CartItem = {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            code: product.code,
            quantity: 1,
          };
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (productId) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item._id === productId);

        if (existingItem && existingItem.quantity > 1) {
          set({
            items: currentItems.map(item =>
              item._id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          });
        } else {
          set({
            items: currentItems.filter(item => item._id !== productId)
          });
        }
      },

      deleteFromCart: (productId) => set({
        items: get().items.filter(item => item._id !== productId)
      }),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
    }),
    { name: 'bufs-cart-storage' }
  )
);