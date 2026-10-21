# -*- coding: utf-8 -*-
"""Llena el formato de planeación de la titular sin alterar su estructura.

Uso:  python generar.py <formato.json> <semana.py> <salida.docx>

Solo cambia: el texto de las casillas, el periodo y los datos declarados en el encabezado, y elimina
las filas de los campos formativos que no se usan (autorizado por el profesor de la Normal).
Al final agrega una hoja de firmas (página propia) y, en las planeaciones con 'cotejo', las hojas de evaluación
(sección aparte). Desde el 10 oct los instrumentos se elaboran por separado y no van.
"""
import os, re, sys, zipfile
from xml.sax.saxutils import escape
from comun import (CAMPOS, METODOLOGIAS, LIBRO4_REF, N_INDICADORES, cargar_semana, cargar_formato,
                   momentos_de, corto, lista_es, momentos_texto, es_secuencia, etapas_de, filas_semana, GRIS,
                   fase_de, filas_tabla2, semanas_de, datos_de, aplica_datos, con_hojas_eval, recursos_de,
                   vinculacion_de, imagen_de, encaja, dibujo)

FONT = '<w:rFonts w:ascii="Arial" w:cs="Arial" w:eastAsia="Arial" w:hAnsi="Arial"/>'
SZ = 22  # Arial 11, como las casillas del formato


def run(text, b=False, sz=SZ, color=None):
    rpr = FONT + ('<w:b/><w:bCs/>' if b else '') + (f'<w:color w:val="{color}"/>' if color else '')
    rpr += f'<w:sz w:val="{sz}"/><w:szCs w:val="{sz}"/>'
    return f'<w:r><w:rPr>{rpr}</w:rPr><w:t xml:space="preserve">{escape(text)}</w:t></w:r>'


def inline(text, sz=SZ):
    return ''.join(run(p, b=k % 2 == 1, sz=sz) for k, p in enumerate(text.split('**')) if p)


def para(inner, align=None, before=0, after=50, ind=None, keep=False):
    ppr = '<w:keepNext/>' if keep else ''      # que un título no quede solo al pie de la hoja
    ppr += f'<w:spacing w:before="{before}" w:after="{after}" w:line="240" w:lineRule="auto"/>'
    ppr += ind or ''
    ppr += f'<w:jc w:val="{align}"/>' if align else ''
    return f'<w:p><w:pPr>{ppr}</w:pPr>{inner}</w:p>'


def cell_xml(markup, align=None, sz=SZ, gap=50):
    """Marcado: '• x' viñeta; '   x' renglón con la sangría de la viñeta; '**x**' negritas;
    '^x' párrafo que se mantiene con el siguiente (títulos de momento y su PDA)."""
    ps = []
    for line in markup.strip('\n').split('\n'):
        keep = line.startswith('^')
        if keep:
            line = line[1:]
        if line.startswith('   '):
            ps.append(para(inline(line.strip(), sz), ind='<w:ind w:left="284"/>', keep=keep))
        elif line.startswith('• '):
            ps.append(para(run('•', sz=sz) + '<w:r><w:tab/></w:r>' + inline(line[2:], sz),
                           ind='<w:ind w:left="284" w:hanging="227"/>', keep=keep))
        elif line == '':
            ps.append(para('', after=0, keep=keep))
        else:
            ps.append(para(inline(line, sz), align=align, after=gap, keep=keep))
    return ''.join(ps)


def lista_junta(items):
    """Viñetas que Word mantiene juntas: la fila no se parte entre dos hojas dejando la etiqueta sola."""
    return '\n'.join(('^' if k < len(items) - 1 else '') + '• ' + x for k, x in enumerate(items))


def fill_table(tbl, fills):
    rows = re.findall(r'<w:tr>.*?</w:tr>', tbl, re.S)
    out = tbl
    for r, tr in enumerate(rows):
        new_tr = tr
        for c, tc in enumerate(re.findall(r'<w:tc>.*?</w:tc>', tr, re.S)):
            if (r, c) in fills:
                markup, align = fills[(r, c)]
                tcpr = re.match(r'<w:tc>(<w:tcPr/>|<w:tcPr>.*?</w:tcPr>)', tc, re.S).group(1)
                new_tr = new_tr.replace(tc, '<w:tc>' + tcpr + cell_xml(markup, align) + '</w:tc>', 1)
        out = out.replace(tr, new_tr, 1)
    return out


