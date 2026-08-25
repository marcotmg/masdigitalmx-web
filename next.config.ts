import type { NextConfig } from "next";

/**
 * Cabeceras de seguridad HTTP.
 *
 * AUTORIDAD: `07-Seguridad/03-Checklists/Checklist-SecDevOps-NIST-ISO.md` §3
 * "Red y Perímetro" (vigente desde 2026-05-03) exige literalmente:
 *   - [ ] Headers de seguridad HTTP presentes (X-Frame-Options,
 *         X-Content-Type-Options, CSP)
 * Ese ítem nunca se ejecutó contra este sitio hasta el 2026-08-24.
 *
 * VALORES: OWASP HTTP Security Headers Cheat Sheet + doc oficial de Next.js
 * (nextjs.org/docs/app/api-reference/config/next-config-js/headers).
 *
 * NO se incluye `X-XSS-Protection`: OWASP recomienda explícitamente NO usarla
 * (deprecada; en navegadores viejos su filtro introducía vulnerabilidades).
 *
 * NO se toca `Strict-Transport-Security`: Netlify ya emite `max-age=31536000`.
 * Subirlo a `includeSubDomains; preload` exige antes verificar que TODOS los
 * subdominios sirvan HTTPS válido — `preload` es difícil de revertir. Pendiente
 * declarado, no omitido.
 *
 * ── FASE 2 (2026-08-24): la CSP pasa de `Report-Only` a EFECTIVA ────────────
 * Medición previa, determinista (fetch del HTML de produccion ruta por ruta,
 * no espera pasiva de reportes del navegador): los unicos origenes externos
 * que el cliente CARGA son `www.googletagmanager.com` (GA4) y
 * `challenges.cloudflare.com` (Turnstile). Los demas dominios del HTML
 * (facebook, instagram, policies.google, tools.google) son `href` de enlaces,
 * no cargas de recurso — no van en CSP. Cada ruta trae 1-2 scripts inline.
 *
 * ⚠️ LO QUE ESTA CSP SI Y NO PROTEGE — declarado, no escondido:
 *   SI  → `object-src 'none'` (inyeccion via plugin), `base-uri 'self'`
 *         (secuestro de <base>, escalada real de XSS), `form-action 'self'`
 *         (exfiltracion por formulario secuestrado), `frame-ancestors 'none'`,
 *         `default-src 'self'` y los `connect-src`/`img-src` acotados
 *         (limitan a donde se puede exfiltrar).
 *   NO  → XSS por script inline. `'unsafe-inline'` en `script-src` lo permite.
 *
 * Quitar `'unsafe-inline'` NO es un cambio de una linea: la doc oficial de
 * Next.js da dos caminos y ambos tienen costo real —
 *   (a) nonces vía proxy: *"Static optimization and ISR are disabled"*,
 *       *"Pages cannot be cached by CDNs"*, *"Higher hosting costs"*. Este
 *       sitio es 100% estatico en Netlify; adoptarlo cambia su economia.
 *   (b) `experimental.sri` (hashes): mantiene lo estatico, pero la propia doc
 *       lo marca *"experimental — may change or be removed"*.
 * Es decision de Marco con costo asociado ⇒ ticket propio, no se decide aqui.
 *
 * `'unsafe-eval'` NO se incluye: doc oficial de Next.js — *"unsafe-eval is not
 * required for production. Neither React nor Next.js use eval in production"*.
 */
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Content-Security-Policy",
    // Orígenes derivados de lo que el cliente carga DE VERDAD (verificado con
    // grep sobre app/ y components/, no supuesto):
    //   - www.googletagmanager.com  → GA4 (`app/layout.tsx`, G-2DWXR0JN2E)
    //   - challenges.cloudflare.com → Turnstile (`ContactoSection.tsx`), que
    //     además monta un iframe ⇒ necesita `frame-src`.
    // Los demás dominios del código (facebook, instagram, policies.google,
    // schema.org) son `href` de enlaces, no cargas de recurso: no van en CSP.
    //
    // `'unsafe-eval'` se OMITE a propósito: producción normalmente no lo
    // necesita. Si hiciera falta, el modo Report-Only lo delatará en consola
    // antes de que la política sea efectiva — que es exactamente su función.
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com",
      "font-src 'self' data:",
      "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://challenges.cloudflare.com",
      "frame-src https://challenges.cloudflare.com",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
