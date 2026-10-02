// app/components/Scroll.tsx
"use client";

import { LuckyFolks } from "@/public/svgs";
import Marquee from "react-fast-marquee";
import FestifLocation from "@/public/img/festiflocation.webp";
import Koezio from "@/public/img/koezio-white.webp";
import MagicForm from "@/public/img/MagicForm.webp";
import ClubEvent from "@/public/img/ClubEvent.png";
import BeachBowling from "@/public/img/BeachBowling.png";
import AuBureau from "@/public/img/AuBureau-white.png";

import Image from "next/image";

const LOGOS = [
  { src: FestifLocation, alt: "Festif Location" },
  { src: Koezio, alt: "Koezio" },
  { src: MagicForm, alt: "MagicForm" },
  { src: ClubEvent, alt: "ClubEvent" },
  { src: BeachBowling, alt: "Beach Bowling" },
  { src: AuBureau, alt: "Au Bureau" },
];

export default function Scroll() {
  return (
    <div className="relative w-full border-t border-white/10 bg-ink/40 py-5 backdrop-blur-sm [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <Marquee
        speed={40}
        direction="left"
        pauseOnHover
        autoFill
        aria-label="Logos défilants">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="mx-8 flex items-center gap-14">
            <span className="opacity-60 transition-opacity duration-300 hover:opacity-100">
              <LuckyFolks />
            </span>
            {LOGOS.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={logo.src.width}
                height={logo.src.height}
                className="h-auto w-[100px] object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                priority={i === 0}
              />
            ))}
          </div>
        ))}
      </Marquee>
    </div>
  );
}
