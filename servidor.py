# -*- coding: utf-8 -*-
"""Planeador · servidor local del panel de planeaciones (6.º A, Cedros del Líbano).

Abre el panel en el navegador (http://127.0.0.1:8765) y usa el motor de la skill planeacion-didactica
(generar.py, verificar.py, exportar.ps1) para revisar, armar el Word en el formato de la titular y exportar a PDF.
Solo escucha en esta computadora (127.0.0.1); no necesita internet ni instalar nada.

Como aplicación (11 oct): `pythonw servidor.py --app` (el ícono «Planeador» del escritorio) abre el panel en su propia
ventana de Edge o Chrome, sin barra de direcciones y sin ventana negra. Si ya estaba abierto, solo abre otra ventana. El
servidor se apaga solo unos minutos después de cerrar la última ventana (el panel avisa cada 30 s que sigue abierto).

En Mac (20 oct, la versión para Mac): la ventana es de Chrome o Edge si están (si no, el navegador de siempre) y el PDF lo
hace Word por AppleScript, o LibreOffice si no hay Word.
"""
import json, os, re, subprocess, sys, tempfile, threading, time, webbrowser
import urllib.request
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlparse, parse_qs

APP = Path(__file__).resolve().parent
WEB = APP / 'web'
GUARDADAS = APP / 'planeaciones'
# El motor: la copia de la carpeta «motor» (la versión para compartir, 19 oct) o, si no hay, la skill planeacion-didactica
SKILL = APP / 'motor' if (APP / 'motor' / 'scripts').exists() else Path.home() / '.claude' / 'skills' / 'planeacion-didactica'
SCRIPTS = SKILL / 'scripts'
FMT = SKILL / 'formatos' / 'cedros-6A.json'
PROGRAMAS = {f: APP / 'datos' / f'programa_fase{f}.json' for f in ('3', '4', '5')}   # programas sintéticos de primaria
PUERTO = 8765
ENV = {**os.environ, 'PYTHONIOENCODING': 'utf-8'}
# Con pythonw (sin consola) los scripts se corren con python.exe y sin abrir ventanas negras
PY = sys.executable[:-len('pythonw.exe')] + 'python.exe' if sys.executable.lower().endswith('pythonw.exe') else sys.executable
SIN_VENTANA = 0x08000000 if os.name == 'nt' else 0          # CREATE_NO_WINDOW
MAC = sys.platform == 'darwin'
APAGAR_TRAS = 180                     # segundos sin noticias de ninguna ventana (modo aplicación)
ULTIMO = [time.time()]                # cuándo llegó la última petición del panel
if sys.stdout is None:                # pythonw: lo que se imprima (y los errores) va a registro.txt
    sys.stdout = sys.stderr = open(APP / 'registro.txt', 'a', encoding='utf8', buffering=1)

sys.path.insert(0, str(SCRIPTS))
from comun import CAMPOS, METODOLOGIAS, TABLA_LIBRO4, MAX_CONSIGNAS_SESION, FORMATOS_MET, LIBRO4_REF  # noqa: E402

EJES = ['Inclusión', 'Pensamiento crítico', 'Interculturalidad crítica', 'Igualdad de género', 'Vida saludable',
        'Apropiación de las culturas a través de la lectura y la escritura', 'Artes y experiencias estéticas']


def nombre_seguro(n):
    n = re.sub(r'[<>:"/\\|?*]', '-', (n or '').strip()) or 'Planeación sin nombre'
    return n[:120]


def datos():
    fmt = json.load(open(FMT, encoding='utf8'))
    return {
        'campos': {k: {'nombre': v[0], 'metodologia': v[1]} for k, v in CAMPOS.items()},
        'metodologias': METODOLOGIAS,
        'libro4': TABLA_LIBRO4,
        'libro4_ref': LIBRO4_REF,
        'formatos_met': FORMATOS_MET,                   # paso 9: un formato por metodología (11 oct)
        'ejes': EJES,
        'programas': {f: json.load(open(r, encoding='utf8')) for f, r in PROGRAMAS.items() if r.exists()},
        'programa': json.load(open(PROGRAMAS['5'], encoding='utf8')),
        'max_consignas': MAX_CONSIGNAS_SESION,
        'fmt': {k: fmt.get(k) for k in ('datos', 'grupo', 'docente_titular', 'practicante', 'nee', 'cuadernos', 'alumnos',
                                        'firmas_plantilla', 'escuela',
                                        'duracion_sesion', 'horario', 'registro_evaluacion')},
        'guardadas': sorted(p.stem for p in GUARDADAS.glob('*.json')),
        'motor': SKILL.exists(),
    }


