"use client";

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PaginatedProducts } from '@/services/product.service';

export const Pagination = ({ data }: { data: PaginatedProducts }) => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const { page, totalPages, hasNextPage } = data;

  if (totalPages <= 1) return null;

  const handlePageChange = (newPage: number) => {
    const newQuery = new URLSearchParams(searchParams.toString());

    newQuery.set('page', newPage.toString());

    const slug = params.slug as string[] || [];
    const basePath = slug.length > 0 ? `/products/${slug.join('/')}` : '/products';

    router.push(`${basePath}?${newQuery.toString()}`);
  };

  const getPageNumbers = () => {
    const pages = [];
    const showMax = 3;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (page < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="mt-20 mb-10 flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 disabled:opacity-10 hover:bg-white/10 transition-all active:scale-90"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-1.5">
          {getPageNumbers().map((p, idx) => (
            <button
              key={idx}
              onClick={() => typeof p === 'number' && handlePageChange(p)}
              disabled={p === '...'}
              className={cn(
                "w-11 h-11 rounded-xl text-[11px] font-black transition-all border duration-300",
                page === p
                  ? "bg-brand-pink border-brand-pink text-white shadow-lg shadow-brand-pink/20"
                  : p === '...'
                    ? "bg-transparent border-transparent text-gray-600 cursor-default"
                    : "bg-white/5 border-white/10 text-gray-500 hover:text-white hover:bg-white/10"
              )}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!hasNextPage}
          className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 disabled:opacity-10 hover:bg-white/10 transition-all active:scale-90"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">
        Mostrando <span className="text-white">{(page - 1) * 12 + 1} - {Math.min(page * 12, data.totalProducts)}</span> de <span className="text-white">{data.totalProducts}</span> resultados
      </p>
    </div>
  );
};