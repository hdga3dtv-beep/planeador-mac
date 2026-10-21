# -*- coding: utf-8 -*-
"""Datos fijos y utilidades que comparten generar.py y verificar.py."""
import copy, importlib.util, json, os, re, sys

# Campos formativos: clave -> (nombre como va en la casilla «Campo formativo central», metodología que le corresponde)
CAMPOS = {
    'len': ('Lenguajes', 'ABPC'),
    'spc': ('Saberes y pensamiento científico', 'STEAM'),
    'ens': ('Ética, naturaleza y sociedades', 'ABP'),
    'dhc': ('De lo humano y lo comunitario', 'AS'),
}

# Una sola metodología por planeación: la del campo formativo del contenido central.
# Los momentos son los encabezados de los libros de 6.º verificados en 2026 (edición 2025, misma paginación que 2026).
# Si el proyecto central usa otros nombres en su libro, manda el libro: decláralos en SEMANA['momentos'].
METODOLOGIAS = {
    'ABPC': {'nombre': 'Aprendizaje basado en proyectos comunitarios',
             'momentos': ['Preparación – Identificamos', 'Preparación – Recuperamos', 'Preparación – Planificamos',
                          'Acción – Vayamos y volvamos', 'Acción – Reorientamos y seguimos',
                          'Intervención – Difundamos', 'Intervención – Consideramos', 'Intervención – Avanzamos']},
    'STEAM': {'nombre': 'Aprendizaje basado en indagación (STEAM)',
              'momentos': ['Saberes de nuestra comunidad', 'Indagamos', 'Comprendemos',
                           'Socializamos y aplicamos', 'Reflexionamos el camino andado']},
    'ABP': {'nombre': 'Aprendizaje basado en problemas',
            'momentos': ['Presentamos', 'Recolectamos', 'Formulamos el problema', 'Organizamos la experiencia',
                         'Vivimos la experiencia', 'Valoramos la experiencia']},
    'AS': {'nombre': 'Aprendizaje servicio',
           'momentos': ['Punto de partida', 'Identificamos necesidades para definir el servicio',
                        'Organicemos las actividades', 'Creatividad en marcha',
                        'Valoramos y compartimos nuestros logros']},
}

# Formatos por metodología (Planeador, 11 oct): además de la Planeación Cedros (la plantilla de la titular), cada
# metodología tiene su propio formato, ordenado por sus fases, momentos o etapas y con los nombres que ella usa para las
# casillas (generar_metodologia.py). Casillas: (rótulo, clave de SEMANA['general']). El panel los lee de aquí.
FORMATOS_MET = {
    'ABPC': {'nombre': 'Proyectos comunitarios', 'titulo': 'Proyecto comunitario', 'parte': 'Momento', 'fases': True,
             'campos': [['Problemática o necesidad de la comunidad', 'tema'], ['Pregunta detonadora', 'pregunta'],
                        ['Producto para la comunidad', 'finales'], ['Difusión (evento de cierre)', 'cierre']]},
    'STEAM': {'nombre': 'Indagación STEAM', 'titulo': 'Proyecto de indagación STEAM', 'parte': 'Etapa', 'fases': False,
              'campos': [['Fenómeno o situación a indagar', 'tema'], ['Pregunta de indagación', 'pregunta'],
                         ['Producto', 'finales'], ['Socialización (evento de cierre)', 'cierre']]},
    'ABP': {'nombre': 'Basado en problemas', 'titulo': 'Proyecto de aprendizaje basado en problemas', 'parte': 'Momento',
            'fases': False,
            'campos': [['Problema', 'tema'], ['Pregunta problematizadora', 'pregunta'],
                       ['Propuesta de solución (producto final)', 'finales'], ['Evento de cierre', 'cierre']]},
    'AS': {'nombre': 'Aprendizaje servicio', 'titulo': 'Proyecto de aprendizaje servicio', 'parte': 'Etapa', 'fases': False,
           'campos': [['Necesidad que atiende el servicio', 'tema'], ['Pregunta generadora', 'pregunta'],
                      ['Servicio que se realiza (producto final)', 'finales'], ['Cómo se comparte (evento de cierre)', 'cierre']]},
}
COLOR_CAMPO = {'len': 'D9261C', 'spc': '1F6FC5', 'ens': '1F9A4A', 'dhc': '7A3DB8'}     # los del panel
MARCA_MET = 'formato_metodologia'      # marcador (bookmark) del .docx de un formato de metodología, para verificar.py


