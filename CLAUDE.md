# CLAUDE.md — Proyecto: masdigitalmx-web

> Sitio web institucional de +Digital MX — Redesign V2 (Next.js).
> Para estado actual y contexto completo, leer Obsidian vía MCP obsidian-Claude.

---

## Instrucciones para Claude Code

- No agregar Co-Authored-By en commits.
- Verificar fuentes oficiales antes de proponer soluciones o hacer trial-and-error.
- Para errores: causa raíz primero, solución después.
- No modificar archivos fuera del scope del task sin confirmación explícita.
- Respuestas con explicación del "por qué", no solo el "qué".

---

## Protocolo de seguridad — OBLIGATORIO

NUNCA instalar dependencias sin verificar seguridad primero.

Antes de cualquier `pnpm add`, `pnpm install`, `npx skills add`, o instalación de repo externo:
1. Ejecutar el script de seguridad del proyecto:
   ```bash
   ./pre-install.sh <nombre-paquete-o-repo>
   ```
2. Verificar el paquete en npmjs.com (descargas, mantenedor, última actualización).
3. Correr `pnpm audit` después de instalar.
4. No instalar paquetes con menos de 1,000 descargas semanales sin aprobación explícita de Marco.
5. Para repos externos (skills, herramientas): revisar manualmente que no hagan llamadas de red ni accedan a credenciales.

Aplica también a skills instalados en `.claude/skills/` — no son "inocuos" por defecto.

---

## Qué es este proyecto

Sitio web institucional de Servicios +Digital MX — Redesign completo (V2).
URL en producción: https://masdigitalmx.com
Repositorio GitHub: masdigitalmx-web (privado) — rama principal main
Hosting: Vercel (deploy automático en push a main)
Sin staging — cambios van directo a producción. Verificar en móvil y desktop después de cada deploy.

---

## Stack técnico V2

| Capa | Tecnología | Notas |
|------|-----------|-------|
| Framework | Next.js 16.2.7 — App Router | TypeScript strict |
| CSS | Tailwind CSS v4 | `@theme` en `app/globals.css`, sin tailwind.config.ts |
| Package manager | pnpm | NUNCA usar npm ni yarn |
| Fuentes | Barlow Semi Condensed (600/700/800) + Barlow (400/500/600) | via `next/font/google` |
| Formulario | Formsubmit.co | AJAX a `contacto@masdigitalmx.com` — sin cuenta ni ID |
| Hosting | Vercel | Deploy automático desde GitHub |
| QA | Playwright | Pendiente instalar — verificar con pre-install.sh |

---

## Estructura del repositorio V2

```
masdigitalmx-web/
├── app/
│   ├── globals.css          ← tokens @theme + base styles
│   ├── layout.tsx           ← root layout + Google Fonts
│   └── page.tsx             ← home page (ensambla secciones)
├── components/
│   ├── Header.tsx           ← nav fija con scroll-blur, "use client"
│   ├── Footer.tsx           ← footer, "use client"
│   ├── WhatsAppButton.tsx   ← botón flotante esquina inferior derecha
│   └── sections/
│       ├── HeroSection.tsx       ← layout asimétrico + chat mockup
│       ├── ProblemasSection.tsx  ← lista editorial con números decorativos
│       ├── ProductosSection.tsx  ← 4 cards, sin eyebrows en mayúsculas
│       ├── SectoresSection.tsx   ← bento grid 4 columnas
│       ├── PricingSection.tsx    ← 2 planes, cards sólidas
│       └── ContactoSection.tsx   ← formulario Formspree, "use client"
├── assets/                  ← imágenes, mascota Mati (pendiente integrar)
├── design-system/           ← generado por skill ui-ux-pro-max
├── .claude/skills/          ← impeccable, ui-ux-pro-max, design-taste-frontend, huashu-design
├── CLAUDE.md                ← este archivo
├── PRODUCT.md               ← requerido por skill Impeccable (register: brand)
├── pre-install.sh           ← protocolo de seguridad — ejecutar antes de instalar
├── pnpm-workspace.yaml
├── package.json
└── tsconfig.json
```

---

## Design tokens — siempre usar variables CSS, nunca hardcodear

Definidos en `app/globals.css` bajo `@theme`:

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-primary` | `#1B6EF3` | Azul marca principal |
| `--color-primary-light` | `#60A5FA` | Azul claro — acentos, métricas |
| `--color-cta` | `#F97316` | Naranja — único elemento que compite con azul |
| `--color-cta-hover` | `#EA580C` | CTA hover |
| `--color-canvas` | `#060B18` | Fondo único — no usar múltiples niveles de fondo |
| `--color-surface` | `#0D1526` | Cards y elementos elevados |
| `--color-surface-2` | `#122040` | Cards destacadas (highlight) |
| `--color-border` | `rgba(27,110,243,0.18)` | Bordes con tinte azul |
| `--color-border-strong` | `rgba(27,110,243,0.42)` | Bordes de énfasis |
| `--color-text-base` | `#EEF2F8` | Texto principal |
| `--color-text-muted` | `#7A9BC0` | Texto secundario — azul-tintado, no gris genérico |
| `--color-text-caption` | `#4A6A94` | Texto terciario / captions |
| `--color-success` | `#10B981` | Estado positivo |
| `--color-danger` | `#EF4444` | Estado de error |

