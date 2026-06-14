"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sectores } from "@/lib/sectores";

export default function SectoresSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="sectores"
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

      <div className="relative mx-auto max-w-6xl w-full">
        <div className="mb-12">
          <h2
            className="font-heading font-bold mb-3"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectores.map(({ slug, nombre, subVerticals, problema, solucion, metrica, color }, i) => {
            const isHovered = hovered === i;
            return (
              <Link
                key={slug}
                href={`/sector/${slug}`}
                className="rounded-2xl p-7 flex flex-col"
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
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3
                      className="font-heading font-bold text-2xl mb-1"
                      style={{ color: "var(--color-text-base)" }}
                    >
                      {nombre}
                    </h3>
                    <p className="text-sm leading-snug" style={{ color: "var(--color-text-caption)" }}>
                      {subVerticals}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="shrink-0 mt-1"
                    style={{
                      color,
                      transform: isHovered ? "translateX(4px)" : "translateX(0)",
                      transition: "transform 220ms ease-out",
                    }}
                  />
                </div>

                {/* Problema */}
                <p className="text-base italic mb-3" style={{ color: "var(--color-text-muted)" }}>
                  "{problema}"
                </p>

                {/* Solución */}
                <p className="text-base flex-1" style={{ color: "var(--color-text-base)" }}>
                  {solucion}
                </p>

                {/* Métrica */}
                <div
                  className="mt-6 pt-4"
                  style={{ borderTop: "1px solid var(--color-border)" }}
                >
                  <p
                    className="font-heading font-bold"
                    style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.75rem)", color }}
                  >
                    {metrica}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