def en_gris(tr):
    """Sombrea en gris todas las celdas de un renglón (día sin sesión), con <w:shd> en su lugar dentro de <w:tcPr>."""
    def tcpr(m):
        dentro = re.sub(r'<w:shd [^>]*/>', '', m.group(1) or '')
        k = re.search(r'<w:(?:noWrap|tcMar|textDirection|tcFitText|vAlign|hideMark)\b', dentro)
        k = k.start() if k else len(dentro)
        return '<w:tcPr>' + dentro[:k] + GRIS + dentro[k:] + '</w:tcPr>'
    return re.sub(r'<w:tcPr/>|<w:tcPr>(.*?)</w:tcPr>', tcpr, tr, flags=re.S)


BORDERS = ('<w:tblBorders>' + ''.join(f'<w:{s} w:color="000000" w:space="0" w:sz="4" w:val="single"/>'
                                      for s in ('top', 'left', 'bottom', 'right', 'insideH', 'insideV')) + '</w:tblBorders>')
EMPTY_P = ('<w:p><w:pPr><w:spacing w:before="0" w:after="0" w:line="240" w:lineRule="auto"/>'
           '<w:rPr><w:sz w:val="18"/><w:szCs w:val="18"/></w:rPr></w:pPr></w:p>')
PAGE_BREAK = '<w:p><w:r><w:br w:type="page"/></w:r></w:p>'


def table(widths, rows, header_rows=1, borders=True, shade='a6a6a6', row_h=None, gap=50, rule='atLeast',
          valign='center', indent=-714):
    grid = ''.join(f'<w:gridCol w:w="{w}"/>' for w in widths)
    tblpr = (f'<w:tblPr><w:tblW w:w="{sum(widths)}" w:type="dxa"/><w:jc w:val="left"/>'
             f'<w:tblInd w:w="{indent}" w:type="dxa"/>' + (BORDERS if borders else '') +
             '<w:tblLayout w:type="fixed"/><w:tblCellMar><w:top w:w="20" w:type="dxa"/><w:left w:w="80" w:type="dxa"/>'
             '<w:bottom w:w="20" w:type="dxa"/><w:right w:w="80" w:type="dxa"/></w:tblCellMar></w:tblPr>')
    out = []
    for i, row in enumerate(rows):
        trpr = '<w:trPr><w:cantSplit/>' + ('<w:tblHeader/>' if i < header_rows else '')
        if row_h and i >= header_rows:
            trpr += f'<w:trHeight w:val="{row_h}" w:hRule="{rule}"/>'
        trpr += '</w:trPr>'
        tcs = []
        for w, (markup, align) in zip(widths, row):
            shd = f'<w:shd w:val="clear" w:color="auto" w:fill="{shade}"/>' if (i < header_rows and shade) else ''
            tcs.append(f'<w:tc><w:tcPr><w:tcW w:w="{w}" w:type="dxa"/>{shd}<w:vAlign w:val="{valign}"/></w:tcPr>'
                       f'{cell_xml(markup, align, gap=gap) if markup else EMPTY_P}</w:tc>')
        out.append('<w:tr>' + trpr + ''.join(tcs) + '</w:tr>')
    return f'<w:tbl>{tblpr}<w:tblGrid>{grid}</w:tblGrid>{"".join(out)}</w:tbl>'


# ---------------------------------------------------------------- render del contenido

def columna_fase_secuencia(sem, i):
    """Columna «Fase – Etapa – Momento» en la estructura del mapa de llaves: fase y sesión, etapa de la metodología
    (si la semana la declara; un conjunto de momentos va uno por renglón), cuaderno con margen y campo formativo."""
    fmt, campo = sem['_fmt'], sem['campo_central']
    cuaderno = fmt['cuadernos']['proyectos'].split(' de ')[0]          # «cuaderno naranja»
    etapas = ''.join(e + '\n' for e in etapas_de(sem['sesiones'][i - 1]))
    return (f"{fase_de(sem, i)} – Sesión {i}\n" + etapas +
            f"{cuaderno[0].upper() + cuaderno[1:]}, margen {fmt['cuadernos']['margenes'][campo]}\n"
            f"({CAMPOS[campo][0]})")


