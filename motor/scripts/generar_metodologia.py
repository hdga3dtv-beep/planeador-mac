# -*- coding: utf-8 -*-
"""Arma la planeación en el formato de su metodología (Planeador, 11 oct): proyecto comunitario (ABPC), indagación STEAM,
aprendizaje basado en problemas (ABP) o aprendizaje servicio (AS), la del campo formativo central.

Uso:  python generar_metodologia.py <formato.json> <semana.py|json> <salida.docx>

A diferencia de generar.py, no llena la plantilla de la titular: arma un .docx propio, horizontal, con
  - encabezado: título del proyecto según la metodología, escuela, C.C.T., zona, sector, docente, fase, grupo y periodo;
  - «Datos del proyecto» con los nombres que esa metodología da a sus casillas (FORMATOS_MET en comun.py);
  - contenidos y PDA;
  - una tabla ordenada por las fases (solo ABPC), momentos o etapas, con sesión, actividades y productos;
  - vinculación y recursos, evaluación formativa, ajustes razonables y la hoja de firmas.
Del formato .json solo toma los datos de la escuela, los cuadernos y las firmas.
"""
import os, re, sys, zipfile
from xml.sax.saxutils import escape
from comun import (CAMPOS, METODOLOGIAS, FORMATOS_MET, COLOR_CAMPO, MARCA_MET, cargar_semana, cargar_formato,
                   aplica_datos, datos_de, etapas_de, corto, recursos_de, vinculacion_de, escenario_de, productos_de,
                   momentos_de, es_secuencia, imagen_de, encaja, dibujo)
from generar import cell_xml, render_evaluacion, P_MINIMO, EMPTY_P

ANCHO = 14400                      # carta horizontal con márgenes de 1.27 cm: 15840 − 2 × 720
SZ = 20                            # Arial 10 en las tablas
GRIS_ETQ = 'EFEDE8'                # columna de rótulos


def tinte(hexa, k):
    """Color del campo mezclado con blanco (k = cuánto del color): encabezados de tabla y columna de fase."""
    c = [int(hexa[i:i + 2], 16) for i in (0, 2, 4)]
    return ''.join(f'{round(255 - (255 - v) * k):02X}' for v in c)


def r(texto, b=False, i=False, sz=SZ, color=None):
    rpr = ('<w:rFonts w:ascii="Arial" w:cs="Arial" w:eastAsia="Arial" w:hAnsi="Arial"/>' + ('<w:b/><w:bCs/>' if b else '') +
           ('<w:i/><w:iCs/>' if i else '') + (f'<w:color w:val="{color}"/>' if color else '') +
           f'<w:sz w:val="{sz}"/><w:szCs w:val="{sz}"/>')
    return f'<w:r><w:rPr>{rpr}</w:rPr><w:t xml:space="preserve">{escape(texto)}</w:t></w:r>'


def p(runs, jc=None, antes=0, despues=60, keep=False, borde=None):
    ppr = ('<w:keepNext/>' if keep else '') + \
          (f'<w:pBdr><w:bottom w:val="single" w:sz="{borde}" w:space="4" w:color="333333"/></w:pBdr>' if borde else '') + \
          f'<w:spacing w:before="{antes}" w:after="{despues}" w:line="240" w:lineRule="auto"/>' + \
          (f'<w:jc w:val="{jc}"/>' if jc else '')
    return f'<w:p><w:pPr>{ppr}</w:pPr>{runs}</w:p>'


def celda(w, contenido, fondo=None, vmerge=None, valign='top'):
    """contenido: marcado de cell_xml (texto) o XML ya armado (empieza con '<w:p')."""
    tcpr = (f'<w:tcW w:w="{w}" w:type="dxa"/>' + (f'<w:vMerge w:val="{vmerge}"/>' if vmerge == 'restart' else
                                                   '<w:vMerge/>' if vmerge else '') +
            (f'<w:shd w:val="clear" w:color="auto" w:fill="{fondo}"/>' if fondo else '') + f'<w:vAlign w:val="{valign}"/>')
    if vmerge == 'continue' or not contenido:
        cuerpo = EMPTY_P
    elif contenido.startswith('<w:p'):
        cuerpo = contenido
    else:
        cuerpo = cell_xml(contenido, None, sz=SZ, gap=40)
    return f'<w:tc><w:tcPr>{tcpr}</w:tcPr>{cuerpo}</w:tc>'


