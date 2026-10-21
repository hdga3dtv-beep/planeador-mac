# -*- coding: utf-8 -*-
"""Verifica una planeación contra las reglas que el practicante y su profesor fueron corrigiendo.

Uso:  python verificar.py <formato.json> <semana.py> [salida.docx]

FALLA = rompe una regla (no se entrega).  AVISO = revisar a mano (la heurística puede equivocarse).
Sale con código 1 si hay alguna FALLA.
"""
import os, re, sys, zipfile
from xml.sax.saxutils import unescape
from comun import (CAMPOS, METODOLOGIAS, TABLA_LIBRO4, PROHIBIDOS_EVAL, N_INDICADORES, N_SESIONES,
                   MAX_MOMENTOS_SECUENCIA, MAX_CONSIGNAS_SESION, cargar_semana, cargar_formato, momentos_de,
                   es_secuencia, texto_programa, normaliza, etapas_de, filas_semana, dia_de, DIAS, GRIS,
                   fase_de, filas_tabla2, semanas_de, datos_de, aplica_datos, dias_de_clase, siguiente_dia_de_clase,
                   ruta_programa, con_hojas_eval, vinculacion_de, recursos_de, FORMATOS_MET, MARCA_MET, corto,
                   productos_de, imagen_de)

FALLAS, AVISOS = [], []
falla = lambda m: FALLAS.append(m)
aviso = lambda m: AVISOS.append(m)

NO_VERBOS = {'del', 'de', 'con', 'como', 'antes', 'para', 'después', 'según', 'en', 'la', 'el', 'los', 'las',
             'un', 'una', 'si', 'al', 'a', 'por', 'desde', 'luego', 'primero', 'finalmente', 'cada', 'mediante',
             'tras', 'durante', 'ya', 'también', 'no', 'todo', 'todos', 'esta', 'este', 'ese', 'esa'}
REF_PAREN = re.compile(r'\([^)]*\b(?:p\.|pp\.|págs?\.|página|páginas|actividad|actividades|Proyectos|Guía|'
                       r'Nuestros saberes|LTG\w*|LGS)\b[^)]*\)')
SIGLAS = re.compile(r'\b(?:LTG[cea]?|LGS|NS|PC|PE|PA)\b|\b(?:acts?|págs?|pp?)\.\s*\d')
DURACION = re.compile(r'\b\d+\s*(?:min|minutos|hrs?|horas)\b', re.I)
IDC = re.compile(r'\b(?:INICIO|DESARROLLO|CIERRE)\b', re.I)   # solo prohibidos en la estructura por metodología
INFINITIVO = re.compile(r'^(?:\*\*)?[a-záéíóúñ]+(?:ar|er|ir)(?:se|la|lo|las|los|le|les)?\b')
PDA_INFINITIVO = re.compile(r'^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:ar|er|ir)(?:se)?\b')
# Verbos que solo pueden ser consigna para el docente: el PDA describe lo que hace el alumno (3.ª persona del presente).
VERBOS_DOCENTE = {'pide', 'reparte', 'recoge', 'proyecta', 'traza', 'acuerda', 'dedica', 'apóyate', 'asegúrate',
                  'pon', 'haz', 'di', 'sal', 'ten', 'ven'}
TABLA_NUEVA = re.compile(r'\b(?:una|la misma) tabla\b')


def texto_plano(s):
    return s.replace('**', '')


def revisa_texto(donde, s, es_consigna=False, idc=True):
    if s.count('**') % 2:
        falla(f'{donde}: negritas sin cerrar («**» impar)')
    if REF_PAREN.search(s):
        falla(f'{donde}: referencia de libro entre paréntesis: «{REF_PAREN.search(s).group(0)}». Va dentro de la oración.')
    if SIGLAS.search(s):
        falla(f'{donde}: sigla o abreviatura «{SIGLAS.search(s).group(0)}». Escríbelo completo (página, actividad, Proyectos Comunitarios…).')
    if DURACION.search(s):
        falla(f'{donde}: tiempo «{DURACION.search(s).group(0)}». No van.')
    if idc and IDC.search(s):
        falla(f'{donde}: inicio/desarrollo/cierre «{IDC.search(s).group(0)}». No van en la estructura por metodología.')
    if re.search(r'\bNota:', s):
        falla(f'{donde}: «Nota:» aparte. El cuaderno va dentro de la oración del producto.')
    if es_consigna:
        primera = texto_plano(s).split()[0].strip(',;:').lower() if s.strip() else ''
        if not texto_plano(s)[:1].isupper() or primera in NO_VERBOS:
            falla(f'{donde}: no empieza con verbo: «{texto_plano(s)[:60]}…»')


