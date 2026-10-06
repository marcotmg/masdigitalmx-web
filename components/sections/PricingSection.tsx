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

const AUTOMATIZACION_FEATURES = [
  "Diseño del flujo de automatización",
  "Integración con tus herramientas (CRM, ERP, facturación y más)",
  "Pruebas y ajustes incluidos",
  "Monitoreo y mantenimiento mensual",
  "Documentación del proceso entregada",
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
    basico: { setup: "$12,000", mens: "$3,800", incluido: "200 min/mes", adicional: "$1,500 por 100 min" },
    pro:    { setup: "$18,000", mens: "$6,500", incluido: "400 min/mes", adicional: "$1,500 por 100 min" },
    features: VOZ_FEATURES,
  },
  {
    kind: "standard",
    nombre: "Chatbot WhatsApp",
    tagline: "Atiende en WhatsApp 24/7",
    basico: { setup: "$9,000",  mens: "$2,800", incluido: "800 conv/mes",   adicional: "$1.50/conv" },
    pro:    { setup: "$15,000", mens: "$4,800", incluido: "1,500 conv/mes", adicional: "$1.00/conv" },
    features: WA_FEATURES,
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

  return (
    <div
      className="rounded-2xl p-7 flex flex-col cursor-default"
      style={{
        background: hovered ? "var(--color-surface-2)" : "var(--color-surface)",
        border: `1px solid ${hovered ? "var(--color-border-strong)" : "var(--color-border)"}`,
        boxShadow: hovered ? "var(--shadow-card-hover)" : "var(--shadow-card)",
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
      {/* La mensualidad es el precio que se ve primero y en grande; el setup (pago único) va debajo, más chico. */}
      <div className="mb-0.5">
        <span className="font-heading font-extrabold text-4xl" style={{ color: "var(--color-text-base)" }}>
          {data.mens}
        </span>
        <span className="text-sm ml-2" style={{ color: "var(--color-text-muted)" }}>MXN/mes</span>
      </div>
      <div className="mb-3">
        <span className="font-heading font-semibold text-lg" style={{ color: "var(--color-primary-light)" }}>
          + {data.setup}
        </span>
        <span className="text-sm ml-2" style={{ color: "var(--color-text-muted)" }}>MXN de setup, pago único</span>
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

/* ─── ProcessProduct — un solo producto: base + pasos + sistemas (SP-01 v1.0 §5.1) ─── */
function ProcessProduct() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
        Tus sistemas, conectados — el precio crece con el tamaño
      </p>
      <div
        className="rounded-2xl p-7 grid md:grid-cols-2 gap-8 cursor-default"
        style={{
          background: hovered ? "var(--color-surface-2)" : "var(--color-surface)",
          border: `1px solid ${hovered ? "var(--color-border-strong)" : "var(--color-border)"}`,
          boxShadow: hovered ? "var(--shadow-card-hover)" : "var(--shadow-card)",
          transition: "background 220ms ease-out, box-shadow 220ms ease-out, border-color 220ms ease-out",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Precios */}
        <div className="flex flex-col">
          <h3 className="font-heading font-bold text-xl mb-0.5" style={{ color: "var(--color-text-base)" }}>
            Automatización
          </h3>
          <p className="text-xs mb-4" style={{ color: "var(--color-text-caption)" }}>Base: hasta 5 pasos y 2 sistemas</p>

          <div className="mb-0.5">
            <span className="font-heading font-extrabold text-4xl" style={{ color: "var(--color-text-base)" }}>$7,200</span>
            <span className="text-sm ml-2" style={{ color: "var(--color-text-muted)" }}>MXN implementación</span>
          </div>
          <div className="mb-4">
            <span className="font-heading font-bold text-2xl" style={{ color: "var(--color-primary-light)" }}>$1,200</span>
            <span className="text-sm ml-2" style={{ color: "var(--color-text-muted)" }}>MXN/mes mantenimiento</span>
          </div>

          <ul className="mb-4 space-y-1.5 text-sm px-3 py-2 rounded-lg" style={{ background: "rgba(27,110,243,0.06)", color: "var(--color-text-caption)" }}>
            <li>Paso adicional: <span style={{ color: "var(--color-text-muted)" }}>$800 MXN</span></li>
            <li>Sistema adicional: <span style={{ color: "var(--color-text-muted)" }}>$2,400 MXN + $400 MXN/mes</span></li>
            <li>Ejemplo: 10 pasos entre 3 sistemas = $13,600 MXN + $1,600 MXN/mes</li>
          </ul>

          <div className="px-3 py-2 rounded-lg text-sm" style={{ background: "rgba(16,185,129,0.08)", color: "var(--color-success)" }}>
            Dentro de la base: llamada informativa gratuita (15 min).
            <span style={{ color: "var(--color-text-caption)" }}>
              {" "}Proyectos más grandes: diagnóstico profesional de $5,000 MXN, que se descuenta del setup al contratar.
            </span>
          </div>
        </div>

        {/* Qué incluye */}
        <div className="flex flex-col">
          <ul className="space-y-3 flex-1">
            {AUTOMATIZACION_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--color-text-muted)" }}>
                <CheckIcon />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <p className="text-xs mt-4 mb-1" style={{ color: "var(--color-text-caption)" }}>
            Ejemplos: descarga de facturas, notificaciones, sincronización de datos, cuentas por cobrar, pipeline de leads con CRM.
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
  "Automatización",
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
          {active < PRODUCTS.length ? (
            <StandardProduct product={PRODUCTS[active]} />
          ) : (
            <ProcessProduct />
          )}
        </div>
      </div>
    </section>
  );
}
