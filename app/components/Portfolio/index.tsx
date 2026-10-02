// app/components/Portfolio.tsx
"use client";

import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";
import { ZoomIn } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { portfolioItems } from "@/app/data/portfolioItems";
import Lightbox from "@/app/components/Lightbox";
import { EASE_OUT, SectionHeading } from "@/app/components/Motion";
import { cn } from "@/lib/utils";

type PortfolioItem = (typeof portfolioItems)[number];

export default function Portfolio() {
  // Index dans la liste filtrée affichée
  const [selected, setSelected] = useState<number | null>(null);
  const close = useCallback(() => setSelected(null), []);

  const items = useMemo<PortfolioItem[]>(
    () => portfolioItems as PortfolioItem[],
    []
  );

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => set.add(i.category ?? "Autre"));
    return ["Tous", ...Array.from(set)];
  }, [items]);

  const [filter, setFilter] = useState<string>(categories[0] ?? "Tous");

  const filtered = useMemo(
    () =>
      filter === "Tous"
        ? items
        : items.filter((i) => (i.category ?? "Autre") === filter),
    [items, filter]
  );

  return (
    <section
      id="portfolio"
      className="relative flex w-full flex-col items-center overflow-hidden bg-ink py-24 text-white md:py-32"
      aria-labelledby="portfolio-title">
      {/* Glow doré subtil */}
      <div
        className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_40%_at_50%_0%,rgba(212,175,55,0.12),transparent_65%)]"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-6xl px-6">
        <SectionHeading
          id="portfolio-title"
          index="04"
          label="Galerie"
          title="Portfolio KLB Events"
          accent={["KLB", "Events"]}
          description="Sélection de prestations — mariages, corporate, anniversaires."
        />

        {/* Filtres */}
        {categories.length > 1 && (
          <div
            className="mb-12 mt-10 flex w-full items-center gap-1 overflow-x-auto px-1 md:justify-center
                       [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Filtres de catégorie">
            {categories.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setFilter(cat);
                    setSelected(null);
                  }}
                  className={cn(
                    "relative isolate whitespace-nowrap rounded-full px-4 py-2.5 text-sm transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                    active ? "text-ink" : "text-white/70 hover:text-white"
                  )}
                  aria-pressed={active}>
                  {active && (
                    <motion.span
                      layoutId="portfolio-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-gold"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Slider mobile */}
        <div className="w-full md:hidden">
          <div
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2
                       [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Galerie défilante">
            {filtered.map((p, idx) => (
              <button
                key={`${p.title}-${p.img}`}
                className="group relative h-96 w-[85%] shrink-0 snap-center overflow-hidden rounded-3xl border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                onClick={() => setSelected(idx)}
                aria-label={`Agrandir : ${p.title}`}
                type="button">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="85vw"
                />
                <CardCaption item={p} />
              </button>
            ))}
          </div>
        </div>

        {/* Grille bento desktop */}
        <LayoutGroup>
          <motion.div
            layout
            className="hidden w-full max-w-6xl grid-flow-dense auto-rows-[240px] grid-cols-3 gap-5 md:grid lg:auto-rows-[280px] lg:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, idx) => (
                <motion.button
                  layout
                  key={`${p.title}-${p.img}`}
                  className={cn(
                    "group relative overflow-hidden rounded-3xl border border-white/10 bg-ink-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                    idx % 5 === 0 && "row-span-2"
                  )}
                  onClick={() => setSelected(idx)}
                  aria-label={`Agrandir : ${p.title}`}
                  type="button"
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.7,
                    delay: (idx % 3) * 0.08,
                    ease: EASE_OUT,
                  }}>
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-expo group-hover:scale-110"
                    sizes="(max-width: 1200px) 33vw, 400px"
                  />
                  {/* Icône zoom */}
                  <div className="absolute right-4 top-4 flex h-11 w-11 scale-50 items-center justify-center rounded-full bg-gold text-ink opacity-0 transition duration-500 ease-expo group-hover:scale-100 group-hover:opacity-100">
                    <ZoomIn className="h-4 w-4" aria-hidden />
                  </div>
                  <CardCaption item={p} />
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      {/* Lightbox */}
      <Lightbox
        items={filtered}
        index={selected}
        onClose={close}
        onIndexChange={setSelected}
      />
    </section>
  );
}

/** Légende en surimpression qui remonte au survol. */
function CardCaption({ item }: { item: PortfolioItem }) {
  return (
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-5 pt-24 text-left">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
        {item.category}
      </span>
      <h3 className="mt-1 font-display text-lg font-bold text-white transition-transform duration-500 ease-expo md:translate-y-6 md:group-hover:translate-y-0 md:group-focus-visible:translate-y-0">
        {item.title}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-white/70 transition duration-500 ease-expo md:translate-y-6 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
        {item.description}
      </p>
    </div>
  );
}