def escenario_de(sem):
    """'comunitario, aula': los escenarios de los libros de proyectos que citan las consignas."""
    c = citas_de(sem)
    return ', '.join(ESCENARIO[l] for l in LTG if c.get(l) and l in ESCENARIO)


def productos_de(textos):
    """Lo que va en negritas (**…**) en las consignas: los productos de la sesión."""
    return [p for t in textos for p in re.findall(r'\*\*(.+?)\*\*', t)]


# Libro 4 (SEP, 2013), tabla de la p. 20: técnica -> instrumentos permitidos (nombres como en la tabla)
LIBRO4_REF = ('Técnicas según el libro 4 de la serie Herramientas para la evaluación en educación básica: '
              '«Las estrategias y los instrumentos de evaluación desde el enfoque formativo» (SEP, 2013).')
TABLA_LIBRO4 = {   # nombres EXACTOS de la tabla de la p. 20 (cotejado el 7 oct: «Cuadernos de los alumnos», en plural)
    'observación': ['guía de observación', 'registro anecdótico', 'diario de clase', 'diario de trabajo',
                    'escala de actitudes'],
    'desempeño de los alumnos': ['preguntas sobre el procedimiento', 'cuadernos de los alumnos',
                                 'organizadores gráficos'],
    'análisis del desempeño': ['portafolio', 'rúbrica', 'lista de cotejo'],
    'interrogatorio': ['tipos textuales (debate y ensayo)', 'tipos orales y escritos (pruebas escritas)'],
}
PROHIBIDOS_EVAL = []  # 10 oct: la rúbrica ya se puede; el Planeador es para todo tipo de planeación (antes: ['rúbrica'])


# Casillas «Vinculación» y «Recursos» armadas con lo que citan las consignas y las tareas (10 oct: el Planeador ya no
# tiene esos recuadros; él escribe los libros dentro de las consignas: «Guía Santillana pp. 30», «libro Proyectos
# Comunitarios pp. 15»). Como en su formato: los libros de texto de la SEP van en Vinculación, con su escenario, y la
# Guía Santillana en Recursos.
LIBROS_RECURSOS = ['Guía Santillana', 'Proyectos Comunitarios', 'Proyectos Escolares', 'Proyectos de Aula',
                   'Nuestros saberes', 'Múltiples lenguajes']
_PAG = r'(?:pp?\.|págs?\.|páginas?)\s*(\d+(?:\s*(?:[-–]|,|\by\b|\ba\b)\s*\d+)*)'
_LIB = '(' + '|'.join(map(re.escape, LIBROS_RECURSOS)) + ')'
_PAG_LIBRO = re.compile(_PAG + r'\s+(?:de\s+la|del|de)\s+(?:libro\s+)?' + _LIB)      # «las páginas 196 y 197 del libro …»
_LIBRO_PAG = re.compile(_LIB + r'\s*[,:]?\s*' + _PAG)                                # «Guía Santillana pp. 30»


def _paginas(txt):
    """'196 y 197' -> {196, 197}; '273 a 276' y '228-233' -> el rango completo."""
    out = set()
    for a, b in re.findall(r'(\d+)(?:\s*(?:[-–]|\ba\b)\s*(\d+))?', txt):
        a, b = int(a), int(b or a)
        out.update(range(a, b + 1) if 0 <= b - a < 80 else (a,))
    return out


