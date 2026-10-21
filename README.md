# Planeador para Mac

[![Pruebas en Mac](https://github.com/hdga3dtv-beep/planeador-mac/actions/workflows/mac.yml/badge.svg)](https://github.com/hdga3dtv-beep/planeador-mac/actions/workflows/mac.yml)

Panel para armar planeaciones didácticas de primaria (Fases 3, 4 y 5 de la NEM) y sacarlas en Word y PDF.
Funciona en tu Mac, sin internet y sin cuentas: lo que escribes no sale de tu equipo.

¿Tienes Windows? Usa la otra versión: [planeador](https://github.com/hdga3dtv-beep/planeador).

## Descargar

**[⬇ Descargar el Planeador para Mac (Planeador-Mac.zip)](https://github.com/hdga3dtv-beep/planeador-mac/releases/latest/download/Planeador-Mac.zip)**

1. Safari lo descomprime solo (si no, doble clic en `Planeador-Mac.zip`): sale la carpeta **Planeador** en Descargas.
2. Doble clic en **Instalar.command**. La primera vez macOS no lo deja abrir porque no viene de la App Store:
   - **macOS 15 o más nuevo:** pica **Listo**, abre *Configuración del Sistema → Privacidad y seguridad* y pica
     **Abrir igualmente** junto al aviso de *Instalar.command*.
   - **macOS 14 o anterior:** Control + clic en *Instalar.command* → **Abrir** → **Abrir**.
   - O, sin avisos, en Terminal: `bash ~/Downloads/Planeador/Instalar.command`
3. Queda en `~/Planeador`, con la app **Planeador** en tu carpeta Aplicaciones. Arrástrala al Dock.

Para actualizarlo, descarga otra vez y vuelve a abrir **Instalar.command**: tus planeaciones y tus datos se quedan.

## Qué hace

- Eliges el campo formativo central (la metodología se elige sola), los contenidos y PDA del programa sintético
  oficial 2024, los ejes articuladores y los momentos o etapas de la metodología, y los repartes en la semana.
- **Revisar** busca errores antes de entregar: contenidos y PDA que no son textuales del programa, momentos fuera de
  orden, sesiones sin consignas, firmas que faltan…
- **Generar Word y PDF** la arma en la *Planeación Cedros* (el formato de la Esc. Prim. Urbana 136 «Cedros del Líbano»)
  o en el formato de su metodología (ABPC, STEAM, ABP o Aprendizaje Servicio).
- Guarda versiones anteriores, borradores y una papelera, por si algo se pierde.

## Qué necesita

- macOS 11 (Big Sur) o más nuevo, con chip Apple o Intel.
- Microsoft Word para el PDF (la primera vez, macOS pregunta si el Planeador puede usarlo: **Aceptar**).
  Sin Word también sirve LibreOffice; sin ninguno, el Planeador hace el `.docx`.
- Nada más: `Planeador-Mac.zip` trae Python 3.13 portátil para chip Apple y para Intel.

## Cómo se arma la descarga

Cada cambio que se sube a este repositorio pasa por [la revisión automática](.github/workflows/mac.yml): en Macs de
GitHub (chip Apple e Intel) se arma `Planeador-Mac.zip` con el Python portátil de
[python-build-standalone](https://github.com/astral-sh/python-build-standalone) (versión fija y con su huella
SHA-256), se descomprime con la marca de «bajado de internet», se instala, se abre la app, se revisa y se genera la DEMO.
Solo si todo pasa, se publica como descarga en *Releases*.

## Carpetas

| Carpeta o archivo | Qué es |
|---|---|
| `servidor.py` | El programa: un servidor que solo escucha en tu Mac (127.0.0.1) |
| `web/` | El panel (página, estilos, lógica, imágenes y letras) |
| `motor/` | Arma y revisa el Word (`generar.py`, `verificar.py`) y el formato de Cedros |
| `datos/` | Contenidos y PDA de los programas sintéticos 2024 de las Fases 3, 4 y 5 |
| `planeaciones/` | Lo que guardas y generas (aquí solo viene la DEMO, con datos ficticios) |
| `Instalar.command` | Lo copia a `~/Planeador` y crea la app |
| `.github/` | La revisión automática que arma, prueba y publica la descarga |
