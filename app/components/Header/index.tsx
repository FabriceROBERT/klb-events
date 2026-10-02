// app/components/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Scroll from "@/app/components/Scroll";
import {
  EASE_OUT,
  Equalizer,
  Magnetic,
  RollText,
} from "@/app/components/Motion";
import { cn } from "@/lib/utils";
import Materiels from "@/public/img/materiels.png";

const SERVICES = ["Sonorisation", "Lumières", "Ambiance"];

export default function Header({ className }: { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Parallax du fond + sortie du contenu au scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, reduce ? 1.05 : 1.25]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);

  // Halo doré qui suit le pointeur
  const mx = useMotionValue(50);
  const my = useMotionValue(35);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${sx}% ${sy}%, rgba(212,175,55,0.22), transparent 60%)`;
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <header
      id="top"
      ref={ref}
      role="banner"
      onPointerMove={onPointerMove}
      className={cn(
        "relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink",
        className
      )}>
      {/* Image de fond en parallax */}
      <motion.div
        className="absolute inset-0 -z-20"
        style={{ y: bgY, scale: bgScale }}
        aria-hidden="true">
        <Image
          src={Materiels}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="object-cover opacity-55"
        />
      </motion.div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/55 to-ink"
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: spotlight }}
        aria-hidden="true"
      />

      {/* Grille verticale qui se dessine */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 mx-auto grid max-w-7xl grid-cols-2 px-6 md:grid-cols-4"
        aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className={cn(
              "origin-top border-l border-white/[0.06]",
              i === 3 && "border-r",
              i > 1 && "hidden md:block",
              i === 1 && "md:border-r-0 border-r"
            )}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.6, delay: 0.1 * i, ease: EASE_OUT }}
          />
        ))}
      </div>

      {/* Contenu héro */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-12 pt-32">
        <motion.p
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-white/70 md:text-xs"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}>
          <Equalizer bars={5} className="h-3 shrink-0" />
          <span>
            DJ professionnel <span className="text-gold">—</span> depuis 2016
          </span>
        </motion.p>

        <HeroTitle />

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-2 md:items-end md:gap-12">
          <ServicesBeat />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: EASE_OUT }}>
            <p className="max-w-md text-sm leading-relaxed text-white/75 md:text-base">
              DJ professionnel — mariages, anniversaires, entreprises.
              Prestations sur mesure au style{" "}
              <span className="font-serif italic text-gold">premium</span>.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link
                  href="#contact"
                  className="btn-shine group inline-flex items-center gap-3 rounded-full bg-gold py-2 pl-6 pr-2 text-sm font-semibold text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  aria-label="Demander un devis">
                  Demander un devis
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-gold transition-transform duration-500 ease-expo group-hover:-rotate-45">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Magnetic>
              <Link
                href="#pricing"
                className="group inline-flex items-center rounded-full border border-white/20 px-6 py-[0.95rem] text-sm font-medium text-white transition-colors hover:border-gold/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Voir les offres">
                <RollText>Voir les offres</RollText>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Barre basse */}
      <motion.div
        className="relative mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 pb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 sm:flex-row sm:items-center sm:justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3, ease: EASE_OUT }}>
        <p>
          Disponible en Île-de-France et alentours • Matériel pro • Contrat &
          facture
        </p>
        <a
          href="#pricing"
          className="group inline-flex items-center gap-3 self-start text-white/70 hover:text-gold sm:self-auto"
          aria-label="Défiler vers les offres">
          Scroll
          <span className="relative block h-10 w-px overflow-hidden bg-white/15">
            <span className="scroll-cue absolute inset-x-0 top-0 block h-1/2 bg-gold" />
          </span>
        </a>
      </motion.div>

      <Scroll />
    </header>
  );
}

/* ---------- Sous-composants animés ---------- */

function HeroTitle() {
  return (
    // KLB au-dessus de EVENTS, alignés à gauche, interligne serré
    <h1 className="mt-6 font-display text-[clamp(2.5rem,9.5vw,6.5rem)] font-extrabold uppercase leading-[0.82] tracking-tight text-white">
      <span className="sr-only">KLB Events</span>
      <span aria-hidden="true" className="block">
        <Chars text="KLB" delay={0.25} />
      </span>
      <span
        aria-hidden="true"
        className="block text-transparent [-webkit-text-stroke:1px_var(--color-gold)] md:[-webkit-text-stroke:1.5px_var(--color-gold)]">
        <Chars text="Events" delay={0.5} />
      </span>
    </h1>
  );
}

function Chars({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="inline-flex overflow-hidden pb-[0.04em]">
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "105%", rotate: 8 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{ duration: 1.1, delay: delay + i * 0.06, ease: EASE_OUT }}>
          {c}
        </motion.span>
      ))}
    </span>
  );
}

/** Les trois services s'allument tour à tour, comme un séquenceur. */
function ServicesBeat() {
  const reduce = useReducedMotion();
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setBeat((b) => (b + 1) % SERVICES.length),
      1600
    );
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.85, ease: EASE_OUT }}>
      <p className="sr-only">Sonorisation • Lumières • Ambiance</p>
      <div
        aria-hidden="true"
        className="flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-lg font-semibold sm:text-xl md:text-2xl">
        {SERVICES.map((s, i) => (
          <span key={s} className="flex items-center gap-4">
            <span
              className={cn(
                "relative transition-colors duration-500",
                reduce || beat === i ? "text-gold" : "text-white/30"
              )}>
              {s}
              {!reduce && beat === i && (
                <motion.span
                  layoutId="hero-beat"
                  className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-gold"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </span>
            {i < SERVICES.length - 1 && (
              <span className="h-1.5 w-1.5 rounded-full bg-gold/50" />
            )}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
