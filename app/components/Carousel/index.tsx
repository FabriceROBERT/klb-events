// app/components/Carousel.tsx
"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";

export type Slide = { src: string; alt: string; caption?: string };

type Props = {
  slides: Slide[];
  interval?: number;
  /** Hauteur tailwind (ex: "h-72 md:h-80") */
  heightClass?: string;
  /** "dark" => contrôles sombres, "light" => contrôles clairs */
  theme?: "dark" | "light";
  /** Couleur active des bullets */
  dotActive?: string; // ex: "#D4AF37"
  /** Afficher la légende */
  showCaptions?: boolean;
  /** Passe les images en NB ; si true + hover => repasse en couleur au survol */
  grayscale?: boolean;
  grayscaleHover?: boolean;
  className?: string;
};

export default function Carousel({
  slides,
  interval = 4000,
  heightClass = "h-72 md:h-80",
  theme = "light",
  dotActive = "#D4AF37",
  showCaptions = false,
  grayscale = false,
  grayscaleHover = false,
  className = "",
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const len = slides.length;

  const goTo = useCallback(
    (i: number) => setIndex(((i % len) + len) % len),
    [len]
  );
  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  // Respecte "reduced motion" + pause onglet inactif
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ).current;

  useEffect(() => {
    if (paused || len <= 1 || prefersReducedMotion) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [next, paused, len, interval, prefersReducedMotion]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Clavier
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "Home") goTo(0);
    if (e.key === "End") goTo(len - 1);
  };

  // Swipe mobile
  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    deltaX.current = e.touches[0].clientX - startX.current;
  };
  const onTouchEnd = () => {
    const dx = deltaX.current;
    startX.current = null;
    deltaX.current = 0;
    if (dx > 40) prev();
    if (dx < -40) next();
  };

  const slidesMemo = useMemo(() => slides, [slides]);

  const ctrlBase =
    theme === "dark"
      ? "bg-black/50 text-white hover:bg-black/60 focus-visible:ring-black/30"
      : "bg-white/70 text-black hover:bg-white/90 focus-visible:ring-black/20";

  const grayscaleClass = grayscale
    ? grayscaleHover
      ? "filter grayscale group-hover:grayscale-0"
      : "filter grayscale"
    : "";

  return (
    <div
      className={`relative select-none ${
        grayscaleHover ? "group" : ""
      } ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Carrousel d’images"
      onKeyDown={onKeyDown}>
      <div
        className={`relative ${heightClass} overflow-hidden shadow-lg rounded-2xl`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        tabIndex={0}>
        {/* Piste */}
        <div
          className="absolute inset-0 flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
          aria-live="polite">
          {slidesMemo.map((s, i) => (
            <figure
              key={`${s.src}-${i}`}
              className="relative shrink-0 w-full h-full"
              aria-label={`Diapositive ${i + 1} sur ${len}`}>
              <Image
                src={s.src}
                alt={s.alt}
                fill
                className={`object-cover ${grayscaleClass}`}
                sizes="(max-width: 768px) 100vw, 480px"
                priority={i === 0}
                draggable={false}
              />
              {showCaptions && s.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-sm text-white">
                  {s.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        {/* Boutons */}
        {len > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Image précédente"
              className={`absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 backdrop-blur focus:outline-none focus-visible:ring-2 ${ctrlBase}`}>
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Image suivante"
              className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 backdrop-blur focus:outline-none focus-visible:ring-2 ${ctrlBase}`}>
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Indicateurs */}
      {len > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {slidesMemo.map((_, i) => {
            const active = i === index;
            return (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Aller à l’image ${i + 1}`}
                aria-current={active ? "true" : "false"}
                className="h-2.5 w-2.5 rounded-full transition"
                style={{
                  backgroundColor: active ? dotActive : "rgba(0,0,0,0.25)",
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