---

## Diseño — principios activos (Impeccable audit)

- **Un solo canvas** `#060B18`. Las secciones se distinguen por bordes, espaciado y layout — no por fondos diferentes.
- **Líneas azules horizontales** (`rgba(27,110,243,0.5)` con gradiente) separan secciones.
- **Cero gradientes teal→púrpura** — eliminados completamente.
- **Cero bg-clip-text** — texto sólido siempre.
- **Cero glassmorphism** — cards con `background: var(--color-surface)` sólido.
- **Cero eyebrows en MAYÚSCULAS** por sección — los nombres de producto van en `<h3>`.
- **Bento grid** en SectoresSection — 4 columnas, tarjetas "wide" en col-span-2.
- **Barlow Semi Condensed** para headings — carácter tipográfico propio, fuera de la reflex-reject list.

---

## Páginas V2

```
masdigitalmx.com/
├── /                         Home (landing principal)
├── /sector/servicios
├── /sector/salud
├── /sector/comercio
├── /sector/infraestructura
├── /sector/finanzas
├── /sector/bienes-raices
├── /pricing
├── /privacidad
└── /terminos
```

Páginas de sector y /pricing están pendientes — solo existe `/`.

---

## Secciones de Home (en orden)

1. Header — nav fija, scroll-blur, CTA WhatsApp naranja
2. HeroSection — asimétrico: headline izquierda + chat mockup WhatsApp derecha
3. ProblemasSection — lista editorial 3 problemas con números y métricas
4. ProductosSection — 4 soluciones en grid, sin eyebrows
5. SectoresSection — bento grid 6 sectores
6. PricingSection — Plan Básico / Plan Pro en MXN
7. ContactoSection — formulario Formspree (FORMSPREE_ID por configurar)
8. Footer
9. WhatsAppButton — flotante esquina inferior derecha

---

## Identidad visual +Digital

Nombre de marca: +Digital | Nombre legal: Servicios +Digital MX
Email: contacto@masdigitalmx.com
WhatsApp CTA: `https://wa.me/525652107460?text=Hola%2C+me+interesa+automatizar+mi+negocio`
WhatsApp negocio: +52 56 5210 7460 (solo para CTA, NO en documentos legales)
Facebook Page ID: 1107626159096908 | Instagram: @mas_digitalmx

---

## Convenciones de código

- TypeScript strict — no usar `any`
- Componentes funcionales con hooks
- Tailwind v4: clases utilitarias + `style={{ }}` para variables CSS dinámicas
- Responsive: mobile-first, breakpoint principal `md:` (768px)
- Commits: `tipo: descripción en español` (feat, fix, content, legal, style, docs, infra)
- No incluir Co-Authored-By en ningún commit

---

## Lo que NO modificar sin autorización explícita

- Número de WhatsApp en CTAs — número de negocio activo
- Precios en PricingSection (`$8,000 MXN setup`, `$2,500 MXN/mes`, etc.)
- Textos legales en `/privacidad` y `/terminos`
- Design tokens en `app/globals.css` — afectan todo el sitio
- `PRODUCT.md` — documento estratégico requerido por skill Impeccable

---

## Skills de diseño instalados

| Skill | Ruta | Uso |
|-------|------|-----|
| impeccable | `.claude/skills/impeccable/` | Audit, polish, bolder, typeset, etc. |
| ui-ux-pro-max | `.claude/skills/ui-ux-pro-max/` | Design system, paletas, UX rules |
| design-taste-frontend | `.claude/skills/design-taste-frontend/` | Anti-slop guidelines |
| huashu-design | `.claude/skills/huashu-design/` | Referencias de diseño adicionales |

Antes de instalar nuevos skills: ejecutar `./pre-install.sh`.

---

## Pendientes técnicos

- [x] Formulario operativo con Formsubmit.co — email confirmado, entrega verificada
- [ ] Páginas de sector (`/sector/servicios`, `/sector/salud`, etc.)
- [ ] Página `/pricing` standalone
- [ ] Integrar mascota Mati (assets disponibles en `/assets/`)
- [ ] Instalar y configurar Playwright para QA (con pre-install.sh)
- [ ] Deploy inicial a Vercel con dominio masdigitalmx.com

---

## Estado actual del proyecto — Obsidian (MCP obsidian-Claude)

FUENTE DE VERDAD: Obsidian — leer antes de cualquier tarea.
Vault: `/Users/marcomartinezgonzalez/Documents/Trabajo/Desarrollos/Herramientas/Obsidian/obsidian-Claude`

Archivos clave (rutas relativas al vault):
```
00-Claude-Context/Proyecto-Estado.md
00-Claude-Context/Sesion-Anterior.md
00-Claude-Context/HANDOFF-Website-ClaudeCode.md
00-Claude-Context/SEGMENTACION-ESTRATEGICA-MACRO-SECTORES.md
03-Proyectos/MAS-Digital/04-Operaciones/Website/WIREFRAME-COPYWRITING-COMPLETO.md
03-Proyectos/MAS-Digital/04-Operaciones/Infraestructura/CLAUDE-md-Nivel3-masdigitalmx-web.md
```
