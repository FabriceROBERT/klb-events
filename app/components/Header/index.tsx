// app/components/Header.tsx
"use client";

import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { ArrowRight, Play } from "lucide-react";
import Scroll from "@/app/components/Scroll";
import { motion, useReducedMotion, type Variants } from "framer-motion";

// ✅ Easing tuples
const EASE_OUT = [0.16, 1, 0.3, 1] as const; // ≈ easeOut
const LINEAR = [0, 0, 1, 1] as const; // linéaire

export default function Header({ className }: { className?: string }) {
  return (
    <header
      role="banner"
      className={`relative w-full min-h-[80vh] md:min-h-screen ${
        className ?? ""
      }`}>
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-[url('/img/materiels.png')] bg-cover bg-center"
        aria-hidden="true"
      />
      {/* Overlay sombre */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#0f0f10]/70 to-[#0f0f10]/90"
        aria-hidden="true"
      />
      {/* Vignette dorée subtile */}
      <div
        className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_50%_at_50%_20%,rgba(212,175,55,0.15),transparent_70%)]"
        aria-hidden="true"
      />

      {/* Navbar */}
      <div className="absolute inset-x-0 top-0 z-20">
        <div className="backdrop-blur supports-[backdrop-filter]:bg-[#0f0f10]/40 border-b border-[#D4AF37]/20">
          <Navbar />
        </div>
      </div>

      {/* Contenu héro */}
      <div className="relative z-10 flex items-center justify-center px-6">
        <div className="w-full max-w-5xl py-28 md:py-40 text-center">
          <AnimatedHeroTitle
            line1="KLB Events"
            line2="Sonorisation • Lumières • Ambiance"
          />

          <motion.p
            className="mt-4 text-white/90 tracking-wide text-sm md:text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: EASE_OUT }}>
            DJ professionnel — mariages, anniversaires, entreprises. Prestations
            sur mesure au style <span className="text-[#D4AF37]">premium</span>.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75, ease: EASE_OUT }}>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium bg-[#D4AF37] text-black hover:bg-[#c49a2c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              aria-label="Demander un devis">
              Demander un devis <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium border border-[#D4AF37]/60 text-white hover:bg-white/5"
              aria-label="Voir les offres">
              Voir les offres <Play className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            className="mt-10 mx-auto h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.9, ease: EASE_OUT }}
            style={{ transformOrigin: "center" }}
          />
          <motion.p
            className="mt-3 text-xs text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.4, ease: EASE_OUT }}>
            Disponible en Île-de-France et alentours • Matériel pro • Contrat &
            facture
          </motion.p>

          <Scroll />
        </div>
      </div>
    </header>
  );
}

/* ---------- Sous-composants animés ---------- */

function AnimatedHeroTitle({ line1, line2 }: { line1: string; line2: string }) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (delay = 0) => ({
      opacity: 1,
      transition: { delayChildren: delay, staggerChildren: 0.035 },
    }),
  };

  const char: Variants = {
    hidden: { y: reduce ? 0 : 18, opacity: 0, filter: "blur(4px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.45, ease: EASE_OUT },
    },
  };

  return (
    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
      <motion.span
        className="block"
        initial="hidden"
        animate="visible"
        variants={container}
        custom={0.15}
        aria-label={line1}>
        {line1.split("").map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={char}
            aria-hidden="true">
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </motion.span>

      <motion.span
        className="mt-3 block text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#c8a340] to-[#9b7d2b]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: EASE_OUT }}>
        <Shimmer once={false}>{line2}</Shimmer>
      </motion.span>
    </h1>
  );
}

/** Effet “shimmer” doré en boucle */
function Shimmer({
  children,
  once = false,
}: {
  children: React.ReactNode;
  once?: boolean;
}) {
  return (
    <motion.span
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.9) 50%, rgba(212,175,55,0.2) 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        backgroundSize: "200% 100%",
        display: "inline-block",
      }}
      initial={{ backgroundPositionX: "0%" }}
      animate={{ backgroundPositionX: ["0%", "200%"] }}
      transition={{
        duration: 2.4,
        ease: LINEAR, // ✅ plus de string
        repeat: once ? 0 : Infinity,
        repeatType: "loop",
      }}>
      {children}
    </motion.span>
  );
}
