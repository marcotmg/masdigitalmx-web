import Link from "next/link";
import type { LegalSection } from "@/components/LegalDocLayout";
import {
  RESPONSABLE_NOMBRE,
  RESPONSABLE_PERSONA,
  RESPONSABLE_DOMICILIO,
  CORREO_PRIVACIDAD,
  LFPDPPP_DOF_LEY,
  LFPDPPP_DOF_REFORMA,
  LFPDPPP_DOF_REGLAMENTO,
  ARCO_ARTICULOS_CITA,
  CONSENTIMIENTO_ARTICULO_CITA,
} from "@/lib/legal-data";

/**
 * Renderizador del subconjunto de Markdown con el que se escriben los tres
 * documentos legales de `content/legal/`.
 *
 * ── POR QUE EXISTE ──────────────────────────────────────────────────────────
 * La prosa legal vinculante vivía dentro de tres componentes de React. Para
 * cualquier herramienta —y para cualquier agente— era front-end: una página que
 * compila y se ve bien podía haber perdido una cláusula sin que nada fallara.
 * Sacarla a `.md` le da identidad propia y la hace verificable
 * (`scripts/verificar-legal.mjs`).
 *
 * ── ES UN GATE, NO UN ROUTER ────────────────────────────────────────────────
 * Ante sintaxis que no reconoce **lanza y rompe el build**. Nunca la ignora.
 * Un renderizador que se come lo que no entiende borra cláusulas en silencio,
 * que es exactamente el fallo que este trabajo existe para impedir. Lo mismo
 * aplica a un `{{MARCADOR}}` desconocido: error, jamás texto literal.
 *
 * ── NO ES UN PARSER DE MARKDOWN GENERAL ─────────────────────────────────────
 * Soporta **sólo** lo que estos tres documentos usan de verdad, y se prueba
 * contra ellos. Ampliarlo es una decisión deliberada, no un accidente.
 *
 * ── CERO DEPENDENCIAS ───────────────────────────────────────────────────────
 * Escrito a mano a propósito: `@next/mdx` y compañía meterían cadena de
 * suministro nueva en un repositorio PÚBLICO (N14). `pnpm-lock.yaml` no cambia.
 *
 * ── GRAMATICA ───────────────────────────────────────────────────────────────
 *   Frontmatter   `---` … `---` con exactamente `version`, `vigencia`, `ruta`.
 *   `# …`         título del documento (uno, y sólo en el encabezado).
 *   `## N. …`     sección. El id (`s1`…`sN`) y la etiqueta del índice lateral
 *                 SE DERIVAN de aquí: no hay una segunda lista que desincronizar.
 *                 Se exige que el número escrito coincida con el ordinal.
 *   `### …`       subsección.
 *   `- …`         lista no ordenada · `1. …` lista ordenada.
 *   `| a | b |`   tabla (con su fila `|---|---|`).
 *   `:::nombre`   bloque con formato propio: `subtitulo`, `rotulo`, `nota`,
 *                 `contacto`, `pie`.
 *   En línea      `**negrita**`, `*cursiva*`, `[texto](destino)`,
 *                 `{{MARCADOR}}`, y `\` al final de línea para un salto duro.
 *
 * El separador horizontal entre secciones NO se escribe: se inserta solo antes
 * de cada `##`. Escribirlo a mano sería una forma de olvidarlo.
 *
 * ── DATOS ATOMICOS ──────────────────────────────────────────────────────────
 * `lib/legal-data.ts` sigue siendo la fuente única del nombre, el domicilio, las
 * fechas del DOF y las citas de artículos. En el `.md` van como `{{MARCADOR}}` y
 * se resuelven aquí. Congelar esos valores dentro del `.md` rompería la
 * protección que hizo que retirar el domicilio particular de una persona fuera
 * un cambio en un punto y no en tres.
 */

// ─── Estilos (idénticos a los que tenían las páginas antes de la migración) ──

