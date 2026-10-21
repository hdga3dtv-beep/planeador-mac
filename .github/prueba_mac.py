# Prueba del Planeador instalado en una Mac (GitHub Actions): API, Revisar y Generar la DEMO en sus dos formatos. El texto
# de cada Word se compara con el que sale en Windows (esperado.json, lo calcula empaquetar.py). Solo biblioteca estándar.
import hashlib, json, re, sys, traceback, urllib.request, zipfile
from pathlib import Path

DESTINO, ESPERADO = Path(sys.argv[1]), json.load(open(sys.argv[2], encoding='utf8'))
URL = 'http://127.0.0.1:8765'
DEMO = 'DEMO para video - Comemos sano'
ok = True


def pide(ruta, cuerpo=None):
    req = urllib.request.Request(URL + ruta, data=None if cuerpo is None else json.dumps(cuerpo).encode('utf8'),
                                 headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=600) as r:
        return json.load(r)


def revisa(cond, texto):
    global ok
    ok &= bool(cond)
    print(('::notice::BIEN ' if cond else '::error::MAL ') + texto, flush=True)


def huellas(docx):
    with zipfile.ZipFile(docx) as z:
        return {n: hashlib.sha256(re.sub(r'<[^>]+>', '', z.read(n).decode('utf8')).encode('utf8')).hexdigest()
                for n in z.namelist() if re.match(r'word/(document|header\d)\.xml$', n)}


try:
    d = pide('/api/datos')
    revisa(d['motor'], 'encuentra su motor')
    revisa(d['fmt']['alumnos'] == [] and d['fmt']['nee'] == '', 'el formato no trae alumnos ni NEE')
    revisa(d['guardadas'] == [DEMO], f'solo está la DEMO: {d["guardadas"]}')
    revisa(set(d['programas']) == {'3', '4', '5'}, 'programas de las Fases 3, 4 y 5')
    revisa('app.js' in urllib.request.urlopen(URL + '/').read().decode('utf8'), 'sirve el panel')

    sem = json.load(open(DESTINO / 'planeaciones' / f'{DEMO}.json', encoding='utf8'))
    r = pide('/api/revisar', {'semana': sem})
    revisa(not r['fallas'] and not r['avisos'],
           f'Revisar la DEMO: {len(r["fallas"])} fallas, {len(r["avisos"])} avisos {r["fallas"][:2]} {r["avisos"][:2]}')

    met = d['campos'][sem['campo_central']]['metodologia']
    for formato, clave in (('cedros', 'cedros'), (met, 'metodologia')):
        g = pide('/api/generar', {'nombre': DEMO, 'semana': sem, 'formato': formato})
        revisa(g.get('docx') and not g['fallas'],
               f'Generar ({formato}): Word {"sí" if g.get("docx") else "no"}, {len(g["fallas"])} fallas {g["fallas"][:2]}')
        print(f'::notice::PDF ({formato}): {"sí" if g.get("pdf") else "no"} · avisos: {g["avisos"]}', flush=True)
        if g.get('docx'):
            h = huellas(g['docx'])
            revisa(h == ESPERADO[clave], f'Word ({formato}) con el mismo texto que en Windows'
                   + ('' if h == ESPERADO[clave] else f' → {h} en lugar de {ESPERADO[clave]}'))

    a = pide('/api/abrir', {'ruta': str(DESTINO / 'planeaciones' / f'{DEMO}.docx')})
    revisa(a.get('ok'), f'abrir el Word con el programa de siempre: {a}')
except Exception:
    revisa(False, 'la prueba se cayó: ' + traceback.format_exc().replace('\n', ' | ')[-900:])

sys.exit(0 if ok else 1)