def _rangos(ps):
    """{30, 31, 37} -> 'pp. 30-31 y 37'; {15} -> 'p. 15'."""
    ps, tramos = sorted(ps), []
    for p in ps:
        if tramos and p == tramos[-1][1] + 1:
            tramos[-1][1] = p
        else:
            tramos.append([p, p])
    partes = [str(a) if a == b else f'{a}-{b}' for a, b in tramos]
    return ('p. ' if len(ps) == 1 else 'pp. ') + lista_es(partes)


LTG = ['Proyectos Comunitarios', 'Proyectos Escolares', 'Proyectos de Aula', 'Nuestros saberes', 'Múltiples lenguajes']
ESCENARIO = {'Proyectos Comunitarios': 'comunitario', 'Proyectos Escolares': 'escolar', 'Proyectos de Aula': 'aula'}


def citas_de(sem):
    """{libro: {páginas}} de lo que citan las consignas y las tareas."""
    por_libro = {}
    textos = [c for s in sem['sesiones'] for m in s['momentos'] for c in m['consignas']] + \
             [s.get('tarea', '') for s in sem['sesiones']]
    for t in textos:
        t = t.replace('**', '')
        for m in _PAG_LIBRO.finditer(t):
            por_libro.setdefault(m.group(2), set()).update(_paginas(m.group(1)))
        for m in _LIBRO_PAG.finditer(t):
            por_libro.setdefault(m.group(1), set()).update(_paginas(m.group(2)))
    return por_libro


def recursos_de(sem):
    """['Guía Santillana: pp. 30-31']: lo que no es libro de texto de la SEP."""
    c = citas_de(sem)
    return [f'{libro}: {_rangos(c[libro])}' for libro in LIBROS_RECURSOS if libro not in LTG and c.get(libro)]


def vinculacion_de(sem):
    """['Proyectos Comunitarios, escenario comunitario: pp. 15 y 196-197.', 'Nuestros saberes: pp. 13-14.']"""
    c = citas_de(sem)
    return [f"{libro}{', escenario ' + ESCENARIO[libro] if libro in ESCENARIO else ''}: {_rangos(c[libro])}."
            for libro in LTG if c.get(libro)]


def con_hojas_eval(sem):
    """Desde el 10 oct él elabora los instrumentos de evaluación por separado: sin 'cotejo' no van indicadores ni hojas
    de evaluación, y la casilla de evaluación solo dice técnica e instrumento. Las planeaciones de antes, con 'cotejo',
    salen como antes."""
    return bool(sem.get('cotejo'))

N_INDICADORES = 10
N_SESIONES = 5
MAX_CONSIGNAS_SESION = 8      # sesiones de 1 h 30 min (nota de la maestra: «piensa más en tu tiempo»)

# Programas sintéticos oficiales de primaria (SEP, 1.ª ed. 2024): Fase 5 descargado el 7 oct 2026; Fases 3 y 4, el 10 oct
# (educacionbasica.sep.gob.mx). Contenidos y PDA se cotejan textuales en el de la fase de la planeación.
PROGRAMA = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                        'referencias', 'Programa-sintetico-Fase-5-SEP-2024.pdf')


def ruta_programa(fase='5'):
    return os.path.join(os.path.dirname(PROGRAMA), f'Programa-sintetico-Fase-{fase}-SEP-2024.pdf')


def texto_programa(fase='5'):
    """Texto del programa sintético de la fase, normalizado (sin cortes de palabra con guion ni saltos de línea), o None."""
    ruta = ruta_programa(fase)
    if not os.path.exists(ruta):
        return None
    import re
    try:
        import fitz
    except ImportError:                                 # sin PyMuPDF (la versión para compartir, 19 oct): solo el JSON
        return None
    t = ' '.join(' '.join(p.get_text().split()) for p in fitz.open(ruta))
    return normaliza(re.sub(r'(\w)- (\w)', r'\1\2', t))


