"use client";

import React, { useState, Suspense, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { usePathname } from 'next/navigation';
import { AuthModal } from '@/components/shop/AuthModal';
import { ShoppingCart, Menu, X, UserCircle, LogOut, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { CartItem, useCartStore } from '@/store/useCartStore';
import { useSyncExternalStore } from 'react';
import { useUiStore } from '@/store/useUiStore';
import Image from 'next/image';
import { SearchBar } from '@/components/shop/SearchBar';
import { useWishlist } from '@/hooks/useWishlist';

const emptyArray: CartItem[] = [];

export const Navbar = () => {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { count: wishlistCount } = useWishlist();

  const cartItems = useSyncExternalStore(
    useCartStore.subscribe,
    () => useCartStore.getState().items,
    () => emptyArray
  );

  const openCart = useUiStore((state) => state.openCart);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path: string) => pathname === path;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-brand-dark/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">

          {/* Logo Branding */}
          <Link href="/" className="flex items-center gap-3 group">
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
              <Suspense fallback={
                <div className="absolute right-0 top-0 z-10">
                  <input
                    disabled
                    placeholder="Buscar..."
                    className="bg-white/5 border border-white/10 rounded-full pl-4 pr-10 py-2 text-sm text-gray-500 w-40"
                  />
                </div>
              }>
                <SearchBar />
              </Suspense>
            </div>

            <Link
              href="/wishlist"
              className="p-1 md:p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all relative"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 md:top-0 md:-right-1 bg-brand-pink text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={openCart}
              className="p-1 md:p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 md:top-0 md:-right-1 bg-brand-pink text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

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
      </nav>

      {/* Mobile Menu - FUERA del nav */}
      {isMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black z-99998"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="md:hidden fixed inset-0 z-99999 overflow-hidden flex flex-col" style={{ backgroundColor: '#000000' }}>
            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0" style={{ backgroundColor: '#0a0a0a' }}>
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full relative">
                  <Image
                    src="/logo.png"
                    alt="BUF'S Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-black tracking-tighter text-white">
                    BUF&apos;S <span className="text-brand-pink">SEX SHOP</span>
                  </span>
                </div>
              </Link>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col h-[calc(100vh-80px)] p-6 overflow-y-auto" style={{ backgroundColor: '#000000' }}>
              <div className="flex flex-col gap-3 py-8">
                <Link
                  href="/products"
                  onClick={() => setIsMenuOpen(false)}
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all active:scale-[0.98]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                          Productos
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          Explora todo el catálogo
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-brand-pink/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-pink/20 transition-all">
                        <span className="text-brand-pink text-lg">→</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </Link>

                <Link
                  href="/wishlist"
                  onClick={() => setIsMenuOpen(false)}
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all active:scale-[0.98]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-2">
                          Favoritos
                          {wishlistCount > 0 && (
                            <span className="px-2 py-0.5 bg-brand-pink text-white text-[10px] font-black rounded-full">
                              {wishlistCount}
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          Tu lista de deseos
                        </p>
                      </div>
                      <Heart className="w-7 h-7 text-gray-600 group-hover:text-brand-pink group-hover:fill-brand-pink transition-all" />
                    </div>
                  </div>
                </Link>

                <Link
                  href="/promotions"
                  onClick={() => setIsMenuOpen(false)}
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-brand-pink/10 to-purple-600/10 border border-brand-pink/30 p-6 hover:from-brand-pink/20 hover:to-purple-600/20 transition-all active:scale-[0.98]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-black text-brand-pink uppercase tracking-tighter flex items-center gap-2">
                          Promociones
                          <span className="px-2 py-0.5 bg-brand-pink text-white text-[8px] font-black rounded-full animate-pulse">
                            HOT
                          </span>
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          Ofertas especiales
                        </p>
                      </div>
                      <div className="text-3xl">🔥</div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="flex-1 min-h-8"></div>

              <div className="space-y-3 pb-4">
                {!isAuthenticated ? (
                  <>
                    <button
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-brand-pink text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-brand-pink/30 active:scale-95 transition-all"
                    >
                      Iniciar Sesión
                    </button>
                    <p className="text-center text-[10px] text-gray-500">
                      Regístrate y obtén <span className="text-brand-pink font-bold">10% OFF</span> en tu primera compra
                    </p>
                  </>
                ) : (
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <div className="h-12 w-12 rounded-full bg-linear-to-br from-brand-pink to-purple-600 flex items-center justify-center">
                      <UserCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-black text-white">
                        {user?.name?.split(' ')[0]}
                      </p>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="text-xs text-gray-400 hover:text-brand-pink transition-colors flex items-center gap-1"
                      >
                        <LogOut size={10} />
                        Salir
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};