def revisa_cuadernos(donde, s, fmt, margen_unico=None):
    cu = fmt['cuadernos']
    for m in re.finditer(r'cuaderno(?! (?:naranja de proyectos|morado de tareas))', s):
        falla(f'{donde}: «cuaderno» sin decir cuál (usa «{cu["proyectos"]}» o «{cu["tareas"]}»).')
    for m in re.finditer(r'cuaderno naranja de proyectos(,? con margen (\w+))?', s):
        if not m.group(1):
            falla(f'{donde}: cuaderno naranja sin margen. Escribe «{cu["proyectos"]}, con margen <color>».')
        elif m.group(2) not in cu['margenes'].values():
            falla(f'{donde}: margen «{m.group(2)}» no existe (válidos: {", ".join(cu["margenes"].values())}).')
        elif margen_unico and m.group(2) != margen_unico:
            falla(f'{donde}: margen «{m.group(2)}», pero la columna 2 dice margen {margen_unico} (el del campo central); '
                  f'en el mapa de llaves todo el cuaderno va en ese margen')
    if re.search(r'\b(?:durante|en) el recreo\b', s) and fmt.get('horario') == 'después del recreo':
        aviso(f'{donde}: menciona el recreo; sus sesiones son después del recreo. Confirma que no es una actividad en el recreo.')
    if TABLA_NUEVA.search(s) and not ('pizarrón' in s and cu['proyectos'] in s):
        falla(f'{donde}: cada tabla la hace el docente en el pizarrón mientras los alumnos la hacen en el {cu["proyectos"]}; '
              f'la consigna dice las dos cosas')


def revisa_pda(donde, p):
    """Texto bajo el título del momento (estructura del mapa de llaves): estructura gramatical de un PDA."""
    t = (p or '').strip()
    if not t:
        falla(f'{donde}: sin PDA. Bajo el título del momento va un texto con la estructura gramatical de un PDA.')
        return
    primera = texto_plano(t).split()[0].strip(',;:').lower()
    if not t[:1].isupper() or primera in NO_VERBOS:
        falla(f'{donde}: el PDA no empieza con verbo: «{t[:60]}…»')
    elif PDA_INFINITIVO.match(t):
        falla(f'{donde}: el PDA va en presente, en 3.ª persona (Identifica…, Explica…), no en infinitivo: «{t.split()[0]}»')
    elif primera in VERBOS_DOCENTE:
        falla(f'{donde}: el PDA describe lo que hace el alumno (Identifica…, Explica…), no es una consigna para el docente: «{t.split()[0]}»')
    if not t.endswith('.'):
        falla(f'{donde}: el PDA termina con punto')
    revisa_texto(donde, t, idc=False)


def revisa_etapas(ses, momentos, clave_met):
    """Etapas de la metodología en la columna 2 (opcional): todas las sesiones, en orden y usándolas todas. Una sesión
    puede llevar varias (él las reparte en el Planeador, 10 oct). Sesiones seguidas con exactamente las mismas son días
    unidos («Unir» en el Planeador): cuentan una sola vez."""
    por_sesion = [etapas_de(s) for s in ses]
    if not any(por_sesion):
        return
    if not all(por_sesion):
        falla('etapas: si una sesión lleva la etapa de la metodología, todas la llevan')
        return
    tramos = [g for k, g in enumerate(por_sesion) if k == 0 or g != por_sesion[k - 1]]
    etapas = [e for g in tramos for e in g]
    fuera = [e for e in etapas if e not in momentos]
    if fuera:
        falla(f'etapas: {fuera} no son de la metodología del campo central ({METODOLOGIAS[clave_met]["nombre"]})')
        return
    repetidas = sorted({e for e in etapas if etapas.count(e) > 1}, key=momentos.index)
    if repetidas:
        falla(f'etapas: {repetidas} van en más de una sesión')
    elif etapas != sorted(etapas, key=momentos.index):
        falla(f'etapas: no siguen el orden de la metodología: {etapas}')
    faltan = [m for m in momentos if m not in etapas]
    if faltan:
        falla(f'etapas: faltan etapas de la metodología: {faltan} (una sesión puede llevar varias)')