const COLOR_TEXTO = "var(--color-text-base)";
const COLOR_APAGADO = "var(--color-text-muted)";
const COLOR_LEYENDA = "var(--color-text-caption)";
const COLOR_ENLACE = "var(--color-primary-light)";
const CLASES_ENLACE = "underline transition-opacity duration-200 hover:opacity-75";
const CLASES_LISTA = "text-sm leading-relaxed mb-4 space-y-2 pl-5";

// ─── Tipos públicos ──────────────────────────────────────────────────────────

export type MetaDocumento = {
  version: string;
  vigencia: string;
  ruta: string;
};

export type DocumentoLegal = {
  /** `version`, `vigencia` y `ruta` del frontmatter. */
  meta: MetaDocumento;
  /** `<h1>` + el bloque de encabezado. Va como prop `header` de LegalDocLayout. */
  encabezado: React.ReactNode;
  /** El documento. Va como `children` de LegalDocLayout. */
  cuerpo: React.ReactNode;
  /** Índice lateral, derivado de los `##`. */
  secciones: LegalSection[];
};

/** Lo que necesita saber el renderizado: de dónde viene el texto y qué valores resuelven los marcadores. */
type Contexto = {
  origen: string;
  valores: Record<string, string>;
};

// ─── Errores ─────────────────────────────────────────────────────────────────

class ErrorLegal extends Error {
  constructor(origen: string, linea: number | null, mensaje: string) {
    const ubicacion = linea === null ? origen : `${origen}:${linea}`;
    super(
      `[legal/markdown] ${ubicacion} — ${mensaje}\n` +
        `  Este renderizador es un gate: prefiere romper el build antes que ` +
        `publicar un documento legal que no entendió por completo.`,
    );
    this.name = "ErrorLegal";
  }
}

// ─── Marcadores de sustitución ───────────────────────────────────────────────

/**
 * Se enumeran a mano en vez de re-exportar el módulo entero: así, agregar un
 * marcador es un acto explícito y `tsc` avisa si el nombre no existe.
 */
const DATOS_ATOMICOS: Record<string, string> = {
  RESPONSABLE_NOMBRE,
  RESPONSABLE_PERSONA,
  RESPONSABLE_DOMICILIO,
  CORREO_PRIVACIDAD,
  LFPDPPP_DOF_LEY,
  LFPDPPP_DOF_REFORMA,
  LFPDPPP_DOF_REGLAMENTO,
  ARCO_ARTICULOS_CITA,
  CONSENTIMIENTO_ARTICULO_CITA,
};

// ─── Frontmatter ─────────────────────────────────────────────────────────────

const CLAVES_META = ["version", "vigencia", "ruta"] as const;

function extraerFrontmatter(
  fuente: string,
  origen: string,
): { meta: MetaDocumento; cuerpo: string; desplazamiento: number } {
  const lineas = fuente.split("\n");
  if (lineas[0] !== "---") {
    throw new ErrorLegal(origen, 1, "el documento debe empezar con el frontmatter `---`.");
  }
  const cierre = lineas.indexOf("---", 1);
  if (cierre === -1) {
    throw new ErrorLegal(origen, 1, "el frontmatter no se cierra con `---`.");
  }

  const crudo: Record<string, string> = {};
  for (let i = 1; i < cierre; i++) {
    const coincidencia = /^([a-z]+):\s*"(.*)"\s*$/.exec(lineas[i]);
    if (!coincidencia) {
      throw new ErrorLegal(
        origen,
        i + 1,
        `línea de frontmatter no reconocida: ${JSON.stringify(lineas[i])}. Formato: \`clave: "valor"\`.`,
      );
    }
    crudo[coincidencia[1]] = coincidencia[2];
  }

  const sobrantes = Object.keys(crudo).filter(
    (k) => !CLAVES_META.includes(k as (typeof CLAVES_META)[number]),
  );
  if (sobrantes.length > 0) {
    throw new ErrorLegal(
      origen,
      1,
      `el frontmatter sólo admite ${CLAVES_META.join(", ")}; sobra(n): ${sobrantes.join(", ")}.`,
    );
  }
  for (const clave of CLAVES_META) {
    if (!crudo[clave]) throw new ErrorLegal(origen, 1, `falta \`${clave}\` en el frontmatter.`);
  }

  return {
    meta: { version: crudo.version, vigencia: crudo.vigencia, ruta: crudo.ruta },
    cuerpo: lineas.slice(cierre + 1).join("\n"),
    desplazamiento: cierre + 1,
  };
}

