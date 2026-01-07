"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Product } from '@/types/product';
import { toast } from 'sonner';
import Image from 'next/image';
import { WishlistButton } from './WishlistButton';

interface Props {
  product: Product;
}

const isNewProduct = (createdAt: string | Date | undefined): boolean => {
  if (!createdAt) return false;

  const productDate = new Date(createdAt);
  const now = new Date();
  const diffInMs = now.getTime() - productDate.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays <= 15;
};

export const ProductCard = ({ product }: Props) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);

    toast.info(`${product.name} añadido`, {
      description: "Revisa tu bolsa para finalizar el pedido",
      icon: <ShoppingBag className="h-4 w-4 text-pink-500" />,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut"}}
      className="group relative flex flex-col w-full bg-white rounded-2xl md:rounded-3xl py-2 px-1 md:p-4 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-pink-100/50 transition-all duration-500"
    >
      <Link href={`/product/${product._id}`} prefetch={false} className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gray-50 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          quality={85}
          className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out p-4"
        />
        {/* Overlays Rápidos */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.promotion && (
            <span className="bg-pink-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-pink-500/40">
              Oferta
            </span>
          )}
          {isNewProduct(product.createdAt) && (
            <span className="bg-pink-600 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-sm">
              Nuevo
            </span>
          )}
        </div>

        {/* Botones de acción rápida (flotantes) */}
        <div className="absolute -bottom-12 group-hover:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 transition-all duration-500 ease-spring">
          <button className="p-3 bg-white text-gray-900 rounded-full shadow-xl hover:bg-pink-500 hover:text-white transition-colors">
            <Eye className="h-5 w-5" />
          </button>
          <div className="bg-white rounded-full shadow-xl">
            <WishlistButton product={product} size="md" />
          </div>
        </div>
      </Link>

      <div className="mt-5 px-1 flex flex-col grow">
        <div className="flex items-center justify-between gap-1 mb-2">
          <span className="text-[9px] font-bold text-brand-pink uppercase tracking-tighter shrink-0">
            {product.category}
          </span>

          {/* Subcategoría con control de desborde */}
          <span className="text-[8px] font-medium text-gray-400 uppercase tracking-tighter truncate text-right min-w-0 flex-1">
            {product.subcategory}
          </span>
        </div>

        <Link href={`/product/${product._id}`} prefetch={false}>
          <h3 className="text-xs md:text-lg font-black text-gray-900 uppercase leading-tight mb-2 line-clamp-2 h-10">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-1 md:pt-4 flex items-end justify-between">
          <div className="flex flex-col">
            {product.promotion && (
              <span className="text-xs text-gray-400 line-through font-medium">
                {formatPrice(product.price * 1.2)}
              </span>
            )}
            <span className="text-sx md:text-xl font-black text-gray-900 tracking-tight">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            className="flex items-center justify-center h-7 w-7 md:h-10 md:w-10 bg-gray-900 text-white rounded-xl md:rounded-2xl hover:bg-pink-500 transition-all duration-700 shadow-lg shadow-gray-200 active:scale-90 group-hover:rotate-[360deg]"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-3.5 w-3.5 md:h-5 md:w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};