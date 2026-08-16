import type { Metadata } from "next";
import Link from "next/link";
import LegalDocLayout, { type LegalSection } from "@/components/LegalDocLayout";
import {
  RESPONSABLE_NOMBRE,
  RESPONSABLE_PERSONA,
  RESPONSABLE_DOMICILIO,
  CORREO_PRIVACIDAD,
  LFPDPPP_DOF_LEY,
  LFPDPPP_DOF_REFORMA,
  ARCO_ARTICULOS_CITA,
  CONSENTIMIENTO_ARTICULO_CITA,
} from "@/lib/legal-data";

export const metadata: Metadata = {
  title: "Aviso de Privacidad — HygieIA | +Digital MX",
  description:
    "Información sobre el tratamiento de sus datos personales en el servicio HygieIA de Servicios +Digital MX.",
  robots: { index: false, follow: false },
};

// ─── Primitivos de estilo ─────────────────────────────────────────────────────

function Separator() {
  return (
    <div
      aria-hidden="true"
      className="my-10"
      style={{
        height: "1px",
        background:
          "linear-gradient(90deg, transparent, rgba(27,110,243,0.35) 50%, transparent)",
      }}
    />
  );
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="font-heading font-bold mb-4 mt-10 first:mt-0"
      style={{ fontSize: "1.25rem", color: "var(--color-text-base)" }}
    >
      {children}
    </h2>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-sm leading-relaxed mb-4"
      style={{ color: "var(--color-text-muted)" }}
    >
      {children}
    </p>
  );
}

