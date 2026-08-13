import { NextResponse } from "next/server";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

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

// W-FORM-01: verificación server-side de Cloudflare Turnstile. Preparado
// para activarse solo configurando esta env var en Netlify (B3) — sin ella,
// la verificación se OMITE explícitamente (no se corta la petición). Es una
// desviación deliberada del patrón "fallar cerrado" de FORMSPREE_URL: `main`
// hoy sigue siendo producción real (masdigitalmx.com vía Vercel, deploy
// automático), y el objetivo de W-FORM-01 es dejar el código listo sin
// romper el formulario en vivo antes de que Marco tenga el site key real.
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: ip !== "unknown" ? ip : undefined,
      }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[contacto] error de red al verificar Turnstile", err);
    return false;
  }
}

// W-FORM-01: shared secret anti-bot. Sin CONTACTO_SHARED_SECRET configurado
// el chequeo se OMITE explícitamente (no corta la petición) — mismo criterio
// que Turnstile arriba: `main` sigue siendo producción real vía Vercel
// (deploy automático), y un fail-cerrado tumbaría el formulario en vivo
// antes de que Marco configure la env var real en Netlify (B3). Limitación
// conocida y aceptada: el valor también viaja como
// NEXT_PUBLIC_CONTACTO_SHARED_SECRET para que el cliente lo pueda enviar, lo
// que lo hace extraíble del bundle — filtra bots genéricos que golpean el
// endpoint sin pasar por el sitio, no a un atacante dirigido (para eso está
// Turnstile).
const CONTACTO_SHARED_SECRET = process.env.CONTACTO_SHARED_SECRET;

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

// REGLA-OWASP-01: Zod + rate-limit + Turnstile + shared secret en todo
// endpoint público. Los 3 controles (rate-limit Upstash, Turnstile, shared
// secret) están implementados pero inactivos hasta que Marco configure las
// env vars reales en Netlify (B3) — ver comentarios junto a cada constante
// arriba.

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
  // Token de Cloudflare Turnstile (hidden input `cf-turnstile-response` que
  // el widget genera solo). Opcional en el schema porque, sin
  // NEXT_PUBLIC_TURNSTILE_SITE_KEY configurado, el cliente ni siquiera
  // renderiza el widget — ver ContactoSection.tsx.
  turnstileToken: z.string().optional().default(""),
});

// Rate limit: Upstash Redis, 3 req/min por IP (W-FORM-01, 2026-08-13).
// Sustituye el rate-limit in-memory anterior — imperfecto en serverless por
// no compartir estado entre instancias warm. Sin las 2 env vars de Upstash
// configuradas, el chequeo se OMITE explícitamente (mismo criterio que
// Turnstile/shared secret arriba): `main` es producción real, y un
// fail-cerrado tumbaría el formulario antes de que Marco cree la base de
// datos en Upstash y cargue las credenciales reales en Netlify.
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const ratelimit =
  UPSTASH_REDIS_REST_URL && UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: new Redis({ url: UPSTASH_REDIS_REST_URL, token: UPSTASH_REDIS_REST_TOKEN }),
        limiter: Ratelimit.slidingWindow(3, "1 m"),
        prefix: "contacto",
      })
    : null;

async function checkRateLimit(ip: string): Promise<boolean> {
  if (!ratelimit) {
    console.warn(
      "[contacto] UPSTASH_REDIS_REST_URL/TOKEN no configurados — rate-limit omitido (W-FORM-01, pendiente B3)"
    );
    return true;
  }
  const { success } = await ratelimit.limit(ip);
  return success;
}

export async function POST(request: Request) {
  // Resolver IP del cliente
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  // Shared secret — antes que nada, incluso antes de parsear el body.
  // Sin CONTACTO_SHARED_SECRET configurado el chequeo se omite (ver
  // comentario junto a la constante, arriba).
  if (CONTACTO_SHARED_SECRET) {
    const provided = request.headers.get("x-contacto-key");
    if (provided !== CONTACTO_SHARED_SECRET) {
      console.warn("[contacto] shared secret ausente o inválido", { ip });
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 403 });
    }
  } else {
    console.warn(
      "[contacto] CONTACTO_SHARED_SECRET no configurado — verificación omitida (W-FORM-01, pendiente B3)"
    );
  }

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

  const { nombre, whatsapp, email, sector, mensaje, website, turnstileToken } = parsed.data;

  // Honeypot: bots que llenan el campo "website" reciben 200 falso, sin enviar a Formspree
  if (website !== "") {
    console.warn(`[contacto] honeypot triggered — ip: ${ip}`);
    return NextResponse.json({ ok: true });
  }

  // Rate limiting
  if (ip === "unknown") {
    console.warn("[contacto] IP desconocida — permitiendo pero registrando");
  }
  if (!(await checkRateLimit(ip))) {
    return NextResponse.json({ ok: false, error: "rate_limit" }, { status: 429 });
  }

  // Turnstile — sin TURNSTILE_SECRET_KEY configurado el chequeo se omite
  // (ver comentario junto a la constante, arriba).
  if (TURNSTILE_SECRET_KEY) {
    const turnstileOk = await verifyTurnstile(turnstileToken, ip);
    if (!turnstileOk) {
      console.warn("[contacto] Turnstile no verificado", { ip });
      return NextResponse.json({ ok: false, error: "captcha" }, { status: 400 });
    }
  } else {
    console.warn(
      "[contacto] TURNSTILE_SECRET_KEY no configurado — verificación omitida (W-FORM-01, pendiente B3)"
    );
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