// ─── Bloques ─────────────────────────────────────────────────────────────────

type Bloque =
  | { tipo: "h1" | "h2" | "h3"; texto: string; linea: number }
  | { tipo: "parrafo"; lineas: string[]; linea: number }
  | { tipo: "lista"; ordenada: boolean; items: string[]; linea: number }
  | { tipo: "tabla"; encabezados: string[]; filas: string[][]; linea: number }
  | { tipo: "directiva"; nombre: Directiva; parrafos: string[][]; linea: number };

const DIRECTIVAS = ["subtitulo", "rotulo", "nota", "contacto", "pie"] as const;
type Directiva = (typeof DIRECTIVAS)[number];

const ES_ITEM_ORDENADO = /^(\d+)\.\s+(.*)$/;

function inicioDeBloque(linea: string): boolean {
  return (
    linea.startsWith("#") ||
    linea.startsWith(":::") ||
    linea.startsWith("- ") ||
    linea.startsWith("|") ||
    ES_ITEM_ORDENADO.test(linea)
  );
}

function celdas(linea: string, origen: string, numero: number): string[] {
  const recortada = linea.trim();
  if (!recortada.startsWith("|") || !recortada.endsWith("|")) {
    throw new ErrorLegal(origen, numero, "la fila de tabla debe abrir y cerrar con `|`.");
  }
  return recortada
    .slice(1, -1)
    .split("|")
    .map((c) => c.trim());
}

