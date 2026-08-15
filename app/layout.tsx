import type { Metadata } from "next";
import { Barlow, Chakra_Petch } from "next/font/google";
import Script from "next/script";
import "./globals.css";

/* Measurement ID de la propiedad GA4 "masdigitalmx.com" (cuenta marcotmg@gmail.com,
   creada 2026-08-14). Google Signals y vinculación a Google Ads permanecen
   desactivados a propósito — condición que sostiene la redacción de §7 del
   Aviso de Privacidad (v3.0). Antes de activar cualquiera de las dos, ver el
   gate en AGENTS.md → Intocables. */
const GA_MEASUREMENT_ID = "G-2DWXR0JN2E";

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
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "+Digital MX | Automatización con IA para tu negocio",
    description:
      "Agente de voz + ChatBot WhatsApp que nunca duermen. Implementación en días.",
    url: "/",
    siteName: "+Digital MX",
    locale: "es_MX",
    type: "website",
  },
};

/* Datos estructurados de la entidad. Organization, NO LocalBusiness: +Digital MX
   no tiene ubicación física que el cliente visite, y LocalBusiness es para
   negocios que sí la tienen. Reevaluar solo si algún día se abre oficina.

   `sameAs` lista únicamente los perfiles que existen de verdad — los mismos que
   enlaza components/Footer.tsx. No se inventan redes que no se operan. */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "+Digital MX",
  legalName: "Servicios +Digital MX",
  url: "https://masdigitalmx.com",
  logo: "https://masdigitalmx.com/opengraph-image",
  description:
    "Diseño e implementación de automatización con inteligencia artificial para negocios en México: agentes de voz, chatbots de WhatsApp y automatización de procesos.",
  email: "contacto@masdigitalmx.com",
  areaServed: {
    "@type": "Country",
    name: "México",
  },
  sameAs: [
    "https://www.facebook.com/people/MAS-Digital-MX/61576597229117/",
    "https://www.instagram.com/mas_digitalmx/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${chakraPetch.variable} ${barlow.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
