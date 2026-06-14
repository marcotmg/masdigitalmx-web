"use client";

import { useState } from "react";

/* ─── icons ─── */
function CheckIcon() {
  return (
    <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="7" fill="#10B98122" />
      <path d="M4 7l2.2 2.2L10 5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function DashIcon() {
  return (
    <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="7" fill="#EEF2F811" />
      <path d="M4.5 7h5" stroke="#4A6A94" strokeWidth="1.5" strokeLinecap="round" />
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
  { text: "Procesamiento de documentos", basic: false },
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

const PACKAGES = [
  {
    nombre: "Starter Digital",
    incluye: "Chatbot WA Básico + 1 automatización",
    setup: "$11,000 MXN",
    mensualidad: "$2,800/mes",
    ahorro: "−$1,500 en setup",
  },
  {
    nombre: "Negocio Completo",
    incluye: "Agente Voz Básico + Chatbot Básico",
    setup: "$18,000 MXN",
    mensualidad: "$5,800/mes",
    ahorro: "−$3,000 setup · −$800/mes",
  },
  {
    nombre: "Suite IA",
    incluye: "Voz Pro + Chat Pro + Doc Básico",
    setup: "$38,000 MXN",
    mensualidad: "$11,000/mes",
    ahorro: "−$7,000 setup · −$1,800/mes",
  },
];

/* ─── sub-components ─── */
function PlanCard({
  label,
  data,
  features,
  pro,
}: {
  label: string;
  data: PlanData;
  features: Feature[];
  pro: boolean;
}) {
  return (
    <div
      className="rounded-2xl p-7 flex flex-col"
      style={{
        background: pro ? "var(--color-surface-2)" : "var(--color-surface)",
        border: `1px solid ${pro ? "var(--color-border-strong)" : "var(--color-border)"}`,
        boxShadow: pro ? "var(--shadow-card-hover)" : "var(--shadow-card)",
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-heading font-bold text-lg" style={{ color: "var(--color-text-base)" }}>
          {label}
        </h3>
        {pro && (
          <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: "var(--color-cta)" }}>
            Recomendado
          </span>
        )}
      </div>

      <div className="mb-1">
        <span className="font-heading font-extrabold text-3xl" style={{ color: "var(--color-text-base)" }}>
          {data.setup}
        </span>
        <span className="text-xs ml-1.5" style={{ color: "var(--color-text-muted)" }}>MXN setup</span>
      </div>
      <div className="mb-5">
        <span className="font-heading font-bold text-xl" style={{ color: "var(--color-primary-light)" }}>
          {data.mens}
        </span>
        <span className="text-xs ml-1.5" style={{ color: "var(--color-text-muted)" }}>MXN/mes</span>
      </div>

      <div
        className="flex gap-3 mb-5 text-xs px-3 py-2 rounded-lg"
        style={{ background: "rgba(27,110,243,0.06)", color: "var(--color-text-caption)" }}
      >
        <span>{data.incluido} incluido</span>
        <span>·</span>
        <span>+{data.adicional} adicional</span>
      </div>

      <ul className="space-y-2.5 mb-7 flex-1">
        {features.map((f) => {
          const included = pro || f.basic;
          return (
            <li
              key={f.text}
              className="flex items-start gap-2 text-sm"
              style={{ color: included ? "var(--color-text-muted)" : "var(--color-text-caption)" }}
            >
              {included ? <CheckIcon /> : <DashIcon />}
              <span>{f.text}</span>
            </li>
          );
        })}
      </ul>

      <a
        href="#contacto"
        className="inline-flex justify-center items-center px-5 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
        style={
          pro
            ? { background: "var(--color-cta)", color: "white", boxShadow: "var(--shadow-cta)" }
            : {
                border: "1px solid var(--color-border-strong)",
                color: "var(--color-primary-light)",
                background: "rgba(27,110,243,0.08)",
              }
        }
      >
        Agendar demo
      </a>
    </div>
  );
}

function StandardProduct({ product }: { product: StandardProductData }) {
  return (
    <div>
      <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
        {product.tagline}
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        <PlanCard label="Básico" data={product.basico} features={product.features} pro={false} />
        <PlanCard label="Pro"    data={product.pro}    features={product.features} pro={true}  />
      </div>
    </div>
  );
}

function ProcessProduct() {
  return (
    <div>
      <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
        Tus sistemas, conectados
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        {/* Tareas */}
        <div
          className="rounded-2xl p-7 flex flex-col"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-card)" }}
        >
          <h3 className="font-heading font-bold text-lg mb-1" style={{ color: "var(--color-text-base)" }}>
            Automatización de Tareas
          </h3>
          <p className="text-xs mb-5" style={{ color: "var(--color-text-caption)" }}>Simple — 1 a 3 pasos</p>
          <div className="mb-1">
            <span className="font-heading font-extrabold text-3xl" style={{ color: "var(--color-text-base)" }}>$3,500</span>
            <span className="text-xs ml-1.5" style={{ color: "var(--color-text-muted)" }}>– $6,000 MXN implementación</span>
          </div>
          <div className="mb-5">
            <span className="font-heading font-bold text-xl" style={{ color: "var(--color-primary-light)" }}>$800</span>
            <span className="text-xs ml-1.5" style={{ color: "var(--color-text-muted)" }}>– $1,500 MXN/mes mantenimiento</span>
          </div>
          <p className="text-xs mb-5 px-3 py-2 rounded-lg" style={{ background: "rgba(16,185,129,0.08)", color: "var(--color-success)" }}>
            Diagnóstico: llamada informativa gratuita (30 min)
          </p>
          <div className="flex-1">
            <p className="text-xs font-medium mb-2" style={{ color: "var(--color-text-muted)" }}>Ejemplos:</p>
            <p className="text-xs" style={{ color: "var(--color-text-caption)" }}>
              Descarga de facturas, notificaciones automáticas, sincronización de datos entre sistemas.
            </p>
          </div>
          <a
            href="#contacto"
            className="mt-6 inline-flex justify-center items-center px-5 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
            style={{ border: "1px solid var(--color-border-strong)", color: "var(--color-primary-light)", background: "rgba(27,110,243,0.08)" }}
          >
            Agendar demo
          </a>
        </div>

        {/* Procesos */}
        <div
          className="rounded-2xl p-7 flex flex-col"
          style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border-strong)", boxShadow: "var(--shadow-card-hover)" }}
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-heading font-bold text-lg" style={{ color: "var(--color-text-base)" }}>
              Automatización de Procesos
            </h3>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: "var(--color-cta)" }}>
              Recomendado
            </span>
          </div>
          <p className="text-xs mb-5" style={{ color: "var(--color-text-caption)" }}>Compleja — 3+ sistemas</p>
          <div className="mb-1">
            <span className="font-heading font-extrabold text-3xl" style={{ color: "var(--color-text-base)" }}>$10,000</span>
            <span className="text-xs ml-1.5" style={{ color: "var(--color-text-muted)" }}>– $25,000 MXN implementación</span>
          </div>
          <div className="mb-5">
            <span className="font-heading font-bold text-xl" style={{ color: "var(--color-primary-light)" }}>$2,500</span>
            <span className="text-xs ml-1.5" style={{ color: "var(--color-text-muted)" }}>– $5,000 MXN/mes mantenimiento</span>
          </div>
          <p className="text-xs mb-5 px-3 py-2 rounded-lg" style={{ background: "rgba(27,110,243,0.06)", color: "var(--color-text-caption)" }}>
            <span style={{ color: "var(--color-primary-light)" }}>Diagnóstico profesional: $5,000 MXN</span> — se descuenta del setup al contratar
          </p>
          <div className="flex-1">
            <p className="text-xs font-medium mb-2" style={{ color: "var(--color-text-muted)" }}>Ejemplos:</p>
            <p className="text-xs" style={{ color: "var(--color-text-caption)" }}>
              Cuentas por cobrar, onboarding de clientes, pipeline de leads con CRM integrado.
            </p>
          </div>
          <a
            href="#contacto"
            className="mt-6 inline-flex justify-center items-center px-5 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 cursor-pointer hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "var(--color-cta)", boxShadow: "var(--shadow-cta)" }}
          >
            Agendar demo
          </a>
        </div>
      </div>
      <p className="text-xs mt-4" style={{ color: "var(--color-text-caption)" }}>
        Consultoría independiente:{" "}
        <span style={{ color: "var(--color-text-muted)" }}>$800 MXN/hr</span>
      </p>
    </div>
  );
}

