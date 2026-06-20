import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso de Privacidad | +Digital MX",
  description:
    "Aviso de Privacidad Corporativo de Servicios +Digital MX — LFPDPPP DOF 05-07-2010.",
  robots: { index: false, follow: false },
};

// ─── Primitivos de estilo reutilizables ───────────────────────────────────────

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

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="font-heading font-semibold mb-3 mt-6"
      style={{ fontSize: "1rem", color: "var(--color-text-base)" }}
    >
      {children}
    </h3>
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

function PrivacyLink({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      className="underline transition-opacity duration-200 hover:opacity-75"
      style={{ color: "var(--color-primary-light)" }}
    >
      {email}
    </a>
  );
}

// ─── Tablas ───────────────────────────────────────────────────────────────────

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto my-6 rounded-xl" style={{ border: "1px solid var(--color-border)" }}>
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
                background: ri % 2 === 0 ? "var(--color-surface)" : "var(--color-canvas)",
              }}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-4 py-3 align-top text-sm leading-relaxed"
                  style={{
                    color: "var(--color-text-muted)",
                    borderBottom:
                      ri < rows.length - 1 ? "1px solid var(--color-border)" : "none",
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

// ─── Página ───────────────────────────────────────────────────────────────────

export default function PrivacidadPage() {
  return (
    <main
      className="min-h-screen py-20 px-5"
      style={{ background: "var(--color-canvas)" }}
    >
      <div className="mx-auto max-w-3xl">
        {/* Encabezado */}
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
            Aviso de Privacidad
          </h1>
          <p className="text-sm" style={{ color: "var(--color-text-caption)" }}>
            Versión 2.1 — Última actualización: 19 de junio de 2026
          </p>
        </div>

        <Separator />

        {/* §1 — Identidad y domicilio */}
        <SectionHeading id="s1">1. Identidad y domicilio del responsable</SectionHeading>
        <Para>
          <strong style={{ color: "var(--color-text-base)" }}>
            Servicios +Digital MX
          </strong>{" "}
          (en adelante, "+Digital MX" o el "Responsable"), con domicilio en{" "}
          <strong style={{ color: "var(--color-text-base)" }}>
            Ciudad de México, México
          </strong>
          , es el responsable del tratamiento de los datos personales que recaba a través
          del sitio web <strong style={{ color: "var(--color-text-base)" }}>masdigitalmx.com</strong> y de
          sus canales de comunicación asociados (WhatsApp Business y correo electrónico).
        </Para>
        <Para>
          Para efectos de notificaciones formales relacionadas con el ejercicio de tus
          derechos ARCO o cualquier asunto jurídico derivado del presente aviso, el domicilio
          completo del Responsable puede ser solicitado a través del correo{" "}
          <PrivacyLink email="privacidad@masdigitalmx.com" />.
        </Para>
        <Para>
          El presente Aviso de Privacidad se emite en cumplimiento de la{" "}
          <strong style={{ color: "var(--color-text-base)" }}>
            Ley Federal de Protección de Datos Personales en Posesión de los Particulares
          </strong>{" "}
          (LFPDPPP, publicada en el DOF el 5 de julio de 2010, con reforma publicada el
          14 de noviembre de 2025) y su Reglamento (DOF 21 de diciembre de 2011).
        </Para>

        {/* §1.1 — Unidad de Privacidad */}
        <SubHeading>1.1 Unidad de Privacidad</SubHeading>
        <Para>
          La atención a las solicitudes de ejercicio de derechos ARCO, la gestión de
          consultas sobre privacidad y la supervisión del cumplimiento de este aviso están
          a cargo de la{" "}
          <strong style={{ color: "var(--color-text-base)" }}>
            Unidad de Privacidad
          </strong>{" "}
          de +Digital MX. Puedes contactar a esta unidad a través del correo{" "}
          <PrivacyLink email="privacidad@masdigitalmx.com" />.
        </Para>

        <Separator />

        {/* §2 — Alcance */}
        <SectionHeading id="s2">2. Alcance de este aviso</SectionHeading>
        <Para>Este aviso aplica al tratamiento de datos personales derivado de:</Para>
        <ul
          className="text-sm leading-relaxed mb-4 space-y-2 pl-5 list-disc"
          style={{ color: "var(--color-text-muted)" }}
        >
          <li>
            Tu interacción con el sitio web{" "}
            <strong style={{ color: "var(--color-text-base)" }}>masdigitalmx.com</strong>{" "}
            (formulario de contacto, navegación).
          </li>
          <li>
            La comunicación a través de nuestro{" "}
            <strong style={{ color: "var(--color-text-base)" }}>
              canal de WhatsApp Business
            </strong>
            .
          </li>
          <li>
            El contacto por{" "}
            <strong style={{ color: "var(--color-text-base)" }}>correo electrónico</strong>{" "}
            con cualquiera de nuestras direcciones corporativas.
          </li>
          <li>
            El proceso de{" "}
            <strong style={{ color: "var(--color-text-base)" }}>
              prospección y cotización
            </strong>{" "}
            de cualquiera de nuestros servicios.
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
          <strong style={{ color: "var(--color-text-base)" }}>
            Aviso importante sobre nuestros productos:
          </strong>{" "}
          Si utilizas alguno de nuestros productos o servicios (como HygieIA — agente de voz
          para citas médicas, o MattIAs — chatbot de atención por WhatsApp), el tratamiento
          de tus datos en el contexto de ese producto se rige por el aviso de privacidad
          específico de dicho producto, el cual te será presentado antes de iniciar su uso.
          Los avisos específicos por producto están disponibles en el sitio web de +Digital MX.
        </div>

        <Separator />

        {/* §3 — Datos */}
        <SectionHeading id="s3">3. Datos personales que recabamos</SectionHeading>
        <Para>
          Según el canal de contacto, recabamos las siguientes categorías de datos:
        </Para>

        <SubHeading>Sitio web y correo electrónico</SubHeading>
        <ul
          className="text-sm leading-relaxed mb-6 space-y-1.5 pl-5 list-disc"
          style={{ color: "var(--color-text-muted)" }}
        >
          <li>Nombre y apellidos</li>
          <li>Correo electrónico</li>
          <li>Número de teléfono (móvil o fijo)</li>
          <li>Nombre de la empresa o negocio</li>
          <li>Giro o sector de tu empresa</li>
          <li>Contenido del mensaje o consulta</li>
        </ul>

        <SubHeading>Canal de WhatsApp Business</SubHeading>
        <ul
          className="text-sm leading-relaxed mb-6 space-y-1.5 pl-5 list-disc"
          style={{ color: "var(--color-text-muted)" }}
        >
          <li>Número de teléfono móvil</li>
          <li>Nombre de perfil de WhatsApp</li>
          <li>Mensajes de texto, notas de voz, imágenes y documentos que nos envíes</li>
          <li>Historial de conversación necesario para dar continuidad a la atención</li>
        </ul>

        <SubHeading>Datos técnicos (recabados automáticamente)</SubHeading>
        <ul
          className="text-sm leading-relaxed mb-6 space-y-1.5 pl-5 list-disc"
          style={{ color: "var(--color-text-muted)" }}
        >
          <li>Dirección IP</li>
          <li>Tipo de dispositivo y navegador</li>
          <li>Fecha y hora de interacción con el sitio web</li>
        </ul>

        <div
          className="rounded-xl p-4 text-sm leading-relaxed"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-muted)",
          }}
        >
          <strong style={{ color: "var(--color-text-base)" }}>
            No recabamos datos sensibles
          </strong>{" "}
          (estado de salud, origen étnico, ideología política, preferencias sexuales,
          creencias religiosas, etc.) a través de los canales descritos en este aviso. Si
          por la naturaleza de una conversación compartes voluntariamente información de esa
          índole, su uso quedará estrictamente limitado a resolver tu consulta y no será
          almacenada en nuestros sistemas más allá del hilo de conversación.
        </div>

        <Separator />

        {/* §4 — Finalidades */}
        <SectionHeading id="s4">4. Finalidades del tratamiento</SectionHeading>

        <SubHeading>Finalidades primarias — necesarias para el servicio</SubHeading>
        <Para>
          Sin el tratamiento para estas finalidades no es posible atender tu solicitud:
        </Para>
        <ul
          className="text-sm leading-relaxed mb-6 space-y-1.5 pl-5 list-disc"
          style={{ color: "var(--color-text-muted)" }}
        >
          <li>Responder consultas y solicitudes de información sobre nuestros servicios.</li>
          <li>Agendar y realizar demostraciones del servicio.</li>
          <li>
            Gestionar la relación comercial: elaborar cotizaciones, presentar propuestas y
            formalizar contratos.
          </li>
          <li>Dar seguimiento a procesos de venta activos.</li>
          <li>
            Atender requerimientos de autoridades competentes conforme a la legislación
            aplicable.
          </li>
        </ul>

        <SubHeading>Finalidades secundarias — opcionales</SubHeading>
        <Para>
          Estas finalidades no son necesarias para atender tu solicitud. Si no deseas que
          tus datos sean tratados para estos fines, puedes manifestarlo en cualquier momento
          escribiendo a <PrivacyLink email="privacidad@masdigitalmx.com" />:
        </Para>
        <ul
          className="text-sm leading-relaxed mb-4 space-y-1.5 pl-5 list-disc"
          style={{ color: "var(--color-text-muted)" }}
        >
          <li>
            Envío de comunicaciones comerciales, promociones y novedades de +Digital MX.
          </li>
          <li>Análisis estadístico agregado para la mejora de nuestros servicios.</li>
          <li>
            Elaboración de casos de éxito (siempre con tu consentimiento explícito previo y
            por escrito).
          </li>
        </ul>

        <Separator />

        {/* §5 — Plazos */}
        <SectionHeading id="s5">5. Plazos de conservación de tus datos</SectionHeading>
        <Para>
          Conservamos tus datos personales únicamente durante el tiempo necesario para
          cumplir las finalidades descritas en este aviso, conforme a los siguientes plazos:
        </Para>

        <Table
          headers={["Categoría de dato", "Plazo de conservación", "Criterio"]}
          rows={[
            [
              "Datos de contacto y consulta (formulario, correo)",
              "12 meses desde el último contacto",
              "Ciclo de venta; sin actividad comercial en 12 meses, el dato pierde relevancia",
            ],
            [
              "Conversaciones de WhatsApp Business",
              "12 meses desde el último mensaje",
              "Continuidad de atención; purga al vencimiento del plazo",
            ],
            [
              "Datos técnicos (IP, navegación)",
              "6 meses desde la interacción",
              "Sin valor comercial tras ese período",
            ],
          ]}
        />

        <Para>
          Una vez vencido el plazo aplicable, procederemos a la cancelación (bloqueo y
          posterior supresión) de tus datos conforme al procedimiento establecido en los
          artículos 36 y 37 de la LFPDPPP, salvo que exista una obligación legal que exija
          su conservación por un período mayor.
        </Para>

        <Separator />

        {/* §6 — Transferencias */}
        <SectionHeading id="s6">6. Transferencias de datos personales</SectionHeading>
        <Para>
          +Digital MX puede compartir tus datos personales con los siguientes terceros, en
          la medida estrictamente necesaria para cumplir las finalidades de este aviso:
        </Para>

        <Table
          headers={["Categoría de proveedor", "Finalidad", "País"]}
          rows={[
            [
              "Proveedor de servicios de correo electrónico corporativo",
              "Operación de buzones corporativos y recepción de solicitudes ARCO",
              "India / infraestructura global",
            ],
            [
              "Proveedor de infraestructura web y hospedaje",
              "Despliegue y operación del sitio masdigitalmx.com",
              "Estados Unidos",
            ],
            [
              "WhatsApp Business (Meta)",
              "Operación del canal de mensajería WhatsApp",
              "Estados Unidos",
            ],
          ]}
        />

        <Para>
          Estas transferencias son necesarias para la operación del servicio. Ninguno de
          estos proveedores está autorizado a usar tus datos para finalidades distintas a
          las aquí descritas.
        </Para>
        <Para>
          <strong style={{ color: "var(--color-text-base)" }}>
            Garantías para transferencias internacionales:
          </strong>{" "}
          Cuando tus datos son transferidos a proveedores ubicados en países que no cuentan
          con un nivel de protección de datos equiparable al de México, +Digital MX
          implementa mecanismos contractuales adecuados conforme a los artículos 36 y 37 de
          la LFPDPPP. Específicamente, suscribimos con dichos proveedores Cláusulas
          Contractuales Tipo u otros mecanismos equivalentes reconocidos por la legislación
          aplicable, que obligan a estos terceros a proteger tus datos con un nivel
          sustancialmente similar al exigido por la ley mexicana. Puedes solicitar
          información sobre las garantías vigentes escribiendo a{" "}
          <PrivacyLink email="privacidad@masdigitalmx.com" />.
        </Para>
        <Para>
          <strong style={{ color: "var(--color-text-base)" }}>
            +Digital MX no vende, cede ni comercializa tus datos personales a terceros con
            fines publicitarios o de prospección propia.
          </strong>
        </Para>

        <Separator />

        {/* §7 — Cookies */}
        <SectionHeading id="s7">7. Uso de cookies y tecnologías de seguimiento</SectionHeading>
        <Para>
          El sitio web <strong style={{ color: "var(--color-text-base)" }}>masdigitalmx.com</strong>{" "}
          utiliza únicamente{" "}
          <strong style={{ color: "var(--color-text-base)" }}>
            cookies técnicas esenciales
          </strong>{" "}
          para el correcto funcionamiento de la página. No utilizamos cookies de rastreo de
          terceros, píxeles de retargeting ni herramientas de analítica de comportamiento
          personal.
        </Para>
        <Para>No se requiere ninguna acción de tu parte respecto a cookies al visitar este sitio.</Para>
        <Para>
          Puedes configurar tu navegador para bloquear o eliminar cookies en cualquier
          momento; esto podría afectar la funcionalidad básica del sitio.
        </Para>

        <Separator />

        {/* §8 — ARCO */}
        <SectionHeading id="s8">8. Derechos ARCO y revocación del consentimiento</SectionHeading>
        <Para>
          Como titular de datos personales, tienes derecho a{" "}
          <strong style={{ color: "var(--color-text-base)" }}>
            Acceder, Rectificar, Cancelar u Oponerte
          </strong>{" "}
          al tratamiento de tus datos (derechos ARCO), así como a{" "}
          <strong style={{ color: "var(--color-text-base)" }}>
            revocar el consentimiento
          </strong>{" "}
          otorgado para finalidades secundarias, conforme a los artículos 8 al 15 y 28 de
          la LFPDPPP.
        </Para>

        <SubHeading>Para ejercer tus derechos</SubHeading>
        <Para>
          Envía una solicitud a la Unidad de Privacidad al correo{" "}
          <PrivacyLink email="privacidad@masdigitalmx.com" /> que incluya:
        </Para>
        <ol
          className="text-sm leading-relaxed mb-6 space-y-2 pl-5 list-decimal"
          style={{ color: "var(--color-text-muted)" }}
        >
          <li>
            Tu nombre completo y el correo electrónico o número de teléfono con el que te
            contactaste con nosotros.
          </li>
          <li>
            Descripción clara del derecho que deseas ejercer y los datos a los que se
            refiere.
          </li>
          <li>Copia de tu identificación oficial vigente (INE/IFE o pasaporte).</li>
          <li>
            Cualquier información que facilite la localización de tus datos (fecha de
            conversación, número de WhatsApp desde el que escribiste, etc.).
          </li>
        </ol>
        <Para>
          <strong style={{ color: "var(--color-text-base)" }}>Plazo de respuesta:</strong>{" "}
          20 días hábiles a partir de la recepción de tu solicitud completa, ampliable por
          10 días hábiles adicionales cuando las circunstancias lo justifiquen, conforme al
          artículo 28 de la LFPDPPP.
        </Para>

        <SubHeading>Si no quedas satisfecho con nuestra respuesta</SubHeading>
        <Para>
          Puedes presentar una queja o denuncia ante la{" "}
          <strong style={{ color: "var(--color-text-base)" }}>
            Secretaría Anticorrupción y Buen Gobierno
          </strong>
          , autoridad competente en materia de protección de datos personales conforme a la
          reforma publicada en el DOF el 14 de noviembre de 2025, o ante los tribunales
          competentes.
        </Para>

        <Separator />

        {/* §9 — Cambios */}
        <SectionHeading id="s9">9. Cambios al aviso de privacidad</SectionHeading>
        <Para>
          +Digital MX se reserva el derecho de actualizar el presente Aviso de Privacidad
          para reflejar cambios en el servicio, en la legislación aplicable o en nuestras
          prácticas de tratamiento de datos.
        </Para>
        <Para>
          Cualquier modificación será publicada en{" "}
          <Link
            href="/privacidad"
            className="underline transition-opacity duration-200 hover:opacity-75"
            style={{ color: "var(--color-primary-light)" }}
          >
            masdigitalmx.com/privacidad
          </Link>{" "}
          con la fecha de actualización correspondiente. Para cambios sustanciales que
          afecten tus derechos como titular, te notificaremos directamente al correo que
          tengamos registrado con al menos{" "}
          <strong style={{ color: "var(--color-text-base)" }}>
            15 días de anticipación
          </strong>{" "}
          a su entrada en vigor, conforme al artículo 18 de la LFPDPPP.
        </Para>
        <Para>
          La versión vigente siempre será la disponible en esta página. Las versiones
          anteriores quedan archivadas y disponibles para consulta bajo solicitud dirigida a{" "}
          <PrivacyLink email="privacidad@masdigitalmx.com" />.
        </Para>

        <Separator />

        {/* §10 — Contacto */}
        <SectionHeading id="s10">10. Contacto</SectionHeading>
        <Para>
          Para cualquier duda, comentario o solicitud relacionada con este Aviso de
          Privacidad o con el tratamiento de tus datos personales:
        </Para>
        <div
          className="rounded-xl p-6 text-sm leading-relaxed space-y-1"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-muted)",
          }}
        >
          <p>
            <strong style={{ color: "var(--color-text-base)" }}>
              Servicios +Digital MX — Unidad de Privacidad
            </strong>
          </p>
          <p>
            Correo de privacidad:{" "}
            <PrivacyLink email="privacidad@masdigitalmx.com" />
          </p>
          <p>
            Sitio web:{" "}
            <Link
              href="/"
              className="underline transition-opacity duration-200 hover:opacity-75"
              style={{ color: "var(--color-primary-light)" }}
            >
              masdigitalmx.com
            </Link>
          </p>
        </div>

        {/* Pie legal */}
        <div
          className="mt-12 pt-6 text-xs space-y-1"
          style={{
            borderTop: "1px solid var(--color-border)",
            color: "var(--color-text-caption)",
          }}
        >
          <p>Aviso de Privacidad Corporativo — Servicios +Digital MX — Versión 2.2</p>
          <p>Última actualización: 19 de junio de 2026</p>
          <p>
            Emitido en cumplimiento de la Ley Federal de Protección de Datos Personales en
            Posesión de los Particulares (DOF 05-07-2010, reforma DOF 14-11-2025) y su
            Reglamento (DOF 21-12-2011).
          </p>
        </div>
      </div>
    </main>
  );
}
