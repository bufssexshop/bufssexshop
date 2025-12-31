"use client";

import { useEffect, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem, useCartStore } from '@/store/useCartStore';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { toast } from 'sonner';

const emptyArray: CartItem[] = [];

export const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const items = useSyncExternalStore(
    useCartStore.subscribe,
    () => useCartStore.getState().items,
    () => emptyArray
  );

  const { addItem, removeItem, deleteFromCart, clearCart } = useCartStore();

  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    }
  }, [isOpen]);

  const handleCheckout = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

    if (!phoneNumber) {
      console.error("WhatsApp number is not configured in .env");
      return;
    }

    const message = items.map(item =>
      `🛍️ ${item.quantity}x ${item.name}%0A   *REF:* ${item.code || 'N/A'}%0A   *Precio:* ${formatPrice(item.price * item.quantity)}`
    ).join('%0A%0A');

    const totalText = `%0A%0A✨ *TOTAL DEL PEDIDO: ${formatPrice(total)}*`;
    const intro = `¡Hola BUF'S! 🔥 Quiero realizar el siguiente pedido:%0A%0A`;
    const footer = `%0A%0A🤫 *Nota:* Deseo que mi envío sea *100% DISCRETO*.`;

    const finalMessage = `${intro}${message}${totalText}${footer}`;

    window.open(`https://wa.me/${phoneNumber}?text=${finalMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay de fondo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Panel Lateral */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-full md:w-[450px] bg-[#050505] z-60 shadow-2xl flex flex-col overflow-hidden border-l border-white/5 box-border"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center flex-shrink-0">
              <div className="flex flex-col">
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Tu Bolsa</h2>
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-[9px] text-gray-600 uppercase tracking-widest hover:text-brand-pink transition-colors text-left mt-1"
                  >
                    Vaciar bolsa
                  </button>
                )}
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500">
                <X size={24} />
              </button>
            </div>

            {/* Lista de Productos */}
            <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6 overflow-x-hidden">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                  <ShoppingBag size={64} strokeWidth={1} className="mb-4 text-white" />
                  <p className="uppercase tracking-[0.3em] text-[10px] font-bold text-white">Tu bolsa está vacía</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item._id} className="flex gap-4 w-full group min-w-0">
                    {/* Imagen */}
                    <div className="w-20 h-24 bg-white/5 rounded-2xl overflow-hidden flex-shrink-0 relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    {/* Información y Acciones */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="w-full">
                        <h3 className="text-white font-bold text-[11px] uppercase tracking-wider mb-1 truncate">
                          {item.name}
                        </h3>
                        <p className="text-brand-pink font-black text-sm">{formatPrice(item.price)}</p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Grupo: Cantidad + Trash */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-white/5 rounded-lg border border-white/10 overflow-hidden h-8">
                            <button
                              onClick={() => removeItem(item._id)}
                              className="px-2 hover:text-brand-pink transition-colors text-gray-400 border-r border-white/5"
                            >
                              <Minus size={12}/>
                            </button>
                            <span className="px-3 text-[10px] font-bold text-white min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addItem(item)}
                              className="px-2 hover:text-brand-pink transition-colors text-gray-400 border-l border-white/5"
                            >
                              <Plus size={12}/>
                            </button>
                          </div>

                          <button
                            onClick={() => {
                              deleteFromCart(item._id);
                              toast.info("Producto eliminado de la bolsa");
                            }}
                            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 text-white/70 hover:text-white hover:bg-pink-600 transition-all duration-300 active:scale-90 shadow-sm border border-white/5"
                          >
                            <Trash2 size={16} strokeWidth={2} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-white/5 bg-black/50 backdrop-blur-xl flex-shrink-0">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-gray-500 uppercase tracking-widest text-[18px] font-bold">Subtotal</span>
                  <span className="text-3xl font-black text-white italic">{formatPrice(total)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-brand-pink py-5 rounded-2xl text-white font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-brand-pink/20"
                >
                  Finalizar Pedido por WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};