HISTORIAL = GUARDADAS / '.historial'                # versiones anteriores de cada planeación (menú Archivo → Historial)
MAX_VERSIONES = 30
PUERTO_ACTUAL = [PUERTO]


def archivos_de(nombre):
    """Word y PDF generados de una planeación: el de la Planeación Cedros y el de cada formato de metodología."""
    out = []
    for etq, base in [('Planeación Cedros', nombre)] + [(f['nombre'], f'{nombre} ({f["nombre"]})') for f in FORMATOS_MET.values()]:
        for ext in ('pdf', 'docx'):
            ruta = GUARDADAS / f'{base}.{ext}'
            if ruta.exists():
                out.append({'formato': etq, 'tipo': ext, 'ruta': str(ruta), 'fecha': ruta.stat().st_mtime})
    return out


def recientes():
    """Planeaciones guardadas, de la más reciente a la más vieja, con la fecha de su último guardado y sus archivos."""
    filas = [{'nombre': p.stem, 'fecha': p.stat().st_mtime, 'archivos': archivos_de(p.stem)} for p in GUARDADAS.glob('*.json')]
    return sorted(filas, key=lambda f: -f['fecha'])


def guarda_version(n, semana, panel):
    """Antes de reemplazar una planeación guardada, su versión anterior pasa al historial (solo si cambió algo)."""
    viejo_j, viejo_p = (GUARDADAS / f'{n}.json'), (GUARDADAS / f'{n}.panel')
    if not viejo_j.exists():
        return
    try:
        igual = (json.load(open(viejo_j, encoding='utf8')) == semana and
                 (not viejo_p.exists() or json.load(open(viejo_p, encoding='utf8')) == panel))
    except Exception:
        igual = False
    if igual:
        return
    oculta(HISTORIAL)
    carpeta = HISTORIAL / n
    carpeta.mkdir(parents=True, exist_ok=True)
    marca = time.strftime('%Y-%m-%d %Hh%Mm%Ss', time.localtime(viejo_j.stat().st_mtime))
    (carpeta / f'{marca}.json').write_bytes(viejo_j.read_bytes())
    if viejo_p.exists():
        (carpeta / f'{marca}.panel').write_bytes(viejo_p.read_bytes())
    for vieja in sorted(carpeta.glob('*.json'))[:-MAX_VERSIONES]:
        vieja.unlink()
        (carpeta / f'{vieja.stem}.panel').unlink(missing_ok=True)


PAPELERA = GUARDADAS / '.papelera'                  # lo que él elimina desde Abrir: se puede restaurar
MIS_DATOS = APP / 'mis_datos.json'                  # «Mis datos de la escuela»: paso 1 y alumnos NEE predeterminados


def oculta(carpeta):
    """Crea la carpeta oculta (no estorba entre sus planeaciones)."""
    if not carpeta.exists():
        carpeta.mkdir()
        if os.name == 'nt':
            import ctypes
            ctypes.windll.kernel32.SetFileAttributesW(str(carpeta), 2)


def partes_de(n):
    """Todo lo de una planeación: .json, .panel, sus Word y PDF de cada formato y su carpeta de versiones."""
    bases = [n] + [f'{n} ({f["nombre"]})' for f in FORMATOS_MET.values()]
    out = [GUARDADAS / f'{b}.{ext}' for b in bases for ext in ('json', 'panel', 'docx', 'pdf')]
    return [p for p in out + [HISTORIAL / n] if p.exists()]


def renombrar(n, nuevo):
    n, nuevo = nombre_seguro(n), nombre_seguro((nuevo or '').replace('.', '-'))
    if not (GUARDADAS / f'{n}.json').exists():
        return {'error': 'No encontré esa planeación.'}
    if nuevo == n:
        return {'ok': True, 'nombre': n}
    if (GUARDADAS / f'{nuevo}.json').exists():
        return {'error': f'Ya hay una planeación que se llama «{nuevo}».'}
    for p in partes_de(n):
        destino = HISTORIAL / nuevo if p == HISTORIAL / n else GUARDADAS / (nuevo + p.name[len(n):])
        p.rename(destino)
    return {'ok': True, 'nombre': nuevo}


