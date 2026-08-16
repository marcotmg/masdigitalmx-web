import LegalTableOfContents, {
  type LegalSection,
} from "./LegalTableOfContents";

export type { LegalSection };

/**
 * Maqueta compartida de las 3 páginas legales (/terminos, /privacidad,
 * /privacidad-hygieia): índice navegable a la izquierda, documento a la derecha.
 *
 * Server component a propósito. Solo el índice es cliente — el texto legal se
 * sirve como HTML estático aunque el JS falle o esté bloqueado, que es lo
 * deseable en un documento con valor probatorio.
 */
export default function LegalDocLayout({
  header,
  sections,
  children,
}: {
  /* El bloque de encabezado propio de cada página, tal cual está hoy. Va como
     prop y no hardcodeado porque /privacidad-hygieia tiene un encabezado
     distinto de las otras dos (Responsable / Correo / Última actualización,
     en vez de la línea "Versión N.N — …"). */
  header: React.ReactNode;
  sections: LegalSection[];
  /* El cuerpo del documento, sin tocar. */
  children: React.ReactNode;
}) {
  return (
    <main
      className="min-h-screen py-20 px-5"
      style={{ background: "var(--color-canvas)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">{header}</div>

        {/* Sin items-start: la columna del índice tiene que estirarse a lo alto
            para que su sticky tenga recorrido. min-w-0 en la del cuerpo es lo
            que impide que las tablas de los avisos desborden el grid. */}
        <div className="md:grid md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-12">
          <LegalTableOfContents sections={sections} />
          <div className="max-w-3xl min-w-0">{children}</div>
        </div>
      </div>
    </main>
  );
}
