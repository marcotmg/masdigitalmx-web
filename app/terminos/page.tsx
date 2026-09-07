import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import LegalDocLayout from "@/components/LegalDocLayout";
import { renderizarDocumentoLegal } from "@/lib/legal/markdown";

export const metadata: Metadata = {
  title: "Términos y Condiciones | +Digital MX",
  description:
    "Términos y Condiciones de Uso del Sitio masdigitalmx.com — Servicios +Digital MX.",
  robots: { index: false, follow: false },
};

/**
 * La prosa legal vive en `content/legal/`, NO aquí. Este archivo aporta sólo el
 * diseño: contenedor, enlace de vuelta e índice lateral. Cero texto legal.
 *
 * La ruta va literal —no calculada por un helper compartido— para que se vea de
 * un vistazo qué documento publica esta página. La ruta es estática (`○` en el
 * build): el `.md` se lee al compilar, no en cada visita.
 *
 * `RUTA` se contrasta contra el frontmatter del `.md`: si algún día este
 * archivo apuntara al documento equivocado, el build lo dice en vez de
 * publicar el aviso de otro producto.
 */
const RUTA = "/terminos";
const ORIGEN = "content/legal/terminos-condiciones.md";

export default function TerminosPage() {
  const documento = renderizarDocumentoLegal(
    readFileSync(join(process.cwd(), ORIGEN), "utf8"),
    ORIGEN,
    RUTA,
  );

  return (
    <LegalDocLayout
      sections={documento.secciones}
      header={
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs mb-8 transition-opacity duration-200 hover:opacity-75"
            style={{ color: "var(--color-text-caption)" }}
          >
            ← Volver al inicio
          </Link>

          {documento.encabezado}
        </div>
      }
    >
      {documento.cuerpo}
    </LegalDocLayout>
  );
}
