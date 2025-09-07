import ContactCard from "@/app/components/ContactCard";
import Header from "@/app/components/Header";
import Portfolio from "@/app/components/Portfolio";
import PricingSection from "@/app/components/PricingSection";
import Section1 from "@/app/components/Section1";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      {/* Section Formules */}
      <section id="pricing" className=" w-full">
        <PricingSection />
      </section>
      <Section1 />

      {/* Section Portfolio */}
      <section id="portfolio" className=" w-full">
        <Portfolio />
      </section>
      {/* Section Contact */}
      <section id="contact" className="w-full bg-zinc-950 py-16 md:px-20">
        <ContactCard
          name="LANGROMME David"
          role="DJ • KLB Events"
          email="david.langromme@protonmail.com"
          phone="+33765549836"
          avatarSrc="/img/photoprofile.png"
          whatsappNumber="+33765549836"
          whatsappMessage="Bonjour, j’aimerais un devis pour mon événement."
          className="max-w-none w-full px-6 md:px-10"
        />
      </section>

      {/* Si tu as une section “Qui je suis ?” */}
      {/* <section id="about" className="scroll-mt-16 w-full">
        <About />
      </section> */}
    </main>
  );
}