def eliminar(n):
    """No se borra: todo pasa a la papelera (oculta), en una carpeta con la fecha."""
    n = nombre_seguro(n)
    partes = partes_de(n)
    if not partes:
        return {'error': 'No encontré esa planeación.'}
    oculta(PAPELERA)
    caja = PAPELERA / f'{time.strftime("%Y-%m-%d %Hh%Mm%Ss")} {n}'
    caja.mkdir(parents=True)
    for p in partes:
        p.rename(caja / ('versiones' if p == HISTORIAL / n else p.name))
    (caja / 'nombre.txt').write_text(n, encoding='utf8')
    return {'ok': True}


def papelera():
    if not PAPELERA.exists():
        return []
    out = []
    for c in sorted(PAPELERA.iterdir(), reverse=True):
        if c.is_dir() and (c / 'nombre.txt').exists():
            out.append({'id': c.name, 'nombre': (c / 'nombre.txt').read_text(encoding='utf8'), 'fecha': c.stat().st_mtime})
    return out


def restaurar(ident):
    caja = PAPELERA / nombre_seguro(ident)
    if not (caja / 'nombre.txt').exists():
        return {'error': 'No está en la papelera.'}
    n = (caja / 'nombre.txt').read_text(encoding='utf8')
    nuevo, k = n, 2
    while (GUARDADAS / f'{nuevo}.json').exists():              # si ya hay otra con ese nombre
        nuevo, k = f'{n} (restaurada{" " + str(k - 1) if k > 2 else ""})', k + 1
    for p in caja.iterdir():
        if p.name == 'nombre.txt':
            continue
        if p.name == 'versiones':
            oculta(HISTORIAL)
            p.rename(HISTORIAL / nuevo)
        else:
            p.rename(GUARDADAS / (nuevo + p.name[len(n):]))
    (caja / 'nombre.txt').unlink()
    caja.rmdir()
    return {'ok': True, 'nombre': nuevo}


def versiones(n):
    carpeta = HISTORIAL / nombre_seguro(n)
    return [{'version': p.stem, 'fecha': p.stat().st_mtime} for p in sorted(carpeta.glob('*.json'), reverse=True)] \
        if carpeta.exists() else []


def corre(args, **kw):
    r = subprocess.run(args, capture_output=True, text=True, encoding='utf-8', errors='replace', env=ENV,
                       creationflags=SIN_VENTANA, **kw)
    return r.returncode, (r.stdout or '') + (r.stderr or '')


# Word para Mac por AppleScript (20 oct). La primera vez macOS pregunta si el Planeador puede controlar Word, y Word pide
# permiso para la carpeta «planeaciones». Si Word no estaba abierto, se cierra al terminar.
WORD_MAC = '''on run argv
    set entrada to (POSIX file (item 1 of argv)) as alias
    set salida to (POSIX file (item 2 of argv)) as text
    set yaAbierto to application "Microsoft Word" is running
    with timeout of 300 seconds
        tell application "Microsoft Word"
            open entrada
            set doc to active document
            save as doc file name salida file format format PDF
            close doc saving no
            if not yaAbierto then quit saving no
        end tell
    end timeout
end run
'''


def exporta_pdf(docx, pdf):
    """El PDF del Word. Windows: Word por COM (exportar.ps1). Mac: Word por AppleScript o, sin Word, LibreOffice.
    Devuelve lo que dijo el programa, para el aviso si el PDF no salió."""
    try:
        if os.name == 'nt':
            return corre(['powershell', '-NoProfile', '-ExecutionPolicy', 'Bypass', '-File',
                          str(SCRIPTS / 'exportar.ps1'), '-in', str(docx), '-out', str(pdf)])[1]
        if MAC and Path('/Applications/Microsoft Word.app').exists():
            return corre(['osascript', '-', str(docx), str(pdf)], input=WORD_MAC, timeout=330)[1]
        soffice = Path('/Applications/LibreOffice.app/Contents/MacOS/soffice')
        if MAC and soffice.exists():
            return corre([str(soffice), '--headless', '--convert-to', 'pdf', '--outdir', str(pdf.parent), str(docx)],
                         timeout=300)[1]
    except subprocess.TimeoutExpired:
        return 'Word tardó demasiado (¿quedó esperando un permiso?)'
    return 'no encontré Microsoft Word ni LibreOffice; abre el Word y guárdalo como PDF'


