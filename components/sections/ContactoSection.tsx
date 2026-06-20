"use client";

// W-EXPRESS-01: Formulario ocultado temporalmente — mitigación LFPDPPP
// Restaurar cuando el Aviso de Privacidad Corporativo esté publicado en masdigitalmx.com/privacidad
//
// import { useState } from "react";
// import { Send, Lock } from "lucide-react";
import { Mail, MessageCircle } from "lucide-react";

// const API_URL = "/api/contacto";

// const sectores = [
//   "Servicios",
//   "Salud",
//   "Comercio",
//   "Infraestructura",
//   "Finanzas",
//   "Bienes Raíces",
//   "Otro",
// ];

const WA_URL =
  "https://wa.me/525652107460?text=Hola%2C+me+interesa+automatizar+mi+negocio";

export default function ContactoSection() {
  // W-EXPRESS-01: Estado y handler del formulario comentados temporalmente
  // const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   setStatus("sending");
  //   const form = e.currentTarget;
  //   const data = new FormData(form);

  //   try {
  //     const res = await fetch(API_URL, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         nombre: data.get("nombre"),
  //         whatsapp: data.get("whatsapp"),
  //         email: data.get("email"),
  //         sector: data.get("sector"),
  //         mensaje: data.get("mensaje") || "",
  //       }),
  //     });
  //     const json = await res.json().catch(() => ({}));
  //     if (res.ok && json.ok) {
  //       setStatus("ok");
  //       form.reset();
  //     } else {
  //       setStatus("error");
  //     }
  //   } catch {
  //     setStatus("error");
  //   }
  // }

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

        {/* W-EXPRESS-01: Formulario ocultado temporalmente — ver comentarios arriba */}
        {/* {status === "ok" ? (
          <div className="rounded-2xl p-10 text-center" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
            ...estado de éxito...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl p-8 flex flex-col gap-5" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-card)" }}>
            ...inputs nombre, whatsapp, email, sector, mensaje...
            ...botón submit...
            ...lock disclaimer...
          </form>
        )} */}

        {/* Contacto directo temporal — restaurar formulario cuando AP esté publicado */}
        <div
          className="rounded-2xl p-10 flex flex-col items-center gap-6 text-center"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            Estamos actualizando nuestra política de privacidad. Mientras tanto,
            escríbenos directamente:
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            {/* Botón primario — email */}
            <a
              href="mailto:contacto@masdigitalmx.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{
                background: "var(--color-primary)",
                boxShadow: "0 0 24px rgba(27,110,243,0.25)",
              }}
            >
              <Mail size={15} />
              Escribir a contacto@masdigitalmx.com
            </a>

            {/* Botón secundario — WhatsApp */}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "#25D366" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1DA851")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#25D366")}
            >
              <MessageCircle size={15} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