def render_sesion(sem, i, ses):
    fecha = f"**Sesión {i}**\n{ses['fecha']}"
    nombres, bloques = [], []
    for k, m in enumerate(ses['momentos'], 1):
        if es_secuencia(sem):
            bloques.append(f"^**Momento {k}. {m['momento']}**")
            bloques.append('^' + m['pda'])
        else:
            cont = ' (continuación)' if m.get('continuacion') else ''
            nombres.append(m['momento'] + cont)
            bloques.append(f"^**Momento {k}. {corto(m['momento'])}{cont}**")
        bloques += ['• ' + c for c in m['consignas']]
    if ses.get('tarea'):
        bloques.append(f"**Tarea** (pide que la anoten en la {sem['_fmt']['cuadernos']['agenda']}): {ses['tarea']}")
    fase = columna_fase_secuencia(sem, i) if es_secuencia(sem) else '\n'.join(nombres)
    # No amarres las columnas 1 y 2 con '^': Word empuja la sesión entera a otra hoja y deja huecos (probado el 6 oct).
    return fecha, fase, '\n'.join(bloques)


def render_evaluacion(sem):
    lineas = [LIBRO4_REF]
    if not con_hojas_eval(sem):                         # 10 oct: los instrumentos se elaboran por separado
        lineas += [f"• Técnica: {g['tecnica']}. Instrumento: {g['instrumento']}." for g in sem['evaluacion']]
    else:
        for g in sem['evaluacion']:
            ind = sorted(g['indicadores'])
            lineas.append(f"• **{momentos_texto(g['momentos'])}. Indicador{'es' if len(ind) > 1 else ''} {lista_es(ind)}.**")
            lineas.append(f"   Técnica: {g['tecnica']}. Instrumento: {g['instrumento']}.")
        lineas.append('Todos los indicadores se registran en la lista de cotejo (anexa).')
    if sem['_fmt'].get('registro_evaluacion'):          # sus notas: «llama a los niños de 5 en 5 por No. de lista…»
        lineas.append(sem['_fmt']['registro_evaluacion'])
    return '\n'.join(lineas)


def etiqueta_momento(sem, s, m):
    mom = sem['sesiones'][s - 1]['momentos'][m - 1]
    if es_secuencia(sem):
        return f"Sesión {s} · Momento {m}. {mom['momento']}"
    return f"Sesión {s} · {corto(mom['momento'])}" + (' (continuación)' if mom.get('continuacion') else '')


def firmas(personas):
    celda = lambda n, rol: (' \n \n \n____________________________________\n' + f'**{n}**\n'
                            + rol.replace('«Cedros del Líbano»', '«Cedros del Líbano»'), 'center')
    arriba = ''
    if len(personas) % 2:                  # nones: la de más jerarquía va sola y centrada hasta arriba (10 oct)
        arriba = table([12960], [[celda(*personas[0])]], header_rows=0, borders=False, shade=None, valign='top', indent=0)
        personas = personas[1:]
    filas = [[celda(*personas[k]), celda(*personas[k + 1])] for k in range(0, len(personas), 2)]
    return arriba + (table([6480, 6480], filas, header_rows=0, borders=False, shade=None, valign='top', indent=0) if filas else '')


# ---------------------------------------------------------------- hojas de evaluación (formatos del practicante)
# Copian sus formatos «Lista_de_cotejo_Sexto_A.docx» y «Lista_de_cotejo_Producciones_Sexto_A.docx» (6 oct 2026):
# mismos títulos, anchos, alturas exactas, letra, gris D9D9D9, bordes 808080 y márgenes de página.

def p_lista(runs, jc, after, antes=0):
    return (f'<w:p><w:pPr><w:spacing w:before="{antes}" w:after="{after}" w:line="240" w:lineRule="auto"/>'
            f'<w:jc w:val="{jc}"/></w:pPr>{runs}</w:p>')


