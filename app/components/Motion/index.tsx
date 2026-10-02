// app/components/Motion/index.tsx
// Primitives d'animation partagées par toutes les sections (style motion design).
"use client";

import React, { useEffect, useId, useRef } from "react";
import {
  animate,
  motion,
  MotionConfig,
  useAnimationFrame,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Désactive les transformations si l'OS demande moins d'animations. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/* ---------- Apparition au scroll ---------- */

export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}>
      {children}
    </motion.div>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  show: (stagger: number = 0.06) => ({
    transition: { staggerChildren: stagger },
  }),
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const STAGGER_TAGS = {
  div: motion.div,
  ul: motion.ul,
  li: motion.li,
  span: motion.span,
} as const;

/** Conteneur dont les enfants <StaggerItem> apparaissent en cascade. */
export function Stagger({
  children,
  className,
  stagger = 0.06,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: keyof typeof STAGGER_TAGS;
}) {
  const Comp = STAGGER_TAGS[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      variants={staggerContainer}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}>
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof typeof STAGGER_TAGS;
}) {
  const Comp = STAGGER_TAGS[as] as typeof motion.div;
  return (
    <Comp className={className} variants={staggerChild}>
      {children}
    </Comp>
  );
}

/* ---------- Typographie cinétique ---------- */

/**
 * Chaque mot remonte depuis un masque. `accent` liste les mots à styliser
 * avec `accentClassName` (or par défaut).
 */
export function SplitText({
  text,
  as: Tag = "span",
  id,
  className,
  accent = [],
  accentClassName = "text-gold",
  delay = 0,
  stagger = 0.07,
  onMount = false,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  id?: string;
  className?: string;
  accent?: string[];
  accentClassName?: string;
  delay?: number;
  stagger?: number;
  /** true = joue au montage (hero), sinon à l'entrée dans le viewport */
  onMount?: boolean;
}) {
  const words = text.split(" ");
  const Comp = SPLIT_TAGS[Tag] as typeof motion.span;
  // Le déclencheur est sur le conteneur : les mots, masqués par leur
  // overflow-hidden, ne sont jamais « visibles » pour l'IntersectionObserver.
  const trigger = onMount
    ? { animate: "show" }
    : {
        whileInView: "show",
        viewport: { once: true, margin: "0px 0px -10% 0px" },
      };

  return (
    <Comp
      id={id}
      className={className}
      aria-label={text}
      initial="hidden"
      {...trigger}>
      {words.map((w, i) => (
        <React.Fragment key={`${w}-${i}`}>
          <span
            aria-hidden="true"
            className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className={cn(
                "inline-block origin-bottom-left",
                accent.includes(w) && accentClassName
              )}
              variants={splitWord}
              custom={delay + i * stagger}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </Comp>
  );
}

const SPLIT_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

const splitWord: Variants = {
  hidden: { y: "110%", rotate: 6 },
  show: (delay: number) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 1, delay, ease: EASE_OUT },
  }),
};

type Segment = { text: string; className?: string };

/** Les mots s'allument progressivement au fil du scroll. */
export function ScrollRevealText({
  segments,
  className,
}: {
  segments: Segment[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });

  const words = segments.flatMap((s) =>
    s.text
      .split(" ")
      .filter(Boolean)
      .map((w) => ({ w, className: s.className }))
  );

  return (
    <p ref={ref} className={className}>
      {words.map(({ w, className: wc }, i) =>
        reduce ? (
          <span key={i} className={wc}>
            {w}{" "}
          </span>
        ) : (
          <RevealWord
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            className={wc}>
            {w}
          </RevealWord>
        )
      )}
    </p>
  );
}

function RevealWord({
  children,
  progress,
  range,
  className,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className={className}>
        {children}
      </motion.span>{" "}
    </>
  );
}

/* ---------- Titres de section ---------- */

export function SectionHeading({
  index,
  label,
  title,
  accent,
  accentClassName,
  description,
  id,
  align = "center",
  className,
}: {
  index: string;
  label: string;
  title: string;
  accent?: string[];
  accentClassName?: string;
  description?: React.ReactNode;
  id?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={cn(centered && "text-center", className)}>
      <motion.div
        className={cn(
          "flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-gold",
          centered && "justify-center"
        )}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE_OUT }}>
        <span>{index}</span>
        <motion.span
          aria-hidden="true"
          className="h-px w-10 origin-left bg-gold/60"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
        />
        <span>{label}</span>
      </motion.div>

      <SplitText
        as="h2"
        id={id}
        text={title}
        accent={accent}
        accentClassName={accentClassName}
        className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl"
      />

      {description && (
        <Reveal delay={0.25}>
          <p
            className={cn(
              "mt-5 max-w-2xl text-white/60",
              centered && "mx-auto"
            )}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- Interactions au pointeur ---------- */

/** L'élément est attiré par le curseur (souris uniquement). */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn("inline-block", className)}>
      {children}
    </motion.div>
  );
}

