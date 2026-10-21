#!/bin/bash
# Prueba dist/Planeador-Mac.zip como lo haría el profesor: lo descomprime como el Finder, le pone la marca de «bajado de
# internet», lo instala, abre la app desde LaunchServices y revisa y genera la DEMO (prueba_mac.py).
set -euo pipefail
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
T="$(mktemp -d)"
cd "$T"
ditto -x -k "$RAIZ/dist/Planeador-Mac.zip" .
find Planeador -type f -exec xattr -w com.apple.quarantine "0083;$(printf %x "$(date +%s)");Safari;" {} +
echo "Archivos con la marca de internet: $(xattr -r Planeador | grep -c com.apple.quarantine)"

export PLANEADOR_DESTINO="$T/casa/Planeador" PLANEADOR_APP="$T/casa/Applications/Planeador.app" PLANEADOR_PRUEBA=1
bash Planeador/Instalar.command
if xattr -r "$PLANEADOR_DESTINO" "$PLANEADOR_APP" 2>/dev/null | grep -q com.apple.quarantine; then
  echo "::error::Después de instalar quedaron archivos con la marca de internet"
  exit 1
fi
plutil -lint "$PLANEADOR_APP/Contents/Info.plist"
echo "::notice::Instalado en Mac con $(uname -m): $("$PLANEADOR_DESTINO/python/bin/python3" -c 'import sys; print(sys.version.split()[0])'); sin marca de internet"

# La app, como si se abriera desde el Dock
open "$PLANEADOR_APP"
for _ in $(seq 1 60); do
  curl -sf http://127.0.0.1:8765/api/latido >/dev/null && break
  sleep 1
done
if ! curl -sf http://127.0.0.1:8765/api/latido >/dev/null; then
  echo "::error::La app no encendió el Planeador"
  cat "$PLANEADOR_DESTINO/registro.txt" 2>/dev/null || true
  exit 1
fi
echo "::notice::La app encendió el Planeador: $(tail -1 "$PLANEADOR_DESTINO/registro.txt")"
"$PLANEADOR_DESTINO/python/bin/python3" "$RAIZ/.github/prueba_mac.py" "$PLANEADOR_DESTINO" "$RAIZ/.github/esperado.json"
