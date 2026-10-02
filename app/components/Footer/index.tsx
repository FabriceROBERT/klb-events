// app/components/Footer.tsx
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import {
  Equalizer,
  Magnetic,
  RollText,
  SplitText,
} from "@/app/components/Motion";

const LINKS = [
  { href: "/#pricing", label: "Offres" },
  { href: "/#animations", label: "Animations" },
  { href: "/#portfolio", label: "Galerie" },
  { href: "/#aboutMe", label: "À propos" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_60%_at_50%_100%,rgba(212,175,55,0.10),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-7xl px-6 pt-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-display text-xl font-bold">
              <Equalizer bars={4} />
              <span>
                <span className="text-gold">KLB</span> Events
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/55">
              Sonorisation • Lumières • Ambiance. Disponible en Île-de-France et
              alentours.
            </p>
          </div>

          <nav aria-label="Liens du pied de page">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
              Navigation
            </p>
            <ul className="mt-4 space-y-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="group inline-flex text-white/75">
                    <RollText>{l.label}</RollText>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                Contact
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href="tel:+33765549836"
                    className="text-white/75 transition-colors hover:text-gold">
                    07 65 54 98 36
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:klbevents77@gmail.com"
                    className="text-white/75 transition-colors hover:text-gold">
                    klbevents77@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            <Magnetic>
              <a
                href="#top"
                aria-label="Revenir en haut de page"
                className="group inline-flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                <ArrowUp className="h-5 w-5 transition-transform duration-500 ease-expo group-hover:-translate-y-1" />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Signature XXL */}
        <div aria-hidden="true" className="mt-16 select-none overflow-hidden">
          <SplitText
            as="span"
            text="KLB Events"
            accent={["KLB", "Events"]}
            accentClassName="bg-gradient-to-b from-gold/45 to-gold/0 bg-clip-text text-transparent"
            stagger={0.12}
            className="block whitespace-nowrap text-center font-display text-[clamp(2rem,7vw,6rem)] font-extrabold uppercase leading-[0.9] tracking-tight"
          />
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 py-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 sm:flex-row sm:justify-between">
          <p>© {year} KLB Events</p>
          <p>Matériel pro • Contrat & facture</p>
        </div>
      </div>
    </footer>
  );
}
