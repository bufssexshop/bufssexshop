'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Product } from '@/types/product';
import { ProductImageGallery } from '@/components/shop/ProductImageGallery';
import { ProductActions } from '@/components/shop/ProductActions';
import { Truck, EyeOff, MessageCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

const productCache = new Map<string, Product>();

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(productCache.get(id) || null);
  const [loading, setLoading] = useState(!productCache.has(id));
  const [error, setError] = useState(false);

  useEffect(() => {
    if (productCache.has(id)) {
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://localhost:8000';
        const res = await fetch(`${API_URL}/products/${id}`);

        if (!res.ok) throw new Error('Producto no encontrado');

        const data = await res.json();
        const productData = data.product;

        productCache.set(id, productData);
        setProduct(productData);
      } catch (err) {
        console.error('Error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-white text-center py-20">
        Producto no encontrado
      </div>
    );
  }

  const whatsappMessage = `Hola, tengo interés en este producto:
    Nombre: ${product.name}
    Ref: ${product.code}
    Link: https://www.bufssexshop.com/products/detail/${product._id}`;

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        <div className="lg:w-1/2">
          <ProductImageGallery
            images={[product.image, product.image2].filter((img): img is string => Boolean(img))}
          />
        </div>

        <div className="lg:w-1/2 flex flex-col">
          <header className="mb-8">
            <nav className="flex gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-pink mb-6">
              <Link href="/products" className="hover:text-white transition-colors">Catálogo</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-500">{product.category}</span>
            </nav>

            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic uppercase leading-[0.85]">
              {product.name}
            </h1>
            <p className="text-gray-600 mt-6 font-bold tracking-widest text-xs uppercase">
              Referencia: <span className="text-gray-400">{product.code}</span>
            </p>
          </header>

          <div className="flex items-center gap-6 mb-10">
            <span className="text-5xl font-black text-white italic tracking-tighter">
              {formatPrice(product.price)}
            </span>
            {product.promotion && (
              <span className="px-3 py-1 bg-brand-pink text-white text-[10px] font-black uppercase italic rounded-full">
                Oferta Especial
              </span>
            )}
          </div>

          <div className="prose prose-invert prose-pink max-w-none mb-12">
            <div
              dangerouslySetInnerHTML={{ __html: product.details || '' }}
              className="text-gray-400 text-lg leading-relaxed italic font-medium"
            />
          </div>

          <ProductActions product={product} />

          <a
            href={`https://wa.me/573044580143?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-3 py-4 rounded-2xl border border-white/10 text-gray-400 font-bold text-sm hover:bg-white/5 transition-all"
          >
            <MessageCircle size={20} className="text-green-500" />
            ¿Tienes dudas? Pregúntanos por WhatsApp
          </a>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-12 border-t border-white/5">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand-pink/10 transition-colors">
                <EyeOff size={20} className="text-brand-pink" />
              </div>
              <div>
                <p className="text-white text-[10px] font-black uppercase tracking-widest">Privacidad Total</p>
                <p className="text-gray-500 text-[10px]">Empaque sin marcas ni logos</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand-pink/10 transition-colors">
                <Truck size={20} className="text-brand-pink" />
              </div>
              <div>
                <p className="text-white text-[10px] font-black uppercase tracking-widest">Envío Rápido</p>
                <p className="text-gray-500 text-[10px]">A toda Colombia con discreción</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}