#!/usr/bin/env node
// =============================================================================
// verificar-legal.mjs — gate de identidad del TEXTO LEGAL publicado.
//
// POR QUE EXISTE
//   Las 1.561 lineas de prosa legal vinculante vivian DENTRO de tres
//   componentes de React. Para cualquier herramienta —y para cualquier agente—
//   eran front-end: una pagina que compila, se ve bien y perdio una clausula
//   pasaba el CI en verde. El defecto se presentaba como "cambio el diseno",
//   nunca como "perdimos una clausula legal".
//
//   Este script convierte el texto publicado en un ARTEFACTO VERIFICABLE: toma
//   el HTML que el build acaba de generar, extrae el texto de <main>, lo
//   normaliza y lo compara —token por token— contra una linea base congelada.
//   Si una palabra del texto legal cambio, el CI falla.
//
//   Cambiar el texto legal a proposito sigue siendo posible: hay que regenerar
//   la linea base EN EL MISMO PR (modo `capturar-build`). Eso no hace el cambio
//   imposible: lo hace imposible de hacer EN SILENCIO, que es el objetivo.
//
// MODOS
//   capturar-vivo  <salida>   Descarga las 3 rutas de produccion y escribe la
//                             linea base. Es la VERDAD JURIDICA: el texto que
//                             hoy leen los titulares de los datos.
//   capturar-build <salida>   Igual, pero leyendo el HTML prerenderizado por
//                             `next build` en .next/server/app/.
//   verificar      [base]     Compara el build actual contra la linea base.
//                             Sale 1 si difiere. Es lo que corre el CI.
//   estructura                Imprime el conteo de etiquetas de bloque por
//                             ruta. Complementa a `verificar`: el multiset de
//                             tokens NO ve si una tabla se degrado a parrafos
//                             o si se perdio el recuadro de un callout — el
//                             texto seria identico y el gate pasaria.
//
// NORMALIZACION (no reinventar — cada regla se gano con un falso positivo real)
//   1. Se aisla <main>…</main> y se descartan script/style/template/noscript.
//   2. TODA etiqueta se sustituye por un espacio. Equivale al `get_text(" ")`
//      de BeautifulSoup y es lo que hace que `…com</strong>(en` (produccion) y
//      `…com</strong> (en` (fuente) den los mismos tokens: la diferencia de un
//      espacio pegado a una etiqueta no es un cambio de texto legal.
//   3. Se decodifican entidades HTML (&quot;Sitio&quot; -> "Sitio").
//   4. NFKC: el sitio emite la ligadura U+FB01; ademas dobla NBSP a espacio.
//   5. Se colapsa el espacio en blanco y se corta en tokens.
//   6. Cada token pierde los puntos de los extremos: `privacidad@…com.` y
//      `privacidad@…com` son el mismo dato.
//
// COBERTURA DECLARADA
//   Detecta palabras perdidas, cambiadas, duplicadas o agregadas. NO detecta
//   cambios de puntuacion adherida a una etiqueta ni de espaciado. Es un gate
//   de CONTENIDO, no de tipografia.
// =============================================================================

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Las tres rutas legales. `archivo` es el HTML prerenderizado por next build. */
const RUTAS = [
  { ruta: "/privacidad", archivo: "privacidad.html" },
  { ruta: "/privacidad-hygieia", archivo: "privacidad-hygieia.html" },
  { ruta: "/terminos", archivo: "terminos.html" },
];

const ORIGEN_VIVO = "https://masdigitalmx.com";
const BASELINE_POR_DEFECTO = join(RAIZ, "content/legal/baseline-publicado.txt");

// ─── Extraccion y normalizacion ──────────────────────────────────────────────

const ENTIDADES = {
  quot: '"',
  amp: "&",
  lt: "<",
  gt: ">",
  apos: "'",
  nbsp: " ",
};

function decodificarEntidades(texto) {
  // Una sola pasada, a proposito: dos pasadas convertirian `&amp;lt;` en `<`.
  return texto.replace(/&(#x[0-9a-fA-F]+|#[0-9]+|[a-zA-Z][a-zA-Z0-9]*);/g, (todo, cuerpo) => {
    if (cuerpo[0] === "#") {
      const codigo =
        cuerpo[1] === "x" || cuerpo[1] === "X"
          ? parseInt(cuerpo.slice(2), 16)
          : parseInt(cuerpo.slice(1), 10);
      return Number.isFinite(codigo) ? String.fromCodePoint(codigo) : todo;
    }
    const clave = cuerpo.toLowerCase();
    return Object.prototype.hasOwnProperty.call(ENTIDADES, clave) ? ENTIDADES[clave] : todo;
  });
}

