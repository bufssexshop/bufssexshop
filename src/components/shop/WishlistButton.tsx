'use client';

import { Heart } from 'lucide-react';
import { Product } from '@/types/product';
import { useWishlist } from '@/hooks/useWishlist';

interface WishlistButtonProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
}

export const WishlistButton = ({ product, size = 'md' }: WishlistButtonProps) => {
  const { toggleProduct, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(product._id);

  const sizeClasses = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleProduct(product);
      }}
      className={`${sizeClasses[size]} rounded-full transition-colors ${
        isFavorite
          ? 'bg-pink-500 text-white'
          : 'bg-transparent text-gray-900 hover:bg-pink-500 hover:text-white'
      }`}
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <Heart
        size={iconSizes[size]}
        className={`transition-all ${isFavorite ? 'fill-current' : ''}`}
      />
    </button>
  );
};