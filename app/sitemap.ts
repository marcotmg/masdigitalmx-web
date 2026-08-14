import type { MetadataRoute } from "next";
import { sectores } from "@/lib/sectores";

const BASE_URL = "https://masdigitalmx.com";

/* Se excluyen /privacidad y /privacidad-hygieia a propósito: ambas declaran
   `robots: { index: false }` en su metadata, y listar una página noindex en el
   sitemap es una señal contradictoria para el crawler (Google Search Central
   pide que el sitemap contenga URLs canónicas e indexables).
   /api/* queda fuera por la misma razón: no es contenido. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-13");

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...sectores.map((sector) => ({
      url: `${BASE_URL}/sector/${sector.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
