// app/components/Portfolio.tsx
"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import { ZoomIn } from "lucide-react";
import { portfolioItems } from "@/app/data/portfolioItems";
import Lightbox from "@/app/components/Lightbox";

export default function Portfolio() {
  const [selected, setSelected] = useState<number | null>(null);
  const items = useMemo(() => portfolioItems, []);

  // Catégories auto (si pas de category => "Autre") + "Tous"
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i: any) => set.add(i?.category ?? "Autre"));
    return ["Tous", ...Array.from(set)];
  }, [items]);
  const [filter, setFilter] = useState<string>(categories[0] ?? "Tous");
  const filtered = useMemo(
    () =>
      filter === "Tous"
        ? items
        : items.filter((i: any) => (i?.category ?? "Autre") === filter),
    [items, filter]
  );

  const isOpen = selected !== null;

  return (
    <section
      id="portfolio"
      className="relative w-full py-20 bg-[#0f0f10] text-gray-100 flex flex-col items-center"
      aria-labelledby="portfolio-title">
      {/* Glow doré subtil */}
      <div
        className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_50%_at_50%_0%,rgba(212,175,55,0.12),transparent_65%)]"
        aria-hidden="true"
      />
      {/* Ligne or en haut */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
        aria-hidden="true"
      />

      <div className="w-full max-w-6xl px-6">
        {/* Titre */}
        <h2
          id="portfolio-title"
          className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Portfolio <span className="text-[#D4AF37]">KLB Events</span>
        </h2>
        <p className="text-center text-gray-400 mb-10">
          Sélection de prestations — mariages, corporate, anniversaires.
        </p>

        {/* Filtres (affichés seulement si plusieurs catégories) */}
        {categories.length > 1 && (
          <div
            className="mb-10 flex w-full items-center justify-center gap-2 overflow-x-auto px-1
                       [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Filtres de catégorie">
            {categories.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={[
                    "whitespace-nowrap rounded-full px-4 py-2 text-sm transition",
                    "border",
                    active
                      ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow"
                      : "border-white/10 text-gray-200 hover:bg-white/5",
                  ].join(" ")}
                  aria-pressed={active}>
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Slider mobile (<= md): scroll-snap */}
        <div className="md:hidden w-full">
          <div
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2
                       [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Galerie défilante">
            {filtered.map((p: any, idx: number) => (
              <button
                key={`${p.title}-${idx}`}
                className="shrink-0 w-[85%] overflow-hidden rounded-xl
                           border border-white/10 bg-[#141415] shadow-sm hover:shadow-md
                           transition focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 snap-center"
                onClick={() => setSelected(items.indexOf(p))}
                aria-label={`Agrandir : ${p.title}`}
                type="button">
                <div className="relative h-56 w-full">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="90vw"
                  />
                  {/* Badge catégorie si dispo */}
                  {p?.category && (
                    <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[10px] tracking-wide text-[#D4AF37]">
                      {p.category}
                    </span>
                  )}
                </div>
                <div className="p-3 text-left">
                  <h3 className="text-base font-semibold">{p.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {p.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Grid desktop (>= md) : 3 colonnes */}
        <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8 max-w-6xl w-full">
          {filtered.map((p: any, idx: number) => (
            <button
              key={`${p.title}-${idx}`}
              className="group relative overflow-hidden rounded-2xl
                         border border-white/10 bg-[#141415] shadow-sm hover:shadow-md
                         transition focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
              onClick={() => setSelected(items.indexOf(p))}
              aria-label={`Agrandir : ${p.title}`}
              type="button">
              <div className="relative h-64 w-full">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1200px) 33vw, 400px"
                />
                {/* Dégradé + icône zoom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-sm">
                    <ZoomIn className="h-4 w-4 text-[#D4AF37]" aria-hidden />
                    <span className="text-gray-200">Voir</span>
                  </div>
                </div>
              </div>

              {/* Légende */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {p.title}
                  </h3>
                  {p?.category && (
                    <span className="rounded-full border border-[#D4AF37]/40 px-2 py-0.5 text-[11px] text-[#D4AF37]">
                      {p.category}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-400 line-clamp-2">
                  {p.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ---- Effet BLUR uniquement au clic ---- */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => setSelected(null)}
        />
      )}

      {/* Lightbox au-dessus du blur */}
      <div className="z-50">
        <Lightbox
          item={isOpen ? items[selected!] : null}
          onClose={() => setSelected(null)}
        />
      </div>
    </section>
  );
}
