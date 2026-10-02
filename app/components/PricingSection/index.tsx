// app/components/PricingSection.tsx
"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import {
  CountUp,
  EASE_OUT,
  SectionHeading,
  Stagger,
  StaggerItem,
  TiltCard,
} from "@/app/components/Motion";
import { cn } from "@/lib/utils";

const features = {
  essentiel: [
    "Jusqu’à 3 heures de couverture",
    "Galerie en ligne (30 jours)",
    "Templates de base",
    "Partage instantané par QR Code",
  ],
  premium: [
    "Jusqu’à 6 heures de couverture",
    "Galerie en ligne (90 jours)",
    "Templates personnalisés (charte)",
    "Assistant(e) dédié(e) sur place",
    "Vidéo courte récap de l’événement",
  ],
  prestige: [
    "Couverture journée complète",
    "Galerie en ligne (illimitée)",
    "Templates sur-mesure + animation",
    "Équipe dédiée (2 opérateurs)",
    "Impression instantanée (selon device)",
    "Fond vert / décor premium",
  ],
};

const OFFERS: CardProps[] = [
  {
    title: "Essentiel",
    price: 499,
    desc: "La base idéale pour un événement réussi.",
    items: features.essentiel,
  },
  {
    title: "Premium",
    price: 899,
    tag: "Populaire",
    desc: "L’équilibre parfait : personnalisation & accompagnement.",
    items: features.premium,
    highlight: true,
  },
  {
    title: "Prestige",
    price: 1490,
    desc: "Le niveau supérieur pour une expérience grand luxe.",
    items: features.prestige,
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative w-full overflow-hidden bg-ink text-white"
      aria-labelledby="pricing-title">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(50%_40%_at_50%_0%,rgba(212,175,55,0.12),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeading
          id="pricing-title"
          index="01"
          label="Formules"
          title="Offres KLB Events"
          accent={["KLB", "Events"]}
          description="Choisissez la formule adaptée à votre événement — design sobre, expérience premium."
        />

        {/* Cartes */}
        <div className="mt-16 grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-5 lg:gap-8">
          {OFFERS.map((offer, i) => (
            <motion.div
              key={offer.title}
              className={cn(offer.highlight && "md:-translate-y-4")}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1, delay: i * 0.12, ease: EASE_OUT }}>
              <Card {...offer} />
            </motion.div>
          ))}
        </div>

        {/* Mentions */}
        <p className="mt-10 text-center text-xs text-white/40">
          Tarifs indicatifs HT — ajustables selon la durée, le lieu et les
          options sélectionnées.
        </p>
      </div>
    </section>
  );
}

type CardProps = {
  title: string;
  price: number;
  tag?: string;
  desc: string;
  items: string[];
  highlight?: boolean;
};

function Card({ title, price, tag, desc, items, highlight = false }: CardProps) {
  return (
    <TiltCard className="h-full rounded-3xl">
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-3xl p-px",
          highlight
            ? "shadow-[0_30px_80px_-30px_rgba(212,175,55,0.45)]"
            : "bg-gradient-to-br from-gold/50 via-white/10 to-transparent"
        )}>
        {/* Bordure dorée en rotation sur la carte mise en avant */}
        {highlight && (
          <div
            aria-hidden="true"
            className="border-spin absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2"
          />
        )}

        <div
          className={cn(
            "relative flex h-full flex-col rounded-[calc(1.5rem-1px)] p-7",
            highlight
              ? "bg-gradient-to-b from-[#1b1912] to-ink"
              : "bg-gradient-to-b from-ink-soft to-ink"
          )}>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-bold">{title}</h3>
            {tag && (
              <span className="rounded-full bg-gold px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-ink">
                {tag}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-white/55">{desc}</p>

          <div className="mt-8 flex items-baseline gap-2 border-b border-white/10 pb-8">
            <CountUp
              to={price}
              suffix="€"
              duration={1.6}
              className="font-display text-4xl font-extrabold tracking-tight text-white tabular-nums"
            />
            <span className="text-sm text-white/45">/ événement</span>
          </div>

          <Stagger as="ul" className="mt-8 space-y-3.5" stagger={0.07}>
            {items.map((it) => (
              <StaggerItem as="li" key={it} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                </span>
                <span className="text-sm leading-6 text-white/80">{it}</span>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-auto pt-10">
            <Link
              href="#contact"
              className={cn(
                "btn-shine group/cta inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
                highlight
                  ? "bg-gold text-ink"
                  : "border border-gold/40 text-white hover:bg-gold hover:text-ink"
              )}
              aria-label={`Choisir l’offre ${title}`}>
              Demander un devis
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover/cta:rotate-45" />
            </Link>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
