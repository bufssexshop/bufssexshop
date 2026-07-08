'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X, Clock } from 'lucide-react';
import { useSearchHistory } from '@/hooks/useSearchHistory';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { searches, addSearch, removeSearch } = useSearchHistory();

  const currentSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [showHistory, setShowHistory] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Cerrar historial al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    addSearch(trimmed);
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', trimmed);
    params.set('page', '1');
    router.push(`/products?${params.toString()}`);
    setShowHistory(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div ref={searchRef} className="relative z-50 h-10">
      <form onSubmit={handleSubmit} className="relative h-full">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowHistory(true)}
          placeholder="Buscar..."
          className="bg-white/5 border border-white/10 rounded-full pl-4 pr-10 py-2 text-sm text-white
                    placeholder:text-gray-500 outline-none transition-all duration-300
                    w-40 focus:w-64 focus:bg-brand-dark focus:border-brand-pink focus:shadow-[0_0_20px_rgba(255,45,146,0.1)]
                    absolute right-0 top-0 h-full"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-pink transition-colors z-10"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>

      {showHistory && searches.length > 0 && (
        <>
          <div className="absolute top-[calc(100%+0.5rem)] right-0 w-80 bg-[#0a0a0a] border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50">
          <div className="p-3 border-b border-white/5">
            <p className="text-xs font-black uppercase tracking-widest text-gray-500">
              Búsquedas recientes
            </p>
          </div>
          <ul className="max-h-60 overflow-y-auto">
            {searches.map((query: string, index: number) => (
              <li key={index} className="relative group">
                <button
                  onClick={() => {
                    setSearchTerm(query);
                    handleSearch(query);
                  }}
                  className="w-full px-4 py-3 pr-10 flex items-center gap-3 hover:bg-white/5 transition-colors"
                >
                  <Clock size={14} className="text-gray-500" />
                  <span className="text-sm text-gray-300 group-hover:text-white">
                    {query}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => removeSearch(query)}
                  aria-label={`Eliminar búsqueda "${query}"`}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 transition-all"
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        </>
      )}
    </div>
  );
}