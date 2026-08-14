import { ImageResponse } from "next/og";

/* og:image es 1 de las 4 propiedades REQUERIDAS por el protocolo Open Graph
   (ogp.me), y el sitio no tenía ninguna.

   Se genera con ImageResponse en vez de subir un PNG: no agrega dependencias,
   no mete un binario al repo, y los colores quedan atados a los mismos valores
   de los design tokens de app/globals.css. Si la marca cambia de paleta, esto se
   actualiza como código, no como archivo huérfano en /public. */

export const alt = "+Digital MX — Automatización con IA para tu negocio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Valores literales de los tokens de app/globals.css (@theme de Tailwind v4).
// No se pueden leer variables CSS aquí: esto renderiza fuera del navegador.
const CANVAS = "#060B18";
const PRIMARY = "#1B6EF3";
const PRIMARY_LIGHT = "#60A5FA";
const CTA = "#F97316";
const TEXT_BASE = "#EEF2F8";
const TEXT_MUTED = "#7A9BC0";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: CANVAS,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: TEXT_BASE,
              letterSpacing: "-0.02em",
            }}
          >
            +Digital
          </span>
          <span style={{ fontSize: 44, fontWeight: 700, color: PRIMARY_LIGHT }}>
            MX
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: TEXT_BASE,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Tu negocio atiende.
          </span>
          <span
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: PRIMARY_LIGHT,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Siempre.
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: 4,
              background: PRIMARY,
              marginBottom: 28,
            }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 30, color: TEXT_MUTED }}>
              Agente de voz + ChatBot WhatsApp con IA
            </span>
            <span style={{ fontSize: 30, color: CTA, marginLeft: 16 }}>
              masdigitalmx.com
            </span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
