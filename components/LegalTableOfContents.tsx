"use client";

import { useEffect, useState } from "react";

export type LegalSection = {
  /* Debe coincidir con el id del <h2> en la página (s1, s2… sN). Se mantienen
     los ids cortos a propósito: las 3 páginas legales son noindex/nofollow y
     no hay ningún enlace profundo a #sN en el sitio, así que migrar a slugs
     legibles no compra nada y obligaría a editar texto Intocable. */
  id: string;
  /* Sin el número inicial — el índice pone su propio "01". Los <h2> del cuerpo
     conservan su "1. ", "2. "… sin tocarse. */
  label: string;
};

/* Distancia desde el borde superior a partir de la cual una sección cuenta como
   "activa". Coincide con el scroll-padding-top: 4rem de globals.css, que es lo
   que compensa el salto al ancla en todo el sitio. Las páginas legales NO montan
   el Header fijo (se monta en app/page.tsx y app/sector/[slug]/page.tsx), así
   que no hay 64px de barra que descontar por encima de eso. */
const ACTIVE_OFFSET = 80;

export default function LegalTableOfContents({
  sections,
}: {
  sections: LegalSection[];
}) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    /* Se usa un listener de scroll y NO IntersectionObserver, a diferencia de lo
       que proponía el diseño original. Razón: con un observer hay que decidir el
       activo a partir de sus `entries`, y en un documento legal hay varias
       secciones visibles a la vez — las entries llegan desordenadas y el
       resaltado salta hacia atrás. Peor: al llegar al final del documento puede
       no cruzarse ningún umbral, así que el observer no dispara y la última
       sección nunca se activa. Recalcular desde la posición real resuelve ambos,
       y el costo es despreciable (≤10 rects, throttled a un frame). Mismo patrón
       de listener pasivo que ya usa components/Header.tsx. */
    let frame = 0;

    const recalc = () => {
      frame = 0;

      /* La última sección suele ser corta (Contacto, Consentimiento) y nunca
         alcanza a cruzar el umbral por sí sola. Al tocar fondo se fuerza. */
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (atBottom) {
        setActiveId(headings[headings.length - 1].id);
        return;
      }

      /* Activo = el último encabezado que ya cruzó el umbral. */
      let current = headings[0].id;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > ACTIVE_OFFSET) break;
        current = heading.id;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(recalc);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    recalc();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [sections]);

  useEffect(() => {
    /* Corrige el salto a #s5, #s8… en la carga inicial. Las fuentes (Chakra
       Petch / Barlow, ver app/layout.tsx) se cargan con display: "swap": el
       navegador salta al ancla usando el alto de la fuente de reemplazo, y al
       llegar la fuente real el documento cambia de alto y el salto queda
       desalineado — el corrimiento se acumula, así que es más notorio en
       secciones más abajo del documento (§5 en adelante en /terminos). Se
       corrige re-saltando, sin animación, en cuanto las fuentes terminan de
       cargar. */
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const target = document.getElementById(hash);
    if (!target) return;

    document.fonts.ready.then(() => {
      target.scrollIntoView({ block: "start", behavior: "instant" });
    });
  }, []);

  const items = (
    <ol>
      {sections.map((section, index) => {
        const active = section.id === activeId;

        return (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              /* El estado activo no puede comunicarse solo con color. */
              aria-current={active ? "location" : undefined}
              className="flex gap-3 py-1.5 pl-3 text-sm leading-snug transition-colors duration-200 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary-light)]"
              style={{
                borderLeft: `2px solid ${
                  active ? "var(--color-primary)" : "transparent"
                }`,
                color: active
                  ? "var(--color-text-base)"
                  : "var(--color-text-muted)",
              }}
            >
              <span
                className="font-heading font-semibold shrink-0 tabular-nums"
                style={{ color: "var(--color-primary-light)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{section.label}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  /* Ojo: nada de <section> aquí. globals.css declara scroll-snap-type: y proximity
     en html con section { scroll-snap-align: start }, y un punto de anclaje dentro
     de un documento legal largo secuestraría el scroll. */
  return (
    <nav aria-label="Contenido del documento" className="mb-10 md:mb-0">
      {/* Móvil: colapsado por defecto, sin sticky — decisión de Marco tras probar
         la variante sticky en vivo: se rompía en las últimas secciones del
         documento y no valía la complejidad para lo que aportaba. */}
      <details
        className="md:hidden rounded-xl"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <summary
          className="cursor-pointer select-none px-4 py-3 text-sm font-heading font-semibold"
          style={{ color: "var(--color-text-base)" }}
        >
          Contenido
        </summary>
        <div className="px-2 pb-3">{items}</div>
      </details>

      {/* Desktop: columna propia. El sticky funciona porque el grid de
          LegalDocLayout deja que esta columna se estire a lo alto (sin items-start). */}
      <div className="hidden md:block sticky top-8">{items}</div>
    </nav>
  );
}
