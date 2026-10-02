// app/components/CastleAndVideobooth/index.tsx
"use client";

import React, { useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  MessageCircle,
  Camera,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { EASE_OUT, Magnetic, SectionHeading } from "@/app/components/Motion";
import { cn } from "@/lib/utils";

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
];

const DEFAULT_CHATEAUX: MediaItem[] = [
  { src: "/img/IMG-20250908-WA0005.jpg", alt: "" },
  { src: "/img/IMG-20250908-WA0004.jpg", alt: "" },
  { src: "/img/IMG-20250908-WA0014.jpg", alt: "" },
  { src: "/img/IMG-20250908-WA0007.jpg", alt: "" },
];

type TabKey = "videobooth" | "chateaux";

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "videobooth", label: "Videobooth", icon: <Camera className="h-4 w-4" /> },
  { key: "chateaux", label: "Châteaux gonflables", icon: <Sparkles className="h-4 w-4" /> },
];

export default function BoothCastleScroller({
  videobooth = DEFAULT_VIDEObooth,
  chateaux = DEFAULT_CHATEAUX,
  whatsappTel = "+33765549836",
}: Props) {
  const [tab, setTab] = useState<TabKey>("videobooth");
  const [selected, setSelected] = useState<number>(0);

  const items = useMemo(
    () => (tab === "videobooth" ? videobooth : chateaux),
    [tab, videobooth, chateaux]
  );

  const scrollerRef = useRef<HTMLDivElement | null>(null);

  // Progression du défilement horizontal de la galerie
  const { scrollXProgress } = useScroll({ container: scrollerRef });
  const progress = useSpring(scrollXProgress, { stiffness: 200, damping: 30 });

  // ✅ WhatsApp URL builder mémoïsé
  const waNumber = whatsappTel.replace(/^\+/, "");
  const waHref = useCallback(
    (label: string) =>
      `https://wa.me/${waNumber}?text=${encodeURIComponent(
        `Bonjour ! Je souhaite des infos/réserver ${label} (date, lieu, horaires) : `
      )}`,
    [waNumber]
  );

  // ✅ details dépend de tab + waHref (résout le warning)
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
        icon: <Camera className="h-5 w-5 text-gold" />,
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
      icon: <Sparkles className="h-5 w-5 text-gold" />,
    };
  }, [tab, waHref]);

  const switchTab = (key: TabKey) => {
    setTab(key);
    setSelected(0);
    scrollerRef.current?.scrollTo({ left: 0 });
  };

  const scrollByCard = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLDivElement>("[data-card]");
    const step = card
      ? card.getBoundingClientRect().width + 16
      : el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  // ✅ Timer typé (remplace les (scrollerRef as any)._t)
  const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      id="animations"
      aria-labelledby="animations-title"
      className="relative w-full overflow-hidden bg-ink text-white">
      {/* Glow + liseré or */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(65%_45%_at_80%_30%,rgba(212,175,55,0.10),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="animations-title"
            index="02"
            label="Animations"
            title="Videobooth & châteaux gonflables"
            accent={["Videobooth"]}
            align="left"
            className="max-w-xl"
          />

          {/* Tabs */}
          <div
            className="inline-flex shrink-0 self-start rounded-full border border-white/10 bg-white/[0.03] p-1 md:self-auto"
            role="group"
            aria-label="Choisir une animation">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => switchTab(t.key)}
                className={cn(
                  "relative isolate inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                  tab === t.key ? "text-ink" : "text-white/70 hover:text-white"
                )}
                aria-pressed={tab === t.key}>
                {tab === t.key && (
                  <motion.span
                    layoutId="booth-tab"
                    className="absolute inset-0 -z-10 rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          {/* Carte d'infos */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-3xl bg-gradient-to-br from-gold/60 via-white/10 to-transparent p-px">
              <div className="min-h-[26rem] rounded-[calc(1.5rem-1px)] bg-ink-soft p-7">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                          {details.icon}
                        </span>
                        <h3 className="font-display text-2xl font-bold">
                          {details.title}
                        </h3>
                      </div>
                      <span className="shrink-0 rounded-full border border-gold/40 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-gold">
                        {details.price}
                      </span>
                    </div>

                    <ul className="mt-7 space-y-3">
                      {details.bullets.map((b, i) => (
                        <motion.li
                          key={b}
                          className="flex items-start gap-3 text-sm text-white/75"
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.1 + i * 0.05,
                            ease: EASE_OUT,
                          }}>
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                          <span>{b}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-8 flex items-center justify-between">
                      <Magnetic strength={0.25}>
                        <a
                          href={details.cta}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-shine inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp/60"
                          aria-label={`Contacter pour ${details.title} sur WhatsApp`}>
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp
                        </a>
                      </Magnetic>
                      <span className="font-mono text-xs text-white/45 tabular-nums">
                        {String(selected + 1).padStart(2, "0")} /{" "}
                        {String(items.length).padStart(2, "0")}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Scroll images */}
          <div className="relative order-1 lg:order-2">
            <div
              ref={scrollerRef}
              onScroll={() => {
                if (scrollEndTimer.current)
                  clearTimeout(scrollEndTimer.current);
                scrollEndTimer.current = setTimeout(onScrollEnd, 120);
              }}
              className="
                relative flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2
                [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              "
              aria-label="Galerie défilante">
              {items.map((m, idx) => (
                <motion.button
                  key={`${tab}-${m.src}-${idx}`}
                  data-card
                  type="button"
                  onClick={() => setSelected(idx)}
                  initial={{ opacity: 0, x: 40, scale: 0.94 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: idx * 0.08, ease: EASE_OUT }}
                  className={cn(
                    "group relative w-[82%] shrink-0 snap-start overflow-hidden rounded-3xl border transition-colors duration-500 sm:w-[60%] md:w-[48%] lg:w-[340px]",
                    idx === selected ? "border-gold/70" : "border-white/10",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  )}
                  aria-label={`Voir la photo ${idx + 1}`}>
                  <div className="relative h-80 md:h-[26rem]">
                    <Image
                      src={m.src}
                      alt={m.alt}
                      fill
                      sizes="(max-width: 640px) 82vw, (max-width: 768px) 60vw, (max-width: 1024px) 48vw, 340px"
                      className="object-cover transition-transform duration-700 ease-expo group-hover:scale-110"
                      priority={idx === 0}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 font-mono text-xs text-white/80">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {(m.caption ?? m.alt) && (
                    <div className="absolute bottom-4 left-4">
                      <p className="rounded-full bg-black/40 px-3 py-1 text-xs text-white/90 backdrop-blur">
                        {m.caption ?? m.alt}
                      </p>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Progression + boutons */}
            <div className="mt-5 flex items-center gap-4">
              <div className="relative h-px flex-1 bg-white/10">
                <motion.div
                  className="absolute inset-0 origin-left bg-gold"
                  style={{ scaleX: progress }}
                />
              </div>
              <button
                type="button"
                onClick={() => scrollByCard("left")}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-gold hover:bg-gold hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Précédent">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard("right")}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-gold hover:bg-gold hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Suivant">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
