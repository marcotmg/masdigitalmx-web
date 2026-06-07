"use client";

import { useState } from "react";
import { PhoneCall, MessagesSquare, Zap, FileText } from "lucide-react";

const productos = [
  {
    icon: PhoneCall,
    nombre: "Agente de Voz",
    headline: "Tu teléfono, siempre atendido",
    features: [
      "Contesta llamadas 24/7",
      "Agenda citas en tu calendario",
      "Confirma y reduce no-shows",
      "Voz natural en español mexicano",
    ],
  },
  {
    icon: MessagesSquare,
    nombre: "ChatBot WhatsApp",
    headline: "Atiende en WhatsApp 24/7",
    badge: "Popular",
    features: [
      "Responde preguntas frecuentes",
      "Toma pedidos y reservas",
      "Menús interactivos",
      "Escala a humano cuando se necesita",
    ],
  },
  {
    icon: Zap,
    nombre: "Automatización",
    headline: "Tus sistemas, conectados",
    features: [
      "Facturación automática",
      "Inventario en tiempo real",
      "Notificaciones sin intervención",
      "Integración con tus herramientas",
    ],
  },
  {
    icon: FileText,
    nombre: "Gestión Documental",
    headline: "Tus documentos, procesados solos",
    features: [
      "Clasifica facturas y contratos",
      "Extrae datos automáticamente",
      "Sin captura manual",
      "Integración a tus procesos",
    ],
  },
];

function CheckIcon({ hovered }: { hovered: boolean }) {
  const color = hovered ? "#60A5FA" : "#10B981";
  return (
    <svg
      className="mt-0.5 shrink-0"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="7" fill={`${color}33`} />
      <path
        d="M4.5 7l1.8 1.8L9.5 5.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProductosSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="soluciones"
      className="py-28 px-5 relative"
      style={{ background: "var(--color-canvas)" }}
    >
      {/* Línea divisora */}
      <div
        className="absolute top-0 left-0 right-0"
        aria-hidden="true"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(27,110,243,0.5) 50%, transparent)",
        }}
      />

      {/* Glow azul lateral — derecha */}
      <div
        className="pointer-events-none absolute -right-40 top-20 w-[500px] h-[500px] rounded-full"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, rgba(27,110,243,0.1) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header asimétrico */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <h2
            className="font-heading font-bold"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "var(--color-text-base)",
              maxWidth: "520px",
              textWrap: "balance",
            }}
          >
            4 soluciones que funcionan juntas
          </h2>
          <p
            className="text-base md:text-right whitespace-nowrap"
            style={{ color: "var(--color-text-muted)" }}
          >
            Empieza con una. Escala con todas. Intégralas como quieras.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {productos.map(({ icon: Icon, nombre, headline, features, badge }, i) => {
            const isHovered = hovered === i;
            return (
              <div
                key={nombre}
                className="relative rounded-2xl p-7 flex flex-col cursor-default"
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
                {badge && (
                  <span
                    className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                    style={{ background: "var(--color-cta)" }}
                  >
                    {badge}
                  </span>
                )}

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: isHovered ? "rgba(27,110,243,0.22)" : "rgba(27,110,243,0.1)",
                    transition: "background 220ms ease-out",
                  }}
                >
                  <Icon
                    size={20}
                    style={{
                      color: isHovered ? "var(--color-primary-light)" : "var(--color-primary)",
                      transition: "color 220ms ease-out",
                    }}
                    strokeWidth={1.5}
                  />
                </div>

                <h3
                  className="font-heading font-bold text-xl leading-snug mb-1"
                  style={{ color: "var(--color-text-base)" }}
                >
                  {nombre}
                </h3>
                <p
                  className="text-sm mb-5"
                  style={{ color: "var(--color-text-caption)" }}
                >
                  {headline}
                </p>

                <ul className="space-y-2.5 mt-auto">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <CheckIcon hovered={isHovered} />
                      <span style={{ color: "var(--color-text-muted)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
