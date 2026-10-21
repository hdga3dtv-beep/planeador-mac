'use strict';
/* Planeador 6.º A — panel de planeaciones. Todo el armado del Word lo hace el motor de la skill (servidor.py). */

const $ = s => document.querySelector(s);
const COLOR = { len: 'var(--len)', spc: 'var(--spc)', ens: 'var(--ens)', dhc: 'var(--dhc)' };
const ORDEN = ['ens', 'dhc', 'len', 'spc'];            // como en la imagen de los campos
const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre',
  'noviembre', 'diciembre'];
let D = null;          // datos del servidor (programa, metodologías, libro 4, formato)
let S = null;          // estado del panel
let tab = 'ens';

/* íconos del diseño «cuaderno de colores» (11 oct) */
const SVG = (d, w = 2.2, extra = '') => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>${extra}</svg>`;
const PALOMITA = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ESTRELLA = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8z" fill="currentColor"/></svg>`;
const AGARRE = `<svg class="agarre" viewBox="0 0 12 20" aria-hidden="true"><g fill="currentColor"><circle cx="3" cy="4" r="1.6"/><circle cx="9" cy="4" r="1.6"/><circle cx="3" cy="10" r="1.6"/><circle cx="9" cy="10" r="1.6"/><circle cx="3" cy="16" r="1.6"/><circle cx="9" cy="16" r="1.6"/></g></svg>`;
const LLAVE = `<svg class="llave-svg" viewBox="0 0 240 20" preserveAspectRatio="none" aria-hidden="true"><path d="M3 3 Q3 11 14 11 L108 11 Q120 11 120 18 Q120 11 132 11 L226 11 Q237 11 237 3" fill="none" stroke-width="2.4" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>`;
const BOTE = SVG('M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13', 2);
const PERSONA = SVG('M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0', 2);
const TACHE = `<svg class="r-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="#c2292f" stroke-width="3" stroke-linecap="round"/></svg>`;
const ADMIRACION = `<svg class="r-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v10M12 19v.5" fill="none" stroke="#b07f00" stroke-width="3" stroke-linecap="round"/></svg>`;

/* Ruta de la planeación (11 oct): los 9 pasos arriba, con los que ya están listos, el que sigue («aquí vas») y los que
   faltan. Cada paso tiene su plumón (--pN en app.css). El paso 8 es opcional: sin alumnos con NEE no cuenta como pendiente. */
const PASOS = [
  { id: 's-datos', corto: 'Datos', titulo: 'Datos generales' },
  { id: 's-campo', corto: 'Campo', titulo: 'Campo formativo y metodología' },
  { id: 's-contenidos', corto: 'Contenidos', titulo: 'Contenidos y PDA' },
  { id: 's-proyecto', corto: 'Proyecto', titulo: 'Datos del proyecto' },
  { id: 's-reparto', corto: 'Etapas', titulo: 'Etapas de la metodología' },
  { id: 's-semana', corto: 'Semana', titulo: 'La semana' },
  { id: 's-eval', corto: 'Evaluación', titulo: 'Evaluación' },
  { id: 's-nee', corto: 'NEE', titulo: 'Ajustes para alumnos NEE' },
  { id: 's-formato', corto: 'Formato', titulo: 'Formato de la planeación' },
];
function estadoPasos() {             // true = listo, false = falta, null = opcional y vacío
  const d = S.datos, g = S.general, lleno = x => !!String(x || '').trim(), act = activos();
  const k = formatoActual(), mia = S.central ? D.campos[S.central].metodologia : null;
  return [
    ['escuela', 'cct', 'grupo', 'docente'].every(x => lleno(d[x])),
    !!S.central,
    contListos(),
    ['nombre', 'tema', 'pregunta', 'parciales', 'finales', 'cierre'].every(x => lleno(g[x])) && g.ejes.length > 0,
    !!S.listo,
    !!S.listo && act.length > 0 && act.every(i => S.sesiones[i].momentos.every(m => lleno(m.consignas))),
    S.instrumentos.length > 0,
    S.alumnosNee.some(x => lleno(x.nombre + x.necesidades + x.ajustes)) ? true : null,
    !!S.central && (k === 'cedros' || k === mia),
  ];
}
function renderRuta() {
  const r = $('#ruta');
  if (!r || !D || !S) return;
  const e = estadoPasos(), act = e.indexOf(false), n = e.filter(x => x === true).length, m = metodo();
  const corto = k => k === 4 && m ? (sonEtapas(m) ? 'Etapas' : 'Momentos') : PASOS[k].corto;
  const titulo = k => k === 4 && m ? `${sonEtapas(m) ? 'Etapas' : 'Momentos'} de la metodología` : PASOS[k].titulo;
  r.innerHTML = `<div class="ruta-cab"><h2>Tu ruta de planeación</h2><p>${act < 0
      ? '<b>¡Todo listo!</b> Pica «Revisar» y luego «Generar Word y PDF».'
      : `<b>${n} de 9</b> pasos listos · vas en <b>${esc(titulo(act))}</b>`}</p></div>
    <div class="ruta-pasos"><ol>${PASOS.map((p, k) => {
      const cls = e[k] === true ? 'listo' : k === act ? 'actual' : e[k] === null ? 'opcional' : '';
      const estado = e[k] === true ? 'listo' : k === act ? 'aquí vas' : e[k] === null ? 'opcional' : 'falta';
      return `<li class="${cls}" style="--p:var(--p${k + 1});--n:var(--n${k + 1});--t:var(--t${k + 1})">
        <a href="#${p.id}" aria-label="Paso ${k + 1}, ${esc(titulo(k))}: ${estado}"${k === act ? ' aria-current="step"' : ''}>
          <span class="bola">${e[k] === true ? PALOMITA : k + 1}</span><span>${esc(corto(k))}</span>
          ${k === act ? '<span class="aqui">aquí vas</span>' : e[k] === null ? '<span class="opc">opcional</span>' : ''}</a></li>`;
    }).join('')}</ol></div>`;
}

