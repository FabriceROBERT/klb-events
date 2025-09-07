// app/components/PricingSection.tsx
"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import React from "react";

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

export default function PricingSection() {
  return (
    <section
      className="w-full bg-[#0f0f10] text-gray-100"
      aria-labelledby="pricing-title">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Titre */}
        <div className="text-center mb-12">
          <h2
            id="pricing-title"
            className="text-3xl md:text-4xl font-semibold tracking-tight">
            Nos offres <span className="text-[#D4AF37]">KLB Events</span>
          </h2>
          <p className="text-gray-400 mt-3">
            Choisissez la formule adaptée à votre événement — design sobre,
            expérience premium.
          </p>
        </div>

        {/* Cartes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Essentiel */}
          <Card
            title="Essentiel"
            price="499€"
            tag=""
            desc="La base idéale pour un événement réussi."
            items={features.essentiel}
            highlight={false}
            ctaHref="/contact?offer=essentiel"
          />

          {/* Premium (mise en avant) */}
          <Card
            title="Premium"
            price="899€"
            tag="Populaire"
            desc="L’équilibre parfait : personnalisation & accompagnement."
            items={features.premium}
            highlight
            ctaHref="/contact?offer=premium"
          />

          {/* Prestige */}
          <Card
            title="Prestige"
            price="1490€"
            tag=""
            desc="Le niveau supérieur pour une expérience grand luxe."
            items={features.prestige}
            highlight={false}
            ctaHref="/contact?offer=prestige"
          />
        </div>

        {/* Mentions */}
        <p className="text-xs text-gray-500 mt-6 text-center">
          Tarifs indicatifs HT — ajustables selon la durée, le lieu et les
          options sélectionnées.
        </p>
      </div>
    </section>
  );
}

type CardProps = {
  title: string;
  price: string;
  tag?: string;
  desc: string;
  items: string[];
  highlight?: boolean;
  ctaHref: string;
};

function Card({
  title,
  price,
  tag,
  desc,
  items,
  highlight = false,
  ctaHref,
}: CardProps) {
  return (
    <div
      className={[
        "relative rounded-2xl p-[1px]",
        "bg-gradient-to-br from-[#D4AF37]/80 via-[#9b7d2b]/50 to-transparent",
        highlight ? "shadow-[0_0_0_2px_rgba(212,175,55,0.4)]" : "shadow-none",
      ].join(" ")}>
      {/* Badge */}
      {tag ? (
        <div className="absolute -top-3 left-5 rounded-full bg-[#D4AF37] px-3 py-1 text-xs font-medium text-black">
          {tag}
        </div>
      ) : null}

      {/* Contenu */}
      <div
        className={[
          "rounded-2xl h-full p-6 flex flex-col",
          "bg-gradient-to-b from-[#141415] to-[#0f0f10]",
          highlight ? "ring-1 ring-[#D4AF37]/40" : "ring-1 ring-white/5",
        ].join(" ")}>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">{desc}</p>

        <div className="mt-6">
          <span className="text-4xl font-bold tracking-tight">{price}</span>
          <span className="ml-2 text-sm text-gray-400">/ événement</span>
        </div>

        <ul className="mt-6 space-y-3">
          {items.map((it) => (
            <li key={it} className="flex items-start gap-2">
              <CheckCircle
                className="h-5 w-5 shrink-0 text-[#D4AF37]"
                aria-hidden
              />
              <span className="text-sm leading-6 text-gray-200">{it}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link
            href={ctaHref}
            className={[
              "inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium",
              "bg-[#D4AF37] text-black hover:bg-[#c49a2c] focus:outline-none",
              "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-[#0f0f10]",
              highlight ? "shadow-lg" : "shadow-sm",
            ].join(" ")}
            aria-label={`Choisir l’offre ${title}`}>
            Demander un devis
          </Link>
        </div>
      </div>
    </div>
  );
}
