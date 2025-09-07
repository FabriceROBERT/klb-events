"use client";

import { PortfolioItems } from "@/app/data/portfolioItems";
import Image from "next/image";
import React, { useEffect } from "react";

type Props = {
  item: PortfolioItems | null;
  onClose: () => void;
};

export default function Lightbox({ item, onClose }: Props) {
  // Fermer avec ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Agrandir : ${item.title}`}
      onClick={onClose}>
      <div
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 bg-black"
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-3 top-3 z-10 rounded bg-white/10 p-2 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 18L18 6M6 6l12 12" stroke="white" strokeWidth="2" />
          </svg>
        </button>

        <div className="relative w-full aspect-[16/10]">
          <Image
            src={item.img}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1024px"
            priority
          />
        </div>

        <div className="p-4 md:p-6">
          <h3 className="text-xl md:text-2xl font-semibold">{item.title}</h3>
          <p className="mt-1 text-white/80">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
