"use client";

import { useState } from "react";

/* ─── icons ─── */
function CheckIcon() {
  return (
    <svg className="shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="7.5" fill="#10B98122" />
      <path d="M4.5 7.5l2.3 2.3L10.5 6" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function DashIcon() {
  return (
    <svg className="shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="7.5" fill="#EEF2F811" />
      <path d="M5 7.5h5" stroke="#4A6A94" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── data ─── */
type Feature = { text: string; basic: boolean };

const VOZ_FEATURES: Feature[] = [
  { text: "Atención de llamadas 24/7", basic: true },
  { text: "Agendamiento automático en calendario", basic: true },
  { text: "Verificación de disponibilidad en tiempo real", basic: true },
  { text: "Confirmación por WhatsApp al cliente", basic: true },
  { text: "Alerta al dueño por WhatsApp", basic: true },
  { text: "FAQ configurables", basic: true },
  { text: "Reglas anti-alucinación", basic: true },
  { text: "Post-call analysis", basic: true },
  { text: "Número telefónico dedicado", basic: true },
  { text: "Llamadas outbound (seguimiento, recordatorios)", basic: false },
  { text: "Cancelación y modificación de citas por voz", basic: false },
  { text: "Reportes mensuales de actividad", basic: false },
];

const WA_FEATURES: Feature[] = [
  { text: "Respuesta automática 24/7 en WhatsApp", basic: true },
  { text: "Memoria conversacional", basic: true },
  { text: "Consulta de catálogo (Google Sheets)", basic: true },
  { text: "Clasificación de intención", basic: true },
  { text: "Escalamiento a humano", basic: true },
  { text: "Menú interactivo (botones, listas)", basic: true },
  { text: "Procesamiento de documentos adjuntos", basic: false },
  { text: "Integración con CRM/ERP", basic: false },
  { text: "Campañas outbound (con consentimiento)", basic: false },
  { text: "Reportes de conversaciones", basic: false },
];

const DOCS_FEATURES: Feature[] = [
  { text: "Recepción de documentos vía WhatsApp", basic: true },
  { text: "Clasificación automática por tipo", basic: true },
  { text: "Extracción de campos clave (OCR + LLM)", basic: true },
  { text: "Almacenamiento estructurado", basic: true },
  { text: "Dashboard de documentos procesados", basic: false },
  { text: "Integración con sistemas contables/ERP", basic: false },
  { text: "Exportación CSV/Excel", basic: false },
  { text: "Reglas de negocio personalizadas", basic: false },
];

const TAREAS_FEATURES = [
  "Diagnóstico y mapeo del proceso actual",
  "Diseño del flujo de automatización",
  "Integración con tus herramientas actuales",
  "Pruebas y ajustes incluidos",
  "Documentación del proceso entregada",
];

const PROCESOS_FEATURES = [
  "Diagnóstico profesional de sistemas actuales",
  "Arquitectura multi-sistema diseñada a medida",
  "Integración con CRM, ERP, facturación y más",
  "Pruebas end-to-end y puesta en marcha",
  "Monitoreo activo durante el primer mes",
  "Soporte y mantenimiento mensual incluido",
];

type PlanData = { setup: string; mens: string; incluido: string; adicional: string };
type StandardProductData = {
  kind: "standard";
  nombre: string;
  tagline: string;
  basico: PlanData;
  pro: PlanData;
  features: Feature[];
};

const PRODUCTS: StandardProductData[] = [
  {
    kind: "standard",
    nombre: "Agente de Voz IA",
    tagline: "Tu teléfono, siempre atendido",
    basico: { setup: "$12,000", mens: "$3,800", incluido: "200 min/mes", adicional: "$3.50/min" },
    pro:    { setup: "$18,000", mens: "$5,500", incluido: "500 min/mes", adicional: "$2.80/min" },
    features: VOZ_FEATURES,
  },
  {
    kind: "standard",
    nombre: "Chatbot WhatsApp",
    tagline: "Atiende en WhatsApp 24/7",
    basico: { setup: "$9,000",  mens: "$2,800", incluido: "500 conv/mes",   adicional: "$1.50/conv" },
    pro:    { setup: "$15,000", mens: "$4,800", incluido: "1,500 conv/mes", adicional: "$1.00/conv" },
    features: WA_FEATURES,
  },
  {
    kind: "standard",
    nombre: "Gestión Documental IA",
    tagline: "Tus documentos, procesados solos",
    basico: { setup: "$8,000",  mens: "$2,500", incluido: "200 docs/mes",   adicional: "$8.00/doc" },
    pro:    { setup: "$12,000", mens: "$4,500", incluido: "1,000 docs/mes", adicional: "$5.00/doc" },
    features: DOCS_FEATURES,
  },
];

/* ─── PlanCard — altura natural, sin flex-1/h-full ─── */
function PlanCard({ label, data, features, pro }: {
  label: string;
  data: PlanData;
  features: Feature[];
  pro: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const basicFeatures = features.filter((f) => f.basic);
  const proOnlyFeatures = features.filter((f) => !f.basic);
  const elevated = hovered || pro;

  return (
    <div
      className="rounded-2xl p-7 flex flex-col cursor-default"
      style={{
        background: elevated ? "var(--color-surface-2)" : "var(--color-surface)",
        border: `1px solid ${elevated ? "var(--color-border-strong)" : "var(--color-border)"}`,
        boxShadow: elevated ? "var(--shadow-card-hover)" : "var(--shadow-card)",
        transform: hovered ? "translateY(-4px) scale(1.03)" : "translateY(0) scale(1)",
        transition: "transform 220ms ease-out, background 220ms ease-out, box-shadow 220ms ease-out, border-color 220ms ease-out",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Plan label */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading font-bold text-xl" style={{ color: "var(--color-text-base)" }}>
          {label}
        </h3>
        {pro && (
          <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: "var(--color-cta)" }}>
            Recomendado
          </span>
        )}
      </div>

      {/* Prices */}
      <div className="mb-0.5">
        <span className="font-heading font-extrabold text-4xl" style={{ color: "var(--color-text-base)" }}>
          {data.setup}
        </span>
        <span className="text-sm ml-2" style={{ color: "var(--color-text-muted)" }}>MXN setup</span>
      </div>
      <div className="mb-3">
        <span className="font-heading font-bold text-2xl" style={{ color: "var(--color-primary-light)" }}>
          {data.mens}
        </span>
        <span className="text-sm ml-2" style={{ color: "var(--color-text-muted)" }}>MXN/mes</span>
      </div>

      {/* Unidades */}
      <div
        className="flex gap-3 mb-4 text-sm px-3 py-2 rounded-lg"
        style={{ background: "rgba(27,110,243,0.06)", color: "var(--color-text-caption)" }}
      >
        <span>{data.incluido} incluido</span>
        <span>·</span>
        <span>+{data.adicional} adicional</span>
      </div>

      {/* Features:
          Básico → solo lo que incluye (lista corta, sin dashes).
          Pro    → "Todo lo del Plan Básico +" exclusivos de Pro.
      */}
      {pro ? (
        <ul className="space-y-2.5 flex-1">
          <li className="flex items-start gap-2.5 text-sm font-medium mb-1" style={{ color: "var(--color-primary-light)" }}>
            <CheckIcon />
            <span>Todo lo del Plan Básico, más:</span>
          </li>
          {proOnlyFeatures.map((f) => (
            <li key={f.text} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--color-text-muted)" }}>
              <CheckIcon />
              <span>{f.text}</span>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-2.5 flex-1">
          {basicFeatures.map((f) => (
            <li key={f.text} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--color-text-muted)" }}>
              <CheckIcon />
              <span>{f.text}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <a
        href="#contacto"
        className="mt-5 inline-flex justify-center items-center px-5 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
        style={
          pro
            ? { background: "var(--color-cta)", color: "white", boxShadow: "var(--shadow-cta)" }
            : { border: "1px solid var(--color-border-strong)", color: "var(--color-primary-light)", background: "rgba(27,110,243,0.08)" }
        }
      >
        Agendar demo
      </a>
    </div>
  );
}

/* ─── StandardProduct ─── */
function StandardProduct({ product }: { product: StandardProductData }) {
  return (
    <>
      <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
        {product.tagline}
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <PlanCard label="Básico" data={product.basico} features={product.features} pro={false} />
        <PlanCard label="Pro"    data={product.pro}    features={product.features} pro={true}  />
      </div>
    </>
  );
}

/* ─── ProcessProduct — con feature lists para igualar altura ─── */
function ProcessProduct() {
  const [hovered, setHovered] = useState<number | null>(null);
  const tareaHov = hovered === 0;
  const procesosHov = hovered === 1;

  return (
    <>
      <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
        Tus sistemas, conectados — sin importar la complejidad
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {/* Tareas */}
        <div
          className="rounded-2xl p-7 flex flex-col cursor-default"
          style={{
            background: tareaHov ? "var(--color-surface-2)" : "var(--color-surface)",
            border: `1px solid ${tareaHov ? "var(--color-border-strong)" : "var(--color-border)"}`,
            boxShadow: tareaHov ? "var(--shadow-card-hover)" : "var(--shadow-card)",
            transform: tareaHov ? "translateY(-4px) scale(1.03)" : "translateY(0) scale(1)",
            transition: "transform 220ms ease-out, background 220ms ease-out, box-shadow 220ms ease-out, border-color 220ms ease-out",
          }}
          onMouseEnter={() => setHovered(0)}
          onMouseLeave={() => setHovered(null)}
        >
          <h3 className="font-heading font-bold text-xl mb-0.5" style={{ color: "var(--color-text-base)" }}>
            Automatización de Tareas
          </h3>
          <p className="text-xs mb-4" style={{ color: "var(--color-text-caption)" }}>Simple — 1 a 3 pasos, implementación rápida</p>

          <div className="mb-0.5">
            <span className="font-heading font-extrabold text-4xl" style={{ color: "var(--color-text-base)" }}>$3,500</span>
            <span className="text-sm ml-2" style={{ color: "var(--color-text-muted)" }}>– $6,000 MXN implementación</span>
          </div>
          <div className="mb-4">
            <span className="font-heading font-bold text-2xl" style={{ color: "var(--color-primary-light)" }}>$800</span>
            <span className="text-sm ml-2" style={{ color: "var(--color-text-muted)" }}>– $1,500 MXN/mes mantenimiento</span>
          </div>

          <div className="mb-5 px-3 py-2 rounded-lg text-sm" style={{ background: "rgba(16,185,129,0.08)", color: "var(--color-success)" }}>
            Diagnóstico: llamada informativa gratuita (30 min)
          </div>

          <ul className="space-y-3 flex-1">
            {TAREAS_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--color-text-muted)" }}>
                <CheckIcon />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <p className="text-xs mt-4 mb-1" style={{ color: "var(--color-text-caption)" }}>
            Ejemplos: descarga de facturas, notificaciones, sincronización de datos.
          </p>

          <a
            href="#contacto"
            className="mt-5 inline-flex justify-center items-center px-5 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
            style={{ border: "1px solid var(--color-border-strong)", color: "var(--color-primary-light)", background: "rgba(27,110,243,0.08)" }}
          >
            Agendar demo
          </a>
        </div>

        {/* Procesos */}
        <div
          className="rounded-2xl p-7 flex flex-col cursor-default"
          style={{
            background: "var(--color-surface-2)",
            border: `1px solid var(--color-border-strong)`,
            boxShadow: "var(--shadow-card-hover)",
            transform: procesosHov ? "translateY(-4px) scale(1.03)" : "translateY(0) scale(1)",
            transition: "transform 220ms ease-out, background 220ms ease-out, box-shadow 220ms ease-out, border-color 220ms ease-out",
          }}
          onMouseEnter={() => setHovered(1)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="flex items-center justify-between mb-0.5">
            <h3 className="font-heading font-bold text-xl" style={{ color: "var(--color-text-base)" }}>
              Automatización de Procesos
            </h3>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: "var(--color-cta)" }}>
              Recomendado
            </span>
          </div>
          <p className="text-xs mb-4" style={{ color: "var(--color-text-caption)" }}>Compleja — 3+ sistemas, impacto en toda la operación</p>

          <div className="mb-0.5">
            <span className="font-heading font-extrabold text-4xl" style={{ color: "var(--color-text-base)" }}>$10,000</span>
            <span className="text-sm ml-2" style={{ color: "var(--color-text-muted)" }}>– $25,000 MXN implementación</span>
          </div>
          <div className="mb-4">
            <span className="font-heading font-bold text-2xl" style={{ color: "var(--color-primary-light)" }}>$2,500</span>
            <span className="text-sm ml-2" style={{ color: "var(--color-text-muted)" }}>– $5,000 MXN/mes mantenimiento</span>
          </div>

          <div className="mb-5 px-3 py-2 rounded-lg text-sm" style={{ background: "rgba(27,110,243,0.06)", color: "var(--color-text-caption)" }}>
            <span style={{ color: "var(--color-primary-light)" }}>Diagnóstico profesional: $5,000 MXN</span>
            {" "}— se descuenta del setup al contratar
          </div>

          <ul className="space-y-3 flex-1">
            {PROCESOS_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--color-text-muted)" }}>
                <CheckIcon />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <p className="text-xs mt-4 mb-1" style={{ color: "var(--color-text-caption)" }}>
            Ejemplos: cuentas por cobrar, onboarding, pipeline de leads con CRM.
          </p>

          <a
            href="#contacto"
            className="mt-5 inline-flex justify-center items-center px-5 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 cursor-pointer hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "var(--color-cta)", boxShadow: "var(--shadow-cta)" }}
          >
            Agendar demo
          </a>
        </div>
      </div>
      <p className="text-xs mt-3" style={{ color: "var(--color-text-caption)" }}>
        Consultoría independiente:{" "}
        <span style={{ color: "var(--color-text-muted)" }}>$800 MXN/hr</span>
      </p>
    </>
  );
}

/* ─── tabs ─── */
const TAB_LABELS = [
  "Agente de Voz IA",
  "Chatbot WhatsApp",
  "Gestión Documental IA",
  "Automatización de Procesos",
];

/* ─── main component ─── */
export default function PricingSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="pricing"
      className="min-h-[100dvh] flex flex-col justify-center py-12 px-5 relative"
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

      {/*
        Cadena flex-1:
        sección (min-h-[100dvh] flex flex-col)
          → inner (flex-1 flex flex-col)
            → product wrapper (flex-1 flex flex-col)
              → grid (flex-1)
                → cards (h-full)
        El resultado: las cards siempre ocupan exactamente el viewport disponible,
        sin importar qué tab esté activo.
      */}
      <div className="mx-auto max-w-5xl w-full">
        {/* Header */}
        <div className="mb-5">
          <h2
            className="font-heading font-bold mb-1"
            style={{ fontSize: "clamp(2.25rem, 4vw, 3.25rem)", color: "var(--color-text-base)" }}
          >
            Planes por producto
          </h2>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Elige el producto. Cada uno tiene su propio plan Básico y Pro.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-5" role="tablist">
          {TAB_LABELS.map((label, i) => (
            <button
              key={label}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
              style={
                active === i
                  ? { background: "var(--color-primary)", color: "white" }
                  : { background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Product content */}
        <div>
          {active < 3 ? (
            <StandardProduct product={PRODUCTS[active]} />
          ) : (
            <ProcessProduct />
          )}
        </div>
      </div>
    </section>
  );
}
