'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile && pathname.startsWith('/products')) {
      setTimeout(() => {
        const productsGrid = document.querySelector('[data-products-grid]');

        if (productsGrid) {
          const navbarHeight = 80;
          const elementPosition = productsGrid.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, searchParams]);

  return null;
}