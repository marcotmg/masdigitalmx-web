// Datos atómicos compartidos entre las 3 páginas legales (/terminos, /privacidad,
// /privacidad-hygieia). Cada página conserva su propia prosa — esto solo evita que
// un mismo dato (nombre, domicilio, fecha DOF, cita de artículo) diverja entre
// documentos al corregirse en uno y no en los otros.

export const RESPONSABLE_NOMBRE = "Servicios +Digital MX";
export const RESPONSABLE_PERSONA = "Marco Martínez González";
export const RESPONSABLE_DOMICILIO = "Ciudad de México, México";
export const CORREO_PRIVACIDAD = "privacidad@masdigitalmx.com";

export const LFPDPPP_DOF_LEY = "20 de marzo de 2025";
export const LFPDPPP_DOF_REFORMA = "14 de noviembre de 2025";
export const LFPDPPP_DOF_REGLAMENTO = "21 de diciembre de 2011";

// Verificado contra el texto vigente de la LFPDPPP (PDF oficial, Cámara de
// Diputados) el 2026-08-15. Arts. 21-24 y 26 definen sustantivamente los derechos
// ARCO (acceso, rectificación, cancelación, oposición); el Art. 28 solo regula los
// requisitos de la solicitud, no el derecho en sí — no citar ahí.
export const ARCO_ARTICULOS_CITA = "artículos 21 a 24 y 26 de la LFPDPPP";

// Art. 7 regula el consentimiento en general (expreso/tácito) y su revocación.
// El Art. 8 es distinto: exige consentimiento expreso y por escrito para datos
// sensibles — no aplica a la revocación ni al consentimiento tácito.
export const CONSENTIMIENTO_ARTICULO_CITA = "artículo 7 de la LFPDPPP";
