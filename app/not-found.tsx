import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada | +Digital MX",
  robots: { index: false, follow: true },
};

/* Estructura tomada de una referencia que trajo Marco (una página de "regresamos
   pronto"): un solo ancla visual, una línea de copy, mucho aire. Aquí Mati ocupa
   el lugar que allá tenía el logo.

   Dos decisiones deliberadas:

   1. NO se usa el headline del Hero ("Tu negocio atiende. Siempre.") como remate.
      Se evaluó y se descartó: en una página de error, presumir disponibilidad
      hace que la broma caiga sobre +Digital, no sobre el visitante — lee como
      "no pueden ni mantener su propio sitio", justo en el atributo que se vende.

   2. Se conservan las dos salidas. La referencia no las tenía porque era una
      página de mantenimiento (todo el sitio caído, no hay a dónde ir). Un 404 es
      lo contrario: el sitio funciona y solo falló esta URL, así que dejar al
      visitante sin salida sería una fuga en la única página cuyo trabajo es
      recuperarlo.

   Sin Header/Footer, igual que las páginas legales. */
export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center py-20 px-5 text-center"
      style={{ background: "var(--color-canvas)" }}
    >
      {/* El código se queda visible: un visitante técnico —y el sitio atrae ese
          perfil a propósito— espera verlo. Discreto, no protagonista. */}
      <p
        className="text-xs font-medium tracking-[0.3em] mb-10"
        style={{ color: "var(--color-text-caption)" }}
      >
        404
      </p>

      <Image
        src="/mati.webp"
        alt="Mati, el asistente de IA de +Digital MX"
        width={420}
        height={420}
        className="w-full max-w-[220px] object-contain drop-shadow-2xl mb-10"
        priority
      />

      <h1
        className="font-heading font-bold mb-2"
        style={{
          fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
          color: "var(--color-text-base)",
        }}
      >
        Esta página no existe.
      </h1>

      <p
        className="mb-12"
        style={{
          fontSize: "clamp(1rem, 2vw, 1.125rem)",
          color: "var(--color-text-muted)",
        }}
      >
        El resto del sitio, sí.
      </p>

      {/* Texto discreto, no botones: en un 404 el visitante ya quiere irse — no
          hay que empujarlo con un CTA naranja que compita con la página real. */}
      <nav
        className="flex items-center gap-3 text-sm"
        style={{ color: "var(--color-text-caption)" }}
      >
        <Link
          href="/"
          className="transition-opacity duration-200 hover:opacity-70"
          style={{ color: "var(--color-primary-light)" }}
        >
          Volver al inicio
        </Link>
        <span aria-hidden="true">·</span>
        <Link
          href="/#contacto"
          className="transition-opacity duration-200 hover:opacity-70"
          style={{ color: "var(--color-primary-light)" }}
        >
          Contacto
        </Link>
      </nav>
    </main>
  );
}