function Bold({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: "var(--color-text-base)" }}>{children}</strong>;
}

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div
      className="overflow-x-auto my-6 rounded-xl"
      style={{ border: "1px solid var(--color-border)" }}
    >
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ background: "var(--color-surface-2)" }}>
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left font-semibold"
                style={{
                  color: "var(--color-text-base)",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              style={{
                background:
                  ri % 2 === 0 ? "var(--color-surface)" : "var(--color-canvas)",
              }}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-4 py-3 align-top text-sm leading-relaxed"
                  style={{
                    color: "var(--color-text-muted)",
                    borderBottom:
                      ri < rows.length - 1
                        ? "1px solid var(--color-border)"
                        : "none",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Índice navegable ─────────────────────────────────────────────────────────
// Etiquetas sin el número inicial: el índice pone su propio "01". Los <h2> del
// cuerpo conservan su "1. ", "2. "… — texto Intocable, no se toca.

const SECTIONS: LegalSection[] = [
  { id: "s1", label: "Identidad y domicilio del Responsable" },
  { id: "s2", label: "Datos personales que tratamos" },
  { id: "s3", label: "Finalidades del tratamiento" },
  { id: "s4", label: "Cómo ejercer sus derechos ARCO" },
  { id: "s5", label: "Datos sensibles" },
  { id: "s6", label: "Transferencias a terceros" },
  { id: "s7", label: "Cambios a este aviso" },
  { id: "s8", label: "Consentimiento" },
];

// ─── Página ───────────────────────────────────────────────────────────────────

export default function PrivacidadHygieiaPage() {
  return (
    <LegalDocLayout
      sections={SECTIONS}
      header={
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs mb-8 transition-opacity duration-200 hover:opacity-75"
            style={{ color: "var(--color-text-caption)" }}
          >
            ← Volver al inicio
          </Link>

          <h1
            className="font-heading font-bold mb-2"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              color: "var(--color-text-base)",
            }}
          >
            Aviso de Privacidad — HygieIA
          </h1>

          <Para>
            <Bold>Responsable:</Bold> {RESPONSABLE_NOMBRE} ({RESPONSABLE_PERSONA})
            <br />
            <Bold>Correo de contacto:</Bold>{" "}
            <a
              href={`mailto:${CORREO_PRIVACIDAD}`}
              className="underline transition-opacity duration-200 hover:opacity-75"
              style={{ color: "var(--color-primary-light)" }}
            >
              {CORREO_PRIVACIDAD}
            </a>
            <br />
            <Bold>Última actualización:</Bold> 15 de agosto de 2026
          </Para>
        </div>
      }
    >
      <Separator />

      {/* §1 — Identidad y domicilio */}
      <SectionHeading id="s1">1. Identidad y domicilio del Responsable</SectionHeading>
      <Para>
        <Bold>{RESPONSABLE_NOMBRE}</Bold> ({RESPONSABLE_PERSONA}), con domicilio en{" "}
        <Bold>{RESPONSABLE_DOMICILIO}</Bold>, y correo electrónico
        de contacto{" "}
        <a
          href={`mailto:${CORREO_PRIVACIDAD}`}
          className="underline transition-opacity duration-200 hover:opacity-75"
          style={{ color: "var(--color-primary-light)" }}
        >
          {CORREO_PRIVACIDAD}
        </a>
        , es el responsable del tratamiento de sus datos personales de conformidad con la{" "}
        <Bold>
          Ley Federal de Protección de Datos Personales en Posesión de los Particulares
        </Bold>{" "}
        (LFPDPPP, publicada en el DOF el {LFPDPPP_DOF_LEY}, con última reforma
        publicada el {LFPDPPP_DOF_REFORMA}).
      </Para>

      <Separator />

      {/* §2 — Datos personales */}
      <SectionHeading id="s2">2. Datos personales que tratamos</SectionHeading>
      <Para>
        En el contexto del servicio <Bold>HygieIA</Bold> (agente de voz para agendamiento
        de citas médicas), recabamos y tratamos los siguientes datos personales:
      </Para>
      <ul
        className="text-sm leading-relaxed mb-4 space-y-2 pl-5 list-disc"
        style={{ color: "var(--color-text-muted)" }}
      >
        <li>
          <Bold>Nombre completo</Bold> del paciente o solicitante de cita.
        </li>
        <li>
          <Bold>Número de teléfono</Bold> desde el cual se realiza la llamada.
        </li>
        <li>
          <Bold>Correo electrónico</Bold> (cuando el paciente lo proporciona durante la
          llamada).
        </li>
        <li>
          <Bold>Categoría general del motivo de consulta</Bold> (por ejemplo: primera
          consulta, seguimiento, urgencia). Este dato es genérico y no incluye diagnósticos
          ni información clínica detallada.
        </li>
        <li>
          <Bold>Fecha y hora de la cita agendada.</Bold>
        </li>
        <li>
          <Bold>Consentimiento para recibir notificaciones por WhatsApp</Bold> (cuando el
          paciente lo expresa).
        </li>
        <li>
          <Bold>Metadatos de la llamada:</Bold> duración, identificador único de la
          llamada, fecha y hora.
        </li>
      </ul>
      <div
        className="rounded-xl p-4 text-sm leading-relaxed"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          color: "var(--color-text-muted)",
        }}
      >
        <Bold>Datos que NO se almacenan en nuestra base de datos:</Bold> el contenido
        detallado del motivo médico expresado durante la llamada (por ejemplo, descripción
        de síntomas o diagnósticos). Este tipo de información, cuando se menciona, permanece
        únicamente en la grabación de la llamada administrada por Retell AI con una retención
        máxima de 90 días.
      </div>

      <Separator />

      {/* §3 — Finalidades */}
      <SectionHeading id="s3">3. Finalidades del tratamiento</SectionHeading>
      <Para>
        Tratamos sus datos personales para las siguientes finalidades:
      </Para>

      <p
        className="text-sm font-semibold mb-2"
        style={{ color: "var(--color-text-base)" }}
      >
        Finalidades primarias (necesarias para la prestación del servicio — su negativa
        impide el agendamiento):
      </p>
      <ul
        className="text-sm leading-relaxed mb-6 space-y-2 pl-5 list-disc"
        style={{ color: "var(--color-text-muted)" }}
      >
        <li>
          <Bold>F1 — Gestión del agendamiento:</Bold> agendar, confirmar, modificar o
          cancelar su cita médica; enviarle recordatorios y confirmaciones por correo
          electrónico o WhatsApp.
        </li>
        <li>
          <Bold>F2 — Calidad del servicio:</Bold> detectar y corregir errores del agente
          de voz que pudieran haberle dejado sin cita activa, y contactarle para
          resolverlos.
        </li>
        <li>
          <Bold>F3 — Seguridad:</Bold> detectar patrones de uso anómalos o abusivos del
          servicio para proteger a los usuarios y al sistema.
        </li>
        <li>
          <Bold>F5 — Cumplimiento legal:</Bold> atender requerimientos de autoridad
          competente cuando así lo exija la ley.
        </li>
      </ul>

      <p
        className="text-sm font-semibold mb-2"
        style={{ color: "var(--color-text-base)" }}
      >
        Finalidades secundarias (no necesarias para el servicio — puede oponerse sin perder
        las primarias):
      </p>
      <ul
        className="text-sm leading-relaxed mb-4 space-y-2 pl-5 list-disc"
        style={{ color: "var(--color-text-muted)" }}
      >
        <li>
          <Bold>F4 — Análisis estadístico interno:</Bold> generar métricas agregadas y
          anónimas sobre el uso del servicio (tasas de agendamiento, horarios de demanda,
          eficiencia del agente). Estos análisis no identifican a personas individualmente.
        </li>
      </ul>
      <Para>
        Si desea oponerse al tratamiento para la finalidad F4, puede hacerlo en cualquier
        momento escribiendo a{" "}
        <a
          href={`mailto:${CORREO_PRIVACIDAD}`}
          className="underline transition-opacity duration-200 hover:opacity-75"
          style={{ color: "var(--color-primary-light)" }}
        >
          {CORREO_PRIVACIDAD}
        </a>{" "}
        con el asunto{" "}
        <Bold>"Oposición F4 — HygieIA"</Bold> desde el correo electrónico o teléfono que
        proporcionó.
      </Para>

      <Separator />

      {/* §4 — Derechos ARCO */}
      <SectionHeading id="s4">4. Cómo ejercer sus derechos ARCO</SectionHeading>
      <Para>
        De conformidad con los {ARCO_ARTICULOS_CITA}, usted tiene derecho a:
      </Para>
      <ul
        className="text-sm leading-relaxed mb-6 space-y-2 pl-5 list-disc"
        style={{ color: "var(--color-text-muted)" }}
      >
        <li>
          <Bold>Acceso:</Bold> conocer qué datos personales suyos tenemos y cómo los
          usamos.
        </li>
        <li>
          <Bold>Rectificación:</Bold> solicitar la corrección de datos inexactos o
          incompletos.
        </li>
        <li>
          <Bold>Cancelación:</Bold> solicitar la supresión de sus datos cuando considere
          que no son necesarios para las finalidades declaradas o haya transcurrido el
          periodo de conservación.
        </li>
        <li>
          <Bold>Oposición:</Bold> oponerse al tratamiento de sus datos para finalidades
          secundarias (F4).
        </li>
      </ul>
      <Para>
        Para ejercer cualquiera de estos derechos, envíe un correo a{" "}
        <a
          href={`mailto:${CORREO_PRIVACIDAD}`}
          className="underline transition-opacity duration-200 hover:opacity-75"
          style={{ color: "var(--color-primary-light)" }}
        >
          {CORREO_PRIVACIDAD}
        </a>{" "}
        con el asunto <Bold>"Derechos ARCO — HygieIA"</Bold> indicando: su nombre
        completo, número de teléfono con el que realizó la llamada, y la acción que
        solicita.{" "}
        <Bold>Plazo de respuesta:</Bold> 20 días hábiles para comunicarle nuestra
        determinación, y 15 días hábiles adicionales para hacerla efectiva. Este plazo
        es ampliable una sola vez por un periodo igual cuando las circunstancias lo
        justifiquen, conforme al artículo 31 de la LFPDPPP.
      </Para>

      <Separator />

      {/* §5 — Datos sensibles */}
      <SectionHeading id="s5">5. Datos sensibles</SectionHeading>
      <Para>
        El motivo médico detallado que pueda usted mencionar durante la llamada constituye
        un <Bold>dato sensible</Bold> en términos del artículo 2 de la LFPDPPP. Como se
        indicó en la sección 2, este dato{" "}
        <Bold>no se almacena en nuestros sistemas</Bold> — permanece únicamente en la
        grabación de la llamada administrada por el proveedor Retell AI durante un máximo
        de 90 días. Al continuar la llamada, usted consiente expresamente este tratamiento
        limitado y temporal.
      </Para>

      <Separator />

      {/* §6 — Transferencias */}
      <SectionHeading id="s6">6. Transferencias a terceros</SectionHeading>
      <Para>
        Para prestar el servicio HygieIA, compartimos datos personales con los siguientes
        proveedores de tecnología, con quienes mantenemos contratos de protección de datos:
      </Para>

      <Table
        headers={["Categoría de proveedor", "Finalidad", "País"]}
        rows={[
          [
            "Proveedor de procesamiento de voz y transcripción",
            "Procesamiento de voz, transcripción y alojamiento temporal de la grabación de la llamada (máximo 90 días)",
            "Estados Unidos",
          ],
          [
            "Proveedor de gestión de calendario y citas",
            "Gestión del calendario y confirmación de citas",
            "Estados Unidos",
          ],
          [
            "Proveedor de envío de correo electrónico",
            "Envío de correos de confirmación",
            "Estados Unidos",
          ],
          [
            "Proveedor de infraestructura de alojamiento",
            "Alojamiento de la base de datos y sistemas de la plataforma",
            "Unión Europea",
          ],
        ]}
      />

      <Para>
        Estas transferencias internacionales se realizan al amparo de las cláusulas
        contractuales estándar aplicables.{" "}
        <Bold>
          No vendemos ni cedemos sus datos personales a terceros con fines comerciales
          propios.
        </Bold>
      </Para>

      <Separator />

      {/* §7 — Cambios */}
      <SectionHeading id="s7">7. Cambios a este aviso</SectionHeading>
      <Para>
        Nos reservamos el derecho de modificar este aviso de privacidad en cualquier
        momento. Cuando los cambios sean sustanciales, lo notificaremos mediante el correo
        electrónico que nos haya proporcionado o publicando un aviso en esta misma página.
        La fecha de la última actualización siempre estará visible al inicio del documento.
      </Para>

      <Separator />

      {/* §8 — Consentimiento */}
      <SectionHeading id="s8">8. Consentimiento</SectionHeading>
      <Para>
        Al continuar la llamada con HygieIA después de escuchar la mención a este aviso de
        privacidad, usted otorga su{" "}
        <Bold>consentimiento tácito</Bold> para el tratamiento de sus datos personales en
        los términos aquí descritos, conforme al {CONSENTIMIENTO_ARTICULO_CITA}. Para las
        finalidades secundarias (F4), su consentimiento puede ser revocado en cualquier
        momento conforme al procedimiento descrito en la sección 4.
      </Para>

      {/* Pie legal */}
      <div
        className="mt-12 pt-6 text-xs space-y-1"
        style={{
          borderTop: "1px solid var(--color-border)",
          color: "var(--color-text-caption)",
        }}
      >
        <p>
          Este aviso de privacidad es aplicable exclusivamente al servicio HygieIA de
          agendamiento de citas médicas. Para otros servicios de +Digital MX, consulte el{" "}
          <Link
            href="/privacidad"
            className="underline transition-opacity duration-200 hover:opacity-75"
            style={{ color: "var(--color-primary-light)" }}
          >
            aviso de privacidad general de la plataforma
          </Link>
          .
        </p>
        <p>Aviso de Privacidad HygieIA — {RESPONSABLE_NOMBRE} — Versión 1.1</p>
        <p>Última actualización: 15 de agosto de 2026</p>
        <p>
          Emitido en cumplimiento de la Ley Federal de Protección de Datos Personales en
          Posesión de los Particulares (DOF 20-03-2025, última reforma DOF 14-11-2025)
          y su Reglamento (DOF 21-12-2011).
        </p>
      </div>
    </LegalDocLayout>
  );
}
