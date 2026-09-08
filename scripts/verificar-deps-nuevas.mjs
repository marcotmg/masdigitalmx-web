#!/usr/bin/env node
// =============================================================================
// verificar-deps-nuevas.mjs — gate de CADENA DE SUMINISTRO.
//
// POR QUE EXISTE
//   `N14` prohibe instalar una dependencia externa sin auditarla antes. Un PR
//   de Dependabot ES una dependencia que entra de fuera, y hasta el 2026-09-08
//   nada obligaba a la auditoria antes de fusionarlo: el ruleset `main-protection`
//   exige PR pero con 0 aprobaciones, asi que un bump se podia fusionar sin que
//   ningun instrumento preguntara.
//
//   Responder "pues que TODO PR de dependencias pase por pre-install.sh" mete en
//   el mismo gate dos riesgos distintos: subir de parche un paquete YA auditado
//   no es meter una dependencia NUEVA. Hacer caro lo barato termina siempre en
//   saltarse el gate.
//
//   Este script separa las dos clases con un criterio mecanico: compara los
//   NOMBRES de paquete del lockfile contra la rama base y FALLA si aparece uno
//   que no estaba. Un bump de version de algo conocido cruza en segundos; una
//   dependencia nueva rompe el build y obliga a la auditoria plena de N14.
//
//   Convierte la exencion en algo VERIFICABLE en vez de prometido, que es la
//   diferencia entre un regimen declarado y uno asumido (`P15`).
//
// COMO SE APRUEBA UNA DEPENDENCIA NUEVA
//   1. Auditarla con el canonico:
//        Skills/00-operativos/security-audit/scripts/pre-install.sh npm <paquete>
//      (leyendo la salida CRUDA — su semaforo no es de fiar, ver
//       SECAUDIT-REPORTE-SEVERIDAD-FALSA-01) mas OSV.dev y GitHub Advisories.
//   2. Anotarla en scripts/deps-auditadas.txt con la referencia de esa auditoria.
//   El gate deja de fallar. La auditoria queda escrita, no prometida.
//
// EL CONTROL POSITIVO NO ES ADORNO
//   La primera version de este chequeo, escrita a mano el 2026-09-08, dijo
//   "0 nuevos, 0 retirados" porque su expresion regular no casaba NADA. Una
//   salida indistinguible de "no hubo cambios". Por eso aqui el script EXIGE
//   haber extraido un minimo de paquetes de ambos lados antes de creerle al
//   diff: un gate que pasa cuando esta roto no protege nada.
// =============================================================================

import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const LOCKFILE = "pnpm-lock.yaml";
const ALLOWLIST = join(RAIZ, "scripts/deps-auditadas.txt");

// Si el extractor encuentra menos que esto, se asume ROTO y se falla. El repo
// ronda los 105 paquetes; 50 deja margen para una poda agresiva sin volverse
// un umbral que nunca dispara.
const MINIMO_PAQUETES = 50;

/**
 * Entradas del lockfile v9: dos espacios, `nombre@version`, dos puntos. El
 * scope va entrecomillado ('@img/sharp-darwin-arm64@0.35.4':). Se queda el
 * NOMBRE, nunca la version: este gate pregunta que ENTRO, no que subio.
 */