def revisa_secuencia(ses):
    """Estructura del mapa de llaves: en cada sesión, momento 1 Inicio, momentos de Desarrollo y un momento final de Cierre."""
    for i, s in enumerate(ses, 1):
        nombres = [m['momento'] for m in s['momentos']]
        if nombres[:1] != ['Inicio']:
            falla(f'sesión {i}: el momento 1 es Inicio (mapa de llaves); aquí es «{nombres[0] if nombres else "—"}»')
        if len(nombres) < 2 or nombres[-1] != 'Cierre':
            falla(f'sesión {i}: el último momento es Cierre (mapa de llaves); aquí es «{nombres[-1] if nombres else "—"}»')
        medio = nombres[1:-1]
        if not medio or any(n != 'Desarrollo' for n in medio):
            falla(f'sesión {i}: entre Inicio y Cierre van solo momentos de Desarrollo, al menos uno; aquí: {medio}')
        if len(nombres) > MAX_MOMENTOS_SECUENCIA:
            falla(f'sesión {i}: {len(nombres)} momentos; el máximo es {MAX_MOMENTOS_SECUENCIA} (inicio, hasta tres de desarrollo y cierre)')
        for j, m in enumerate(s['momentos'], 1):
            if m.get('continuacion'):
                falla(f'sesión {i}, momento {j}: en la estructura del mapa de llaves no hay continuaciones')
            revisa_pda(f'sesión {i}, momento {j}, PDA', m.get('pda'))


def revisa_programa(sem, fase='5'):
    """Contenidos y PDA textuales del programa sintético oficial 2024 de la fase de la planeación (7 oct: un PDA de Ética
    traía dos comas cambiadas). Los guiones no cuentan: en el PDF suelen quedar partidos al final del renglón
    («comparación-\\ncontraste»). Un texto que en el PDF brinca de página o de columna, o que trae una errata del PDF
    corregida, se coteja contra las celdas que el Planeador sacó de ese mismo PDF (referencias/programa_faseN.json, 10 oct).
    Sin el PDF o sin PyMuPDF (la versión para compartir, 19 oct), solo contra esas celdas."""
    prog = texto_programa(fase)
    sin_guion = lambda s: re.sub(r'\s*-\s*', '', s)
    celdas = set()
    ruta = os.path.join(os.path.dirname(ruta_programa(fase)), f'programa_fase{fase}.json')
    if os.path.exists(ruta):
        import json
        for filas in json.load(open(ruta, encoding='utf8')).values():
            for f in filas:
                for g, v in f.items():
                    if g not in ('por_cotejar', 'notas'):
                        celdas.update(sin_guion(normaliza(t)) for t in ([v] if isinstance(v, str) else v))
    if prog is None and not celdas:
        aviso(f'no encontré referencias/Programa-sintetico-Fase-{fase}-SEP-2024.pdf ni programa_fase{fase}.json: '
              'contenidos y PDA sin cotejar')
        return
    prog = prog or ''
    prog_sg = sin_guion(prog)
    for clave, (cont, pdas) in sem['contenidos'].items():
        for bloque in (cont, pdas):
            for linea in bloque.split('\n'):
                t = linea.strip()
                if t.startswith('• '):
                    t = t[2:]
                t = re.sub(r'^\*\*[^*]+\*\*\s*', '', t)        # «**Mi familia es mi gran equipo:** …» o encabezado solo
                t = normaliza(t)
                if t and t not in prog and sin_guion(t) not in prog_sg and sin_guion(t) not in celdas:
                    falla(f'contenidos[{clave}]: no es textual del programa sintético de la Fase {fase} (2024): «{t[:90]}…»')


def revisa_carga(sem):
    """Avisos de las notas de la maestra: sesiones de 1 h 30 min; la sesión de inicio y la de cierre de cada semana van
    sin productos."""
    ses = sem['sesiones']
    for i, s in enumerate(ses, 1):
        n = sum(len(m.get('consignas', [])) for m in s['momentos'])
        if n > MAX_CONSIGNAS_SESION:
            aviso(f'sesión {i}: {n} consignas para 1 h 30 min; «piensa más en tu tiempo» (nota de la maestra). ¿Caben?')
    for i in range(1, len(ses) + 1):
        fase = fase_de(sem, i)
        con = [c for m in ses[i - 1]['momentos'] for c in m['consignas'] if '**' in c]
        if fase != 'Desarrollo' and con:
            aviso(f'sesión {i}: es la de {fase.lower()} de la semana, que va SIN productos según '
                  f'sus notas, y tiene {len(con)} consigna(s) con producto en negritas')


