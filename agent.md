# masdigitalmx-web — Agent Instructions

> **Archivo de instrucciones para Claude Code y agentes de IA que trabajen en este repositorio.**
> Este archivo es la fuente de verdad operativa del proyecto. Léelo antes de cualquier cambio.
> Última actualización: 2026-06-17 · v0.1

---

## 0. Antes de hacer NADA

**Regla #1 — bloqueante:** Si el cambio solicitado modifica copy, estructura del sitio, secciones del Home, navegación, hero, o cualquier elemento de posicionamiento visible al usuario final → **DETENTE**. Verifica que existe un W-ticket aprobado que referencie el Brief de Posicionamiento. Si no existe, responde: *"No puedo ejecutar este cambio sin un W-ticket validado contra el Brief de Posicionamiento. Genera el ticket en Obsidian primero."*

**Antecedente histórico:** un rediseño enterprise completo se ejecutó en este repo sin pasar por brief (2026-06-14). Tuvo que revertirse vía `backup/before-reposicionamiento`. La causa raíz fue ejecución técnica sin validación estratégica previa. Esta regla existe para que no se repita.

---

## 1. Stack tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js | 14 (App Router) |
| Lenguaje | TypeScript | strict mode |
| Estilos | Tailwind CSS | utility-first |
| Package manager | **pnpm** | NO npm, NO yarn |
| Hosting | Vercel | producción y previews |
| Dominio prod | masdigitalmx.com + www.masdigitalmx.com | apex 308 → www |
| Dominio interno Vercel | masdigitalmx-web-three.vercel.app | NO eliminar |

**Regla de paquete:** todo install, add, remove se hace con pnpm. Si encuentras package-lock.json o yarn.lock, repórtalo — debe haber solo pnpm-lock.yaml.

**Seguridad de dependencias (ADR-005):** antes de instalar cualquier paquete nuevo, ejecutar pre-install.sh del directorio de skills de seguridad. Nunca instalar a ciegas.

---

## 2. Estructura del proyecto

Ver sección completa en vault Obsidian:
04-Proyectos/MAS-Digital/04-Operaciones/Website/agent-md-masdigitalmx-web.md

Componentes activos en page.tsx (orden CRÍTICO):
1. HeroSection
2. ProblemasSection
3. ProductosSection
4. SectoresSection
5. PricingSection
6. PaquetesSection
7. ContactoSection

Componentes huérfanos del rediseño enterprise: NO BORRAR. Reutilizables en Fases 1-2.

---

## 3. Comandos

pnpm install       # instalar dependencias
pnpm dev           # desarrollo local http://localhost:3000
pnpm build         # build de producción
pnpm lint          # lint
pnpm tsc --noEmit  # verificación de tipos

Deploy: NUNCA manual. Push a main → Vercel deploya automáticamente.
Vercel Preview: se genera por cada PR.

---

## 4. Reglas de posicionamiento — las 12 inquebrantables

Brief de Posicionamiento v1.1:
04-Proyectos/MAS-Digital/01-Estrategia/Website/Brief-Posicionamiento.md

Si una propuesta viola estas reglas: RECHAZAR antes de ejecutar.

Contenido (1-5):
1. NUNCA mencionar
