import { Phone, MessageSquare, FileText, Cpu } from "lucide-react";

const problemas = [
  {
    numero: "01",
    icon: Phone,
    headline: "Llamada perdida = Cliente perdido",
    body: "Cada llamada sin respuesta es un cliente que llama a la competencia. Nuestro agente de voz atiende 24/7 mientras tú te enfocas en quien ya está ahí. Además, te proporciona información valiosa para identificar qué haces bien y tus puntos de mejora.",
    stat: "30% de llamadas",
    statLabel: "se pierden sin respuesta",
    color: "var(--color-primary-light)",
  },
  {
    numero: "02",
    icon: MessageSquare,
    headline: "WhatsApp para informar, para atender, para vender",
    body: "Tu ChatBot contesta en segundos. Consultas, citas, información — automatizado sin desgaste y sin errores.",
    stat: "4 horas",
    statLabel: "tiempo promedio de respuesta sin IA",
    color: "var(--color-primary)",
  },
  {
    numero: "03",
    icon: FileText,
    headline: "Documentos que fluyen solos",
    body: "Cotizaciones, contratos, facturas — tu gestor documental los genera, envía y organiza sin intervención humana. Menos papeleo, más tiempo para lo que genera valor.",
    stat: "80% menos tiempo",
    statLabel: "en gestión de documentos",
    color: "var(--color-cta)",
  },
  {
    numero: "04",
    icon: Cpu,
    headline: "Adiós a tareas manuales",
    body: "Tu equipo se enfoca en lo que importa. El agente maneja lo repetitivo: agendas, confirmaciones, seguimientos.",
    stat: "40% del tiempo",
    statLabel: "se gasta en tareas evitables",
    color: "var(--color-success)",
  },
];

export default function ProblemasSection() {
  return (
    <section
      id="problemas"
      className="py-28 px-5 relative"
      style={{ background: "var(--color-canvas)" }}
    >
      {/* Línea azul horizontal — separa secciones sin cambiar el fondo */}
      <div
        className="absolute top-0 left-0 right-0"
        aria-hidden="true"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(27,110,243,0.5) 50%, transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-lg">
          <h2
            className="font-heading font-bold mb-4 whitespace-nowrap"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "var(--color-text-base)",
            }}
          >
            ¿Cuál es tu reto?
          </h2>
          <p className="text-lg" style={{ color: "var(--color-text-muted)" }}>
            Cada minuto sin respuesta es una oportunidad que se pierde.
          </p>
        </div>

        {/* Lista editorial — no tarjetas simétricas */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
          }}
        >
          {problemas.map(
            ({ numero, icon: Icon, headline, body, stat, statLabel, color }) => (
              <div
                key={numero}
                className="grid md:grid-cols-[64px_1fr_200px] gap-8 py-10 items-start"
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                {/* Número decorativo */}
                <span
                  className="font-heading font-bold text-5xl leading-none select-none pt-1"
                  style={{
                    color: "var(--color-border-strong)",
                    textShadow: "0.8px 0 0 rgba(27,110,243,0.42), -0.8px 0 0 rgba(27,110,243,0.42), 0 0.8px 0 rgba(27,110,243,0.42), 0 -0.8px 0 rgba(27,110,243,0.42)",
                  }}
                >
                  {numero}
                </span>

                {/* Contenido */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Icon size={18} style={{ color }} strokeWidth={1.5} />
                    <h3
                      className="font-heading font-bold text-2xl leading-snug"
                      style={{ color: "var(--color-text-base)" }}
                    >
                      {headline}
                    </h3>
                  </div>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--color-text-muted)", maxWidth: "520px" }}
                  >
                    {body}
                  </p>
                </div>

                {/* Métrica — alineada a la derecha en desktop */}
                <div className="md:text-right">
                  <p
                    className="font-heading font-bold text-3xl leading-tight mb-1"
                    style={{ color }}
                  >
                    {stat}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-text-caption)" }}
                  >
                    {statLabel}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