def revisa_metodologia(ses, momentos, clave_met):
    """Estructura por metodología: una sola, 2-3 momentos por sesión, en orden y con continuaciones bien puestas."""
    max_slots = len(momentos) + (N_SESIONES - 1)
    unos_permitidos = max(0, 2 * N_SESIONES - max_slots)
    unos = 0
    orden, previo = [], None
    for i, s in enumerate(ses, 1):
        ms = s['momentos']
        nombres = [m['momento'] for m in ms]
        if not 2 <= len(ms) <= 3:
            if len(ms) == 1:
                unos += 1
            else:
                falla(f'sesión {i}: tiene {len(ms)} momentos; van de 2 a 3')
        if len(set(nombres)) != len(nombres):
            falla(f'sesión {i}: repite un momento dentro de la misma sesión')
        for j, m in enumerate(ms):
            if m['momento'] not in momentos:
                falla(f'sesión {i}, momento {j + 1}: «{m["momento"]}» no es de la metodología del campo central '
                      f'({METODOLOGIAS[clave_met]["nombre"]}). Una sola metodología.')
                continue
            if m.get('continuacion'):
                if j != 0 or previo != m['momento']:
                    falla(f'sesión {i}, momento {j + 1}: «continuación» solo va al inicio de una sesión y del mismo momento '
                          f'con que terminó la sesión anterior')
            else:
                orden.append(m['momento'])
            previo = m['momento']
    if unos > unos_permitidos:
        falla(f'{unos} sesiones con un solo momento; con {len(momentos)} momentos solo se permite(n) {unos_permitidos} '
              f'(reparte y usa continuaciones)')
    if orden != [m for m in momentos if m in orden]:
        falla(f'los momentos no siguen el orden de la metodología: {orden}')
    faltan = [m for m in momentos if m not in orden]
    if faltan:
        falla(f'faltan momentos de la metodología: {faltan}')


