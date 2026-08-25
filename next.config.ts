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
 * CSP va en `Report-Only` a propósito (fase 1): una CSP estricta rompe scripts
 * y estilos inline de Next. Se mide qué rompe en DevTools ANTES de hacerla
 * efectiva. Convertirla a `Content-Security-Policy` es la fase 2.
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
    key: "Content-Security-Policy-Report-Only",
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
      "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com https://challenges.cloudflare.com",
      "frame-src https://challenges.cloudflare.com",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