def tabla(anchos, filas, encabezado=None, fondo_enc=None, con_bordes=True):
    """filas: listas de celdas ya armadas; encabezado: rótulos (se repite en cada hoja)."""
    bordes = ''.join((f'<w:{s} w:val="single" w:sz="4" w:space="0" w:color="9C9A94"/>' if con_bordes else f'<w:{s} w:val="nil"/>')
                     for s in ('top', 'left', 'bottom', 'right', 'insideH', 'insideV'))
    tblpr = (f'<w:tblPr><w:tblW w:w="{sum(anchos)}" w:type="dxa"/><w:tblBorders>{bordes}</w:tblBorders>'
             '<w:tblLayout w:type="fixed"/><w:tblCellMar><w:top w:w="40" w:type="dxa"/><w:left w:w="90" w:type="dxa"/>'
             '<w:bottom w:w="40" w:type="dxa"/><w:right w:w="90" w:type="dxa"/></w:tblCellMar></w:tblPr>')
    grid = ''.join(f'<w:gridCol w:w="{w}"/>' for w in anchos)
    out = []
    if encabezado:
        out.append('<w:tr><w:trPr><w:cantSplit/><w:tblHeader/></w:trPr>' +
                   ''.join(celda(w, p(r(t, b=True)), fondo_enc, valign='center') for w, t in zip(anchos, encabezado)) + '</w:tr>')
    out += ['<w:tr><w:trPr><w:cantSplit/></w:trPr>' + ''.join(f) + '</w:tr>' for f in filas]
    return f'<w:tbl>{tblpr}<w:tblGrid>{grid}</w:tblGrid>{"".join(out)}</w:tbl>' + p('', despues=0)


def rotulos(filas, anchos=(3200, ANCHO - 3200)):
    """Tabla de dos columnas: rótulo en gris | valor."""
    return tabla(list(anchos), [[celda(anchos[0], p(r(k, b=True)), GRIS_ETQ), celda(anchos[1], v)] for k, v in filas])


def titulo_seccion(texto, color):
    return p(r(texto.upper(), b=True, sz=22, color=color), antes=200, despues=80, keep=True)


def vinetas(xs):
    return '\n'.join('• ' + x for x in xs)


def actividades(sem, ses):
    """Cada momento de la sesión: «Inicio.» y su PDA en cursiva, y debajo las consignas; al final la tarea."""
    xml = ''
    for m in ses['momentos']:
        nombre = corto(m['momento']) + (' (continuación)' if m.get('continuacion') else '')
        xml += p(r(nombre + '.', b=True) + (r(' ' + m['pda'], i=True) if m.get('pda') else ''), antes=40, despues=30)
        xml += cell_xml(vinetas(m['consignas']), None, sz=SZ, gap=30) if m['consignas'] else ''
    if ses.get('tarea'):
        agenda = sem['_fmt'].get('cuadernos', {}).get('agenda', 'agenda')
        xml += cell_xml(f"**Tarea** (pide que la anoten en la {agenda}): {ses['tarea']}", None, sz=SZ, gap=30)
    return xml


def fases_de(etapas):
    """['Preparación – Identificamos', 'Preparación – Recuperamos'] -> 'Preparación' (las de la sesión, sin repetir)."""
    fs = []
    for e in etapas:
        f = e.split(' – ', 1)[0] if ' – ' in e else ''
        if f and f not in fs:
            fs.append(f)
    return ' y '.join(fs)


