// app/components/Header.tsx
"use client";

import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { ArrowRight, Play } from "lucide-react";

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

      {/* Navbar translucide avec liseré or */}
      <div className="absolute inset-x-0 top-0 z-20">
        <div className="backdrop-blur supports-[backdrop-filter]:bg-[#0f0f10]/40 border-b border-[#D4AF37]/20">
          <Navbar />
        </div>
      </div>

      {/* Contenu héro */}
      <div className="relative z-10 flex items-center justify-center px-6">
        <div className="w-full max-w-5xl py-28 md:py-40 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            <span className="block">KLB Events</span>
            <span className="mt-3 block text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#c8a340] to-[#9b7d2b]">
              Sonorisation • Lumières • Ambiance
            </span>
          </h1>

          <p className="mt-4 text-white/90 tracking-wide text-sm md:text-base">
            DJ professionnel — mariages, anniversaires, entreprises. Prestations
            sur mesure au style
            <span className="text-[#D4AF37]"> premium</span>.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
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
          </div>

          <div className="mt-10 mx-auto h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <p className="mt-3 text-xs text-gray-300">
            Disponible en Île-de-France et alentours • Matériel pro • Contrat &
            facture
          </p>
        </div>
      </div>
    </header>
  );
}
