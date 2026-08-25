#!/usr/bin/env bash
# =============================================================================
# check-xss-surface.sh — inventario de la SUPERFICIE de inyeccion del sitio.
#
# POR QUE EXISTE
#   La CSP efectiva (fase 2) lleva 'unsafe-inline' en script-src, asi que NO
#   protege contra XSS por script inline. La proteccion real de este sitio es
#   otra y es mas fuerte: NO HAY DONDE INYECTAR. Auditado 2026-08-24 —
#   0 usos de innerHTML/eval/new Function/document.write, 0 renderizados de
#   searchParams, 1 dangerouslySetInnerHTML con una constante del codigo, y
#   el unico input de usuario (formulario) va server-side con Zod + Turnstile
#   + rate-limit y su respuesta nunca vuelve al DOM como HTML.
#
#   Pero "hoy esta limpio" no es una garantia: es una foto. Este script la
#   convierte en un invariante — si la superficie CRECE, el CI falla y obliga
#   a mirarlo, en vez de que aparezca un punto de inyeccion sin que nadie note.
#
#   Es la misma leccion que produjo esta tanda de trabajo: un instrumento que
#   existe pero nadie invoca no protege de nada. Este corre en cada PR.
#
# COBERTURA DECLARADA
#   Reconoce por patron de texto sobre app/, components/ y lib/. NO es analisis
#   estatico: una construccion equivalente escrita de otra forma (p.ej. acceso
#   dinamico por corchetes) NO se detecta. Es una red, no una prueba.
#
# COMO ACTUALIZAR LA LINEA BASE
#   Si un cambio agrega legitimamente un uso, editar BASELINE_* abajo EN EL
#   MISMO PR, con el motivo. Subir el numero debe ser un acto deliberado y
#   revisable, no un efecto colateral.
# =============================================================================
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

DIRS="app components lib"

# Linea base declarada, medida 2026-08-24.
BASELINE_DANGEROUS=1   # app/layout.tsx — JSON-LD Organization, constante del codigo, con `<` escapado
BASELINE_PELIGROSOS=0  # innerHTML / eval( / new Function( / document.write
BASELINE_SEARCHPARAMS=0 # renderizado de parametros de URL

cuenta() { grep -rnE "$1" $DIRS 2>/dev/null | grep -v node_modules | wc -l | tr -d ' '; }

D=$(cuenta "dangerouslySetInnerHTML")
P=$(cuenta "\.innerHTML|\beval\(|new Function\(|document\.write")
S=$(cuenta "useSearchParams|searchParams")

FALLA=0
fila() {
  local nombre="$1" actual="$2" base="$3"
  if [ "$actual" -gt "$base" ]; then
    printf "  ❌ %-28s %s (linea base: %s) — SUPERFICIE CRECIO\n" "$nombre" "$actual" "$base"
    FALLA=1
  elif [ "$actual" -lt "$base" ]; then
    printf "  ✅ %-28s %s (linea base: %s) — bajo; actualiza la linea base\n" "$nombre" "$actual" "$base"
  else
    printf "  ✅ %-28s %s\n" "$nombre" "$actual"
  fi
}

echo "Superficie de inyeccion XSS — $DIRS"
echo
fila "dangerouslySetInnerHTML" "$D" "$BASELINE_DANGEROUS"
fila "innerHTML/eval/Function" "$P" "$BASELINE_PELIGROSOS"
fila "searchParams renderizados" "$S" "$BASELINE_SEARCHPARAMS"
echo

if [ "$FALLA" -eq 1 ]; then
  echo "La superficie de inyeccion crecio respecto a la linea base declarada."
  echo
  grep -rnE "dangerouslySetInnerHTML|\.innerHTML|\beval\(|new Function\(|document\.write|useSearchParams|searchParams" $DIRS 2>/dev/null | grep -v node_modules | sed 's/^/    /'
  echo
  echo "Que hacer: revisar si el uso nuevo mete datos NO controlados en el DOM."
  echo "Si es legitimo, subir la linea base en este mismo script y en este mismo PR,"
  echo "anotando el motivo. Nunca subirla para 'que pase el CI'."
  echo
  echo "Contexto: la CSP del sitio lleva 'unsafe-inline' en script-src, asi que"
  echo "NO cubre este agujero. Ver next.config.ts y CSP-SCRIPT-SRC-ESTRICTO-01."
  exit 1
fi

echo "Superficie sin cambios respecto a la linea base declarada."
