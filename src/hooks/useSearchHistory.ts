'use client';

import { useState } from 'react';

const STORAGE_KEY = 'bufs_search_history';
const MAX_ITEMS = 10;

// Función helper para leer del localStorage
const getStoredSearches = (): string[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Error parsing search history:', e);
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
};

// Función helper para guardar en localStorage
const saveSearches = (searches: string[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
};

export function useSearchHistory() {
  // Lazy initialization
  const [searches, setSearches] = useState<string[]>(getStoredSearches);

  // Agregar búsqueda
  const addSearch = (query: string) => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed || trimmed.length < 2) return;

    setSearches(prev => {
      // Remover si ya existe
      const filtered = prev.filter(s => s !== trimmed);

      // Agregar al inicio
      const updated = [trimmed, ...filtered].slice(0, MAX_ITEMS);

      saveSearches(updated);
      return updated;
    });
  };

  // Remover búsqueda específica
  const removeSearch = (query: string) => {
    setSearches(prev => {
      const updated = prev.filter(s => s !== query);
      saveSearches(updated);
      return updated;
    });
  };

  // Limpiar todo
  const clear = () => {
    setSearches([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return {
    searches,
    addSearch,
    removeSearch,
    clear,
    count: searches.length,
  };
}