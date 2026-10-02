"use client";

import { PortfolioItems } from "@/app/data/portfolioItems";
import Image from "next/image";
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { EASE_OUT } from "@/app/components/Motion";

type Props = {
  items: PortfolioItems[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export default function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: Props) {
  const isOpen = index !== null && items[index] !== undefined;
  const item = isOpen ? items[index] : null;
  const len = items.length;

  // Échap pour fermer, flèches pour naviguer, scroll de la page bloqué
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndexChange((index + 1) % len);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + len) % len);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, len, onClose, onIndexChange]);

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`Agrandir : ${item.title}`}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}>
          <motion.div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-ink"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}>
            <button
              onClick={onClose}
              aria-label="Fermer"
              autoFocus
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-gold hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={item.img}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}>
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1024px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {len > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => onIndexChange((index - 1 + len) % len)}
                    aria-label="Photo précédente"
                    className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-gold hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onIndexChange((index + 1) % len)}
                    aria-label="Photo suivante"
                    className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-gold hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            <div className="flex items-end justify-between gap-4 p-5 md:p-7">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                  {item.category}
                </span>
                <h3 className="mt-1 font-display text-xl font-bold text-white md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-1 text-white/70">{item.description}</p>
              </div>
              <span className="shrink-0 font-mono text-xs text-white/45 tabular-nums">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(len).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
