export type Sector = {
  slug: string;
  nombre: string;
  subVerticals: string;
  problema: string;
  solucion: string;
  metrica: string;
  color: string;
  wide: boolean;
  descripcion: string;
  beneficios: string[];
};

export const sectores: Sector[] = [
  {
    slug: "servicios",
    nombre: "Servicios",
    subVerticals: "Salones, spas, despachos, consultorios",
    problema: "Citas perdidas cuando la línea está ocupada",
    solucion: "Agente atiende y agenda 24/7, sin perder una llamada",
    metrica: "−30% no-shows",
    color: "var(--color-primary-light)",
    wide: true,
    descripcion:
      "Para negocios de servicios, cada llamada perdida es un cliente que fue con la competencia. Nuestro agente de voz atiende, agenda y confirma citas automáticamente — sin importar la hora.",
    beneficios: [
      "Agenda de citas automatizada con Cal.com",
      "Confirmaciones y recordatorios por WhatsApp",
      "Atención 24/7 sin costo adicional de personal",
      "Reducción de no-shows con recordatorios automáticos",
      "Reportes de llamadas y métricas de conversión",
    ],
  },
  {
    slug: "salud",
    nombre: "Salud",
    subVerticals: "Clínicas, dentistas, hospitales, veterinarias",
    problema: "40–50% no-shows en horario pico",
    solucion: "Confirmación automática la noche anterior",
    metrica: "ROI en 3 semanas",
    color: "#34D399",
    wide: false,
    descripcion:
      "En el sector salud, los no-shows cuestan dinero y desorganizan el día. Nuestro agente confirma citas automáticamente, libera agenda para nuevos pacientes y reduce la carga administrativa.",
    beneficios: [
      "Confirmación automática 24h antes de cada cita",
      "Reagendado inteligente cuando el paciente cancela",
      "Notificaciones de resultados y seguimientos",
      "Integración con sistemas de agenda existentes",
      "Cumplimiento de protocolos de privacidad (LFPDPPP)",
    ],
  },
  {
    slug: "comercio",
    nombre: "Comercio",
    subVerticals: "Restaurantes, retail, ecommerce",
    problema: "Ventas perdidas fuera de horario",
    solucion: "ChatBot 24/7 para pedidos y reservas",
    metrica: "+20% conversión",
    color: "#FBBF24",
    wide: false,
    descripcion:
      "El comercio no duerme — tus clientes compran, reservan y preguntan a cualquier hora. Con +Digital tu negocio responde en segundos, toma pedidos y convierte leads sin intervención humana.",
    beneficios: [
      "Toma de pedidos y reservas automatizada vía WhatsApp",
      "Catálogo interactivo con respuestas instantáneas",
      "Seguimiento de pedidos y notificaciones de entrega",
      "Integración con plataformas de e-commerce",
      "Reportes de ventas y métricas de conversación",
    ],
  },
  {
    slug: "finanzas",
    nombre: "Finanzas",
    subVerticals: "Bancos, aseguradoras, fintech",
    problema: "Alto volumen de consultas repetitivas",
    solucion: "Agente para FAQs con escalamiento automático",
    metrica: "−40% carga en call center",
    color: "#A78BFA",
    wide: false,
    descripcion:
      "Los clientes de servicios financieros exigen respuestas rápidas y precisas. Nuestro agente responde FAQs, califica prospectos y escala casos complejos al equipo humano correcto.",
    beneficios: [
      "Resolución automática de consultas de saldo y productos",
      "Escalamiento inteligente a asesor especializado",
      "Calificación de prospectos para créditos y seguros",
      "Registro y seguimiento de reclamaciones",
      "Reportes de satisfacción y tiempo de resolución",
    ],
  },
  {
    slug: "infraestructura",
    nombre: "Infraestructura",
    subVerticals: "Construcción, IT, supply chain",
    problema: "Hotline saturada, coordinación compleja",
    solucion: "Agente clasifica urgencias y escala al equipo correcto",
    metrica: "−50% tiempo de respuesta",
    color: "var(--color-primary)",
    wide: true,
    descripcion:
      "En infraestructura, los tiempos de respuesta son críticos. Nuestro agente clasifica incidencias por prioridad, notifica al equipo correcto y hace seguimiento hasta la resolución.",
    beneficios: [
      "Clasificación automática de incidencias por prioridad",
      "Escalamiento inmediato a técnicos y supervisores",
      "Seguimiento de tickets hasta cierre",
      "Notificaciones de estado en tiempo real",
      "Reportes de tiempos de resolución y SLA",
    ],
  },
  {
    slug: "bienes-raices",
    nombre: "Bienes Raíces",
    subVerticals: "Inmobiliarias, constructoras, arrendadoras",
    problema: "Leads perdidos por respuesta lenta",
    solucion: "Agente califica leads y agenda tours de inmediato",
    metrica: "+35% captura de leads",
    color: "#FB923C",
    wide: false,
    descripcion:
      "En bienes raíces, el primer agente que responde gana. Con +Digital tu negocio responde en segundos, califica el interés del prospecto y agenda una visita antes de que llame a la competencia.",
    beneficios: [
      "Respuesta inmediata a leads 24/7",
      "Calificación automática de prospectos",
      "Agendado de tours y visitas a propiedades",
      "Seguimiento automatizado post-visita",
      "CRM integrado con historial de conversaciones",
    ],
  },
];

export function getSector(slug: string): Sector | undefined {
  return sectores.find((s) => s.slug === slug);
}