def r_lista(texto, sz, b=False):
    rpr = FONT + ('<w:b/><w:bCs/>' if b else '<w:b w:val="false"/><w:bCs w:val="false"/>')
    return f'<w:r><w:rPr>{rpr}<w:sz w:val="{sz}"/><w:szCs w:val="{sz}"/></w:rPr><w:t xml:space="preserve">{escape(texto)}</w:t></w:r>'


def c_lista(w, texto, sz, b=False, jc='left', gris=False, mar=(20, 80)):
    bordes = ''.join(f'<w:{s} w:val="single" w:color="808080" w:sz="4"/>' for s in ('top', 'left', 'bottom', 'right'))
    shd = '<w:shd w:fill="D9D9D9" w:color="auto" w:val="clear"/>' if gris else ''
    v, h = mar
    tcpr = (f'<w:tcPr><w:tcW w:type="dxa" w:w="{w}"/><w:tcBorders>{bordes}</w:tcBorders>{shd}'
            f'<w:tcMar><w:top w:type="dxa" w:w="{v}"/><w:left w:type="dxa" w:w="{h}"/><w:bottom w:type="dxa" w:w="{v}"/>'
            f'<w:right w:type="dxa" w:w="{h}"/></w:tcMar><w:vAlign w:val="center"/></w:tcPr>')
    return f'<w:tc>{tcpr}{p_lista(r_lista(texto, sz, b), jc, 0)}</w:tc>'


def t_lista(anchos, filas):
    bordes = ''.join(f'<w:{s} w:val="single" w:color="auto" w:sz="4"/>'
                     for s in ('top', 'left', 'bottom', 'right', 'insideH', 'insideV'))
    tblpr = (f'<w:tblPr><w:tblW w:type="dxa" w:w="{sum(anchos)}"/><w:tblBorders>{bordes}</w:tblBorders>'
             '<w:tblLayout w:type="fixed"/></w:tblPr>')
    grid = ''.join(f'<w:gridCol w:w="{w}"/>' for w in anchos)
    return (f'<w:tbl>{tblpr}<w:tblGrid>{grid}</w:tblGrid>' +
            ''.join(f'<w:tr>{trpr}{"".join(cs)}</w:tr>' for trpr, cs in filas) + '</w:tbl>')


def tr_lista(alto=None, encabezado=False):
    if not (alto or encabezado):
        return ''
    return ('<w:trPr>' + ('<w:tblHeader/>' if encabezado else '') +
            (f'<w:trHeight w:val="{alto}" w:hRule="exact"/>' if alto else '') + '</w:trPr>')


def alumnos_de(sem, fmt):
    return fmt.get('alumnos') or [''] * sem['cotejo'].get('filas', 35)


def hoja_cotejo(sem, fmt):
    """Indicadores y lista con los nombres en UNA hoja vertical (lo pidió el 7 oct: «que quede en la misma página…,
    ponla vertical, hay demasiado espacio, haz más delgados los recuadros»). Ancho útil: 12240 − 2 × 576 = 11088."""
    L, n = fmt['lista'], len(sem['cotejo']['indicadores'])
    gris = lambda w, t: c_lista(w, t, 16, True, 'center', True, (30, 60))
    filas = [(tr_lista(encabezado=True), [gris(500, 'No.'), gris(7088, 'Indicador'), gris(3500, 'Momento')])]
    for k, (texto, (s, m)) in enumerate(sem['cotejo']['indicadores'], 1):
        filas.append(('', [c_lista(500, str(k), 16, True, 'center', mar=(30, 60)), c_lista(7088, texto, 16, mar=(30, 60)),
                           c_lista(3500, etiqueta_momento(sem, s, m), 16, mar=(30, 60))]))
    indicadores = (p_lista(r_lista(L['titulo_indicadores'], 24, True), 'center', 20) +
                   p_lista(r_lista(f"{L['escuela']} · {L['grupo']} · Docente: {fmt['practicante']}", 16), 'center', 80) +
                   t_lista([500, 7088, 3500], filas))
    anchos = [400, 4000] + [580] * n
    anchos.append(11088 - sum(anchos))                       # «Total» toma lo que sobra
    enc = ([gris(400, 'N°'), gris(4000, 'Nombre del alumno')] + [gris(580, str(k)) for k in range(1, n + 1)] +
           [gris(anchos[-1], 'Total')])
    filas = [(tr_lista(280, True), enc)]
    for k, nombre in enumerate(alumnos_de(sem, fmt), 1):
        filas.append((tr_lista(260), [c_lista(400, str(k), 16, jc='center', mar=(20, 60)), c_lista(4000, nombre, 16, mar=(20, 60))] +
                      [c_lista(w, '', 16, mar=(20, 60)) for w in anchos[2:]]))
    lista = (p_lista(r_lista(f"Lista de cotejo · {L['grupo']}", 22, True), 'left', 20, antes=240) +
             p_lista(r_lista(f"{L['escuela']} · Docente: {fmt['practicante']}   |   Marcar ✓ si logra el indicador "
                             f"y ✗ si no lo logra (indicadores 1–{n} según la rúbrica).", 14), 'left', 60) +
             t_lista(anchos, filas))
    return indicadores + lista