function trocear(cuerpo: string, origen: string, desplazamiento: number): Bloque[] {
  const lineas = cuerpo.split("\n");
  const bloques: Bloque[] = [];
  let i = 0;
  const numero = () => i + 1 + desplazamiento;

  while (i < lineas.length) {
    const linea = lineas[i];

    if (linea.trim() === "") {
      i++;
      continue;
    }
    if (/^-{3,}\s*$/.test(linea)) {
      throw new ErrorLegal(
        origen,
        numero(),
        "no se escriben separadores: el renderizador inserta uno antes de cada `##`.",
      );
    }

    // Encabezados
    const encabezado = /^(#{1,6})\s+(.*)$/.exec(linea);
    if (encabezado) {
      const nivel = encabezado[1].length;
      if (nivel > 3) {
        throw new ErrorLegal(
          origen,
          numero(),
          `nivel de encabezado no soportado (${"#".repeat(nivel)}). Sólo #, ## y ###.`,
        );
      }
      bloques.push({
        tipo: nivel === 1 ? "h1" : nivel === 2 ? "h2" : "h3",
        texto: encabezado[2].trim(),
        linea: numero(),
      });
      i++;
      continue;
    }
    if (linea.startsWith("#")) {
      throw new ErrorLegal(origen, numero(), "encabezado sin espacio tras las almohadillas.");
    }

    // Directivas :::nombre … :::
    if (linea.startsWith(":::")) {
      const nombre = linea.slice(3).trim();
      if (!DIRECTIVAS.includes(nombre as Directiva)) {
        throw new ErrorLegal(
          origen,
          numero(),
          `directiva desconocida \`:::${nombre}\`. Las válidas son: ${DIRECTIVAS.join(", ")}.`,
        );
      }
      const inicio = numero();
      i++;
      const dentro: string[] = [];
      let cerrada = false;
      while (i < lineas.length) {
        if (lineas[i].trim() === ":::") {
          cerrada = true;
          i++;
          break;
        }
        if (lineas[i].startsWith(":::")) {
          throw new ErrorLegal(origen, numero(), "directiva anidada: no se soportan.");
        }
        dentro.push(lineas[i]);
        i++;
      }
      if (!cerrada) {
        throw new ErrorLegal(origen, inicio, `la directiva \`:::${nombre}\` no se cierra con \`:::\`.`);
      }

      const parrafos: string[][] = [];
      let actual: string[] = [];
      for (const l of dentro) {
        if (l.trim() === "") {
          if (actual.length > 0) parrafos.push(actual);
          actual = [];
        } else {
          actual.push(l.trim());
        }
      }
      if (actual.length > 0) parrafos.push(actual);
      if (parrafos.length === 0) {
        throw new ErrorLegal(origen, inicio, `la directiva \`:::${nombre}\` está vacía.`);
      }

      bloques.push({ tipo: "directiva", nombre: nombre as Directiva, parrafos, linea: inicio });
      continue;
    }

    // Tabla
    if (linea.startsWith("|")) {
      const inicio = numero();
      const encabezados = celdas(lineas[i], origen, numero());
      i++;
      if (i >= lineas.length || !/^\|\s*(:?-{3,}:?\s*\|)+\s*$/.test(lineas[i].trim())) {
        throw new ErrorLegal(origen, inicio, "a la tabla le falta su fila separadora `|---|---|`.");
      }
      const separadoras = celdas(lineas[i], origen, numero());
      if (separadoras.length !== encabezados.length) {
        throw new ErrorLegal(
          origen,
          numero(),
          `la fila separadora tiene ${separadoras.length} columnas y el encabezado ${encabezados.length}.`,
        );
      }
      i++;
      const filas: string[][] = [];
      while (i < lineas.length && lineas[i].trim().startsWith("|")) {
        const fila = celdas(lineas[i], origen, numero());
        if (fila.length !== encabezados.length) {
          throw new ErrorLegal(
            origen,
            numero(),
            `la fila tiene ${fila.length} columnas y el encabezado ${encabezados.length}.`,
          );
        }
        filas.push(fila);
        i++;
      }
      if (filas.length === 0) throw new ErrorLegal(origen, inicio, "tabla sin filas de datos.");
      bloques.push({ tipo: "tabla", encabezados, filas, linea: inicio });
      continue;
    }

    // Listas
    if (linea.startsWith("- ")) {
      const inicio = numero();
      const items: string[] = [];
      while (i < lineas.length && lineas[i].startsWith("- ")) {
        items.push(lineas[i].slice(2).trim());
        i++;
      }
      bloques.push({ tipo: "lista", ordenada: false, items, linea: inicio });
      continue;
    }
    if (ES_ITEM_ORDENADO.test(linea)) {
      const inicio = numero();
      const items: string[] = [];
      let esperado = 1;
      while (i < lineas.length) {
        const item = ES_ITEM_ORDENADO.exec(lineas[i]);
        if (!item) break;
        if (Number(item[1]) !== esperado) {
          throw new ErrorLegal(origen, numero(), `la lista ordenada salta de ${esperado} a ${item[1]}.`);
        }
        items.push(item[2].trim());
        esperado++;
        i++;
      }
      bloques.push({ tipo: "lista", ordenada: true, items, linea: inicio });
      continue;
    }

    // Párrafo
    const inicio = numero();
    const acumuladas: string[] = [];
    while (i < lineas.length && lineas[i].trim() !== "" && !inicioDeBloque(lineas[i])) {
      acumuladas.push(lineas[i].trim());
      i++;
    }
    bloques.push({ tipo: "parrafo", lineas: acumuladas, linea: inicio });
  }

  return bloques;
}

// ─── Marcado en línea ────────────────────────────────────────────────────────

function enlace(
  destino: string,
  contenido: React.ReactNode,
  clave: string,
  ctx: Contexto,
  linea: number,
): React.ReactNode {
  if (destino.startsWith("/")) {
    return (
      <Link key={clave} href={destino} className={CLASES_ENLACE} style={{ color: COLOR_ENLACE }}>
        {contenido}
      </Link>
    );
  }
  if (destino.startsWith("mailto:")) {
    return (
      <a key={clave} href={destino} className={CLASES_ENLACE} style={{ color: COLOR_ENLACE }}>
        {contenido}
      </a>
    );
  }
  if (destino.startsWith("https://")) {
    return (
      <a
        key={clave}
        href={destino}
        target="_blank"
        rel="noopener noreferrer"
        className={CLASES_ENLACE}
        style={{ color: COLOR_ENLACE }}
      >
        {contenido}
      </a>
    );
  }
  throw new ErrorLegal(
    ctx.origen,
    linea,
    `destino de enlace no soportado: ${JSON.stringify(destino)}. Sólo rutas internas (\`/…\`), \`mailto:\` y \`https://\`.`,
  );
}

const MARCADOR = /^\{\{([A-Z0-9_]+)\}\}/;

function enLinea(texto: string, ctx: Contexto, linea: number, prefijo: string): React.ReactNode[] {
  const nodos: React.ReactNode[] = [];
  let acumulado = "";
  let i = 0;
  let contador = 0;

  const volcar = () => {
    if (acumulado.length > 0) {
      nodos.push(acumulado);
      acumulado = "";
    }
  };

  while (i < texto.length) {
    const c = texto[i];

    if (c === "*") {
      const negrita = texto.startsWith("**", i);
      const marca = negrita ? "**" : "*";
      const fin = texto.indexOf(marca, i + marca.length);
      if (fin === -1) {
        throw new ErrorLegal(ctx.origen, linea, `\`${marca}\` sin cerrar en: ${JSON.stringify(texto)}`);
      }
      const dentro = texto.slice(i + marca.length, fin);
      if (dentro.length === 0) throw new ErrorLegal(ctx.origen, linea, `\`${marca}${marca}\` vacío.`);
      volcar();
      const clave = `${prefijo}-e${contador++}`;
      const hijos = enLinea(dentro, ctx, linea, clave);
      nodos.push(
        negrita ? (
          <strong key={clave} style={{ color: COLOR_TEXTO }}>
            {hijos}
          </strong>
        ) : (
          <em key={clave}>{hijos}</em>
        ),
      );
      i = fin + marca.length;
      continue;
    }

    if (c === "[") {
      const cierre = texto.indexOf("]", i + 1);
      if (cierre === -1 || texto[cierre + 1] !== "(") {
        throw new ErrorLegal(
          ctx.origen,
          linea,
          `enlace mal formado en: ${JSON.stringify(texto.slice(i, i + 40))}`,
        );
      }
      const finDestino = texto.indexOf(")", cierre + 2);
      if (finDestino === -1) {
        throw new ErrorLegal(
          ctx.origen,
          linea,
          `enlace sin cerrar el destino en: ${JSON.stringify(texto.slice(i, i + 40))}`,
        );
      }
      volcar();
      const clave = `${prefijo}-a${contador++}`;
      const etiqueta = enLinea(texto.slice(i + 1, cierre), ctx, linea, clave);
      nodos.push(enlace(texto.slice(cierre + 2, finDestino), etiqueta, clave, ctx, linea));
      i = finDestino + 1;
      continue;
    }

    if (c === "{") {
      const marcador = MARCADOR.exec(texto.slice(i));
      if (!marcador) {
        throw new ErrorLegal(
          ctx.origen,
          linea,
          `\`{\` suelto: un marcador se escribe \`{{NOMBRE_EN_MAYUSCULAS}}\`.`,
        );
      }
      const valor = ctx.valores[marcador[1]];
      if (valor === undefined) {
        throw new ErrorLegal(
          ctx.origen,
          linea,
          `marcador desconocido {{${marcador[1]}}}. Disponibles: ${Object.keys(ctx.valores).sort().join(", ")}. ` +
            `Si es un dato atómico nuevo, decláralo en lib/legal-data.ts y agrégalo a DATOS_ATOMICOS — ` +
            `nunca lo escribas literal en el .md.`,
        );
      }
      /* El valor va como nodo PROPIO, no fundido con la prosa vecina: es como
         estaba antes de la migración (`({RESPONSABLE_PERSONA}),` en el .tsx) y
         React separa dos nodos de texto contiguos con un `<!-- -->`. Fundirlos
         cambiaría la tokenización del verificador y marcaría un cambio de texto
         legal que no ocurrió. De paso, el valor nunca se reinterpreta como
         marcado: un dato con `*` o `[` no puede alterar el documento. */
      volcar();
      nodos.push(valor);
      i += marcador[0].length;
      continue;
    }

    if (c === "<" || c === ">") {
      throw new ErrorLegal(ctx.origen, linea, `no se admite HTML crudo (\`${c}\`) en el texto legal.`);
    }

    acumulado += c;
    i++;
  }

  volcar();
  return nodos;
}

/** Une las líneas de un párrafo: `\` al final significa salto duro. */
function parrafoEnLinea(
  lineas: string[],
  ctx: Contexto,
  linea: number,
  prefijo: string,
): React.ReactNode[] {
  const nodos: React.ReactNode[] = [];
  lineas.forEach((cruda, indice) => {
    const duro = cruda.endsWith("\\");
    const contenido = duro ? cruda.slice(0, -1) : cruda;
    nodos.push(...enLinea(contenido, ctx, linea + indice, `${prefijo}-l${indice}`));
    if (indice < lineas.length - 1) {
      if (duro) nodos.push(<br key={`${prefijo}-br${indice}`} />);
      else nodos.push(" ");
    } else if (duro) {
      throw new ErrorLegal(ctx.origen, linea + indice, "`\\` de salto duro en la última línea del párrafo.");
    }
  });
  return nodos;
}

// ─── Composición ─────────────────────────────────────────────────────────────

function Separador() {
  return (
    <div
      aria-hidden="true"
      className="my-10"
      style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(27,110,243,0.35) 50%, transparent)",
      }}
    />
  );
}

