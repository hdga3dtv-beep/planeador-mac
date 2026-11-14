'use strict';
/* Lectura de la realidad: sección opcional del Planeador (va después de Datos generales).
   Un test breve de lectura crítica de la realidad: de lo que el docente observa salen fichas de indicios y, al final,
   los ejes articuladores sugeridos. No cambia la planeación: en «Datos del proyecto» los ejes se siguen eligiendo a mano.
   Lo contestado se guarda en este equipo (localStorage, 'planeador.lectura'). Los textos van en lectura-datos.js. */
(() => {
const DATOS = window.LECTURA_DATOS;
const $ = s => document.querySelector(s);
const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const EJES = [
  { id: 'INC', n: 'Inclusión', c: '#1aa3bb' }, { id: 'PC', n: 'Pensamiento crítico', c: '#ec7a36' },
  { id: 'IC', n: 'Interculturalidad crítica', c: '#a052c8' }, { id: 'IG', n: 'Igualdad de género', c: '#d9a300' },
  { id: 'VS', n: 'Vida saludable', c: '#15a150' },
  { id: 'LE', n: 'Apropiación de las culturas a través de la lectura y la escritura', corto: 'Lectura y escritura', c: '#e0699b' },
  { id: 'AE', n: 'Artes y experiencias estéticas', c: '#3a9fc4' },
];
const EJE = Object.fromEntries(EJES.map((e, k) => [e.id, { ...e, k }]));

/* ------------------------------------------------------------ las preguntas */
const CTX = [
  { id: 'c1', t: '¿Cómo es la comunidad de tu escuela?',
    ops: [['rural', 'Rural'], ['semi', 'Semiurbana o cabecera municipal'], ['urbana', 'Urbana'], ['periferia', 'Periferia urbana (colonia popular)']] },
  { id: 'c2', t: '¿De qué vive la mayoría de las familias?', ayuda: 'Pica hasta dos y luego «Continuar».', multi: 2, solas: ['ns'],
    ops: [['campo', 'Campo de temporal (milpa)'], ['jornaleo', 'Jornaleo agrícola'], ['costa', 'Pesca o turismo'], ['comercio', 'Comercio y servicios'],
      ['informal', 'Comercio informal o trabajo por día'], ['oficios', 'Fábrica, construcción u oficios'], ['remesas', 'Remesas de quienes trabajan lejos'], ['ns', 'No lo sé']] },
  { id: 'c3', t: '¿Quiénes viven aquí?', ayuda: 'Pica todas las que apliquen y luego «Continuar».', multi: 9, solas: ['ninguna'],
    ops: [['lengua', 'Familias que hablan una lengua originaria'], ['afro', 'Familias afromexicanas'], ['retorno', 'Niñas y niños que regresaron de otro país'],
      ['jornaleras', 'Familias jornaleras que llegan por temporada'], ['desplazadas', 'Familias desplazadas o en tránsito'], ['ninguna', 'Ninguna en particular']] },
];
const CTX_TXT = {
  c1: { rural: 'una comunidad rural', semi: 'una comunidad semiurbana', urbana: 'una zona urbana', periferia: 'una colonia de la periferia urbana' },
  c2: { campo: 'el campo de temporal', jornaleo: 'el jornaleo agrícola', costa: 'la pesca o el turismo', comercio: 'el comercio y los servicios',
    informal: 'el comercio informal o el trabajo por día', oficios: 'la fábrica, la construcción o los oficios', remesas: 'las remesas' },
  c3: { lengua: 'familias que hablan una lengua originaria', afro: 'familias afromexicanas', retorno: 'niñas y niños que regresaron de otro país',
    jornaleras: 'familias jornaleras que llegan por temporada', desplazadas: 'familias desplazadas o en tránsito' },
};
const escala = (n, ag, et = ['No lo observo', 'Algunos', 'Muchos']) =>
  [['no', et[0], null], ['algunos', et[1], { n, i: 1 }], ['muchos', et[2], { n, i: 2 }], ['ns', 'No lo sé', { ag }]];
const SENS = [
  { id: 'T1', tema: 'Lengua', t: 'La lengua de las familias (una lengua originaria, o la de quienes llegan o regresan, como el inglés)…',
    ops: [['viva', 'Está viva y se usa en el aula', { pot: 'La lengua de la comunidad está viva y se usa en el aula.' }],
      ['callada', 'Está viva, pero se calla en la escuela', { n: 'N05', i: 1.5 }], ['pierde', 'Se está perdiendo entre niñas y niños', { n: 'N05', i: 2 }],
      ['no', 'No hay otra lengua', null], ['ns', 'No lo sé', { ag: ['Qué lenguas se hablan en las casas', 'pregúntalo a las familias en la próxima reunión'] }]] },
  { id: 'T2', tema: 'Saberes y oficios', t: 'Los saberes y oficios de las familias (cultivo, cocina, medicina, oficios, comercio)…',
    ops: [['viva', 'Se reconocen y entran al aula', { pot: 'Los saberes y oficios de las familias se reconocen y entran al aula.' }],
      ['ignora', 'Se ignoran en la escuela', { n: 'N05', i: 1.5 }], ['atraso', 'Se descalifican como «atraso»', { n: 'N05', i: 2 }],
      ['pierde', 'Ya casi no se practican', { n: 'N05', i: 1.5 }], ['ns', 'No lo sé', { ag: ['Qué saben hacer las familias', 'visita o conversa con ellas'] }]] },
  { id: 'T3', tema: 'Fiesta, arte y juego', t: 'Las fiestas, la música, la danza, la artesanía y los juegos de la comunidad…',
    ops: [['viva', 'Están vivos y la escuela los reconoce', { pot: 'Las fiestas, la música y los juegos de la comunidad están vivos y la escuela los reconoce.' }],
      ['fuera', 'Están vivos solo fuera de la escuela', { n: 'N12', i: 1.5 }], ['festival', 'En la escuela se reducen a festival', { n: 'N12', i: 1.5 }],
      ['escasos', 'Son escasos o no hay dónde', { n: 'N12', i: 2 }], ['ns', 'No lo sé', { ag: ['Qué fiestas, música y juegos están vivos', 'haz un recorrido con niñas y niños'] }]] },
  { id: 'T4', tema: 'Organización', t: 'La organización de la comunidad (asamblea, tequio, comités, vecinos)…',
    ops: [['viva', 'Existe y trabaja con la escuela', { pot: 'La comunidad está organizada y trabaja con la escuela.' }],
      ['sin', 'Existe, pero sin vínculo con la escuela', { n: 'N13', i: 1.5 }], ['dividida', 'Está dividida o desconfía de la escuela', { n: 'N13', i: 2 }],
      ['poca', 'Casi no hay organización', { n: 'N13', i: 1.5 }], ['ns', 'No lo sé', { ag: ['Cómo se organiza la comunidad', 'pregunta en una asamblea o al comité de familias'] }]] },
  { id: 'T5', tema: 'Sustento y trabajo', t: '¿Cuántas niñas y niños llegan sin útiles o calzado, no pueden pagar cooperaciones, o trabajan o faltan por trabajar?',
    ops: escala('N01', ['Carencias y trabajo de niñas y niños', 'conversa en confianza con las familias']) },
  { id: 'T6', tema: 'Cuerpo y alimento', t: '¿Cuántas niñas y niños llegan sin comer, comen sobre todo ultraprocesados, no tienen agua para beber o tienen problemas de vista, dientes o peso que se notan?',
    ops: escala('N02', ['Qué comen y beben, y cómo está su salud', 'observa el recreo y el lonche durante una semana']) },
  { id: 'T7', tema: 'Cuidados y género', t: '¿Cuántas niñas y niños pasan muchas horas sin adultos, cargan con el cuidado de hermanos o de la casa, o viven un reparto rígido de lo que es «de niñas» y «de niños»?',
    ops: escala('N04', ['Quién cuida y cómo se reparten los cuidados', 'pregúntalo en una asamblea de aula']) },
  { id: 'T8', tema: 'Agua y territorio', t: '¿Qué tanto afectan la vida escolar la falta de agua, la contaminación, el calor o la sequía, un desastre, los cambios del territorio o los trayectos peligrosos?',
    ops: escala('N03', ['Agua, ambiente y trayectos', 'haz un recorrido por la comunidad'], ['Poco o nada', 'Algo', 'Mucho']) },
  { id: 'T9', tema: 'Ánimo y duelo', t: '¿Cuántas niñas y niños muestran tristeza, miedo, enojo o duelo que afectan su vida en la escuela?',
    ops: escala('N08', ['Cómo están de ánimo', 'observa y conversa a partir de dibujos']) },
  { id: 'T10', tema: 'Violencia', t: '¿Qué tanto aparecen en la vida escolar señales colectivas de violencia: golpes para educar, violencia en la colonia, violencia hacia mujeres y niñas?',
    ayuda: 'No se registran casos, nombres ni lugares.',
    ops: [['no', 'No lo observo', null], ['algunos', 'Algunas', { n: 'N07', i: 1 }], ['muchos', 'Muchas', { n: 'N07', i: 2 }], ['noreg', 'Prefiero no registrar', null],
      ['ns', 'No lo sé', null], ['x', 'Conozco un indicio sobre una niña o un niño en particular', { x: true }]] },
  { id: 'T11', tema: 'Asistencia', t: '¿Cómo son las faltas en tu escuela?',
    ops: [['no', 'Casi no faltan', null], ['dispersas', 'Dispersas, por causas distintas', { n: 'N06', i: 1 }], ['temporada', 'De temporada', { dyn: 'temporada' }],
      ['ns', 'No lo sé', { ag: ['Por qué faltan', 'revisa el registro de asistencia con control escolar'] }]] },
  { id: 'T12', tema: 'Trato y barreras', t: '¿Cuántas niñas y niños viven burlas, exclusión o barreras para participar (por su cuerpo, piel, lengua, discapacidad, género o pobreza)?',
    ops: escala('N11', ['Burlas, exclusión y barreras', 'haz con niñas y niños un mapa del recreo']) },
  { id: 'T13', tema: 'Palabra y número', t: 'En tu grupo, ¿cuántos todavía no leen, escriben o calculan como se espera en su fase?',
    ops: escala('N09', ['Cómo leen, escriben y calculan', 'haz una valoración en el aula'], ['Pocos o ninguno', 'Algunos', 'Muchos']) },
  { id: 'T14', tema: 'Pantallas', t: '¿Cuántas niñas y niños pasan muchas horas frente a pantallas, repiten contenidos violentos o rumores, o tienen conflictos por el celular?',
    ops: escala('N10', ['Qué ven y cuánto tiempo', 'pide al grupo un registro anónimo']) },
];
const MOMENTOS = ['Aproximarse', 'Observar', 'Problematizar', 'Dialogar'];
const PREG_RAMA = {
  N12: { a1: '¿Qué práctica está viva en tu comunidad?', b2: '¿Qué la amenaza o la deja fuera?' },
};
const PARA_CTE = ['¿Desde cuándo es así y por qué se ve como algo normal?', '¿A quiénes afecta más y quién se beneficia?',
  '¿Qué papel tenemos la escuela y nosotros en que siga así?', '¿Qué dicen niñas, niños y familias? ¿Ya les preguntamos?'];

/* ------------------------------------------------------------ estado */
const CLAVE = 'planeador.lectura';
const nuevo = () => ({ v: 2, vista: 'inicio', pos: 0, r: {}, elegidos: null, sel: null, dec: {}, prot: false, abiertas: {} });
let st = nuevo();
function guardar() { try { localStorage.setItem(CLAVE, JSON.stringify(st)); } catch (e) { } }
function cargar() {
  try { const g = JSON.parse(localStorage.getItem(CLAVE) || 'null'); if (g && g.v === 2 && g.r) st = { ...nuevo(), ...g, prot: false }; } catch (e) { }
}

/* ------------------------------------------------------------ lógica */
const hayJornaleo = () => (st.r.c2 || []).includes('jornaleo') || (st.r.c3 || []).includes('jornaleras');
function modulador(n) {                 // el territorio modula la prioridad (máximo ×1.3); nunca abre un tema
  const c1 = st.r.c1, c2 = st.r.c2 || [], c3 = st.r.c3 || [];
  let f = 1;
  if (c1 === 'rural' && c3.includes('lengua') && ['N05', 'N02'].includes(n)) f *= 1.2;
  if (hayJornaleo() && ['N06', 'N01', 'N03'].includes(n)) f *= 1.2;
  if ((c2.includes('remesas') || c3.includes('retorno')) && n === 'N06') f *= 1.2;
  if (c2.includes('costa') && n === 'N03') f *= 1.2;
  if (c1 === 'periferia' && ['N04', 'N10'].includes(n)) f *= 1.1;
  return Math.min(f, 1.3);
}
function efecto(q) {
  const op = q.ops.find(o => o[0] === st.r[q.id]);
  let e = op ? op[2] : null;
  if (e && e.dyn === 'temporada') e = hayJornaleo() ? { n: 'N06', i: 1.5 } : { n: 'N01', i: 1 };
  return { e, etq: op ? op[1] : '' };
}
function candidatas() {                 // temas con señal, del más fuerte al más débil
  const m = new Map();
  SENS.forEach((q, k) => {
    const { e, etq } = efecto(q);
    if (!e || !e.n) return;
    const c = m.get(e.n) || { n: e.n, i: 0, orden: k, por: [] };
    c.i = Math.max(c.i, e.i); c.por.push(`${q.tema}: «${etq}»`); m.set(e.n, c);
  });
  return [...m.values()].map(c => ({ ...c, pp: c.i * modulador(c.n) })).sort((a, b) => b.pp - a.pp || a.orden - b.orden);
}
const contradicciones = (n, k) => DATOS.ramas[n].b2.filter(x => x.k === k || x.k === '*');
function secuencia() {
  const s = [...CTX.map(q => ({ tipo: 'ctx', q })), ...SENS.map(q => ({ tipo: 'sens', q }))];
  if (candidatas().length) {
    s.push({ tipo: 'elegir' });
    (st.elegidos || []).forEach(n => {
      s.push({ tipo: 'a1', n });
      const a = st.r['a1:' + n];
      if (a && a !== 'otra' && a !== 'noreg') s.push({ tipo: 'b2', n });
    });
  }
  s.push({ tipo: 'fin' });
  return s;
}
function fijar(clave, valor) {
  const cambio = JSON.stringify(st.r[clave]) !== JSON.stringify(valor);
  st.r[clave] = valor;
  if (!cambio) return;
  if (clave.startsWith('a1:')) delete st.r['b2:' + clave.slice(3)];
  else if (!clave.startsWith('b2:')) {  // cambió el contexto o un sensor: se vuelve a elegir
    st.elegidos = null; st.sel = null;
    Object.keys(st.r).forEach(k => { if (k.startsWith('a1:') || k.startsWith('b2:')) delete st.r[k]; });
  }
}
function avanzar() {
  st.pos += 1;
  if (secuencia()[st.pos].tipo === 'fin') { st.vista = 'resultado'; st.abiertas = {}; }
  pintar(true);
}
function fichasDelResultado() {
  const out = [];
  (st.elegidos || []).forEach(n => { const f = st.r['b2:' + n]; if (DATOS.fichas[f] && !out.includes(f)) out.push(f); });
  return out;
}
const decision = f => st.dec[f] || '';
function ejesSugeridos() {              // ejes de las fichas confirmadas: primero los principales, luego los secundarios
  const fs = fichasDelResultado().filter(f => decision(f) === 'si'), orden = [];
  [true, false].forEach(p => fs.forEach(f => DATOS.fichas[f].ejes.forEach(e => { if (e.p === p && !orden.includes(e.e)) orden.push(e.e); })));
  return orden.map(id => ({ id, de: fs.filter(f => DATOS.fichas[f].ejes.some(e => e.e === id)) }));
}

/* ------------------------------------------------------------ vistas */
function vistaInicio() {
  return `
    <blockquote class="consigna">Los ejes articuladores son temas de relevancia social que propone la Nueva Escuela Mexicana (programa sintético) y que se escogen y abordan en tu planeación en función de la lectura crítica de tu realidad escolar particular (programa analítico).</blockquote>
    <figure class="epigrafe"><blockquote>«La lectura del mundo precede a la lectura de la palabra.»</blockquote>
      <figcaption>Paulo Freire, <cite>La importancia del acto de leer</cite> (1981)</figcaption></figure>
    <p class="nota">Contesta con lo que has observado en tu comunidad, tu escuela y tu grupo. Si algo no lo sabes, pica «No lo sé»: también es parte de la lectura. Son unos 23 clics.</p>
    <ol class="camino4">
      <li><b>Aproximarse</b>Tres datos de tu comunidad: desde dónde se lee.</li>
      <li><b>Observar</b>Una pregunta por tema. Empieza por lo que la comunidad ya tiene.</li>
      <li><b>Problematizar</b>De los temas más fuertes: qué se ve, qué lo sostiene, quién gana y quién pierde.</li>
      <li><b>Dialogar</b>Recibes fichas con indicios. Marcas las que sí pasan en tu escuela y, al final, ves el eje articulador sugerido.</li>
    </ol>
    <div class="arranque">
      <button class="prim" data-acc="comenzar">Comenzar tu diagnóstico</button>
      <button class="sec" data-acc="saltar">Saltar esta sección</button>
    </div>
    <p class="pie">Si la saltas, no pasa nada: en «Datos del proyecto» eliges los ejes tú, como siempre.</p>`;
}
function vistaSaltada() {
  return `<div class="caja"><h3>Saltaste esta sección</h3>
    <p>Tu planeación sigue igual: en «Datos del proyecto» eliges los ejes articuladores tú. Puedes volver aquí cuando quieras, por ejemplo después de verla en Consejo Técnico.</p></div>
    <div class="acciones"><button class="sec" data-acc="reiniciar">Volver a la sección</button></div>`;
}
function cabeceraFlujo(m, etq) {
  const seq = secuencia(), total = st.elegidos ? seq.length - 1 : CTX.length + SENS.length + 7;
  return `<ol class="momentos" aria-label="Momentos de la lectura">${MOMENTOS.map((x, k) =>
      `<li class="${k < m ? 'hecho' : k === m ? 'actual' : ''}"${k === m ? ' aria-current="step"' : ''}>${x}</li>`).join('')}</ol>
    <div class="avance" role="progressbar" aria-label="Avance" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${st.pos}"><span style="width:${Math.round(100 * st.pos / total)}%"></span></div>
    <p class="q-etq">${esc(etq)}</p>`;
}
const navFlujo = (extra = '') => `<div class="q-nav"><div><button class="sec" data-acc="atras">Atrás</button>${extra}</div>
  <button class="enlace" data-acc="reiniciar">Volver a empezar</button></div>`;
function opcion(valor, texto, sel, clase = '', sub = '') {
  return `<button class="op ${clase} ${sel ? 'sel' : ''}" data-op="${esc(valor)}" aria-pressed="${sel}"><span>${esc(texto)}${sub ? `<small>${esc(sub)}</small>` : ''}</span></button>`;
}
function vistaProteccion() {
  return `<div class="prot" role="alert">
      <h3>Antes de seguir: proteger va primero</h3>
      <h4>Qué hacer hoy</h4>
      <ul><li>Avisa hoy a la dirección de tu escuela.</li>
        <li>La dirección sigue el protocolo de tu estado y da aviso a la Procuraduría de Protección de Niñas, Niños y Adolescentes.</li>
        <li>Si el riesgo es inmediato, llama al 911.</li></ul>
      <h4>Qué no hacer</h4>
      <ul><li>No investigues por tu cuenta ni entrevistes a la niña o al niño.</li>
        <li>No confrontes a nadie ni tomes fotografías.</li>
        <li>No anotes nombres ni detalles, ni aquí ni en tu planeación.</li></ul>
      <p>Esto no se guarda y no entra al diagnóstico.</p>
      <div><button class="prim" data-acc="cerrar-prot">Entendido, volver a la pregunta</button></div>
    </div>`;
}
function vistaFlujo() {
  const paso = secuencia()[st.pos];
  if (st.prot) return cabeceraFlujo(paso.tipo === 'ctx' ? 0 : paso.tipo === 'sens' ? 1 : 2, 'Protección') + vistaProteccion();
  if (paso.tipo === 'ctx' || paso.tipo === 'sens') {
    const q = paso.q, esCtx = paso.tipo === 'ctx', k = (esCtx ? CTX : SENS).indexOf(q), v = st.r[q.id];
    const etq = esCtx ? `Aproximarse · ${k + 1} de ${CTX.length}` : `Observar · ${k + 1} de ${SENS.length} · ${q.tema}`;
    const intro = esCtx && k === 0 ? '<p class="nota">Toda lectura se hace desde un lugar. Primero, tres datos del tuyo.</p>'
      : !esCtx && k === 0 ? '<p class="nota">Empezamos por lo que la comunidad ya tiene: su lengua, sus saberes, su fiesta y su organización.</p>' : '';
    const ops = q.ops.map(o => {
      const sel = q.multi ? (v || []).includes(o[0]) : v === o[0];
      return opcion(o[0], o[1], sel, (q.multi ? 'multi ' : '') + (o[0] === 'ns' || o[0] === 'noreg' ? 'duda ' : '') + (o[0] === 'x' ? 'cent' : ''));
    }).join('');
    return cabeceraFlujo(esCtx ? 0 : 1, etq) + intro + `<div class="q"><h3 class="q-t">${esc(q.t)}</h3>
      ${q.ayuda ? `<p class="q-ayuda">${esc(q.ayuda)}</p>` : ''}<div class="ops">${ops}</div></div>` +
      navFlujo(q.multi ? `<button class="prim" data-acc="continuar" ${(v || []).length ? '' : 'disabled'}>Continuar</button>` : '');
  }
  if (paso.tipo === 'elegir') {
    const cs = candidatas();
    if (!st.sel) st.sel = st.elegidos ? [...st.elegidos] : cs.slice(0, 3).map(c => c.n);
    const ops = cs.map(c => opcion(c.n, DATOS.ramas[c.n].nombre, st.sel.includes(c.n), 'multi', 'Observaste: ' + c.por.join(' · '))).join('');
    return cabeceraFlujo(2, 'Problematizar · elige qué profundizar') +
      `<p class="nota">Problematizar es preguntar qué sostiene una situación. Sin esa pregunta tendríamos una lista de carencias, no una lectura crítica.</p>
      <div class="q"><h3 class="q-t">Estos temas mostraron señales. ¿En cuáles profundizamos?</h3>
      <p class="q-ayuda">Están marcados los que observas con más fuerza. Tú decides: si tu colectivo, o lo que cuentan niñas y niños, apunta a otro, cámbialo. Elige hasta tres.</p>
      <div class="ops">${ops}</div></div>` +
      navFlujo(`<button class="prim" data-acc="profundizar" ${st.sel.length ? '' : 'disabled'}>Profundizar en ${st.sel.length === 1 ? 'este tema' : 'estos temas'}</button>`);
  }
  const n = paso.n, rama = DATOS.ramas[n], num = st.elegidos.indexOf(n) + 1, pr = PREG_RAMA[n] || {};
  const base = `Problematizar · tema ${num} de ${st.elegidos.length} · ${rama.nombre}`;
  if (paso.tipo === 'a1') {
    const v = st.r['a1:' + n];
    const ops = rama.a1.map(a => opcion(a.k, a.t, v === a.k)).join('') + opcion('otra', 'Otra cosa', v === 'otra', 'duda') +
      (n === 'N07' ? opcion('noreg', 'Prefiero no registrar', v === 'noreg', 'duda') : '') + (rama.cent ? opcion('x', rama.cent, false, 'cent') : '');
    return cabeceraFlujo(2, base) + `<div class="q"><h3 class="q-t">${esc(pr.a1 || '¿Qué se ve?')}</h3>
      <p class="q-ayuda">${n === 'N07' ? 'Aquí solo se registran efectos en la vida escolar, sin casos, nombres ni lugares.' : 'Pica lo que más se parece a lo que observas.'}</p>
      <div class="ops">${ops}</div></div>` + navFlujo();
  }
  const esc0 = rama.a1.find(a => a.k === st.r['a1:' + n]), v = st.r['b2:' + n];
  const ops = contradicciones(n, esc0.k).map(x => opcion(x.f, x.t, v === x.f)).join('') +
    opcion('otra', 'Otra cosa lo sostiene', v === 'otra', 'duda') + opcion('ns', 'No lo sé', v === 'ns', 'duda');
  return cabeceraFlujo(2, base) + `<div class="q"><h3 class="q-t">${esc(pr.b2 || '¿Qué lo sostiene?')}</h3>
    <p class="q-ayuda">Observaste: «${esc(esc0.t)}». ¿Quién gana y quién pierde con esto?</p><div class="ops">${ops}</div></div>` + navFlujo();
}
function contexto() {
  const c2 = (st.r.c2 || []).map(x => CTX_TXT.c2[x]).filter(Boolean), c3 = (st.r.c3 || []).map(x => CTX_TXT.c3[x]).filter(Boolean);
  const lista = a => a.length > 1 ? a.slice(0, -1).join(', ') + ' y ' + a[a.length - 1] : a[0];
  return `La escuela está en ${CTX_TXT.c1[st.r.c1] || 'una comunidad'}` + (c2.length ? `, donde la mayoría de las familias vive de ${lista(c2)}` : '') + '.' +
    (c3.length ? ` Hay ${lista(c3)}.` : '');
}
function agenda() {
  const a = [];
  SENS.forEach(q => { const { e } = efecto(q); if (e && e.ag) a.push(`${e.ag[0]}: ${e.ag[1]}.`); });
  (st.elegidos || []).forEach(n => {
    const t = DATOS.ramas[n].nombre, a1 = st.r['a1:' + n], b2 = st.r['b2:' + n];
    if (a1 === 'otra') a.push(`«${t}»: lo que ves no estaba en la lista. Descríbanlo en el CTE: qué se ve y qué lo sostiene.`);
    else if (b2 === 'otra' || b2 === 'ns') a.push(`«${t}»: falta nombrar qué lo sostiene. Pregúntenlo en el CTE: ¿quién gana y quién pierde con esto?`);
  });
  const espera = candidatas().filter(c => !(st.elegidos || []).includes(c.n)).map(c => DATOS.ramas[c.n].nombre);
  if (espera.length) a.push(`Temas con señales que quedaron en espera: ${espera.join(', ')}. Puedes volver a las preguntas y elegirlos.`);
  return a;
}
const chipEje = (id, on) => `<span class="lchip ${on ? 'on' : ''}" style="--c:${EJE[id].c}">${esc(EJE[id].corto || EJE[id].n)}</span>`;
function vistaFicha(f, k) {
  const d = DATOS.fichas[f], dec = decision(f), abierta = st.abiertas[f] === undefined ? k === 0 : st.abiertas[f];
  const tema = (st.elegidos || []).find(n => st.r['b2:' + n] === f);
  const escena = tema ? DATOS.ramas[tema].a1.find(a => a.k === st.r['a1:' + tema]) : null;
  const estado = { si: 'Confirmada', no: 'Descartada', ind: 'Por indagar' }[dec] || 'Sin decidir';
  const lista = (t, xs) => xs.length ? `<div class="blq"><h4>${t}</h4><ul>${xs.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : '';
  const boton = (v, t) => `<button class="dec" data-dec="${v}" data-ficha="${f}" aria-pressed="${dec === v}">${t}</button>`;
  return `<details class="ficha" data-ficha="${f}" data-dec="${dec}" ${abierta ? 'open' : ''}>
    <summary><span class="cod">${f}</span><span class="tit">${esc(d.t)}</span><span class="estado ${dec}">${estado}</span>
      <span class="chips">${d.ejes.map(e => chipEje(e.e, dec === 'si')).join('')}</span></summary>
    <div class="ficha-c">
      <div class="decide"><p>¿Pasa esto en tu escuela?</p><div>${boton('si', 'Sí pasa aquí')}${boton('no', 'No pasa aquí')}${boton('ind', 'Falta indagar')}</div></div>
      ${escena ? `<div class="blq"><h4>Lo que observaste</h4><p>${esc(escena.t)}.</p></div>` : ''}
      <div class="blq"><h4>Situación límite</h4><p>${esc(d.sl)}</p></div>
      ${lista('Para explorar en colectivo (CTE)', PARA_CTE)}
      ${lista('Con quién indagarlo', d.ind)}
      ${lista('Para problematizar con el grupo', d.prob)}
      <div class="blq"><h4>Inédito viable</h4><p>${esc(d.iv)}</p></div>
      ${lista('Con qué se cuenta', d.pot)}
      <div class="blq"><h4>Ejes que sugiere si la confirmas</h4><ul>${d.ejes.map(e =>
        `<li class="eje-pq" style="--c:${EJE[e.e].c}"><b>${esc(EJE[e.e].n)}.</b> ${esc(e.pq)}</li>`).join('')}</ul></div>
      ${d.al ? `<div class="blq cuidado"><h4>Cuidado</h4><p>${esc(d.al)}</p></div>` : ''}
    </div></details>`;
}
function vistaEjeSugerido() {
  const ejes = ejesSugeridos();
  if (!ejes.length) return `<div class="caja sugerido" aria-live="polite"><h3>Eje articulador sugerido</h3>
    <p>Todavía no hay un eje sugerido. Marca «Sí pasa aquí» en la ficha que reconozcas en tu escuela.</p></div>`;
  return `<div class="caja sugerido" aria-live="polite"><h3>${ejes.length === 1 ? 'Eje articulador sugerido' : 'Ejes articuladores sugeridos'}</h3>
    <ul class="ejes">${ejes.map(x => `<li class="eje on" style="--c:${EJE[x.id].c};--k:${EJE[x.id].k}"><span class="eje-logo" aria-hidden="true"></span>
      <span>${esc(EJE[x.id].n)}</span><small>${x.de.length === 1 ? 'Lo sugiere la ficha' : 'Lo sugieren las fichas'} ${x.de.join(' y ')}</small></li>`).join('')}</ul>
    <p class="pie">${ejes.length === 1 ? 'Es una sugerencia' : 'Son sugerencias'}. En «Datos del proyecto» los ejes los sigues eligiendo tú.</p></div>`;
}
function vistaResultado() {
  const fs = fichasDelResultado();
  const pots = SENS.map(q => efecto(q).e).filter(e => e && e.pot).map(e => e.pot);
  const ag = agenda().concat(fs.filter(f => decision(f) === 'ind').map(f => `«${DATOS.fichas[f].t}»: confírmala con quienes la viven (mira «Con quién indagarlo» en la ficha).`));
  return `<ol class="momentos" aria-label="Momentos de la lectura">${MOMENTOS.map((x, k) => `<li class="${k < 3 ? 'hecho' : 'actual'}"${k === 3 ? ' aria-current="step"' : ''}>${x}</li>`).join('')}</ol>
    <h3 class="res-t">Tu lectura: ${fs.length === 1 ? 'una ficha' : fs.length + ' fichas'} para dialogar</h3>
    <p class="ctx">${esc(contexto())}</p>
    <p class="nota">Estas fichas son indicios, no un veredicto. Sirven para hacer preguntas: llévalas a tu colectivo, a niñas y niños y a las familias. De las que confirmes sale, al final, el eje articulador sugerido.</p>
    <p class="glosa"><b>Situación límite:</b> lo que parece que «así es» y frena a la comunidad. <b>Inédito viable:</b> lo que todavía no existe, pero es posible.</p>
    ${fs.length ? `<div class="fichas">${fs.map(vistaFicha).join('')}</div>`
      : '<div class="caja"><h3>No salió ninguna ficha</h3><p>Ninguna situación quedó nombrada con lo que la sostiene. Revisa lo pendiente en «Por indagar» y vuelve a leer cuando sepas más: sin fichas confirmadas no hay eje sugerido.</p></div>'}
    ${pots.length ? `<div class="caja"><h3>Lo que la comunidad ya tiene</h3><ul>${pots.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>` : ''}
    ${ag.length ? `<div class="caja"><h3>Por indagar</h3><p>Lo que no se sabe también es parte de la lectura: se convierte en tarea.</p><ul>${ag.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>` : ''}
    ${fs.length ? vistaEjeSugerido() : ''}
    <div class="acciones"><button class="sec" data-acc="revisar">Volver a las preguntas</button><button class="sec" data-acc="reiniciar">Volver a empezar</button></div>`;
}
function pintar(arriba) {
  $('#lectura-app').innerHTML = st.vista === 'inicio' ? vistaInicio() : st.vista === 'saltada' ? vistaSaltada() : st.vista === 'flujo' ? vistaFlujo() : vistaResultado();
  guardar();
  if (arriba) $('#s-lectura').scrollIntoView({ block: 'start' });
}

/* ------------------------------------------------------------ eventos */
$('#lectura-app').addEventListener('toggle', ev => {
  const d = ev.target.closest && ev.target.closest('details.ficha');
  if (d) { st.abiertas[d.dataset.ficha] = d.open; guardar(); }
}, true);
$('#lectura-app').addEventListener('click', ev => {
  const b = ev.target.closest('button');
  if (!b) return;
  ev.stopPropagation();               // estos botones son de esta sección, no del resto del panel
  const acc = b.dataset.acc;
  if (acc === 'saltar') { st = { ...nuevo(), vista: 'saltada' }; return pintar(true); }
  if (b.dataset.dec) {
    const f = b.dataset.ficha;
    st.dec[f] = decision(f) === b.dataset.dec ? '' : b.dataset.dec;
    st.abiertas[f] = true;
    return pintar();
  }
  if (acc === 'comenzar') { st = { ...nuevo(), vista: 'flujo' }; return pintar(true); }
  if (acc === 'reiniciar') { st = nuevo(); return pintar(true); }
  if (acc === 'revisar') { st.vista = 'flujo'; st.pos = secuencia().length - 2; return pintar(true); }
  if (acc === 'cerrar-prot') { st.prot = false; return pintar(true); }
  if (acc === 'atras') {
    if (st.prot) { st.prot = false; return pintar(true); }
    if (st.pos === 0) st.vista = 'inicio'; else st.pos -= 1;
    return pintar(true);
  }
  const paso = secuencia()[st.pos];
  if (acc === 'continuar') return avanzar();
  if (acc === 'profundizar') {
    const orden = candidatas().map(c => c.n).filter(n => st.sel.includes(n));
    Object.keys(st.r).forEach(k => { if ((k.startsWith('a1:') || k.startsWith('b2:')) && !orden.includes(k.slice(3))) delete st.r[k]; });
    st.elegidos = orden; st.dec = {};
    return avanzar();
  }
  const v = b.dataset.op;
  if (v === undefined) return;
  if (v === 'x') { st.prot = true; return pintar(true); }
  if (paso.tipo === 'elegir') {
    const k = st.sel.indexOf(v);
    if (k >= 0) st.sel.splice(k, 1); else if (st.sel.length < 3) st.sel.push(v);
    return pintar();
  }
  if (paso.tipo === 'ctx' || paso.tipo === 'sens') {
    const q = paso.q;
    if (q.multi) {
      let a = [...(st.r[q.id] || [])];
      if (a.includes(v)) a = a.filter(x => x !== v);
      else if (q.solas.includes(v)) a = [v];
      else { a = a.filter(x => !q.solas.includes(x)); if (a.length < q.multi) a.push(v); }
      fijar(q.id, a);
      return pintar();
    }
    fijar(q.id, v);
    return avanzar();
  }
  fijar(paso.tipo + ':' + paso.n, v);
  avanzar();
});

cargar();
if (st.vista === 'flujo' && !secuencia()[st.pos]) st = nuevo();
pintar();
})();