def lee_verificacion(salida):
    fallas = [l[6:].strip() for l in salida.splitlines() if l.startswith('FALLA')]
    avisos = [l[6:].strip() for l in salida.splitlines() if l.startswith('AVISO')]
    return fallas, avisos


def revisar(semana, docx=None):
    with tempfile.NamedTemporaryFile('w', suffix='.json', delete=False, encoding='utf8') as f:
        json.dump(semana, f, ensure_ascii=False)
        tmp = f.name
    try:
        args = [PY, str(SCRIPTS / 'verificar.py'), str(FMT), tmp] + ([str(docx)] if docx else [])
        code, out = corre(args)
        fallas, avisos = lee_verificacion(out)
        if code not in (0, 1) or (code == 1 and not fallas):          # el verificador se cayó
            fallas = ['El verificador no pudo leer la planeación: ' + out.strip()[-600:]]
        return {'fallas': fallas, 'avisos': avisos}
    finally:
        os.unlink(tmp)


def generar(nombre, semana, formato='cedros'):
    """formato: 'cedros' (la plantilla de la titular) o la clave de la metodología del campo central (11 oct); el de una
    metodología sale con su nombre al final: «… (Indagación STEAM).docx»."""
    nombre = nombre_seguro(nombre)
    base = GUARDADAS / nombre
    json_ruta = base.with_suffix('.json')
    json.dump(semana, open(json_ruta, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
    if formato == 'cedros':
        script, salida = 'generar.py', nombre
    else:
        propia = CAMPOS.get(semana.get('campo_central'), ('', ''))[1]
        if formato != propia:
            return {'fallas': [f'El formato «{FORMATOS_MET.get(formato, {}).get("nombre", formato)}» es de otra metodología; '
                               'elige el de tu metodología o la Planeación Cedros (paso 9).'], 'avisos': []}
        script, salida = 'generar_metodologia.py', f'{nombre} ({FORMATOS_MET[formato]["nombre"]})'
    docx, pdf = GUARDADAS / (salida + '.docx'), GUARDADAS / (salida + '.pdf')
    code, out = corre([PY, str(SCRIPTS / script), str(FMT), str(json_ruta), str(docx)])
    if code != 0:
        return {'fallas': ['No se pudo armar el Word: ' + out.strip()[-800:]], 'avisos': []}
    res = revisar(semana, docx)
    out = exporta_pdf(docx, pdf)
    res['docx'] = str(docx)
    res['pdf'] = str(pdf) if pdf.exists() else None
    if not pdf.exists():
        res['avisos'].append('No salió el PDF: ' + out.strip()[-300:])
    return res


class Manejador(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=str(WEB), **k)

    def log_message(self, *a):
        pass

    def handle_one_request(self):                       # cualquier petición dice que una ventana sigue abierta
        ULTIMO[0] = time.time()
        super().handle_one_request()

    def end_headers(self):                              # sin caché: cada cambio al panel se ve con solo abrirlo
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def responde(self, obj, code=200):
        cuerpo = json.dumps(obj, ensure_ascii=False).encode('utf8')
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(cuerpo)))
        self.end_headers()
        self.wfile.write(cuerpo)

    def do_GET(self):
        u = urlparse(self.path)
        if u.path == '/api/datos':
            return self.responde(datos())
        if u.path == '/api/latido':                     # el panel avisa que sigue abierto (modo aplicación)
            return self.responde({'ok': True, 'planeador': True})
        if u.path == '/api/recientes':                  # menú Archivo: Inicio, Abrir, Información
            return self.responde({'recientes': recientes(), 'carpeta': str(GUARDADAS)})
        if u.path == '/api/misdatos':                   # menú Archivo: Mis datos de la escuela
            hay = MIS_DATOS.exists()
            return self.responde({'misdatos': json.load(open(MIS_DATOS, encoding='utf8')) if hay else None,
                                  'fecha': MIS_DATOS.stat().st_mtime if hay else None})
        if u.path == '/api/papelera':
            return self.responde({'papelera': papelera()})
        if u.path == '/api/historial':                  # menú Archivo: Historial
            return self.responde({'versiones': versiones(parse_qs(u.query).get('nombre', [''])[0])})
        if u.path == '/api/planeacion':
            n = nombre_seguro(parse_qs(u.query).get('nombre', [''])[0])
            ruta = (GUARDADAS / n).with_suffix('.json')
            if not ruta.exists():
                return self.responde({'error': 'no existe'}, 404)
            return self.responde(json.load(open(ruta, encoding='utf8')))
        return super().do_GET()

    def do_POST(self):
        largo = int(self.headers.get('Content-Length', 0))
        cuerpo = json.loads(self.rfile.read(largo).decode('utf8') or '{}')
        ruta = urlparse(self.path).path
        try:
            if ruta == '/api/guardar':
                n = nombre_seguro(cuerpo.get('nombre'))
                guarda_version(n, cuerpo['semana'], cuerpo.get('panel', {}))
                json.dump(cuerpo['semana'], open((GUARDADAS / n).with_suffix('.json'), 'w', encoding='utf8'),
                          ensure_ascii=False, indent=1)
                json.dump(cuerpo.get('panel', {}), open((GUARDADAS / n).with_suffix('.panel'), 'w', encoding='utf8'),
                          ensure_ascii=False)
                return self.responde({'ok': True, 'nombre': n})
            if ruta == '/api/panel':                     # estado completo del panel (para volver a abrirlo igual)
                p = (GUARDADAS / nombre_seguro(cuerpo.get('nombre'))).with_suffix('.panel')
                return self.responde(json.load(open(p, encoding='utf8')) if p.exists() else {})
            if ruta == '/api/revisar':
                return self.responde(revisar(cuerpo['semana']))
            if ruta == '/api/generar':
                return self.responde(generar(cuerpo.get('nombre'), cuerpo['semana'], cuerpo.get('formato') or 'cedros'))
            if ruta == '/api/misdatos':                  # guardar o quitar «Mis datos de la escuela»
                if cuerpo.get('misdatos'):
                    json.dump(cuerpo['misdatos'], open(MIS_DATOS, 'w', encoding='utf8'), ensure_ascii=False)
                elif MIS_DATOS.exists():
                    MIS_DATOS.unlink()
                return self.responde({'ok': True})
            if ruta == '/api/renombrar':
                return self.responde(renombrar(cuerpo.get('nombre'), cuerpo.get('nuevo')))
            if ruta == '/api/eliminar':
                return self.responde(eliminar(cuerpo.get('nombre')))
            if ruta == '/api/restaurar':
                return self.responde(restaurar(cuerpo.get('id')))
            if ruta == '/api/version':                   # una versión del historial, para abrirla
                n, v = nombre_seguro(cuerpo.get('nombre')), nombre_seguro(cuerpo.get('version'))
                j, p = HISTORIAL / n / f'{v}.json', HISTORIAL / n / f'{v}.panel'
                if not j.exists():
                    return self.responde({'error': 'no existe'}, 404)
                return self.responde({'semana': json.load(open(j, encoding='utf8')),
                                      'panel': json.load(open(p, encoding='utf8')) if p.exists() else {}})
            if ruta == '/api/ventana':                   # Archivo → Nuevo: otra ventana del Planeador
                destino = cuerpo.get('ruta', '/')
                if not destino.startswith('/?') and destino != '/':
                    return self.responde({'error': 'ruta no permitida'}, 400)
                abre_ventana(f'http://127.0.0.1:{PUERTO_ACTUAL[0]}{destino}')
                return self.responde({'ok': True})
            if ruta == '/api/abrir':
                p = Path(cuerpo.get('ruta', '')).resolve()
                if GUARDADAS.resolve() in (p, *p.parents) and p.exists():
                    if os.name == 'nt':
                        os.startfile(str(p))
                    else:                               # Mac (20 oct): con el programa de siempre
                        subprocess.Popen(['open' if MAC else 'xdg-open', str(p)])
                    return self.responde({'ok': True})
                return self.responde({'error': 'ruta no permitida'}, 400)
        except Exception as e:                          # se muestra en el panel, no se cae el servidor
            return self.responde({'fallas': [f'Error del servidor: {e}'], 'avisos': []}, 500)
        return self.responde({'error': 'no encontrado'}, 404)


