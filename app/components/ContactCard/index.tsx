// app/components/ContactCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MessageCircle, Copy, Check } from "lucide-react";
import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Equalizer, Stagger, StaggerItem } from "@/app/components/Motion";

type Props = {
  name: string;
  role?: string;
  email: string;
  phone: string; // ex: "+33612345678" ou "06 12 34 56 78"
  avatarSrc?: string; // ex: "/img/photoprofile.png"
  whatsappNumber?: string; // par défaut = phone
  whatsappMessage?: string; // message prérempli optionnel
  className?: string;
};

export default function ContactCard({
  name,
  role,
  email,
  phone,
  avatarSrc,
  whatsappNumber,
  whatsappMessage = "Bonjour, je souhaite des infos sur vos prestations.",
  className = "",
}: Props) {
  const [copied, setCopied] = useState<"email" | "phone" | null>(null);

  // Initiales si pas d'image
  const initials = useMemo(() => {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join("");
  }, [name]);

  // Formatters
  const sanitizedPhone = useMemo(() => phone.replace(/[^\d+]/g, ""), [phone]);

  // wa.me exige l'indicatif international sans "+"
  const waNumber = useMemo(() => {
    const raw = (whatsappNumber ?? sanitizedPhone).replace(/[^\d]/g, "");
    // Si tu reçois "06..." sans indicatif, tu peux préfixer "33" ici si besoin.
    return raw.startsWith("0") ? `33${raw.slice(1)}` : raw;
  }, [sanitizedPhone, whatsappNumber]);

  const waHref = useMemo(() => {
    const text = encodeURIComponent(whatsappMessage);
    return `https://wa.me/${waNumber}?text=${text}`;
  }, [waNumber, whatsappMessage]);

  const handleCopy = async (val: string, key: "email" | "phone") => {
    try {
      await navigator.clipboard.writeText(val);
      setCopied(key);
      setTimeout(() => setCopied(null), 1200);
    } catch {
      // no-op
    }
  };

  return (
    <section
      className={["w-full mx-auto", className].join(" ")}
      aria-label={`Contact ${name}`}>
      {/* Cadre or */}
      <div className="relative rounded-3xl p-px bg-gradient-to-br from-gold/70 via-white/10 to-transparent">
        <div className="rounded-[calc(1.5rem-1px)] bg-ink-soft text-white">
          {/* En-tête */}
          <div className="flex items-center gap-4 p-6 border-b border-white/10">
            <div className="relative h-16 w-16 shrink-0">
              {avatarSrc ? (
                <Image
                  src={avatarSrc}
                  alt={`Avatar de ${name}`}
                  fill
                  className="rounded-full object-cover ring-2 ring-gold/50"
                  sizes="64px"
                  priority
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center text-lg font-semibold ring-2 ring-gold/50">
                  {initials || "?"}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-xl font-bold truncate">{name}</h3>
              {role && <p className="text-sm text-white/55 truncate">{role}</p>}
            </div>
            <Equalizer bars={5} className="ml-auto h-5" />
          </div>

          {/* Lignes de contact */}
          <Stagger as="ul" stagger={0.1} className="p-3 space-y-1">
            {/* Email */}
            <StaggerItem
              as="li"
              className="flex items-center justify-between gap-3 rounded-2xl p-3 transition-colors duration-300 hover:bg-white/[0.04]">
              <div className="flex items-center gap-3 min-w-0">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 border border-gold/25">
                  <Mail className="h-4 w-4 text-gold" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">Email</p>
                  <Link
                    href={`mailto:${email}`}
                    className="block text-sm text-white/90 underline-offset-4 hover:text-gold hover:underline truncate">
                    {email}
                  </Link>
                </div>
              </div>
              <button
                onClick={() => handleCopy(email, "email")}
                className="inline-flex min-h-11 min-w-[6.5rem] items-center justify-center overflow-hidden rounded-full border border-white/10 px-4 text-xs transition-colors hover:border-gold/50 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Copier l'adresse email">
                <CopyLabel copied={copied === "email"} />
              </button>
            </StaggerItem>

            {/* Téléphone */}
            <StaggerItem
              as="li"
              className="flex items-center justify-between gap-3 rounded-2xl p-3 transition-colors duration-300 hover:bg-white/[0.04]">
              <div className="flex items-center gap-3 min-w-0">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 border border-gold/25">
                  <Phone className="h-4 w-4 text-gold" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">Téléphone</p>
                  <a
                    href={`tel:${sanitizedPhone}`}
                    className="block text-sm text-white/90 underline-offset-4 hover:text-gold hover:underline truncate">
                    {phone}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(sanitizedPhone, "phone")}
                className="inline-flex min-h-11 min-w-[6.5rem] items-center justify-center overflow-hidden rounded-full border border-white/10 px-4 text-xs transition-colors hover:border-gold/50 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Copier le numéro de téléphone">
                <CopyLabel copied={copied === "phone"} />
              </button>
            </StaggerItem>

            {/* WhatsApp */}
            <StaggerItem
              as="li"
              className="flex items-center justify-between gap-3 rounded-2xl p-3 transition-colors duration-300 hover:bg-white/[0.04]">
              <div className="flex items-center gap-3 min-w-0">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 border border-gold/25">
                  <MessageCircle className="h-4 w-4 text-gold" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">WhatsApp</p>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-white/90 underline-offset-4 hover:text-gold hover:underline truncate">
                    Ouvrir la conversation
                  </a>
                </div>
              </div>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex min-h-11 items-center justify-center rounded-full bg-gold px-4 text-xs font-semibold text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Contacter via WhatsApp">
                Écrire sur WhatsApp
              </a>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
      {/* Note légale / clarification */}
      <p className="mt-5 text-center text-xs text-white/45">
        Les devis sont gratuits et n’impliquent aucun engagement de votre part.
      </p>
    </section>
  );
}

/** Libellé « Copier » qui bascule sur « Copié » avec un glissement vertical. */
function CopyLabel({ copied }: { copied: boolean }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={copied ? "done" : "idle"}
        className={`inline-flex items-center gap-2 ${copied ? "text-gold" : ""}`}
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -12, opacity: 0 }}
        transition={{ duration: 0.2 }}>
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" /> Copié
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" /> Copier
          </>
        )}
      </motion.span>
    </AnimatePresence>
  );
}