/* ─── main component ─── */
const TAB_LABELS = [
  "Agente de Voz IA",
  "Chatbot WhatsApp",
  "Gestión Documental IA",
  "Automatización de Procesos",
];

export default function PricingSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="pricing"
      className="py-28 px-5 relative"
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

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 max-w-xl">
          <h2
            className="font-heading font-bold mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--color-text-base)", textWrap: "balance" }}
          >
            Planes por producto
          </h2>
          <p className="text-lg" style={{ color: "var(--color-text-muted)" }}>
            Elige el producto que necesitas. Cada uno tiene su propio plan Básico y Pro.
          </p>
        </div>

        {/* Product tabs */}
        <div className="flex flex-wrap gap-2 mb-8" role="tablist">
          {TAB_LABELS.map((label, i) => (
            <button
              key={label}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
              style={
                active === i
                  ? { background: "var(--color-primary)", color: "white" }
                  : {
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-muted)",
                    }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Product content */}
        {active < 3 ? (
          <StandardProduct product={PRODUCTS[active]} />
        ) : (
          <ProcessProduct />
        )}

        {/* Packages */}
        <div className="mt-20">
          <div
            aria-hidden="true"
            className="mb-12"
            style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(27,110,243,0.3) 50%, transparent)" }}
          />
          <h3
            className="font-heading font-bold text-2xl mb-2"
            style={{ color: "var(--color-text-base)" }}
          >
            Combina y ahorra
          </h3>
          <p className="text-sm mb-8" style={{ color: "var(--color-text-muted)" }}>
            Paquetes con descuento para negocios que quieren más de un producto.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.nombre}
                className="rounded-2xl p-6 flex flex-col gap-3"
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
              >
                <div>
                  <h4 className="font-heading font-bold text-base mb-0.5" style={{ color: "var(--color-text-base)" }}>
                    {pkg.nombre}
                  </h4>
                  <p className="text-xs" style={{ color: "var(--color-text-caption)" }}>
                    {pkg.incluye}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 text-sm pt-3" style={{ borderTop: "1px solid var(--color-border)" }}>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--color-text-muted)" }}>Setup</span>
                    <span className="font-bold" style={{ color: "var(--color-text-base)" }}>{pkg.setup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--color-text-muted)" }}>Mensualidad</span>
                    <span className="font-bold" style={{ color: "var(--color-text-base)" }}>{pkg.mensualidad}</span>
                  </div>
                  <div className="flex justify-between pt-2" style={{ borderTop: "1px solid var(--color-border)" }}>
                    <span style={{ color: "var(--color-success)" }}>Ahorro</span>
                    <span className="font-bold text-xs" style={{ color: "var(--color-success)" }}>{pkg.ahorro}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
