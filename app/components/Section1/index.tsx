// app/components/Section1.tsx
"use client";

import React from "react";
import Link from "next/link";
import { carouselItems } from "@/app/data/carouselItems";
import Carousel from "@/app/components/Carousel";

export default function Section1() {
  return (
    <section className="relative w-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Colonne gauche — NOIR */}
        <div className="relative flex flex-col items-center justify-center gap-6 py-20 bg-[#0f0f10] text-gray-100">
          {/* liseré or */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
            aria-hidden="true"
          />
          <h2 className="font-bevan text-center text-4xl md:text-5xl">
            Rendez vos évènements{" "}
            <span className="text-[#D4AF37]">inoubliables</span>
          </h2>
          <p className="font-extralight italic text-center text-xl text-white/90">
            Son, lumières, ambiance — version premium.
          </p>

          <div className="mt-2 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400">
            <span>Mariages</span>
            <span className="opacity-50">•</span>
            <span>Corporate</span>
            <span className="opacity-50">•</span>
            <span>Anniversaires</span>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium bg-[#D4AF37] text-black hover:bg-[#c49a2c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]">
              Me contacter
            </Link>
            <Link
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium border border-white/15 hover:bg-white/5">
              Voir le portfolio
            </Link>
          </div>
        </div>

        {/* Colonne droite — BLANC (Carrousel en NB -> couleur au survol) */}
        <div className="flex items-center justify-center py-20 bg-white text-black">
          <div className="w-full max-w-xl px-6">
            <div className="group overflow-hidden rounded-2xl  ">
              {/* Astuce: on applique le filtre sur un wrapper pour tout passer en NB */}
              <div className="transition duration-500 filter grayscale group-hover:grayscale-0">
                <Carousel
                  slides={carouselItems.map((p) => ({
                    src: p.img,
                    alt: p.title,
                  }))}
                  interval={4000}
                  theme="light" // "dark" si posé sur fond sombre
                  dotActive="#D4AF37" // or
                  showCaptions={false}
                  grayscale // passe en noir & blanc
                  grayscaleHover // repasse en couleur au survol
                  heightClass="h-72 md:h-96"
                />
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-neutral-500">
              Survolez / touchez pour voir en couleur
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
