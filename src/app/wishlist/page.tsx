'use client';

import { useWishlist } from '@/hooks/useWishlist';
import { ProductCard } from '@/components/shop/ProductCard';
import { Heart, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function WishlistPage() {
  const { items, clear, count } = useWishlist();
  const [isLoading, setIsLoading] = useState(true);

  // Simular carga inicial para evitar flash
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#050505] pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 border border-white/10">
              <Heart size={40} className="text-brand-pink animate-pulse" />
            </div>
            <p className="text-gray-400">Cargando favoritos...</p>
          </div>
        </div>
      </main>
    );
  }

  if (count === 0) {
    return (
      <main className="min-h-screen bg-[#050505] pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 border border-white/10">
              <Heart size={40} className="text-gray-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white italic uppercase mb-4 tracking-tighter">
              Sin Favoritos
            </h1>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Aún no has guardado ningún producto en tu lista de deseos.
              Explora nuestro catálogo y guarda tus favoritos para después.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-brand-pink text-white px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:bg-pink-600 transition-all shadow-lg shadow-brand-pink/20 active:scale-95"
            >
              <ArrowLeft size={18} />
              Explorar Productos
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
              Mis <span className="text-brand-pink drop-shadow-[0_0_15px_rgba(255,45,146,0.4)]">Favoritos</span>
            </h1>
            <p className="text-gray-400 mt-4 text-lg">
              {count} {count === 1 ? 'producto guardado' : 'productos guardados'}
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/products"
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all text-sm font-bold"
            >
              <ArrowLeft size={16} />
              Seguir comprando
            </Link>

            <button
              onClick={() => {
                if (confirm('¿Seguro que quieres eliminar todos tus favoritos?')) {
                  clear();
                }
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-gray-400 hover:text-red-500 hover:border-red-500/50 transition-all text-sm font-bold"
            >
              <Trash2 size={16} />
              Limpiar todo
            </button>
          </div>
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* CTA Bottom */}
        <div className="mt-16 p-8 md:p-12 bg-linear-to-br from-brand-pink/10 via-purple-600/10 to-brand-pink/10 border border-white/10 rounded-[3rem] text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase mb-4">
            ¿Listo para dar el siguiente paso?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Agrega tus favoritos al carrito y disfruta de envíos discretos a toda Colombia.
          </p>
          <Link
            href="/products"
            className="inline-block bg-brand-pink text-white px-10 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:bg-pink-600 transition-all shadow-xl shadow-brand-pink/20 active:scale-95"
          >
            Continuar Explorando
          </Link>
        </div>
      </div>
    </main>
  );
}