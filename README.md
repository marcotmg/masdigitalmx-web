# masdigitalmx-web

Sitio institucional de **+Digital MX** — automatización con IA para negocios mexicanos:
chatbots de WhatsApp, agentes de voz y workflows.

🌐 **[masdigitalmx.com](https://masdigitalmx.com)**

## Stack

| | |
|---|---|
| Framework | Next.js (App Router, React 19, TypeScript) |
| Estilos | Tailwind CSS v4 |
| Validación | Zod |
| Rate limiting | Upstash Redis |
| Iconos | lucide-react |
| Hosting | Netlify — deploy automático desde `main` |

## Desarrollo local

Requiere **pnpm** (npm no se usa en este proyecto) y Node 24.

```bash
pnpm install
pnpm dev      # servidor de desarrollo
pnpm build    # build de producción
pnpm start    # servir el build
```

## Estructura

```
app/
  page.tsx              Home
  sector/[slug]/        Páginas por sector
  privacidad/           Aviso de privacidad corporativo
  privacidad-hygieia/   Aviso de privacidad del producto HygieIA
  terminos/             Términos y condiciones
  api/contacto/         Endpoint del formulario de contacto
lib/
  legal-data.ts         Fuente única de los datos legales de las 3 páginas
```

Los datos legales (razón social, domicilio, contacto ARCO) viven en **un solo lugar**,
`lib/legal-data.ts`, y las tres páginas legales los consumen de ahí. Cualquier cambio
se hace ahí, no en las páginas.

## Contribuir

Flujo obligatorio: rama → PR → validar el Deploy Preview de Netlify → merge.
Nunca `push` directo a `main` (hay un ruleset que lo impide).

Las convenciones completas del repositorio están en [`AGENTS.md`](AGENTS.md).

## Nota sobre el historial

El historial de este repositorio se reinició el **2026-08-23**. El repositorio anterior
se eliminó por completo para retirar de forma definitiva un dato personal que había sido
comiteado por error. Los hashes de commit anteriores a esa fecha ya no existen.
