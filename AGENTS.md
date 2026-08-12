# masdigitalmx-web — AGENTS.md

> **Gobernanza:** este repositorio hereda el núcleo (N1–N19) vía
> `Desarrollos/AGENTS.md` (leído por Claude Code vía el puntero
> `Desarrollos/CLAUDE.md`→`@AGENTS.md`). No se duplican reglas aquí. Si algo
> de este repo requiere apartarse del núcleo, es una excepción y se documenta
> en su Especificación de Proyecto (capa 2), no en este archivo.
> Molde: `01-Proyectos/Plantilla-Repositorio-CLAUDE.md`.

## Qué es

Sitio web institucional de Servicios +Digital MX (Redesign V2, Next.js).
Producción: **https://masdigitalmx.com** — live, deploy automático desde `main`.

## Gate de contenido — Brief de Posicionamiento (bloqueante)

**Antes de modificar copy, Hero, orden de secciones del Home, navegación o cualquier elemento de
posicionamiento visible al usuario final: DETENTE.** Verifica que existe un W-ticket que referencie
`Brief-Posicionamiento.md` (vault, `04-Proyectos/MAS-Digital/01-Estrategia/Website/`). Si no existe,
pide que se genere antes de ejecutar el cambio.

**Antecedente:** un rediseño completo se ejecutó sin pasar por el Brief (2026-06-14) y tuvo que
revertirse — rama `backup/before-reposicionamiento`, tag `v1-chatbot-posicionamiento` (**no borrar
ninguno de los dos**).

**Origen de esta sección:** fusionada 2026-07-30 desde `agent.md` (v0.1), archivo del repo que
contenía esta misma regla pero que quedó huérfano — nunca conectado al `CLAUDE.md`→`AGENTS.md` real
tras la migración de `AIA-PROGRAMA-01` Frente 1. Ver `VAULT-CLAUDEMD-LEGACY-01` en `Pendientes.md`.
`agent.md` fue eliminado del repo al fusionar — esta sección es ahora la única fuente.

### Las 12 reglas del Brief (v1.1)

**Contenido:**
1. Nunca mencionar "PyME" como descriptor de audiencia en copy principal.
2. Nunca centrar la comunicación en herramientas específicas (OpenAI, n8n, Retell, WhatsApp, Cal.com,
   Supabase) en el primer nivel — hablar de capacidades, herramientas solo en páginas técnicas/FAQ.
3. Nunca poner al fundador (Marco Martínez) como protagonista — la marca es +Digital MX.
4. Siempre hablar de resultados de negocio antes que de funcionalidades técnicas.
5. IA es una capacidad, no el producto — el producto es la transformación del negocio del cliente.

**Arquitectura:**
6. Un solo sitio — no subdominios por audiencia.
7. Home neutral — las rutas `/sector/[slug]` calibran tono por audiencia.
8. Sectores en Home es un selector, no un destino.
9. Precios aparecen después de construir valor — no en el segundo scroll.

**Tono:**
10. Formal sin ser corporativo, cercano sin ser informal.
11. Oraciones cortas — un punto de tensión por párrafo.
12. El cliente es inteligente — no explicar lo obvio.

### Hero — especificación inmutable

| Elemento | Valor exacto |
|---|---|
| Headline | "Tu negocio atiende. Siempre." (punto final intencional, NO usar `!`) |
| Subheadline | "Diseñamos e implementamos soluciones de automatización inteligente que reducen costos operativos, mejoran la experiencia de tus clientes y liberan tiempo para lo que importa." |
| CTA primario | "Agenda diagnóstico gratuito" → `#contacto` |
| CTA secundario | "Ver soluciones por sector" → `/#sectores` |

Trust signals bajo el hero (sin nombre del fundador): "+25 años de experiencia en sectores exigentes" ·
"Implementación en días, no meses" · "Sin contratos de largo plazo" · "Soporte 24/7"

### Lenguaje — capacidades vs herramientas

| ✅ Decir (capacidad) | ❌ NO decir (herramienta) |
|---|---|
| "Inteligencia artificial aplicada" | "Usamos ChatGPT / OpenAI" |
| "Automatización de procesos de negocio" | "Corremos en n8n" |
| "Experiencias conversacionales inteligentes" | "Tenemos chatbot de WhatsApp" |
| "Integración empresarial y APIs" | "Conectamos sistemas" |
| "Arquitecturas cloud nativas y escalables" | "Estamos en la nube" |

### Workflow de cambios de copy/estructura

Discusión con Marco → decisión documentada en vault → W-ticket referenciando el Brief → ejecución →
PR (nunca push directo a `main`) → validar Vercel Preview → merge.

## Stack y comandos

