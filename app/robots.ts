import type { MetadataRoute } from "next";

/* Política decidida por Marco (2026-08-13, WEB-IA-SEO-ARQUITECTURA-01, Opción A):
   ABIERTO — se permite tanto el indexado para citación (OAI-SearchBot,
   Claude-SearchBot, PerplexityBot) como el entrenamiento (GPTBot, ClaudeBot,
   Google-Extended, meta-externalagent, Applebot-Extended).

   Por eso no hay reglas por agente: permitir es el comportamiento por defecto de
   robots.txt, y escribir bloques `User-agent` que no bloquean nada solo agrega
   ruido que se desincroniza. La complejidad aparecería únicamente si se decidiera
   restringir.

   Nota: los fetchers iniciados por usuario (ChatGPT-User, Perplexity-User,
   meta-externalfetcher) declaran explícitamente que pueden ignorar robots.txt —
   este archivo no los controla, y no se pretende que lo haga. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://masdigitalmx.com/sitemap.xml",
  };
}