def main(ruta_fmt, ruta_sem, ruta_docx=None):
    fmt, sem = cargar_formato(ruta_fmt), cargar_semana(ruta_sem)
    fmt = aplica_datos(fmt, sem)                  # escuela, docente y grupo que él escribió en el Planeador (10 oct)
    campo = sem['campo_central']
    clave_met = CAMPOS[campo][1]
    momentos = momentos_de(sem)

    # 1. Contenidos: el central está, todos los usados traen contenido y PDA
    if campo not in sem['contenidos']:
        falla('el campo central no tiene contenido ni PDA en «contenidos»')
    for k, (cont, pdas) in sem['contenidos'].items():
        if not cont.strip() or not pdas.strip():
            falla(f'contenidos[{k}]: falta el contenido o los PDA (van textuales, todos)')

    # 2. Sesiones y momentos. Dos estructuras:
    #    - por metodología: una sola, 2-3 momentos por sesión, en orden, continuaciones bien puestas;
    #    - mapa de llaves ('estructura': 'secuencia'): inicio, desarrollo y cierre en cada sesión, con su PDA.
    ses = sem['sesiones']
    secuencia = es_secuencia(sem)
    margen = fmt['cuadernos']['margenes'][campo] if secuencia else None
    libres = sem.get('dias_sin_sesion', [])       # días que él dejó sin momento en el Planeador (10 oct)
    semanas = semanas_de(sem)                     # una o dos semanas (Planeador, 10 oct)
    if semanas not in (1, 2):
        falla(f'semanas: {semanas}; la planeación es de una o de dos semanas')
    elif semanas == 2 and not secuencia:
        falla('dos semanas: solo caben en la estructura del mapa de llaves')
    if len(ses) + len(libres) != N_SESIONES * semanas or not ses:
        falla(f'hay {len(ses)} sesiones' + (f' y {len(libres)} días sin sesión' if libres else '') +
              f'; son {N_SESIONES} por semana' + (f' ({N_SESIONES * semanas} en las dos)' if semanas == 2 else '') +
              ' contando los días sin sesión, y al menos una sesión')
    if libres and not secuencia:
        falla('días sin sesión: solo caben en la estructura del mapa de llaves')
    dias = dias_de_clase(sem)                     # puede empezar cualquier día de la semana (él, 10 oct)
    if dias:
        for texto, fecha in dias:
            if fecha.weekday() > 4 or DIAS[fecha.weekday()] != texto.split()[0]:
                falla(f'días: «{texto}» no existe; ese día es {["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"][fecha.weekday()]}')
        if any(siguiente_dia_de_clase(a) != b for (_, a), (_, b) in zip(dias, dias[1:])):
            falla('días: los días de clase van seguidos de lunes a viernes, sin repetir ni saltarse días (puede empezar '
                  'cualquier día); aquí: ' + ', '.join(t for t, _ in dias))
    elif libres or semanas == 2:                  # fechas sin mes legible: al menos de lunes a viernes, sin repetir
        orden = [dia_de(s['fecha'] if i else s) for i, s in filas_semana(sem)]
        if orden != list(range(N_SESIONES)) * semanas:
            falla('días: los días de clase van seguidos de lunes a viernes, cada uno una vez; aquí: ' +
                  ', '.join('?' if d is None else DIAS[d] for d in orden))
    for i, s in enumerate(ses, 1):
        for j, m in enumerate(s['momentos'], 1):
            if not m.get('consignas'):
                falla(f'sesión {i}, momento {j}: sin consignas')
            for k, c in enumerate(m.get('consignas', []), 1):
                donde = f'sesión {i}, momento {j}, consigna {k}'
                revisa_texto(donde, c, es_consigna=True, idc=not secuencia)
                revisa_cuadernos(donde, c, fmt, margen)
        if s.get('tarea'):
            revisa_texto(f'sesión {i}, tarea', s['tarea'], idc=not secuencia)
            revisa_cuadernos(f'sesión {i}, tarea', s['tarea'], fmt, margen)
            if not INFINITIVO.match(s['tarea'].strip()):
                falla(f'sesión {i}, tarea: no empieza con verbo en infinitivo: «{s["tarea"][:50]}…»')
    revisa_programa(sem, datos_de(fmt, sem).get('fase', '5'))   # el programa de la fase de la planeación
    if secuencia:
        revisa_secuencia(ses)
        revisa_etapas(ses, momentos, clave_met)
        revisa_carga(sem)
    else:
        revisa_metodologia(ses, momentos, clave_met)

    # 3. Tabla 1: productos con qué y dónde; nada vacío
    g = sem['general']
    for k in ('ejes', 'nombre', 'tema', 'pregunta', 'parciales', 'finales', 'cierre'):
        if not g.get(k):
            falla(f'general.{k} vacío')
    for p in g.get('parciales', []):
        revisa_texto('producto parcial', p, idc=not secuencia)
        if not re.search(r'\ben (?:el|la|una|un|hojas|cartulina)\b', p):
            aviso(f'producto parcial sin «dónde» claro: «{p}»')
    if not re.search(r'\ben (?:el|la|una|un|hojas)\b', g.get('finales', '')):
        aviso('producto final: di en dónde se hace (hoja, cuaderno, lugar)')
    for k in ('nombre', 'tema', 'pregunta', 'cierre'):
        if re.search(r'\b(?:pp?\.|página|escenario|vinculad[oa] con[^«]*\()', g.get(k, '')):
            aviso(f'general.{k}: ¿lleva datos que pertenecen a otro campo (páginas, escenario)? «{g[k][:70]}»')

    # 4. Evaluación: técnica e instrumento del libro 4, momentos que existen, indicadores 1..10 una sola vez. Desde el
    # 10 oct, sin 'cotejo', solo técnica e instrumento: los instrumentos los elabora él por separado.
    if not sem['evaluacion']:
        falla('evaluación: falta al menos una técnica con su instrumento')
    vistos = []
    for gi, ev in enumerate(sem['evaluacion'], 1):
        t, ins = ev['tecnica'], ev['instrumento']
        if t not in TABLA_LIBRO4:
            falla(f'evaluación {gi}: técnica «{t}» no está en la tabla del libro 4')
        elif ins not in TABLA_LIBRO4[t]:
            falla(f'evaluación {gi}: «{ins}» no es instrumento de «{t}» (libro 4: {", ".join(TABLA_LIBRO4[t])})')
        if any(p in ins for p in PROHIBIDOS_EVAL):
            falla(f'evaluación {gi}: instrumento prohibido «{ins}»')
        for s_, m_ in ev.get('momentos', []):
            if not (1 <= s_ <= len(ses) and 1 <= m_ <= len(ses[s_ - 1]['momentos'])):
                falla(f'evaluación {gi}: sesión {s_}, momento {m_} no existe')
        vistos += ev.get('indicadores', [])
    if con_hojas_eval(sem):
        if sorted(vistos) != list(range(1, N_INDICADORES + 1)):
            falla(f'evaluación: cada indicador 1..{N_INDICADORES} debe aparecer una sola vez; aparecen {sorted(vistos)}')
        momentos_de_indicador = {}
        for ev in sem['evaluacion']:
            for k in ev['indicadores']:
                momentos_de_indicador[k] = [tuple(p) for p in ev['momentos']]

        # 5. Lista de cotejo: 10 indicadores, cada uno en un momento que existe y que su grupo de evaluación incluye
        ind = sem['cotejo']['indicadores']
        if len(ind) != N_INDICADORES:
            falla(f'lista de cotejo: {len(ind)} indicadores; son {N_INDICADORES}')
        for k, (texto, (s_, m_)) in enumerate(ind, 1):
            if not (1 <= s_ <= len(ses) and 1 <= m_ <= len(ses[s_ - 1]['momentos'])):
                falla(f'lista de cotejo, indicador {k}: sesión {s_}, momento {m_} no existe')
            elif k in momentos_de_indicador and (s_, m_) not in momentos_de_indicador[k]:
                falla(f'indicador {k}: en la lista va en sesión {s_}, momento {m_}, pero la evaluación lo pone en {momentos_de_indicador[k]}')

    # 6. Páginas: las citadas en actividades contra Vinculación (heurística → AVISO)
    citado = set()
    for s in ses:
        for m in s['momentos']:
            for c in m['consignas']:
                for libro in ('Proyectos Comunitarios', 'Proyectos Escolares', 'Proyectos de Aula', 'Nuestros saberes'):
                    if libro in c:
                        citado.add(libro)
    vinc = ' '.join(sem.get('vinculacion') or vinculacion_de(sem))
    for libro in citado:
        if libro not in vinc:
            aviso(f'Vinculación LTG no menciona «{libro}», que sí se usa en las actividades')

    # 7. El .docx generado: estructura del formato intacta, encabezado, firmas y lista
    if ruta_docx:
        xml = zipfile.ZipFile(ruta_docx).read('word/document.xml').decode('utf8')
        (revisa_docx_met if MARCA_MET in xml else revisa_docx)(fmt, sem, ruta_docx)
        revisa_logos(fmt, sem, ruta_docx)

    for a in AVISOS:
        print('AVISO ', a)
    for f in FALLAS:
        print('FALLA ', f)
    print(f'\n{len(FALLAS)} fallas, {len(AVISOS)} avisos')
    return 1 if FALLAS else 0


