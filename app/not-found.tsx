import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada | +Digital MX",
  robots: { index: false, follow: true },
};

/* Misma envoltura que app/privacidad/page.tsx: server component, canvas único,
   max-w-3xl y regreso al inicio. Sin Header/Footer, igual que las páginas
   legales — el Footer enlaza rutas que desde un 404 solo agregan ruido. */
export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center py-20 px-5"
      style={{ background: "var(--color-canvas)" }}
    >
      <div className="mx-auto max-w-3xl w-full">
        <p
          className="font-heading font-bold mb-3"
          style={{
            fontSize: "clamp(3rem, 10vw, 5rem)",
            lineHeight: 1,
            color: "var(--color-primary-light)",
          }}
        >
          404
        </p>

        <h1
          className="font-heading font-bold mb-4"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            color: "var(--color-text-base)",
          }}
        >
          Esta página no existe.
        </h1>

        <p
          className="mb-10 max-w-xl"
          style={{ color: "var(--color-text-muted)" }}
        >
          El enlace que seguiste puede estar roto o la página pudo haberse movido.
          Desde el inicio puedes ver las soluciones por sector o escribirnos
          directamente.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm transition-colors duration-200"
            style={{
              background: "var(--color-cta)",
              color: "#FFFFFF",
            }}
          >
            Volver al inicio
          </Link>

          <Link
            href="/#contacto"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm border transition-opacity duration-200 hover:opacity-75"
            style={{
              borderColor: "var(--color-border-strong)",
              color: "var(--color-text-base)",
            }}
          >
            Contactar
          </Link>
        </div>
      </div>
    </main>
  );
}
