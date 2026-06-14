"use client";

import { useState } from "react";

const PACKAGES = [
  {
    nombre: "Starter Digital",
    tag: "Para empezar",
    incluye: ["Chatbot WhatsApp Básico", "1 automatización de tareas"],
    setup: "$11,000",
    mensualidad: "$2,800",
    ahorro: "−$1,500 en setup",
  },
  {
    nombre: "Negocio Completo",
    tag: "Más popular",
    incluye: ["Agente de Voz IA Básico", "Chatbot WhatsApp Básico"],
    setup: "$18,000",
    mensualidad: "$5,800",
    ahorro: "−$3,000 setup · −$800/mes",
    highlight: true,
  },
  {
    nombre: "Suite IA",
    tag: "Máximo rendimiento",
    incluye: ["Agente de Voz IA Pro", "Chatbot WhatsApp Pro", "Gestión Documental Básico"],
    setup: "$38,000",
    mensualidad: "$11,000",
    ahorro: "−$7,000 setup · −$1,800/mes",
  },
];

function CheckSmall() {
  return (
    <svg className="shrink-0 mt-1" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="7" fill="#10B98122" />
      <path d="M4 7l2.2 2.2L10 5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PaquetesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="paquetes"
      className="min-h-[100dvh] flex flex-col justify-center py-16 px-5 relative"
      style={{ background: "var(--color-canvas)" }}
    >
      <div
        className="absolute top-0 left-0 right-0"
        aria-hidden="true"
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(27,110,243,0.5) 50%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-5xl w-full">
        {/* Header */}
        <div className="mb-12">
          <h2
            className="font-heading font-bold mb-3"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--color-text-base)", textWrap: "balance" }}
          >
            Combina y ahorra
          </h2>
          <p className="text-lg" style={{ color: "var(--color-text-muted)" }}>
            Paquetes con descuento para negocios que quieren más de un producto.
          </p>
        </div>

        {/* Package cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {PACKAGES.map((pkg, i) => {
            const isHovered = hovered === i;
            return (
              <div
                key={pkg.nombre}
                className="rounded-2xl p-8 lg:p-10 flex flex-col cursor-default"
                style={{
                  background: isHovered ? "var(--color-surface-2)" : "var(--color-surface)",
                  border: `1px solid ${isHovered ? "var(--color-border-strong)" : "var(--color-border)"}`,
                  boxShadow: isHovered ? "var(--shadow-card-hover)" : "var(--shadow-card)",
                  transform: isHovered ? "translateY(-4px) scale(1.03)" : "translateY(0) scale(1)",
                  transition: "transform 220ms ease-out, background 220ms ease-out, box-shadow 220ms ease-out, border-color 220ms ease-out",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Tag */}
                <span
                  className="self-start text-xs font-bold px-3 py-1 rounded-full mb-5"
                  style={
                    pkg.highlight
                      ? { background: "var(--color-cta)", color: "white" }
                      : { background: "rgba(27,110,243,0.1)", color: "var(--color-primary-light)" }
                  }
                >
                  {pkg.tag}
                </span>

                {/* Nombre */}
                <h3
                  className="font-heading font-bold text-2xl mb-5"
                  style={{ color: "var(--color-text-base)" }}
                >
                  {pkg.nombre}
                </h3>

                {/* Incluye */}
                <ul className="space-y-2 mb-8 flex-1">
                  {pkg.incluye.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-base" style={{ color: "var(--color-text-muted)" }}>
                      <CheckSmall />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Precios */}
                <div
                  className="flex flex-col gap-3 mb-7 pt-6"
                  style={{ borderTop: "1px solid var(--color-border)" }}
                >
                  <div>
                    <span
                      className="font-heading font-extrabold"
                      style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)", color: "var(--color-text-base)" }}
                    >
                      {pkg.setup}
                    </span>
                    <span className="text-sm ml-2" style={{ color: "var(--color-text-muted)" }}>MXN setup</span>
                  </div>
                  <div>
                    <span
                      className="font-heading font-bold text-2xl"
                      style={{ color: "var(--color-primary-light)" }}
                    >
                      {pkg.mensualidad}
                    </span>
                    <span className="text-sm ml-2" style={{ color: "var(--color-text-muted)" }}>MXN/mes</span>
                  </div>
                  <div
                    className="inline-flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-lg self-start"
                    style={{ background: "rgba(16,185,129,0.1)", color: "var(--color-success)" }}
                  >
                    {pkg.ahorro}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#contacto"
                  className="inline-flex justify-center items-center px-6 py-4 rounded-xl text-base font-bold transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
                  style={
                    pkg.highlight
                      ? { background: "var(--color-cta)", color: "white", boxShadow: "var(--shadow-cta)" }
                      : { border: "1px solid var(--color-border-strong)", color: "var(--color-primary-light)", background: "rgba(27,110,243,0.08)" }
                  }
                >
                  Agendar demo
                </a>
              </div>
            );
          })}
        </div>

        {/* Conditions */}
        <div className="mt-10 text-center space-y-1">
          <p className="text-xs" style={{ color: "var(--color-text-caption)" }}>
            Precios en MXN. IVA no incluido. · Período mínimo: 3 meses. · Setup: pago único, no reembolsable.
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-caption)" }}>
            Contrato 6 meses: −10% en mensualidades. · Contrato 12 meses: −15%.
          </p>
        </div>
      </div>
    </section>
  );
}