def estructura(xml, quitar=(), grises=(), extra=0):
    """Estructura de las 3 tablas del formato. quitar: filas de campos no usados (tabla 1); grises: renglones de días
    sin sesión en la tabla de actividades, cuyo sombreado gris no cuenta como cambio de formato; extra: renglones de
    sesión que se agregan a la plantilla con dos semanas (copias del último)."""
    tbls = re.findall(r'<w:tbl>.*?</w:tbl>', xml, re.S)[:3]
    out = []
    for n, t in enumerate(tbls):
        filas = re.findall(r'<w:tr>.*?</w:tr>', t, re.S)
        filas = [f for i, f in enumerate(filas) if not (n == 0 and i in quitar)]
        if n == 1 and extra:
            filas += [filas[-1]] * extra
        filas = [f.replace(GRIS, '').replace('<w:tcPr></w:tcPr>', '<w:tcPr/>') if n == 1 and i in grises else f
                 for i, f in enumerate(filas)]
        out.append((re.search(r'<w:tblPr>.*?</w:tblPr>', t, re.S).group(0),
                    tuple(re.findall(r'<w:gridCol [^>]*/>', t)),
                    tuple((re.search(r'<w:trPr>.*?</w:trPr>', f, re.S) or re.search('', '')).group(0) +
                          '|'.join(re.findall(r'<w:tc>(<w:tcPr/>|<w:tcPr>.*?</w:tcPr>)', f, re.S)) for f in filas)))
    return out


def revisa_logos(fmt, sem, ruta):
    """Los logos que él adjuntó en el Planeador (11 oct) quedaron dentro del .docx, idénticos."""
    z, dat = zipfile.ZipFile(ruta), datos_de(fmt, sem)
    for lado, nombre in (('izq', 'izquierdo'), ('der', 'derecho')):
        img = imagen_de(dat.get(f'logo_{lado}'))
        if img and not any(n.startswith(f'word/media/logo_{lado}.') and z.read(n) == img[0] for n in z.namelist()):
            falla(f'logo {nombre}: no quedó en el .docx')


