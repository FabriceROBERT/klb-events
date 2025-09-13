import React from "react";
import Link from "next/link";
import {
  Headphones,
  Sparkles,
  CalendarClock,
  Music,
  MapPin,
} from "lucide-react";

export default function AboutMe() {
  return (
    <section
      id="a-propos"
      aria-labelledby="about-title"
      className="w-full bg-[#0f0f10] text-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* En‑tête */}
        <div className="text-center mb-12">
          <h2
            id="about-title"
            className="text-3xl md:text-4xl font-semibold tracking-tight">
            À propos de <span className="text-[#D4AF37]">KLB Events</span>
          </h2>
          <p className="text-gray-400 mt-3 max-w-3xl mx-auto">
            KLB Events est une{" "}
            <strong className="font-semibold">
              micro‑entreprise fondée en 2016
            </strong>
            . Nous utilisons du{" "}
            <strong className="font-semibold">matériel professionnel</strong>{" "}
            pour un rendu à la hauteur de vos attentes. Forts de{" "}
            <strong className="font-semibold">
              plus de 10 ans d’expérience
            </strong>{" "}
            dans l’événementiel, nous accompagnons et animons des événements de
            toutes tailles, avec une sélection musicale pointue et des
            enchaînements soignés.
          </p>

          {/* Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm">
              Depuis 2016
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm">
              Micro‑entreprise
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm">
              10+ ans d’expérience
            </span>
          </div>
        </div>

        {/* Triptyque valeur */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ValueCard
            icon={<Headphones className="h-6 w-6" aria-hidden />}
            title="Matériel pro"
            desc="Systèmes son & éclairage fiables, pour une qualité et une régularité irréprochables."
          />
          <ValueCard
            icon={<CalendarClock className="h-6 w-6" aria-hidden />}
            title="Accompagnement A→Z"
            desc="Brief avant‑événement, gestion des temps forts et coordination le jour J."
          />
          <ValueCard
            icon={<Sparkles className="h-6 w-6" aria-hidden />}
            title="Ambiance sur‑mesure"
            desc="Mixs fluides, lecture de salle et playlists adaptées à votre public."
          />
        </div>

        {/* Genres & Lieux */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <TagPanel
            icon={<Music className="h-5 w-5" aria-hidden />}
            title="Styles maîtrisés"
            tags={[
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
            ]}
          />
          <TagPanel
            icon={<MapPin className="h-5 w-5" aria-hidden />}
            title="Lieux & formats"
            tags={[
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
            ]}
          />
        </div>

        {/* Paragraphe identité */}
        <div className="mt-10 max-w-4xl mx-auto text-gray-300 leading-relaxed">
          <p>
            DJ dynamique, nous créons l’ambiance idéale grâce à un <em>mix</em>{" "}
            précis et à des
            <span className="whitespace-nowrap"> playlists</span> soigneusement
            sélectionnées. Notre spécialité :
            <strong className="font-semibold">
              {" "}
              des expériences mémorables
            </strong>
            , quel que soit le format de votre événement.
          </p>
          <p className="mt-4">
            Chez KLB Events,{" "}
            <strong className="font-semibold">
              l’animation DJ est plus qu’une passion :
            </strong>{" "}
            C’est un <strong className="font-semibold">métier</strong>. Nous
            mettons la préparation, la technique et l’humain au centre pour
            sublimer votre moment.
          </p>
        </div>
      </div>
    </section>
  );
}

function ValueCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl p-[1px] bg-gradient-to-br from-[#D4AF37]/70 via-[#9b7d2b]/40 to-transparent">
      <div className="rounded-2xl h-full p-6 bg-gradient-to-b from-[#141415] to-[#0f0f10] ring-1 ring-white/5">
        <div className="flex items-center gap-3 text-[#D4AF37]">
          {icon}
          <h3 className="text-base font-semibold text-white">{title}</h3>
        </div>
        <p className="mt-2 text-sm text-gray-300">{desc}</p>
      </div>
    </div>
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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center gap-2 text-gray-200">
        {icon}
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <div className="mt-4 flex items-center  flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-full border uppercase border-white/10 bg-[#0f0f10] px-3 py-1 text-xs text-gray-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors duration-200 hover:text-[#D4AF37]">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