def tabla_metodologia(sem, met, color):
    cfg, con_fase = FORMATOS_MET[met], FORMATOS_MET[met]['fases']
    anchos = [1500, 1900, 1500, 7000, 2500] if con_fase else [2300, 1600, 7600, 2900]
    enc = (['Fase'] if con_fase else []) + [cfg['parte'], 'Sesión', 'Actividades', 'Productos']
    ses = sem['sesiones']
    # Mapa de llaves: la etapa de cada sesión. Estructura por metodología (la skill sin Planeador): sus momentos.
    partes = [etapas_de(s) or ([] if es_secuencia(sem) else list(dict.fromkeys(m['momento'] for m in s['momentos'])))
              for s in ses]
    fases = [fases_de(e) for e in partes]
    filas = []
    for k, s in enumerate(ses):
        fila = []
        if con_fase:                                   # la fase se une en los renglones seguidos que la comparten
            primera = k == 0 or fases[k - 1] != fases[k]
            fila.append(celda(anchos[0], p(r(fases[k], b=True)) if primera else '', tinte(color, .09),
                              'restart' if primera else 'continue', valign='center'))
        a = anchos[-4:]
        nombres = '\n'.join(f'**{corto(e)}**' for e in partes[k])
        prods = [x[0].upper() + x[1:] for x in productos_de([c for m in s['momentos'] for c in m['consignas']])]
        fila += [celda(a[0], nombres), celda(a[1], f"**Sesión {k + 1}**\n{s['fecha']}"),
                 celda(a[2], actividades(sem, s)), celda(a[3], vinetas(prods))]
        filas.append(fila)
    return tabla(anchos, filas, enc, tinte(color, .16))


def firmas_hoja(personas):
    """Como la de la Planeación Cedros: la persona de más jerarquía sola y centrada si son nones; luego de dos en dos."""
    def c(w, n, rol):
        k = dict(despues=0, keep=True)                  # todo el bloque de firmas se mantiene junto
        return celda(w, p('', **k) * 3 + p(r('_' * 36), 'center', **k) + p(r(n, b=True), 'center', **k) +
                     ''.join(p(r(x), 'center', **k) for x in rol.split('\n')))
    xml = ''
    if len(personas) % 2:
        xml += tabla([ANCHO], [[c(ANCHO, *personas[0])]], con_bordes=False)
        personas = personas[1:]
    if personas:
        xml += tabla([ANCHO // 2] * 2, [[c(ANCHO // 2, *personas[k]), c(ANCHO // 2, *personas[k + 1])]
                                        for k in range(0, len(personas), 2)], con_bordes=False)
    return xml


LOGO_CAJA = (1300000, 860000)       # EMU: hasta 3.6 cm de ancho y 2.4 cm de alto


def encabezado(d, sem, cfg, media):
    """Título, escuela, docente, periodo y, si la escribió, la escuela normal. Con logos (11 oct): una tabla sin bordes
    con el logo izquierdo, el texto al centro y el logo derecho, solo arriba de la primera hoja."""
    x = p(f'<w:bookmarkStart w:id="0" w:name="{MARCA_MET}"/><w:bookmarkEnd w:id="0"/>' +
          r(cfg['titulo'].upper(), b=True, sz=30), 'center', despues=60)
    x += p(r(d.get('escuela', ''), b=True) + r(f" · C.C.T. {d.get('cct', '')} · Zona escolar {d.get('zona', '')}, "
                                              f"sector {d.get('sector', '')}"), 'center', despues=20)
    gg = f"{d['grado']}.º {d.get('grupo', '')}".strip() if d.get('grado') else d.get('grupo', '')     # «6.º B», como las firmas
    x += p(r(f"Docente: {d.get('docente', '')} · Fase {d.get('fase', '')} · {gg} · Periodo: {sem['periodo']}"),
           'center', despues=20)
    if d.get('normal'):
        x += p(r(f"Escuela normal: {d['normal']}"), 'center', despues=20)
    logos = {}
    for lado, ident in (('izq', 101), ('der', 102)):
        img = imagen_de(d.get(f'logo_{lado}'))
        if img:
            datos, ext, w, h = img
            rid = f'rIdLogo{lado.capitalize()}'
            media[rid] = (f'media/logo_{lado}.{ext}', datos)
            logos[lado] = p(dibujo(rid, *encaja(w, h, *LOGO_CAJA), ident, f'Logo {lado}'), 'left' if lado == 'izq' else 'right',
                            despues=0)
    if logos:
        lado = 2100                                      # twips: 3.7 cm por lado
        x = tabla([lado, ANCHO - 2 * lado, lado], [[celda(lado, logos.get('izq', ''), valign='center'),
                                                    celda(ANCHO - 2 * lado, x, valign='center'),
                                                    celda(lado, logos.get('der', ''), valign='center')]], con_bordes=False)
        x = x[:x.rfind('<w:p>')]                         # sin el párrafo vacío que tabla() deja después
    return x + p('', despues=160, borde=12)


