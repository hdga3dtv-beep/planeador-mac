#!/bin/bash
# Instalador del Planeador para Mac: lo copia a tu carpeta de inicio (~/Planeador), crea la app «Planeador» en
# ~/Applications y la abre. Para actualizar, se vuelve a abrir con la versión nueva: tus planeaciones se quedan.
# Para probarlo: PLANEADOR_DESTINO, PLANEADOR_APP y PLANEADOR_PRUEBA=1 (no abre nada ni espera Enter).
set -u
ORIGEN="$(cd "$(dirname "$0")" && pwd)"
DESTINO="${PLANEADOR_DESTINO:-$HOME/Planeador}"
APP="${PLANEADOR_APP:-$HOME/Applications/Planeador.app}"
PRUEBA="${PLANEADOR_PRUEBA:-}"

di() { printf '  %s\n' "$1"; }
termina() {
  if [ -z "$PRUEBA" ]; then echo; read -r -p '  Presiona Enter para cerrar esta ventana ' _; fi
  exit "$1"
}

echo
di 'PLANEADOR · instalación'
echo

if [ ! -f "$ORIGEN/servidor.py" ] || [ ! -f "$ORIGEN/motor/scripts/generar.py" ]; then
  di 'Faltan archivos junto al instalador.'
  di 'Primero descomprime Planeador-Mac.zip (doble clic) y abre Instalar en la carpeta que sale.'
  termina 1
fi

# Lo que se bajó de internet trae la marca de cuarentena: se quita para que macOS no lo bloquee cada vez
xattr -dr com.apple.quarantine "$ORIGEN" 2>/dev/null

# 1. Python portátil: el del chip de esta Mac (Apple o Intel)
if [ "$(sysctl -n hw.optional.arm64 2>/dev/null)" = "1" ]; then
  PYDIR=python-arm64; CHIP='chip Apple'
else
  PYDIR=python-x86_64; CHIP='Intel'
fi

# 2. Copia a ~/Planeador (si se corre desde ahí mismo, no hay nada que copiar)
mkdir -p "$DESTINO"
if [ "$(cd "$DESTINO" && pwd -P)" != "$(cd "$ORIGEN" && pwd -P)" ]; then
  if [ ! -x "$ORIGEN/$PYDIR/bin/python3" ]; then
    di "Falta el Python para Mac con $CHIP (carpeta $PYDIR). Vuelve a descargar Planeador-Mac.zip."
    termina 1
  fi
  for c in web motor datos; do                       # el programa: se reemplaza entero
    rm -rf "$DESTINO/$c" && cp -R "$ORIGEN/$c" "$DESTINO/$c"
  done
  rm -rf "$DESTINO/python" && cp -R "$ORIGEN/$PYDIR" "$DESTINO/python"
  for f in servidor.py planeador.icns LEEME.txt Instalar.command; do
    cp "$ORIGEN/$f" "$DESTINO/$f"
  done
  mkdir -p "$DESTINO/planeaciones"                     # lo tuyo: nunca se reemplaza
  for f in "$ORIGEN"/planeaciones/*; do
    [ -e "$DESTINO/planeaciones/$(basename "$f")" ] || cp "$f" "$DESTINO/planeaciones/"
  done
fi
PY="$DESTINO/python/bin/python3"
if ! "$PY" -c 'import http.server, json, zipfile, xml.sax.saxutils' 2>/dev/null; then
  di "El Python del Planeador no arrancó en esta Mac ($CHIP)."
  termina 1
fi
di "Python: listo (portátil, para Mac con $CHIP)"
di "Carpeta: $DESTINO"

# 3. La app «Planeador»: abre el panel en su propia ventana (Chrome o Edge si están; si no, tu navegador)
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources"
cat > "$APP/Contents/Info.plist" <<'PLIST'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleName</key><string>Planeador</string>
  <key>CFBundleDisplayName</key><string>Planeador</string>
  <key>CFBundleIdentifier</key><string>mx.planeador.panel</string>
  <key>CFBundleVersion</key><string>1.0</string>
  <key>CFBundleShortVersionString</key><string>1.0</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>CFBundleExecutable</key><string>Planeador</string>
  <key>CFBundleIconFile</key><string>planeador</string>
  <key>LSUIElement</key><true/>
  <key>NSAppleEventsUsageDescription</key><string>El Planeador usa Microsoft Word para guardar tus planeaciones en PDF.</string>
</dict>
</plist>
PLIST
cat > "$APP/Contents/MacOS/Planeador" <<LANZA
#!/bin/bash
cd "$DESTINO" || exit 1
exec "$PY" -u "$DESTINO/servidor.py" --app >> "$DESTINO/registro.txt" 2>&1
LANZA
chmod +x "$APP/Contents/MacOS/Planeador"
cp "$DESTINO/planeador.icns" "$APP/Contents/Resources/planeador.icns"
touch "$APP"
di "App «Planeador»: en $(dirname "$APP")"

# 4. Word hace el PDF; sin Word (ni LibreOffice), el Planeador solo saca el .docx
if [ -d '/Applications/Microsoft Word.app' ]; then
  di 'Microsoft Word: listo (para el PDF)'
elif [ -d '/Applications/LibreOffice.app' ]; then
  di 'LibreOffice: listo (para el PDF)'
else
  di 'No encontré Microsoft Word: el Planeador hará el Word (.docx), pero no el PDF.'
fi

echo
di 'Todo listo. Para tenerlo a la mano, arrastra «Planeador» de la ventana que se abre al Dock.'
di "Tus planeaciones se guardan en $DESTINO/planeaciones."
if [ -z "$PRUEBA" ]; then
  open -R "$APP"
  open "$APP"
  di 'Abriendo el Planeador…'
fi
termina 0
