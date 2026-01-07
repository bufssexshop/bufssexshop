import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Twitter, MessageCircle, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="h-12 w-12 overflow-hidden rounded-full transition-transform group-hover:scale-110 relative">
                <Image
                  src="/logo.png"
                  alt="BUF'S Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tighter text-white">
                  BUF&apos;S <span className="text-brand-pink">SEX SHOP</span>
                </span>
                <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">
                  Sensualidad & Placer
                </span>
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Tu boutique de confianza para explorar el placer.
              Productos premium, envíos discretos y asesoría personalizada.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com/bufssexshop"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-pink hover:border-brand-pink/50 transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com/bufssexshop"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-pink hover:border-brand-pink/50 transition-all"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com/bufssexshop"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-pink hover:border-brand-pink/50 transition-all"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-6">
              Tienda
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-white text-sm transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Todo el Catálogo
                </Link>
              </li>
              <li>
                <Link
                  href="/products/lenceria"
                  className="text-gray-400 hover:text-white text-sm transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Lencería
                </Link>
              </li>
              <li>
                <Link
                  href="/products/juguetes"
                  className="text-gray-400 hover:text-white text-sm transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Juguetes
                </Link>
              </li>
              <li>
                <Link
                  href="/products/lubricantes"
                  className="text-gray-400 hover:text-white text-sm transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Lubricantes
                </Link>
              </li>
              <li>
                <Link
                  href="/promotions"
                  className="text-gray-400 hover:text-brand-pink text-sm transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Promociones
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-6">
              Ayuda
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/envios"
                  className="text-gray-400 hover:text-white text-sm transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Envíos
                </Link>
              </li>
              <li>
                <Link
                  href="/devoluciones"
                  className="text-gray-400 hover:text-white text-sm transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="text-gray-400 hover:text-white text-sm transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos"
                  className="text-gray-400 hover:text-white text-sm transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Términos
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white text-sm transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-6">
              Contacto
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/573044580143"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-400 hover:text-green-500 text-sm transition-colors group"
                >
                  <MessageCircle size={18} className="mt-0.5 shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    +57 000 000 0000
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hola@bufssexshop.com"
                  className="flex items-start gap-3 text-gray-400 hover:text-white text-sm transition-colors group"
                >
                  <Mail size={18} className="mt-0.5 shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    bufssexshop@gmail.com
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin size={18} className="mt-0.5 shrink-0" />
                  <span>
                    Medellín, Antioquia<br />
                    Colombia
                  </span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>
              © {new Date().getFullYear()} BUF&apos;S Sex Shop. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link href="/privacidad" className="hover:text-white transition-colors">
                Privacidad
              </Link>
              <Link href="/terminos" className="hover:text-white transition-colors">
                Términos
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};