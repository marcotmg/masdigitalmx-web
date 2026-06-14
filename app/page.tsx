import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroSection from "@/components/sections/HeroSection";
import ProblemasSection from "@/components/sections/ProblemasSection";
import ProductosSection from "@/components/sections/ProductosSection";
import SectoresSection from "@/components/sections/SectoresSection";
import PricingSection from "@/components/sections/PricingSection";
import PaquetesSection from "@/components/sections/PaquetesSection";
import ContactoSection from "@/components/sections/ContactoSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProblemasSection />
        <ProductosSection />
        <SectoresSection />
        <PricingSection />
        <PaquetesSection />
        <ContactoSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
