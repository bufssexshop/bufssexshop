"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Mail, Lock, Loader2 } from 'lucide-react';
import { loginSchema, LoginInput } from '@/lib/validations/auth';
import { cn } from '@/lib/utils';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const setAuth = useAuthStore((state) => state.setAuth);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });

  if (!isOpen) return null;

  const onSubmit = async (data: LoginInput) => {
    try {
      const response = await authService.login(data);

      if (response.token) {
        setAuth(response.user, response.token);

        toast.success(`¡Bienvenido de nuevo, ${response.user.name}!`, {
          description: "Has iniciado sesión correctamente.",
        });

        reset();
        onClose();
      }
    } catch (error: unknown) {
      let message = "Ocurrió un error inesperado";

      if (axios.isAxiosError(error))
        message = error.response?.data?.message || "Credenciales incorrectas";

      toast.error("Error de autenticación", {
        description: message,
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md rounded-[2.5rem] bg-white p-10 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>

            <div className="mb-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-pink/10 mb-4">
                <Lock className="h-8 w-8 text-brand-pink" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter italic">HOLA DE NUEVO</h2>
              <p className="text-gray-500 mt-2 font-medium">Ingresa a tu cuenta de <span className="text-brand-pink font-bold">BUF&apos;S</span></p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Campo Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                  Correo Electrónico
                </label>
                <div className="relative group">
                  <Mail className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors",
                    errors.email ? "text-red-400" : "text-gray-300 group-focus-within:text-brand-pink"
                  )} />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="tu@email.com"
                    className={cn(
                      "w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none transition-all",
                      "text-gray-900 font-bold placeholder:text-gray-300 placeholder:font-medium",
                      "focus:bg-white focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/5",
                      errors.email && "border-red-200 bg-red-50/30 focus:border-red-500"
                    )}
                  />
                </div>
              </div>

              {/* Campo Contraseña */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                  Contraseña
                </label>
                <div className="relative group">
                  <Lock className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors",
                    errors.password ? "text-red-400" : "text-gray-300 group-focus-within:text-brand-pink"
                  )} />
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="••••••••"
                    className={cn(
                      "w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none transition-all",
                      "text-gray-900 font-bold placeholder:text-gray-300",
                      "focus:bg-white focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/5",
                      errors.password && "border-red-200 bg-red-50/30 focus:border-red-500"
                    )}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-pink text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-brand-pink/20 hover:bg-pink-600 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Entrar al paraíso"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};