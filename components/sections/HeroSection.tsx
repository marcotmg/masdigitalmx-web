import Link from "next/link";
import Image from "next/image";

const WA_URL =
  "https://wa.me/525652107460?text=Hola%2C+me+interesa+automatizar+mi+negocio";

const chatMessages = [
  { from: "user", text: "Hola, quiero agendar para mañana" },
  {
    from: "bot",
    text: "¡Hola! Tenemos disponibilidad a las 10am y a las 3pm. ¿Cuál prefiere?",
  },
  { from: "user", text: "Las 3pm, gracias" },
  {
    from: "bot",
    text: "✓ Cita confirmada para mañana a las 3pm. Le enviamos recordatorio 1 hora antes.",
  },
];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden px-5 pt-20 pb-10"
      style={{ background: "var(--color-canvas)" }}
    >
      {/* Glow azul — arriba-izquierda */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, rgba(27,110,243,0.18) 0%, transparent 65%)",
        }}
      />
      {/* Glow complementario — abajo-derecha */}
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, rgba(27,110,243,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Grid sutil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-6xl w-full flex flex-col gap-10">

        {/* BLOQUE 1 — Headline centrado */}
        <div className="text-center flex flex-col items-center gap-5">

          {/* Badge — sin fecha, solo identidad */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
            style={{
              border: "1px solid rgba(27,110,243,0.3)",
              background: "rgba(27,110,243,0.08)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "var(--color-success)" }}
            />
            <span className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>
              IA para negocios mexicanos
            </span>
          </div>

          {/* Headline — Exo 2: tech, elegante, no genérica */}
          <h1
            className="font-heading font-bold leading-[0.94] tracking-tight"
            style={{
              fontSize: "clamp(2.6rem, 6.5vw, 5rem)",
              color: "var(--color-text-base)",
              textWrap: "balance",
            }}
          >
            Automatiza tu negocio
            <br />
            <span style={{ color: "var(--color-primary-light)" }}>con IA.</span>
          </h1>

          {/* Subheadline — reformulado */}
          <p
            className="text-xl leading-relaxed max-w-xl"
            style={{ color: "var(--color-text-muted)" }}
          >
            Tu competencia pierde llamadas. Tú, nunca más.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto"
              style={{
                background: "var(--color-cta)",
                boxShadow: "var(--shadow-cta)",
              }}
            >
              Ver demo en vivo
            </a>
            <Link
              href="/#sectores"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto"
              style={{
                border: "1px solid rgba(27,110,243,0.35)",
                color: "var(--color-text-base)",
                background: "rgba(27,110,243,0.08)",
              }}
            >
              Ver sectores
            </Link>
          </div>

          {/* Proof strip */}
          <div
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm"
            style={{ color: "var(--color-text-caption)" }}
          >
            <span>Sin contratos de largo plazo</span>
            <span aria-hidden="true">·</span>
            <span>Soporte 24/7</span>
            <span aria-hidden="true">·</span>
            <span>Implementación en días</span>
          </div>
        </div>

        {/* BLOQUE 2 — Chat mockup izquierda + Mati derecha */}
        <div className="grid lg:grid-cols-2 gap-8 items-end">

          {/* Izquierda: chat mockup */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-card-hover)",
            }}
          >
            {/* Header del chat */}
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{
                background: "#0A1428",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ background: "var(--color-primary)" }}
              >
                +D
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--color-text-base)" }}>
                  Asistente +Digital
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-xs" style={{ color: "var(--color-text-caption)" }}>
                    En línea
                  </span>
                </div>
              </div>
            </div>

            {/* Mensajes */}
            <div className="px-4 py-5 space-y-3">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[82%] px-4 py-2.5 text-sm leading-snug"
                    style={
                      msg.from === "user"
                        ? {
                            background: "var(--color-primary)",
                            color: "white",
                            borderRadius: "18px 18px 4px 18px",
                          }
                        : {
                            background: "#132040",
                            color: "var(--color-text-base)",
                            border: "1px solid var(--color-border)",
                            borderRadius: "18px 18px 18px 4px",
                          }
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer del chat */}
            <div
              className="px-4 py-3 flex items-center gap-3"
              style={{
                background: "#0A1428",
                borderTop: "1px solid var(--color-border)",
              }}
            >
              <div
                className="flex-1 rounded-full px-4 py-2 text-sm"
                style={{ background: "#132040", color: "var(--color-text-caption)" }}
              >
                Escribe un mensaje…
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "var(--color-success)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Derecha: Mati */}
          <div className="flex flex-col items-center lg:items-end justify-end">
            <Image
              src="/mati.webp"
              alt="Mati, el asistente de IA de +Digital MX"
              width={420}
              height={420}
              className="w-full max-w-sm lg:max-w-md object-contain drop-shadow-2xl"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}
