import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      /* El Footer enlaza /terminos en todas las páginas, pero la ruta nunca se
         construyó — 404 en producción. El único texto existente es un DRAFT del
         vault que pide revisión legal y publica precios que contradicen SP-01,
         así que no se publica todavía.

         Temporal (307), NO permanente: cuando los Términos reales se publiquen,
         un 308 ya estaría cacheado en navegadores y buscadores y sería costoso
         de revertir. Ver WEB-SEO-TECNICO-01. */
      {
        source: "/terminos",
        destination: "/privacidad",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