function contenedorDirectiva(nombre: Directiva, clave: string, hijos: React.ReactNode): React.ReactNode {
  switch (nombre) {
    case "subtitulo":
      return (
        <p key={clave} className="text-sm" style={{ color: COLOR_LEYENDA }}>
          {hijos}
        </p>
      );
    case "rotulo":
      return (
        <p key={clave} className="text-sm font-semibold mb-2" style={{ color: COLOR_TEXTO }}>
          {hijos}
        </p>
      );
    case "nota":
      return (
        <div
          key={clave}
          className="rounded-xl p-4 text-sm leading-relaxed"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            color: COLOR_APAGADO,
          }}
        >
          {hijos}
        </div>
      );
    case "contacto":
      return (
        <div
          key={clave}
          className="rounded-xl p-6 text-sm leading-relaxed space-y-1"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            color: COLOR_APAGADO,
          }}
        >
          {hijos}
        </div>
      );
    case "pie":
      return (
        <div
          key={clave}
          className="mt-12 pt-6 text-xs space-y-1"
          style={{ borderTop: "1px solid var(--color-border)", color: COLOR_LEYENDA }}
        >
          {hijos}
        </div>
      );
  }
}

function renderizarBloque(
  bloque: Bloque,
  indice: number,
  ctx: Contexto,
  ordinalH2: number,
): React.ReactNode[] {
  const clave = `b${indice}`;

  switch (bloque.tipo) {
    case "h1":
      return [
        <h1
          key={clave}
          className="font-heading font-bold mb-2"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: COLOR_TEXTO }}
        >
          {enLinea(bloque.texto, ctx, bloque.linea, clave)}
        </h1>,
      ];

    case "h2":
      return [
        <Separador key={`${clave}-sep`} />,
        <h2
          key={clave}
          id={`s${ordinalH2}`}
          className="font-heading font-bold mb-4 mt-10 first:mt-0"
          style={{ fontSize: "1.25rem", color: COLOR_TEXTO }}
        >
          {enLinea(bloque.texto, ctx, bloque.linea, clave)}
        </h2>,
      ];

    case "h3":
      return [
        <h3
          key={clave}
          className="font-heading font-semibold mb-3 mt-6"
          style={{ fontSize: "1rem", color: COLOR_TEXTO }}
        >
          {enLinea(bloque.texto, ctx, bloque.linea, clave)}
        </h3>,
      ];

    case "parrafo":
      return [
        <p key={clave} className="text-sm leading-relaxed mb-4" style={{ color: COLOR_APAGADO }}>
          {parrafoEnLinea(bloque.lineas, ctx, bloque.linea, clave)}
        </p>,
      ];

    case "lista": {
      const items = bloque.items.map((item, n) => (
        <li key={`${clave}-i${n}`}>{enLinea(item, ctx, bloque.linea + n, `${clave}-i${n}`)}</li>
      ));
      return bloque.ordenada
        ? [
            <ol key={clave} className={`${CLASES_LISTA} list-decimal`} style={{ color: COLOR_APAGADO }}>
              {items}
            </ol>,
          ]
        : [
            <ul key={clave} className={`${CLASES_LISTA} list-disc`} style={{ color: COLOR_APAGADO }}>
              {items}
            </ul>,
          ];
    }

    case "tabla":
      return [
        <div
          key={clave}
          className="overflow-x-auto my-6 rounded-xl"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "var(--color-surface-2)" }}>
                {bloque.encabezados.map((encabezado, c) => (
                  <th
                    key={`${clave}-h${c}`}
                    className="px-4 py-3 text-left font-semibold"
                    style={{ color: COLOR_TEXTO, borderBottom: "1px solid var(--color-border)" }}
                  >
                    {enLinea(encabezado, ctx, bloque.linea, `${clave}-h${c}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bloque.filas.map((fila, f) => (
                <tr
                  key={`${clave}-f${f}`}
                  style={{ background: f % 2 === 0 ? "var(--color-surface)" : "var(--color-canvas)" }}
                >
                  {fila.map((celda, c) => (
                    <td
                      key={`${clave}-f${f}c${c}`}
                      className="px-4 py-3 align-top text-sm leading-relaxed"
                      style={{
                        color: COLOR_APAGADO,
                        borderBottom:
                          f < bloque.filas.length - 1 ? "1px solid var(--color-border)" : "none",
                      }}
                    >
                      {enLinea(celda, ctx, bloque.linea + 2 + f, `${clave}-f${f}c${c}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      ];

    case "directiva": {
      const unParrafo =
        bloque.nombre === "subtitulo" || bloque.nombre === "rotulo" || bloque.nombre === "nota";
      if (unParrafo && bloque.parrafos.length !== 1) {
        throw new ErrorLegal(
          ctx.origen,
          bloque.linea,
          `\`:::${bloque.nombre}\` admite un solo párrafo (tiene ${bloque.parrafos.length}).`,
        );
      }
      const hijos = unParrafo
        ? parrafoEnLinea(bloque.parrafos[0], ctx, bloque.linea + 1, clave)
        : bloque.parrafos.map((parrafo, n) => (
            <p key={`${clave}-p${n}`}>
              {parrafoEnLinea(parrafo, ctx, bloque.linea + 1, `${clave}-p${n}`)}
            </p>
          ));
      return [contenedorDirectiva(bloque.nombre, clave, hijos)];
    }
  }
}

// ─── API ─────────────────────────────────────────────────────────────────────

const ENCABEZADO_NUMERADO = /^(\d+)\.\s+(.+)$/;

/**
 * Convierte el `.md` de un documento legal en el árbol de React que publican
 * `app/privacidad`, `app/privacidad-hygieia` y `app/terminos`.
 *
 * @param fuente contenido del `.md`, tal cual lo devuelve `readFileSync`.
 * @param origen ruta del archivo, sólo para que los errores digan dónde mirar.
 * @param rutaEsperada la ruta que publica la página que llama. Se contrasta con
 *   el `ruta` del frontmatter: sin esto, `aviso-privacidad.md` podría declararse
 *   `"/terminos"` y nadie se enteraría — metadato muerto en un archivo cuyo
 *   principio es «gate, no router».
 */
export function renderizarDocumentoLegal(
  fuente: string,
  origen: string,
  rutaEsperada: string,
): DocumentoLegal {
  const { meta, cuerpo, desplazamiento } = extraerFrontmatter(fuente, origen);
  if (meta.ruta !== rutaEsperada) {
    throw new ErrorLegal(
      origen,
      null,
      `el frontmatter declara \`ruta: "${meta.ruta}"\` pero lo publica la página de \`${rutaEsperada}\`.`,
    );
  }
  const ctx: Contexto = {
    origen,
    valores: {
      ...DATOS_ATOMICOS,
      VERSION: meta.version,
      VIGENCIA: meta.vigencia,
      RUTA: meta.ruta,
    },
  };
  const bloques = trocear(cuerpo, origen, desplazamiento);

  if (bloques.length === 0) throw new ErrorLegal(origen, null, "documento vacío.");
  if (bloques[0].tipo !== "h1") {
    throw new ErrorLegal(origen, bloques[0].linea, "el documento debe empezar con `# Título`.");
  }
  if (bloques.filter((b) => b.tipo === "h1").length !== 1) {
    throw new ErrorLegal(origen, null, "debe haber exactamente un `#` (el título del documento).");
  }

  const primeraSeccion = bloques.findIndex((b) => b.tipo === "h2");
  if (primeraSeccion === -1) throw new ErrorLegal(origen, null, "el documento no tiene ninguna sección `##`.");

  /* Índice lateral y anclas: derivados de los `##`, nunca de una segunda lista.
     Antes había que tocar DOS lugares para mover una sección (el `<h2 id>` y la
     constante SECTIONS); desincronizarlos dejaba el índice apuntando a un ancla
     muerta. Aquí eso ya no se puede escribir. */
  const secciones: LegalSection[] = [];
  const ordinales = new Map<Bloque, number>();
  let ordinal = 0;
  for (const bloque of bloques) {
    if (bloque.tipo !== "h2") continue;
    ordinal++;
    const numerado = ENCABEZADO_NUMERADO.exec(bloque.texto);
    if (!numerado) {
      throw new ErrorLegal(origen, bloque.linea, `la sección debe empezar con su número: \`## ${ordinal}. Título\`.`);
    }
    if (Number(numerado[1]) !== ordinal) {
      throw new ErrorLegal(
        origen,
        bloque.linea,
        `la sección está numerada ${numerado[1]} pero es la ${ordinal}. El ancla sería \`#s${ordinal}\` ` +
          `y el índice apuntaría a un sitio distinto del que dice el texto.`,
      );
    }
    ordinales.set(bloque, ordinal);
    secciones.push({ id: `s${ordinal}`, label: numerado[2].trim() });
  }

  const encabezado = bloques
    .slice(0, primeraSeccion)
    .flatMap((bloque, indice) => renderizarBloque(bloque, indice, ctx, 0));
  const cuerpoRenderizado = bloques
    .slice(primeraSeccion)
    .flatMap((bloque, indice) =>
      renderizarBloque(bloque, primeraSeccion + indice, ctx, ordinales.get(bloque) ?? 0),
    );

  return { meta, encabezado, cuerpo: cuerpoRenderizado, secciones };
}
