const basico = [
  "Agente de voz inbound",
  "ChatBot WhatsApp",
  "Integración Cal.com",
  "Alertas automáticas",
  "Soporte por email 24h",
];

const pro = [
  "Todo del Plan Básico",
  "Agente de voz outbound",
  "CRM básico integrado",
  "Reportes y analítica",
  "Gestor de leads",
  "Prioridad en soporte",
];

function CheckIcon({ color }: { color: string }) {
  return (
    <svg
      className="shrink-0"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="8" fill={`${color}22`} />
      <path
        d="M5 8l2.2 2.2L11 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-28 px-5 relative"
      style={{ background: "var(--color-canvas)" }}
    >
      <div
        className="absolute top-0 left-0 right-0"
        aria-hidden="true"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(27,110,243,0.5) 50%, transparent)",
        }}
      />

      {/* Glow azul izquierda */}
      <div
        className="pointer-events-none absolute -left-40 bottom-0 w-[500px] h-[500px] rounded-full"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, rgba(27,110,243,0.1) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="mb-14 max-w-lg">
          <h2
            className="font-heading font-bold mb-4"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "var(--color-text-base)",
              textWrap: "balance",
            }}
          >
            Planes que crecen contigo
          </h2>
          <p className="text-lg" style={{ color: "var(--color-text-muted)" }}>
            Empieza simple. Escala cuando quieras. Sin contratos de largo plazo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Plan Básico */}
          <div
            className="rounded-2xl p-8 flex flex-col"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <h3
              className="font-heading font-bold text-xl mb-4"
              style={{ color: "var(--color-text-base)" }}
            >
              Plan Básico
            </h3>
            <div className="mb-1">
              <span
                className="font-heading text-4xl font-extrabold"
                style={{ color: "var(--color-text-base)" }}
              >
                $8,000
              </span>
              <span
                className="text-sm ml-1"
                style={{ color: "var(--color-text-muted)" }}
              >
                MXN setup
              </span>
            </div>
            <div className="mb-6">
              <span
                className="font-heading text-2xl font-bold"
                style={{ color: "var(--color-primary-light)" }}
              >
                $2,500
              </span>
              <span
                className="text-sm ml-1"
                style={{ color: "var(--color-text-muted)" }}
              >
                MXN/mes
              </span>
            </div>
            <p
              className="text-sm mb-6"
              style={{ color: "var(--color-text-muted)" }}
            >
              Para negocios que quieren dejar de perder llamadas rápido.
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              {basico.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2.5 text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <CheckIcon color="#10B981" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#contacto"
              className="inline-flex justify-center items-center px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
              style={{
                border: "1px solid var(--color-border-strong)",
                color: "var(--color-primary-light)",
                background: "rgba(27,110,243,0.08)",
              }}
            >
              Empezar con Básico
            </a>
          </div>

          {/* Plan Pro — destacado con borde azul sólido, sin gradiente */}
          <div
            className="rounded-2xl p-8 flex flex-col relative"
            style={{
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border-strong)",
              boxShadow: "var(--shadow-card-hover)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className="font-heading font-bold text-xl"
                style={{ color: "var(--color-text-base)" }}
              >
                Plan Pro
              </h3>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                style={{ background: "var(--color-cta)" }}
              >
                Recomendado
              </span>
            </div>
            <div className="mb-1">
              <span
                className="font-heading text-4xl font-extrabold"
                style={{ color: "var(--color-text-base)" }}
              >
                $15,000
              </span>
              <span
                className="text-sm ml-1"
                style={{ color: "var(--color-text-muted)" }}
              >
                MXN setup
              </span>
            </div>
            <div className="mb-6">
              <span
                className="font-heading text-2xl font-bold"
                style={{ color: "var(--color-primary-light)" }}
              >
                $4,500
              </span>
              <span
                className="text-sm ml-1"
                style={{ color: "var(--color-text-muted)" }}
              >
                MXN/mes
              </span>
            </div>
            <p
              className="text-sm mb-6"
              style={{ color: "var(--color-text-muted)" }}
            >
              Para negocios que quieren crecer agresivamente.
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              {pro.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2.5 text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <CheckIcon color="#60A5FA" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#contacto"
              className="inline-flex justify-center items-center px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 cursor-pointer hover:opacity-90 hover:-translate-y-0.5"
              style={{
                background: "var(--color-cta)",
                boxShadow: "var(--shadow-cta)",
              }}
            >
              Empezar con Pro
            </a>
          </div>
        </div>

        <p
          className="text-center text-sm mt-6"
          style={{ color: "var(--color-text-caption)" }}
        >
          Mínimo 3 meses. Después, mes a mes. Setup no reembolsable.
        </p>
      </div>
    </section>
  );
}
