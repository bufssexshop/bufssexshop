'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { toast } from 'sonner';

const STORAGE_KEY = 'bufs_wishlist';

const getStoredWishlist = (): Product[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Error parsing wishlist:', e);
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
};

const saveWishlist = (items: Product[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export function useWishlist() {
  // Lazy initialization
  const [items, setItems] = useState<Product[]>(getStoredWishlist);

  useEffect(() => {
    const handleStorageChange = () => {
      setItems(getStoredWishlist());
    };

    window.addEventListener('storage', handleStorageChange);

    window.addEventListener('wishlist-updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlist-updated', handleStorageChange);
    };
  }, []);

  const isInWishlist = (productId: string) => {
    return items.some(item => item._id === productId);
  };

  const toggleProduct = (product: Product) => {
    setItems(prev => {
      const exists = prev.some(p => p._id === product._id);

      let updated: Product[];

      if (exists) {
        // Remover
        updated = prev.filter(p => p._id !== product._id);
        toast.success('Removido de favoritos', {
          description: product.name
        });
      } else {
        // Agregar
        updated = [...prev, product];
        toast.success('Agregado a favoritos', {
          description: product.name
        });
      }

      saveWishlist(updated);

      window.dispatchEvent(new Event('wishlist-updated'));

      return updated;
    });
  };

  // Remover producto específico
  const removeProduct = (productId: string) => {
    setItems(prev => {
      const updated = prev.filter(p => p._id !== productId);
      saveWishlist(updated);

      window.dispatchEvent(new Event('wishlist-updated'));

      return updated;
    });
  };

  // Limpiar todo
  const clear = () => {
    setItems([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);

      window.dispatchEvent(new Event('wishlist-updated'));
    }
  };

  return {
    items,
    toggleProduct,
    removeProduct,
    isInWishlist,
    clear,
    count: items.length,
  };
}