def hoja_producciones(sem, fmt):
    """30 casillas de productos y, al final, dos columnas más anchas: Total y Promedio (lo pidió el 7 oct)."""
    L, n = fmt['lista'], fmt['lista']['producciones']
    w = 284                                                   # casilla de producto
    final = (14688 - 400 - 3728 - n * w) // 2                 # Total y Promedio se reparten lo que sobra
    anchos = [400, 3728] + [w] * n + [final, 14688 - 400 - 3728 - n * w - final]
    enc = ([c_lista(400, 'N°', 15, True, 'center', True, (20, 0)), c_lista(3728, 'Nombre del alumno', 15, True, 'center', True)] +
           [c_lista(w, str(k), 12, True, 'center', True, (20, 0)) for k in range(1, n + 1)] +
           [c_lista(anchos[-2], 'Total', 15, True, 'center', True), c_lista(anchos[-1], 'Promedio', 15, True, 'center', True)])
    filas = [(tr_lista(300, True), enc)]
    # Su formato usa 295; Word suma el grosor de los bordes y el alumno 33 se pasaba solo a otra hoja. Con 285 caben los 33.
    for k, nombre in enumerate(alumnos_de(sem, fmt), 1):
        filas.append((tr_lista(285), [c_lista(400, str(k), 15, jc='center', mar=(20, 0)), c_lista(3728, nombre, 15)] +
                      [c_lista(w, '', 12, mar=(20, 0)) for _ in range(n)] +
                      [c_lista(anchos[-2], '', 15), c_lista(anchos[-1], '', 15)]))
    return (p_lista(r_lista(f"Lista de cotejo de producciones · {L['grupo']}", 24, True), 'center', 10) +
            p_lista(r_lista(f"{L['escuela']} · Docente: {fmt['practicante']}", 16), 'center', 80) +
            p_lista(r_lista('Nota: ', 16, True) + r_lista(L['nota_producciones'], 16), 'left', 60) +
            t_lista(anchos, filas))


def sect_lista(arriba_abajo, vertical=False):
    """Sección con los márgenes del formato y un encabezado vacío (no hereda el de la titular)."""
    hoja = '<w:pgSz w:w="12240" w:h="15840"/>' if vertical else '<w:pgSz w:w="15840" w:h="12240" w:orient="landscape"/>'
    return ('<w:sectPr><w:headerReference r:id="rIdH2" w:type="default"/>' + hoja +
            f'<w:pgMar w:top="{arriba_abajo}" w:right="576" w:bottom="{arriba_abajo}" w:left="576" '
            'w:header="100" w:footer="300" w:gutter="0"/></w:sectPr>')


P_MINIMO = ('<w:p><w:pPr><w:spacing w:before="0" w:after="0" w:line="20" w:lineRule="exact"/>'
            '<w:rPr><w:sz w:val="2"/><w:szCs w:val="2"/></w:rPr>{sect}</w:pPr></w:p>')


