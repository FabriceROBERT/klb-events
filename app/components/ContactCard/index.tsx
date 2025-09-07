// app/components/ContactCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MessageCircle, Copy, Check } from "lucide-react";
import React, { useMemo, useState } from "react";

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
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-[#D4AF37]/80 via-[#9b7d2b]/40 to-transparent">
        <div className="rounded-2xl bg-[#0f0f10] text-gray-100">
          {/* En-tête */}
          <div className="flex items-center gap-4 p-5 border-b border-white/10">
            <div className="relative h-16 w-16 shrink-0">
              {avatarSrc ? (
                <Image
                  src={avatarSrc}
                  alt={`Avatar de ${name}`}
                  fill
                  className="rounded-full object-cover ring-2 ring-[#D4AF37]/40"
                  sizes="64px"
                  priority
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center text-lg font-semibold ring-2 ring-[#D4AF37]/40">
                  {initials || "?"}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold truncate">{name}</h3>
              {role && <p className="text-sm text-gray-400 truncate">{role}</p>}
            </div>
          </div>

          {/* Lignes de contact */}
          <ul className="p-5 space-y-3">
            {/* Email */}
            <li className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10">
                  <Mail className="h-4 w-4 text-[#D4AF37]" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-gray-400">Email</p>
                  <Link
                    href={`mailto:${email}`}
                    className="block text-sm hover:underline truncate">
                    {email}
                  </Link>
                </div>
              </div>
              <button
                onClick={() => handleCopy(email, "email")}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-xs hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                aria-label="Copier l'adresse email">
                {copied === "email" ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Copié
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copier
                  </>
                )}
              </button>
            </li>

            {/* Téléphone */}
            <li className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10">
                  <Phone className="h-4 w-4 text-[#D4AF37]" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-gray-400">Téléphone</p>
                  <a
                    href={`tel:${sanitizedPhone}`}
                    className="block text-sm hover:underline truncate">
                    {phone}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(sanitizedPhone, "phone")}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-xs hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                aria-label="Copier le numéro de téléphone">
                {copied === "phone" ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Copié
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copier
                  </>
                )}
              </button>
            </li>

            {/* WhatsApp */}
            <li className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10">
                  <MessageCircle className="h-4 w-4 text-[#D4AF37]" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-gray-400">WhatsApp</p>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm hover:underline truncate">
                    Ouvrir la conversation
                  </a>
                </div>
              </div>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#D4AF37] px-3 py-1.5 text-xs font-medium text-black hover:bg-[#c49a2c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                aria-label="Contacter via WhatsApp">
                Écrire sur WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Liseré or décoratif */}
      <div className="mt-3 h-0.5 w-24 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
    </section>
  );
}
