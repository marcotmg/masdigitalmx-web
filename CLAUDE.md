# CLAUDE.md — Proyecto: masdigitalmx-web

> Sitio web institucional de +Digital MX y base de identidad digital del negocio.
Para contexto de infraestructura compartida (VPS, n8n, chatbot), ver CLAUDE.md en /Desarrollos/
> 

---

## Instrucciones para Claude Code

- **No agregar Co-Authored-By en commits.** Omitir completamente la línea `Co-Authored-By: Claude <noreply@anthropic.com>` de todos los mensajes de commit.
- Verificar fuentes oficiales antes de proponer soluciones o hacer trial-and-error.
- Para errores: análisis de causa raíz primero, luego solución.
- No modificar archivos fuera del scope del task sin confirmación explícita.

---

## Qué es este proyecto

Sitio web institucional de **Servicios +Digital MX** — empresa de automatización empresarial con IA para negocios en México. Es el activo de identidad digital principal: da credibilidad ante clientes, proveedores y Meta para Business Verification.

**URL en producción:** `https://masdigitalmx.com`**Repositorio GitHub:** privado — rama principal `main`**Hosting:** Vercel (deploy automático en push a `main`)

---

## Stack técnico

| Capa | Tecnología | Notas |
| --- | --- | --- |
| Hosting | **Vercel** | Deploy automático desde GitHub. Sin servidor propio para el sitio. |
| Repositorio | **GitHub** (privado) | Rama `main` → deploy automático a producción |
| Frontend | **HTML + CSS + JS vanilla** | Sin frameworks. `styles.css` compartido entre páginas. |
| Fuentes | Google Fonts — Inter | Pesos: 400, 500, 600, 700, 800, 900 |
| Dominio | `masdigitalmx.com` | Adquirido y activo. DNS apuntando a Vercel. |
| Correo | `contacto@masdigitalmx.com` | Canal de contacto principal del negocio |

---

## Estructura del repositorio

```
masdigitalmx-web/
├── index.html            ← Landing page principal
├── aviso-privacidad.html ← Aviso de Privacidad (v1.1)
├── styles.css            ← Estilos globales compartidos (variables CSS, nav, footer, etc.)
├── CLAUDE.md             ← Este archivo
└── assets/               ← Imágenes, íconos (si aplica)
```

---

## Variables CSS globales (definidas en styles.css)

Usar siempre estas variables — no hardcodear colores ni valores:

```css
--navy         /* Color principal oscuro */
--blue         /* Acento principal */
--blue-100     /* Azul muy claro — bordes, fondos sutiles */
--blue-600     /* Azul oscuro — énfasis en texto */
--white
--gray-50      /* Fondos de tarjetas */
--gray-100     /* Bordes sutiles */
--gray-400     /* Texto secundario débil */
--gray-600     /* Texto body */
--radius       /* Border radius estándar */
--radius-lg    /* Border radius grande */
```

---

## Convenciones de código

- **HTML semántico** — usar `<section>`, `<aside>`, `<nav>`, `<header>`, `<footer>` correctamente
- **CSS modular** — estilos específicos de página van en `<style>` dentro del `<head>` de cada HTML, nunca inline
- **JS mínimo** — solo para interacciones UI (ej. mobile nav toggle). Sin dependencias externas.
- **No usar frameworks** — ni React, ni Vue, ni Tailwind. El sitio es HTML/CSS/JS puro.
- **Responsive** — breakpoint principal en `900px`. Mobile-first no requerido pero sí compatible.

---

## Convenciones de commits

- Formato: `tipo: descripción breve en español`
- Tipos: `feat`, `fix`, `content`, `legal`, `style`, `docs`
- Ejemplos:
    - `content: agregar post 3 en sección blog`
    - `legal: actualizar domicilio en aviso de privacidad v1.2`
    - `fix: corregir link roto en footer`
- **No incluir `Co-Authored-By`** en ningún commit.

---

## Páginas existentes

### index.html — Landing page

Secciones en orden:

1. **Nav** — logo `+Digital`, links a `#servicios`, `#para-quien`, `#como-funciona`, `#contacto`, CTA WhatsApp
2. **Hero** — propuesta de valor principal
3. **#servicios** — servicios ofrecidos
4. **#para-quien** — segmento objetivo
5. **#como-funciona** — proceso paso a paso
6. **#contacto** — formulario o CTA de contacto
7. **Footer** — logo, nav secundario, copyright, link a aviso de privacidad

**CTA principal de negocio (NO modificar sin autorización):**

