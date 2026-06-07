import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PricingSection from "@/components/sections/PricingSection";
import ContactoSection from "@/components/sections/ContactoSection";

export const metadata: Metadata = {
  title: "Precios — +Digital MX | Planes de automatización con IA",
  description:
    "Plan Básico desde $8,000 MXN setup + $2,500 MXN/mes. Plan Pro desde $15,000 MXN + $4,500 MXN/mes. Sin contratos de largo plazo. Implementación en días.",
  openGraph: {
    title: "Precios — +Digital MX",
    description:
      "Planes de automatización con IA para tu negocio. Empieza simple, escala cuando quieras.",
    url: "https://masdigitalmx.com/pricing",
  },
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <PricingSection />
        <ContactoSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
