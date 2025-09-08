// app/components/Scroll.tsx
"use client";

import { LuckyFolks } from "@/public/svgs";
import Marquee from "react-fast-marquee";
import FestifLocation from "@/public/img/festiflocation.webp";
import Koezio from "@/public/img/koezio-white.webp";
import MagicForm from "@/public/img/MagicForm.webp";
import ClubEvent from "@/public/img/ClubEvent.png";

import Image from "next/image";

export default function Scroll() {
  return (
    <div className="w-full mt-16">
      <Marquee
        speed={50}
        direction="left"
        pauseOnHover
        autoFill
        aria-label="Logos défilants">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="mx-10 flex items-center gap-10">
            {/* Si ton composant SVG accepte className, tu peux le dimensionner ainsi */}
            <LuckyFolks
              className="h-16 w-auto text-[#D4AF37]"
              aria-label="Lucky Folks"
            />
            <Image
              src={FestifLocation}
              alt="Festif Location"
              width={100}
              height={100}
              className="object-contain"
              priority={i === 0}
            />
            <Image
              src={Koezio}
              alt="Koezio"
              width={100}
              height={100}
              className="object-contain"
              priority={i === 0}
            />
            <Image
              src={MagicForm}
              alt="MagicForm"
              width={100}
              height={100}
              className="object-contain"
              priority={i === 0}
            />
            <Image
              src={ClubEvent}
              alt="ClubEvent"
              width={100}
              height={100}
              className="object-contain"
              priority={i === 0}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
