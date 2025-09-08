// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const PHONE_DISPLAY = "07 65 54 98 36";
const PHONE_TEL = "+33765549836";

// WhatsApp: numéro sans "+" + message
const WA_NUMBER = PHONE_TEL.replace(/^\+/, ""); // "33765549836"
const WA_TEXT = encodeURIComponent(
  "Bonjour ! Je souhaite des infos pour un événement."
);
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed inset-x-0 top-0 z-50 isolate overflow-visible">
      {/* Bandeau + blur */}
      <div className="relative backdrop-blur border-b border-white/10 overflow-visible">
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        <div className="container mx-auto flex h-14 items-center justify-between px-6 overflow-visible">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-semibold tracking-wide text-gray-100"
            aria-label="Aller à l’accueil">
            <span className="text-[#D4AF37]">KLB</span> Events
          </Link>

          {/* Bouton mobile */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-100 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={open}>
            <Menu className="h-5 w-5" />
          </button>

          {/* Zone droite desktop : menu + téléphone + WhatsApp */}
          <div className="hidden md:flex items-center gap-4 overflow-visible">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="flex items-center gap-2">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}>
                    <Link
                      href="/events"
                      className={`text-black ${
                        isActive("/events")
                          ? "ring-1 ring-[#D4AF37]/50 rounded-lg"
                          : ""
                      }`}>
                      Événements
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}>
                    <Link
                      href="/#pricing"
                      className={`text-black ${
                        isActive("/offers")
                          ? "ring-1 ring-[#D4AF37]/50 rounded-lg"
                          : ""
                      }`}>
                      Offres
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem className="relative">
                  <NavigationMenuTrigger className="text-black">
                    Plus
                  </NavigationMenuTrigger>
                  <NavigationMenuContent
                    className="
                      z-[60] md:left-auto md:right-0
                      w-[min(420px,calc(100vw-2rem))]
                      max-h-[75vh] overflow-auto
                      bg-[#0f0f10] border border-white/10
                    ">
                    <ul className="grid w-[min(480px,calc(100vw-2rem))] gap-2 p-3 md:w-[520px] md:grid-cols-2">
                      {/* À propos */}
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/about"
                            className="group block rounded-lg border border-white/10 bg-[#141415] p-3 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]">
                            <div className="flex items-start gap-3">
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-[#D4AF37]">
                                  À propos
                                </div>
                                <p className="mt-0.5 text-xs text-gray-400">
                                  Notre approche
                                </p>
                              </div>
                              <span
                                aria-hidden
                                className="ml-auto mt-0.5 text-xs text-gray-400 transition-transform group-hover:translate-x-0.5">
                                →
                              </span>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {/* Galerie */}
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="#portfolio"
                            className="group block rounded-lg border border-white/10 bg-[#141415] p-3 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]">
                            <div className="flex items-start gap-3">
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-[#D4AF37]">
                                  Galerie
                                </div>
                                <p className="mt-0.5 text-xs text-gray-400">
                                  Vos souvenirs
                                </p>
                              </div>
                              <span
                                aria-hidden
                                className="ml-auto mt-0.5 text-xs text-gray-400 transition-transform group-hover:translate-x-0.5">
                                →
                              </span>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* 🔁 Remplacement du CTA par WhatsApp */}
                <NavigationMenuItem>
                  <a
                    href={WA_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2 text-sm font-medium text-black hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60"
                    aria-label="Discuter sur WhatsApp">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* 📞 Téléphone (desktop) */}
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 rounded-xl border border-[#D4AF37]/50 px-3 py-2 text-sm text-gray-100 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]">
              <Phone className="h-4 w-4 text-[#D4AF37]" />
              <span>{PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>

        {/* Panneau mobile */}
        {open && (
          <div className="md:hidden absolute inset-x-0 top-14 bg-[#0f0f10]/95 border-b border-[#D4AF37]/20 backdrop-blur">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-100 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  aria-label="Fermer le menu">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="mt-3 space-y-1">
                <li>
                  <Link
                    href="/events"
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-2 text-gray-100 hover:bg-white/5 ${
                      isActive("/events") ? "ring-1 ring-[#D4AF37]/50" : ""
                    }`}>
                    Événements
                  </Link>
                </li>
                <li>
                  <Link
                    href="/offers"
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-2 text-gray-100 hover:bg-white/5 ${
                      isActive("/offers") ? "ring-1 ring-[#D4AF37]/50" : ""
                    }`}>
                    Offres
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-gray-100 hover:bg-white/5">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gallery"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-gray-100 hover:bg-white/5">
                    Galerie
                  </Link>
                </li>

                {/* 📞 Téléphone (mobile) */}
                <li className="pt-2">
                  <a
                    href={`tel:${PHONE_TEL}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg border border-[#D4AF37]/50 px-3 py-2 text-center text-sm text-gray-100 hover:bg-white/5">
                    <span className="inline-flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4 text-[#D4AF37]" />
                      {PHONE_DISPLAY}
                    </span>
                  </a>
                </li>

                {/* 🔁 WhatsApp (mobile) */}
                <li className="pt-2">
                  <a
                    href={WA_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl bg-[#25D366] px-4 py-2 text-center text-sm font-medium text-black hover:brightness-95">
                    <span className="inline-flex items-center justify-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