def hojas_evaluacion(sem, fmt):
    """Indicadores + lista con nombres en una hoja vertical, y lista de producciones horizontal (430 arriba y abajo)."""
    return (hoja_cotejo(sem, fmt) + P_MINIMO.format(sect=sect_lista(576, vertical=True)) +
            hoja_producciones(sem, fmt) + P_MINIMO.format(sect=''))


# ---------------------------------------------------------------- armado del .docx

def build(fmt, sem, out_path):
    fmt = aplica_datos(fmt, sem)                        # escuela, docente y grupo que él escribió en el Planeador
    sem['_fmt'] = fmt
    z = zipfile.ZipFile(os.path.join(fmt['_dir'], fmt['plantilla']))
    doc = z.read('word/document.xml').decode('utf8')
    hdr = z.read('word/header1.xml').decode('utf8')
    t1, t2, t3 = re.findall(r'<w:tbl>.*?</w:tbl>', doc, re.S)[:3]
    g, c1, L = sem['general'], fmt['tabla1'], None

    campo_central = sem['campo_central']
    metodo = METODOLOGIAS[CAMPOS[campo_central][1]]['nombre']
    f1 = {tuple(c1['central']): (CAMPOS[campo_central][0], L),
          tuple(c1['ejes']): ('\n'.join('• ' + e for e in g['ejes']), L),
          tuple(c1['nombre']): (g['nombre'], L), tuple(c1['tema']): (g['tema'], L),
          tuple(c1['pregunta']): (g['pregunta'], L), tuple(c1['metodologia']): (metodo + '.', L),
          tuple(c1['parciales']): ('\n'.join('• ' + p for p in g['parciales']), L),
          tuple(c1['finales']): (g['finales'], L), tuple(c1['cierre']): (g['cierre'], L)}
    for clave, fila in c1['filas_campo'].items():
        if clave in sem['contenidos']:
            contenido, pdas = sem['contenidos'][clave]
            f1[(fila, 1)] = (contenido, L)
            f1[(fila, 2)] = (pdas, L)
    n1 = fill_table(t1, f1)
    filas = re.findall(r'<w:tr>.*?</w:tr>', n1, re.S)
    for clave, fila in c1['filas_campo'].items():          # filas de campos que no se usan: fuera
        if clave not in sem['contenidos']:
            n1 = n1.replace(filas[fila], '', 1)

    t2x, extra = t2, 5 * (semanas_de(sem) - 1)
    if extra:                                           # dos semanas: 5 renglones más, iguales a los de la plantilla
        molde = re.findall(r'<w:tr>.*?</w:tr>', t2, re.S)[fmt['tabla2_filas_sesion'][-1]]
        k = t2.rfind(molde) + len(molde)
        t2x = t2[:k] + molde * extra + t2[k:]
    f2, libres = {}, []
    for fila, (i, ses) in zip(filas_tabla2(fmt, sem), filas_semana(sem)):
        if i is None:                                   # día sin sesión: renglón en gris, solo con la fecha
            f2[(fila, 0)] = (f'**Sin sesión**\n{ses}', 'center')
            libres.append(fila)
            continue
        fecha, nombres, acts = render_sesion(sem, i, ses)
        f2[(fila, 0)], f2[(fila, 1)], f2[(fila, 2)] = (fecha, 'center'), (nombres, L), (acts, L)
    n2 = fill_table(t2x, f2)
    renglones = re.findall(r'<w:tr>.*?</w:tr>', n2, re.S)
    for fila in libres:
        n2 = n2.replace(renglones[fila], en_gris(renglones[fila]), 1)
    # El encabezado de la tabla de actividades se mantiene con la sesión 1 (no queda solo al pie de una hoja).
    # Es una propiedad invisible de sus párrafos: la estructura de la fila no cambia.
    fila0 = re.findall(r'<w:tr>.*?</w:tr>', n2, re.S)[0]
    amarrada = re.sub(r'<w:p( [^>]*)?>(?!<w:pPr>)', lambda m: m.group(0) + '<w:pPr></w:pPr>', fila0)
    amarrada = amarrada.replace('<w:pPr>', '<w:pPr><w:keepNext/>')
    n2 = n2.replace(fila0, amarrada, 1)

    c3 = fmt['tabla3']
    f3 = {tuple(c3['vinculacion']): (lista_junta(sem.get('vinculacion') or vinculacion_de(sem)), L),   # 10 oct: de la semana
          tuple(c3['recursos']): (lista_junta(sem.get('recursos') or recursos_de(sem)), L),   # 10 oct: de las consignas
          tuple(c3['evaluacion']): (render_evaluacion(sem), L),
          tuple(c3['nee']): (sem['nee'] if 'nee' in sem else fmt['nee'], L)}     # 10 oct: '' = sin alumnos con NEE
    n3 = fill_table(t3, f3)
    doc = doc.replace(t1, n1, 1).replace(t2, n2, 1).replace(t3, n3, 1)

    sect1 = re.search(r'<w:sectPr>.*?</w:sectPr>', doc, re.S).group(0)
    extra = PAGE_BREAK + para('', after=600) + firmas(fmt['firmas'])
    i = doc.rfind('<w:sectPr>')
    if con_hojas_eval(sem):                             # las de antes: hojas de evaluación en secciones aparte
        extra += f'<w:p><w:pPr>{sect1}</w:pPr></w:p>' + hojas_evaluacion(sem, fmt)
        doc = doc[:i] + extra + sect_lista(430) + doc[doc.rfind('</w:sectPr>') + len('</w:sectPr>'):]
    else:                                               # 10 oct: la hoja de firmas es la última (y un párrafo
        doc = doc[:i] + extra + P_MINIMO.format(sect='') + doc[i:]     # mínimo: Word no termina el cuerpo en tabla)

    e = fmt['encabezado']
    lab = e['periodo_rotulo'] + '</w:t></w:r>'
    assert lab in hdr, 'no encontré el rótulo del periodo en el encabezado'
    hdr = hdr.replace(lab, lab + run(sem['periodo'], sz=24), 1)
    for patron, reemplazo in e.get('reemplazos', []):
        hdr, k = re.subn(patron, reemplazo, hdr)
        assert k == 1, f'encabezado: el patrón {patron!r} no aparece exactamente una vez'
    dat = datos_de(fmt, sem)                            # datos de la escuela y del grupo: en mayúsculas, {ESCUELA}
    seguro = lambda v: escape(v).replace('\\', '\\\\')
    vals = {**{k: seguro(v) for k, v in dat.items()}, **{k.upper(): seguro(v.upper()) for k, v in dat.items()}}
    for patron, plantilla in e.get('campos', []):
        hdr, k = re.subn(patron, plantilla.format(**vals), hdr)
        assert k == 1, f'encabezado: el patrón {patron!r} no aparece exactamente una vez'

    hdr, media, rels_hdr = logos_cedros(fmt, dat, hdr)

    with zipfile.ZipFile(out_path, 'w', zipfile.ZIP_DEFLATED) as out:
        for item in z.infolist():
            data = z.read(item.filename)
            if item.filename == 'word/document.xml':
                data = doc.encode('utf8')
            elif item.filename == 'word/header1.xml':
                data = hdr.encode('utf8')
            elif item.filename == 'word/_rels/header1.xml.rels' and rels_hdr:
                data = data.decode('utf8').replace('</Relationships>', rels_hdr + '</Relationships>').encode('utf8')
            elif item.filename == 'word/_rels/document.xml.rels':
                data = data.decode('utf8').replace('</Relationships>',
                    '<Relationship Id="rIdH2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" '
                    'Target="header2.xml"/></Relationships>').encode('utf8')
            elif item.filename == '[Content_Types].xml':
                data = data.decode('utf8').replace('</Types>',
                    '<Override ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml" '
                    'PartName="/word/header2.xml"/></Types>').encode('utf8')
            out.writestr(item, data)
        hdr2 = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'      # vacío: sus formatos no llevan encabezado
                '<w:hdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" '
                'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
                P_MINIMO.format(sect='') + '</w:hdr>')
        out.writestr('word/header2.xml', hdr2.encode('utf8'))
        for nombre, data in media.items():              # los logos (archivos nuevos)
            out.writestr(nombre, data)
    print('ok', out_path)