/** Carte qui s'incline vers le curseur, avec reflet doré. */
export function TiltCard({
  children,
  className,
  max = 7,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 18 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(500px circle at ${mx}% ${my}%, rgba(212,175,55,0.16), transparent 45%)`;

  const onMove = (e: React.PointerEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    if (reduce || e.pointerType !== "mouse") return;
    rotateY.set((px - 0.5) * max * 2);
    rotateX.set(-(py - 0.5) * max * 2);
  };
  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={cn("group relative", className)}>
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glare }}
      />
    </motion.div>
  );
}

/* ---------- Défilements ---------- */

/** Bandeau de texte XXL dont la vitesse et l'inclinaison suivent le scroll. */
export function VelocityMarquee({
  items,
  baseVelocity = -3,
  className,
}: {
  items: string[];
  baseVelocity?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });
  const skewX = useTransform(smoothVelocity, [-2500, 2500], [10, -10]);
  // 4 copies identiques : boucler sur 25 % = exactement une copie
  const x = useTransform(baseX, (v) => `${wrap(-50, -25, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    moveBy += direction.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  const copy = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span
            className={cn(
              "px-5 font-display text-3xl font-extrabold uppercase md:px-8 md:text-5xl",
              i % 2 === 0 ? "text-white" : "text-outline"
            )}>
            {item}
          </span>
          <Sparkle className="h-5 w-5 shrink-0 fill-gold text-gold md:h-7 md:w-7" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-full overflow-hidden border-y border-white/10 bg-ink py-5 md:py-6",
        className
      )}>
      <motion.div
        className="flex w-max whitespace-nowrap"
        style={{ x, skewX: reduce ? 0 : skewX }}>
        {copy}
        {copy}
        {copy}
        {copy}
      </motion.div>
    </div>
  );
}

/** Barre de progression dorée en haut de page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-gold-dark via-gold to-gold-light"
      style={{ scaleX }}
    />
  );
}

/* ---------- Détails ---------- */

/** Compteur animé à l'entrée dans le viewport. */
export function CountUp({
  to,
  from = 0,
  duration = 1.8,
  suffix = "",
  className,
}: {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const value = useMotionValue(from);
  const display = useTransform(value, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, { duration, ease: EASE_OUT });
    return () => controls.stop();
  }, [inView, to, duration, value]);

  return (
    <span className={className}>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
      <motion.span ref={ref} aria-hidden="true">
        {display}
      </motion.span>
    </span>
  );
}

/** Égaliseur DJ décoratif. */
export function Equalizer({
  bars = 5,
  className,
  barClassName = "bg-gold",
}: {
  bars?: number;
  className?: string;
  barClassName?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex h-4 items-end gap-[3px]", className)}>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={cn("eq-bar w-[3px] rounded-full", barClassName)}
          style={{
            animationDelay: `${-i * 0.17}s`,
            animationDuration: `${0.8 + (i % 3) * 0.22}s`,
          }}
        />
      ))}
    </span>
  );
}

/** Lien dont le texte « roule » vers le haut au survol. */
export function RollText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex h-[1.25em] overflow-hidden leading-[1.25em]",
        className
      )}>
      <span className="flex flex-col transition-transform duration-500 ease-expo group-hover:-translate-y-1/2 group-focus-visible:-translate-y-1/2">
        <span>{children}</span>
        <span aria-hidden="true" className="text-gold">
          {children}
        </span>
      </span>
    </span>
  );
}

/** Badge circulaire avec texte en rotation (CTA). */
export function RotatingBadge({
  text,
  children,
  className,
}: {
  text: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathId = `badge-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <span
      className={cn(
        "relative inline-flex h-40 w-40 items-center justify-center md:h-48 md:w-48",
        className
      )}>
      <svg
        viewBox="0 0 200 200"
        className="spin-slow absolute inset-0 h-full w-full"
        aria-hidden="true">
        <defs>
          <path
            id={pathId}
            d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
          />
        </defs>
        <text className="fill-white/80 font-mono text-[13px] uppercase">
          {/* textLength = circonférence : le texte fait exactement le tour */}
          <textPath href={`#${pathId}`} textLength={500} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      {children}
    </span>
  );
}
