// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import {
  EASE_OUT,
  Equalizer,
  Magnetic,
  RollText,
} from "@/app/components/Motion";
import { cn } from "@/lib/utils";

const PHONE_DISPLAY = "07 65 54 98 36";
const PHONE_TEL = "+33765549836";

// WhatsApp: numéro sans "+" + message
const WA_NUMBER = PHONE_TEL.replace(/^\+/, ""); // "33765549836"
const WA_TEXT = encodeURIComponent(
  "Bonjour ! Je souhaite des infos pour un événement."
);
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;

const LINKS = [
  { id: "pricing", label: "Offres" },
  { id: "animations", label: "Animations" },
  { id: "portfolio", label: "Galerie" },
  { id: "aboutMe", label: "À propos" },
  { id: "contact", label: "Contact" },
] as const;
const SECTION_IDS = LINKS.map((l) => l.id);

/** Section actuellement au centre de l'écran. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const { scrollY } = useScroll();

  // Capsule vitrée après le hero, masquée quand on descend
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 400);
  });

  // Menu mobile : bloque le scroll et se ferme avec Échap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.nav
        className="fixed inset-x-0 top-0 z-50 px-3 md:px-6"
        animate={{ y: hidden && !open ? "-130%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        aria-label="Navigation principale">
        <div
          className={cn(
            "mx-auto flex h-16 items-center justify-between rounded-full px-5 transition-all duration-500 ease-expo",
            scrolled || open
              ? "mt-3 max-w-6xl border border-white/10 bg-ink/70 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl"
              : "mt-0 max-w-7xl border border-transparent"
          )}>
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-display text-lg font-bold tracking-wide text-white"
            aria-label="Aller à l’accueil">
            <Equalizer bars={4} className="h-4" />
            <span>
              <span className="text-gold">KLB</span> Events
            </span>
          </Link>

          {/* Liens desktop */}
          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`/#${l.id}`}
                  className="group relative isolate block rounded-full px-4 py-2 text-sm text-white/80 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-current={active === l.id ? "true" : undefined}>
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-gold/30 bg-gold/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <RollText>{l.label}</RollText>
                </a>
              </li>
            ))}
          </ul>

          {/* Actions desktop */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href={`tel:${PHONE_TEL}`}
              className="group hidden items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-sm text-white transition-colors hover:bg-gold/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold xl:inline-flex">
              <Phone className="h-4 w-4 text-gold transition-transform duration-500 ease-expo group-hover:rotate-12" />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <Magnetic strength={0.25}>
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-medium text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp/60"
                aria-label="Discuter sur WhatsApp">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Magnetic>
          </div>

          {/* Bouton menu (mobile + tablette) */}
          <button
            type="button"
            className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-menu">
            <span className="relative block h-3 w-6">
              <motion.span
                className="absolute left-0 top-0 h-[2px] w-6 rounded-full bg-current"
                animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              />
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] w-6 rounded-full bg-current"
                animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              />
            </span>
          </button>
        </div>
      </motion.nav>

      {/* Menu plein écran */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink px-6 pb-10 pt-28 lg:hidden"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 [background:radial-gradient(70%_50%_at_100%_0%,rgba(212,175,55,0.18),transparent_70%)]"
            />
            <ul className="relative space-y-2">
              {LINKS.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.a
                    href={`/#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-1 font-display text-[clamp(1.75rem,8vw,3rem)] font-bold text-white active:text-gold"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.15 + i * 0.06,
                      ease: EASE_OUT,
                    }}>
                    <span className="font-mono text-xs text-gold">
                      0{i + 1}
                    </span>
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.div
              className="relative mt-auto grid gap-3 sm:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}>
              <a
                href={`tel:${PHONE_TEL}`}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 px-4 py-3 text-sm text-white">
                <Phone className="h-4 w-4 text-gold" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-medium text-black">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
