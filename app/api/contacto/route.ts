import { NextResponse } from "next/server";
import { z } from "zod";

// Migrado de FormSubmit.co a Formspree (W-FORM-CONTACTO-CAIDO-01, 2026-08-12):
// FormSubmit dejó de aceptar envíos en producción — la activación no
// persistía y no hay causa raíz confirmable en su documentación oficial.
// Formspree da cuenta real, panel de uso y notificaciones de cuota, a
// diferencia de FormSubmit. Sin default hardcodeado: sin este env var el
// endpoint no tiene a dónde enviar, así que se falla explícito en vez de
// silenciar el error contra una URL rota.
const FORMSPREE_URL = process.env.FORMSPREE_URL;

// Webhook opcional (ej. un workflow de n8n) que recibe un aviso cuando el
// envío a Formspree falla. El defecto de fondo del incidente de FormSubmit
// fue que nadie se enteró de la falla — esto la hace ruidosa. Sin este env
// var, la falla solo queda en los logs del hosting.
const ALERT_WEBHOOK_URL = process.env.CONTACTO_ALERT_WEBHOOK_URL;

async function notifyFailure(reason: string, context: Record<string, unknown>) {
  if (!ALERT_WEBHOOK_URL) return;
  try {
    await fetch(ALERT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "contacto-form", reason, ...context }),
    });
  } catch (alertErr) {
    console.error("[contacto] fallo al notificar el webhook de alerta", alertErr);
  }
}

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

  // Honeypot: bots que llenan el campo "website" reciben 200 falso, sin enviar a Formspree
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

  // Config faltante: fallar explícito y ruidoso en vez de intentar contra
  // una URL rota o vacía. Se notifica igual que un fallo de envío.
  if (!FORMSPREE_URL) {
    console.error("[contacto] FORMSPREE_URL no configurado — no se puede enviar el lead");
    await notifyFailure("missing_config", { ip });
    return NextResponse.json({ ok: false, error: "server_config" }, { status: 500 });
  }

  try {
    const res = await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        nombre,
        whatsapp,
        email,
        sector,
        mensaje,
        _subject: "Nueva solicitud de demo — +Digital MX",
        _replyto: email,
      }),
    });

    if (res.ok) {
      return NextResponse.json({ ok: true });
    }

    // No se filtra el body crudo de Formspree al cliente — solo se registra
    // en logs de servidor y se notifica al webhook de alerta si existe.
    const data = await res.json().catch(() => ({}));
    console.error("[contacto] Formspree respondió error", { status: res.status, data });
    await notifyFailure("provider_error", { status: res.status, ip });

    return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
  } catch (err) {
    console.error("[contacto] error de red al contactar Formspree", err);
    await notifyFailure("network_error", { ip });

    return NextResponse.json({ ok: false, error: "network_error" }, { status: 500 });
  }
}