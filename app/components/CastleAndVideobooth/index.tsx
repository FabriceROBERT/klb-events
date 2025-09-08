// app/components/BoothCastleScroller.tsx
"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  MessageCircle,
  Camera,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

type MediaItem = {
  src: string;
  alt: string;
  caption?: string;
};

type Props = {
  videobooth?: MediaItem[];
  chateaux?: MediaItem[];
  whatsappTel?: string; // ex: "+33765549836"
};

const DEFAULT_VIDEObooth: MediaItem[] = [
  { src: "/img/IMG-20250908-WA0008.jpg", alt: "" },
  { src: "/img/IMG-20250908-WA0012.jpg", alt: "" },
  { src: "/img/videobooth.jpg", alt: "" },
  { src: "/img/videobooth/4.jpg", alt: "" },
];

const DEFAULT_CHATEAUX: MediaItem[] = [
  { src: "/img/IMG-20250908-WA0005.jpg", alt: "" },
  { src: "/img/IMG-20250908-WA0004.jpg", alt: "" },
  {
    src: "/img/IMG-20250908-WA0014.jpg",
    alt: "",
  },
  { src: "/img/IMG-20250908-WA0007.jpg", alt: "" },
];

export default function BoothCastleScroller({
  videobooth = DEFAULT_VIDEObooth,
  chateaux = DEFAULT_CHATEAUX,
  whatsappTel = "+33765549836",
}: Props) {
  type TabKey = "videobooth" | "chateaux";
  const [tab, setTab] = useState<TabKey>("videobooth");
  const [selected, setSelected] = useState<number>(0);

  const items = useMemo(
    () => (tab === "videobooth" ? videobooth : chateaux),
    [tab, videobooth, chateaux]
  );
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const waNumber = whatsappTel.replace(/^\+/, "");
  const waHref = (label: string) =>
    `https://wa.me/${waNumber}?text=${encodeURIComponent(
      `Bonjour ! Je souhaite des infos/réserver ${label} (date, lieu, horaires) : `
    )}`;

  const details = useMemo(() => {
    if (tab === "videobooth") {
      return {
        title: "Videobooth 360°",
        price: "dès 350€",
        bullets: [
          "Borne 360° selon formule",
          "Éclairage beauté / fond (optionnel)",
          "Tapis et barrière de sécurité en or",
          "Assistance & réglages sur place",
          "Galerie digitale partagée",
          "Accessoires fun fournis",
        ],
        cta: waHref("un videobooth"),
        icon: <Camera className="h-5 w-5 text-[#D4AF37]" />,
      };
    }
    return {
      title: "Château gonflable",
      price: "dès 190€ / jour",
      bullets: [
        "Turbine & tapis de protection",
        "Montage en 15–20 min",
        "Ancrages & sécurité inclus",
        "Nettoyé & vérifié à chaque sortie",
        "Idéal jardin/salle",
      ],
      cta: waHref("un château gonflable"),
      icon: <Sparkles className="h-5 w-5 text-[#D4AF37]" />,
    };
  }, [tab]);

  const scrollByCard = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLDivElement>("[data-card]");
    const step = card
      ? card.getBoundingClientRect().width + 16
      : el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  const onScrollEnd = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = Array.from(
      el.querySelectorAll<HTMLDivElement>("[data-card]")
    );
    const { left } = el.getBoundingClientRect();
    let bestIdx = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    cards.forEach((c, i) => {
      const rect = c.getBoundingClientRect();
      const dist = Math.abs(rect.left - left);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });
    setSelected(bestIdx);
  };

  return (
    <section
      id="scroll-media"
      className="relative w-full bg-[#0f0f10] text-gray-100">
      {/* Glow + liseré or */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(65%_45%_at_50%_0%,rgba(212,175,55,0.10),transparent_65%)]" />
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6 py-14">
        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => {
              setTab("videobooth");
              setSelected(0);
            }}
            className={`rounded-full px-4 py-2 text-sm border transition ${
              tab === "videobooth"
                ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                : "text-gray-200 border-white/10 hover:bg-white/5"
            }`}
            aria-pressed={tab === "videobooth"}>
            <Camera className="mr-2 inline h-4 w-4" />
            Videobooth
          </button>
          <button
            onClick={() => {
              setTab("chateaux");
              setSelected(0);
            }}
            className={`rounded-full px-4 py-2 text-sm border transition ${
              tab === "chateaux"
                ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                : "text-gray-200 border-white/10 hover:bg-white/5"
            }`}
            aria-pressed={tab === "chateaux"}>
            <Sparkles className="mr-2 inline h-4 w-4" />
            Châteaux gonflables
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Carte d'infos */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-[#D4AF37]/70 via-[#9b7d2b]/30 to-transparent">
              <div className="rounded-2xl bg-[#141415] p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-[#D4AF37]/30">
                      {details.icon}
                    </span>
                    <h3 className="text-xl font-semibold">{details.title}</h3>
                  </div>
                  <span className="shrink-0 rounded-full border border-[#D4AF37]/40 px-3 py-1 text-[11px] text-[#D4AF37]">
                    {details.price}
                  </span>
                </div>

                <ul className="mt-4 space-y-2">
                  {details.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-300">
                      <Check className="mt-0.5 h-4 w-4 text-[#D4AF37] shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center justify-between">
                  <a
                    href={details.cta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2 text-sm font-medium text-black hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60"
                    aria-label={`Contacter pour ${details.title} sur WhatsApp`}>
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                  <span className="text-xs text-gray-400">
                    Photo {selected + 1} / {items.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll images */}
          <div className="relative order-1 lg:order-2">
            {/* Bords en fondu */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#0f0f10] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#0f0f10] to-transparent" />

            <div
              ref={scrollerRef}
              onScroll={() => {
                // Throttle simple : au "end" du scroll (passif), on met un timeout court
                if ((scrollerRef as any)._t)
                  clearTimeout((scrollerRef as any)._t);
                (scrollerRef as any)._t = setTimeout(onScrollEnd, 120);
              }}
              className="
                relative flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2
                [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              "
              aria-label="Galerie défilante">
              {items.map((m, idx) => (
                <button
                  key={`${m.src}-${idx}`}
                  data-card
                  type="button"
                  onClick={() => setSelected(idx)}
                  className={`
                    group relative shrink-0 w-[82%] sm:w-[60%] md:w-[48%] lg:w-[360px]
                    snap-start overflow-hidden rounded-2xl border
                    ${
                      idx === selected
                        ? "border-[#D4AF37]/60"
                        : "border-white/10"
                    }
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]
                  `}
                  aria-label={`Voir la photo ${idx + 1}`}>
                  <div className="relative h-56 md:h-64">
                    <Image
                      src={m.src}
                      alt={m.alt}
                      fill
                      sizes="(max-width: 640px) 82vw, (max-width: 768px) 60vw, (max-width: 1024px) 48vw, 360px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={idx === 0}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute left-3 bottom-3">
                    <p className="rounded-md bg-black/40 px-2 py-1 text-xs text-gray-200 backdrop-blur">
                      {m.caption ?? m.alt}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Boutons */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between">
              <button
                type="button"
                onClick={() => scrollByCard("left")}
                className="pointer-events-auto ml-1 rounded-full bg-black/50 p-2 backdrop-blur hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                aria-label="Précédent">
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard("right")}
                className="pointer-events-auto mr-1 rounded-full bg-black/50 p-2 backdrop-blur hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                aria-label="Suivant">
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
