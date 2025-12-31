import { productService } from '@/services/product.service';
import { ProductImageGallery } from '@/components/shop/ProductImageGallery';
import { ProductActions } from '@/components/shop/ProductActions';
import { Truck, EyeOff, MessageCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const product = await productService.getProductById(resolvedParams.id);

  if (!product) return <div className="text-white text-center py-20">Producto no encontrado</div>;

  const whatsappMessage = `Hola, tengo interés en este producto:
    Nombre: ${product.name}
    Ref: ${product.code}
    Link: https://www.bufssexshop.com/products/detail/${product._id}`;

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

        {/* LADO IZQUIERDO: GALERÍA (La crearemos a continuación) */}
        <div className="lg:w-1/2">
          <ProductImageGallery
            images={[product.image, product.image2].filter((img): img is string => Boolean(img))}
          />
        </div>

        {/* LADO DERECHO: INFO */}
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

          {/* DESCRIPCIÓN USANDO PROSE PARA EL HTML */}
          <div className="prose prose-invert prose-pink max-w-none mb-12">
            <div
              dangerouslySetInnerHTML={{ __html: product.details || '' }}
              className="text-gray-400 text-lg leading-relaxed italic font-medium"
            />
          </div>

          {/* ACCIONES (Contador y Carrito) */}
          <ProductActions product={product} />

          {/* WHATSAPP INTEGRADO */}
          <a
            href={`https://wa.me/573044580143?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            className="mt-6 flex items-center justify-center gap-3 py-4 rounded-2xl border border-white/10 text-gray-400 font-bold text-sm hover:bg-white/5 transition-all"
          >
            <MessageCircle size={20} className="text-green-500" />
            ¿Tienes dudas? Pregúntanos por WhatsApp
          </a>

          {/* BENEFICIOS BUF'S */}
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