const ENTRADA = /^ {2}'?((?:@[^/@']+\/)?[^@'/][^@']*)@\d[^:']*'?:$/;

function nombresDe(texto, procedencia) {
  const nombres = new Set();
  for (const linea of texto.split("\n")) {
    const m = ENTRADA.exec(linea);
    if (m) nombres.add(m[1]);
  }
  if (nombres.size < MINIMO_PAQUETES) {
    throw new Error(
      `El extractor encontro ${nombres.size} paquetes en ${procedencia}, menos de ${MINIMO_PAQUETES}.\n` +
        `Eso NO significa "no hay dependencias": significa que este gate esta roto y no puede\n` +
        `distinguir un lockfile limpio de uno que no supo leer. Se falla a proposito.`,
    );
  }
  return nombres;
}

function lockfileDeRef(ref) {
  try {
    return execFileSync("git", ["show", `${ref}:${LOCKFILE}`], {
      cwd: RAIZ,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch {
    throw new Error(
      `No se pudo leer ${LOCKFILE} en la referencia \`${ref}\`.\n` +
        `En CI hay que traer la rama base antes:  git fetch --no-tags --depth=1 origin <base>`,
    );
  }
}

/** Paquetes ya auditados a mano. Una linea por paquete; `#` comenta. */
function auditados() {
  if (!existsSync(ALLOWLIST)) return new Map();
  const mapa = new Map();
  for (const linea of readFileSync(ALLOWLIST, "utf8").split("\n")) {
    const limpia = linea.trim();
    if (!limpia || limpia.startsWith("#")) continue;
    const [nombre, ...resto] = limpia.split(/\s{2,}|\t/);
    mapa.set(nombre.trim(), resto.join(" ").trim() || "(sin referencia de auditoria)");
  }
  return mapa;
}

// ─── Entrada ─────────────────────────────────────────────────────────────────

const base = process.argv[2] || "origin/main";

try {
  const antes = nombresDe(lockfileDeRef(base), `la rama base (${base})`);
  const ahora = nombresDe(readFileSync(join(RAIZ, LOCKFILE), "utf8"), "el lockfile de trabajo");

  console.log(`Cadena de suministro — nombres de paquete contra \`${base}\``);
  console.log(`  base: ${antes.size} paquetes · ahora: ${ahora.size} paquetes  (control positivo OK)\n`);

  const nuevos = [...ahora].filter((n) => !antes.has(n)).sort();
  const retirados = [...antes].filter((n) => !ahora.has(n)).sort();
  const exentos = auditados();

  // Los retirados NO fallan: quitar una dependencia reduce la superficie.
  if (retirados.length) {
    console.log(`Paquetes retirados (informativo, no falla): ${retirados.length}`);
    for (const n of retirados) console.log(`  − ${n}`);
    console.log("");
  }

  if (!nuevos.length) {
    console.log("Cero paquetes nuevos. Ningun nombre entro a la cadena de suministro.");
    process.exit(0);
  }

  const sinAuditar = nuevos.filter((n) => !exentos.has(n));
  const cubiertos = nuevos.filter((n) => exentos.has(n));

  if (cubiertos.length) {
    console.log(`Paquetes nuevos YA auditados (${cubiertos.length}):`);
    for (const n of cubiertos) console.log(`  ✅ ${n}  ← ${exentos.get(n)}`);
    console.log("");
  }

  if (!sinAuditar.length) {
    console.log("Todo lo que entro esta auditado y declarado.");
    process.exit(0);
  }

  console.log(`❌ ${sinAuditar.length} paquete(s) NUEVO(S) sin auditar:`);
  for (const n of sinAuditar) console.log(`   + ${n}`);
  console.log("");
  console.log("N14 exige auditar toda dependencia externa ANTES de instalarla. Un bump de");
  console.log("version de un paquete que ya estaba NO dispara esto — esto solo salta cuando");
  console.log("entra un nombre que no estaba en la rama base.");
  console.log("");
  console.log("Para desbloquear:");
  console.log("  1. Auditar cada uno con el canonico (leyendo la salida CRUDA, no su semaforo):");
  console.log("       .../security-audit/scripts/pre-install.sh npm <paquete>");
  console.log("     mas OSV.dev y GitHub Security Advisories — las dos bases que N14 pide y");
  console.log("     que el auditor no consulta.");
  console.log("  2. Anotarlo en scripts/deps-auditadas.txt con la referencia de la auditoria.");
  process.exit(1);
} catch (error) {
  console.error(`verificar-deps-nuevas: ${error.message}`);
  process.exit(1);
}