| Capa | Tecnología | Notas |
|------|-----------|-------|
| Framework | Next.js 16.2.7 — App Router | TypeScript strict |
| CSS | Tailwind CSS v4 | `@theme` en `app/globals.css`, **sin** `tailwind.config.ts` |
| Package manager | **pnpm** | NUNCA npm ni yarn |
| Fuentes | Barlow Semi Condensed (600/700/800) + Barlow (400/500/600) | vía `next/font/google` |
| Formulario | **Formsubmit.co** | AJAX a `contacto@masdigitalmx.com` — sin cuenta ni ID |
| Hosting | Vercel | Deploy automático en push a `main` |
| QA | Playwright | Pendiente instalar |

**Sin staging** — lo que entra a `main` va directo a producción. Verificar en
móvil y desktop después de cada deploy.

**Auditoría pre-instalación (N14):** correr `./pre-install.sh <paquete>` antes de
cualquier `pnpm add` / `npx skills add`. Umbral propio de este repo: **no
instalar paquetes con <1,000 descargas semanales** sin aprobación de Marco.
Aplica también a skills en `.claude/skills/` — no son inocuos por defecto.

## Arquitectura

```
app/
├── globals.css          ← tokens @theme + base styles
├── layout.tsx           ← root layout + Google Fonts
└── page.tsx             ← home (ensambla secciones)
components/
├── Header.tsx           ← nav fija con scroll-blur, "use client"
├── Footer.tsx           ← "use client"
├── WhatsAppButton.tsx   ← flotante, esquina inferior derecha
└── sections/            ← Hero · Problemas · Productos · Sectores · Pricing · Contacto
assets/                  ← imágenes, mascota Mati (pendiente integrar)
design-system/           ← generado por skill ui-ux-pro-max
PRODUCT.md               ← requerido por skill Impeccable (register: brand)
pre-install.sh           ← auditoría de dependencias
```

**Orden del Home:** Header → Hero (asimétrico: headline izq + chat mockup WhatsApp der)
→ Problemas (lista editorial, 3 problemas con métricas) → Productos (4 cards)
→ Sectores (bento grid) → Pricing (Básico/Pro en MXN) → Contacto → Footer → WhatsAppButton.

**Rutas:** solo existe `/`. Pendientes: `/sector/{servicios,salud,comercio,infraestructura,finanzas,bienes-raices}`,
`/pricing`, `/privacidad`, `/terminos`.

### Design tokens — usar variables CSS, nunca hardcodear

Definidos en `app/globals.css` bajo `@theme`:

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-primary` | `#1B6EF3` | Azul marca principal |
| `--color-primary-light` | `#60A5FA` | Acentos, métricas |
| `--color-cta` | `#F97316` | Naranja — único elemento que compite con azul |
| `--color-cta-hover` | `#EA580C` | CTA hover |
| `--color-canvas` | `#060B18` | Fondo único |
| `--color-surface` | `#0D1526` | Cards y elementos elevados |
| `--color-surface-2` | `#122040` | Cards destacadas |
| `--color-border` | `rgba(27,110,243,0.18)` | Bordes con tinte azul |
| `--color-border-strong` | `rgba(27,110,243,0.42)` | Bordes de énfasis |
| `--color-text-base` | `#EEF2F8` | Texto principal |
| `--color-text-muted` | `#7A9BC0` | Secundario — azul-tintado, no gris genérico |
| `--color-text-caption` | `#4A6A94` | Terciario / captions |
| `--color-success` | `#10B981` | Estado positivo |
| `--color-danger` | `#EF4444` | Estado de error |

### Decisiones de diseño activas (auditoría Impeccable)

- **Un solo canvas** `#060B18`. Las secciones se distinguen por bordes, espaciado
  y layout — nunca por fondos diferentes.
- Líneas azules horizontales (`rgba(27,110,243,0.5)` con gradiente) separan secciones.
- **Cero** gradientes teal→púrpura · **cero** `bg-clip-text` · **cero** glassmorphism
  (cards con `background: var(--color-surface)` sólido).
- **Cero eyebrows en MAYÚSCULAS** por sección — los nombres de producto van en `<h3>`.
- Barlow Semi Condensed para headings (fuera de la reflex-reject list).

### Convenciones de código

- TypeScript strict — no usar `any`
- Componentes funcionales con hooks
- Tailwind v4: utilidades + `style={{ }}` solo para variables CSS dinámicas
- Mobile-first, breakpoint principal `md:` (768px)
- Commits: `tipo: descripción en español` (feat, fix, content, legal, style, docs, infra)

## Gotchas verificados

- **`main` tiene branch protection** → NUNCA `git push origin main` directo; va por
  PR. (REGLA-GIT-01, verificado 2026-06-27)
