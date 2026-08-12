import { NextResponse } from "next/server";
import { z } from "zod";

const FORMSUBMIT_URL =
  process.env.FORMSUBMIT_URL ?? "https://formsubmit.co/ajax/contacto@masdigitalmx.com";

// REGLA-OWASP-01: Zod + rate-limit obligatorios en todo endpoint público.
// Diferido a W-FORM-01 (julio): Turnstile CAPTCHA + shared secret.
// Motivo: suficiente para MVP pre P-05; Turnstile requiere dominio verificado.

const ContactoSchema = z.object({
  nombre: z.string().trim().min(2).max(80),
  // E.164 mexicano: +52 seguido de exactamente 10 dígitos nacionales.
  // El formulario captura solo los 10 dígitos y antepone el +52 (ver
  // ContactoSection). Sin el "1" de móvil: el formato vigente es +52 + 10
  // dígitos, consistente con el CTA de WhatsApp en producción.
  whatsapp: z.string().trim().regex(/^\+52\d{10}$/),
  email: z.string().trim().email().max(120),
  sector: z.enum([
    "Servicios",
    "Salud",
    "Comercio",
    "Infraestructura",
    "Finanzas",
    "Bienes Raíces",
    "Otro",
  ]),
  mensaje: z.string().trim().max(2000).optional().default(""),
  // Honeypot — campo invisible que solo bots llenan. Sin max(0) en Zod
  // porque si la validación falla aquí el bot recibiría 400 en lugar del 200 trampa.
  // El check real ocurre en el handler después de parsear.
  website: z.string().optional().default(""),
});

// Rate limit in-memory: 3 req/min por IP.
// Limitación conocida: en Vercel serverless puede haber múltiples instancias warm —
// es imperfecto por proceso. Suficiente para MVP. Migrar a Upstash Redis en W-FORM-01 (julio).
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const WINDOW_MS = 60_000;
  const MAX_REQUESTS = 3;

  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  // Resolver IP del cliente
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  // Parse JSON — cualquier body malformado o no-JSON da 400
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Validación Zod estricta
  const parsed = ContactoSchema.safeParse(rawBody);
  if (!parsed.success) {
    // No devolvemos los issues completos para evitar filtrar el schema
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const { nombre, whatsapp, email, sector, mensaje, website } = parsed.data;

  // Honeypot: bots que llenan el campo "website" reciben 200 falso, sin enviar a FormSubmit
  if (website !== "") {
    console.warn(`[contacto] honeypot triggered — ip: ${ip}`);
    return NextResponse.json({ ok: true });
  }

  // Rate limiting
  if (ip === "unknown") {
    console.warn("[contacto] IP desconocida — permitiendo pero registrando");
  }
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limit" }, { status: 429 });
  }

  // Formsubmit requiere Referer/Origin para distinguir requests legítimos
  // de archivos HTML locales. Usamos el origen del navegador si está disponible.
  const origin =
    request.headers.get("origin") ??
    request.headers.get("referer") ??
    "https://masdigitalmx.com";

  try {
    const res = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: origin,
        Origin: origin,
      },
      body: JSON.stringify({
        nombre,
        whatsapp,
        email,
        sector,
        mensaje,
        _subject: "Nueva solicitud de demo — +Digital MX",
        _captcha: "false",
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.success === "true") {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, detail: data }, { status: 502 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, detail: String(err) },
      { status: 500 }
    );
  }
}