```html
<a href="https://wa.me/525652107460?text=Hola%2C+me+interesa+automatizar+mi+negocio"
   target="_blank" rel="noopener" class="btn btn-primary nav-cta">
  Habla con nosotros
</a>
```

### aviso-privacidad.html — Aviso de Privacidad

**Versión actual:** v1.1 — Última actualización: 23 de abril de 2026

Secciones (7 en total):

1. Identidad y domicilio del responsable ⚠️ Ver nota abajo
2. Datos personales que recabamos
3. Finalidades del tratamiento
4. Derechos ARCO y revocación del consentimiento
5. Uso de cookies y tecnologías de seguimiento
6. Cambios al aviso de privacidad
7. Contacto

**⚠️ Pendientes documentados:**

- **Domicilio (Sección 1):** Actualmente contiene dirección provisional. Pendiente actualizar con domicilio virtual comercial contratado (≤$600 MXN/mes). NO cambiar sin instrucción explícita del propietario.
- **Correo ARCO (Secciones 3, 4 y 7):** Actualmente usa `contacto@masdigitalmx.com`. Pendiente crear y reemplazar con `privacidad@masdigitalmx.com` o equivalente dedicado.

**Restricciones del aviso — NO agregar:**

- Números telefónicos (solo correo electrónico como canal de contacto)
- Información técnica del stack (proveedores, modelos de IA, infraestructura)
- Tabla de transferencias a terceros con detalle de proveedores

**Ley aplicable:** LFPDPPP (DOF 05-07-2010, reforma DOF 14-11-2025) y su Reglamento (DOF 21-12-2011).

---

## Identidad visual +Digital

| Elemento | Valor |
| --- | --- |
| Nombre de marca | `+Digital` |
| Nombre legal | Servicios +Digital MX |
| Tagline | Automatización empresarial con IA para negocios en México |
| Correo de contacto | contacto@masdigitalmx.com |
| WhatsApp de negocio | +52 56 5210 7460 (solo para CTA de negocio, no en documentos legales) |
| Facebook Page | "Servicios +Digital MX" — Page ID: 1107626159096908 |
| Instagram | @mas_digitalmx |

---

## Deploy y flujo de trabajo

```
Edición local → git commit → git push origin main → Vercel build automático → masdigitalmx.com
```

- **Vercel** detecta el push y hace deploy automáticamente en ~30 segundos.
- No hay staging environment en esta etapa — los cambios van directo a producción.
- Verificar siempre en móvil y desktop después de un deploy.

---

## Contexto del negocio — +Digital MX

+Digital es el primer producto/marca de un emprendimiento en fase MVP. Vende automatización empresarial con IA (chatbot WhatsApp) a negocios mexicanos pequeños y medianos.

**Precio objetivo del servicio:** $1,500–$5,000 MXN/mes por cliente

**Primer producto:** Chatbot de atención al cliente vía WhatsApp (catálogo, pedidos, garantías)

**Stack del producto (infraestructura separada, VPS Hetzner):** n8n + EvolutionAPI + Groq (llama-3.3-70b)

**Estado de identidad digital:**

| Activo | Estado |
| --- | --- |
| Dominio masdigitalmx.com | ✅ Activo |
| Sitio web | ✅ Publicado en Vercel |
| Facebook Page | ✅ Activa |
| Instagram @mas_digitalmx | ✅ Activa |
| Meta Business Verification | 🔴 Bloqueada — portfolio huérfano "Compras Chidas BM1" |

---

## Cuentas baneadas en Meta — nunca usar

- `marcotmg@yahoo.com`
- `masdigitalmx75@gmail.com`

---

## Referencias en Obsidian (vault: obsidian-main)

- `00-Claude-Context/Proyecto-Estado.md` ← fuente de verdad del estado general
- `00-Claude-Context/Sesion-Anterior.md` ← resumen de última sesión
- `06-Knowledge-Base/Legal-Compliance/LFPDPPP/00-Indice.md` ← marco legal del aviso de privacidad
- `01-Infraestructura/Decisiones-Arch.md` ← ADRs de infraestructura
- `02-Chatbot/Memoria-Conversacional-Produccion.md` ← arquitectura del chatbot

---

## Lo que NO modificar sin análisis previo

- CTA de WhatsApp en el nav (`nav-cta`) — número de negocio activo
- Variables CSS globales en `styles.css` — afectan todas las páginas
- Secciones del aviso de privacidad con pendientes documentados — ver notas arriba
- Link al aviso de privacidad en el footer — requerimiento legal