def revisa_docx_met(fmt, sem, ruta):
    """Formato de una metodología (generar_metodologia.py, 11 oct): no es la plantilla de la titular, así que se revisa que
    no se pierda nada de la planeación: datos, contenidos y PDA, cada sesión con su etapa, momentos, consignas, tarea y
    productos, vinculación, recursos, evaluación, ajustes y firmas en orden."""
    xml = zipfile.ZipFile(ruta).read('word/document.xml').decode('utf8')
    plano = ' '.join(unescape(re.sub(r'<[^>]+>', ' ', re.sub(r'</w:t></w:r><w:r>.*?<w:t[^>]*>', '', xml))).split())
    junto = lambda t: ' '.join(t.replace('**', '').split())
    met = CAMPOS[sem['campo_central']][1]
    cfg, dat, g = FORMATOS_MET[met], datos_de(fmt, sem), sem['general']

    def debe(dato, donde):
        if junto(dato) not in plano:
            falla(f'formato {cfg["nombre"]}: falta {donde}: «{junto(dato)[:70]}»')
    debe(cfg['titulo'].upper(), 'el título')
    for k in ('escuela', 'cct', 'docente'):
        debe(dat.get(k, ''), f'el dato «{k}» del encabezado')
    debe(sem['periodo'], 'el periodo')
    for etq, clave in cfg['campos']:
        debe(etq, 'el rótulo de la casilla')
        debe(g[clave], f'«{etq}»')
    for x in [g['nombre']] + g['parciales'] + g['ejes']:
        debe(x, 'un dato del proyecto')
    for k, (cont, pdas) in sem['contenidos'].items():
        for l in (cont + chr(10) + pdas).splitlines():
            if l.strip():
                debe(l.lstrip('• '), f'contenido o PDA de {CAMPOS[k][0]}')
    for i, s in enumerate(sem['sesiones'], 1):
        debe(f'Sesión {i}', f'la sesión {i}')
        debe(s['fecha'], f'la fecha de la sesión {i}')
        for e in etapas_de(s):
            debe(corto(e), f'la {cfg["parte"].lower()} de la sesión {i}')
        for m in s['momentos']:
            debe(corto(m['momento']), f'el momento de la sesión {i}')
            if m.get('pda'):
                debe(m['pda'], f'el PDA de un momento de la sesión {i}')
            for c in m['consignas']:
                debe(c, f'una consigna de la sesión {i}')
        if s.get('tarea'):
            debe(s['tarea'], f'la tarea de la sesión {i}')
    for x in (sem.get('vinculacion') or vinculacion_de(sem)) + (sem.get('recursos') or recursos_de(sem)):
        debe(x, 'vinculación o recursos')
    for ev in sem['evaluacion']:
        debe(f"Técnica: {ev['tecnica']}. Instrumento: {ev['instrumento']}.", 'la evaluación')
    for l in sem.get('nee', '').splitlines():
        if l.strip():
            debe(l.lstrip('• '), 'los ajustes razonables')
    pos = [plano.find(junto(n)) for n, _ in fmt['firmas']]
    if -1 in pos or pos != sorted(pos):
        falla('hoja de firmas: faltan nombres o no van en el orden de autoridad del formato')
    for n, rol in fmt['firmas']:
        debe(rol, f'el cargo de {n}')


