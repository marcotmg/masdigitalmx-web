"use client";

import { useState } from "react";
import { Send, Lock } from "lucide-react";

const API_URL = "/api/contacto";

const sectores = [
  "Servicios",
  "Salud",
  "Comercio",
  "Infraestructura",
  "Finanzas",
  "Bienes Raíces",
  "Otro",
];

export default function ContactoSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: data.get("nombre"),
          whatsapp: data.get("whatsapp"),
          email: data.get("email"),
          sector: data.get("sector"),
          mensaje: data.get("mensaje") || "",
          website: data.get("website") || "",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contacto"
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

      {/* Glow azul centrado — contexto de cierre del sitio */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 w-[600px] h-[400px] rounded-full"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse, rgba(27,110,243,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-xl">
        <div className="text-center mb-10">
          <h2
            className="font-heading font-bold mb-3"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              color: "var(--color-text-base)",
              textWrap: "balance",
            }}
          >
            ¿Listo para ver cómo funciona?
          </h2>
          <p className="text-lg" style={{ color: "var(--color-text-muted)" }}>
            Agenda una demo gratis de 20 minutos. Sin obligaciones.
          </p>
        </div>

        {status === "ok" ? (
          <div
            className="rounded-2xl p-10 text-center"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "var(--color-success)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12l5 5L19 7"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3
              className="font-heading text-xl font-bold mb-2"
              style={{ color: "var(--color-text-base)" }}
            >
              ¡Listo! Te contactamos pronto.
            </h3>
            <p className="text-sm" style={{ color: "var(--color-text-caption)" }}>
              Revisamos tu mensaje y te respondemos en menos de 24h.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-8 flex flex-col gap-5"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            {/* Honeypot anti-bot — invisible para humanos */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
                opacity: 0,
                pointerEvents: "none",
              }}
            />
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="nombre"
                  className="text-sm font-medium"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Nombre *
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  placeholder="Tu nombre"
                  className="px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors duration-200"
                  style={{
                    background: "var(--color-canvas)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-base)",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "var(--color-primary)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "var(--color-border)")
                  }
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="whatsapp"
                  className="text-sm font-medium"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  WhatsApp *
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  required
                  placeholder="+52 55 xxxx xxxx"
                  className="px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors duration-200"
                  style={{
                    background: "var(--color-canvas)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-base)",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "var(--color-primary)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "var(--color-border)")
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium"
                style={{ color: "var(--color-text-muted)" }}
              >
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="tu@empresa.com"
                className="px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors duration-200"
                style={{
                  background: "var(--color-canvas)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-base)",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-primary)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-border)")
                }
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="sector"
                className="text-sm font-medium"
                style={{ color: "var(--color-text-muted)" }}
              >
                Sector *
              </label>
              <select
                id="sector"
                name="sector"
                required
                className="px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors duration-200 cursor-pointer"
                style={{
                  background: "var(--color-canvas)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-base)",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-primary)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-border)")
                }
              >
                <option value="" style={{ background: "#0D1526" }}>Elige tu sector</option>
                {sectores.map((s) => (
                  <option key={s} value={s} style={{ background: "#0D1526" }}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="mensaje"
                className="text-sm font-medium"
                style={{ color: "var(--color-text-muted)" }}
              >
                Mensaje (opcional)
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={3}
                placeholder="¿Hay algo específico que quieras ver en la demo?"
                className="px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors duration-200 resize-none"
                style={{
                  background: "var(--color-canvas)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-base)",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-primary)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-border)")
                }
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-bold text-white transition-all duration-200 cursor-pointer hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "var(--color-cta)",
                boxShadow: "var(--shadow-cta)",
              }}
            >
              {status === "sending" ? (
                <>Enviando...</>
              ) : (
                <>
                  <Send size={16} />
                  Agendar demo GRATIS
                </>
              )}
            </button>

            {status === "error" && (
              <p
                className="text-center text-sm"
                style={{ color: "var(--color-danger)" }}
              >
                Algo salió mal. Escríbenos a contacto@masdigitalmx.com
              </p>
            )}

            <p className="text-center text-xs" style={{ color: "var(--color-text-caption)" }}>
              +Digital MX tratará tus datos para atender tu consulta. Consulta nuestro{" "}
              <a href="/privacidad" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
                Aviso de Privacidad
              </a>
              . Al enviar, aceptas el tratamiento conforme a dicho aviso.
            </p>

            <div
              className="flex items-center justify-center gap-2 text-xs"
              style={{ color: "var(--color-text-caption)" }}
            >
              <Lock size={12} />
              Tu información está segura. No haremos spam.
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