def cuerpo(fmt, sem, media):
    campo = sem['campo_central']
    met = CAMPOS[campo][1]
    cfg, color = FORMATOS_MET[met], COLOR_CAMPO[campo]
    d, g = datos_de(fmt, sem), sem['general']
    x = encabezado(d, sem, cfg, media)

    otros = [CAMPOS[k][0] for k in sem['contenidos'] if k != campo]
    datos = [('Nombre del proyecto', g['nombre']),
             ('Campo formativo', CAMPOS[campo][0] + (f" · vinculado con {', '.join(otros)}" if otros else '')),
             ('Metodología', METODOLOGIAS[met]['nombre'])]
    if cfg['fases']:
        datos.append(('Escenario', escenario_de(sem) or '—'))
    for etq, clave in cfg['campos']:
        if clave == 'finales':
            datos.append(('Productos parciales', vinetas(g['parciales'])))
        datos.append((etq, g[clave]))
    datos.append(('Ejes articuladores', ', '.join(g['ejes'])))
    x += titulo_seccion('Datos del proyecto', color) + rotulos(datos)

    orden = [campo] + [k for k in sem['contenidos'] if k != campo]
    filas = [[celda(2600, CAMPOS[k][0]), celda(4600, sem['contenidos'][k][0]), celda(7200, sem['contenidos'][k][1])]
             for k in orden if k in sem['contenidos']]
    x += titulo_seccion('Contenidos y PDA', color) + tabla([2600, 4600, 7200], filas, ['Campo formativo', 'Contenido', 'PDA'],
                                                          tinte(color, .16))

    x += titulo_seccion('Etapas de la metodología' if cfg['parte'] == 'Etapa' else 'Momentos de la metodología', color)
    x += p(r(' → '.join(corto(m) for m in momentos_de(sem)), color='555555'), 'center', despues=80, keep=True)
    x += tabla_metodologia(sem, met, color)

    x += titulo_seccion('Vinculación y recursos', color)
    x += rotulos([('Libros de texto', vinetas(sem.get('vinculacion') or vinculacion_de(sem)) or '—'),
                  ('Recursos', vinetas(sem.get('recursos') or recursos_de(sem)) or '—')])
    x += titulo_seccion('Evaluación formativa', color) + rotulos([('Técnicas e instrumentos', render_evaluacion(sem))])
    x += titulo_seccion('Ajustes razonables', color) + rotulos([('Alumnos con NEE', sem.get('nee', '') or '—')])

    x += p('', despues=480, keep=True) + firmas_hoja(fmt['firmas'])   # sin hoja aparte: no deja una hoja casi vacía
    return x


def gris(t):
    return ('<w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:color w:val="777777"/><w:sz w:val="16"/>'
            f'<w:szCs w:val="16"/></w:rPr><w:t xml:space="preserve">{escape(t)}</w:t></w:r>')


def pie_pagina(texto):
    """«Proyecto de indagación STEAM · Nombre · página 2 de 5», centrado y en gris (campos completos: así el número
    conserva la letra del pie)."""
    rpr = ('<w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:color w:val="777777"/><w:sz w:val="16"/>'
           '<w:szCs w:val="16"/></w:rPr>')
    campo = lambda instr: (f'<w:r>{rpr}<w:fldChar w:fldCharType="begin"/></w:r>'
                           f'<w:r>{rpr}<w:instrText xml:space="preserve"> {instr} </w:instrText></w:r>'
                           f'<w:r>{rpr}<w:fldChar w:fldCharType="separate"/></w:r><w:r>{rpr}<w:t>1</w:t></w:r>'
                           f'<w:r>{rpr}<w:fldChar w:fldCharType="end"/></w:r>')
    return (f'<w:p><w:pPr><w:spacing w:before="0" w:after="0"/><w:jc w:val="center"/></w:pPr>{gris(texto + " · página ")}'
            f'{campo("PAGE")}{gris(" de ")}{campo("NUMPAGES")}</w:p>')