def navegador_app():
    """Ruta de Edge o de Chrome (primero el navegador predeterminado), para abrir el panel en su propia ventana. En Mac,
    la de Google Chrome.app o Microsoft Edge.app."""
    if MAC:
        for nombre in ('Google Chrome', 'Microsoft Edge'):
            for raiz in (Path('/Applications'), Path.home() / 'Applications'):
                if (raiz / f'{nombre}.app').exists():
                    return str(raiz / f'{nombre}.app')
        return None
    if os.name != 'nt':
        return None
    import winreg
    orden = ['msedge.exe', 'chrome.exe']
    try:
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, r'Software\Microsoft\Windows\Shell\Associations\UrlAssociations'
                            r'\http\UserChoice') as k:
            if winreg.QueryValueEx(k, 'ProgId')[0].lower().startswith('chrome'):
                orden.reverse()
    except OSError:
        pass
    for exe in orden:
        for raiz in (winreg.HKEY_CURRENT_USER, winreg.HKEY_LOCAL_MACHINE):
            try:
                with winreg.OpenKey(raiz, r'SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths' + '\\' + exe) as k:
                    ruta = winreg.QueryValue(k, None)
                if ruta and os.path.exists(ruta):
                    return ruta
            except OSError:
                pass
    return None


def abre_ventana(url):
    """Ventana propia, sin pestañas ni barra de direcciones (--app); si no hay Edge ni Chrome, el navegador de siempre."""
    exe = navegador_app()
    if exe and MAC:                                     # por LaunchServices: Chrome no queda colgado del servidor
        subprocess.Popen(['open', '-na', exe, '--args', f'--app={url}'])
    elif exe:
        subprocess.Popen([exe, f'--app={url}', '--start-maximized'], creationflags=SIN_VENTANA)
    else:
        webbrowser.open(url)


