import Link from 'next/link';
import { Product } from '@/types/product';
import { ShieldCheck, Sparkles, Truck, Zap } from 'lucide-react';
import { productService } from '@/services/product.service';
import { ProductCard } from '@/components/shop/ProductCard';

const HERO_IMG = "https://images.pexels.com/photos/8535751/pexels-photo-8535751.jpeg";
const SEDUCCION_IMG = "https://images.pexels.com/photos/11104885/pexels-photo-11104885.jpeg";
const TECH_IMG = "https://images.pexels.com/photos/11104883/pexels-photo-11104883.jpeg";

export default async function HomePage() {
  const { products } = await productService.getFiltered({ page: 1 });
  const featured = products.slice(0, 4);

  return (
    <main className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMG}
            className="w-full h-full object-cover opacity-40"
            alt="BUF'S Hero"
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

      {/* CATEGORÍAS EDITORIALES */}
      <section className="py-10 px-4 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href="/products/lenceria" className="group relative h-175 overflow-hidden rounded-[3rem]">
          <img src={SEDUCCION_IMG} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-black/40 p-12 flex flex-col justify-end">
            <h2 className="text-5xl font-black text-white italic uppercase">Seducción</h2>
          </div>
        </Link>

        <Link href="/products/juguetes" className="group relative h-175 overflow-hidden rounded-[3rem]">
          <img src={TECH_IMG} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-black/40 p-12 flex flex-col justify-end">
            <h2 className="text-5xl font-black text-white italic uppercase">Vibraciones</h2>
          </div>
        </Link>
      </section>

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

      {/* SECTION 3: FEATURED PRODUCTS */}
      <section className="py-32 bg-[#050505]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-brand-pink font-black text-xs tracking-[0.3em] uppercase">Recién llegados</span>
              <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter mt-2">Nuevas Joyas</h2>
            </div>
            <Link href="/products" className="text-gray-500 hover:text-white font-bold text-xs uppercase tracking-widest border-b border-gray-800 pb-2 transition-colors">
              Ver todo el catálogo
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}