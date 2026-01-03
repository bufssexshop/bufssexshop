"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export const ProductImageGallery = ({ images }: { images: string[] }) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isZooming, setIsZooming] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* IMAGEN PRINCIPAL CON ZOOM */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 cursor-zoom-in"
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={mainImage}
          alt="Product view"
          fill
          priority
          quality={95}
          className={cn(
            "object-contain transition-transform duration-200 pointer-events-none",
            isZooming ? "scale-[2]" : "scale-100"
          )}
          style={isZooming ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : {}}
        />
      </div>

      {/* MINIATURAS */}
      <div className="flex justify-center gap-4 flex-wrap">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(img)}
            className={cn(
              "relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all bg-white/5",
              mainImage === img
                ? "border-brand-pink shadow-lg shadow-brand-pink/20"
                : "border-transparent opacity-50 hover:opacity-100"
            )}
          >
            <Image
              src={img}
              alt={`Thumb ${idx}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};