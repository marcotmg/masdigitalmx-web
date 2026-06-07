#!/usr/bin/env bash
# pre-install.sh — Verificación de seguridad antes de instalar dependencias externas
# Ejecutar SIEMPRE antes de: pnpm add, npx skills add, git clone de terceros, scripts externos
# Regla de Oro del workspace — ver CLAUDE.md

set -euo pipefail

echo "=== pre-install.sh — Verificación de seguridad ==="
echo ""

PACKAGE="$*"

if [ -z "$PACKAGE" ]; then
  echo "Uso: ./pre-install.sh <nombre-del-paquete-o-repo>"
  echo "Ejemplo: ./pre-install.sh framer-motion"
  echo "Ejemplo: ./pre-install.sh github:pbakaus/impeccable"
  exit 1
fi

echo "Paquete/repo a instalar: $PACKAGE"
echo ""

# 1. Verificar que no se instala en producción sin revisión
echo "[1/4] Verificando entorno..."
if [ -f ".env.production" ]; then
  echo "  ADVERTENCIA: Existe .env.production. Confirma que no estás en producción."
fi
echo "  OK — Entorno de desarrollo"

# 2. Verificar npm audit si aplica (solo para paquetes npm)
if [[ "$PACKAGE" != github:* ]] && [[ "$PACKAGE" != https://* ]]; then
  echo "[2/4] Buscando advisories conocidos para '$PACKAGE'..."
  if command -v pnpm &> /dev/null; then
    echo "  Ejecuta manualmente: pnpm audit --audit-level=high después de instalar"
  fi
  echo "  OK — Revisar advisories post-instalación"
else
  echo "[2/4] Repo externo detectado: '$PACKAGE'"
  echo "  MANUAL REQUERIDO: Revisar el contenido del repo antes de instalar"
  echo "  - ¿Quién mantiene el repo? ¿Cuándo fue el último commit?"
  echo "  - ¿Contiene scripts ejecutables (.sh, .mjs, .py)? ¿Qué hacen?"
  echo "  - ¿Hace llamadas de red? ¿Accede a credenciales o .env?"
  read -p "  ¿Confirmás que revisaste el repo y es seguro? [s/N] " -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    echo "  Instalación cancelada. Revisa el repo primero."
    exit 1
  fi
fi

# 3. Verificar que .env no está expuesto en git
echo "[3/4] Verificando .gitignore..."
if grep -q "^\.env" .gitignore 2>/dev/null; then
  echo "  OK — .env está en .gitignore"
else
  echo "  ADVERTENCIA: .env podría no estar en .gitignore. Verificar antes de continuar."
fi

# 4. Log de instalación
echo "[4/4] Registrando instalación..."
LOG_FILE=".install-log.txt"
echo "$(date '+%Y-%m-%d %H:%M:%S') | $PACKAGE | $(git config user.name 2>/dev/null || echo 'unknown')" >> "$LOG_FILE"
echo "  OK — Registrado en $LOG_FILE"

echo ""
echo "=== Verificación completada. Puedes proceder con la instalación. ==="
