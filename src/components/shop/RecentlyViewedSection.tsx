'use client';

import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { ProductCard } from '@/components/shop/ProductCard';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export const RecentlyViewedSection = () => {
  const { items, count } = useRecentlyViewed();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  // ✅ useEffect ANTES del return condicional
  useEffect(() => {
    const checkOverflow = () => {
      if (scrollRef.current) {
        const hasScroll = scrollRef.current.scrollWidth > scrollRef.current.clientWidth;
        setHasOverflow(hasScroll);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => window.removeEventListener('resize', checkOverflow);
  }, [items]);

  // ✅ return condicional DESPUÉS de los hooks
  if (count === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#050505] border-y border-white/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Clock size={20} className="text-brand-pink" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter">
                Vistos <span className="text-brand-pink">Recientemente</span>
              </h2>
              <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mt-1">
                Tus últimos {count} productos
              </p>
            </div>
          </div>

          {/* Botones de navegación - Desktop - Solo si hay overflow */}
          {hasOverflow && (
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Carousel */}
        <div className="relative group">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {items.map((product) => (
              <div key={product._id} className="shrink-0 w-64 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Gradient Overlays - Desktop - Solo si hay overflow */}
          {hasOverflow && (
            <>
              <div className="hidden md:block absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-[#050505] to-transparent pointer-events-none" />
              <div className="hidden md:block absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-[#050505] to-transparent pointer-events-none" />
            </>
          )}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};