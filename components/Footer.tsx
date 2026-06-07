"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="py-12 px-5"
      style={{
        background: "var(--color-canvas)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span
            className="font-heading font-bold text-lg"
            style={{ color: "var(--color-text-base)" }}
          >
            +Digital MX
          </span>
          <span className="text-sm" style={{ color: "var(--color-text-caption)" }}>
            Automatización con IA para tu negocio
          </span>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          <Link
            href="/privacidad"
            className="transition-colors cursor-pointer"
            style={{ color: "var(--color-text-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-text-base)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text-muted)")
            }
          >
            Privacidad
          </Link>
          <Link
            href="/terminos"
            className="transition-colors cursor-pointer"
            style={{ color: "var(--color-text-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-text-base)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text-muted)")
            }
          >
            Términos
          </Link>
          <a
            href="mailto:contacto@masdigitalmx.com"
            className="transition-colors cursor-pointer"
            style={{ color: "var(--color-text-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-text-base)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text-muted)")
            }
          >
            contacto@masdigitalmx.com
          </a>
        </nav>

        <p
          className="text-xs text-center"
          style={{ color: "var(--color-text-caption)" }}
        >
          © 2026 +Digital MX. Todos los derechos reservados.
          <br className="hidden md:inline" /> Hecho en México
        </p>
      </div>
    </footer>
  );
}
