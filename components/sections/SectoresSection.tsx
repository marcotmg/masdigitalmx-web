import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sectores } from "@/lib/sectores";

/*
  Bento grid: 4 columnas en desktop.
  Tarjetas "wide" ocupan 2 columnas — dan variedad visual sin que sean idénticas.
  Layout por fila:
    Fila 1: Servicios (2col) + Salud (1col) + Comercio (1col)
    Fila 2: Finanzas (1col) + Infraestructura (2col) + Bienes Raíces (1col)
*/
export default function SectoresSection() {
  return (
    <section
      id="sectores"
      className="py-28 px-5 relative"
      style={{ background: "var(--color-canvas)" }}
    >
      <div
        className="absolute top-0 left-0 right-0"
        aria-hidden="true"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(27,110,243,0.5) 50%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 max-w-lg">
          <h2
            className="font-heading font-bold mb-4"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "var(--color-text-base)",
              textWrap: "balance",
            }}
          >
            Diseñado para tu sector
          </h2>
          <p className="text-lg" style={{ color: "var(--color-text-muted)" }}>
            No vendemos tecnología genérica. Cada sector tiene su problema — y su solución.
          </p>
        </div>

        {/* Bento grid — 4 columnas desktop, 2 tablet, 1 móvil */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
          {sectores.map(
            ({ slug, nombre, subVerticals, problema, solucion, metrica, color, wide }) => (
              <Link
                key={slug}
                href={`/sector/${slug}`}
                className={`group rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 cursor-pointer${wide ? " sm:col-span-2" : ""}`}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {/* Header de la tarjeta */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3
                      className="font-heading font-bold text-xl mb-0.5"
                      style={{ color: "var(--color-text-base)" }}
                    >
                      {nombre}
                    </h3>
                    <p
                      className="text-xs leading-snug"
                      style={{ color: "var(--color-text-caption)" }}
                    >
                      {subVerticals}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="shrink-0 mt-1 transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color }}
                  />
                </div>

                {/* Problema / Solución */}
                <div className="space-y-2 text-sm flex-1">
                  <div className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 shrink-0"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 2l8 8M10 2l-8 8"
                        stroke="#EF4444"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span style={{ color: "var(--color-text-muted)" }}>{problema}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 shrink-0"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="#10B981"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span style={{ color: "var(--color-text-muted)" }}>{solucion}</span>
                  </div>
                </div>

                {/* Métrica */}
                <p
                  className="font-heading font-bold text-2xl"
                  style={{ color }}
                >
                  {metrica}
                </p>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}
