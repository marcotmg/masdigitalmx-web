import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import LegalDocLayout from "@/components/LegalDocLayout";
import { renderizarDocumentoLegal } from "@/lib/legal/markdown";

export const metadata: Metadata = {
  title: "Aviso de Privacidad — HygieIA | +Digital MX",
  description:
    "Información sobre el tratamiento de sus datos personales en el servicio HygieIA de Servicios +Digital MX.",
  robots: { index: false, follow: false },
};

/**
 * La prosa legal vive en `content/legal/`, NO aquí. Este archivo aporta sólo el
 * diseño: contenedor, enlace de vuelta e índice lateral. Cero texto legal.
 *
 * La ruta va literal —no calculada por un helper compartido— para que se vea de
 * un vistazo qué documento publica esta página. La ruta es estática (`○` en el
 * build): el `.md` se lee al compilar, no en cada visita.
 */
const ORIGEN = "content/legal/aviso-privacidad-hygieia.md";

export default function PrivacidadHygieiaPage() {
  const documento = renderizarDocumentoLegal(
    readFileSync(join(process.cwd(), ORIGEN), "utf8"),
    ORIGEN,
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
