#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# pre-install.sh — Auditoría previa a instalación de paquetes
# Protocolo-Claude Regla #11 — +Digital MX
# Uso: ./pre-install.sh npm <paquete> [--open]
# ═══════════════════════════════════════════════════════════════

set -uo pipefail

SOCKET_URL="https://socket.dev/npm/package"
NPM_REGISTRY="https://registry.npmjs.org"
MIN_AGE_DAYS=1
OPEN_BROWSER=false

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; BOLD='\033[1m'; NC='\033[0m'

WARNINGS=0; FAILURES=0

if [ $# -lt 2 ]; then
    echo "Uso: $0 npm|pip|docker <paquete> [--open]"
    exit 1
fi

ECOSYSTEM="$1"; PACKAGE="$2"; shift 2
for arg in "$@"; do [[ "$arg" == "--open" ]] && OPEN_BROWSER=true; done

pass()  { echo -e "  ${GREEN}✅ $1${NC}"; }
warn()  { echo -e "  ${YELLOW}⚠️  $1${NC}"; WARNINGS=$((WARNINGS+1)); }
fail()  { echo -e "  ${RED}🔴 $1${NC}"; FAILURES=$((FAILURES+1)); }
info()  { echo -e "  ${BLUE}ℹ  $1${NC}"; }
header(){ echo -e "\n${BOLD}[$1]${NC} $2"; }

audit_npm() {
    echo ""
    echo -e "${BOLD}╔══════════════════════════════════════════════════╗${NC}"
    echo -e "${BOLD}║  🔍 pre-install audit: ${PACKAGE}${NC}"
    echo -e "${BOLD}╚══════════════════════════════════════════════════╝${NC}"

    header "1/5" "Existencia en registry..."
    PKG_DATA=$(curl -sf "${NPM_REGISTRY}/${PACKAGE}/latest" 2>/dev/null) || {
        fail "Paquete '${PACKAGE}' no encontrado en npm registry"
        resultado; return 1
    }
    pass "Paquete encontrado en npm registry"

    header "2/5" "Metadata..."
    VERSION=$(echo "$PKG_DATA" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('version','?'))" 2>/dev/null || echo "?")
    LICENSE=$(echo "$PKG_DATA" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('license','none'))" 2>/dev/null || echo "none")
    info "Versión latest: ${VERSION}"
    if [[ -z "$LICENSE" || "$LICENSE" == "none" || "$LICENSE" == "null" ]]; then
        warn "Sin licencia declarada"
    else
        pass "Licencia: ${LICENSE}"
    fi

    header "3/5" "Antigüedad de la versión..."
    MODIFIED=$(curl -sf "${NPM_REGISTRY}/${PACKAGE}" 2>/dev/null | \
        python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('time',{}).get('modified',''))" 2>/dev/null || echo "")
    if [[ -n "$MODIFIED" ]]; then
        info "Última modificación: ${MODIFIED}"
        MODIFIED_CLEAN="${MODIFIED%.*}"
        MODIFIED_EPOCH=$(date -j -f "%Y-%m-%dT%H:%M:%S" "$MODIFIED_CLEAN" +%s 2>/dev/null || echo "0")
        AGE_DAYS=$(( ($(date +%s) - MODIFIED_EPOCH) / 86400 ))
        if [[ "$AGE_DAYS" -lt "$MIN_AGE_DAYS" ]]; then
            warn "Publicado hace menos de ${MIN_AGE_DAYS} día — esperar antes de instalar"
        elif [[ "$AGE_DAYS" -lt 7 ]]; then
            warn "Publicado hace ${AGE_DAYS} días — revisar con atención"
        else
            pass "Antigüedad: ${AGE_DAYS} días ✓"
        fi
    else
        warn "No se pudo verificar fecha de publicación"
    fi

    header "4/5" "pnpm info..."
    if command -v pnpm &>/dev/null; then
        PNPM_OUT=$(pnpm info "$PACKAGE" 2>/dev/null) || true
        if [[ -n "$PNPM_OUT" ]]; then
            pass "pnpm info disponible"
            echo "$PNPM_OUT" | grep -E "^(version|license|maintainers|dist-tags\.latest)" | \
                head -6 | while IFS= read -r line; do info "  $line"; done
        else
            warn "pnpm info no retornó datos"
        fi
    else
        warn "pnpm no disponible — instalar: corepack prepare pnpm@latest --activate"
    fi

    header "5/5" "Socket.dev..."
    SOCKET_PKG_URL="${SOCKET_URL}/${PACKAGE}"
    info "URL: ${SOCKET_PKG_URL}"
    if [[ "$OPEN_BROWSER" == true ]]; then
        open "$SOCKET_PKG_URL" 2>/dev/null && pass "Socket.dev abierto — revisar antes de continuar" \
            || info "Abrir manualmente: ${SOCKET_PKG_URL}"
    else
        info "Agregar --open para abrir Socket.dev automáticamente"
    fi

    resultado
}

resultado() {
    echo ""
    echo -e "${BOLD}══════════════════════════════════════════════════${NC}"
    if [[ "$FAILURES" -gt 0 ]]; then
        echo -e "${RED}${BOLD}🔴 FAIL — ${FAILURES} error(es), ${WARNINGS} advertencia(s)${NC}"
        echo -e "${RED}   NO instalar sin resolver los errores${NC}"
        echo -e "${BOLD}══════════════════════════════════════════════════${NC}"
        exit 1
    elif [[ "$WARNINGS" -gt 0 ]]; then
        echo -e "${YELLOW}${BOLD}🟡 WARN — ${WARNINGS} advertencia(s) — revisar antes de instalar${NC}"
        echo -e "${BOLD}══════════════════════════════════════════════════${NC}"
        exit 0
    else
        echo -e "${GREEN}${BOLD}🟢 OK — Sin errores ni advertencias${NC}"
        echo -e "${GREEN}   Proceder: pnpm dlx ${PACKAGE}  o  pnpm add ${PACKAGE}${NC}"
        echo -e "${BOLD}══════════════════════════════════════════════════${NC}"
        exit 0
    fi
}

case "$ECOSYSTEM" in
    npm)    audit_npm ;;
    pip)
        echo -e "${YELLOW}⚠️  pip audit no implementado — usar: pip install safety && safety check${NC}"
        exit 0 ;;
    docker)
        echo -e "${YELLOW}⚠️  docker audit no implementado — usar: docker scout quickview <imagen>${NC}"
        exit 0 ;;
    *)
        echo -e "${RED}Ecosistema no soportado: ${ECOSYSTEM}. Válidos: npm, pip, docker${NC}"
        exit 1 ;;
esac