def revisa_docx(fmt, sem, ruta):
    plantilla = zipfile.ZipFile(os.path.join(fmt['_dir'], fmt['plantilla']))
    salida = zipfile.ZipFile(ruta)
    quitar = [f for k, f in fmt['tabla1']['filas_campo'].items() if k not in sem['contenidos']]
    grises = [f for f, (i, _) in zip(filas_tabla2(fmt, sem), filas_semana(sem)) if i is None]
    extra = 5 * (semanas_de(sem) - 1)
    if estructura(plantilla.read('word/document.xml').decode('utf8'), quitar, extra=extra) != \
       estructura(salida.read('word/document.xml').decode('utf8'), grises=grises):
        falla('el .docx cambió la estructura de las tablas del formato (solo se permite quitar filas de campos no usados'
              ' y, con dos semanas, repetir los renglones de sesión)')
    hdr = salida.read('word/header1.xml').decode('utf8')
    plano = unescape(re.sub(r'<[^>]+>', '', hdr))
    dat = datos_de(fmt, sem)
    for dato in (fmt['practicante'].upper(), sem['periodo']) + ((dat['escuela'].upper(), dat['cct'],
                 f"ZONA ESCOLAR {dat['zona']}, SECTOR EDUCATIVO {dat['sector']}", f"Fase: {dat['fase']}",
                 f"Grado y grupo: {dat['grado_grupo']}") if fmt.get('datos') else ()):
        if dato not in plano:
            falla(f'encabezado: no aparece «{dato}»')
    xml = salida.read('word/document.xml').decode('utf8')
    if es_secuencia(sem):                                   # columnas 2 y 3 de la tabla de actividades
        filas = re.findall(r'<w:tr>.*?</w:tr>', re.findall(r'<w:tbl>.*?</w:tbl>', xml, re.S)[1], re.S)
        campo = sem['campo_central']
        margen = fmt['cuadernos']['margenes'][campo]
        for fila, (i, s) in zip(filas_tabla2(fmt, sem), filas_semana(sem)):
            if fila >= len(filas):
                falla(f'tabla de actividades: falta el renglón de la {"sesión " + str(i) if i else s}')
                continue
            celdas = [re.sub(r'<[^>]+>', '', c) for c in re.findall(r'<w:tc>.*?</w:tc>', filas[fila], re.S)]
            if i is None:                                   # día sin sesión: «Sin sesión», su fecha y todo en gris
                if 'Sin sesión' not in celdas[0] or s not in celdas[0]:
                    falla(f'renglón del {s}: falta «Sin sesión» con la fecha (día sin sesión)')
                if filas[fila].count(GRIS) != len(celdas):
                    falla(f'renglón del {s}: el día sin sesión va en gris')
                continue
            for dato in (f'{fase_de(sem, i)} – Sesión {i}', f'margen {margen}', CAMPOS[campo][0]) + \
                        tuple(etapas_de(s)):
                if dato not in celdas[1]:
                    falla(f'columna 2 de la sesión {i}: falta «{dato}» (fase y sesión, etapa, cuaderno con margen y campo)')
            for k, m in enumerate(s['momentos'], 1):
                if f'Momento {k}. {m["momento"]}' not in celdas[2]:
                    falla(f'columna 3 de la sesión {i}: falta el título «Momento {k}. {m["momento"]}»')
    doc = re.sub(r'<[^>]+>', ' ', xml)
    pos = [doc.find(n) for n, _ in fmt['firmas']]
    if -1 in pos or pos != sorted(pos):
        falla('hoja de firmas: faltan nombres o no van en el orden de autoridad del formato')
    plano = ' '.join(unescape(doc).split())
    for n, rol in fmt['firmas']:                       # y cada cargo como se eligió: «Directora», «Catedrátique»… (10 oct)
        if ' '.join(rol.split()) not in plano:
            falla(f'hoja de firmas: falta el cargo de {n}: «{rol}»')
    if 'Observaciones' in doc:
        falla('la lista de cotejo no lleva columna de Observaciones')
    if not con_hojas_eval(sem):        # 10 oct: casilla con técnica e instrumento; sin hojas de evaluación
        for ev in sem['evaluacion']:
            linea = f"Técnica: {ev['tecnica']}. Instrumento: {ev['instrumento']}."
            if linea not in plano:
                falla(f'casilla de evaluación: falta «{linea}»')
        for sobra in ('Lista de cotejo · ', 'Lista de cotejo de producciones', '(anexa)'):
            if sobra in doc:
                falla(f'hojas de evaluación: los instrumentos se elaboran por separado, pero aparece «{sobra}»')
    # Hojas de evaluación con sus formatos: lista con los nombres y Total, y lista de producciones
    elif fmt.get('lista'):
        for titulo in (fmt['lista']['titulo_indicadores'], 'Lista de cotejo · ', 'Lista de cotejo de producciones · ', 'Total',
                       'Promedio'):
            if titulo not in doc:
                falla(f'hojas de evaluación: falta «{titulo}» (formato de sus listas)')
        for nombre in fmt.get('alumnos', []):
            if doc.count(nombre) < 2:
                falla(f'hojas de evaluación: «{nombre}» no aparece en la lista de cotejo y en la de producciones')
        # 7 oct: indicadores y lista con nombres en la MISMA hoja, vertical; la nota empieza con mayúscula
        a, b = xml.find(fmt['lista']['titulo_indicadores']), xml.find('Lista de cotejo · ')
        if a != -1 and b > a:
            tramo = xml[a:b]
            if '<w:br w:type="page"/>' in tramo or '<w:sectPr' in tramo:
                falla('hojas de evaluación: los indicadores y la lista con los nombres van en la misma hoja')
            sect = re.search(r'<w:sectPr>.*?</w:sectPr>', xml[b:], re.S)
            if not sect or 'w:w="12240"' not in sect.group(0):
                falla('hojas de evaluación: la hoja de la lista de cotejo va vertical')
        if doc.count(f"Docente: {fmt['practicante']}") < 3:      # 7 oct: en las tres listas el docente es él
            falla(f"hojas de evaluación: en «Docente:» de las listas va {fmt['practicante']} (indicadores, lista y producciones)")
        nota = re.search(r'Nota:\s*(\S)', doc)
        if nota and not nota.group(1).isupper():
            falla('hojas de evaluación: la nota de la lista de producciones empieza con mayúscula («Cada…»)')


if __name__ == '__main__':
    if len(sys.argv) not in (3, 4):
        sys.exit(__doc__)
    sys.exit(main(*sys.argv[1:]))