def normaliza(s):
    import re
    return re.sub(r'\s+', ' ', s.replace('**', '')).strip()

# Estructura del mapa de llaves (la pidió él el 2026-10-06; SEMANA['estructura'] = 'secuencia'):
# la semana tiene inicio (sesión 1), desarrollo (sesiones intermedias) y cierre (última sesión), y cada sesión,
# momento 1 de inicio, uno o más momentos de desarrollo y un momento final de cierre. Cada momento lleva bajo su
# título un texto con la estructura gramatical de un PDA y, después, las consignas.
MOMENTOS_SECUENCIA = ('Inicio', 'Desarrollo', 'Cierre')
MAX_MOMENTOS_SECUENCIA = 5


def es_secuencia(sem):
    return sem.get('estructura') == 'secuencia'


def fase_semana(i, n):
    """Fase de la semana de la sesión i (1..n) según el mapa de llaves."""
    return 'Inicio' if i == 1 else 'Cierre' if i == n else 'Desarrollo'


DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
GRIS = '<w:shd w:val="clear" w:color="auto" w:fill="D9D9D9"/>'   # sombreado del renglón de un día sin sesión


def dia_de(fecha):
    """'Miércoles 14 de octubre' -> 2 (lunes = 0); None si no empieza con un día de la semana."""
    p = fecha.split()
    return DIAS.index(p[0]) if p and p[0] in DIAS else None


MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre',
         'noviembre', 'diciembre']


GRADO_PALABRA = {'1': 'Primero', '2': 'Segundo', '3': 'Tercero', '4': 'Cuarto', '5': 'Quinto', '6': 'Sexto'}


def datos_de(fmt, sem):
    """Datos de la escuela y del grupo: los del formato y, encima, los que él escribió en el Planeador ('datos', 10 oct)."""
    d = dict(fmt.get('datos', {}))
    vacios_validos = ('grado', 'supervisor', 'director', 'titular', 'catedratico',     # sin grado; firma que no va;
                      'normal', 'logo_izq', 'logo_der')                                 # sin normal ni logos (11 oct)
    d.update({k: str(v).strip() for k, v in (sem.get('datos') or {}).items() if str(v).strip() or k in vacios_validos})
    d['grado_grupo'] = f"{d['grado']}º {d.get('grupo', '')}".strip() if d.get('grado') else d.get('grupo', '')
    return d


CARGOS = {'Supervisor': 'Supervisora', 'Director': 'Directora', 'Catedrático': 'Catedrática'}
INCLUSIVO = {'Supervisor': 'Supervisore', 'Director': 'Directore', 'Catedrático': 'Catedrátique'}      # con e (10 oct)
CLAVE_CARGO = {'Supervisor': 'supervisor', 'Director': 'director', 'Catedrático': 'catedratico'}       # su dato
FEMENINO = ('Maestra', 'Doctora', 'Licenciada', 'Profesora', 'Ingeniera', 'Mtra.', 'Dra.', 'Profa.')
MASCULINO = ('Maestro', 'Doctor', 'Licenciado', 'Profesor', 'Ingeniero', 'Mtro.', 'Dr.', 'Prof.')
NEUTRO = ('Maestre', 'Doctore', 'Licenciade', 'Profesore', 'Ingeniere', 'Mtre.', 'Dre.')


def cargo(base, nombre, elegido=''):
    """La forma que él eligió en el Planeador ('cargo_director': 'Director', 'Directora' o 'Directore', 10 oct); si no
    eligió, la del título: 'Maestra Patricia…' → 'Directora'; 'Maestro…' → 'Director'; 'Maestre…' → 'Directore'; sin
    título que lo diga, 'Director(a)'."""
    if elegido in (base, CARGOS[base], INCLUSIVO[base]):
        return elegido
    t = (nombre.split() or [''])[0]
    return (CARGOS[base] if t in FEMENINO else INCLUSIVO[base] if t in NEUTRO else base if t in MASCULINO
            else f'{base}(a)')


