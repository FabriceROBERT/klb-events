import { ArrowUpRight } from "lucide-react";
import AboutMe from "@/app/components/AboutMe";
import CastleAndVideobooth from "@/app/components/CastleAndVideobooth";
import ContactCard from "@/app/components/ContactCard";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import Portfolio from "@/app/components/Portfolio";
import PricingSection from "@/app/components/PricingSection";
import Section1 from "@/app/components/Section1";
import {
  Magnetic,
  Reveal,
  RotatingBadge,
  ScrollProgress,
  SectionHeading,
  VelocityMarquee,
} from "@/app/components/Motion";

const PHONE = "+33765549836";
const QUOTE_MESSAGE = "Bonjour, j’aimerais un devis pour mon événement.";
const QUOTE_HREF = `https://wa.me/${PHONE.replace(/^\+/, "")}?text=${encodeURIComponent(QUOTE_MESSAGE)}`;

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="flex min-h-screen flex-col">
        <Header />

        <VelocityMarquee
          items={[
            "Mariages",
            "Anniversaires",
            "Corporate",
            "Galas",
            "Baptêmes",
            "Afterworks",
          ]}
        />

        <PricingSection />
        <CastleAndVideobooth />
        <Section1 />
        <Portfolio />

        <VelocityMarquee
          baseVelocity={3}
          items={["Sonorisation", "Lumières", "Ambiance", "Videobooth 360°"]}
        />

        <AboutMe />

        {/* Section Contact */}
        <section
          id="contact"
          aria-labelledby="contact-title"
          className="relative w-full overflow-hidden border-t border-white/10 bg-ink">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [background:radial-gradient(50%_50%_at_20%_60%,rgba(212,175,55,0.12),transparent_70%)]"
          />
          <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-24 md:py-32 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                id="contact-title"
                index="06"
                label="Contact"
                title="Parlons de votre événement"
                accent={["événement"]}
                accentClassName="font-serif font-normal italic text-gold"
                align="left"
                description="Une date, un lieu, une envie ? Écrivez-nous pour recevoir votre devis."
              />
              <Reveal delay={0.35} className="mt-12">
                <Magnetic strength={0.3}>
                  <a
                    href={QUOTE_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Demander un devis sur WhatsApp"
                    className="group block rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-ink">
                    <RotatingBadge text="Devis gratuit • Sans engagement • ">
                      <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-500 ease-expo group-hover:scale-110 md:h-24 md:w-24">
                        <ArrowUpRight className="h-8 w-8 transition-transform duration-500 ease-expo group-hover:rotate-45" />
                      </span>
                    </RotatingBadge>
                  </a>
                </Magnetic>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <ContactCard
                name="Dj Baz"
                role="KLB Events"
                email="klbevents77@gmail.com"
                phone={PHONE}
                avatarSrc="/img/photoprofile.png"
                whatsappNumber={PHONE}
                whatsappMessage={QUOTE_MESSAGE}
                className="w-full"
              />
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