def logos_cedros(fmt, dat, hdr):
    """Logos del Planeador en el encabezado de la titular (11 oct). El izquierdo va en lugar del escudo y se ajusta a su caja
    (puede ser más ancho, hasta 'max_cx'); el derecho va en la esquina derecha, a la altura del escudo, y el recuadro con el
    nombre de la escuela se recorre a la izquierda o se angosta para que no se encimen. Devuelve (encabezado, {archivo del
    .docx: bytes}, relaciones nuevas del encabezado)."""
    L, media, rels = fmt.get('logos'), {}, ''
    izq, der = imagen_de(dat.get('logo_izq')), imagen_de(dat.get('logo_der'))
    if not L or not (izq or der):
        return hdr, media, rels
    e, caja = L['escudo'], L['recuadro']
    ancho_izq, alto = e['cx'], e['cy']
    if izq:
        datos, ext, w, h = izq
        cx, cy = encaja(w, h, e['max_cx'], e['cy'])
        viejo = f'cx="{e["cx"]}" cy="{e["cy"]}"'
        assert hdr.count(viejo) == 2, 'no encontré el escudo en el encabezado'
        hdr = hdr.replace(viejo, f'cx="{cx}" cy="{cy}"')
        assert hdr.count(f'r:embed="{e["rid"]}"') == 1, 'no encontré la imagen del escudo'
        hdr = hdr.replace(f'r:embed="{e["rid"]}"', 'r:embed="rIdLogoIzq"')     # el escudo queda en el paquete, sin usarse
        media[f'word/media/logo_izq.{ext}'] = datos
        rels += ('<Relationship Id="rIdLogoIzq" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" '
                 f'Target="media/logo_izq.{ext}"/>')
        ancho_izq, alto = cx, cy
    x, cx_caja = caja['x'], caja['cx']
    if der:
        datos, ext, w, h = der
        cx, cy = encaja(w, h, e['max_cx'], e['cy'])
        media[f'word/media/logo_der.{ext}'] = datos
        rels += ('<Relationship Id="rIdLogoDer" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" '
                f'Target="media/logo_der.{ext}"/>')
        k = hdr.find('</mc:AlternateContent></w:r>')
        assert k > 0, 'no encontré el recuadro de la escuela en el encabezado'
        k += len('</mc:AlternateContent></w:r>')
        hdr = hdr[:k] + dibujo('rIdLogoDer', cx, cy, 9001, 'Logo derecho', ('right', max(0, (alto - cy) // 2))) + hdr[k:]
        fin = L['ancho_util'] - cx - L['separacion']                       # hasta dónde puede llegar el recuadro
        inicio = L['inicio_escudo'] + ancho_izq + L['separacion']          # desde dónde
        if x + cx_caja > fin:
            x = max(inicio, fin - cx_caja)
            cx_caja = fin - x
    elif izq and L['inicio_escudo'] + ancho_izq + L['separacion'] > x:      # un logo izquierdo ancho: el recuadro se angosta
        nuevo_x = L['inicio_escudo'] + ancho_izq + L['separacion']
        cx_caja, x = cx_caja - (nuevo_x - x), nuevo_x
    if (x, cx_caja) != (caja['x'], caja['cx']):
        assert hdr.count(f'<wp:posOffset>{caja["x"]}</wp:posOffset>') == 2 and hdr.count(f'cx="{caja["cx"]}"') == 3
        hdr = hdr.replace(f'<wp:posOffset>{caja["x"]}</wp:posOffset>', f'<wp:posOffset>{x}</wp:posOffset>')
        hdr = hdr.replace(f'cx="{caja["cx"]}"', f'cx="{cx_caja}"')
        hdr = hdr.replace(f'cx="{caja["cx_interior"]}"', f'cx="{cx_caja - (caja["cx"] - caja["cx_interior"])}"')
    return hdr, media, rels


if __name__ == '__main__':
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    build(cargar_formato(sys.argv[1]), cargar_semana(sys.argv[2]), sys.argv[3])
