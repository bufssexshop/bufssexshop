"use client";

import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { AuthModal } from '@/components/shop/AuthModal';
import { Search, ShoppingCart, Menu, X, UserCircle, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { CartItem, useCartStore } from '@/store/useCartStore';
import { useSyncExternalStore } from 'react';
import { useUiStore } from '@/store/useUiStore';
import Image from 'next/image';

const emptyArray: CartItem[] = [];

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, logout } = useAuthStore();

  const cartItems = useSyncExternalStore(
    useCartStore.subscribe,
    () => useCartStore.getState().items,
    () => emptyArray
  );

  const openCart = useUiStore((state) => state.openCart);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const currentSearch = searchParams.get('search') || '';

  const isActive = (path: string) => pathname === path;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [prevSearch, setPrevSearch] = useState(currentSearch);

  if (currentSearch !== prevSearch) {
    setPrevSearch(currentSearch);
    setSearchTerm(currentSearch);
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    } else {
      params.delete('search');
    }

    params.set('page', '1');

    router.push(`/products?${params.toString()}`);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-brand-dark/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">

          {/* Logo Branding */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-brand-pink shadow-[0_0_15px_rgba(255,45,146,0.2)] transition-transform group-hover:scale-105">
              <div className="bg-brand-pink/10 w-full h-full flex items-center justify-center text-[10px] font-black text-brand-pink">BUF&apos;S</div>
            </div> */}
            <div className="h-12 w-12 overflow-hidden rounded-full transition-transform group-hover:scale-110 relative">
              <Image
                src="/logo.png"
                alt="BUF'S Logo"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tighter text-white">
                BUF&apos;S <span className="text-brand-pink">SEX SHOP</span>
              </span>
              <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Sensualidad & Placer</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-xs font-black tracking-widest">
            <Link
              href="/products"
              className={cn(
                "transition-all hover:text-brand-pink uppercase",
                isActive('/products') ? "text-brand-pink" : "text-gray-400"
              )}
            >
              Productos
            </Link>
            <Link
              href="/promotions"
              className={cn(
                "transition-all hover:text-brand-pink uppercase",
                isActive('/promotions') ? "text-brand-pink" : "text-gray-500/80"
              )}
            >
              Promociones
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block w-40 h-10 relative">
              <form onSubmit={handleSearch} className="absolute right-0 top-0 z-10">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar..."
                  className="bg-white/5 border border-white/10 rounded-full pl-4 pr-10 py-2 text-sm text-white
                            placeholder:text-gray-500 outline-none transition-all duration-300
                            w-40 focus:w-80 focus:bg-brand-dark focus:border-brand-pink focus:shadow-[0_0_20px_rgba(255,45,146,0.1)]"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-pink transition-colors">
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </div>

            <button
              onClick={openCart}
              className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-pink text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Lógica Condicional de Autenticación */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 pl-2 pr-4 py-1.5 rounded-full">
                <div className="h-8 w-8 rounded-full bg-brand-pink/20 flex items-center justify-center border border-brand-pink/30">
                  <UserCircle className="h-5 w-5 text-brand-pink" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white uppercase tracking-tighter leading-none">
                    {user.name?.split(' ')[0]}
                  </span>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1 text-[9px] font-bold text-gray-500 hover:text-brand-pink transition-colors mt-0.5"
                  >
                    <LogOut className="h-2.5 w-2.5" /> SALIR
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="hidden md:flex items-center gap-2 bg-brand-pink text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-pink-600 transition-all shadow-lg shadow-brand-pink/20 active:scale-95"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Iniciar sesión
              </button>
            )}

            <button className="md:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-brand-dark p-6 space-y-6">
            <Link href="/products" onClick={() => setIsMenuOpen(false)} className="block text-xl font-black text-white uppercase tracking-tighter">Productos</Link>
            <Link href="/promotions" className="block text-xl font-black text-brand-pink uppercase tracking-tighter">Promociones</Link>
            {!isAuthenticated && (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full bg-brand-pink text-white py-4 rounded-2xl font-black uppercase tracking-widest"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};