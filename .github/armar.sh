#!/bin/bash
# Arma dist/Planeador-Mac.zip en una Mac: la app y Python portátil para chip Apple (python-arm64) y para Intel
# (python-x86_64). Python: python-build-standalone, versión fija y con la huella SHA-256 que publica el proyecto.
set -euo pipefail
PBS=20261009
PYV=3.13.16
cd "$(dirname "$0")/.."
rm -rf dist
mkdir -p dist/Planeador dist/descargas
cp -R servidor.py planeador.icns LEEME.txt Instalar.command web motor datos planeaciones dist/Planeador/
chmod +x dist/Planeador/Instalar.command

baja() {   # arquitectura, huella SHA-256, carpeta
  local f="cpython-${PYV}+${PBS}-$1-apple-darwin-install_only_stripped.tar.gz"
  curl -sSfL -o "dist/descargas/$f" \
    "https://github.com/astral-sh/python-build-standalone/releases/download/${PBS}/${f/+/%2B}"
  echo "$2  dist/descargas/$f" | shasum -a 256 -c -
  mkdir -p "dist/tmp-$1"
  tar -xzf "dist/descargas/$f" -C "dist/tmp-$1"
  mv "dist/tmp-$1/python" "dist/Planeador/$3"
  rmdir "dist/tmp-$1"
  local py="dist/Planeador/$3" lib="dist/Planeador/$3/lib/python3.13"
  # lo que el Planeador no usa: pruebas de Python, IDLE, Tk, pip, cabeceras y manuales
  rm -rf "$lib/test" "$lib/idlelib" "$lib/tkinter" "$lib/turtledemo" "$lib/ensurepip" \
         "$lib/site-packages/"pip* "$lib/lib-dynload/"_tkinter* \
         "$py/lib/"libtcl* "$py/lib/"libtk* "$py/lib/"tcl* "$py/lib/"tk* "$py/lib/"itcl* "$py/lib/"thread* \
         "$py/include" "$py/share"
  "$py/bin/python3" -c 'import sys, http.server, json, zipfile, xml.sax.saxutils; print(sys.version)' \
    || [ "$(uname -m)" != "${1/aarch64/arm64}" ]     # el de la otra arquitectura no corre aquí
}
baja aarch64 11785155d0f70e634178219c20925d8f20be00a3da4684fc4f5019dd15602ef7 python-arm64
baja x86_64  bd085c51e960f00ee33b630e2b13ac90fe90cdc3da25a0f0bc0719b1294920bf python-x86_64

(cd dist && ditto -c -k --sequesterRsrc --keepParent Planeador Planeador-Mac.zip)
du -sh dist/Planeador/python-* dist/Planeador-Mac.zip
