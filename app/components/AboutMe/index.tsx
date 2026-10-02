import React from "react";
import {
  Headphones,
  Sparkles,
  CalendarClock,
  Music,
  MapPin,
} from "lucide-react";
import {
  CountUp,
  Reveal,
  ScrollRevealText,
  SectionHeading,
  Stagger,
  StaggerItem,
  TiltCard,
} from "@/app/components/Motion";

const STYLES = [
  "salsa",
  "rap",
  "hip‑hop",
  "funk",
  "variétés françaises",
  "afrobeats",
  "amapiano",
  "dancehall",
  "reggae",
  "house",
  "kompa",
  "zouk",
];

const FORMATS = [
  "mariages",
  "soirées privées",
  "discothèques",
  "restaurants & bars",
  "barbecue party",
  "pool party",
  "entreprises / lancements",
  "festivals",
  "concerts",
  "Afterworks",
];

const STATS = [
  { to: 2016, from: 2000, suffix: "", label: "Année de création" },
  { to: 10, from: 0, suffix: "+", label: "Ans d’expérience" },
  { to: STYLES.length, from: 0, suffix: "", label: "Styles maîtrisés" },
  { to: FORMATS.length, from: 0, suffix: "", label: "Formats d’événements" },
];

const ACCENT = "font-serif italic text-gold";

export default function AboutMe() {
  return (
    <section
      id="aboutMe"
      aria-labelledby="about-title"
      className="relative w-full overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(50%_40%_at_100%_20%,rgba(212,175,55,0.10),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        {/* En‑tête */}
        <SectionHeading
          id="about-title"
          index="05"
          label="À propos"
          title="À propos de KLB Events"
          accent={["KLB", "Events"]}
          className="max-w-3xl mx-auto"
          description={
            <>
              KLB Events est une{" "}
              <strong className="font-semibold text-white">
                micro‑entreprise fondée en 2016
              </strong>
              . Nous utilisons du{" "}
              <strong className="font-semibold text-white">
                matériel professionnel
              </strong>{" "}
              pour un rendu à la hauteur de vos attentes. Forts de{" "}
              <strong className="font-semibold text-white">
                plus de 10 ans d’expérience
              </strong>{" "}
              dans l’événementiel, nous accompagnons et animons des événements
              de toutes tailles, avec une sélection musicale pointue et des
              enchaînements soignés.
            </>
          }
        />

        {/* Chiffres clés */}
        <Stagger
          as="ul"
          stagger={0.1}
          className="mt-16 grid grid-cols-2 border-y border-white/10 md:grid-cols-4">
          {STATS.map((s, i) => (
            <StaggerItem
              as="li"
              key={s.label}
              className={[
                "px-4 py-8 text-center",
                i % 2 === 1 ? "border-l border-white/10" : "",
                i >= 2 ? "border-t border-white/10 md:border-t-0" : "",
                i === 2 ? "md:border-l" : "",
              ].join(" ")}>
              <CountUp
                to={s.to}
                from={s.from}
                suffix={s.suffix}
                className="font-display text-3xl font-extrabold text-gold tabular-nums md:text-4xl"
              />
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
                {s.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Triptyque valeur */}
        <Stagger stagger={0.12} className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <ValueCard
            index="01"
            icon={<Headphones className="h-5 w-5" aria-hidden />}
            title="Matériel pro"
            desc="Systèmes son & éclairage fiables, pour une qualité et une régularité irréprochables."
          />
          <ValueCard
            index="02"
            icon={<CalendarClock className="h-5 w-5" aria-hidden />}
            title="Accompagnement A→Z"
            desc="Brief avant‑événement, gestion des temps forts et coordination le jour J."
          />
          <ValueCard
            index="03"
            icon={<Sparkles className="h-5 w-5" aria-hidden />}
            title="Ambiance sur‑mesure"
            desc="Mixs fluides, lecture de salle et playlists adaptées à votre public."
          />
        </Stagger>

        {/* Genres & Lieux */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <TagPanel
            icon={<Music className="h-5 w-5" aria-hidden />}
            title="Styles maîtrisés"
            tags={STYLES}
          />
          <TagPanel
            icon={<MapPin className="h-5 w-5" aria-hidden />}
            title="Lieux & formats"
            tags={FORMATS}
          />
        </div>

        {/* Paragraphe identité : les mots s'allument au scroll */}
        <div className="mx-auto mt-24 max-w-4xl space-y-8 font-display text-xl font-semibold leading-snug md:mt-32 md:text-3xl">
          <ScrollRevealText
            segments={[
              {
                text: "DJ dynamique, nous créons l’ambiance idéale grâce à un",
              },
              { text: "mix", className: ACCENT },
              {
                text: "précis et à des playlists soigneusement sélectionnées. Notre spécialité :",
              },
              { text: "des expériences mémorables,", className: "text-gold" },
              { text: "quel que soit le format de votre événement." },
            ]}
          />
          <ScrollRevealText
            segments={[
              { text: "Chez KLB Events," },
              {
                text: "l’animation DJ est plus qu’une passion :",
                className: "text-gold",
              },
              { text: "c’est un" },
              { text: "métier.", className: ACCENT },
              {
                text: "Nous mettons la préparation, la technique et l’humain au centre pour sublimer votre moment.",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function ValueCard({
  index,
  icon,
  title,
  desc,
}: {
  index: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <StaggerItem className="h-full">
      <TiltCard className="h-full rounded-3xl">
        <div className="h-full rounded-3xl bg-gradient-to-br from-gold/50 via-white/10 to-transparent p-px">
          <div className="h-full rounded-[calc(1.5rem-1px)] bg-gradient-to-b from-ink-soft to-ink p-7">
            <div className="flex items-center justify-between">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold transition-transform duration-700 ease-expo group-hover:rotate-[360deg]">
                {icon}
              </span>
              <span className="font-mono text-xs text-white/35">{index}</span>
            </div>
            <h3 className="mt-6 font-display text-lg font-bold text-white">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">{desc}</p>
          </div>
        </div>
      </TiltCard>
    </StaggerItem>
  );
}

function TagPanel({
  icon,
  title,
  tags,
}: {
  icon: React.ReactNode;
  title: string;
  tags: string[];
}) {
  return (
    <Reveal className="h-full">
      <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7">
        <div className="flex items-center gap-2 text-white">
          <span className="text-gold">{icon}</span>
          <h3 className="font-display text-base font-bold">{title}</h3>
        </div>
        <Stagger as="ul" stagger={0.03} className="mt-5 flex flex-wrap items-center gap-2">
          {tags.map((t) => (
            <StaggerItem
              as="li"
              key={t}
              className="cursor-default rounded-full border border-white/10 bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white/70 transition-colors duration-200 hover:border-gold hover:bg-gold/10 hover:text-gold">
              {t}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Reveal>
  );
}
