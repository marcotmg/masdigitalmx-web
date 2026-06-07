export type Sector = {
  slug: string;
  nombre: string;
  subVerticals: string;
  problema: string;
  solucion: string;
  bullets?: string[];
  metrica: string;
  color: string;
  wide: boolean;
  descripcion: string;
  beneficios: string[];
};

export const sectores: Sector[] = [
  {
    slug: "salud",
    nombre: "Salud",
    subVerticals: "Clínicas, dentistas, hospitales, veterinarias",
    problema: "40–50% no-shows en horario pico",
    solucion: "Confirmación automática la noche anterior",
    bullets: [
      "40–50% de no-shows destruyen tu agenda y tus ingresos.",
      "Citas agendadas 24/7, sin que el teléfono suene.",
      "Recordatorios automáticos: confirmación, cancelación, reprogramación.",
      "Todo gestionado por un único agente.",
    ],
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
    slug: "finanzas",
    nombre: "Finanzas",
    subVerticals: "Bancos, aseguradoras, fintech",
    problema: "Alto volumen de consultas, transacciones y tareas administrativas",
    solucion: "Agente para FAQs con escalamiento automático",
    bullets: [
      "Alto volumen de consultas, transacciones y tareas administrativas.",
      "Resolución automática con escalamiento inteligente.",
      "Revisión de errores de captura y verificación de datos.",
      "Integración de datos entre procesos y sistemas.",
      "Cumplimiento regulatorio y protección de datos, automatizados.",
    ],
    metrica: "−40% en llamadas",
    color: "#A78BFA",
    wide: true,
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
    slug: "bienes-raices",
    nombre: "Bienes Raíces",
    subVerticals: "Inmobiliarias, constructoras, arrendadoras",
    problema: "Leads perdidos por respuesta lenta",
    solucion: "Agente califica leads y agenda tours de inmediato",
    bullets: [
      "Leads perdidos por respuesta lenta.",
      "Respuesta inmediata: califica prospectos y agenda visitas al instante.",
      "Información completa de propiedades, disponible en segundos.",
      "Documentación gestionada: contratos, finanzas, trámites legales.",
      "Convierte prospectos en clientes.",
      "Cierre de ventas.",
    ],
    metrica: "+35% de conversión",
    color: "#FB923C",
    wide: true,
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
  {
    slug: "comercio",
    nombre: "Comercio",
    subVerticals: "Restaurantes, retail, ecommerce",
    problema: "Ventas perdidas fuera de horario",
    solucion: "ChatBot 24/7 para pedidos y reservas",
    bullets: [
      "Ventas perdidas fuera de horario.",
      "ChatBot 24/7 para pedidos, reservas y pagos.",
      "Catálogo, precios, horarios y políticas: todo al instante.",
      "Vende en WhatsApp o dirige tráfico a tu sitio.",
    ],
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
    slug: "servicios",
    nombre: "Servicios",
    subVerticals: "Despachos, consultorios, salones, spas",
    problema: "Citas perdidas cuando la línea está ocupada",
    solucion: "Agente atiende y registra citas 24/7, sin perder una llamada",
    bullets: [
      "Citas perdidas cuando la línea está ocupada.",
      "Agente atiende y registra citas 24/7, sin excepción.",
      "Responde preguntas frecuentes al instante.",
      "Gestiona recordatorios, pagos y documentos.",
    ],
    metrica: "−30% no-shows",
    color: "var(--color-primary-light)",
    wide: false,
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
    slug: "infraestructura",
    nombre: "Infraestructura",
    subVerticals: "Construcción, IT, supply chain",
    problema: "Hotline saturada, coordinación compleja",
    solucion: "Agente clasifica urgencias y escala al equipo correcto",
    bullets: [
      "Hotline saturada, coordinación compleja.",
      "Agente clasifica urgencias y escala al equipo correcto.",
      "Gestiona prioridades y documenta en la herramienta correcta.",
      "Tareas, proyectos, fechas de entrega. Todo en su lugar.",
    ],
    metrica: "−50% tiempo de respuesta",
    color: "var(--color-primary)",
    wide: false,
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
];

export function getSector(slug: string): Sector | undefined {
  return sectores.find((s) => s.slug === slug);
}
