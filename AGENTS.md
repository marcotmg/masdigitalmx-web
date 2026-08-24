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
PR (nunca push directo a `main`) → validar Netlify Deploy Preview → merge.

## Stack y comandos

| Capa | Tecnología | Notas |
|------|-----------|-------|
| Framework | Next.js 16.2.7 — App Router | TypeScript strict |
| CSS | Tailwind CSS v4 | `@theme` en `app/globals.css`, **sin** `tailwind.config.ts` |
| Package manager | **pnpm** | NUNCA npm ni yarn |
| Fuentes | Chakra Petch (400/600/700) + Barlow (400/500/600) | vía `next/font/google` — ver `app/layout.tsx` |
| Formulario | **Formspree** | `FORMSPREE_URL` como env var. Migrado desde Formsubmit.co en `W-FORM-CONTACTO-CAIDO-01` (PR #16) |
| Protección del endpoint | Turnstile + shared secret + rate-limit Upstash + Zod | `REGLA-OWASP-01` completa desde `W-FORM-01` (PR #17-19) |
| Hosting | **Netlify** | `netlify.toml` en la raíz. Migrado desde Vercel en `MIGRACION-NETLIFY-01` (cutover de DNS 2026-08-12) |
| QA | Playwright | Pendiente instalar |

### Mergear a `main` despliega automático (desde 2026-08-14)

**Cambiado el 2026-08-14** (`MIGRACION-NETLIFY-01`). El sitio de Netlify que sirve
`masdigitalmx.com` ya está conectado a este repositorio (Site settings → Build &
deploy → Link to an existing repository: rama `main`, build `pnpm build`,
publish `.next`). Verificado con `netlify api getSite`: `build_settings` trae
`repo_url`, `repo_branch: main`, `provider: github` (antes vacío). Push a `main`
→ Netlify autodespliega — verificado con el primer deploy real (`state: ready`,
contenido correcto en `masdigitalmx.com`).

**El deploy manual sigue disponible como respaldo** (forzar un deploy sin push,
o si el autodeploy falla):

```bash
export PATH="$PATH:/Users/marcomartinezgonzalez/Library/pnpm/bin"
netlify deploy --prod --build
```

> 🪤 **Histórico — trampa ya resuelta, vale recordar por qué pasaba.** Antes del
> 14-ago, el badge verde de GitHub tras un merge lo generaba `vercel[bot]`: la
> integración de Vercel seguía conectada al repo aunque Vercel ya no servía el
> dominio desde el cutover del 12-ago — reportaba un despliegue a una plataforma
> que nadie visita. **Vercel se desconectó de Git el 2026-08-14**
> (`Settings → Git → Disconnect`); el proyecto de Vercel en sí sigue sin
> borrarse — atado al Checkpoint 3 de `MIGRACION-NETLIFY-01` (Marco valida
> estabilidad de producción en el tiempo antes de darlo de baja).

**Verificar siempre en vivo tras un deploy** — `curl` contra
`https://masdigitalmx.com`, no solo confiar en el estado "Published" del
dashboard.

**Sin staging** — lo que se despliega va directo a producción. Verificar en
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
├── Header.tsx                 ← nav fija con scroll-blur, "use client"
├── Footer.tsx                 ← "use client"
├── WhatsAppButton.tsx         ← flotante, esquina inferior derecha → `/#contacto`
├── LegalDocLayout.tsx         ← maqueta de 2 columnas de las 3 páginas legales (server)
├── LegalTableOfContents.tsx   ← índice navegable con scrollspy, "use client"
└── sections/                  ← Hero · Problemas · Productos · Sectores · Pricing · Paquetes · Contacto
lib/
├── sectores.ts            ← datos de los 6 slugs de /sector/[slug]
└── legal-data.ts          ← datos atómicos compartidos entre las 3 páginas legales (WEB-INDICE-LEGAL-01)
public/mati.webp          ← mascota Mati, ya integrada (Hero y 404) — no existe carpeta assets/
design-system/           ← generado por skill ui-ux-pro-max
PRODUCT.md               ← requerido por skill Impeccable (register: brand)
pre-install.sh           ← auditoría de dependencias
```

**Orden del Home:** Header → Hero (asimétrico: headline izq + chat mockup WhatsApp der)
→ Problemas (lista editorial, 3 problemas con métricas) → Productos (4 cards)
→ Sectores (bento grid) → Pricing (Básico/Pro en MXN) → Paquetes → Contacto → Footer →
WhatsAppButton. *(Corregido 2026-08-16: "Paquetes" faltaba en esta lista pese a estar
renderizado en `page.tsx` desde PR #11.)*

**Rutas construidas:** `/` · `/privacidad` · `/privacidad-hygieia` · `/terminos` ·
`/sector/[slug]` (6 slugs desde `lib/sectores.ts`: `servicios`, `salud`,
`infraestructura`, `comercio`, `finanzas`, `bienes-raices`) · `POST /api/contacto`.
Más los archivos generados: `robots.txt`, `sitemap.xml`, `opengraph-image`, `not-found`.

**`/terminos` construida 2026-08-14** (`WEB-SEO-TECNICO-01` P0, PR #24): T&C
Corporativo v1.0 (uso del sitio, modelo por capas de `ADR-048`) — retira el redirect
307 temporal a `/privacidad` que llevaba desde el 13-ago. Fuente: vault
`Documentos-Legales/Corporativo/Terminos-Condiciones-Corporativo/`.

### Páginas legales — índice navegable (`WEB-INDICE-LEGAL-01`, 2026-08-15)

Las 3 páginas legales comparten `LegalDocLayout` (índice a la izquierda, documento a la derecha).
Para agregar o mover una sección hay que tocar **dos** lugares del mismo archivo: el `<h2 id="sN">`
y la constante `SECTIONS` de arriba. Si se desincronizan, el índice apunta a un ancla muerta.

Cosas verificadas que no son obvias y conviene no volver a descubrir:

- **Estas páginas NO montan `Header`** (se monta en `app/page.tsx` y `app/sector/[slug]/page.tsx`).
  No hay barra fija de 64px que compensar aquí — de ahí `sticky top-8` y no `top-88px`.
- **`scroll-margin-top` por `<h2>` no hace falta:** `globals.css` ya declara
  `html { scroll-padding-top: 4rem }` para todo el sitio.
- **`html` tiene `scroll-snap-type: y proximity`** con `section { scroll-snap-align: start }`.
  Las 3 páginas legales tienen cero `<section>` a propósito: un punto de anclaje dentro de un
  documento legal largo secuestraría el scroll. **No introducir `<section>` en estas páginas.**
- El scrollspy usa un listener de scroll con `requestAnimationFrame`, **no** `IntersectionObserver`:
  con varias secciones visibles a la vez las `entries` llegan desordenadas, y al tocar fondo puede
  no cruzarse ningún umbral, dejando la última sección sin activar nunca.
- Los ids se quedan en `s1…sN`, no se migran a slugs legibles: las 3 páginas son `noindex/nofollow`
  y no hay ningún enlace profundo en el sitio, así que el slug no compra nada y obligaría a editar
  texto Intocable.

**Rutas NO construidas, y qué pasa con ellas:**
- `/pricing` — enlazada en las páginas de sector; daba 404. Repuntada a `/#pricing`,
  la sección que sí existe en el Home. No hay plan de construirla standalone.

> Lección de `WEB-SEO-TECNICO-01`: ambas llevaban **meses** en 404 sin que nada lo
> detectara, y `/terminos` estaba listada aquí como "Intocable" sin haberse
> verificado nunca en vivo. Al enlazar una ruta, confirmar que responde 200.

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
- Chakra Petch para headings (angular, terminales rectos, identidad tech).

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

- **Destino de los CTAs de contacto** — desde el 2026-08-16 apuntan a `/#contacto`
  (formulario), **no a WhatsApp**. Antes: `wa.me/525652107460`, que es el número del
  **MattIAs de demos** — un bot configurado con el catálogo de un prospecto y con
  `contacto_humano` apuntando a un teléfono ajeno a +Digital MX. Retirado por
  autorización explícita de Marco. **No devolverlo a WhatsApp** hasta que exista el
  número comercial propio (`MASDIGITAL-CHATBOT-PROPIO-01`).
- **Precios en PricingSection** — fuente de verdad: SP-01 **v0.6** en el vault.
  Precios REACTIVADOS y mergeados (PR #11). Ojo al actualizarlos:
  `Auditoria-SP-01-Catalogo-2026-08-13` documenta 8 funcionalidades que SP-01
  vende y no están construidas — 7 de ellas son diferenciadores del plan Pro.
- **Textos legales** en `/privacidad` y `/terminos`
- **Design tokens** en `app/globals.css` — afectan todo el sitio
- **`PRODUCT.md`** — documento estratégico requerido por skill Impeccable
- **Copy del Hero** (headline, subheadline, CTAs) — spec exacta en "Gate de contenido" arriba. No
  modificar sin W-ticket que cite el Brief.
- **Ramas `backup/*` y tags `v1-*`** — respaldos de seguridad, no borrar.
- **Config de dominio en Netlify** — canonical `masdigitalmx.com` (apex), servido por Netlify desde
  el cutover de DNS del 2026-08-12, con certificado Let's Encrypt y HSTS activo.
  `www` ya se estandarizó a CNAME → `masdigitalmx-web.netlify.app` (verificado en vivo 2026-08-15:
  `dig CNAME www.masdigitalmx.com` resuelve como DNS estándar, ya no el URL Redirect Record
  propietario de Namecheap; `www` redirige 301 al apex, que sirve 200 vía Netlify). *(La versión
  previa de este punto decía "Config de dominio en Vercel" — quedó obsoleta con la migración.)*
- ~~Componentes "huérfanos" en `components/sections/`~~ — **ya no aplica** (verificado
  2026-08-16): los 7 archivos de esa carpeta, incluyendo `PaquetesSection.tsx`, están
  todos importados y renderizados en `page.tsx`. No hay huérfanos hoy.
- **Google Signals / vinculación a Google Ads en la propiedad GA4 de `masdigitalmx.com`**
  (Measurement ID `G-2DWXR0JN2E`, `app/layout.tsx`) — hoy desactivados a propósito. El §7 del
  Aviso de Privacidad (v3.0) declara que +Digital MX no hace perfilamiento publicitario/cross-site,
  y esa declaración es cierta SOLO mientras esas dos funciones sigan apagadas. Activar cualquiera
  de las dos sin reescribir y re-versionar §7 primero vuelve el aviso inexacto. Ver
  `Aviso-Privacidad-Corporativo-v3.0-2026-08-14.md` → frontmatter `gate_condicionado`.

## Identidad visual

Marca: **+Digital** · Legal: Servicios +Digital MX
Email: `contacto@masdigitalmx.com`
⚠️ **`+52 56 5210 7460` ya NO se publica en el sitio** (retirado 2026-08-16 de CTAs y footer):
es el número del MattIAs de demos, no un canal de la marca. Tampoco va en documentos legales.
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

- [x] Formulario operativo — migrado a **Formspree**, entrega real verificada
- [x] Endpoint de contacto cumpliendo `REGLA-OWASP-01` completa (`W-FORM-01`)
- [x] Páginas de sector (`/sector/*`) — 6 rutas SSG
- [x] Migración de hosting a Netlify, con SSL y HSTS (`MIGRACION-NETLIFY-01`)
- [x] Base de SEO técnico: `robots.txt`, `sitemap.xml`, canonical, `og:image`,
      `Organization` schema, 404 con marca, `llms.txt` (`WEB-SEO-TECNICO-01` P0+P1)
- [x] `www` → CNAME — cerrado, `MIGRACION-NETLIFY-01` sin puntos abiertos (verificado en vivo 2026-08-15)
- [x] GA4 instalado — propiedad `masdigitalmx.com` (Measurement ID `G-2DWXR0JN2E`), snippet en
      `app/layout.tsx`, §7 del Aviso de Privacidad reescrito y versionado a v3.0 (2026-08-14).
      Gate nuevo en Intocables arriba (Google Signals/Ads)
- [ ] Search Console — pendiente, no bloqueado por gate legal
- [x] Integrar mascota Mati — ya está en `HeroSection.tsx` y en el 404 (`app/not-found.tsx`,
      PR #22). Imagen en `public/mati.webp`, no en `/assets/` (esa carpeta no existe)
- [ ] Instalar Playwright para QA (con `pre-install.sh`)
- [ ] **Decisión de diseño:** retomar `draft/reposicionamiento-2026-06-sin-desplegar`
      corrigiendo su auditoría, o descartarlo — bloquea P2 de `WEB-SEO-TECNICO-01`
- [x] Retirar el número de demos de los CTAs — **hecho 2026-08-16**: los 3 puntos vivos
      (`WhatsAppButton`, `Header` ×2, `Footer`) apuntan a `/#contacto`; la línea
      "WhatsApp +52 56 5210 7460" salió del footer. Verificado: cero `wa.me` en el HTML generado
- [ ] **Restituir un CTA de WhatsApp** cuando exista el número comercial propio
      (`MASDIGITAL-CHATBOT-PROPIO-01`). Hoy el sitio no tiene canal WhatsApp
- [ ] `WhatsAppButton.tsx` conserva **icono y verde de WhatsApp** pero lleva al formulario —
      decidir si se le cambia el icono o se retira el botón flotante
- [ ] ⚠️ **Discrepancia sin resolver:** "Identidad visual" declara Facebook Page ID
      `1107626159096908`, pero `Footer.tsx:95` enlaza el perfil `61576597229117`.
      No se corrigió aquí porque no está verificado cuál es el correcto

## Estado

**Vivo** — en producción en Netlify, commits activos. *(Esta fecha se desactualizaba cada
vez que se revisaba — usar `git log --oneline -5 origin/main` para el estado real en vez
de confiar en un valor fijo aquí.)*