/* ---------------------------------------------------------------- utilidades */
const esc = t => String(t ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const lineas = t => String(t || '').split('\n').map(x => x.trim()).filter(Boolean);
const norm = t => String(t || '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('ver'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('ver'), 2600); }
function deIso(iso) { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d); }
function aIso(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function proximoLunes() { const d = new Date(); const w = d.getDay(); d.setDate(d.getDate() + (w === 1 ? 0 : ((8 - w) % 7 || 7))); return aIso(d); }
function semanaDe(iso, semanas = 1) {       // 5 o 10 días de clase seguidos desde el día en que empieza (puede no ser lunes)
  const d = deIso(iso), dias = [];
  while (dias.length < 5 * semanas) {
    if (d.getDay() >= 1 && d.getDay() <= 5) dias.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return dias;
}
const nombreDe = f => DIAS[f.getDay() - 1];
function textoFecha(d) { return `${nombreDe(d)} ${d.getDate()} de ${MESES[d.getMonth()]}`; }
function periodo(iso, semanas = 1, hasta = null) {      // «5 al 16 de octubre de 2026»; hasta: otro último día
  const f = semanaDe(iso, semanas), a = f[0], b = hasta || f[f.length - 1];
  if (a.getMonth() === b.getMonth()) return `${a.getDate()} al ${b.getDate()} de ${MESES[b.getMonth()]} de ${b.getFullYear()}`;
  if (a.getFullYear() === b.getFullYear()) return `${a.getDate()} de ${MESES[a.getMonth()]} al ${b.getDate()} de ${MESES[b.getMonth()]} de ${b.getFullYear()}`;
  return `${a.getDate()} de ${MESES[a.getMonth()]} de ${a.getFullYear()} al ${b.getDate()} de ${MESES[b.getMonth()]} de ${b.getFullYear()}`;
}
const metodo = () => S.central ? D.metodologias[D.campos[S.central].metodologia] : null;
const nDias = () => 5 * (S.semanas || 1);                 // una semana o dos (10 oct)
const todosDias = () => [...Array(nDias()).keys()];
const fechasDe = () => semanaDe(S.inicio, S.semanas || 1);
const nombreDia = d => nombreDe(fechasDe()[d]);           // día de la planeación (0 = el primero) → «Miércoles»
function rangoSemana(w) {            // «12 al 16 de octubre» (o «28 de septiembre al 2 de octubre») de la semana w
  const f = fechasDe(), a = f[5 * w], b = f[5 * w + 4];
  return a.getMonth() === b.getMonth() ? `${a.getDate()} al ${b.getDate()} de ${MESES[b.getMonth()]}`
    : `${a.getDate()} de ${MESES[a.getMonth()]} al ${b.getDate()} de ${MESES[b.getMonth()]}`;
}
/* reparto de la metodología (10 oct): él arrastra cada etapa o momento del campo central al día que le toca. Un día puede
   llevar varios; el que se queda sin ninguno no tiene sesión (gris). «Listo» arma el mapa de llaves con los demás.
   S.sesiones guarda siempre los 5 días (0 = lunes); el número de sesión cuenta solo los días con sesión.
   «Unir» junta un día con el siguiente que tenga clase en un solo recuadro: las tiras que caen ahí van en todos esos días.
   Un día marcado «Sin clase» no recibe tiras y «Unir» lo brinca (lunes unido, martes sin clase → se une con el miércoles).
   S.uniones[k]: el día k va unido con el siguiente día con clase; S.sinClase[k]: ese día no hay clase. */
const sonEtapas = m => m.momentos.length <= 5;            // De lo humano y Saberes: etapas; Lenguajes y Ética: momentos
const palabra = () => !metodo() ? 'momentos o etapas' : sonEtapas(metodo()) ? 'etapas' : 'momentos';
const losDe = () => (palabra() === 'etapas' ? 'las ' : 'los ') + palabra();
const sinRepartir = () => (metodo()?.momentos || []).filter(x => !S.sesiones.some(s => s.etapa.includes(x)));
function gruposDias() {        // días con clase que comparten recuadro: [[0, 2], [3], [4]] si el martes no hay clase
  const gs = [];
  let antes = null;
  for (let d = 0; d < nDias(); d++) {
    if (S.sinClase[d]) continue;
    antes !== null && S.uniones[antes] ? gs[gs.length - 1].push(d) : gs.push([d]);
    antes = d;
  }
  return gs;
}
const grupoDe = d => gruposDias().find(g => g.includes(d)) || [];
const hayClaseDespues = d => todosDias().some(k => k > d && !S.sinClase[k]);
function sincroniza() {        // cada recuadro con las mismas tiras en todos sus días; los días sin clase, sin tiras
  const l = metodo()?.momentos || [];
  gruposDias().forEach(g => {
    const t = [...new Set(g.flatMap(d => S.sesiones[d].etapa))].sort((a, b) => l.indexOf(a) - l.indexOf(b));
    g.forEach(d => { S.sesiones[d].etapa = [...t]; });
  });
  S.sinClase.forEach((x, d) => { if (x) S.sesiones[d].etapa = []; });
}
function desorden() {          // [a, b] si el a quedó en un día anterior al b (van en orden); null si todo va en orden
  const l = metodo()?.momentos || [];
  const seq = gruposDias().flatMap(g => S.sesiones[g[0]].etapa.map(x => l.indexOf(x) + 1));
  for (let k = 1; k < seq.length; k++) if (seq[k] < seq[k - 1]) return [seq[k - 1], seq[k]];
  return null;
}
const puedeListo = () => !!metodo() && !sinRepartir().length && !desorden();
const activos = () => S.listo ? S.sesiones.map((s, i) => s.etapa.length ? i : -1).filter(i => i >= 0) : [];
const sesionDe = d => activos().indexOf(d) + 1;            // día (0 = lunes) → número de sesión; 0 si no tiene

/* ---------------------------------------------------------------- estado */
/* Fases de la educación primaria en la NEM y sus grados; cada una con su programa sintético (SEP 2024) en datos/. */
const FASES_NEM = {
  '3': { nombre: 'Fase 3 · 1.º y 2.º de primaria', nivel: 'primaria', grados: ['1', '2'] },
  '4': { nombre: 'Fase 4 · 3.º y 4.º de primaria', nivel: 'primaria', grados: ['3', '4'] },
  '5': { nombre: 'Fase 5 · 5.º y 6.º de primaria', nivel: 'primaria', grados: ['5', '6'] },
};
/* datos de la escuela y del grupo (encabezado del Word y listas): los del formato, con los últimos que él escribió */
function datosIniciales() {
  let ultimos = {};
  try { ultimos = JSON.parse(localStorage.getItem('planeador.datos') || '{}') || {}; } catch (e) { }
  const d = { ...(D.fmt.datos || {}), ...ultimos };
  if (!d.sostenimiento) d.sostenimiento = sostenimientoDe(d.cct);
  return d;
}
/* Sostenimiento de la escuela según la tercera letra de su C.C.T. (SEP: D = federal, E = estatal, K = CONAFE;
   la P de particular no está en el documento oficial): 14EPR0290F → E → estatal. */
const SOSTENIMIENTO = { D: 'Federal', F: 'Federal', K: 'Federal', E: 'Estatal', P: 'Particular' };
const sostenimientoDe = cct => SOSTENIMIENTO[String(cct || '').trim().toUpperCase()[2]] || '';
function pistaSostenimiento() {
  const l = String(S.datos.cct || '').trim().toUpperCase()[2], s = sostenimientoDe(S.datos.cct);
  if (!l) return 'Escribe la clave y te digo si es federal o estatal.';
  if (!s) return `La tercera letra de la clave («${l}») no dice si es federal o estatal: elígelo tú.`;
  return `Según la clave: la «${l}» (tercera letra) es ${l === 'K' ? 'CONAFE, que es federal' : s.toLowerCase()}` +
    (l === 'P' ? ' (no viene en el documento oficial de la SEP; confírmalo)' : '') +
    (S.datos.sostenimiento && S.datos.sostenimiento !== s ? `. Tú elegiste ${S.datos.sostenimiento.toLowerCase()}.` : '.');
}
/* Firmas: cada cargo con la forma que él elija (Director, Directora o Directore, 10 oct). Mientras no la cambie, la
   que dice el título con que empieza el nombre: «Maestra…» → Directora; «Maestre…» → Directore; sin título, Director.
   Las mismas listas que comun.py de la skill. */
const CARGOS = {
  supervisor: ['Supervisor', 'Supervisora', 'Supervisore'],
  director: ['Director', 'Directora', 'Directore'],
  catedratico: ['Catedrático', 'Catedrática', 'Catedrátique'],
};
const TITULOS = [
  ['Maestro', 'Doctor', 'Licenciado', 'Profesor', 'Ingeniero', 'Mtro.', 'Dr.', 'Prof.'],
  ['Maestra', 'Doctora', 'Licenciada', 'Profesora', 'Ingeniera', 'Mtra.', 'Dra.', 'Profa.'],
  ['Maestre', 'Doctore', 'Licenciade', 'Profesore', 'Ingeniere', 'Mtre.', 'Dre.'],
];
function cargoDe(k) {
  const formas = CARGOS[k], elegido = S.datos['cargo_' + k];
  if (formas.includes(elegido)) return elegido;
  const t = String(S.datos[k] || '').trim().split(/\s+/)[0];
  return formas[Math.max(0, TITULOS.findIndex(x => x.includes(t)))];
}
function guardaDatos() { try { localStorage.setItem('planeador.datos', JSON.stringify(S.datos)); } catch (e) { } }
const GRADO_PDA = { '1': 'primero', '2': 'segundo', '3': 'tercero', '4': 'cuarto', '5': 'quinto', '6': 'sexto' };
const gradoPda = g => GRADO_PDA[g] || 'sexto';             // grado → su lista de PDA en el programa
const gradoNum = k => Object.keys(GRADO_PDA).find(g => GRADO_PDA[g] === k) || '6';
const programa = () => (D.programas || {})[S.datos?.fase || '5'] || D.programa;   // el programa de la fase elegida
const momentosSec = () => [{ momento: 'Inicio', pda: '', consignas: '' }, { momento: 'Desarrollo', pda: '', consignas: '' },
  { momento: 'Cierre', pda: '', consignas: '' }];
function nuevoEstado() {
  return {
    nombre: '', inicio: proximoLunes(), semanas: 1, central: null, secundarios: [], grado: gradoPda(datosIniciales().grado),
    datos: datosIniciales(), prog: 2,
    seleccion: [],                                     // {campo, idx, contenido, proyecto, pdas:[texto…]}
    general: { nombre: '', tema: '', pregunta: '', cierre: '', parciales: '', finales: '', ejes: [] },
    sesiones: [0, 1, 2, 3, 4].map(() => ({ etapa: [], tarea: '', momentos: momentosSec() })),
    instrumentos: [],                                  // los que picó en la tabla del libro 4 (10 oct: sin indicadores)
    formato: 'cedros',                                 // paso 9: la Planeación Cedros (genera el Word) o el de una metodología
    alumnosNee: neeDesdeTexto(D.fmt.nee || '')     // {nombre, necesidades, ajustes} por alumno
  };
}
/* «Nueva» (11 oct: él vio que no se borraba lo del paso 1). Siempre se borra la planeación; los datos generales (escuela,
   grupo, normal, logos y firmas) y los alumnos con NEE se borran o se conservan, según lo que elija en el aviso. */
function estadoNuevo(datos, nee) {   // con datos: se conservan (y sus alumnos NEE); sin datos: todo en blanco
  const E = nuevoEstado();
  if (datos) { E.datos = JSON.parse(JSON.stringify(datos)); E.alumnosNee = JSON.parse(JSON.stringify(nee || [])); }
  else {
    E.datos = Object.fromEntries(Object.keys({ ...(D.fmt.datos || {}), ...E.datos }).filter(k => !k.startsWith('cargo_')).map(k => [k, '']));
    E.datos.fase = (D.fmt.datos || {}).fase || '5';
    E.datos.grado = (D.fmt.datos || {}).grado || '6';
    E.alumnosNee = [];
  }
  E.grado = gradoPda(E.datos.grado);
  return E;
}
let guardaT = null;
function cambio() {                  // guarda el borrador y pone al día la vista previa del formato (paso 9)
  clearTimeout(guardaT);
  sucio = true; S.editado = Date.now(); titulo();              // Archivo (11 oct): como Word, «•» = cambios sin guardar
  renderRuta();
  guardaT = setTimeout(() => { try { localStorage.setItem(BORRADOR, JSON.stringify(S)); } catch (e) { } renderFormato(); }, 400);
}

/* ---------------------------------------------------------------- 2. campo y metodología */
/* Descripción breve de cada campo, condensada del texto con que lo abre el programa sintético (igual en las Fases 3, 4
   y 5; cambia la página), y de cada metodología: un resumen, con sus fases como vienen en los libros de texto. */
const CAMPO_DESC = {
  len: { pags: { 3: 19, 4: 21, 5: 19 }, texto: 'Los lenguajes son construcciones cognitivas, sociales y dinámicas para expresar, conocer, pensar, aprender, comunicar e interpretar el mundo, y permiten establecer vínculos para convivir y participar en colaboración. Su objeto de aprendizaje son las experiencias y la interacción con el mundo a través de diferentes lenguajes.' },
  spc: { pags: { 3: 37, 4: 39, 5: 37 }, texto: 'Su objeto de aprendizaje es la comprensión y explicación de los fenómenos y procesos naturales —cuerpo humano, seres vivos, materia, energía, salud, medio ambiente y tecnología— desde la perspectiva de diversos saberes, incluido el científico, y en su relación con lo social.' },
  ens: { pags: { 3: 51, 4: 53, 5: 55 }, texto: 'Aborda la relación del ser humano con la sociedad y la naturaleza desde la comprensión crítica de los procesos sociales, políticos, naturales y culturales de comunidades situadas en su historia y su geografía, para construir una postura ética y una ciudadanía participativa, comunitaria, responsable y democrática.' },
  dhc: { pags: { 3: 63, 4: 69, 5: 79 }, texto: 'Reconoce que el ser humano se construye personal y socialmente en su comunidad. Su objeto de aprendizaje son experiencias cognitivas, motrices, socioafectivas y creativas que favorecen la identidad, el sentido de pertenencia, la conciencia de interdependencia, la conexión emocional y el compromiso ético.' },
};
const METODO_DESC = {
  ABPC: 'Parte de una situación o necesidad real de la comunidad y la convierte en un proyecto: el grupo lo planea, lo lleva a cabo y comparte con la comunidad lo que produjo.',
  STEAM: 'Parte de una pregunta sobre un fenómeno del entorno, que el grupo investiga como se hace en las ciencias —observar, preguntar, experimentar y explicar— integrando ciencia, tecnología, ingeniería, artes y matemáticas.',
  ABP: 'Parte de un problema real del entorno, que el grupo analiza para entender sus causas y, con eso, propone y lleva a cabo una forma de atenderlo.',
  AS: 'El grupo aprende mientras presta un servicio solidario: identifica una necesidad de su escuela o comunidad, planea y realiza una acción para atenderla, y valora lo que logró.',
};
function renderDescripcion() {
  const c = S.central, caja = $('#descripcion');
  if (!caja) return;
  if (!c) { caja.innerHTML = '<div class="desc-vacia">Pica un campo formativo para ver de qué trata y cómo es su metodología.</div>'; return; }
  const m = metodo(), clave = D.campos[c].metodologia, fase = S.datos.fase;
  const fases = [];                     // «Preparación (Identificamos, Recuperamos…) · Acción (…)» o la lista tal cual
  m.momentos.forEach(x => {
    const [f, n] = x.includes(' – ') ? x.split(' – ') : [null, x];
    const ult = fases[fases.length - 1];
    if (f && ult && ult.f === f) ult.n.push(n); else fases.push({ f, n: [n] });
  });
  caja.style.setProperty('--c', COLOR[c]);
  let antes = null;                     // el camino de la metodología: un número por momento o etapa, con su fase (ABPC)
  const camino = m.momentos.map((x, k) => {
    const [f, n] = x.includes(' – ') ? x.split(' – ') : [null, x];
    const nueva = f && f !== antes; antes = f;
    return `<li><span class="n">${k + 1}</span><span class="t">${esc(n)}${nueva ? `<small>${esc(f)}</small>` : ''}</span></li>`;
  }).join('');
  caja.innerHTML = `
    <div class="desc-bloque"><div class="desc-t">Campo formativo central</div><h3>${esc(D.campos[c].nombre)}</h3>
      <p>${esc(CAMPO_DESC[c].texto)}</p>
      <small>Condensado del programa sintético de la Fase ${esc(fase)} (SEP, 2024), p. ${CAMPO_DESC[c].pags[fase] || CAMPO_DESC[c].pags[5]}.</small></div>
    <div class="desc-bloque met"><div class="desc-t">Su metodología · ${m.momentos.length} ${sonEtapas(m) ? 'etapas' : 'momentos'}${fases.some(x => x.f) ? ` en ${fases.length} fases` : ''}</div>
      <h3>${esc(m.nombre)}</h3>
      <p>${esc(METODO_DESC[clave] || '')}</p>
      <ol class="camino">${camino}</ol></div>`;
}
function renderCampo() {
  const estado = c => S.central === c ? 'activo' : S.secundarios.includes(c) ? 'secundario' : S.central ? 'apagado' : '';
  $('#tiles').innerHTML = ORDEN.map(c => `
    <button type="button" class="tile ${estado(c)}" data-c="${c}" style="--c:${COLOR[c]}" aria-pressed="${S.central === c || S.secundarios.includes(c)}">
      ${S.central === c ? `<span class="sticker">${ESTRELLA}central</span>` : S.secundarios.includes(c) ? '<span class="tag-sec">secundario</span>' : ''}
      <span class="logo"></span><span class="nom">${esc(D.campos[c].nombre)}</span>
      <span class="metodo">${esc(metFormato(D.campos[c].metodologia).nombre)}</span></button>`).join('');
  renderDescripcion();
  renderDatos();
}

function renderDatos() {             // fase y grado con menús; escuela, clave, zona, sector, grupo y docente para escribir
  const d = S.datos, f = FASES_NEM[d.fase] || FASES_NEM['5'];
  const campo = (k, etq, ejemplo, cls = '') =>
    `<label class="${cls}">${etq}<input data-dato="${k}" value="${esc(d[k] || '')}" placeholder="${esc(ejemplo)}"></label>`;
  /* firmas como tarjetas (11 oct): el nombre arriba de la línea y el cargo abajo, como en la hoja de firmas */
  const tarjeta = (k, cargo, ejemplo, etq, extra = '') => `<div class="firma-t">
    <input data-dato="${k}" value="${esc(d[k] || '')}" placeholder="${esc(ejemplo)}" aria-label="Nombre: ${esc(etq)}">
    <span class="linea" aria-hidden="true"></span><div class="cargo-fila">${cargo}</div>${extra}</div>`;
  const firma = (k, despues, ejemplo, opcional) => tarjeta(k,
    `<select data-cargo="${k}" title="Cómo va el cargo en la hoja de firmas" aria-label="Cargo">${CARGOS[k].map(x =>
      `<option ${x === cargoDe(k) ? 'selected' : ''}>${x}</option>`).join('')}</select>${despues}${opcional ? ' <small>opcional</small>' : ''}`,
    ejemplo, CARGOS[k][0]);
  const logo = (lado, etq) => {      // logo de la escuela o de una institución, arriba de la primera hoja (11 oct)
    const src = d['logo_' + lado];
    return `<div class="logo-dato"><span>${etq} <small>(opcional)</small></span>
      <div class="logo-marco"><label class="logo-caja ${src ? 'con' : ''}" title="${src ? 'Cambiar el logo' : 'Adjunta el logo: PNG o JPG'}">${src
        ? `<img src="${src}" alt="${etq}">` : '<span>Adjuntar</span>'}<input type="file" accept="image/*" data-logo="${lado}" hidden></label>
      ${src ? `<button class="mini sec quita-logo" data-quitalogo="${lado}" title="Quitar el logo">Quitar</button>` : ''}</div></div>`;
  };
  $('#info').innerHTML = `
    <div class="datos-t">La escuela</div>
    ${campo('escuela', 'Nombre de la escuela', 'Escuela Primaria Urbana 136. Cedros del Líbano', 'ancho')}
    ${campo('cct', 'Clave de la escuela (C.C.T.)', '14EPR0290F')}
    ${campo('zona', 'Zona escolar', '75', 'corto')}
    ${campo('sector', 'Sector', '4', 'corto')}
    <label class="sost">Tipo de escuela<select data-dato="sostenimiento">${['Federal', 'Estatal', 'Particular'].map(x =>
      `<option ${x === d.sostenimiento ? 'selected' : ''}>${x}</option>`).join('')}</select>
      <small id="pista-sost">${esc(pistaSostenimiento())}</small></label>
    ${campo('normal', '<span>Nombre de la escuela normal <small>(opcional)</small></span>',
      'Benemérita y Centenaria Escuela Normal de Jalisco', 'ancho')}
    ${logo('izq', 'Logo izquierdo')}${logo('der', 'Logo derecho')}
    <div class="datos-t">El grupo</div>
    <label class="medio">Fase<select data-dato="fase">${Object.entries(FASES_NEM).map(([k, x]) =>
      `<option value="${k}" ${k === d.fase ? 'selected' : ''}>${x.nombre}</option>`).join('')}</select></label>
    <label>Grado<select data-dato="grado" ${f.grados.length ? '' : 'disabled'}>${f.grados.length
      ? f.grados.map(g => `<option value="${g}" ${g === d.grado ? 'selected' : ''}>${g}.º de ${f.nivel}</option>`).join('')
      : '<option value="">Sin grado</option>'}</select></label>
    ${campo('grupo', 'Grupo', 'A', 'corto')}
    <label class="medio">Periodo de aplicación<input id="periodo" readonly tabindex="-1" value="${esc(periodoPlaneacion())}"
      placeholder="Se llena al picar «Listo» (paso 5)"></label>
    <div class="datos-t">Firmas <small>En la hoja de firmas salen en este orden de jerarquía. Escribe cada nombre con su título
      (Maestra, Maestro, Maestre, Doctora…) y en el menú de cada cargo elige cómo va: Director, Directora o Directore. Mientras
      no lo cambies, el menú sigue al título. Los opcionales vacíos no salen.</small></div>
    <div class="firmas">
      ${firma('supervisor', '', 'Maestro Juan Pérez López', true)}
      ${firma('director', '', 'Maestra Laura Méndez Ortiz')}
      ${tarjeta('titular', 'Docente titular', 'Maestra Ana Ruiz Castro', 'Docente titular')}
      ${firma('catedratico', 'de la Normal', 'Doctor Luis Herrera Soto', true)}
      ${tarjeta('docente', 'Docente en formación', 'Daniela Torres Vega', 'Docente en formación',
        '<small class="firma-nota">Sin título: va en el encabezado, en las listas y como «Normalista …» en su firma.</small>')}
    </div>
    ${(D.programas || {})[d.fase] ? '' : `<div class="aviso-fase">No encontré el programa sintético de la ${esc(f.nombre.split(' · ')[0])}: no hay contenidos ni PDA para elegir en el paso 3.</div>`}`;
}
/* logo que él adjunta: se guarda en los datos como PNG de hasta 480 px por lado (cabe de sobra en el borrador) */
function leeLogo(archivo, lado) {
  if (!archivo) return;
  const url = URL.createObjectURL(archivo), img = new Image();
  img.onload = () => {
    const k = Math.min(1, 480 / Math.max(img.naturalWidth || 1, img.naturalHeight || 1)), c = document.createElement('canvas');
    c.width = Math.max(1, Math.round((img.naturalWidth || 200) * k)); c.height = Math.max(1, Math.round((img.naturalHeight || 200) * k));
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    URL.revokeObjectURL(url);
    S.datos['logo_' + lado] = c.toDataURL('image/png');
    guardaDatos(); renderDatos(); cambio();
    toast(`Listo: el logo ${lado === 'izq' ? 'izquierdo' : 'derecho'} va arriba de la primera hoja.`);
  };
  img.onerror = () => { URL.revokeObjectURL(url); toast('No pude abrir esa imagen. Usa un PNG o un JPG.'); };
  img.src = url;
}
/* periodo de aplicación: del primer al último día con sesión; se llena al picar «Listo» */
function periodoPlaneacion() {
  const act = activos();
  if (!act.length) return '';
  const f = fechasDe(), a = f[act[0]], b = f[act[act.length - 1]];
  return periodo(aIso(a), 1, b);
}
function cambiaDato(k, v) {          // fase o grado: el grado sigue a la fase y decide los PDA del paso 3
  if (k === 'fase' && v !== S.datos.fase && S.seleccion.length &&
      !confirm('Los contenidos que elegiste son del programa de otra fase y se van a quitar. ¿Cambiar de fase?')) { renderDatos(); return; }
  if (k === 'fase' && v !== S.datos.fase) S.seleccion = [];
  S.datos[k] = v;
  const f = FASES_NEM[S.datos.fase];
  if (k === 'fase' && !f.grados.includes(S.datos.grado)) S.datos.grado = f.grados[f.grados.length - 1] || '';
  ponGrado(gradoPda(S.datos.grado));
  guardaDatos(); renderCampo(); renderTabs(); renderElegidos(); renderLista(); cambio();
}
function ponGrado(g) {               // la lista de PDA de cada contenido elegido cambia con el grado
  if (g === S.grado) return;
  S.grado = g;
  S.seleccion.forEach(x => { x.pdas = [...(programa()[x.campo][x.idx][S.grado] || [])]; });
}

/* clic en un campo: el primero elegido es el central y los que siguen, secundarios.
   Clic en un secundario: pasa a central. Clic en el central: se quita y vuelve a ser central el que lo era antes. */
function tocaCampo(c) {
  const antes = [S.central, ...S.secundarios].filter(Boolean), lista = [...antes];
  const k = lista.indexOf(c);
  if (k === 0) lista.shift();
  else if (k > 0) { lista.splice(k, 1); lista.unshift(c); }
  else lista.push(c);
  const fuera = antes.filter(x => !lista.includes(x)), perdidos = S.seleccion.filter(x => fuera.includes(x.campo));
  if (perdidos.length && !confirm(`Al quitar ${fuera.map(x => D.campos[x].nombre).join(' y ')} también se ` +
      `${perdidos.length === 1 ? 'quita el contenido' : `quitan los ${perdidos.length} contenidos`} que elegiste de ese campo. ¿Seguir?`)) return;
  S.seleccion = S.seleccion.filter(x => !fuera.includes(x.campo));
  S.secundarios = lista.slice(1);
  eligeCentral(lista[0] || null);
}

function eligeCentral(c) {          // c = null: sin campo central
  if (S.central !== c) {
    S.central = c;
    if (c) tab = c;
    S.sesiones.forEach(s => { s.etapa = []; });          // otra metodología: se reparte de nuevo
    S.listo = false;
  }
  renderTodo(); cambio();
}

/* estado recién cargado: desde el 10 oct la estructura es siempre el mapa de llaves; las de antes con la estructura por
   metodología pasan sus consignas al desarrollo de cada sesión. Las etapas, como lista; si ya están todas en su día y en
   orden, el mapa de llaves queda listo. */
function normaliza() {
  if (S.estructura === 'metodologia') S.sesiones.forEach(s => {
    const c = s.momentos.map(m => m.consignas).filter(Boolean);
    s.momentos = momentosSec();
    if (c.length) s.momentos[1].consignas = c.join('\n');
  });
  delete S.estructura;
  S.secundarios = S.secundarios || [];
  S.seleccion.forEach(x => { if (S.central && x.campo !== S.central && !S.secundarios.includes(x.campo)) S.secundarios.push(x.campo); });
  if (!S.datos) S.datos = { ...datosIniciales(), fase: '5', grado: S.grado === 'quinto' ? '5' : '6' };
  for (const [k, v] of Object.entries(D.fmt.datos || {})) if (S.datos[k] === undefined) S.datos[k] = v;   // datos nuevos (firmas)
  if (!S.datos.sostenimiento) S.datos.sostenimiento = sostenimientoDe(S.datos.cct);
  if (!(D.programas || {})[S.datos.fase]) S.datos.fase = '5';
  if (!S.prog) {                 // hasta el 10 oct el programa de la Fase 5 traía en Saberes un contenido falso, el 13.º
    if (S.datos.fase === '5') S.seleccion = S.seleccion.filter(x => !(x.campo === 'spc' && x.idx === 12))
      .map(x => x.campo === 'spc' && x.idx > 12 ? { ...x, idx: x.idx - 1 } : x);
    S.prog = 2;
  }
  S.seleccion = S.seleccion.map(x => {          // si trae el texto del contenido, se ubica por él
    const lista = programa()[x.campo] || [], k = x.contenido ? lista.findIndex(f => f.contenido === x.contenido) : -1;
    const idx = k >= 0 ? k : x.idx;
    return { ...x, idx, contenido: (lista[idx] || {}).contenido };
  }).filter(x => x.contenido);
  S.sesiones.forEach(s => { s.etapa = [].concat(s.etapa || []); });
  S.semanas = S.semanas === 2 ? 2 : 1;
  while (S.sesiones.length < nDias()) S.sesiones.push({ etapa: [], tarea: '', momentos: momentosSec() });
  if (!S.sinClase) S.sinClase = todosDias().map(() => false);
  if (!S.uniones) {              // planeación guardada: un día con lo mismo que el siguiente con tiras iba unido con él,
    S.uniones = todosDias().slice(1).map(() => false);      // y los días vacíos entre los dos no tenían clase
    const e = S.sesiones.map(s => s.etapa.join('|'));
    for (let k = 0; k < nDias() - 1; k++) {
      const j = e.findIndex((x, i) => i > k && x);
      if (!e[k] || j < 0 || e[j] !== e[k]) continue;
      S.uniones[k] = true;
      for (let i = k + 1; i < j; i++) S.sinClase[i] = true;
    }
  }
  if (S.listo === undefined) S.listo = puedeListo();
  if (!S.instrumentos) S.instrumentos = [...new Set((S.indicadores || []).map(x => x.instrumento).filter(ins => tecnicaDe(ins)))];
  delete S.indicadores;          // 10 oct: los instrumentos (con sus indicadores) los elabora él por separado
  if (!S.alumnosNee) S.alumnosNee = neeDesdeTexto(S.nee ?? D.fmt.nee ?? '');     // 10 oct: antes era un solo texto
  delete S.nee; delete S.vinculacion;     // 10 oct: la vinculación sale de la semana
  if (S.listoCont === undefined) S.listoCont = S.seleccion.length && S.seleccion.every(x => x.pdas.length) ? huellaCont() : '';
}

/* ---------------------------------------------------------------- 2. contenidos */
function renderTabs() {              // solo los campos elegidos en el paso 2: el central y los secundarios (10 oct)
  const elegidos = [S.central, ...S.secundarios].filter(Boolean);
  if (elegidos.length && !elegidos.includes(tab)) tab = elegidos[0];
  $('#tabs').innerHTML = elegidos.map(c => {
    const n = S.seleccion.filter(x => x.campo === c).length;
    return `<button class="tab ${tab === c ? 'on' : ''}" data-tab="${c}" style="--c:${COLOR[c]}" aria-pressed="${tab === c}">${esc(D.campos[c].nombre)}
      <span class="tg">${S.central === c ? 'central' : 'vinculado'}${n ? ' · ' + n : ''}</span></button>`;
  }).join('');
  $('#grado').innerHTML = FASES_NEM[S.datos.fase].grados.map(g => `<button data-grado="${gradoPda(g)}">${g}.º grado</button>`).join('');
  $$('#grado button').forEach(b => b.classList.toggle('on', b.dataset.grado === S.grado));
  $('#programa-txt').textContent = `Programa sintético de la Fase ${S.datos.fase}, SEP 2024`;
  $('#aviso-fase').innerHTML = '';
}
function $$(s) { return [...document.querySelectorAll(s)]; }

/* La tabla «Contenidos y PDAs elegidos» va abajo de la lista y se arma al picar «Listo» (10 oct). Se guarda la huella
   de lo elegido en ese momento: si después cambia algo (un contenido, un PDA, el proyecto, el grado o los campos), la
   tabla se quita hasta que vuelva a picar «Listo». «Listo» se enciende cuando cada contenido tiene al menos un PDA. */
const huellaCont = () => JSON.stringify([S.central, S.secundarios, S.grado, S.seleccion.map(x => [x.campo, x.idx, x.proyecto, x.pdas])]);
const contListos = () => !!S.seleccion.length && S.listoCont === huellaCont();
function renderElegidos() {            // tabla «Contenidos y PDAs elegidos»: lo que va a la planeación (10 oct)
  const sinPda = S.seleccion.find(x => !x.pdas.length), listos = contListos();
  const corto = t => t.length > 60 ? t.slice(0, 60).replace(/\s+\S*$/, '') + '…' : t;
  $('#b-listo-cont').disabled = !S.seleccion.length || !!sinPda;
  $('#cont-estado').textContent = !S.seleccion.length ? 'Elige al menos un contenido de la lista.'
    : sinPda ? `Al contenido «${corto(programa()[sinPda.campo][sinPda.idx].contenido)}» le falta marcar al menos un PDA.`
    : listos ? 'Listo: la tabla está abajo.'
    : S.listoCont ? 'Cambiaste la selección: pica «Listo» para volver a armar la tabla.'
    : 'Pica «Listo» para armar la tabla con lo que elegiste.';
  $('#cont-estado').classList.toggle('mal', !!sinPda);
  if (!listos) { $('#elegidos').innerHTML = ''; return; }
  const orden = [S.central, ...S.secundarios];
  const filas = S.seleccion.map((x, k) => ({ x, k })).sort((a, b) => orden.indexOf(a.x.campo) - orden.indexOf(b.x.campo));
  $('#elegidos').innerHTML = `<div class="elegidos-t">Contenidos y PDAs elegidos <small>esto es lo que va a la planeación</small></div>` +
    `<table class="tabla-elegidos"><thead><tr><th>Campo formativo</th><th>Contenido</th>
      <th>PDAs elegidos <small>(${gradoNum(S.grado)}.º grado)</small></th><th></th></tr></thead><tbody>${filas.map(({ x, k }) => {
      const f = programa()[x.campo][x.idx];
      return `<tr style="--c:${COLOR[x.campo]}">
        <td class="c-campo"><b>${esc(D.campos[x.campo].nombre)}</b><span class="vinc">${x.campo === S.central ? 'central' : 'vinculado'}</span></td>
        <td>${esc(f.contenido)}${x.proyecto ? `<div class="proyecto-de">Proyecto: ${esc(x.proyecto)}</div>` : ''}</td>
        <td><ul>${x.pdas.map(p => `<li>${esc(p)}</li>`).join('')}</ul></td>
        <td><button class="mini sec" data-quita="${k}" title="Quitar este contenido">Quitar</button></td></tr>`;
    }).join('')}</tbody></table>`;
}

/* Lista de contenidos en mosaico (10 oct): cada tarjeta ocupa tantos renglones de 2 px como mide, y el grid la pone
   en la columna que va más corta. Así, cuando una elegida se abre con sus PDA, las de al lado suben y no quedan huecos. */
const mosaico = new ResizeObserver(es => es.forEach(e => {
  e.target.style.gridRowEnd = `span ${Math.ceil((e.target.offsetHeight + 8) / 2)}`;
}));
function renderLista() {
  renderListaHtml();
  mosaico.disconnect();
  [...$('#lista').children].forEach(c => mosaico.observe(c));
}
function renderListaHtml() {
  if (!S.central) {
    $('#lista').innerHTML = '<div class="chip">Primero elige en el paso 2 el campo formativo central y, si quieres, otros para vincular: aquí salen solo sus contenidos.</div>';
    return;
  }
  const filas = programa()[tab] || [];
  const varios = S.seleccion.filter(x => x.campo === tab).length > 1;      // dos contenidos o más del mismo campo
  $('#lista').innerHTML = filas.map((f, idx) => {
    const pdas = f[S.grado] || [];
    const sel = S.seleccion.find(x => x.campo === tab && x.idx === idx);
    const notas = f.notas || {};          // erratas del PDF corregidas (p. ej., «con mientos corporales»)
    const nota = t => notas[t] ? ` <span class="nota-pdf" title="${esc(notas[t])}">ⓘ corregido</span>` : '';
    let cuerpo = '';
    if (sel) {
      cuerpo = `<div class="pdas">
        ${varios ? `<div class="proy">Proyecto del libro <input data-proy="${idx}" value="${esc(sel.proyecto)}" placeholder="«Mi familia es mi gran equipo»"
          title="Con dos contenidos del mismo campo, el formato pone cada uno con el nombre de su proyecto del libro de texto"></div>` : ''}
        <div class="etq">PDAs <small>(${gradoNum(S.grado)}.º grado)</small></div>
        ${pdas.map(p => `<label><input type="checkbox" data-pda="${idx}" value="${esc(p)}" ${sel.pdas.includes(p) ? 'checked' : ''}>
          <span>${esc(p)}${nota(p)}</span></label>`).join('')}
        ${pdas.length ? '' : '<span class="cotejar">Este contenido no trae PDA de este grado.</span>'}</div>`;
    }
    return `<div class="cont ${sel ? 'sel' : ''}" data-idx="${idx}" style="--c:${COLOR[tab]}">
      ${sel ? `<span class="mark">${PALOMITA}Elegido</span>` : ''}
      <div class="etq">Contenido ${idx + 1}</div>
      <div class="t">${esc(f.contenido)}${nota(f.contenido)}</div>
      ${sel ? '' : `<small>PDAs: ${pdas.length} de ${gradoNum(S.grado)}.º</small>`}${cuerpo}</div>`;
  }).join('') || '<div class="chip">Sin resultados.</div>';
}

function alternaContenido(idx) {
  const k = S.seleccion.findIndex(x => x.campo === tab && x.idx === idx);
  if (k >= 0) S.seleccion.splice(k, 1);
  else {
    if (!S.central) { eligeCentral(tab); }
    S.seleccion.push({ campo: tab, idx, contenido: programa()[tab][idx].contenido, proyecto: '', pdas: [...(programa()[tab][idx][S.grado] || [])] });
  }
  renderTabs(); renderElegidos(); renderLista(); cambio();
}

/* ---------------------------------------------------------------- 3. proyecto */
/* Ejes articuladores en tarjetas con su ícono, como los campos (10 oct): se ilumina el que se pica y, con alguno
   elegido, los demás quedan en gris. Los íconos, recortados del cartel que él mandó, van en img/ejes.webp en este
   orden; el color es el del nombre en ese cartel. */
const EJE_ICONO = {
  'Inclusión': ['#1aa3bb', 0], 'Pensamiento crítico': ['#ec7a36', 1], 'Interculturalidad crítica': ['#a052c8', 2],
  'Igualdad de género': ['#d9a300', 3], 'Vida saludable': ['#15a150', 4],
  'Apropiación de las culturas a través de la lectura y la escritura': ['#e0699b', 5], 'Artes y experiencias estéticas': ['#3a9fc4', 6],
};
function renderProyecto() {
  $$('[data-g]').forEach(el => { el.value = S.general[el.dataset.g] || ''; });
  const ej = S.general.ejes;
  $('#ejes').innerHTML = D.ejes.map(e => {
    const [color, k] = EJE_ICONO[e] || ['#77746c', -1], on = ej.includes(e);
    return `<button class="eje ${on ? 'on' : ej.length ? 'apagado' : ''}" data-eje="${esc(e)}" aria-pressed="${on}" style="--c:${color}">
      ${k >= 0 ? `<span class="eje-logo" style="--k:${k}"></span>` : ''}<span>${esc(e)}</span></button>`;
  }).join('');
}

/* ---------------------------------------------------------------- 4. reparto de la metodología en los días */
let arrastra = null, elegida = null;    // tira que se arrastra · tira elegida con clic (para moverla sin arrastrar)
function renderReparto() {
  const m = metodo(), fechas = fechasDe();
  $$('#semanas-sel button').forEach(b => b.classList.toggle('on', Number(b.dataset.semanas) === S.semanas));
  $('#reparto-titulo').textContent = m ? `${sonEtapas(m) ? 'Etapas' : 'Momentos'} de la metodología` : 'Momentos o etapas de la metodología';
  $('#b-listo').disabled = !puedeListo();
  if (!m) {
    $('#reparto').innerHTML = '<div class="reparto-vacio">Primero elige el campo formativo central (paso 2).</div>';
    $('#reparto-estado').textContent = '';
    return;
  }
  $('#reparto').style.setProperty('--c', COLOR[S.central]);
  $('#reparto').classList.toggle('con-elegida', !!elegida);       // con una tira picada, los días esperan que la pongan
  const tira = x => `<div class="tira ${elegida === x ? 'elegida' : ''}" draggable="true" data-tira="${esc(x)}">
    ${AGARRE}<span class="n">${m.momentos.indexOf(x) + 1}</span><span>${esc(x)}</span></div>`;
  const pendientes = sinRepartir(), mal = desorden();
  const fecha = d => `${fechas[d].getDate()} de ${MESES[fechas[d].getMonth()]}`;
  const primero = () =>                // el primer día: al picarlo sale el calendario y los demás días se acomodan solos
    `<span class="cambia-inicio" title="Pica para elegir el día en que empieza la planeación">${fecha(0)} <svg class="cal" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><rect x="1.5" y="2.5" width="13" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M1.5 6.5h13M5 1v3M11 1v3" stroke="currentColor" stroke-width="1.4"/></svg></span>` +
    `<input type="date" id="inicio" class="oculto" value="${S.inicio}" tabindex="-1">`;
  const boton = (dato, d, texto, ayuda) => `<button class="mini sec unir" data-${dato}="${d}" title="${ayuda}">${texto}</button>`;
  const dia = d => S.sinClase[d]
    ? `<div class="dia-l off">${nombreDia(d)}<small>${d ? fecha(d) : primero()} · sin clase</small></div>
       <div class="botones-dia">${boton('hayclase', d, 'Hay clase', 'Este día sí hay clase')}</div>`
    : `<div class="dia-l">${nombreDia(d)}<small>${d ? fecha(d) : primero()}</small></div><div class="botones-dia">` +
      (!hayClaseDespues(d) ? '' : S.uniones[d]
        ? boton('separar', d, 'Separar', 'Separa este día del siguiente')
        : boton('unir', d, 'Unir', 'Junta este día con el siguiente día con clase en un solo recuadro')) +
      boton('sinclase', d, 'Sin clase', 'Este día no hay clase: no lleva tiras y «Unir» lo brinca') + '</div>';
  const semana = w => {               // de lunes a viernes; un recuadro unido muestra también los días sin clase de en medio
    const filas = [];
    for (let d = 5 * w; d < 5 * w + 5;) {
      if (S.sinClase[d]) {
        filas.push(`<div class="dia-r sinclase"><div class="zona-t">${dia(d)}</div>
          <div class="tiras"><span class="vacia">Sin clase: este día no tendrá sesión</span></div></div>`);
        d++; continue;
      }
      const g = grupoDe(d), fin = Math.min(g[g.length - 1], 5 * w + 4), s = S.sesiones[d], varios = g.length > 1;
      const rango = [];
      for (let k = d; k <= fin; k++) rango.push(k);
      filas.push(`<div class="zona dia-r ${varios ? 'unidos' : ''} ${s.etapa.length || pendientes.length ? '' : 'sin'}" data-zona="${d}">
          <div class="zona-t">${g[0] < d ? '<span class="sigue">sigue de la semana 1</span>' : ''}${rango.map(dia).join('')}</div>
          <div class="tiras">${s.etapa.map(tira).join('') || `<span class="vacia">${elegida ? 'Ponla aquí' : pendientes.length ? 'Arrastra aquí'
            : `Sin ${palabra()}: ${varios ? 'estos días no tendrán' : 'este día no tendrá'} sesión`}</span>`}</div>
        </div>`);
      d = fin + 1;
    }
    return filas.join('');
  };
  const titulo = w => `<div class="titulo-semana">Semana ${w + 1} <small>${rangoSemana(w)}</small></div>`;
  $('#reparto').innerHTML = `
    <div class="zona banco" data-zona="-1"><div class="zona-t">${sonEtapas(m) ? 'Etapas' : 'Momentos'} · ${esc(m.nombre)}</div>
      ${pendientes.map(tira).join('') || `<div class="hecho">✓ ${sonEtapas(m) ? 'Todas están' : 'Todos están'} en su día</div>`}
      ${elegida && pendientes.includes(elegida) ? '<span class="vacia">Ahora pica un día para ponerla ahí.</span>' : ''}</div>
    ${S.semanas === 2
      ? `<div class="dos-semanas">${[0, 1].map(w => `<div class="dias-reparto">${titulo(w)}${semana(w)}</div>`).join('')}</div>`
      : `<div class="dias-reparto">${semana(0)}</div>`}`;
  $('#reparto-estado').textContent = pendientes.length ? `${pendientes.length === 1 ? 'Falta 1' : `Faltan ${pendientes.length}`} por poner en su día.`
    : mal ? `Van en orden: el ${mal[1]} no puede ir en un día después del ${mal[0]}.`
    : S.listo ? 'Listo: el mapa de llaves está abajo.' : 'Todo en su sitio: pica «Listo» para armar el mapa de llaves.';
  $('#reparto-estado').classList.toggle('mal', !!mal);
}
function mueveTira(x, d) {           // d: día (0 = lunes) o -1 para regresarla a la lista; si va unido, a todo su recuadro
  const l = metodo().momentos;
  S.sesiones.forEach(s => { s.etapa = s.etapa.filter(y => y !== x); });
  if (d >= 0) grupoDe(d).forEach(k => { S.sesiones[k].etapa = [...S.sesiones[k].etapa, x].sort((a, b) => l.indexOf(a) - l.indexOf(b)); });
  elegida = null; S.listo = false;
  renderReparto(); renderSemana(); renderEval(); cambio();
}
function unir(k, si) {               // une (o separa) el día k con el siguiente día con clase
  if (si) S.uniones[k] = true;       // el recuadro nuevo lleva las tiras de los dos (sincroniza)
  else {                             // al separar, las tiras se quedan en los días de arriba
    grupoDe(k).filter(d => d > k).forEach(d => { S.sesiones[d].etapa = []; });
    S.uniones[k] = false;
  }
  sincroniza(); S.listo = false;
  renderReparto(); renderSemana(); renderEval(); cambio();
}
function cambiaSemanas(n) {          // una o dos semanas: con dos se agregan los 5 días de la semana siguiente
  if (n === S.semanas) return;
  if (n === 1) {
    const escrito = S.sesiones.slice(5).some(s => s.tarea.trim() || s.momentos.some(m => m.consignas.trim() || (m.pda || '').trim()));
    if (escrito && !confirm('La segunda semana tiene cosas escritas. ¿Quitarla?')) { renderReparto(); return; }
    S.sesiones = S.sesiones.slice(0, 5); S.sinClase = S.sinClase.slice(0, 5); S.uniones = S.uniones.slice(0, 4);
  } else {
    for (let k = 0; k < 5; k++) S.sesiones.push({ etapa: [], tarea: '', momentos: momentosSec() });
    S.sinClase.push(false, false, false, false, false);
    S.uniones.push(false, false, false, false, false);
  }
  S.semanas = n;
  sincroniza(); S.listo = false;
  renderTodo(); cambio();
}
function marcaSinClase(d, si) {      // un día sin clase no recibe tiras y «Unir» lo brinca
  const antes = todosDias().reverse().find(k => k < d && !S.sinClase[k]);   // el día con clase de antes
  if (si) {
    if (antes !== undefined && S.uniones[antes] && !S.uniones[d]) S.uniones[antes] = false;   // era el último del recuadro
  } else S.uniones[d] = antes !== undefined && S.uniones[antes];        // si el recuadro lo cruzaba, ahora lo incluye
  S.sinClase[d] = si;
  sincroniza(); S.listo = false;
  renderReparto(); renderSemana(); renderEval(); cambio();
}

/* ---------------------------------------------------------------- 5. semana (mapa de llaves) */
const yLista = xs => xs.length < 2 ? String(xs[0]) : xs.slice(0, -1).join(', ') + ' y ' + xs[xs.length - 1];
/* El mapa de llaves es uno para todo el proyecto, dure una o dos semanas (10 oct): el día que lleva la primera etapa o
   momento de la metodología es inicio; el que lleva la última, cierre; los demás, desarrollo. El producto final va en el
   último día de desarrollo. Sin etapas, el primer día con sesión es el inicio y el último el cierre. */
function faseDia(d) {
  const l = metodo()?.momentos || [], e = S.sesiones[d].etapa, act = activos();
  if (!e.length || !l.length) return d === act[0] ? 'Inicio' : d === act[act.length - 1] ? 'Cierre' : 'Desarrollo';
  return e.includes(l[0]) ? 'Inicio' : e.includes(l[l.length - 1]) ? 'Cierre' : 'Desarrollo';
}
function lugar(d) {                  // de un día con sesión: su fase en el proyecto y si es el del producto final
  const desarrollo = activos().filter(x => faseDia(x) === 'Desarrollo');
  return { fase: faseDia(d), final: d === desarrollo[desarrollo.length - 1] };
}
function tramos() {                  // los recuadros morados, seguidos de punta a punta del proyecto aunque haya días sin clase
  const act = activos(), ini = act.filter(d => faseDia(d) === 'Inicio'), cie = act.filter(d => faseDia(d) === 'Cierre');
  const finIni = ini.length ? ini[ini.length - 1] : act[0], iniCie = cie.length ? cie[0] : nDias();
  const t = [{ fase: 'Inicio', de: 0, a: Math.min(finIni, iniCie - 1, nDias() - 1) }];
  if (iniCie - 1 > t[0].a) t.push({ fase: 'Desarrollo', de: t[0].a + 1, a: iniCie - 1 });
  if (iniCie < nDias()) t.push({ fase: 'Cierre', de: iniCie, a: nDias() - 1 });
  else t[t.length - 1].a = nDias() - 1;
  return t;
}
function renderSemana() {
  const fechas = fechasDe();
  if ($('#periodo')) $('#periodo').value = periodoPlaneacion();   // se llena al picar «Listo» (paso 1, datos generales)
  const act = activos(), n = act.length, libresN = nDias() - n;
  if (!S.listo) {
    $('#estructura-txt').textContent = '';
    $('#mapa').innerHTML = `<div class="semana-espera">Reparte ${losDe()} de la metodología en los días (paso 5) y pica «Listo»: aquí se arma el mapa de llaves.</div>`;
    return;
  }
  $('#estructura-txt').textContent = `Mapa de llaves: ${n} ${n === 1 ? 'sesión' : 'sesiones'}${S.semanas === 2 ? ' en dos semanas' : ''}, cada una con inicio, desarrollo y cierre` +
    (libresN ? ` · ${libresN} ${libresN === 1 ? 'día' : 'días'} sin sesión` : '');
  if (S.central) $('#mapa').style.setProperty('--c', COLOR[S.central]);
  const llave = (cls, de, a, titulo, nota) =>
    `<div class="fase ${cls}" style="grid-column:${de % 5 + 1} / ${a % 5 + 2}"><b>${titulo}</b><small>${nota}</small>${LLAVE}</div>`;
  const lm = metodo()?.momentos || [];
  const sesiones = ks => !ks.length ? 'sin sesiones' : ks.length === 1 ? `Sesión ${ks[0]}`
    : ks.length > 3 && ks[ks.length - 1] - ks[0] === ks.length - 1 ? `Sesiones ${ks[0]} a ${ks[ks.length - 1]}` : `Sesiones ${yLista(ks)}`;
  const desarrollo = act.filter(d => faseDia(d) === 'Desarrollo'), final = desarrollo[desarrollo.length - 1];
  const CLASE = { Inicio: 'ini', Desarrollo: 'des', Cierre: 'cie' };
  const nota = (t, de, a) => t.fase === 'Inicio' ? 'Recuperación de saberes previos · sin productos'
    : t.fase === 'Cierre' ? 'Retroalimentación y conclusiones · sin productos'
    : final >= de && final <= a ? `Productos parciales y producto final (${nombreDia(final).toLowerCase()} ${fechas[final].getDate()})` : 'Productos parciales';
  const llaves = w => tramos().map(t => {     // el pedazo de cada recuadro que cae en la semana w
    const de = Math.max(t.de, 5 * w), a = Math.min(t.a, 5 * w + 4);
    if (de > a) return '';
    const ks = act.filter(d => d >= t.de && d <= t.a).map(sesionDe);
    return llave(CLASE[t.fase], de, a, `${t.fase}${t.de < de ? ' (continúa)' : ''} · ${sesiones(ks)}`, nota(t, de, a));
  }).join('');
  const tarjeta = (s, i) => {
    const k = sesionDe(i), libre = !k, no = libre ? ' disabled' : '';
    const fecha = `${fechas[i].getDate()} de ${MESES[fechas[i].getMonth()]}`;
    const momentos = s.momentos.map((mo, j) => {
      const esDes = mo.momento === 'Desarrollo';
      const nDes = s.momentos.filter(x => x.momento === 'Desarrollo').length;
      const cab = `<b>${j + 1}. ${esc(mo.momento)}</b>${!libre && esDes && nDes > 1 ? `<button class="mini sec" data-quitam="${i}|${j}">Quitar</button>` : ''}`;
      const agrega = !libre && esDes && j === s.momentos.length - 2 && nDes < 3
        ? `<button class="mini sec" data-agregam="${i}">+ otro momento de desarrollo</button>` : '';
      const tipo = { Inicio: 'm-ini', Desarrollo: 'm-des', Cierre: 'm-cie' }[mo.momento] || 'm-des';
      return `<div class="momento ${tipo}">
        <div class="mcab">${cab}</div>
        <input data-f="pda" data-s="${i}" data-m="${j}" value="${esc(mo.pda)}" placeholder="Verbo según la taxonomía de Bloom: Identifica…, explica…"
          title="Empieza con un verbo según la taxonomía de Bloom (identifica, explica, compara…): lo que hace el alumno"${no}>
        <textarea data-f="consignas" data-s="${i}" data-m="${j}" placeholder="Instrucciones de acción para el docente, una por renglón: Pide…, Pregunta…, Organiza…, Traza…
Con sus recursos: Guía Santillana pp. 30, libro Proyectos Comunitarios pp. 15."
          title="Instrucciones de acción para el docente: una por renglón, cada una empieza con el verbo de lo que hace (Pide, Pregunta, Organiza, Traza…). Escribe los recursos con su libro y páginas (Guía Santillana pp. 30, libro Proyectos Comunitarios pp. 15)."${no}>${esc(mo.consignas)}</textarea>
      </div>${agrega}`;
    }).join('');
    const L = libre ? null : lugar(i);
    const etapas = s.etapa.length ? `<div class="dia-etapas">${s.etapa.map(x =>
      `<span class="etapa-chip"><b>${lm.indexOf(x) + 1}</b>${esc(x.includes(' – ') ? x.split(' – ')[1] : x)}</span>`).join('')}</div>` : '';
    const cab = libre
      ? `<div class="dia-tit"><span class="dia-nombre">${nombreDia(i)}</span><span class="ses">Sin sesión</span></div>
         <div class="f">${fecha} · ${S.sinClase[i] ? 'No hay clase' : `Este día no lleva ${palabra()}`}</div>`
      : `<div class="dia-tit"><span class="dia-nombre">${nombreDia(i)}</span><span class="ses">Sesión ${k}</span></div>
         <div class="f">${fecha} · ${L.fase} ${S.semanas === 2 ? 'del proyecto' : 'de la semana'}${L.fase !== 'Desarrollo' ? ' · sin productos' : L.final ? ' · producto final' : ''}</div>${etapas}`;
    return `<div class="dia${libre ? ' libre' : ''}">
      <div class="dia-cab">${cab}</div>
      ${momentos}
      <div id="nota-${i}"></div>
      <div class="tarea"><label>Tarea
        <input data-tarea="${i}" value="${esc(s.tarea)}" placeholder="En infinitivo: traer, investigar…"${no}></label></div>
    </div>`;
  };
  $('#mapa').innerHTML = [...Array(S.semanas).keys()].map(w => `<div class="mapa-semana">
      ${S.semanas === 2 ? `<div class="titulo-semana">Semana ${w + 1} <small>${rangoSemana(w)}</small></div>` : ''}
      <div class="scroll"><div class="llaves">${llaves(w)}</div>
        <div class="semana">${S.sesiones.slice(5 * w, 5 * w + 5).map((s, j) => tarjeta(s, 5 * w + j)).join('')}</div></div>
    </div>`).join('');
  S.sesiones.forEach((_, i) => contadores(i));
}

function contadores(i) {           // avisos del día; el de consignas, solo si pasa del máximo (10 oct: sin contador fijo)
  const s = S.sesiones[i], k = sesionDe(i);
  if (!$('#nota-' + i)) return;
  if (!k) { $('#nota-' + i).innerHTML = ''; return; }
  const L = lugar(i);
  const c = s.momentos.reduce((a, m) => a + lineas(m.consignas).length, 0);
  const notas = [];
  if (c > D.max_consignas) notas.push(`Llevas ${c} consignas: el máximo es ${D.max_consignas} en ${D.fmt.duracion_sesion || '1 h 30 min'}.`);
  const conProducto = s.momentos.some(m => m.consignas.includes('**'));
  if (L.fase !== 'Desarrollo' && conProducto) notas.push(`La sesión ${k} va sin productos (es de ${L.fase.toLowerCase()}).`);
  if (!L.final) {                          // el día del producto final la Guía va al inicio
    const cierre = s.momentos[s.momentos.length - 1];
    if (lineas(cierre.consignas).length && !/Gu[ií]a Santillana/.test(cierre.consignas)) notas.push('Tu patrón: el cierre de este día es la Guía Santillana en el aula.');
  }
  if (/Gu[ií]a Santillana/.test(s.tarea)) notas.push('La Guía se contesta en el aula, no de tarea.');
  $('#nota-' + i).innerHTML = notas.map(t => `<div class="nota-dia">${esc(t)}</div>`).join('');
}

/* ---------------------------------------------------------------- 5. evaluación */
/* Evaluación (10 oct): la tabla del libro 4 (SEP, 2013, p. 20). Se pica el instrumento (o los instrumentos) y la técnica
   sale sola; en la casilla de evaluación va cada técnica con su instrumento. Sin indicadores: los instrumentos los
   elabora él por separado. Las descripciones están condensadas del libro 4 (página impresa). Todos se pueden elegir,
   también la rúbrica: el Planeador es para todo tipo de planeación. */
const TECNICA = {   // nombre · color · qué es, en palabras sencillas
  'observación': ['Observación', '#5f9e3c', 'Miras a los alumnos mientras trabajan y anotas lo que ves.'],
  'desempeño de los alumnos': ['Desempeño de los alumnos', '#d99a12', 'Los alumnos hacen o responden algo que demuestra lo que aprendieron.'],
  'análisis del desempeño': ['Análisis del desempeño', '#4472c4', 'Revisas sus trabajos con criterios para valorar cuánto avanzaron.'],
  'interrogatorio': ['Interrogatorio', '#dd6b34', 'Les preguntas o los pones a argumentar, de forma oral o por escrito.'],
};
const INSTRUMENTO = {   // nombre del libro 4 · qué es y cómo se usa, con un ejemplo · página del libro 4 (10 oct: en claro)
  'guía de observación': ['Guía de observación', 'Una lista de lo que te vas a fijar mientras trabajan, escrita como afirmaciones o preguntas; por ejemplo: «¿Escucha a sus compañeros?», «Explica con sus palabras». La preparas antes de la clase.', 21],
  'registro anecdótico': ['Registro anecdótico', 'Una nota breve que escribes cuando pasa algo importante con un alumno o con el grupo: qué hizo, qué dijo y en qué situación. Sirve para dar seguimiento a su comportamiento, actitudes o intereses.', 27],
  'diario de clase': ['Diario de clase', 'Lo escriben los alumnos: cada uno anota qué hizo en las actividades, qué aprendió, qué dudas le quedaron y qué opina.', 32],
  'diario de trabajo': ['Diario de trabajo', 'Lo escribes tú: al terminar la jornada anotas en pocas líneas cómo salió la clase y qué influyó, para reflexionar sobre tu práctica.', 34],
  'escala de actitudes': ['Escala de actitudes', 'Una lista de frases, como «Ayudo a mis compañeros», en la que el alumno marca qué tan de acuerdo está: totalmente, parcialmente, ni de acuerdo ni en desacuerdo… Sirve para conocer actitudes como el respeto o la empatía.', 35],
  'preguntas sobre el procedimiento': ['Preguntas sobre el procedimiento', 'Preguntas para que el alumno explique cómo resolvió algo: «¿Qué hiciste primero?», «¿Por qué lo hiciste así?», «¿Qué cambiarías?». Muestran si entendió el proceso, no solo el resultado.', 37],
  'cuadernos de los alumnos': ['Cuadernos de los alumnos', 'Revisas los cuadernos para ver cómo avanza cada alumno en lo que trabaja en clase. También le muestran a la familia lo que se está haciendo.', 42],
  'organizadores gráficos': ['Organizadores gráficos', 'Esquemas que hacen los alumnos para mostrar cómo relacionan las ideas: mapas conceptuales, cuadros sinópticos, cuadros de doble entrada, diagramas de árbol. Conviene usarlos al cerrar un tema.', 42],
  'portafolio': ['Portafolio', 'Una carpeta con los trabajos más importantes de cada alumno, reunidos durante un proyecto o un periodo, para ver cómo fue mejorando.', 46],
  'rúbrica': ['Rúbrica', 'Una tabla con lo que se evalúa en los renglones y niveles de logro en las columnas (por ejemplo: destacado, satisfactorio, suficiente, insuficiente). En cada casilla describes cómo se ve ese nivel.', 51],
  'lista de cotejo': ['Lista de cotejo', 'Una lista de lo que el alumno debe hacer o mostrar, en el orden en que lo hace. Junto a cada punto solo marcas si lo logró o no (sí / no).', 57],
  'tipos textuales (debate y ensayo)': ['Tipos textuales: debate y ensayo', 'Los alumnos defienden una postura con argumentos: hablando frente a otros (debate) o por escrito (ensayo). Muestran si comprendieron el tema y si saben argumentar.', 58],
  'tipos orales y escritos (pruebas escritas)': ['Tipos orales y escritos: pruebas escritas', 'Un examen con preguntas claras de respuesta corta o de elegir: opción múltiple, verdadero o falso, ordenar sucesos, varias preguntas sobre un mismo texto.', 63],
};
const tecnicaDe = ins => Object.keys(D.libro4).find(t => D.libro4[t].includes(ins)) || '';
function tocaInstrumento(ins) {
  const k = S.instrumentos.indexOf(ins);
  if (k >= 0) S.instrumentos.splice(k, 1);
  else {
    S.instrumentos.push(ins);
    const orden = Object.values(D.libro4).flat();
    S.instrumentos.sort((a, b) => orden.indexOf(a) - orden.indexOf(b));
  }
  renderEval(); cambio();
}
/* 11 oct: la misma tabla del libro 4, acomodada por técnica (una columna de color cada una) con sus instrumentos como
   tarjetas; abajo, lo que va a ir en la casilla de evaluación */
function renderEval() {
  const elegidos = S.instrumentos;
  const tecnicas = Object.entries(D.libro4).map(([t, lista]) => {
    const [nom, color, que] = TECNICA[t] || [t, '#77746c', ''];
    return `<div class="tecnica" style="--c:${color}"><div class="tec-cab"><h3>${esc(nom)}</h3><p>${esc(que)}</p></div>
      ${lista.map(ins => {
        const [n, desc, p] = INSTRUMENTO[ins] || [ins, '', ''], on = elegidos.includes(ins);
        return `<button type="button" class="instr ${on ? 'on' : ''}" data-ins="${esc(ins)}" aria-pressed="${on}">
          ${on ? `<span class="palomita">${PALOMITA}</span>` : ''}<span class="i-nom">${esc(n)}</span>
          ${desc ? `<span class="i-desc">${esc(desc)}</span>` : ''}${p ? `<span class="i-pag">Libro 4, p. ${p}</span>` : ''}</button>`;
      }).join('')}</div>`;
  }).join('');
  const resumen = elegidos.length
    ? `<div class="eval-resumen"><span class="er-t">En la casilla de evaluación irá:</span>${elegidos.map(ins => {
        const [nom, color] = TECNICA[tecnicaDe(ins)] || [tecnicaDe(ins), '#77746c'];
        return `<span class="er-chip" style="--c:${color}">${esc(nom)} · ${esc((INSTRUMENTO[ins] || [ins])[0].toLowerCase())}</span>`;
      }).join('')}</div>`
    : '<div class="eval-resumen vacio">Todavía no eliges ningún instrumento: pica uno o varios.</div>';
  $('#tabla-eval').innerHTML = `<div class="tecnicas">${tecnicas}</div>${resumen}`;
}

/* ---------------------------------------------------------------- 6. otros + todo */
function renderOtros() { renderNee(); }

/* Ajustes NEE por alumno (10 oct): nombre, necesidades especiales y ajustes; «Añadir» abajo y «Quitar» en cada uno.
   En el Word van como antes, un renglón por alumno: «• David, Julio y Rafael (conductas de hiperactividad…): sentados…».
   El texto de antes se reparte así; lo que no tiene esa forma queda entero en «Ajustes», y el Word sale igual. */
function neeDesdeTexto(txt) {
  return String(txt).split('\n').map(l => l.replace(/^\s*[•\-]\s*/, '').trim()).filter(Boolean).map(l => {
    const m = /^(.+?) \(([^()]+)\):\s*([\s\S]+)$/.exec(l);
    return m ? { nombre: m[1], necesidades: m[2], ajustes: m[3] } : { nombre: '', necesidades: '', ajustes: l };
  });
}
function textoNee() {
  return S.alumnosNee.map(x => {
    const n = x.nombre.trim(), c = x.necesidades.trim(), a = x.ajustes.trim().replace(/\s*\n\s*/g, ' ');
    const quien = n && c ? `${n} (${c})` : n || c;
    return quien || a ? '• ' + (quien ? (a ? `${quien}: ${a}` : quien) : a) : '';
  }).filter(Boolean).join('\n');
}
/* iniciales para el círculo de cada ficha: «Mateo y Valeria» → MV; sin nombre, una silueta */
const iniciales = n => String(n || '').split(/\s+/).filter(w => /^[A-ZÁÉÍÓÚÑ]/.test(w)).slice(0, 2).map(w => w[0]).join('');
const avatar = n => esc(iniciales(n)) || PERSONA;
function renderNee() {
  $('#nee-lista').innerHTML = S.alumnosNee.map((x, k) => `<div class="nee-alumno">
    <div class="nee-cab"><span class="avatar" data-avatar="${k}" aria-hidden="true">${avatar(x.nombre)}</span>
      <label class="nee-nombre">Nombre <input data-nee="${k}" data-f="nombre" value="${esc(x.nombre)}" placeholder="Nombre del alumno (o de varios)"></label>
      <button class="sec quita-nee" data-quitanee="${k}" title="Quitar" aria-label="Quitar ${esc(x.nombre.trim() || 'este alumno')}">${BOTE}</button></div>
    <div class="nee-cuerpo">
      <label>Necesidades especiales <input data-nee="${k}" data-f="necesidades" value="${esc(x.necesidades)}" placeholder="Qué necesita; p. ej., aún no lee ni escribe"></label>
      <label>Ajustes <textarea data-nee="${k}" data-f="ajustes" rows="3" placeholder="Qué harás con él o ella: dónde se sienta, con quién trabaja, apoyos, tiempos, materiales, cómo lo evalúas…">${esc(x.ajustes)}</textarea></label>
    </div>
  </div>`).join('') || '<div class="nee-vacio">Sin alumnos con necesidades especiales: la casilla de ajustes del Word queda vacía. Pica «Añadir alumno» para agregar uno.</div>';
}
function renderBarra() { }
function renderTodo() { renderBarra(); renderRuta(); renderCampo(); renderTabs(); renderElegidos(); renderLista(); renderProyecto(); renderReparto(); renderSemana(); renderEval(); renderOtros(); renderFormato(); }

/* ---------------------------------------------------------------- 9. formato de la planeación (11 oct) */
/* La Planeación Cedros (la plantilla de la titular) y un formato por metodología (generar_metodologia.py de la skill),
   ordenado por sus fases, momentos o etapas y con los nombres que esa metodología da a sus casillas. Los dos generan
   Word y PDF; el de una metodología, solo con una planeación de esa metodología (los demás muestran su estructura).
   La vista previa del formato de metodología se arma con aSemana(): lo mismo que recibe el Word. */
const metFormato = k => (D.formatos_met || {})[k] || { nombre: k, titulo: k, parte: 'Momento', fases: false, campos: [] };   // comun.FORMATOS_MET
const formatoActual = () => FORMATOS_ORDEN.includes(S.formato) ? S.formato : 'cedros';
const campoDeMet = k => Object.keys(D.campos).find(c => D.campos[c].metodologia === k);
const FORMATOS_ORDEN = ['cedros', 'ABPC', 'STEAM', 'ABP', 'AS'];
/* miniatura de cada formato: rectángulos que imitan sus tablas */
function miniFormato(k) {
  const v = k !== 'cedros', W = v ? 60 : 80, H = v ? 78 : 60;
  const r = (x, y, w, h, c = '#d8d5cc', o = 1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1" style="fill:${c};fill-opacity:${o}"/>`;
  const l = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#a9a59a" stroke-width=".6"/>`;
  const caja = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#a9a59a" stroke-width=".7"/>`;
  let d = '';
  if (k === 'cedros') d = r(4, 4, 72, 5, '#1d6b45') + caja(4, 12, 72, 10) + l(26, 12, 26, 22) + l(4, 17, 76, 17) +
    caja(4, 25, 72, 22) + l(16, 25, 16, 47) + l(30, 25, 30, 47) + [29, 33, 37, 41].map(y => l(4, y, 76, y)).join('') +
    caja(4, 50, 72, 7) + l(22, 50, 22, 57) + l(40, 50, 40, 57) + l(58, 50, 58, 57);
  else {
    const c = COLOR[campoDeMet(k)], mom = D.metodologias[k].momentos, n = mom.length, y0 = 34, h = 40 / n;
    d = r(4, 4, 52, 6, c) + caja(4, 13, 52, 14) + l(22, 13, 22, 27) + l(4, 17.6, 56, 17.6) + l(4, 22.3, 56, 22.3) +
      r(4, 30, 52, 4, c, .3) + caja(4, 30, 52, 44) + l(k === 'ABPC' ? 24 : 18, 30, k === 'ABPC' ? 24 : 18, 74) + l(36, 30, 36, 74) +
      mom.map((_, j) => j ? l(k === 'ABPC' ? 12 : 4, y0 + j * h, 56, y0 + j * h) : '').join('');
    if (k === 'ABPC') {             // las tres fases, en bandas: preparación, acción e intervención
      let y = y0;
      ['Preparación', 'Acción', 'Intervención'].forEach((f, j) => {
        const cuantos = mom.filter(x => x.startsWith(f)).length;
        d += r(4, y, 8, cuantos * h, c, [.55, .35, .2][j]) + l(4, y + cuantos * h, 12, y + cuantos * h);
        y += cuantos * h;
      });
      d += l(12, 30, 12, 74);
    }
  }
  return `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true">${r(0, 0, W, H, '#fff')}${d}</svg>`;
}
function renderFormato() {
  if (!$('#formatos')) return;
  const k = formatoActual();
  const mia = S.central ? D.campos[S.central].metodologia : null;
  $('#formatos').innerHTML = FORMATOS_ORDEN.map(c => {
    if (c === 'cedros') return `<button class="formato ${c === k ? 'on' : ''}" data-formato="cedros" style="--c:#1d6b45">${miniFormato(c)}
      <span class="f-nom">Planeación Cedros</span><span class="f-desc">La de Cedros del Líbano: tres tablas horizontales con el mapa de llaves.</span>
      <span class="f-tag">genera Word y PDF</span></button>`;
    const m = D.metodologias[c], campo = campoDeMet(c), n = m.momentos.length, cfg = metFormato(c);
    return `<button class="formato ${c === k ? 'on' : ''}" data-formato="${c}" style="--c:${COLOR[campo]}">${miniFormato(c)}
      <span class="f-nom">${esc(cfg.nombre)}</span>
      <span class="f-desc">${esc(D.campos[campo].nombre)} · ${n} ${cfg.parte.toLowerCase()}s${cfg.fases ? ' en 3 fases' : ''}</span>
      <span class="f-tag ${c === mia ? '' : 'otra'}">${c === mia ? 'tu metodología · genera Word y PDF' : 'otra metodología'}</span></button>`;
  }).join('');
  let html = '', aviso;
  if (k === 'cedros') aviso = 'Vista previa del contenido. El Word sale en la plantilla de Cedros, con su escudo y su encabezado.';
  else if (!S.central) aviso = 'Elige el campo formativo central (paso 2) para llenar el formato.';
  else if (k === mia) aviso = 'Así va a quedar el Word (hoja carta horizontal). «Generar Word y PDF» lo arma en este formato.';
  else aviso = `Este formato es para planeaciones de ${D.campos[campoDeMet(k)].nombre}. La tuya es de ${D.campos[S.central].nombre}: aquí solo ves su estructura.`;
  try { html = k === 'cedros' ? vistaCedros(vfDatos()) : vistaMetodologia(k, vfDatos()); }
  catch (e) { html = '<p>Llena los pasos anteriores para ver la vista previa.</p>'; }
  $('#vista-formato').innerHTML = `<div class="vf-aviso">${esc(aviso)}</div>
    <div class="hoja-vf horizontal ${k === 'cedros' ? '' : 'met'}" style="--c:${k === 'cedros' ? '#1d6b45' : COLOR[campoDeMet(k)]}">${html}</div>`;
}
/* los datos de la planeación, ya acomodados para las vistas */
const VF_LIBROS = ['Guía Santillana', 'Proyectos Comunitarios', 'Proyectos Escolares', 'Proyectos de Aula', 'Nuestros saberes', 'Múltiples lenguajes'];
const VF_ESCENARIO = { 'Proyectos Comunitarios': 'comunitario', 'Proyectos Escolares': 'escolar', 'Proyectos de Aula': 'aula' };
function vfCitas(textos) {              // como citas_de() de la skill: {libro: Set(páginas)}
  const pag = '(?:pp?\\.|págs?\\.|páginas?)\\s*(\\d+(?:\\s*(?:[-–]|,|\\by\\b|\\ba\\b)\\s*\\d+)*)', lib = '(' + VF_LIBROS.join('|') + ')';
  const A = new RegExp(pag + '\\s+(?:de\\s+la|del|de)\\s+(?:libro\\s+)?' + lib, 'g'), B = new RegExp(lib + '\\s*[,:]?\\s*' + pag, 'g');
  const por = {}, mete = (libro, txt) => {
    for (const m of txt.matchAll(/(\d+)(?:\s*(?:[-–]|\ba\b)\s*(\d+))?/g)) {
      const a = +m[1], b = +(m[2] || m[1]);
      (por[libro] = por[libro] || new Set());
      if (b >= a && b - a < 80) for (let p = a; p <= b; p++) por[libro].add(p); else por[libro].add(a);
    }
  };
  textos.forEach(t => { t = t.replace(/\*\*/g, ''); for (const m of t.matchAll(A)) mete(m[2], m[1]); for (const m of t.matchAll(B)) mete(m[1], m[2]); });
  return por;
}
function vfRangos(set) {
  const ps = [...set].sort((a, b) => a - b), tr = [];
  ps.forEach(p => { if (tr.length && p === tr[tr.length - 1][1] + 1) tr[tr.length - 1][1] = p; else tr.push([p, p]); });
  return (ps.length === 1 ? 'p. ' : 'pp. ') + yLista(tr.map(([a, b]) => a === b ? String(a) : `${a}-${b}`));
}
const vfLibros = (por, cuales) => VF_LIBROS.filter(l => por[l] && cuales(l)).map(l =>
  `${l}${VF_ESCENARIO[l] ? ', escenario ' + VF_ESCENARIO[l] : ''}: ${vfRangos(por[l])}`);
function vfDatos() {
  const d = S.datos, f = fechasDe(), act = S.listo ? activos() : todosDias();
  const cap = t => t ? t[0].toUpperCase() + t.slice(1) : '';
  const ses = act.map((i, k) => {
    const s = S.sesiones[i];
    return { i, n: k + 1, fecha: textoFecha(f[i]), etapa: s.etapa.join(' · '), fase: S.listo ? faseDia(i) : '',
      tarea: s.tarea.trim(), momentos: s.momentos.map(m => ({ momento: m.momento, pda: (m.pda || '').trim(), consignas: lineas(m.consignas) })) };
  });
  const textos = ses.flatMap(s => [...s.momentos.flatMap(m => m.consignas), s.tarea]);
  const por = vfCitas(textos), ltg = l => l !== 'Guía Santillana';
  const orden = [S.central, ...S.secundarios].filter(Boolean);
  return {
    d, ses, periodo: periodoPlaneacion() || periodo(S.inicio, S.semanas),
    central: S.central ? D.campos[S.central].nombre : '—', metodologia: metodo()?.nombre || '—',
    vinculados: S.secundarios.map(c => D.campos[c].nombre), g: S.general,
    escenario: VF_LIBROS.filter(l => por[l] && VF_ESCENARIO[l]).map(l => VF_ESCENARIO[l]).join(', '),
    contenidos: S.seleccion.slice().sort((a, b) => orden.indexOf(a.campo) - orden.indexOf(b.campo)).map(x => ({
      campo: D.campos[x.campo].nombre, contenido: x.contenido || programa()[x.campo][x.idx].contenido, pdas: x.pdas, proyecto: x.proyecto })),
    vinculacion: vfLibros(por, ltg), recursos: vfLibros(por, l => !ltg(l)),
    evaluacion: S.instrumentos.map(ins => `${cap(tecnicaDe(ins))}: ${(INSTRUMENTO[ins] || [ins])[0].toLowerCase()}`),
    nee: textoNee() ? textoNee().split('\n').map(x => x.replace(/^•\s*/, '')) : [],
  };
}
const vfTx = t => esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
const vfLista = xs => xs.length ? `<ul>${xs.map(x => `<li>${vfTx(x)}</li>`).join('')}</ul>` : '<span class="vf-vacio">—</span>';
const vfProductos = cons => cons.flatMap(c => [...c.matchAll(/\*\*(.+?)\*\*/g)].map(m => m[1]));
const vfLogos = (d, centro) => d.logo_izq || d.logo_der ? `<div class="vf-cab con-logos"><div>${d.logo_izq ? `<img src="${d.logo_izq}" alt="">` : ''}</div>
  <div>${centro}</div><div class="der">${d.logo_der ? `<img src="${d.logo_der}" alt="">` : ''}</div></div>` : `<div class="vf-cab">${centro}</div>`;
const vfCab = (v, titulo) => vfLogos(v.d, `<div class="vf-tit">${esc(titulo)}</div>
  <div><b>${esc(v.d.escuela || '—')}</b> · C.C.T. ${esc(v.d.cct || '—')} · Zona escolar ${esc(v.d.zona || '—')}, sector ${esc(v.d.sector || '—')}</div>
  <div>Docente: ${esc(v.d.docente || '—')} · Fase ${esc(v.d.fase || '')} · ${esc(v.d.grado || '')}.º ${esc(v.d.grupo || '')} · Periodo: ${esc(v.periodo)}</div>`);
const vfFila = (k, val) => `<tr><th>${esc(k)}</th><td>${val}</td></tr>`;
const vfFirmas = v => `<div class="vf-firmas">${['supervisor', 'director', 'titular', 'catedratico'].filter(k => (v.d[k] || '').trim())
  .map(k => `<div><span></span>${esc(v.d[k])}<small>${esc(k === 'titular' ? 'Docente titular' : cargoDe(k))}</small></div>`).join('')}
  <div><span></span>Normalista ${esc(v.d.docente || '')}<small>Docente en formación</small></div></div>`;
const vfContenidos = v => `<table class="vf-t"><tr><th>Campo formativo</th><th>Contenido</th><th>PDA</th></tr>${v.contenidos.map(c =>
  `<tr><td>${esc(c.campo)}</td><td>${esc(c.contenido)}${c.proyecto ? `<br><i>Proyecto: ${esc(c.proyecto)}</i>` : ''}</td><td>${vfLista(c.pdas)}</td></tr>`).join('')
  || '<tr><td colspan="3" class="vf-vacio">Sin contenidos todavía (paso 3).</td></tr>'}</table>`;
const vfMomentos = s => s.momentos.map(m => `<div class="vf-m"><b>${esc(m.momento)}.</b>${m.pda ? ` <i>${esc(m.pda)}</i>` : ''}${vfLista(m.consignas)}</div>`).join('');
function vistaCedros(v) {
  return vfCab(v, 'Planeación Cedros') +
    `<table class="vf-t">${vfFila('Campo formativo central', esc(v.central))}${vfFila('Ejes articuladores', vfLista(v.g.ejes))}
      ${vfFila('Nombre del proyecto', esc(v.g.nombre || '—'))}${vfFila('Tema de interés', esc(v.g.tema || '—'))}${vfFila('Pregunta generadora', esc(v.g.pregunta || '—'))}
      ${vfFila('Metodología', esc(v.metodologia))}${vfFila('Productos parciales', vfLista(lineas(v.g.parciales)))}${vfFila('Producto final', esc(v.g.finales || '—'))}
      ${vfFila('Evento de cierre', esc(v.g.cierre || '—'))}</table>${vfContenidos(v)}
    <table class="vf-t"><tr><th>Fecha</th><th>Fase · sesión · etapa</th><th>Actividades</th></tr>${v.ses.map(s =>
      `<tr><td>${esc(s.fecha)}</td><td>${esc(s.fase)} – Sesión ${s.n}${s.etapa ? `<br><i>${esc(s.etapa)}</i>` : ''}</td><td>${vfMomentos(s)}${s.tarea ? `<div class="vf-m"><b>Tarea:</b> ${vfTx(s.tarea)}</div>` : ''}</td></tr>`).join('')}</table>
    <table class="vf-t"><tr><th>Vinculación</th><th>Recursos</th><th>Evaluación formativa</th><th>Ajustes NEE</th></tr>
      <tr><td>${vfLista(v.vinculacion)}</td><td>${vfLista(v.recursos)}</td><td>${vfLista(v.evaluacion)}</td><td>${vfLista(v.nee)}</td></tr></table>${vfFirmas(v)}`;
}
/* firmas como firmas_de() de comun.py: nombre y cargo completos, en orden de jerarquía; las personas sin nombre no van */
function firmasDe(d) {
  const pl = D.fmt.firmas_plantilla, base = D.fmt.datos || {}, t = x => String(x || '').trim();
  if (!pl) return [];
  const vals = { ...Object.fromEntries(Object.entries(d).map(([k, v]) => [k, t(v)])),
    escuela_firmas: t(d.escuela) === base.escuela ? (D.fmt.escuela || t(d.escuela)) : t(d.escuela),
    Supervisor: cargoDe('supervisor'), Director: cargoDe('director'), 'Catedrático': cargoDe('catedratico') };
  const llena = x => x.replace(/\{([^}]+)\}/g, (_, k) => vals[k] ?? '');
  const sinNormal = rol => vals.normal ? rol : rol.replace(', {normal}', '').replace(' {normal}', '');   // la normal es opcional
  return pl.filter(([n]) => vals[/\{(\w+)\}/.exec(n)[1]]).map(([n, rol]) => [llena(n), llena(sinNormal(rol))]);
}
/* texto con el marcado de la skill («• » viñeta, «**» negritas) a HTML */
function vfMarca(t) {
  let h = '', ul = false;
  lineas(t).forEach(l => {
    const b = l.startsWith('• ');
    if (b !== ul) { h += b ? '<ul>' : '</ul>'; ul = b; }
    h += b ? `<li>${vfTx(l.slice(2))}</li>` : `<div>${vfTx(l)}</div>`;
  });
  return h + (ul ? '</ul>' : '');
}
/* formato de una metodología: lo mismo que arma generar_metodologia.py (encabezado, datos del proyecto con los nombres
   de la metodología, contenidos y PDA, tabla por fases/momentos/etapas, vinculación, evaluación, ajustes y firmas) */
function vistaMetodologia(k, v) {
  const m = D.metodologias[k], cfg = metFormato(k), campo = campoDeMet(k), conFase = cfg.fases;
  const propia = !!S.central && D.campos[S.central].metodologia === k;
  const sem = propia ? aSemana() : null, g = sem ? sem.general : {};
  const parte = x => x.includes(' – ') ? x.split(' – ') : ['', x];        // «Preparación – Identificamos» → fase y momento
  const etapas = s => [].concat(s.etapa || []);
  const filas = sem && S.listo ? sem.sesiones.map((s, j) => ({ fase: [...new Set(etapas(s).map(x => parte(x)[0]).filter(Boolean))].join(' y '),
    partes: etapas(s).map(x => parte(x)[1]), s, n: j + 1 })) : m.momentos.map(x => ({ fase: parte(x)[0], partes: [parte(x)[1]], s: null }));
  const lista = xs => xs.length ? `<ul>${xs.map(x => `<li>${vfTx(x)}</li>`).join('')}</ul>` : '';
  const cap = t => t ? t[0].toUpperCase() + t.slice(1) : t;
  const agenda = (D.fmt.cuadernos || {}).agenda || 'agenda';
  const acts = s => s.momentos.map(x => `<div class="vf-m"><b>${esc(x.momento)}.</b>${x.pda ? ` <i>${esc(x.pda)}</i>` : ''}${lista(x.consignas)}</div>`).join('') +
    (s.tarea ? `<div class="vf-m"><b>Tarea</b> (pide que la anoten en la ${esc(agenda)}): ${vfTx(s.tarea)}</div>` : '');
  const tabla = filas.map((f, j) => {
    let fase = '';
    if (conFase && (j === 0 || filas[j - 1].fase !== f.fase)) {
      const n = filas.slice(j).findIndex(h => h.fase !== f.fase);
      fase = `<td class="vf-fase" rowspan="${n < 0 ? filas.length - j : n}">${esc(f.fase)}</td>`;
    }
    const s = f.s;
    return `<tr>${fase}<td><b>${f.partes.map(esc).join('<br>')}</b></td><td>${s ? `<b>Sesión ${f.n}</b><br>${esc(s.fecha)}` : ''}</td>
      <td>${s ? acts(s) : ''}</td><td>${s ? lista(vfProductos(s.momentos.flatMap(x => x.consignas)).map(cap)) : ''}</td></tr>`;
  }).join('');
  // datos del proyecto, en el orden del Word
  const val = x => propia ? x : '';
  const otros = sem ? Object.keys(sem.contenidos).filter(c => c !== S.central).map(c => D.campos[c].nombre) : [];
  const textos = sem ? sem.sesiones.flatMap(s => [...s.momentos.flatMap(x => x.consignas), s.tarea || '']) : [];
  const por = vfCitas(textos), ltg = l => l !== 'Guía Santillana';
  const datos = [['Nombre del proyecto', val(esc(g.nombre || ''))],
    ['Campo formativo', esc(D.campos[campo].nombre) + (otros.length ? ` · vinculado con ${esc(otros.join(', '))}` : '')],
    ['Metodología', esc(m.nombre)]];
  if (conFase) datos.push(['Escenario', val(esc(VF_LIBROS.filter(l => por[l] && VF_ESCENARIO[l]).map(l => VF_ESCENARIO[l]).join(', ') || '—'))]);
  cfg.campos.forEach(([etq, clave]) => {
    if (clave === 'finales') datos.push(['Productos parciales', val(lista(g.parciales || []))]);
    datos.push([etq, val(esc(g[clave] || ''))]);
  });
  datos.push(['Ejes articuladores', val(esc((g.ejes || []).join(', ')))]);
  const orden = sem ? [S.central, ...Object.keys(sem.contenidos).filter(c => c !== S.central)].filter(c => sem.contenidos[c]) : [];
  const contenidos = orden.map(c => `<tr><td>${esc(D.campos[c].nombre)}</td><td>${vfMarca(sem.contenidos[c][0])}</td><td>${vfMarca(sem.contenidos[c][1])}</td></tr>`).join('')
    || '<tr><td>&nbsp;</td><td></td><td></td></tr>';
  const vinc = vfLibros(por, ltg).map(x => x + '.'), rec = vfLibros(por, l => !ltg(l));
  const evaluacion = sem ? `<div>${esc(D.libro4_ref || '')}</div>${lista(sem.evaluacion.map(e => `Técnica: ${e.tecnica}. Instrumento: ${e.instrumento}.`))}` +
    (D.fmt.registro_evaluacion ? `<div>${esc(D.fmt.registro_evaluacion)}</div>` : '') : '';
  const anchos = conFase ? [10.4, 13.2, 10.4, 48.6, 17.4] : [16, 11.1, 52.8, 20.1];
  const firmas = propia ? firmasDe(S.datos) : [], c1 = firmas.length % 2 ? firmas[0] : null;
  const firma = ([n, rol]) => `<div><span></span><b>${esc(n)}</b><small>${esc(rol)}</small></div>`;
  return vfLogos(v.d, `<div class="vf-tit">${esc(cfg.titulo)}</div>
      <div><b>${esc(v.d.escuela || '')}</b> · C.C.T. ${esc(v.d.cct || '')} · Zona escolar ${esc(v.d.zona || '')}, sector ${esc(v.d.sector || '')}</div>
      <div>Docente: ${esc(v.d.docente || '')} · Fase ${esc(v.d.fase || '')} · ${esc(v.d.grado || '')}.º ${esc(v.d.grupo || '')} · Periodo: ${esc(v.periodo)}</div>
      ${(v.d.normal || '').trim() ? `<div>Escuela normal: ${esc(v.d.normal.trim())}</div>` : ''}`) + `
    <h4>Datos del proyecto</h4><table class="vf-t">${datos.map(([a, b]) => vfFila(a, b)).join('')}</table>
    <h4>Contenidos y PDA</h4><table class="vf-t vf-met"><colgroup><col style="width:18%"><col style="width:32%"><col></colgroup>
      <tr><th>Campo formativo</th><th>Contenido</th><th>PDA</th></tr>${contenidos}</table>
    <h4>${cfg.parte === 'Etapa' ? 'Etapas' : 'Momentos'} de la metodología</h4>
    <div class="vf-sub">${m.momentos.map(x => esc(parte(x)[1])).join(' → ')}</div>
    <table class="vf-t vf-met"><colgroup>${anchos.map(w => `<col style="width:${w}%">`).join('')}</colgroup>
      <tr>${conFase ? '<th>Fase</th>' : ''}<th>${cfg.parte}</th><th>Sesión</th><th>Actividades</th><th>Productos</th></tr>${tabla}</table>
    <h4>Vinculación y recursos</h4><table class="vf-t">${vfFila('Libros de texto', val(lista(vinc) || '—'))}${vfFila('Recursos', val(lista(rec) || '—'))}</table>
    <h4>Evaluación formativa</h4><table class="vf-t">${vfFila('Técnicas e instrumentos', evaluacion)}</table>
    <h4>Ajustes razonables</h4><table class="vf-t">${vfFila('Alumnos con NEE', propia ? (sem.nee ? vfMarca(sem.nee) : '—') : '')}</table>
    ${c1 ? `<div class="vf-firmas uno">${firma(c1)}</div>` : ''}<div class="vf-firmas">${(c1 ? firmas.slice(1) : firmas).map(firma).join('')}</div>`;
}

/* ---------------------------------------------------------------- panel → planeación (formato de la skill) */
function aSemana() {
  const fechas = fechasDe();
  const act = S.listo ? activos() : todosDias();               // días con sesión (sin «Listo», todos, sin etapas)
  const ses = d => act.indexOf(d - 1) + 1;                     // día del panel (1 = lunes) → número de sesión
  const porCampo = {};
  S.seleccion.forEach(x => (porCampo[x.campo] = porCampo[x.campo] || []).push(x));
  const contenidos = {};
  for (const [c, items] of Object.entries(porCampo)) {
    const f = x => programa()[c][x.idx];
    if (items.length === 1) contenidos[c] = [f(items[0]).contenido, items[0].pdas.map(p => '• ' + p).join('\n')];
    else contenidos[c] = [items.map(x => `**${x.proyecto || 'Proyecto'}:** ${f(x).contenido}`).join('\n'),
      items.map(x => `**${x.proyecto || 'Proyecto'}**\n` + x.pdas.map(p => '• ' + p).join('\n')).join('\n')];
  }
  const g = S.general;
  const sem = {
    periodo: periodoPlaneacion() || periodo(S.inicio, S.semanas), campo_central: S.central, contenidos,
    general: { ejes: g.ejes, nombre: g.nombre.trim(), tema: g.tema.trim(), pregunta: g.pregunta.trim(),
      parciales: lineas(g.parciales), finales: g.finales.trim(), cierre: g.cierre.trim() },
    sesiones: act.map(i => {
      const s = S.sesiones[i];
      const o = { fecha: textoFecha(fechas[i], i), momentos: s.momentos.map(m => {
        const r = { momento: m.momento, consignas: lineas(m.consignas) };
        r.pda = (m.pda || '').trim();
        return r;
      }) };
      if (S.listo && s.etapa.length) o.etapa = s.etapa.length === 1 ? s.etapa[0] : s.etapa;   // varios van como lista
      if (s.tarea.trim()) o.tarea = s.tarea.trim();
      return o;
    }),
    evaluacion: S.instrumentos.map(ins => ({ tecnica: tecnicaDe(ins), instrumento: ins }))   // sin 'cotejo': sin hojas (10 oct)
  };
  sem.estructura = 'secuencia';
  sem.datos = { ...S.datos };                                // escuela, clave, zona, sector, docente, fase, grado y grupo
  for (const k in CARGOS) sem.datos['cargo_' + k] = cargoDe(k);    // el cargo tal como se ve en su menú
  if (S.semanas === 2) sem.semanas = 2;
  const libres = todosDias().filter(i => !act.includes(i));
  if (libres.length) sem.dias_sin_sesion = libres.map(i => textoFecha(fechas[i], i));
  sem.nee = textoNee();                                      // un renglón por alumno; vacío = sin alumnos con NEE
  return sem;
}

/* planeación guardada (formato de la skill) → panel, para abrir las que no traen el estado del panel */
function desdeSemana(sem, nombre) {
  const E = nuevoEstado();
  E.nombre = nombre || '';
  E.estructura = sem.estructura === 'secuencia' ? 'secuencia' : 'metodologia';
  E.central = sem.campo_central || null;
  E.datos = { ...(D.fmt.datos || {}), ...(sem.datos || {}) };
  E.grado = gradoPda(E.datos.grado);
  const prog = (D.programas || {})[E.datos.fase] || D.programa;
  if (E.central) E.secundarios = ORDEN.filter(c => c !== E.central && (sem.contenidos || {})[c]);
  const p = /(\d+)(?: de (\w+))?(?: de (\d{4}))? al (\d+) de (\w+) de (\d{4})/.exec(sem.periodo || '');
  if (p) { const mes = MESES.indexOf(p[2] || p[5]); const año = Number(p[3] || p[6]); E.inicio = aIso(new Date(año, mes, Number(p[1]))); }
  for (const [c, [cont, pdas]] of Object.entries(sem.contenidos || {})) {
    const items = [];
    lineas(cont).forEach(l => {
      const m = /^\*\*(.+?):\*\*\s*(.*)$/.exec(l);
      const texto = norm(m ? m[2] : l), proyecto = m ? m[1] : '';
      const idx = (prog[c] || []).findIndex(f => norm(f.contenido) === texto);
      if (idx >= 0) items.push({ campo: c, idx, contenido: prog[c][idx].contenido, proyecto, pdas: [] });
    });
    let actual = items[0];
    lineas(pdas).forEach(l => {
      const h = /^\*\*(.+?)\*\*$/.exec(l);
      if (h) { actual = items.find(x => x.proyecto === h[1]) || actual; return; }
      if (actual) actual.pdas.push(norm(l.replace(/^•\s*/, '')));
    });
    E.seleccion.push(...items);
  }
  const g = sem.general || {};
  Object.assign(E.general, { nombre: g.nombre || '', tema: g.tema || '', pregunta: g.pregunta || '', cierre: g.cierre || '',
    finales: g.finales || '', parciales: (g.parciales || []).join('\n'), ejes: g.ejes || [] });
  E.semanas = sem.semanas === 2 ? 2 : 1;
  while (E.sesiones.length < 5 * E.semanas) E.sesiones.push({ etapa: [], tarea: '', momentos: momentosSec() });
  const fechasTxt = semanaDe(E.inicio, E.semanas).map(textoFecha);
  const dias = (sem.sesiones || []).map((s, k) => {
    const j = fechasTxt.indexOf(s.fecha), d = DIAS.indexOf((s.fecha || '').split(' ')[0]);
    return j >= 0 ? j : d >= 0 ? d : k;
  });
  (sem.sesiones || []).forEach((s, k) => {
    E.sesiones[dias[k]] = { etapa: [].concat(s.etapa || []), tarea: s.tarea || '',
      momentos: s.momentos.map(m => ({ momento: m.momento, pda: m.pda || '', consignas: (m.consignas || []).join('\n') })) };
  });
  E.instrumentos = [...new Set((sem.evaluacion || []).map(r => r.instrumento).filter(Boolean))];
  E.alumnosNee = neeDesdeTexto(sem.nee ?? D.fmt.nee ?? '');
  return E;
}

/* ---------------------------------------------------------------- servidor */
async function api(ruta, cuerpo) {
  const r = await fetch(ruta, cuerpo === undefined ? {} : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cuerpo) });
  return r.json();
}
function faltantes() {
  const f = [];
  if (!S.central) f.push('Elige el campo formativo central (paso 2).');
  else if (!S.listo) f.push(`Reparte ${losDe()} de la metodología en los días y pica «Listo» (paso 5).`);
  if (!S.seleccion.length) f.push('Elige al menos un contenido (paso 3).');
  if (!S.instrumentos.length) f.push('Pica en la tabla de evaluación al menos un instrumento (paso 7).');
  else if (!contListos()) f.push('Revisa los contenidos y PDA y pica «Listo» para armar su tabla (paso 3).');
  return f;
}
function muestra(titulo, res) {
  $('#res-titulo').textContent = titulo;
  const f = res.fallas || [], a = res.avisos || [], falta = titulo === 'Falta algo';
  /* sin fallas: el sello de «¡Muy bien!», como el de la maestra (11 oct) */
  let h = f.length ? '' : `<div class="r-bien"><div class="sello" aria-hidden="true"><b>¡Muy bien!</b><small>${res.docx ? 'generada' : 'revisada'}</small></div>
    <div><p class="r-bien-t">${res.docx ? 'Listo: sin fallas.' : 'Sin fallas.'}</p>
      <p>${a.length ? 'Revisa los avisos de abajo.' : res.docx ? 'Tu Word y tu PDF ya están en la carpeta.' : 'Ya puedes generar el Word y el PDF.'}</p></div></div>`;
  h += f.map(x => `<div class="r falla">${TACHE}<span>${falta ? '' : '<b>Falla:</b> '}${esc(x)}</span></div>`).join('');
  h += a.map(x => `<div class="r aviso">${ADMIRACION}<span><b>Aviso:</b> ${esc(x)}</span></div>`).join('');
  if (res.docx) {
    const carpeta = res.docx.replace(/[\\/][^\\/]+$/, '');
    h += `<div class="res-botones">
      ${res.pdf ? `<button data-abre="${esc(res.pdf)}">Abrir PDF</button>` : ''}
      <button class="sec" data-abre="${esc(res.docx)}">Abrir Word</button>
      <button class="sec" data-abre="${esc(carpeta)}">Abrir carpeta</button></div>`;
    if (f.length) h += '<div class="r falla">El archivo se generó, pero no lo entregues hasta quitar las fallas.</div>';
  }
  $('#res-cuerpo').innerHTML = h;
  $('#resultados').classList.add('ver');
}
/* nombre del archivo (ya no se escribe arriba, 10 oct): «Planeación 6° (12-16 oct) - Nombre del proyecto». Una planeación
   abierta o ya guardada conserva el suyo; una nueva no pisa a otra que se llame igual. */
function nombreAuto() {
  const f = fechasDe(), act = activos(), a = f[act.length ? act[0] : 0], b = f[act.length ? act[act.length - 1] : f.length - 1];
  const mes = d => MESES[d.getMonth()].slice(0, 3);
  const rango = a.getMonth() === b.getMonth() ? `${a.getDate()}-${b.getDate()} ${mes(b)}` : `${a.getDate()} ${mes(a)}-${b.getDate()} ${mes(b)}`;
  const tema = norm(S.general.nombre || S.general.tema || (S.central ? D.campos[S.central].nombre : '')).replace(/[«»"]/g, '').slice(0, 60).trim();
  let n = `Planeación ${S.datos.grado || ''}° (${rango})${tema ? ' - ' + tema : ''}`, k = 2;
  while (D.guardadas.includes(n + (k > 2 ? ` (${k - 1})` : ''))) k++;
  return n + (k > 2 ? ` (${k - 1})` : '');
}
async function guardar(silencio) {
  const f = faltantes();
  if (f.length && !silencio) { muestra('Falta algo', { fallas: f }); return false; }
  if (!S.nombre) S.nombre = nombreAuto();
  const r = await api('/api/guardar', { nombre: S.nombre, semana: aSemana(), panel: S });
  if (r.ok) { S.nombre = r.nombre; cambio(); sucio = false; titulo(); if (!silencio) toast('Guardado: ' + r.nombre); await listaGuardadas(); }
  return !!r.ok;
}
async function listaGuardadas() {
  const d = await api('/api/datos');
  D.guardadas = d.guardadas;
}
async function abrir(nombre) {
  const panel = await api('/api/panel', { nombre });
  if (panel && panel.sesiones) S = Object.assign(nuevoEstado(), panel);
  else {
    const sem = await api('/api/planeacion?nombre=' + encodeURIComponent(nombre));
    if (sem.error) { toast('No se pudo abrir'); return; }
    S = desdeSemana(sem, nombre);
  }
  S.nombre = nombre;
  normaliza();
  tab = S.central || 'ens';
  renderTodo(); cambio(); sucio = false; titulo(); toast('Abierta: ' + nombre);
}

/* ---------------------------------------------------------------- eventos */

document.addEventListener('click', async e => {
  if (e.target.id === 'd-archivo') {                 // clic en lo oscuro alrededor del recuadro: se cierra
    const r = e.target.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return cierraRecuadro();
  }
  const t = e.target.closest('.cambia-inicio, button, .tile, .cont, .tira, .zona, tr[data-ins], tr[data-abrir-plan], .con-sub');
  if (!t || t.closest('#d-pregunta')) return;
  const d = t.dataset;
  if (await clicArchivo(t, d)) return;                // menú Archivo (11 oct)
  if (t.classList.contains('cambia-inicio')) {      // el calendario del primer día
    const c = $('#inicio');
    try { c.showPicker(); } catch (err) { c.focus(); c.click(); }
    return;
  }
  if (t.classList.contains('tile')) return tocaCampo(d.c);
  if (d.ins !== undefined) { if (!e.target.closest('td.tec')) tocaInstrumento(d.ins); return; }      // tabla del libro 4
  if (t.classList.contains('tira')) { elegida = elegida === d.tira ? null : d.tira; renderReparto(); return; }
  if (d.unir !== undefined) return unir(Number(d.unir), true);
  if (d.separar !== undefined) return unir(Number(d.separar), false);
  if (d.semanas) return cambiaSemanas(Number(d.semanas));
  if (d.sinclase !== undefined) return marcaSinClase(Number(d.sinclase), true);
  if (d.hayclase !== undefined) return marcaSinClase(Number(d.hayclase), false);
  if (t.classList.contains('zona')) { if (elegida) mueveTira(elegida, Number(d.zona)); return; }
  if (d.plegar) return plegar($('#' + d.plegar));
  if (d.formato) { S.formato = d.formato; renderFormato(); cambio(); return; }     // paso 9
  if (d.quitalogo) { S.datos['logo_' + d.quitalogo] = ''; guardaDatos(); renderDatos(); cambio(); return; }   // paso 1
  if (t.id === 'b-nee') {                         // un alumno más, con el cursor en su nombre
    S.alumnosNee.push({ nombre: '', necesidades: '', ajustes: '' }); renderNee(); cambio();
    $(`input[data-nee="${S.alumnosNee.length - 1}"][data-f="nombre"]`).focus(); return;
  }
  if (d.quitanee !== undefined) {
    const x = S.alumnosNee[Number(d.quitanee)];
    if ((x.nombre + x.necesidades + x.ajustes).trim() && !confirm(`¿Quitar ${x.nombre.trim() ? 'a ' + x.nombre.trim() : 'este alumno'} y sus ajustes?`)) return;
    S.alumnosNee.splice(Number(d.quitanee), 1); renderNee(); cambio(); return;
  }
  if (t.id === 'b-listo-cont') {
    S.listoCont = huellaCont(); renderElegidos(); cambio();
    $('#elegidos').scrollIntoView({ behavior: 'smooth', block: 'nearest' }); return;
  }
  if (t.id === 'b-listo') {
    if (!puedeListo()) return;
    S.listo = true; renderReparto(); renderSemana(); renderEval(); cambio();
    if ($('#s-semana').classList.contains('contraido')) plegar($('#s-semana'));
    $('#s-semana').scrollIntoView({ behavior: 'smooth' }); return;
  }
  if (t.classList.contains('cont') && !e.target.closest('.pdas')) return alternaContenido(Number(d.idx));
  if (d.tab) { tab = d.tab; renderTabs(); renderLista(); return; }
  if (d.grado) {
    ponGrado(d.grado);
    S.datos.grado = gradoNum(d.grado); guardaDatos();
    renderCampo(); renderTabs(); renderElegidos(); renderLista(); cambio(); return;
  }
  if (d.quita !== undefined) {
    const ya = contListos();
    S.seleccion.splice(Number(d.quita), 1);
    if (ya) S.listoCont = S.seleccion.length ? huellaCont() : '';
    renderTabs(); renderElegidos(); renderLista(); cambio(); return;
  }
  if (d.eje) { const ej = S.general.ejes, k = ej.indexOf(d.eje); k >= 0 ? ej.splice(k, 1) : ej.push(d.eje); renderProyecto(); cambio(); return; }
  if (d.agregam !== undefined) {
    const s = S.sesiones[Number(d.agregam)];
    s.momentos.splice(s.momentos.length - 1, 0, { momento: 'Desarrollo', pda: '', consignas: '' });
    renderSemana(); renderEval(); cambio(); return;
  }
  if (d.quitam) {
    const [i, j] = d.quitam.split('|').map(Number);
    const m = S.sesiones[i].momentos[j];
    if (lineas(m.consignas).length && !confirm('Este momento tiene consignas. ¿Quitarlo?')) return;
    S.sesiones[i].momentos.splice(j, 1);
    renderSemana(); renderEval(); cambio(); return;
  }
  if (d.abre) { await api('/api/abrir', { ruta: d.abre }); return; }
  if (t.id === 'res-cerrar') { $('#resultados').classList.remove('ver'); return; }
  if (t.id === 'b-guardar') { await guardar(false); return; }
  if (t.id === 'b-revisar') return revisarDoc();
  if (t.id === 'b-generar') return generarDoc();
});

/* la ruta de arriba lleva a su paso; si estaba contraído, lo abre (11 oct) */
document.addEventListener('click', e => {
  const a = e.target.closest('.ruta a');
  if (!a) return;
  e.preventDefault();
  const sec = $(a.getAttribute('href'));
  if (!sec) return;
  if (sec.classList.contains('contraido')) plegar(sec);
  sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* arrastrar las tiras de la metodología a su día (paso 5) */
document.addEventListener('dragstart', e => {
  const t = e.target.closest?.('.tira');
  if (!t) return;
  arrastra = t.dataset.tira;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', arrastra);
  t.classList.add('arrastrando');
});
document.addEventListener('dragend', () => {
  arrastra = null;
  $$('.zona.encima, .tira.arrastrando').forEach(x => x.classList.remove('encima', 'arrastrando'));
});
document.addEventListener('dragover', e => {
  const z = arrastra && e.target.closest?.('.zona');
  if (!z) return;
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  $$('.zona.encima').forEach(x => x !== z && x.classList.remove('encima'));
  z.classList.add('encima');
});
document.addEventListener('drop', e => {
  const z = arrastra && e.target.closest?.('.zona');
  if (!z) return;
  e.preventDefault();
  mueveTira(arrastra, Number(z.dataset.zona));
  arrastra = null;
});

document.addEventListener('input', e => {
  const el = e.target, d = el.dataset;
  if (el.closest('dialog') && el.id !== 'ar-busca') return;    // textos de los recuadros (renombrar…)
  if (el.id === 'ar-busca') {                       // Archivo → Abrir: filtra la lista
    const q = norm(el.value).toLowerCase();
    $$('#d-archivo tr[data-busca]').forEach(tr => { tr.hidden = !!q && !tr.dataset.busca.includes(q); });
    return;
  }
  if (d.g) S.general[d.g] = el.value;
  else if (d.f && d.s !== undefined) { S.sesiones[d.s].momentos[d.m][d.f] = el.value; contadores(Number(d.s)); }
  else if (d.tarea !== undefined) { S.sesiones[d.tarea].tarea = el.value; contadores(Number(d.tarea)); }
  else if (d.proy !== undefined) { const x = S.seleccion.find(y => y.campo === tab && y.idx === Number(d.proy)); if (x) x.proyecto = el.value; renderElegidos(); }
  else if (d.nee !== undefined) {
    S.alumnosNee[d.nee][d.f] = el.value;
    const av = d.f === 'nombre' && $(`[data-avatar="${d.nee}"]`); if (av) av.innerHTML = avatar(el.value);
  }
  else if (d.dato !== undefined && el.tagName === 'INPUT') {
    S.datos[d.dato] = el.value;
    if (d.dato === 'cct' && sostenimientoDe(el.value)) {      // la clave decide si es federal o estatal
      S.datos.sostenimiento = sostenimientoDe(el.value);
      const sel = $('select[data-dato="sostenimiento"]'); if (sel) sel.value = S.datos.sostenimiento;
    }
    if (d.dato === 'cct' && $('#pista-sost')) $('#pista-sost').textContent = pistaSostenimiento();
    const menu = CARGOS[d.dato] && $(`select[data-cargo="${d.dato}"]`); if (menu) menu.value = cargoDe(d.dato);
    guardaDatos();
  }
  cambio();
});

document.addEventListener('change', e => {
  const el = e.target, d = el.dataset;
  if (el.id === 'inicio') {                         // el día en que empieza: si cae en fin de semana, el lunes siguiente
    if (!el.value) return;
    const f = deIso(el.value);
    while (f.getDay() === 0 || f.getDay() === 6) f.setDate(f.getDate() + 1);
    if (aIso(f) !== el.value) toast(`Ese día no hay clase: la planeación empieza el ${textoFecha(f).toLowerCase()}.`);
    S.inicio = aIso(f); renderBarra(); renderReparto(); renderSemana(); renderEval();
  }
  else if (d.dato !== undefined && el.tagName === 'SELECT') { cambiaDato(d.dato, el.value); return; }
  else if (d.logo !== undefined) { leeLogo(el.files[0], d.logo); el.value = ''; return; }        // paso 1: logos
  else if (d.cargo !== undefined) { S.datos['cargo_' + d.cargo] = el.value; guardaDatos(); }   // Directora, Directore…
  else if (d.pda !== undefined) {
    const x = S.seleccion.find(y => y.campo === tab && y.idx === Number(d.pda));
    if (x) { const k = x.pdas.indexOf(el.value); if (el.checked && k < 0) x.pdas.push(el.value); if (!el.checked && k >= 0) x.pdas.splice(k, 1);
      const orden = programa()[x.campo][x.idx][S.grado]; x.pdas.sort((a, b) => orden.indexOf(a) - orden.indexOf(b)); }
    renderElegidos();
  }
  cambio();
});

/* ---------------------------------------------------------------- secciones que se contraen */
/* «Contraer» / «Expandir» arriba a la derecha de cada sección; cuáles van contraídas se recuerda en este navegador */
function contraidas() { try { return JSON.parse(localStorage.getItem('planeador.contraidas') || '{}') || {}; } catch (e) { return {}; } }
function plegar(sec, guardar = true) {
  const c = sec.classList.toggle('contraido');
  sec.querySelector(':scope > .plegar').textContent = c ? 'Expandir' : 'Contraer';
  if (guardar) { const g = contraidas(); g[sec.id] = c; try { localStorage.setItem('planeador.contraidas', JSON.stringify(g)); } catch (e) { } }
}
function preparaPlegables() {
  const g = contraidas();
  $$('main > section.panel').forEach(sec => {
    const b = document.createElement('button');
    b.className = 'mini sec plegar'; b.dataset.plegar = sec.id; b.textContent = 'Contraer';
    sec.prepend(b);
    if (g[sec.id]) plegar(sec, false);
  });
}

/* ---------------------------------------------------------------- menú Archivo (11 oct) */
/* Un menú desplegable propio (él pidió algo como el de Blender, no como el de Office): Nueva ›, Abrir…, Abrir reciente ›,
   Recuperar ›, Guardar, Mis datos de la escuela… e Información…. Sin «Guardar como», carpetas ni «Exportar» (lo hace el
   botón «Generar Word y PDF»): los archivos los maneja el Planeador (él, 11 oct). En «Abrir…» se renombra y se elimina
   (a una papelera que se restaura en Recuperar). Lo que necesita espacio sale en un recuadro (#d-archivo). Cada ventana tiene su propio
   borrador (?ventana=<id>); si una se cierra sin guardar, su borrador queda en Recuperar. */
const PARAMS = new URLSearchParams(location.search), VENTANA = PARAMS.get('ventana');
const BORRADOR = VENTANA ? 'planeador.borrador.' + VENTANA : 'planeador.borrador';
let sucio = false, cerrando = false, menuDatos = null, menuMis = null;
const IC = (d, extra = '') => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>${extra}</svg>`;
const ICONOS = {
  nueva: IC('M6 3h8l4 4v14H6zM14 3v4h4M12 11v6M9 14h6'),
  abrir: IC('M3 7h6l2 2h10v10H3zM3 11h18'),
  reciente: IC('M12 7v5l3 2M21 12a9 9 0 1 1-3-6.7M21 4v4h-4'),
  recuperar: IC('M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4'),
  guardar: IC('M5 4h11l3 3v13H5zM8 4v5h7V4M8 20v-6h8v6'),
  escuela: IC('M3 10l9-6 9 6M5 9.5V20h14V9.5M10 20v-5h4v5'),
  info: IC('M12 11v6M12 7.5v.5', '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.7"/>'),
  doc: IC('M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 15h5'),
  si: IC('M5 12l4 4 10-10'),
};
const enOtraVentana = () => { try { return localStorage.getItem('planeador.nuevaEnVentana') !== '0'; } catch (e) { return true; } };
function titulo() {                  // el nombre de la planeación en la barra de la ventana; • = cambios sin guardar
  const n = S && S.nombre ? S.nombre : 'Planeación sin guardar';
  document.title = `${n}${sucio ? ' •' : ''} - Planeador`;
  if ($('#doc-nombre')) $('#doc-nombre').textContent = n + (sucio ? ' · sin guardar' : '');
}
/* fechas cortas: «Hace 3 h», «sáb a las 11:28 p. m.», «2 de octubre» */
function cuando(seg) {
  const f = new Date(seg * 1000), hoy = new Date(), dif = (hoy - f) / 1000;
  const hora = f.toLocaleTimeString('es-MX', { hour: 'numeric', minute: '2-digit' });
  if (dif < 60) return 'Hace un momento';
  if (dif < 3600) return `Hace ${Math.floor(dif / 60)} min`;
  if (f.toDateString() === hoy.toDateString()) return `Hace ${Math.floor(dif / 3600)} h`;
  if (dif < 6 * 86400) return `${f.toLocaleDateString('es-MX', { weekday: 'short' })} a las ${hora}`;
  return `${f.getDate()} de ${MESES[f.getMonth()]}${f.getFullYear() !== hoy.getFullYear() ? ' de ' + f.getFullYear() : ''}`;
}
const fechaLarga = seg => { const f = new Date(seg * 1000);
  return `${f.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}, ${f.toLocaleTimeString('es-MX', { hour: 'numeric', minute: '2-digit' })}`; };
const deRecientes = () => api('/api/recientes');

/* ---- el menú */
const mi = (acc, icono, texto, extra = '', attrs = '') =>
  `<button class="mi" ${acc ? `data-acc="${acc}"` : ''} ${attrs}><span class="mi-ic">${icono ? ICONOS[icono] : ''}</span><span class="mi-t">${texto}</span>${extra}</button>`;
const sub = (icono, texto, contenido, apagado) => apagado ? mi('', icono, texto, '<span class="mi-flecha">›</span>', 'disabled') :
  `<div class="mi con-sub" tabindex="0"><span class="mi-ic">${ICONOS[icono] || ''}</span><span class="mi-t">${texto}</span><span class="mi-flecha">›</span>
    <div class="menu submenu">${contenido}</div></div>`;
const sep = '<div class="mi-sep"></div>';
function htmlMenu() {
  const r = menuDatos ? menuDatos.recientes.filter(x => !x.nombre.startsWith('Respaldo del borrador') && x.nombre !== S.nombre) : [];
  const sueltos = borradoresSueltos(), mis = menuMis && menuMis.misdatos;
  const propia = menuDatos && menuDatos.recientes.find(x => x.nombre === S.nombre);
  const hayAlgo = S.central || S.seleccion.length || S.general.nombre;
  return `<div class="mi-cab"><b>${esc(S.nombre || 'Planeación sin guardar')}</b><span>${sucio ? 'con cambios sin guardar'
      : propia ? 'guardada ' + cuando(propia.fecha).toLowerCase() : ''}</span></div>
    ${sub('nueva', 'Nueva', mi('nueva-blanco', '', 'En blanco') + mi('nueva-datos', '', 'Con mis datos de la escuela',
      mis ? '' : '<small>guárdalos primero</small>', mis || !menuMis ? '' : 'disabled title="Guárdalos primero en «Mis datos de la escuela…»"') +
      (hayAlgo ? mi('nueva-copia', '', 'Copia de esta planeación', '<small>para la otra semana</small>') : '') + sep +
      mi('ventana', enOtraVentana() ? 'si' : '', 'Abrirla en otra ventana'))}
    ${mi('abrir', 'abrir', 'Abrir…', '<kbd>Ctrl O</kbd>')}
    ${sub('reciente', 'Abrir reciente', r.slice(0, 10).map(x => mi('', 'doc', esc(x.nombre), `<small>${cuando(x.fecha)}</small>`,
      `data-abrir-plan="${esc(x.nombre)}" title="${esc(x.nombre)}"`)).join('') + (r.length ? sep : '') + mi('abrir', '', 'Más…'), !menuDatos)}
    ${sub('recuperar', 'Recuperar', mi('versiones', '', 'Versiones anteriores…', '', S.nombre ? '' : 'disabled title="Primero guárdala"') +
      mi('borradores', '', 'Borradores sin guardar…', sueltos.length ? `<small>${sueltos.length}</small>` : '', sueltos.length ? '' : 'disabled') +
      mi('papelera', '', 'Papelera…', '<small>lo que eliminaste</small>'))}
    ${sep}
    ${mi('guardar', 'guardar', 'Guardar', '<kbd>Ctrl S</kbd>')}
    ${sep}
    ${mi('misdatos', 'escuela', 'Mis datos de la escuela…')}
    ${mi('info', 'info', 'Información…')}`;
}
async function abreMenu() {
  const m = $('#menu-archivo'), b = $('#b-archivo');
  m.style.left = b.offsetLeft + 'px';
  m.innerHTML = htmlMenu(); m.hidden = false; b.classList.add('abierto');
  try { [menuDatos, menuMis] = await Promise.all([deRecientes(), api('/api/misdatos')]); if (!m.hidden) m.innerHTML = htmlMenu(); } catch (e) { }
}
function cierraMenu() { $('#menu-archivo').hidden = true; $('#b-archivo').classList.remove('abierto'); }
document.addEventListener('mousedown', e => {          // un clic fuera del menú lo cierra
  if (!$('#menu-archivo').hidden && !e.target.closest('#menu-archivo, #b-archivo')) cierraMenu();
});

/* ---- recuadros (abrir, información, versiones, borradores, guardar como) */
function recuadro(tit, html) {
  const d = $('#d-archivo');
  d.innerHTML = `<div class="dlg-cab"><h3>${esc(tit)}</h3><button class="dlg-x" data-acc="cerrar-dlg" aria-label="Cerrar">×</button></div>
    <div class="dlg-cuerpo">${html}</div>`;
  if (!d.open) d.showModal();
}
const cierraRecuadro = () => { if ($('#d-archivo').open) $('#d-archivo').close(); };
function borradoresSueltos() {      // ventanas que se cerraron sin guardar (no las que siguen abiertas)
  const out = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k.startsWith('planeador.borrador.') || k === BORRADOR) continue;
      const id = k.slice('planeador.borrador.'.length), viva = Number(localStorage.getItem('planeador.viva.' + id) || 0);
      if (Date.now() - viva < 75000) continue;
      const b = JSON.parse(localStorage.getItem(k) || 'null');
      if (b && b.sesiones) out.push({ id, nombre: b.nombre || (b.general && b.general.nombre) || 'Planeación sin nombre', t: b.editado || 0 });
    }
  } catch (e) { }
  return out.sort((a, b) => b.t - a.t);
}
function tablaPlaneaciones(lista) {
  if (!lista.length) return '<p class="ar-vacio">Todavía no hay planeaciones guardadas.</p>';
  return `<table class="ar-tabla">${lista.map(x =>
    `<tr class="ar-plan" data-abrir-plan="${esc(x.nombre)}" data-busca="${esc(norm(x.nombre).toLowerCase())}"><td class="ar-ic">${ICONOS.doc}</td>
      <td><b>${esc(x.nombre)}</b><small>${x.nombre === S.nombre ? 'abierta en esta ventana · ' : ''}${cuando(x.fecha)}${x.archivos.some(a => a.tipo === 'pdf') ? ' · con Word y PDF' : ''}</small></td>
      <td><button class="mini sec" data-abrir-otra="${esc(x.nombre)}" title="Abrir en otra ventana">Otra ventana</button>
        <button class="mini sec" data-renombrar="${esc(x.nombre)}">Renombrar</button>
        <button class="mini sec ar-quita" data-eliminar="${esc(x.nombre)}" title="Se va a la papelera, con su Word y su PDF">Eliminar</button></td></tr>`).join('')}</table>`;
}
function archivosHtml(r) {
  if (!r || !r.archivos.length) return '<p class="ar-vacio">Todavía no tiene Word ni PDF: se hacen con «Generar Word y PDF».</p>';
  return `<table class="ar-tabla">${r.archivos.map(a => `<tr><td><span class="ar-ext ${a.tipo}">${a.tipo === 'pdf' ? 'PDF' : 'W'}</span></td>
    <td><b>${esc(a.formato)}</b><small>${a.tipo === 'pdf' ? 'PDF' : 'Word'} · ${cuando(a.fecha)}</small></td>
    <td><button class="mini" data-abre="${esc(a.ruta)}">Abrir</button></td></tr>`).join('')}</table>`;
}
async function dlgAbrir() {
  const r = await deRecientes();
  recuadro('Abrir', `<div class="ar-fila"><input id="ar-busca" placeholder="Buscar por nombre…" autocomplete="off"></div>
    <div class="ar-lista">${tablaPlaneaciones(r.recientes)}</div>`);
  $('#ar-busca').focus();
}
async function dlgInfo() {
  const rec = await deRecientes(), r = rec.recientes.find(x => x.nombre === S.nombre), m = metodo(), k = formatoActual();
  const filas = [['Guardada', r ? `${cuando(r.fecha)} <small>· ${fechaLarga(r.fecha)}</small>` : 'Todavía no se guarda'],
    ['Cambios sin guardar', sucio ? 'Sí' : 'No'], ['Campo formativo central', S.central ? esc(D.campos[S.central].nombre) : '—'],
    ['Metodología', m ? esc(m.nombre) : '—'], ['Periodo', esc(periodoPlaneacion() || 'Se llena al picar «Listo» (paso 5)')],
    ['Formato', k === 'cedros' ? 'Planeación Cedros' : esc(metFormato(k).nombre)], ['Escuela', esc(S.datos.escuela || '—')],
    ['Docente en formación', esc(S.datos.docente || '—')]];
  recuadro(S.nombre || 'Planeación sin guardar', `<table class="ar-props">${filas.map(([a, b]) => `<tr><th>${a}</th><td>${b}</td></tr>`).join('')}</table>
    <h4 class="ar-h4">Word y PDF</h4>${archivosHtml(r)}
    <div class="ar-botones"><button data-acc="revisar">Revisar la planeación</button></div>`);
}
async function dlgVersiones() {
  const v = (await api('/api/historial?nombre=' + encodeURIComponent(S.nombre))).versiones;
  recuadro('Versiones anteriores', `<p class="ar-nota">Cada vez que guardas «${esc(S.nombre)}» con cambios, la versión de antes queda aquí
    (las últimas 30). Al abrir una, la ves en esta ventana; si la guardas, reemplaza a la actual.</p>
    ${v.length ? `<div class="ar-lista"><table class="ar-tabla">${v.map(x => `<tr><td class="ar-ic">${ICONOS.reciente}</td><td><b>${esc(fechaLarga(x.fecha))}</b><small>${cuando(x.fecha)}</small></td>
      <td><button class="mini" data-version="${esc(x.version)}">Abrir esta versión</button></td></tr>`).join('')}</table></div>`
      : '<p class="ar-vacio">Todavía no hay: aparecen cuando la vuelves a guardar con cambios.</p>'}`);
}
function dlgBorradores() {
  const b = borradoresSueltos();
  recuadro('Borradores sin guardar', `<p class="ar-nota">De ventanas que se cerraron sin guardar.</p>
    ${b.length ? `<table class="ar-tabla">${b.map(x => `<tr><td class="ar-ic">${ICONOS.doc}</td><td><b>${esc(x.nombre)}</b><small>${x.t ? cuando(x.t / 1000) : ''}</small></td>
      <td><button class="mini" data-recupera="${x.id}">Recuperar</button> <button class="mini sec" data-descarta="${x.id}">Descartar</button></td></tr>`).join('')}</table>`
      : '<p class="ar-vacio">No hay borradores sin guardar.</p>'}`);
}
async function dlgMisDatos() {
  menuMis = await api('/api/misdatos');
  const m = menuMis.misdatos;
  let html = `<p class="ar-nota">Son los del paso 1 (escuela, grupo, escuela normal, logos y firmas) y los alumnos con NEE. Los guardas una vez
    y «Nueva › Con mis datos de la escuela» los usa siempre.</p>`;
  if (m) {
    const d = m.datos || {}, nee = m.alumnosNee || [];
    const firmas = ['supervisor', 'director', 'titular', 'catedratico'].map(k => (d[k] || '').trim()).filter(Boolean);
    const filas = [['Escuela', d.escuela], ['C.C.T.', d.cct], ['Grado y grupo', d.grado ? `${d.grado}.º ${d.grupo || ''}` : d.grupo],
      ['Docente en formación', d.docente], ['Escuela normal', d.normal], ['Firmas', firmas.join(' · ')]];
    html += `<table class="ar-props">${filas.map(([a, b]) => `<tr><th>${a}</th><td>${esc(b || '—')}</td></tr>`).join('')}
      <tr><th>Logos</th><td>${[d.logo_izq, d.logo_der].filter(Boolean).map(s => `<img class="ar-logo" src="${s}" alt="">`).join('') || '—'}</td></tr>
      <tr><th>Alumnos con NEE</th><td>${nee.length ? esc(nee.map(a => a.nombre).filter(Boolean).join(', ') || nee.length + '') : '—'}</td></tr>
      <tr><th>Guardados</th><td>${cuando(menuMis.fecha)}</td></tr></table>
      <div class="ar-botones"><button class="prim" data-acc="misdatos-poner">Ponerlos en esta planeación</button>
        <button class="sec" data-acc="misdatos-guardar">Cambiarlos por los de esta planeación</button>
        <button class="sec ar-quita" data-acc="misdatos-borrar">Borrarlos</button></div>`;
  } else html += `<p class="ar-vacio">Todavía no los guardas.</p>
      <div class="ar-botones"><button class="prim" data-acc="misdatos-guardar">Guardar los de esta planeación como mis datos</button></div>`;
  recuadro('Mis datos de la escuela', html);
}
async function dlgPapelera() {
  const p = (await api('/api/papelera')).papelera;
  recuadro('Papelera', `<p class="ar-nota">Lo que eliminaste desde «Abrir…», con su Word, su PDF y sus versiones. Al restaurarla vuelve a «Abrir…».</p>
    ${p.length ? `<div class="ar-lista"><table class="ar-tabla">${p.map(x => `<tr><td class="ar-ic">${ICONOS.doc}</td><td><b>${esc(x.nombre)}</b>
      <small>eliminada ${cuando(x.fecha).toLowerCase()}</small></td><td><button class="mini" data-restaurar="${esc(x.id)}">Restaurar</button></td></tr>`).join('')}</table></div>`
      : '<p class="ar-vacio">La papelera está vacía.</p>'}`);
}
/* pide un texto (renombrar): resuelve con el texto, o '' si se cancela */
function pideTexto(tit, texto, valor) {
  const d = $('#d-pregunta');
  d.innerHTML = `<h3>${esc(tit)}</h3><p>${esc(texto)}</p><input class="dlg-entrada" value="${esc(valor)}" autocomplete="off">
    <div class="dlg-botones"><button class="prim" data-resp="ok">Aceptar</button><button class="sec" data-resp="">Cancelar</button></div>`;
  const i = d.querySelector('input');
  return new Promise(res => {
    const fin = v => { d.close(); res(v); };
    d.onclick = e => { const b = e.target.closest('[data-resp]'); if (b) fin(b.dataset.resp ? i.value.trim() : ''); };
    i.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); fin(i.value.trim()); } };
    d.oncancel = () => res('');
    d.showModal(); i.focus(); i.select();
  });
}
const borradorAhora = () => { try { localStorage.setItem(BORRADOR, JSON.stringify(S)); } catch (e) { } };
async function renombrarPlan(nombre) {
  const nuevo = await pideTexto('Renombrar', 'Nuevo nombre de la planeación (sus Word, PDF y versiones cambian con ella):', nombre);
  if (!nuevo || nuevo === nombre) return;
  const r = await api('/api/renombrar', { nombre, nuevo });
  if (r.error) return toast(r.error);
  if (S.nombre === nombre) { S.nombre = r.nombre; titulo(); borradorAhora(); }
  await listaGuardadas(); await dlgAbrir(); toast('Ahora se llama «' + r.nombre + '».');
}
async function eliminarPlan(nombre) {
  const ok = await pregunta('Eliminar', `«${nombre}» se va a la papelera con su Word, su PDF y sus versiones. Se puede restaurar en Recuperar › Papelera.`,
    [['si', 'Eliminar', 'prim'], ['', 'Cancelar']]);
  if (!ok) return;
  const r = await api('/api/eliminar', { nombre });
  if (r.error) return toast(r.error);
  if (S.nombre === nombre) { S.nombre = ''; sucio = true; titulo(); borradorAhora(); }   // esta ventana la conserva, sin guardar
  await listaGuardadas(); await dlgAbrir(); toast('Se fue a la papelera.');
}
/* ---- acciones */
function ventanaNueva(ruta) { return api('/api/ventana', { ruta }); }
async function nueva(tipo) {         // en blanco, con mis datos de la escuela o copia; en otra ventana o en esta, según la casilla
  let mis = null;
  if (tipo === 'datos') {
    mis = (await api('/api/misdatos')).misdatos;
    if (!mis) { toast('Primero guarda tus datos.'); return dlgMisDatos(); }
  }
  if (enOtraVentana()) {
    const id = Date.now().toString(36);
    const traspaso = tipo === 'datos' ? { datos: mis.datos, alumnosNee: mis.alumnosNee } : tipo === 'copia' ? { ...S, nombre: '' } : {};
    try { localStorage.setItem('planeador.traspaso.' + id, JSON.stringify(traspaso)); } catch (e) { }
    await ventanaNueva(`/?ventana=${id}&nueva=${tipo}`);
    return toast('Se abrió en otra ventana.');
  }
  if (sucio && tipo !== 'copia') {
    const r = await pregunta('Planeación nueva', `«${S.nombre || 'Esta planeación'}» tiene cambios sin guardar.`,
      [['guardar', 'Guardar y seguir', 'prim'], ['no', 'No guardar'], ['', 'Cancelar']]);
    if (!r || (r === 'guardar' && !(await guardar(false)))) return;
  }
  if (tipo === 'copia') S = Object.assign(nuevoEstado(), JSON.parse(JSON.stringify(S)), { nombre: '' });
  else S = estadoNuevo(tipo === 'datos' ? mis.datos : null, tipo === 'datos' ? mis.alumnosNee : []);
  normaliza(); guardaDatos(); tab = S.central || 'ens'; renderTodo(); cambio(); window.scrollTo(0, 0);
  toast(tipo === 'copia' ? 'Copia sin guardar: al guardarla toma su propio nombre.' : tipo === 'datos' ? 'Planeación nueva, con tus datos de la escuela.' : 'Planeación nueva, en blanco.');
}
/* aviso con botones: resuelve con el valor del botón, o '' si se cierra con Esc */
function pregunta(tit, texto, botones) {
  const d = $('#d-pregunta');
  d.innerHTML = `<h3>${esc(tit)}</h3><p>${esc(texto)}</p><div class="dlg-botones">${botones.map(([v, t, c]) =>
    `<button class="${c || 'sec'}" data-resp="${v}">${esc(t)}</button>`).join('')}</div>`;
  return new Promise(res => {
    d.onclick = e => { const b = e.target.closest('[data-resp]'); if (b) { d.close(); res(b.dataset.resp); } };
    d.oncancel = () => res('');
    d.showModal();
  });
}
async function abrirAqui(nombre) {
  if (sucio && nombre !== S.nombre) {
    const r = await pregunta('Cambios sin guardar', `«${S.nombre || 'La planeación de esta ventana'}» tiene cambios sin guardar.`,
      [['guardar', 'Guardar y abrir', 'prim'], ['otra', 'Abrir en otra ventana'], ['perder', 'Abrir sin guardar'], ['', 'Cancelar']]);
    if (!r) return;
    if (r === 'otra') return abrirOtra(nombre);
    if (r === 'guardar' && !(await guardar(false))) return;
  }
  cierraRecuadro(); await abrir(nombre);
}
async function abrirOtra(nombre) { await ventanaNueva(`/?ventana=${Date.now().toString(36)}&abrir=${encodeURIComponent(nombre)}`); cierraRecuadro(); toast('Se abrió en otra ventana.'); }
async function abrirVersion(version) {
  if (sucio) {
    const r = await pregunta('Cambios sin guardar', 'Lo que no has guardado de esta planeación se pierde al abrir la versión anterior.',
      [['si', 'Abrir la versión', 'prim'], ['', 'Cancelar']]);
    if (!r) return;
  }
  const nombre = S.nombre, v = await api('/api/version', { nombre, version });
  if (v.error) return toast('No encontré esa versión.');
  S = v.panel && v.panel.sesiones ? Object.assign(nuevoEstado(), v.panel) : desdeSemana(v.semana, nombre);
  S.nombre = nombre; normaliza(); tab = S.central || 'ens'; renderTodo(); cambio();
  cierraRecuadro(); toast('Es la versión anterior. Si la guardas, reemplaza a la actual.');
}
async function generarDoc() {
  const f = faltantes(), k = formatoActual();
  if (k !== 'cedros' && S.central && D.campos[S.central].metodologia !== k)      // paso 9: formato de otra metodología
    f.push(`El formato «${metFormato(k).nombre}» es para planeaciones de ${D.campos[campoDeMet(k)].nombre}: en el paso 9 elige el de tu metodología o la Planeación Cedros.`);
  if (f.length) return muestra('Falta algo', { fallas: f });
  document.body.classList.add('cargando'); toast('Armando el Word y el PDF… (Word tarda unos segundos)');
  try {
    await guardar(true);
    muestra('Planeación generada · ' + (k === 'cedros' ? 'Planeación Cedros' : metFormato(k).nombre),
      await api('/api/generar', { nombre: S.nombre, semana: aSemana(), formato: k }));
  }
  finally { document.body.classList.remove('cargando'); }
}
async function revisarDoc() {
  const f = faltantes(); if (f.length) return muestra('Falta algo', { fallas: f });
  document.body.classList.add('cargando');
  try { muestra('Revisión', await api('/api/revisar', { semana: aSemana() })); } finally { document.body.classList.remove('cargando'); }
}
async function clicArchivo(t, d) {    // los clics del menú y de sus recuadros; true si era de aquí
  if (t.id === 'b-archivo') { $('#menu-archivo').hidden ? abreMenu() : cierraMenu(); return true; }
  if (t.classList.contains('con-sub')) { t.classList.toggle('abierto'); return true; }   // submenú con clic o teclado
  const acc = d.acc;
  if (acc === 'ventana') {            // casilla: no cierra el menú
    try { localStorage.setItem('planeador.nuevaEnVentana', enOtraVentana() ? '0' : '1'); } catch (e) { }
    $('#menu-archivo').innerHTML = htmlMenu(); $('#menu-archivo .con-sub')?.classList.add('abierto'); return true;
  }
  const delMenu = !!t.closest('#menu-archivo');
  if (delMenu) cierraMenu();
  if (acc === 'cerrar-dlg') { cierraRecuadro(); return true; }
  if (acc && acc.startsWith('nueva-')) { await nueva(acc.slice(6)); return true; }
  if (acc === 'abrir') { await dlgAbrir(); return true; }
  if (acc === 'versiones') { await dlgVersiones(); return true; }
  if (acc === 'borradores') { dlgBorradores(); return true; }
  if (acc === 'papelera') { await dlgPapelera(); return true; }
  if (acc === 'misdatos') { await dlgMisDatos(); return true; }
  if (acc === 'misdatos-guardar') {
    if (menuMis && menuMis.misdatos && !(await pregunta('Mis datos de la escuela', '¿Cambiar tus datos guardados por los de esta planeación?',
      [['si', 'Cambiarlos', 'prim'], ['', 'Cancelar']]))) return true;
    await api('/api/misdatos', { misdatos: { datos: S.datos, alumnosNee: S.alumnosNee } });
    await dlgMisDatos(); toast('Listo: esos son tus datos de la escuela.'); return true;
  }
  if (acc === 'misdatos-poner') {                    // con contenidos elegidos se conservan la fase y el grado de esta
    const m = menuMis.misdatos, fija = S.seleccion.length ? { fase: S.datos.fase, grado: S.datos.grado } : {};
    S.datos = { ...JSON.parse(JSON.stringify(m.datos || {})), ...fija };
    S.alumnosNee = JSON.parse(JSON.stringify(m.alumnosNee || []));
    S.grado = gradoPda(S.datos.grado); normaliza(); renderTodo(); cambio();
    cierraRecuadro(); toast('Tus datos de la escuela ya están en esta planeación.'); return true;
  }
  if (acc === 'misdatos-borrar') {
    if (await pregunta('Mis datos de la escuela', '¿Borrar tus datos guardados? Las planeaciones no cambian.', [['si', 'Borrarlos', 'prim'], ['', 'Cancelar']])) {
      await api('/api/misdatos', { misdatos: null }); await dlgMisDatos();
    }
    return true;
  }
  if (d.renombrar) { await renombrarPlan(d.renombrar); return true; }
  if (d.eliminar) { await eliminarPlan(d.eliminar); return true; }
  if (d.restaurar) {
    const r = await api('/api/restaurar', { id: d.restaurar });
    if (r.error) toast(r.error); else { await listaGuardadas(); await dlgPapelera(); toast('Restaurada: «' + r.nombre + '». Está en «Abrir…».'); }
    return true;
  }
  if (acc === 'guardar') { await guardar(false); return true; }
  if (acc === 'info') { await dlgInfo(); return true; }
  if (acc === 'revisar') { cierraRecuadro(); await revisarDoc(); return true; }
  if (d.abrirOtra) { await abrirOtra(d.abrirOtra); return true; }
  if (d.abrirPlan) { await abrirAqui(d.abrirPlan); return true; }
  if (d.version) { await abrirVersion(d.version); return true; }
  if (d.recupera) { await ventanaNueva(`/?ventana=${d.recupera}`); cierraRecuadro(); toast('Se abrió en otra ventana.'); return true; }
  if (d.descarta) {
    if (await pregunta('Descartar borrador', 'El borrador se borra y no se puede recuperar.', [['si', 'Descartar', 'prim'], ['', 'Cancelar']])) {
      try { localStorage.removeItem('planeador.borrador.' + d.descarta); } catch (e) { }
      dlgBorradores();
    }
    return true;
  }
  return delMenu;
}
document.addEventListener('keydown', e => {
  const k = (e.key || '').toLowerCase();
  if (e.ctrlKey && !e.altKey && k === 's') { e.preventDefault(); guardar(false); return; }                                   // Ctrl+S
  if (e.ctrlKey && !e.altKey && !e.shiftKey && k === 'o') { e.preventDefault(); dlgAbrir(); return; }                         // Ctrl+O
  if (e.altKey && !e.ctrlKey && k === 'a') { e.preventDefault(); $('#menu-archivo').hidden ? abreMenu() : cierraMenu(); return; }
  if (e.key === 'Escape' && !$('#menu-archivo').hidden) cierraMenu();
});
window.addEventListener('beforeunload', e => { if (sucio && !cerrando) { e.preventDefault(); e.returnValue = ''; } });
window.addEventListener('pagehide', () => {      // una ventana extra que se cierra ya guardada no deja borrador
  if (VENTANA && !sucio) try { localStorage.removeItem(BORRADOR); localStorage.removeItem('planeador.viva.' + VENTANA); } catch (e) { }
});

/* ---------------------------------------------------------------- arranque */
/* Como aplicación (11 oct), el servidor se apaga solo si ninguna ventana da señales: esta avisa cada 30 s que sigue
   abierta. Si el servidor ya no contesta, lo dice una vez. */
let sinServidor = false;
const viva = () => { if (VENTANA) try { localStorage.setItem('planeador.viva.' + VENTANA, String(Date.now())); } catch (e) { } };
viva();
setInterval(() => viva() || fetch('/api/latido', { cache: 'no-store' }).then(() => { sinServidor = false; }).catch(() => {
  if (!sinServidor) toast('El Planeador se cerró. Guarda lo que tengas abierto y vuelve a abrirlo con su ícono.');
  sinServidor = true;
}), 30000);
(async function () {
  D = await api('/api/datos');
  if (!D.motor) toast('No encuentro la skill planeacion-didactica: el panel abre, pero no podrá generar.');
  let borrador = null;
  try { borrador = JSON.parse(localStorage.getItem(BORRADOR) || 'null'); } catch (e) { }
  S = borrador && borrador.sesiones ? Object.assign(nuevoEstado(), borrador) : nuevoEstado();
  const nueva = PARAMS.get('nueva');
  if (VENTANA && nueva && !(borrador && borrador.sesiones)) {      // Archivo → Nuevo: otra ventana
    let tr = {};
    try { tr = JSON.parse(localStorage.getItem('planeador.traspaso.' + VENTANA) || '{}'); localStorage.removeItem('planeador.traspaso.' + VENTANA); } catch (e) { }
    S = nueva === 'copia' && tr.sesiones ? Object.assign(nuevoEstado(), tr, { nombre: '' })
      : estadoNuevo(nueva === 'datos' && tr.datos ? tr.datos : null, tr.alumnosNee);
  }
  normaliza();
  tab = S.central || 'ens';
  preparaPlegables();
  renderTodo();
  // ?abrir=<nombre> abre esa planeación guardada ya llena (10 oct). Antes, el borrador que hubiera en este navegador
  // se guarda como «Respaldo del borrador …» (sale en «Abrir…»), para no perderlo.
  const pedida = new URLSearchParams(location.search).get('abrir');
  history.replaceState(null, '', location.pathname + (VENTANA ? '?ventana=' + VENTANA : ''));
  if (pedida && D.guardadas.includes(pedida)) {
    if (S.nombre !== pedida && (S.central || S.seleccion.length || S.general.nombre)) {     // la misma: sin respaldo
      const f = new Date(), dos = n => String(n).padStart(2, '0');
      let semana = {};
      try { semana = aSemana(); } catch (e) { }
      await api('/api/guardar', { nombre: `Respaldo del borrador ${dos(f.getDate())}-${dos(f.getMonth() + 1)} ${dos(f.getHours())}h${dos(f.getMinutes())}`, semana, panel: S });
      await listaGuardadas();
    }
    await abrir(pedida);
  }
  if (VENTANA && nueva) cambio();                     // una ventana nueva guarda su borrador desde el principio
  sucio = !!(VENTANA && nueva); titulo();
})();
