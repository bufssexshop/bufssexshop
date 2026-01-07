import Link from 'next/link';
import { Product } from '@/types/product';
import { ShieldCheck, Sparkles, Truck, Zap, Droplets } from 'lucide-react';
import { RecentlyViewedSection } from '@/components/shop/RecentlyViewedSection';
import { productService } from '@/services/product.service';
import { ProductCard } from '@/components/shop/ProductCard';
import Image from 'next/image';

const HERO_IMG = "https://images.pexels.com/photos/8535751/pexels-photo-8535751.jpeg";

export default async function HomePage() {
  const { products } = await productService.getFiltered({ page: 1 });
  const featured = products.slice(0, 4);

  return (
    <main className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMG}
            alt="BUF'S Hero"
            fill
            priority
            quality={80}
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black" />
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-8xl md:text-[15rem] font-black text-white italic tracking-tighter leading-none uppercase mix-blend-difference">
            PLacer <br /> <span className="text-brand-pink">ELEVADO</span>
          </h1>
          <Link href="/products" className="inline-block mt-12 px-12 py-5 bg-brand-pink text-white font-black uppercase tracking-[0.3em] text-xs rounded-full hover:scale-105 transition-transform">
            Entrar a la Boutique
          </Link>
        </div>
      </section>

      {/* CATEGORÍAS CON GRADIENTES - OPTIMIZADO MOBILE */}
      <section className="py-8 md:py-20 px-4 container mx-auto">
        <div className="mb-6 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter">
            Explora por <span className="text-brand-pink">Categoría</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

          {/* Lencería */}
          <Link
            href="/products/lenceria"
            className="group relative h-54 md:h-87.5 overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-linear-to-br from-pink-600/20 via-purple-600/20 to-pink-800/20 border border-white/10 hover:border-brand-pink/50 transition-all duration-500 active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,45,146,0.15),transparent_70%)]" />
            <div className="relative h-full p-5 md:p-10 flex flex-col justify-between">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-brand-pink/20 flex items-center justify-center border border-brand-pink/30 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-brand-pink" />
              </div>
              <div>
                <h3 className="text-2xl md:text-4xl font-black text-white italic uppercase mb-1 md:mb-2">
                  Lencería
                </h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  Seduce con elegancia
                </p>
              </div>
            </div>
          </Link>

          {/* Juguetes */}
          <Link
            href="/products/juguetes"
            className="group relative h-45 md:h-87.5 overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-linear-to-br from-purple-600/20 via-pink-600/20 to-purple-800/20 border border-white/10 hover:border-purple-500/50 transition-all duration-500 active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(147,51,234,0.15),transparent_70%)]" />
            <div className="relative h-full p-5 md:p-10 flex flex-col justify-between">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl md:text-4xl font-black text-white italic uppercase mb-1 md:mb-2">
                  Juguetes
                </h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  Tecnología del placer
                </p>
              </div>
            </div>
          </Link>

          {/* Lubricantes */}
          <Link
            href="/products/lubricantes"
            className="group relative h-45 md:h-87.5 overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-linear-to-br from-blue-600/20 via-cyan-600/20 to-blue-800/20 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 active:scale-[0.98] md:col-span-1 col-span-1"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),transparent_70%)]" />
            <div className="relative h-full p-5 md:p-10 flex flex-col justify-between">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 group-hover:scale-110 transition-transform">
                <Droplets className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-2xl md:text-4xl font-black text-white italic uppercase mb-1 md:mb-2">
                  Lubricantes
                </h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  Suavidad premium
                </p>
              </div>
            </div>
          </Link>

        </div>
      </section>

      <RecentlyViewedSection />

      {/* SECTION 2: BENEFFITS (Minimalist & Luxury) */}
      <section className="py-16 md:py-24 bg-black border-y border-white/5">
        <div className="container mx-auto px-4">
          {/* Grid: 2 columnas en móvil, 4 en desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 md:gap-16">

            {/* Privacidad */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center text-brand-pink border border-white/10 group-hover:border-brand-pink/50 transition-colors duration-500">
                <ShieldCheck className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 md:mt-6 text-white font-black italic uppercase tracking-widest text-[10px] md:text-[11px]">Privacidad Total</h3>
              <p className="mt-3 md:mt-4 text-gray-500 text-[9px] md:text-[10px] uppercase leading-relaxed tracking-wider px-1 md:px-4">
                Empaques 100% neutros sin logos ni descripciones.
              </p>
            </div>

            {/* Logística VIP */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center text-brand-pink border border-white/10 group-hover:border-brand-pink/50 transition-colors duration-500">
                <Truck className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 md:mt-6 text-white font-black italic uppercase tracking-widest text-[10px] md:text-[11px]">Logística VIP</h3>
              <p className="mt-3 md:mt-4 text-gray-500 text-[9px] md:text-[10px] uppercase leading-relaxed tracking-wider px-1 md:px-4">
                Envíos el mismo día con trazabilidad real.
              </p>
            </div>

            {/* Curaduría Elite */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center text-brand-pink border border-white/10 group-hover:border-brand-pink/50 transition-colors duration-500">
                <Sparkles className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 md:mt-6 text-white font-black italic uppercase tracking-widest text-[10px] md:text-[11px]">Curaduría Elite</h3>
              <p className="mt-3 md:mt-4 text-gray-500 text-[9px] md:text-[10px] uppercase leading-relaxed tracking-wider px-1 md:px-4">
                Solo marcas con materiales certificados.
              </p>
            </div>

            {/* Asesoría Íntima */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center text-brand-pink border border-white/10 group-hover:border-brand-pink/50 transition-colors duration-500">
                <Zap className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 md:mt-6 text-white font-black italic uppercase tracking-widest text-[10px] md:text-[11px]">Asesoría Íntima</h3>
              <p className="mt-3 md:mt-4 text-gray-500 text-[9px] md:text-[10px] uppercase leading-relaxed tracking-wider px-1 md:px-4">
                Expertos disponibles para guiar tu compra.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 md:py-32 bg-[#050505]">
        <div className="container mx-auto px-4">
          {/* Header centrado y bonito */}
          <div className="text-center mb-10 md:mb-16">
            <span className="text-brand-pink font-black text-xs tracking-[0.3em] uppercase inline-block mb-4">
              Recién llegados
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white italic uppercase tracking-tighter mb-6 md:mb-8">
              Nuevas <span className="text-brand-pink">Joyas</span>
            </h2>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-brand-pink text-white px-8 py-3 md:px-10 md:py-4 rounded-full text-xs md:text-sm font-black uppercase tracking-widest hover:bg-pink-600 transition-all shadow-lg shadow-brand-pink/20 active:scale-95"
            >
              Ver Catálogo
              <span className="text-lg">→</span>
            </Link>
          </div>

          {/* Grid de productos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}