def ya_abierto(puerto):
    """True si el Planeador ya está sirviendo en ese puerto (otra ventana abierta)."""
    try:
        with urllib.request.urlopen(f'http://127.0.0.1:{puerto}/api/latido', timeout=2) as r:
            return json.load(r).get('planeador') is True
    except Exception:
        return False


def vigila(srv):
    """Modo aplicación: apaga el servidor cuando ninguna ventana lo ha usado en APAGAR_TRAS segundos."""
    while True:
        time.sleep(15)
        if time.time() - ULTIMO[0] > APAGAR_TRAS:
            print(time.strftime('%d-%m %H:%M'), 'sin ventanas abiertas: se apaga')
            srv.shutdown()
            return


class Servidor(ThreadingHTTPServer):
    # 19 oct: con SO_REUSEADDR (el valor de HTTPServer), Windows deja abrir un segundo Planeador en el mismo puerto en
    # lugar de dar error, y no se sabe cuál contesta; sin él, el segundo pasa al puerto siguiente
    allow_reuse_address = os.name != 'nt'


def main():
    GUARDADAS.mkdir(exist_ok=True)
    app = '--app' in sys.argv
    if app and ya_abierto(PUERTO):                      # ya estaba abierto: solo otra ventana
        return abre_ventana(f'http://127.0.0.1:{PUERTO}/')
    puerto = PUERTO
    while True:
        try:
            srv = Servidor(('127.0.0.1', puerto), Manejador)
            break
        except OSError:
            puerto += 1
    url = f'http://127.0.0.1:{puerto}/'
    PUERTO_ACTUAL[0] = puerto
    print(time.strftime('%d-%m %H:%M') if app else '', f'Planeador abierto en {url}' + ('' if app else '  (cierra esta ventana para apagarlo)'))
    if app:
        threading.Thread(target=vigila, args=(srv,), daemon=True).start()
    if '--sin-navegador' not in sys.argv:
        threading.Timer(0.6, lambda: abre_ventana(url) if app else webbrowser.open(url)).start()
    srv.serve_forever()


if __name__ == '__main__':
    main()
