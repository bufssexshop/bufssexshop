'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types/product';

const STORAGE_KEY = 'bufs_recently_viewed';
const MAX_ITEMS = 12;
const EXPIRY_DAYS = 30;

interface StoredProduct {
  product: Product;
  viewedAt: number;
}

export function useRecentlyViewed() {
  const [items, setItems] = useState<Product[]>([]);

  // Cargar del localStorage al montar (solo cliente)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: StoredProduct[] = JSON.parse(stored);
        const now = Date.now();
        const expiryTime = EXPIRY_DAYS * 24 * 60 * 60 * 1000;

        // Filtrar productos expirados
        const valid = parsed.filter(
          item => now - item.viewedAt < expiryTime
        );

        setItems(valid.map(item => item.product));
      } catch (e) {
        console.error('Error parsing recently viewed:', e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Agregar producto visto
  const addProduct = (product: Product) => {
    if (typeof window === 'undefined') return;

    setItems(prev => {
      // Remover si ya existe
      const filtered = prev.filter(p => p._id !== product._id);

      // Agregar al inicio
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);

      // Guardar en localStorage con timestamp
      const toStore: StoredProduct[] = updated.map(p => ({
        product: p,
        viewedAt: Date.now(),
      }));

      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));

      return updated;
    });
  };

  // Limpiar historial
  const clear = () => {
    setItems([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return {
    items,
    addProduct,
    clear,
    count: items.length,
  };
}