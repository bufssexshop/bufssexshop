"use client";

import { X } from 'lucide-react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';

export const ActiveFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const removeFilter = (key: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.delete(key);
    newParams.set('page', '1');

    const slug = params.slug as string[] || [];
    const basePath = slug.length > 0 ? `/products/${slug.join('/')}` : '/products';

    router.push(`${basePath}?${newParams.toString()}`);
  };

  const filters = [
    { key: 'search', label: `Búsqueda: ${searchParams.get('search')}` },
    { key: 'min', label: `Mín: $${searchParams.get('min')}` },
    { key: 'max', label: `Máx: $${searchParams.get('max')}` },
  ].filter(f => searchParams.has(f.key));

  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => removeFilter(filter.key)}
          className="group flex items-center gap-2 bg-white/5 border border-white/10 hover:border-brand-pink/50 px-4 py-2 rounded-2xl transition-all"
        >
          <span className="text-[10px] font-black text-gray-400 group-hover:text-brand-pink uppercase tracking-widest transition-colors">
            {filter.label}
          </span>
          <X size={12} className="text-gray-600 group-hover:text-brand-pink" />
        </button>
      ))}

      <button
        onClick={() => {
           const slug = params.slug as string[] || [];
           router.push(slug.length > 0 ? `/products/${slug.join('/')}` : '/products');
        }}
        className="text-[9px] font-black text-brand-pink/50 hover:text-brand-pink uppercase tracking-[0.2em] ml-2 transition-colors"
      >
        Limpiar Todo
      </button>
    </div>
  );
};