- Existe la rama `draft/reposicionamiento-2026-06-sin-desplegar` (commit `a9674f0`,
  local, **no pusheada**): un rediseño completo de 2026-06-14 que nunca se integró,
  con auditoría propia 23/40 sin corregir. **Decisión de retomarlo o descartarlo
  pendiente** — no mezclarlo con `main` sin resolver eso. (verificado 2026-07-17)
- Las 4 skills de diseño (`impeccable`, `ui-ux-pro-max`, `design-taste-frontend`,
  `huashu-design`) están en `.gitignore` a propósito (commit `55ba9bd`): son tooling
  local, no contenido del proyecto. No commitearlas. (verificado 2026-07-17)
- Tailwind v4 **no usa `tailwind.config.ts`** — buscar configuración ahí es un
  callejón sin salida; todo vive en `@theme` dentro de `app/globals.css`.

## Intocables

Sin autorización explícita de Marco:

- **Número de WhatsApp en CTAs** — número de negocio activo
  (`https://wa.me/525652107460?text=Hola%2C+me+interesa+automatizar+mi+negocio`)
- **Precios en PricingSection** — fuente de verdad: SP-01 v0.5 en el vault.
  Precios REACTIVADOS y mergeados (PR #11)
- **Textos legales** en `/privacidad` y `/terminos`
- **Design tokens** en `app/globals.css` — afectan todo el sitio
- **`PRODUCT.md`** — documento estratégico requerido por skill Impeccable
- **Copy del Hero** (headline, subheadline, CTAs) — spec exacta en "Gate de contenido" arriba. No
  modificar sin W-ticket que cite el Brief.
- **Ramas `backup/*` y tags `v1-*`** — respaldos de seguridad, no borrar.
- **Config de dominio en Vercel** — canonical `masdigitalmx.com` (apex); `www` NO se re-agrega a
  Vercel (redirect vive en Namecheap, decisión estable desde 2026-06-22).
- **Componentes "huérfanos" en `components/sections/`** (del rediseño enterprise revertido) — no
  borrar, reutilizables en fases futuras. No incluirlos en `page.tsx` sin W-ticket.

## Identidad visual

Marca: **+Digital** · Legal: Servicios +Digital MX
Email: `contacto@masdigitalmx.com` · WhatsApp negocio: +52 56 5210 7460
(solo para CTA, **NO** en documentos legales)
Facebook Page ID: `1107626159096908` · Instagram: `@mas_digitalmx`

## Rutas al vault

Base: `/Users/marcomartinezgonzalez/Documents/Trabajo/Desarrollos/Herramientas/Obsidian/obsidian-Claude/`

| Documento | Ruta relativa al vault |
|---|---|
| Estado del proyecto | `00-Claude-Context/01-Proyectos/00-MAS-DigitalMX/00-Session/Proyecto-Estado.md` |
| Sesión anterior | `00-Claude-Context/01-Proyectos/00-MAS-DigitalMX/00-Session/Sesion-Anterior.md` |
| Handoff del sitio | `00-Claude-Context/01-Proyectos/00-MAS-DigitalMX/04-Handoffs/HANDOFF-Website-ClaudeCode.md` |
| Segmentación de sectores | `00-Claude-Context/01-Proyectos/00-MAS-DigitalMX/02-Estrategia/SEGMENTACION-ESTRATEGICA-MACRO-SECTORES.md` |
| Wireframe y copy | `04-Proyectos/MAS-Digital/01-Estrategia/Website/WIREFRAME-COPYWRITING-COMPLETO.md` |
| Brief de Posicionamiento | `04-Proyectos/MAS-Digital/01-Estrategia/Website/Brief-Posicionamiento.md` (fuente de las 12 reglas — ver "Gate de contenido" arriba) |

*(Las 6 rutas fueron corregidas el 2026-07-18: las anteriores eran pre-SEP-05 y
ninguna resolvía. Fila "Contexto nivel 3" retirada 2026-07-30 — el doc que apuntaba quedó
archivado, `VAULT-CLAUDEMD-LEGACY-01` resuelto.)*

## Pendientes técnicos

- [x] Formulario operativo con Formsubmit.co — entrega verificada
- [ ] Páginas de sector (`/sector/*`)
- [ ] Página `/pricing` standalone
- [ ] Integrar mascota Mati (assets en `/assets/`)
- [ ] Instalar Playwright para QA (con `pre-install.sh`)
- [ ] **Decisión de diseño:** retomar `draft/reposicionamiento-2026-06-sin-desplegar`
      corrigiendo su auditoría, o descartarlo

## Estado

**Vivo** — en producción, commits activos (último 2026-07-17).