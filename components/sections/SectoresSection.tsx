import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sectores } from "@/lib/sectores";

const XIcon = () => (
  <svg className="mt-0.5 shrink-0" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 2l8 8M10 2l-8 8" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg className="mt-0.5 shrink-0" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 6l3 3 5-5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
          background: "linear-gradient(90deg, transparent, rgba(27,110,243,0.5) 50%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14">
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
          <p className="text-lg whitespace-nowrap" style={{ color: "var(--color-text-muted)" }}>
            No vendemos tecnología genérica. Cada sector tiene su problema — y su solución.
          </p>
        </div>

        {/* Grid 3 columnas iguales desktop, 2 tablet, 1 móvil */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectores.map(({ slug, nombre, subVerticals, problema, solucion, bullets, metrica, color }) => (
            <Link
              key={slug}
              href={`/sector/${slug}`}
              className="group rounded-2xl p-6 flex flex-col gap-0 transition-all duration-200 hover:-translate-y-1 cursor-pointer"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3
                    className="font-heading font-bold text-xl mb-0.5"
                    style={{ color: "var(--color-text-base)" }}
                  >
                    {nombre}
                  </h3>
                  <p className="text-xs leading-snug" style={{ color: "var(--color-text-caption)" }}>
                    {subVerticals}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="shrink-0 mt-1 transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color }}
                />
              </div>

              {/* Bullets */}
              <div className="flex-1 flex flex-col">
                {bullets ? (
                  <>
                    {/* Primer bullet — problema, ancho completo siempre */}
                    <div className="flex items-start gap-2 text-sm mb-3">
                      <XIcon />
                      <span style={{ color: "var(--color-text-muted)" }}>{bullets[0]}</span>
                    </div>

                    {/* Separador problema / soluciones */}
                    <div
                      aria-hidden="true"
                      className="mb-3"
                      style={{ height: "1px", background: "rgba(239,68,68,0.18)" }}
                    />

                    {/* Bullets solución */}
                    <div className="space-y-2 text-sm">
                      {bullets.slice(1).map((b) => (
                        <div key={b} className="flex items-start gap-2">
                          <CheckIcon />
                          <span style={{ color: "var(--color-text-muted)" }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <XIcon />
                      <span style={{ color: "var(--color-text-muted)" }}>{problema}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckIcon />
                      <span style={{ color: "var(--color-text-muted)" }}>{solucion}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Métrica — separada con border-top del color del sector */}
              <div
                className="mt-5 pt-4"
                style={{ borderTop: "1px solid var(--color-border)" }}
              >
                <p
                  className="font-heading font-bold"
                  style={{ fontSize: slug === "infraestructura" ? "clamp(1.2rem, 1.9vw, 1.375rem)" : "clamp(1.3rem, 2.0vw, 1.5rem)", color }}
                >
                  {metrica}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
