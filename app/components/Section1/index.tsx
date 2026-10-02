// app/components/Section1.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { carouselItems } from "@/app/data/carouselItems";
import Carousel from "@/app/components/Carousel";
import {
  EASE_OUT,
  Magnetic,
  Reveal,
  RollText,
  SectionHeading,
  Stagger,
  StaggerItem,
} from "@/app/components/Motion";

const CATEGORIES = ["Mariages", "Corporate", "Anniversaires"];

export default function Section1() {
  return (
    <section
      aria-labelledby="experience-title"
      className="relative w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Colonne gauche — NOIR */}
        <div className="relative flex flex-col justify-center bg-ink px-6 py-24 text-white md:px-12 md:py-32 lg:px-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_50%_at_0%_100%,rgba(212,175,55,0.12),transparent_70%)]"
          />
          <div className="relative">
            <SectionHeading
              id="experience-title"
              index="03"
              label="L’expérience"
              title="Rendez vos évènements inoubliables"
              accent={["inoubliables"]}
              accentClassName="font-serif font-normal italic text-gold"
              align="left"
            />

            <Reveal delay={0.3}>
              <p className="mt-6 font-serif text-xl italic text-white/80 md:text-2xl">
                Son, lumières, ambiance — version premium.
              </p>
            </Reveal>

            <Stagger
              as="ul"
              stagger={0.1}
              className="mt-8 flex flex-wrap items-center gap-2">
              {CATEGORIES.map((c) => (
                <StaggerItem
                  as="li"
                  key={c}
                  className="rounded-full border border-white/15 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">
                  {c}
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.45} className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link
                  href="#contact"
                  className="btn-shine inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink">
                  Me contacter
                </Link>
              </Magnetic>
              <Link
                href="#portfolio"
                className="group inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium transition-colors hover:border-gold/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                <RollText>Voir le portfolio</RollText>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Colonne droite — BLANC (Carrousel en NB -> couleur au survol) */}
        <motion.div
          className="flex items-center justify-center bg-[#f5f2ea] py-20 text-ink md:py-32"
          initial={{ clipPath: "inset(0 0 0 100%)" }}
          whileInView={{ clipPath: "inset(0 0 0 0%)" }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1.2, ease: EASE_OUT }}>
          <div className="w-full max-w-xl px-6">
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.2, ease: EASE_OUT }}>
              <Carousel
                slides={carouselItems.map((p) => ({
                  src: p.img,
                  alt: p.title,
                }))}
                interval={4000}
                theme="light"
                dotActive="#D4AF37"
                showCaptions={false}
                grayscale // passe en noir & blanc
                grayscaleHover // repasse en couleur au survol
                heightClass="h-80 md:h-[28rem]"
              />
            </motion.div>
            <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600">
              Survolez / touchez pour voir en couleur
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
