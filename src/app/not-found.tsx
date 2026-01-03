import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-white font-black italic text-6xl md:text-8xl mb-4 tracking-tighter">
          404
        </h1>
        <p className="text-gray-400 text-xl md:text-2xl font-medium italic mb-8">
          Esta página se perdió en el placer
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-3 bg-brand-pink text-white px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:bg-pink-600 transition-all shadow-xl shadow-brand-pink/20 active:scale-95"
        >
          <ArrowLeft size={20} />
          Volver al catálogo
        </Link>
      </div>
    </main>
  );
}