def firmas_de(fmt, d):
    """Hoja de firmas con los datos del Planeador, en el orden de jerarquía de 'firmas_plantilla' (10 oct); las personas
    sin nombre no salen. Sin plantilla, las del formato tal cual."""
    if not fmt.get('firmas_plantilla'):
        return fmt['firmas']
    base = fmt['datos']
    vals = dict(d, escuela_firmas=fmt.get('escuela', d['escuela']) if d['escuela'] == base['escuela'] else d['escuela'])
    sin_titulo = lambda n: ' '.join(p for p in (n or '').split() if p not in FEMENINO + MASCULINO + NEUTRO).casefold()
    out = []
    for nombre, rol in fmt['firmas_plantilla']:
        clave = re.search(r'\{(\w+)\}', nombre).group(1)
        if not d.get(clave):
            continue
        if clave == 'docente' and d.get('titular') and sin_titulo(d['titular']) == sin_titulo(d['docente']):
            continue                                     # 19 oct: el titular planea sin practicante; firma una sola vez
        quien = nombre.format(**vals)
        if not d.get('normal'):                          # escuela normal opcional (11 oct): sin ella, el cargo no la nombra
            rol = rol.replace(', {normal}', '').replace(' {normal}', '')
        out.append([quien, rol.format(**{'normal': '', **vals}, **{k: cargo(k, d[clave], d.get(f'cargo_{CLAVE_CARGO[k]}', ''))
                                                                  for k in CARGOS})])
    return out


# ---------------------------------------------------------------- logos (11 oct)
# El Planeador manda cada logo como PNG en «data URL» (datos['logo_izq'], datos['logo_der']); desde la skill también puede ser
# la ruta de un .png o .jpg. EMU: 914400 por pulgada.

def imagen_de(valor):
    """(bytes, extensión, ancho_px, alto_px) del logo, o None si no hay o no se puede leer."""
    import base64, struct
    if not valor:
        return None
    try:
        if valor.startswith('data:'):
            datos = base64.b64decode(valor.split(',', 1)[1])
        elif os.path.exists(valor):
            datos = open(valor, 'rb').read()
        else:
            return None
        if datos[:8] == b'\x89PNG\r\n\x1a\n':
            w, h = struct.unpack('>II', datos[16:24])
            return datos, 'png', w, h
        if datos[:2] == b'\xff\xd8':                      # JPEG: el tamaño está en el marcador SOF
            i = 2
            while i < len(datos) - 9:
                if datos[i] != 0xFF:
                    i += 1
                    continue
                m, largo = datos[i + 1], struct.unpack('>H', datos[i + 2:i + 4])[0]
                if m in (0xC0, 0xC1, 0xC2):
                    h, w = struct.unpack('>HH', datos[i + 5:i + 9])
                    return datos, 'jpeg', w, h
                i += 2 + largo
    except Exception:
        return None
    return None


def encaja(w, h, max_cx, max_cy):
    """Tamaño en EMU que cabe en la caja sin deformar la imagen."""
    k = min(max_cx / w, max_cy / h)
    return int(w * k), int(h * k)