/** Aisla el contenido de <main>. Falla ruidosamente si no lo encuentra. */
function aislarMain(html, procedencia) {
  const apertura = html.search(/<main[\s>]/);
  const cierre = html.lastIndexOf("</main>");
  if (apertura === -1 || cierre === -1 || cierre < apertura) {
    throw new Error(`No se encontro <main>…</main> en ${procedencia}.`);
  }
  const desdeApertura = html.slice(apertura);
  const finEtiqueta = desdeApertura.indexOf(">");
  return html.slice(apertura + finEtiqueta + 1, cierre);
}

/** HTML de <main> -> lista ordenada de tokens normalizados. */
function tokenizar(htmlMain) {
  let t = htmlMain;
  // Contenido que no es texto visible del documento.
  t = t.replace(/<(script|style|template|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, " ");
  // Comentarios (React SSR intercala <!-- --> entre nodos de texto).
  t = t.replace(/<!--[\s\S]*?-->/g, " ");
  // TODA etiqueta pasa a ser un espacio. Ver punto 2 de la normalizacion.
  t = t.replace(/<[^>]*>/g, " ");
  t = decodificarEntidades(t);
  t = t.normalize("NFKC");
  return t
    .split(/\s+/)
    .map((token) => {
      const limpio = token.replace(/^\.+/, "").replace(/\.+$/, "");
      if (limpio.startsWith("#")) {
        // El formato de la linea base reserva `#` para comentarios y `##` para
        // separadores de ruta. Un token asi lo corromperia en silencio.
        throw new Error(`Token no representable en la linea base: ${JSON.stringify(token)}`);
      }
      return limpio;
    })
    .filter((token) => token.length > 0);
}

// ─── Conteo estructural ──────────────────────────────────────────────────────

/**
 * El multiset de tokens es ciego a la estructura: si una tabla se rindiera como
 * parrafos, o se perdiera el recuadro de un callout, el texto seria identico.
 * Esto lo cubre.
 */
const MARCAS = [
  ["h1", /<h1[\s>]/g],
  ["h2", /<h2[\s>]/g],
  ["h3", /<h3[\s>]/g],
  ["p", /<p[\s>]/g],
  ["ul", /<ul[\s>]/g],
  ["ol", /<ol[\s>]/g],
  ["li", /<li[\s>]/g],
  ["table", /<table[\s>]/g],
  ["tr", /<tr[\s>]/g],
  ["th", /<th[\s>]/g],
  ["td", /<td[\s>]/g],
  ["strong", /<strong[\s>]/g],
  ["em", /<em[\s>]/g],
  ["a", /<a[\s>]/g],
  ["br", /<br\s*\/?>/g],
  ["callout(rounded-xl)", /rounded-xl/g],
  ["separador(aria-hidden)", /aria-hidden="true"/g],
];

function contarEstructura(htmlMain) {
  const conteo = {};
  for (const [nombre, patron] of MARCAS) {
    conteo[nombre] = (htmlMain.match(patron) || []).length;
  }
  return conteo;
}

// ─── Fuentes de HTML ─────────────────────────────────────────────────────────

async function htmlDeVivo({ ruta }) {
  const url = `${ORIGEN_VIVO}${ruta}`;
  const respuesta = await fetch(url, { redirect: "follow" });
  if (!respuesta.ok) throw new Error(`${url} respondio HTTP ${respuesta.status}`);
  return { html: await respuesta.text(), procedencia: url };
}

function htmlDeBuild({ archivo }) {
  const ruta = join(RAIZ, ".next/server/app", archivo);
  if (!existsSync(ruta)) {
    throw new Error(
      `No existe ${ruta}.\n` +
        `Este gate LEE la salida de \`next build\`; si el archivo no esta, no puede\n` +
        `verificar nada. Corre el build antes (nunca dejes pasar el gate por ausencia\n` +
        `de su propia entrada).`,
    );
  }
  return { html: readFileSync(ruta, "utf8"), procedencia: ruta };
}

// ─── Linea base: formato de archivo ──────────────────────────────────────────

const CABECERA = [
  "# Linea base del TEXTO LEGAL publicado — masdigitalmx.com",
  "#",
  "# Generado por scripts/verificar-legal.mjs. NO editar a mano.",
  "# Un token normalizado por linea; `## <ruta>` separa documentos.",
  "#",
  "# Cambiar el texto legal exige REGENERAR este archivo en el MISMO PR",
  "# (`node scripts/verificar-legal.mjs capturar-build content/legal/baseline-publicado.txt`),",
  "# de modo que el cambio aparezca en la revision COMO lo que es: un cambio legal.",
];

function serializar(documentos) {
  const lineas = [...CABECERA];
  for (const { ruta, tokens } of documentos) {
    lineas.push(`## ${ruta}`);
    lineas.push(...tokens);
  }
  return lineas.join("\n") + "\n";
}

function deserializar(texto, procedencia) {
  const documentos = [];
  let actual = null;
  for (const linea of texto.split("\n")) {
    if (linea.startsWith("## ")) {
      actual = { ruta: linea.slice(3).trim(), tokens: [] };
      documentos.push(actual);
    } else if (linea.startsWith("#") || linea.length === 0) {
      continue;
    } else {
      if (!actual) throw new Error(`Token sin ruta en ${procedencia}: ${linea}`);
      actual.tokens.push(linea);
    }
  }
  if (documentos.length === 0) throw new Error(`Linea base vacia: ${procedencia}`);
  return documentos;
}

// ─── Comparacion ─────────────────────────────────────────────────────────────

function multiset(tokens) {
  const m = new Map();
  for (const t of tokens) m.set(t, (m.get(t) || 0) + 1);
  return m;
}

/** Diferencia dirigida: cuantas apariciones de `a` no cubre `b`. */
function faltantes(a, b) {
  const ma = multiset(a);
  const mb = multiset(b);
  const salida = [];
  let total = 0;
  for (const [token, n] of ma) {
    const falta = n - (mb.get(token) || 0);
    if (falta > 0) {
      salida.push([token, falta]);
      total += falta;
    }
  }
  return { total, detalle: salida };
}

/** Primer indice donde divergen los flujos ordenados, con ventana de contexto. */
function primeraDivergencia(base, actual) {
  const limite = Math.min(base.length, actual.length);
  for (let i = 0; i < limite; i++) {
    if (base[i] !== actual[i]) return i;
  }
  return base.length === actual.length ? -1 : limite;
}

function ventana(tokens, centro, radio = 6) {
  return tokens.slice(Math.max(0, centro - radio), centro + radio + 1).join(" ");
}

function compararDocumento(ruta, base, actual) {
  const deficit = faltantes(base, actual);
  const superavit = faltantes(actual, base);
  const idx = primeraDivergencia(base, actual);

  const lineas = [];
  const ok = deficit.total === 0 && superavit.total === 0;
  lineas.push(
    `${ok ? "✅" : "❌"} ${ruta.padEnd(22)} tokens ${String(actual.length).padStart(5)} ` +
      `(linea base ${String(base.length).padStart(5)})  deficit ${deficit.total}  superavit ${superavit.total}`,
  );

  if (!ok) {
    if (deficit.total > 0) {
      lineas.push("     Tokens que la linea base tiene y el build NO produce:");
      for (const [token, n] of deficit.detalle.slice(0, 25)) {
        lineas.push(`       −${n}  ${JSON.stringify(token)}`);
      }
      if (deficit.detalle.length > 25) {
        lineas.push(`       … y ${deficit.detalle.length - 25} formas mas`);
      }
    }
    if (superavit.total > 0) {
      lineas.push("     Tokens que el build produce y la linea base NO tiene:");
      for (const [token, n] of superavit.detalle.slice(0, 25)) {
        lineas.push(`       +${n}  ${JSON.stringify(token)}`);
      }
      if (superavit.detalle.length > 25) {
        lineas.push(`       … y ${superavit.detalle.length - 25} formas mas`);
      }
    }
    if (idx >= 0) {
      lineas.push(`     Primera divergencia en el token #${idx}:`);
      lineas.push(`       linea base : …${ventana(base, idx)}…`);
      lineas.push(`       build      : …${ventana(actual, idx)}…`);
    }
  }

  return { ok, texto: lineas.join("\n"), deficit: deficit.total, superavit: superavit.total };
}

// ─── Modos ───────────────────────────────────────────────────────────────────

async function recolectar(fuente) {
  const documentos = [];
  for (const entrada of RUTAS) {
    const { html, procedencia } =
      fuente === "vivo" ? await htmlDeVivo(entrada) : htmlDeBuild(entrada);
    const main = aislarMain(html, procedencia);
    documentos.push({
      ruta: entrada.ruta,
      tokens: tokenizar(main),
      estructura: contarEstructura(main),
      procedencia,
    });
  }
  return documentos;
}

async function modoCapturar(fuente, salida) {
  const destino = salida ? resolve(salida) : BASELINE_POR_DEFECTO;
  const documentos = await recolectar(fuente);
  writeFileSync(destino, serializar(documentos), "utf8");
  console.log(`Linea base escrita en ${destino} (fuente: ${fuente})`);
  for (const d of documentos) {
    console.log(`  ${d.ruta.padEnd(22)} ${String(d.tokens.length).padStart(5)} tokens  ← ${d.procedencia}`);
  }
}

async function modoVerificar(rutaBase) {
  const destino = rutaBase ? resolve(rutaBase) : BASELINE_POR_DEFECTO;
  if (!existsSync(destino)) {
    console.error(`No existe la linea base ${destino}. Sin ella este gate no verifica nada.`);
    process.exit(1);
  }
  const base = deserializar(readFileSync(destino, "utf8"), destino);
  const actual = await recolectar("build");

  console.log("Identidad del texto legal publicado — build vs linea base");
  console.log(`  linea base: ${destino}\n`);

  let falla = false;
  for (const { ruta } of RUTAS) {
    const b = base.find((d) => d.ruta === ruta);
    const a = actual.find((d) => d.ruta === ruta);
    if (!b) {
      console.log(`❌ ${ruta} no esta en la linea base.`);
      falla = true;
      continue;
    }
    const r = compararDocumento(ruta, b.tokens, a.tokens);
    console.log(r.texto);
    if (!r.ok) falla = true;
  }

  const rutasSobrantes = base.filter((d) => !RUTAS.some((r) => r.ruta === d.ruta));
  for (const d of rutasSobrantes) {
    console.log(`❌ ${d.ruta} esta en la linea base pero ya no se construye.`);
    falla = true;
  }

  console.log("");
  if (falla) {
    console.log("El texto legal publicado CAMBIO respecto a la linea base.");
    console.log("");
    console.log("Si el cambio NO era intencional: es una perdida o alteracion de texto legal.");
    console.log("Reviertelo. Una pagina que compila y se ve bien puede haber perdido una clausula.");
    console.log("");
    console.log("Si el cambio SI era intencional (nueva version del documento): regenera la linea");
    console.log("base en este mismo PR con");
    console.log("  node scripts/verificar-legal.mjs capturar-build content/legal/baseline-publicado.txt");
    console.log("para que la revision vea el cambio legal como lo que es.");
    process.exit(1);
  }
  console.log("Texto legal identico a la linea base en las 3 rutas.");
}

async function modoEstructura() {
  const documentos = await recolectar("build");
  for (const d of documentos) {
    console.log(`## ${d.ruta}`);
    for (const [k, v] of Object.entries(d.estructura)) {
      console.log(`   ${k.padEnd(24)} ${v}`);
    }
  }
}

// ─── Entrada ─────────────────────────────────────────────────────────────────

const [modo, argumento] = process.argv.slice(2);

try {
  if (modo === "capturar-vivo") await modoCapturar("vivo", argumento);
  else if (modo === "capturar-build") await modoCapturar("build", argumento);
  else if (modo === "estructura") await modoEstructura();
  else if (modo === "verificar" || modo === undefined) await modoVerificar(argumento);
  else {
    console.error(`Modo desconocido: ${modo}`);
    console.error("Modos: capturar-vivo | capturar-build | verificar | estructura");
    process.exit(2);
  }
} catch (error) {
  console.error(`verificar-legal: ${error.message}`);
  process.exit(1);
}
