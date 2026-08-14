import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactoSection from "@/components/sections/ContactoSection";
import { sectores, getSector } from "@/lib/sectores";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return sectores.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) return {};

  return {
    title: `${sector.nombre} — +Digital MX | Automatización con IA`,
    description: sector.descripcion,
    alternates: {
      canonical: `/sector/${slug}`,
    },
    openGraph: {
      title: `Automatización IA para ${sector.nombre} — +Digital MX`,
      description: sector.descripcion,
      // Relativa a propósito: metadataBase (app/layout.tsx) ya resuelve el host.
      // Hardcodearlo duplica la fuente de verdad del dominio.
      url: `/sector/${slug}`,
    },
  };
}

export default async function SectorPage({ params }: Props) {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) notFound();

  const { nombre, subVerticals, problema, solucion, metrica, color, descripcion, beneficios } =
    sector;

  return (
    <>
      <Header />
      <main className="pt-16" style={{ background: "var(--color-canvas)" }}>
        {/* Hero del sector */}
        <section className="py-24 px-5 relative overflow-hidden">
          {/* Glow con el color del sector */}
          <div
            className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
            aria-hidden="true"
            style={{
              background: `radial-gradient(circle, ${color.startsWith("var") ? "rgba(27,110,243,0.15)" : color + "22"} 0%, transparent 65%)`,
            }}
          />

          <div className="relative mx-auto max-w-4xl">
            <Link
              href="/#sectores"
              className="inline-flex items-center gap-2 text-sm mb-10 transition-colors"
              style={{ color: "var(--color-text-caption)" }}
            >
              <ArrowLeft size={14} />
              Todos los sectores
            </Link>

            <p
              className="text-sm font-medium mb-3"
              style={{ color: "var(--color-text-caption)" }}
            >
              {subVerticals}
            </p>

            <h1
              className="font-heading font-bold leading-tight mb-6"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                color: "var(--color-text-base)",
                textWrap: "balance",
              }}
            >
              Automatización IA
              <br />
              para{" "}
              <span style={{ color }}>{nombre}</span>
            </h1>

            <p
              className="text-xl leading-relaxed mb-10 max-w-2xl"
              style={{ color: "var(--color-text-muted)" }}
            >
              {descripcion}
            </p>

            {/* Métrica destacada */}
            <div
              className="inline-block rounded-2xl px-8 py-5 mb-10"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <p
                className="font-heading font-bold text-5xl mb-1"
                style={{ color }}
              >
                {metrica}
              </p>
              <p className="text-sm" style={{ color: "var(--color-text-caption)" }}>
                Resultado promedio de nuestros clientes
              </p>
            </div>

            {/* Problema / Solución */}
            <div className="grid sm:grid-cols-2 gap-5 mb-10">
              <div
                className="rounded-xl p-6"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid rgba(239,68,68,0.2)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 2l8 8M10 2l-8 8" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="text-sm font-semibold" style={{ color: "#EF4444" }}>
                    El problema
                  </span>
                </div>
                <p style={{ color: "var(--color-text-muted)" }}>{problema}</p>
              </div>

              <div
                className="rounded-xl p-6"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid rgba(16,185,129,0.2)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6l3 3 5-5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm font-semibold" style={{ color: "#10B981" }}>
                    La solución
                  </span>
                </div>
                <p style={{ color: "var(--color-text-muted)" }}>{solucion}</p>
              </div>
            </div>

            {/* Beneficios */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <h2
                className="font-heading font-bold text-xl mb-6"
                style={{ color: "var(--color-text-base)" }}
              >
                ¿Qué incluye?
              </h2>
              <ul className="space-y-4">
                {beneficios.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${color.startsWith("var") ? "rgba(27,110,243,0.15)" : color + "22"}` }}
                    >
                      <Check size={11} style={{ color }} strokeWidth={2.5} />
                    </div>
                    <span style={{ color: "var(--color-text-muted)" }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 cursor-pointer"
                style={{
                  background: "var(--color-cta)",
                  boxShadow: "var(--shadow-cta)",
                }}
              >
                Agendar demo gratis
              </a>
              {/* /pricing nunca se construyó — daba 404 desde las 6 páginas de
                  sector. La sección de precios sí existe en el Home, y es la
                  misma ancla que ya usa components/Footer.tsx. */}
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                style={{
                  border: "1px solid rgba(27,110,243,0.35)",
                  color: "var(--color-text-base)",
                  background: "rgba(27,110,243,0.08)",
                }}
              >
                Ver precios
              </Link>
            </div>
          </div>
        </section>

        <ContactoSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