def dibujo(rid, cx, cy, ident, nombre, ancla=None):
    """<w:r> con la imagen. ancla=None: en línea; ancla=(alineación horizontal respecto al margen, desplazamiento vertical
    respecto al párrafo): flotante, sin ajuste de texto."""
    graf = (f'<wp:docPr id="{ident}" name="{nombre}"/><wp:cNvGraphicFramePr/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">'
            '<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">'
            '<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">'
            f'<pic:nvPicPr><pic:cNvPr id="{ident}" name="{nombre}"/><pic:cNvPicPr/></pic:nvPicPr>'
            f'<pic:blipFill><a:blip r:embed="{rid}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>'
            f'<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{cx}" cy="{cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom>'
            '</pic:spPr></pic:pic></a:graphicData></a:graphic>')
    if ancla is None:
        cuerpo = (f'<wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="{cx}" cy="{cy}"/>'
                  f'<wp:effectExtent l="0" t="0" r="0" b="0"/>{graf}</wp:inline>')
    else:
        alin, y = ancla
        cuerpo = (f'<wp:anchor distT="0" distB="0" distL="114300" distR="0" simplePos="0" relativeHeight="3" behindDoc="0" '
                  f'locked="0" layoutInCell="1" allowOverlap="1"><wp:simplePos x="0" y="0"/>'
                  f'<wp:positionH relativeFrom="margin"><wp:align>{alin}</wp:align></wp:positionH>'
                  f'<wp:positionV relativeFrom="paragraph"><wp:posOffset>{y}</wp:posOffset></wp:positionV>'
                  f'<wp:extent cx="{cx}" cy="{cy}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:wrapNone/>{graf}</wp:anchor>')
    return ('<w:r><w:drawing xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing">'
            + cuerpo + '</w:drawing></w:r>')


def aplica_datos(fmt, sem):
    """El formato con los datos del Planeador: el docente de las listas y, si cambiaron, la escuela con su C.C.T. y el
    grupo en los encabezados de las listas (si no cambiaron, quedan como en los formatos de la titular)."""
    f, base = copy.deepcopy(fmt), fmt.get('datos')
    if not base:
        return f
    d = datos_de(fmt, sem)
    f['practicante'] = d['docente']
    if (d['escuela'], d['cct']) != (base['escuela'], base['cct']):
        f['lista']['escuela'] = f"{d['escuela']} · C.C.T. {d['cct']}"
    if (d['grado'], d['grupo']) != (base['grado'], base['grupo']):
        f['lista']['grupo'] = f"{GRADO_PALABRA.get(d['grado'], d['grado'])} \"{d['grupo']}\"".strip()
        f['grupo'] = d['grado_grupo']
    f['firmas'] = firmas_de(fmt, d)
    return f


def semanas_de(sem):
    """1 o 2: con 'semanas': 2 la planeación cubre dos semanas, 10 días (Planeador, 10 oct)."""
    return sem.get('semanas', 1)


def filas_semana(sem):
    """Los renglones de la tabla de actividades, en orden de fecha: (número de sesión, sesión) o (None, fecha) para
    los días sin sesión ('dias_sin_sesion': el Planeador los deja en gris cuando él no les pone momento, 10 oct)."""
    filas = [(i, s) for i, s in enumerate(sem['sesiones'], 1)] + [(None, f) for f in sem.get('dias_sin_sesion', [])]
    if len(filas) == len(sem['sesiones']):
        return filas

    def clave(x):                              # 'Martes 20 de octubre' -> (10, 20); sin fecha legible, al final
        p = (x[1]['fecha'] if x[0] else x[1]).split()
        return (MESES.index(p[3]) + 1, int(p[1])) if len(p) > 3 and p[3] in MESES and p[1].isdigit() else (99, 99)
    claves = [clave(x) for x in filas]
    vuelta = any(m == 12 for m, _ in claves) and any(m == 1 for m, _ in claves)     # de diciembre a enero
    orden = sorted(range(len(filas)), key=lambda k: (claves[k][0] + 12 * (vuelta and claves[k][0] < 6), claves[k][1]))
    return [filas[k] for k in orden]


def dias_de_clase(sem):
    """[(fecha como va escrita, datetime.date)] de los renglones de la tabla, en orden, con el año del periodo
    («… de 2026»; de diciembre a enero, los de diciembre son del año anterior). [] si alguna fecha no se puede leer."""
    import datetime, re
    m = re.search(r'(\d{4})\s*$', sem.get('periodo', ''))
    textos = [s['fecha'] if i else s for i, s in filas_semana(sem)]
    partes = [t.split() for t in textos]
    if not m or not all(len(p) > 3 and p[1].isdigit() and p[3] in MESES for p in partes):
        return []
    fin, ultimo = int(m.group(1)), MESES.index(partes[-1][3]) + 1
    try:
        return [(t, datetime.date(fin - (MESES.index(p[3]) + 1 > ultimo), MESES.index(p[3]) + 1, int(p[1])))
                for t, p in zip(textos, partes)]
    except ValueError:                             # «31 de septiembre»
        return []