def build(fmt, sem, out_path):
    fmt = aplica_datos(fmt, sem)
    sem['_fmt'] = fmt
    campo = sem['campo_central']
    cfg = FORMATOS_MET[CAMPOS[campo][1]]
    ns = ('xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" '
          'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"')
    sect = ('<w:sectPr><w:footerReference w:type="default" r:id="rIdF1"/>'
            '<w:pgSz w:w="15840" w:h="12240" w:orient="landscape"/>'
            '<w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720" w:header="360" w:footer="360" w:gutter="0"/></w:sectPr>')
    media = {}                                           # rId: (archivo dentro de word/, bytes) de los logos
    doc = (f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document {ns}><w:body>' + cuerpo(fmt, sem, media) +
           P_MINIMO.format(sect='') + sect + '</w:body></w:document>')
    pie = (f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr {ns}>' +
           pie_pagina(f"{cfg['titulo']} · {sem['general']['nombre']}") + '</w:ftr>')
    estilos = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
               '<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr>'
               '<w:rFonts w:ascii="Arial" w:eastAsia="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="20"/><w:szCs w:val="20"/>'
               '<w:lang w:val="es-MX" w:eastAsia="es-MX" w:bidi="ar-SA"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr>'
               '<w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>'
               '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>'
               '<w:style w:type="table" w:default="1" w:styleId="TablaNormal"><w:name w:val="Normal Table"/><w:tblPr>'
               '<w:tblInd w:w="0" w:type="dxa"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/>'
               '<w:bottom w:w="0" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style></w:styles>')
    ajustes = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
               '<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:defaultTabStop w:val="708"/>'
               '<w:characterSpacingControl w:val="doNotCompress"/><w:compat><w:compatSetting w:name="compatibilityMode" '
               'w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat></w:settings>')
    tipos = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
             '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
             '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
             '<Default Extension="xml" ContentType="application/xml"/>'
             '<Default Extension="png" ContentType="image/png"/><Default Extension="jpeg" ContentType="image/jpeg"/>'
             '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
             '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>'
             '<Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>'
             '<Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>'
             '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>')
    rel = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
    rels = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            f'<Relationship Id="rId1" Type="{rel}/officeDocument" Target="word/document.xml"/>'
            '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" '
            'Target="docProps/core.xml"/></Relationships>')
    doc_rels = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
                '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
                f'<Relationship Id="rIdS" Type="{rel}/styles" Target="styles.xml"/>'
                f'<Relationship Id="rIdA" Type="{rel}/settings" Target="settings.xml"/>'
                f'<Relationship Id="rIdF1" Type="{rel}/footer" Target="footer1.xml"/>' +
                ''.join(f'<Relationship Id="{rid}" Type="{rel}/image" Target="{ruta}"/>' for rid, (ruta, _) in media.items()) +
                '</Relationships>')
    core = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" '
            'xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>' + escape(f"{cfg['titulo']}: {sem['general']['nombre']}") +
            '</dc:title><dc:creator>' + escape(datos_de(fmt, sem).get('docente', '')) + '</dc:creator></cp:coreProperties>')
    with zipfile.ZipFile(out_path, 'w', zipfile.ZIP_DEFLATED) as z:
        for nombre, txt in (('[Content_Types].xml', tipos), ('_rels/.rels', rels), ('word/document.xml', doc),
                            ('word/_rels/document.xml.rels', doc_rels), ('word/styles.xml', estilos),
                            ('word/settings.xml', ajustes), ('word/footer1.xml', pie), ('docProps/core.xml', core)):
            z.writestr(nombre, txt.encode('utf8'))
        for ruta, datos in media.values():
            z.writestr('word/' + ruta, datos)
    print('ok', out_path)


if __name__ == '__main__':
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    build(cargar_formato(sys.argv[1]), cargar_semana(sys.argv[2]), sys.argv[3])
