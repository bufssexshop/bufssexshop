"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { NAVIGATION_MAP } from '@/constants/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const ShopSidebar = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string[] || [];

  const currentCategory = slug[0];
  const currentSubcategory = slug[1];

  const [openCategory, setOpenCategory] = useState<string | null>(currentCategory || null);
  const [prevCategory, setPrevCategory] = useState<string | null>(currentCategory || null);

  if (currentCategory !== prevCategory) {
    setPrevCategory(currentCategory);
    setOpenCategory(currentCategory);
  }

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const [min, setMin] = useState(searchParams.get('min') || '');
  const [max, setMax] = useState(searchParams.get('max') || '');

  const applyPriceFilter = () => {
    const basePath = slug.length > 0 ? `/products/${slug.join('/')}` : '/products';

    const query = new URLSearchParams(searchParams.toString());

    if (min) query.set('min', min); else query.delete('min');
    if (max) query.set('max', max); else query.delete('max');
    query.set('page', '1');

    router.push(`${basePath}?${query.toString()}`);
  };

  return (
    <aside className="w-full md:w-72 space-y-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 shadow-2xl">
        <h3 className="text-white font-black text-sm md:text-2xl mb-4 md:mb-6 tracking-widest italic px-2">
          EXPLORA
        </h3>

        <div className="space-y-3">
          {NAVIGATION_MAP.map((item) => {
            const isOpen = openCategory === item.category;
            const isCategoryActive = currentCategory === item.category;

            return (
              <div key={item.id} className="overflow-hidden">
                <button
                  onClick={() => toggleCategory(item.category)}
                  className={cn(
                    "flex w-full items-center justify-between p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 group",
                    isCategoryActive
                      ? "bg-brand-pink text-white shadow-lg shadow-pink-500/20"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  )}
                >
                  <span className={cn("font-bold text-[10px] md:text-sm tracking-tight", isOpen && "text-white")}>
                    {item.label.toUpperCase()}
                  </span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    isOpen ? "rotate-180" : "opacity-50"
                  )} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-4 mt-2 space-y-1 border-l-2 border-white/10"
                    >
                      {item.options.map((opt) => {
                        const isSubActive = currentSubcategory === opt.route;

                        return (
                          <li key={opt.route}>
                            <Link
                              href={`/products/${item.category}/${opt.route}`}
                              className={cn(
                                "block py-2 px-4 text-xs font-medium transition-all duration-300",
                                isSubActive
                                  ? "text-brand-pink translate-x-1 font-black" // Indicador visual activo
                                  : "text-gray-500 hover:text-brand-pink hover:translate-x-1"
                              )}
                            >
                              {opt.label}
                            </Link>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sección de Filtro de Precios */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 shadow-2xl">
        <h3 className="text-white font-black text-sm mb-6 tracking-[0.2em] italic px-2 uppercase opacity-50">
          Filtrar por precio
        </h3>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Mín"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-[10px] text-white outline-none focus:border-brand-pink/50 transition-all placeholder:text-gray-600"
            />
            <span className="text-gray-600 font-bold">—</span>
            <input
              type="number"
              placeholder="Máx"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-[10px] text-white outline-none focus:border-brand-pink/50 transition-all placeholder:text-gray-600"
            />
          </div>

          <button
            onClick={applyPriceFilter}
            className="w-full bg-brand-pink/10 hover:bg-brand-pink text-brand-pink hover:text-white py-3 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-brand-pink/5 active:scale-95"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>

      {/* Discretion Card */}
      <div className="bg-linear-to-br from-brand-pink/20 to-transparent border border-brand-pink/20 rounded-[2.5rem] p-8">
        <div className="flex items-center gap-3 mb-4">
           <ShieldCheck className="text-brand-pink h-6 w-6" />
           <span className="text-white font-black text-sm tracking-widest italic">DISCRECIÓN</span>
        </div>
        <p className="text-gray-400 text-xs leading-relaxed font-medium">
          Sabemos que tu privacidad es lo primero. Todos nuestros envíos se entregan en cajas neutras, <span className="text-white">sin logos ni nombres de la tienda.</span>
        </p>
      </div>
    </aside>
  );
};