def siguiente_dia_de_clase(f):
    """El día de clase que sigue: el de mañana o, si es viernes, el lunes."""
    import datetime
    return f + datetime.timedelta(days=3 if f.weekday() == 4 else 1)


def fase_de(sem, i):
    """Fase del mapa de llaves de la sesión i (1..n). El mapa es uno para todo el proyecto, dure una o dos semanas
    (él, 10 oct): la sesión que lleva la primera etapa o momento de la metodología es el inicio, la que lleva la última
    es el cierre y las demás, desarrollo. Si las sesiones no declaran etapas: la primera es el inicio y la última el cierre."""
    ses = sem['sesiones']
    if not all(etapas_de(s) for s in ses):
        return fase_semana(i, len(ses))
    momentos, e = momentos_de(sem), etapas_de(ses[i - 1])
    return 'Inicio' if momentos[0] in e else 'Cierre' if momentos[-1] in e else 'Desarrollo'


def filas_tabla2(fmt, sem):
    """Renglones de la tabla de actividades para cada día; con dos semanas se agregan 5 iguales a los de la plantilla."""
    base = list(fmt['tabla2_filas_sesion'])
    return base + [base[-1] + k for k in range(1, 5 * (semanas_de(sem) - 1) + 1)]


def cargar_semana(ruta):
    if ruta.lower().endswith('.json'):              # planeaciones guardadas por el Planeador (panel)
        with open(ruta, encoding='utf8') as f:
            return json.load(f)
    spec = importlib.util.spec_from_file_location('semana', ruta)
    mod = importlib.util.module_from_spec(spec)
    sys.path.insert(0, os.path.dirname(os.path.abspath(ruta)))
    spec.loader.exec_module(mod)
    return mod.SEMANA


def cargar_formato(ruta):
    with open(ruta, encoding='utf8') as f:
        fmt = json.load(f)
    fmt['_dir'] = os.path.dirname(os.path.abspath(ruta))
    return fmt


def momentos_de(sem):
    """Lista de momentos de la metodología del contenido central (los del libro si se declararon)."""
    return sem.get('momentos') or METODOLOGIAS[CAMPOS[sem['campo_central']][1]]['momentos']


def etapas_de(ses):
    """Etapa(s) de la metodología de una sesión (columna 2), siempre como lista. 'etapa' es un texto (una etapa) o una
    lista: las metodologías con más de 5 momentos (Lenguajes y Ética) juntan los que sobran en un solo conjunto (10 oct)."""
    e = ses.get('etapa')
    return [e] if isinstance(e, str) and e else list(e or [])


def corto(nombre):
    """'Preparación – Identificamos' -> 'Identificamos' (el encabezado del momento en la columna de actividades)."""
    return nombre.split(' – ', 1)[1] if ' – ' in nombre else nombre


def lista_es(xs):
    xs = [str(x) for x in xs]
    return xs[0] if len(xs) == 1 else ', '.join(xs[:-1]) + ' y ' + xs[-1]


def momentos_texto(pares):
    """[(2,1),(2,2),(3,1)] -> 'Sesión 2, momentos 1 y 2; sesión 3, momento 1'"""
    por_sesion = {}
    for s, m in pares:
        por_sesion.setdefault(s, []).append(m)
    trozos = []
    for s in sorted(por_sesion):
        ms = sorted(por_sesion[s])
        trozos.append(f"sesión {s}, momento{'s' if len(ms) > 1 else ''} {lista_es(ms)}")
    t = '; '.join(trozos)
    return t[0].upper() + t[1:]
