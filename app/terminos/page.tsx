import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones | +Digital MX",
  description:
    "Términos y Condiciones de Uso del Sitio masdigitalmx.com — Servicios +Digital MX.",
  robots: { index: false, follow: false },
};

// ─── Primitivos de estilo reutilizables (mismo patrón que /privacidad) ────────

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

function ContactLink({ email }: { email: string }) {
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

// ─── Página ───────────────────────────────────────────────────────────────────

export default function TerminosPage() {
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
            Términos y Condiciones de Uso del Sitio
          </h1>
          <p className="text-sm" style={{ color: "var(--color-text-caption)" }}>
            Versión 1.0 — Última actualización: 14 de agosto de 2026
          </p>
        </div>

        <Separator />

        {/* §1 — Aceptación */}
        <SectionHeading id="s1">1. Aceptación de estos términos</SectionHeading>
        <Para>
          El acceso y la navegación del sitio web{" "}
          <strong style={{ color: "var(--color-text-base)" }}>masdigitalmx.com</strong> (en
          adelante, el &quot;Sitio&quot;), operado por{" "}
          <strong style={{ color: "var(--color-text-base)" }}>Servicios +Digital MX</strong>{" "}
          (en adelante, &quot;+Digital MX&quot;), implican la aceptación plena y sin reservas
          de los presentes Términos y Condiciones de Uso, en la versión publicada al momento
          del acceso.
        </Para>
        <Para>
          <strong style={{ color: "var(--color-text-base)" }}>
            El uso continuado del Sitio constituye manifestación de conformidad con estos
            Términos.
          </strong>{" "}
          Quien no esté de acuerdo con ellos, en todo o en parte, debe abstenerse de utilizar
          el Sitio.
        </Para>
        <Para>
          Estos términos regulan exclusivamente tu uso del Sitio como visitante — no regulan
          la prestación de ningún servicio contratado. Si ya eres cliente de alguno de
          nuestros productos (agentes de voz, chatbots de WhatsApp u otras soluciones de
          automatización), tu relación contractual con +Digital MX se rige por el contrato de
          prestación de servicios y los términos específicos de ese producto, que te fueron o
          serán presentados al momento de la contratación.
        </Para>

        <Separator />

        {/* §2 — Qué hay en el sitio */}
        <SectionHeading id="s2">2. Qué encontrarás en este Sitio</SectionHeading>
        <Para>
          El Sitio tiene como propósito presentar información sobre +Digital MX y sus
          soluciones de automatización con inteligencia artificial, permitir el contacto con
          nuestro equipo comercial y, en algunos casos, dirigirte a canales de comunicación
          (como WhatsApp) donde puedes interactuar con demostraciones de nuestros productos.
        </Para>
        <Para>
          La descripción detallada de cada producto, sus alcances y limitaciones específicas
          se presenta en el propio Sitio y, en su caso, en los términos particulares de ese
          producto — no se repite aquí para evitar que este documento quede desactualizado
          cada vez que el catálogo de servicios cambie.
        </Para>

        <Separator />

        {/* §3 — Uso aceptable */}
        <SectionHeading id="s3">3. Uso aceptable del Sitio</SectionHeading>
        <Para>Queda expresamente prohibido:</Para>
        <ul
          className="text-sm leading-relaxed mb-4 space-y-2 pl-5 list-disc"
          style={{ color: "var(--color-text-muted)" }}
        >
          <li>
            Acceder o intentar acceder, sin autorización, a cualquier parte del Sitio, a sus
            sistemas, a sus interfaces de programación o a la infraestructura que lo soporta.
          </li>
          <li>
            Emplear robots, arañas, <em>scrapers</em> o cualquier mecanismo automatizado de
            extracción, recopilación o indexación masiva de contenido del Sitio, sin
            autorización previa y por escrito de +Digital MX.
          </li>
          <li>
            Interferir, degradar o alterar el funcionamiento técnico del Sitio, incluyendo la
            sobrecarga deliberada de sus recursos, los ataques de denegación de servicio y el
            sondeo, escaneo o explotación de vulnerabilidades.
          </li>
          <li>
            Eludir, desactivar o vulnerar los mecanismos de seguridad, autenticación o
            limitación de uso implementados en el Sitio.
          </li>
          <li>
            Utilizar el Sitio, sus formularios o los canales de comunicación a los que dirige
            para fines ilícitos, fraudulentos, de suplantación de identidad, difusión de
            código malicioso, acoso, o envío de comunicaciones masivas no solicitadas.
          </li>
          <li>
            Reproducir, copiar, distribuir, comercializar o crear obras derivadas del
            contenido del Sitio, en todo o en parte, sin autorización expresa y por escrito de
            +Digital MX.
          </li>
          <li>
            Suprimir, ocultar o alterar los avisos de propiedad intelectual, marcas o
            cualquier señal identificativa presentes en el Sitio.
          </li>
        </ul>
        <Para>
          El incumplimiento de cualquiera de las prohibiciones anteriores faculta a +Digital
          MX para restringir, suspender o bloquear el acceso al Sitio de forma{" "}
          <strong style={{ color: "var(--color-text-base)" }}>
            inmediata y sin necesidad de aviso previo
          </strong>
          , así como para conservar y aportar ante la autoridad competente los registros
          técnicos de la conducta (dirección IP, fecha y hora de acceso y demás datos de
          conexión). Lo anterior sin perjuicio de las acciones civiles, administrativas y
          penales que resulten procedentes conforme a la legislación aplicable, incluidas las
          previstas en materia de delitos informáticos y de propiedad intelectual.
        </Para>

        <Separator />

        {/* §4 — Propiedad intelectual */}
        <SectionHeading id="s4">4. Propiedad intelectual</SectionHeading>
        <Para>
          El contenido del Sitio — textos, diseño, marca &quot;+Digital MX&quot; y
          &quot;masdigitalmx&quot;, logotipos, así como el software que lo hace funcionar — es
          propiedad de +Digital MX o de terceros licenciantes, y está protegido por la
          legislación mexicana e internacional de propiedad intelectual.
        </Para>
        <Para>
          Nada en estos términos te otorga licencia o derecho alguno sobre esa propiedad,
          salvo el uso ordinario del Sitio como visitante para los fines aquí descritos.
        </Para>

        <Separator />

        {/* §5 — Enlaces a terceros */}
        <SectionHeading id="s5">5. Enlaces y canales de terceros</SectionHeading>
        <Para>
          El Sitio puede dirigirte a canales operados por terceros — en particular,{" "}
          <strong style={{ color: "var(--color-text-base)" }}>
            WhatsApp Business (Meta)
          </strong>{" "}
          para interactuar con demostraciones de nuestros productos o contactar a nuestro
          equipo.
        </Para>
        <Para>
          Tu uso de esos canales se rige, además de por estos términos, por las condiciones
          propias de esos proveedores (por ejemplo, los Términos de Servicio de
          WhatsApp/Meta). +Digital MX no controla ni es responsable de la disponibilidad,
          funcionamiento o políticas de plataformas de terceros.
        </Para>

        <Separator />

        {/* §6 — Limitación de responsabilidad */}
        <SectionHeading id="s6">6. Limitación de responsabilidad</SectionHeading>
        <Para>
          El Sitio se proporciona{" "}
          <strong style={{ color: "var(--color-text-base)" }}>&quot;tal cual&quot;</strong>,
          sin garantías de disponibilidad ininterrumpida o de operación libre de errores.
          +Digital MX no garantiza que el Sitio esté disponible en todo momento, ni es
          responsable por interrupciones derivadas de mantenimiento, fallas de infraestructura
          de terceros (hosting, proveedores de conectividad) o causas de fuerza mayor.
        </Para>
        <Para>
          Esta limitación aplica únicamente al Sitio como tal. El nivel de servicio (SLA) de
          cualquier producto contratado se establece de forma independiente en el contrato y
          términos específicos de ese producto.
        </Para>
        <Para>
          +Digital MX no es responsable por daños indirectos derivados del uso del Sitio,
          salvo en los casos en que la legislación mexicana aplicable no permita limitar dicha
          responsabilidad.
        </Para>

        <Separator />

        {/* §7 — Modificaciones */}
        <SectionHeading id="s7">7. Modificaciones a estos términos</SectionHeading>
        <Para>
          +Digital MX puede actualizar estos Términos y Condiciones para reflejar cambios en
          el Sitio o en la legislación aplicable. La versión vigente siempre será la publicada
          en{" "}
          <Link
            href="/terminos"
            className="underline transition-opacity duration-200 hover:opacity-75"
            style={{ color: "var(--color-primary-light)" }}
          >
            masdigitalmx.com/terminos
          </Link>
          , con su fecha de última actualización.
        </Para>
        <Para>
          Para cambios sustanciales, procuraremos dar aviso visible en el Sitio con
          anticipación razonable. El uso continuado del Sitio tras la publicación de cambios
          implica su aceptación.
        </Para>

        <Separator />

        {/* §8 — Disposiciones generales */}
        <SectionHeading id="s8">8. Disposiciones generales</SectionHeading>
        <Para>
          <strong style={{ color: "var(--color-text-base)" }}>Ley aplicable:</strong> Estos
          términos se rigen por las leyes de los Estados Unidos Mexicanos.
        </Para>
        <Para>
          <strong style={{ color: "var(--color-text-base)" }}>Jurisdicción:</strong> Cualquier
          controversia derivada de estos términos se resolverá ante los tribunales competentes
          de la Ciudad de México, renunciando a cualquier otro fuero que pudiera corresponder
          por razón de domicilio presente o futuro.
        </Para>
        <Para>
          <strong style={{ color: "var(--color-text-base)" }}>Divisibilidad:</strong> Si
          alguna disposición de estos términos resulta inválida o inaplicable, el resto
          permanecerá vigente.
        </Para>
        <Para>
          <strong style={{ color: "var(--color-text-base)" }}>Privacidad:</strong> El
          tratamiento de tus datos personales al usar el Sitio se rige por nuestro{" "}
          <Link
            href="/privacidad"
            className="underline transition-opacity duration-200 hover:opacity-75"
            style={{ color: "var(--color-primary-light)" }}
          >
            Aviso de Privacidad
          </Link>
          , documento independiente de estos Términos y Condiciones.
        </Para>

        <Separator />

        {/* §9 — Contacto */}
        <SectionHeading id="s9">9. Contacto</SectionHeading>
        <Para>
          Para cualquier duda o comentario sobre estos Términos y Condiciones:
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
              Servicios +Digital MX
            </strong>
          </p>
          <p>
            Correo: <ContactLink email="privacidad@masdigitalmx.com" />
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
          <p>Términos y Condiciones de Uso del Sitio — +Digital MX — Versión 1.0</p>
          <p>Última actualización: 14 de agosto de 2026</p>
        </div>
      </div>
    </main>
  );
}
