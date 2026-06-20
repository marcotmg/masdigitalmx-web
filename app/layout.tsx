import type { Metadata } from "next";
import { Barlow, Chakra_Petch } from "next/font/google";
import "./globals.css";

/* Brand + Headings — Chakra Petch: angular, terminales rectos, sin curvas innecesarias.
   Letterforms cuadrados/digitales, fuerte identidad tech. */
const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-brand",
  display: "swap",
});

/* Body — Barlow: legible, neutral, humanista */
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "+Digital MX | Agente de Voz + ChatBot para tu negocio",
  description:
    "Automatiza atención al cliente con IA. Contesta llamadas 24/7, agenda citas, reduce no-shows. Para Servicios, Salud, Comercio y más.",
  metadataBase: new URL("https://masdigitalmx.com"),
  openGraph: {
    title: "+Digital MX | Automatización con IA para tu negocio",
    description:
      "Agente de voz + ChatBot WhatsApp que nunca duermen. Implementación en días.",
    url: "https://masdigitalmx.com",
    siteName: "+Digital MX",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${chakraPetch.variable} ${barlow.variable}`}>
      {/* padding-top compensa la altura real del header fijo (nav + banner cuando visible).
          --header-height la actualiza Header.tsx vía ResizeObserver. */}
      <body style={{ paddingTop: "var(--header-height, 4rem)" }}>{children}</body>
    </html>
  );
}
