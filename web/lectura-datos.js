/* Lectura de la realidad: temas, escenas, contradicciones y las 80 fichas de situación límite con los ejes que sugieren. */
window.LECTURA_DATOS = {
 "ramas": {
  "N01": {
   "nombre": "Sustento y trabajo",
   "a1": [
    {
     "k": "costos",
     "t": "La escuela pide cuotas, uniformes o materiales que no todas las familias pueden pagar"
    },
    {
     "k": "trabajo",
     "t": "Niñas y niños trabajan antes o después de clase, o faltan por trabajar"
    },
    {
     "k": "jornadas",
     "t": "Las familias trabajan jornadas muy largas y apenas les alcanza"
    }
   ],
   "cent": "Una niña o un niño en particular hace un trabajo peligroso o que le impide venir",
   "b2": [
    {
     "t": "La escuela pide lo que no todas las familias pueden pagar",
     "f": "S01",
     "k": "costos"
    },
    {
     "t": "El ingreso familiar necesita el trabajo de niñas y niños, y ese trabajo compite con la escuela",
     "f": "S02",
     "k": "trabajo"
    },
    {
     "t": "Se trabaja mucho y aun así se vive al día",
     "f": "S03",
     "k": "jornadas"
    }
   ]
  },
  "N02": {
   "nombre": "Cuerpo, alimento y salud",
   "a1": [
    {
     "k": "alimentacion",
     "t": "Lonche ultraprocesado, refresco, venta a la salida o bebederos sin agua"
    },
    {
     "k": "hambre",
     "t": "Llegan sin comer, con cansancio o con talla baja"
    },
    {
     "k": "saberes",
     "t": "La comida propia (milpa, recetas de casa) se deja por la comprada"
    },
    {
     "k": "salud",
     "t": "No ven bien el pizarrón, les duelen los dientes o enferman sin atención"
    },
    {
     "k": "sustancias",
     "t": "Alcohol, tabaco o vapeadores cerca de la escuela o frente a niñas y niños"
    },
    {
     "k": "habitos",
     "t": "Duermen poco, se mueven poco o llegan cansados por las pantallas"
    }
   ],
   "cent": "Hambre severa o desnutrición visible de una niña o un niño en particular",
   "b2": [
    {
     "t": "Lo barato y anunciado le gana a la comida propia (prohibido dentro, barato fuera)",
     "f": "S04",
     "k": "alimentacion"
    },
    {
     "t": "Hay alimentos en la región, pero no llegan a todas las familias",
     "f": "S05",
     "k": "hambre"
    },
    {
     "t": "La comida propia se ve como «de pobres» y se pierde",
     "f": "S06",
     "k": "saberes"
    },
    {
     "t": "No hay atención de salud cercana ni accesible",
     "f": "S07",
     "k": "salud"
    },
    {
     "t": "El consumo se normaliza y la venta a menores se tolera",
     "f": "S08",
     "k": "sustancias"
    },
    {
     "t": "Noches cortas y cuerpos quietos: jornadas, pantallas y falta de espacios",
     "f": "S09",
     "k": "habitos"
    }
   ]
  },
  "N03": {
   "nombre": "Agua, ambiente y territorio",
   "a1": [
    {
     "k": "agua",
     "t": "Tandeo, pipas, escuela sin agua o acarreo de agua"
    },
    {
     "k": "contaminacion",
     "t": "Río, basura, humo, mina, agroquímicos, barro vidriado o leña que enferman"
    },
    {
     "k": "clima",
     "t": "Calor en el aula, sequía en la milpa"
    },
    {
     "k": "transformacion",
     "t": "Megaproyecto, mina o turismo que cambia el lugar"
    },
    {
     "k": "desastre",
     "t": "Huracán, inundación o sismo: daños, días sin clase, reconstrucción"
    },
    {
     "k": "trayectos",
     "t": "Caminos, tránsito o inseguridad para llegar a la escuela"
    }
   ],
   "cent": "(Fase 5) Señales de explotación sexual de una niña o un niño",
   "b2": [
    {
     "t": "El agua llega desigual: por colonia, por horario o por pago",
     "f": "S10",
     "k": "agua"
    },
    {
     "t": "El acarreo y el cuidado del agua recaen en niñas y mujeres",
     "f": "S11",
     "k": "agua"
    },
    {
     "t": "Lo que contamina beneficia a otros y enferma aquí",
     "f": "S12",
     "k": "contaminacion"
    },
    {
     "t": "El calor y la sequía golpean más a quien tiene menos",
     "f": "S13",
     "k": "clima"
    },
    {
     "t": "Se decide sobre el territorio sin consultar a la comunidad",
     "f": "S14",
     "k": "transformacion"
    },
    {
     "t": "El turismo trae empleo, pero cierra la costa y encarece la vida",
     "f": "S15",
     "k": "transformacion"
    },
    {
     "t": "La reconstrucción llega desigual",
     "f": "S16",
     "k": "desastre"
    },
    {
     "t": "Las pérdidas del desastre no tienen lugar en la escuela",
     "f": "S17",
     "k": "desastre"
    },
    {
     "t": "Llegar a la escuela es peligroso y nadie lo atiende",
     "f": "S18",
     "k": "trayectos"
    }
   ]
  },
  "N04": {
   "nombre": "Cuidados y género",
   "a1": [
    {
     "k": "solos",
     "t": "Niñas y niños pasan muchas horas sin adultos"
    },
    {
     "k": "cuidados",
     "t": "Niñas que faltan o llegan cansadas por cuidar a hermanos o la casa"
    },
    {
     "k": "escuela",
     "t": "Juegos, espacios, tareas o la palabra repartidos por sexo en la escuela"
    },
    {
     "k": "estereotipos",
     "t": "«Los niños no lloran»; burlas a quien no cumple lo esperado"
    },
    {
     "k": "pubertad",
     "t": "(Fase 5) Menstruación sin agua ni sanitarios, burlas o faltas esos días"
    },
    {
     "k": "crecer",
     "t": "(Fases 4-5) Niñas que dejan de participar o de venir al crecer"
    }
   ],
   "cent": "(Fases 4-5) Unión, «compromiso» o embarazo de una niña",
   "b2": [
    {
     "t": "Las jornadas y traslados dejan a niñas y niños sin adultos",
     "f": "S19",
     "k": "solos"
    },
    {
     "t": "Los cuidados y quehaceres recaen en las niñas",
     "f": "S20",
     "k": "cuidados"
    },
    {
     "t": "La escuela reparte espacios y tareas por sexo",
     "f": "S21",
     "k": "escuela"
    },
    {
     "t": "Un modelo de hombría basado en aguantar y mandar",
     "f": "S22",
     "k": "estereotipos"
    },
    {
     "t": "Las expectativas sobre las niñas compiten con la escuela",
     "f": "S23",
     "k": "crecer"
    },
    {
     "t": "La pubertad llega sin agua ni sanitarios dignos",
     "f": "S24",
     "k": "pubertad"
    },
    {
     "t": "La pubertad se vive entre burla y silencio",
     "f": "S25",
     "k": "pubertad"
    },
    {
     "t": "La burla castiga a quien no cumple lo esperado por género",
     "f": "S26",
     "k": "estereotipos"
    }
   ]
  },
  "N05": {
   "nombre": "Lenguas, saberes y culturas",
   "a1": [
    {
     "k": "aula",
     "t": "Hablan su lengua en el recreo y callan en clase"
    },
    {
     "k": "transmision",
     "t": "Las niñas y los niños más pequeños ya no hablan la lengua"
    },
    {
     "k": "trato",
     "t": "Burla o castigo por la lengua, el acento, la piel o el origen"
    },
    {
     "k": "ciudad",
     "t": "Familias de origen indígena que no lo dicen en la ciudad"
    },
    {
     "k": "afro",
     "t": "La identidad afromexicana no se nombra"
    },
    {
     "k": "saberes",
     "t": "Saberes propios (cultivo, medicina, oficios) ausentes o descalificados"
    },
    {
     "k": "consumo",
     "t": "«Lo de fuera» (marcas, música, forma de hablar) vale más que lo propio"
    }
   ],
   "cent": "",
   "b2": [
    {
     "t": "La escuela enseña solo en español donde se habla otra lengua",
     "f": "S27",
     "k": "aula"
    },
    {
     "t": "La lengua deja de enseñarse en casa «para que no sufran»",
     "f": "S28",
     "k": "transmision"
    },
    {
     "t": "Se castiga o se burla la lengua o el acento",
     "f": "S29",
     "k": "trato"
    },
    {
     "t": "Una jerarquía de piel u origen se vive como broma",
     "f": "S30",
     "k": "trato"
    },
    {
     "t": "El origen indígena se oculta para no ser discriminado",
     "f": "S31",
     "k": "ciudad"
    },
    {
     "t": "La escuela no nombra la afromexicanidad",
     "f": "S32",
     "k": "afro"
    },
    {
     "t": "Los saberes propios se tratan como atraso",
     "f": "S33",
     "k": "saberes"
    },
    {
     "t": "La escuela no invita los saberes de las familias",
     "f": "S34",
     "k": "saberes"
    },
    {
     "t": "Lo de fuera vale más y lo propio se desprecia",
     "f": "S35",
     "k": "consumo"
    }
   ]
  },
  "N06": {
   "nombre": "Faltas, migración y trayectorias",
   "a1": [
    {
     "k": "jornalera",
     "t": "Llegan y se van con las cosechas"
    },
    {
     "k": "retorno",
     "t": "Regresaron de EE. UU. o viven entre dos países"
    },
    {
     "k": "separadas",
     "t": "Madre o padre trabaja lejos o en otro país"
    },
    {
     "k": "desplazada",
     "t": "Llegaron huyendo de la violencia"
    },
    {
     "k": "transito",
     "t": "Van de paso: albergue o casa de migrantes"
    },
    {
     "k": "llegados",
     "t": "Quienes llegan de fuera no se integran"
    },
    {
     "k": "dispersas",
     "t": "Faltas dispersas por causas que se cruzan"
    }
   ],
   "cent": "Desaparición o asesinato de un familiar de una niña o un niño",
   "b2": [
    {
     "t": "El calendario escolar no sigue el calendario jornalero",
     "f": "S36",
     "k": "jornalera"
    },
    {
     "t": "Papeles, idioma y otra escuela frenan a quien regresa",
     "f": "S37",
     "k": "retorno"
    },
    {
     "t": "El inglés u otro idioma de quien regresa se trata como problema",
     "f": "S38",
     "k": "retorno"
    },
    {
     "t": "La familia vive separada por la migración y nadie lo acompaña",
     "f": "S39",
     "k": "separadas"
    },
    {
     "t": "Quien llega desplazado no tiene red ni inscripción ágil",
     "f": "S40",
     "k": "desplazada"
    },
    {
     "t": "Quien va de paso no tiene escuela",
     "f": "S41",
     "k": "transito"
    },
    {
     "t": "A quien llega de fuera se le trata como de paso",
     "f": "S42",
     "k": "llegados"
    },
    {
     "t": "La escuela registra la falta, pero no lee su causa",
     "f": "S43",
     "k": "dispersas"
    }
   ]
  },
  "N07": {
   "nombre": "Violencias",
   "a1": [
    {
     "k": "crianza",
     "t": "Se habla de golpes o castigos en casa como algo normal"
    },
    {
     "k": "genero",
     "t": "Se callan situaciones de violencia hacia madres o niñas"
    },
    {
     "k": "cuerpo",
     "t": "No hay palabras ni adultos de confianza para hablar del cuerpo y del cuidado"
    },
    {
     "k": "miedo",
     "t": "Se suspenden clases o se cambian horarios por inseguridad"
    },
    {
     "k": "ausencias",
     "t": "Niñas y niños faltan o se van tras hechos violentos"
    },
    {
     "k": "prestigio",
     "t": "(Fases 4-5) En juegos y aspiraciones aparece el prestigio de grupos violentos"
    }
   ],
   "cent": "Conozco un indicio sobre una niña o un niño en particular",
   "b2": [
    {
     "t": "El castigo físico se ve como forma de educar",
     "f": "S44",
     "k": "crianza"
    },
    {
     "t": "La violencia contra mujeres y niñas se ve como asunto privado",
     "f": "S45",
     "k": "genero"
    },
    {
     "t": "Del cuerpo y del cuidado no se habla: la niñez queda sin palabras",
     "f": "S46",
     "k": "cuerpo"
    },
    {
     "t": "El miedo decide los tiempos y espacios de la escuela",
     "f": "S47",
     "k": "miedo"
    },
    {
     "t": "La violencia se lleva a niñas y niños y no se puede nombrar",
     "f": "S48",
     "k": "ausencias"
    },
    {
     "t": "La violencia ofrece pertenencia cuando la escuela y la comunidad ofrecen poco",
     "f": "S49",
     "k": "prestigio"
    }
   ]
  },
  "N08": {
   "nombre": "Ánimo y duelo",
   "a1": [
    {
     "k": "malestar",
     "t": "Tristeza, enojo o ansiedad que se notan en clase"
    },
    {
     "k": "duelo",
     "t": "Duelos recientes: muerte, separación, migración"
    }
   ],
   "cent": "Ideas de morir o autolesión de una niña o un niño",
   "b2": [
    {
     "t": "El malestar se atiende como mala conducta, o no se atiende",
     "f": "S50",
     "k": "malestar"
    },
    {
     "t": "La escuela no tiene lugar para el duelo",
     "f": "S51",
     "k": "duelo"
    }
   ]
  },
  "N09": {
   "nombre": "La palabra y el número",
   "a1": [
    {
     "k": "inicial",
     "t": "(Fase 3) Aún no leen ni escriben"
    },
    {
     "k": "comprension",
     "t": "Leen en español sin comprender; su lengua es otra"
    },
    {
     "k": "proposito",
     "t": "Escriben solo para copiar o contestar"
    },
    {
     "k": "acceso",
     "t": "Pocos libros a la mano o biblioteca cerrada"
    },
    {
     "k": "comunidad",
     "t": "La comunidad lee, escribe, cuenta y canta, pero eso no entra al aula"
    },
    {
     "k": "numero",
     "t": "Hacen operaciones, pero no las usan para comprar, medir o repartir"
    }
   ],
   "cent": "",
   "b2": [
    {
     "t": "La alfabetización se enseña igual para todos y no se consolida",
     "f": "S52",
     "k": "inicial"
    },
    {
     "t": "Se alfabetiza en español cuando la lengua es otra",
     "f": "S53",
     "k": "comprension"
    },
    {
     "t": "Se escribe para el maestro, no para alguien",
     "f": "S54",
     "k": "proposito"
    },
    {
     "t": "Los textos no llegan: pocos libros o biblioteca cerrada",
     "f": "S55",
     "k": "acceso"
    },
    {
     "t": "Lo que la comunidad lee, escribe y cuenta no entra a la escuela",
     "f": "S56",
     "k": "comunidad"
    },
    {
     "t": "El número de la escuela no sirve para leer la vida",
     "f": "S57",
     "k": "numero"
    }
   ]
  },
  "N10": {
   "nombre": "Pantallas y medios",
   "a1": [
    {
     "k": "cuidado",
     "t": "Pasan las tardes con pantallas, sin adultos"
    },
    {
     "k": "violencia",
     "t": "Ven y repiten contenidos violentos o narcocultura"
    },
    {
     "k": "cuerpo",
     "t": "Comentarios y retos sobre el cuerpo o lo que «debe» ser una niña o un niño"
    },
    {
     "k": "rumores",
     "t": "Repiten rumores o noticias falsas"
    },
    {
     "k": "acceso",
     "t": "No tienen conexión ni equipo para las tareas"
    },
    {
     "k": "celular",
     "t": "Conflictos por el celular en la escuela"
    }
   ],
   "cent": "Contacto de un adulto desconocido o intercambio de imágenes íntimas",
   "b2": [
    {
     "t": "La pantalla cuida porque no hay quien cuide",
     "f": "S58",
     "k": "cuidado"
    },
    {
     "t": "La violencia se vende como entretenimiento",
     "f": "S59",
     "k": "violencia"
    },
    {
     "t": "Las redes venden un solo cuerpo y una sola forma de ser niña o niño",
     "f": "S60",
     "k": "cuerpo"
    },
    {
     "t": "Los rumores circulan y nadie los conversa con niñas y niños",
     "f": "S61",
     "k": "rumores"
    },
    {
     "t": "Aprender exige conexión y equipo que no todos tienen",
     "f": "S62",
     "k": "acceso"
    },
    {
     "t": "La regla del celular llega sin acuerdo",
     "f": "S63",
     "k": "celular"
    }
   ]
  },
  "N11": {
   "nombre": "Trato y barreras",
   "a1": [
    {
     "k": "pares",
     "t": "Apodos, exclusión del juego o golpes repetidos"
    },
    {
     "k": "digital",
     "t": "Burlas en grupos de mensajes o redes"
    },
    {
     "k": "cuerpo",
     "t": "Burlas por el cuerpo o la apariencia"
    },
    {
     "k": "pobreza",
     "t": "Se señala a quien no paga o no trae"
    },
    {
     "k": "origen",
     "t": "Burlas por piel, lengua u origen"
    },
    {
     "k": "genero",
     "t": "Burlas a quien no cumple lo esperado por género"
    },
    {
     "k": "ensenanza",
     "t": "Hay quien no puede participar por cómo se enseña"
    },
    {
     "k": "discapacidad",
     "t": "Niñas y niños con discapacidad de la comunidad que no vienen a la escuela"
    },
    {
     "k": "sensorial",
     "t": "No ven u oyen bien y se les trata como si no aprendieran"
    },
    {
     "k": "rezago",
     "t": "A quien va «atrasado» se le culpa"
    }
   ],
   "cent": "Lesiones o señales de autolesión de una niña o un niño",
   "b2": [
    {
     "t": "El maltrato entre compañeros se ve como normal",
     "f": "S64",
     "k": "pares"
    },
    {
     "t": "Lo que se escribe en los grupos multiplica la burla",
     "f": "S65",
     "k": "digital"
    },
    {
     "t": "El cuerpo se vuelve la medida del valor",
     "f": "S66",
     "k": "cuerpo"
    },
    {
     "t": "La pobreza se vive como vergüenza individual",
     "f": "S67",
     "k": "pobreza"
    },
    {
     "t": "La enseñanza igual para todos deja fuera a quien aprende distinto",
     "f": "S68",
     "k": "ensenanza"
    },
    {
     "t": "La escuela no está preparada y se cree que no pueden",
     "f": "S69",
     "k": "discapacidad"
    },
    {
     "t": "Una diferencia para ver, oír o comunicarse se lee como fracaso",
     "f": "S70",
     "k": "sensorial"
    },
    {
     "t": "El rezago se carga al niño y no a las condiciones",
     "f": "S71",
     "k": "rezago"
    },
    {
     "t": "Una jerarquía de piel u origen se vive como broma",
     "f": "S30",
     "k": "origen"
    },
    {
     "t": "La burla castiga a quien no cumple lo esperado por género",
     "f": "S26",
     "k": "genero"
    }
   ]
  },
  "N12": {
   "nombre": "Expresión y juego",
   "a1": [
    {
     "k": "fiesta",
     "t": "La práctica viva: fiestas, danzas o música"
    },
    {
     "k": "artesania",
     "t": "La práctica viva: artesanía y oficios artísticos"
    },
    {
     "k": "juego",
     "t": "La práctica viva: juegos tradicionales o de calle"
    },
    {
     "k": "otra",
     "t": "La práctica viva: otra (teatro, pintura, radio)"
    }
   ],
   "cent": "",
   "b2": [
    {
     "t": "En la escuela no hay tiempo ni lugar para el arte y el juego",
     "f": "S72",
     "k": "*"
    },
    {
     "t": "En la calle no hay un lugar seguro para jugar",
     "f": "S73",
     "k": "juego"
    },
    {
     "t": "La escuela reduce lo propio a festival o disfraz",
     "f": "S74",
     "k": "fiesta"
    },
    {
     "t": "Museos, teatros, talleres y conciertos quedan fuera de alcance",
     "f": "S75",
     "k": "*"
    }
   ]
  },
  "N13": {
   "nombre": "Participación y memoria",
   "a1": [
    {
     "k": "familias",
     "t": "Reuniones con familias solo para avisar o pedir"
    },
    {
     "k": "nna",
     "t": "Niñas y niños no tienen dónde opinar, o nadie toma en cuenta lo que dicen"
    },
    {
     "k": "desconfianza",
     "t": "Desconfianza entre escuela y comunidad"
    },
    {
     "k": "organizacion",
     "t": "La comunidad se organiza, pero sin vínculo con la escuela"
    },
    {
     "k": "memoria",
     "t": "La historia y las luchas de la comunidad no se cuentan a niñas y niños"
    }
   ],
   "cent": "",
   "b2": [
    {
     "t": "A las familias se les convoca para informar, no para decidir",
     "f": "S76",
     "k": "familias"
    },
    {
     "t": "La palabra de niñas y niños no llega a quien decide",
     "f": "S77",
     "k": "nna"
    },
    {
     "t": "Escuela y comunidad desconfían una de otra",
     "f": "S78",
     "k": "desconfianza"
    },
    {
     "t": "La organización existe, pero «así ha sido siempre» y no llega a la escuela",
     "f": "S79",
     "k": "organizacion"
    },
    {
     "t": "La memoria de la comunidad nadie la cuenta a niñas y niños",
     "f": "S80",
     "k": "memoria"
    }
   ]
  }
 },
 "fichas": {
  "S01": {
   "t": "La escuela que cuesta",
   "n": "N01",
   "sl": "La educación pública es gratuita por derecho, pero útiles, uniformes, cooperaciones, cuotas de mantenimiento y materiales de proyecto la convierten en un gasto que se paga en casa. Pierden las familias con ingreso inestable y la niñez que falta o se avergüenza por no llevar lo pedido; la escuela traslada a las familias costos que corresponden al Estado sin que nadie lo decida abiertamente.",
   "ejes": [
    {
     "e": "INC",
     "p": true,
     "pq": "El eje Inclusión advierte que no basta con incorporar a todos a la escuela: si una o uno falta o no participa por motivos de clase, no están incluidos todos. Los cobros y materiales exigidos funcionan como una barrera para el aprendizaje y la participación ubicada en la escuela, no en la niñez ni en sus familias."
    }
   ],
   "prob": [
    "Si la escuela pública es gratis, ¿por qué en casa hay que pagar para venir?",
    "¿Cómo se siente una niña o un niño que no puede llevar lo que pidieron? ¿Qué pasa en el grupo?",
    "¿Qué podríamos hacer o conseguir entre todos sin que cada familia tenga que comprarlo?"
   ],
   "iv": "El colectivo revisa con familias y CEAP todo lo que la escuela pide, elimina lo prescindible y organiza un intercambio comunitario de útiles y uniformes; niñas y niños redactan una carta a la autoridad sobre lo que le corresponde al Estado.",
   "pot": [
    "CEAP y recursos de La Escuela es Nuestra para gastos que hoy pagan las familias",
    "Intercambio o trueque de útiles, uniformes y ropa entre familias",
    "Becas que ya llegan a la escuela (por ejemplo, Beca Universal Rita Cetina, ampliada a primaria según prensa)",
    "Materiales del entorno y reutilizados para los proyectos",
    "Docentes y familias que ya organizan colectas solidarias sin señalar a nadie",
    "Libros de texto gratuitos como base que no requiere compra"
   ],
   "ind": [
    "Qué cobros y materiales se pidieron en el ciclo y quién los decide (dirección, CEAP, asociación de familias): revisión en el CTE con la lista completa",
    "Cómo viven las familias los cobros: asamblea en horario accesible, sin preguntar ingresos ni señalar a nadie",
    "Qué opinan niñas y niños de lo que se pide: asamblea de aula con una codificación (una niña que no lleva el material)",
    "Qué programas llegan realmente y a quién: dirección y familias"
   ],
   "al": ""
  },
  "S02": {
   "t": "Trabajo de niñas y niños que compite con la escuela",
   "n": "N01",
   "sl": "Niñas y niños trabajan en el campo, el comercio, la calle o el taller familiar porque el ingreso adulto no alcanza o la temporada lo exige, y la escuela responde con faltas, sanciones o calificaciones bajas. Ganan quienes compran trabajo barato y un calendario escolar que no se mueve; pierden el descanso, la salud y la trayectoria escolar de la niñez, mientras su trabajo se nombra como «ayuda» o como «flojera para estudiar».",
   "ejes": [
    {
     "e": "INC",
     "p": true,
     "pq": "El eje Inclusión señala que si falta una o uno por motivos de clase, no están incluidos todos. Un calendario y unas sanciones que castigan el trabajo de temporada son barreras para el aprendizaje y la participación que están en la escuela, no en la niña o el niño."
    },
    {
     "e": "VS",
     "p": false,
     "pq": "Vida saludable incluye la prevención de accidentes y enfermedades. El trabajo infantil expone al calor, a herramientas, agroquímicos o tránsito, y reduce el descanso que el cuerpo necesita."
    }
   ],
   "prob": [
    "¿Qué trabajos hacen las niñas y los niños de aquí y qué aprenden al hacerlos?",
    "¿Por qué algunas niñas y niños tienen que trabajar y otros no? ¿Quién gana con ese trabajo?",
    "¿Qué trabajo es ayudar y qué trabajo es peligroso o no deja estudiar ni descansar?"
   ],
   "iv": "Un proyecto que lleva al aula los saberes del oficio (cuentas del mercado, ciclo del cultivo), acuerda con las familias tareas y un calendario que no castiguen la temporada, y prepara con la dirección una exigencia de apoyos para que ninguna niña o niño haga trabajo peligroso.",
   "pot": [
    "Saberes del oficio: cálculo, medición, trato con clientes, ciclos agrícolas",
    "Familias que se turnan el cuidado del puesto o la parcela",
    "Organizaciones de productores, comerciantes o cooperativas",
    "Becas y programas que llegan a la escuela",
    "Docentes que ya flexibilizan tareas en temporada"
   ],
   "ind": [
    "Tipo de trabajo, temporada y horas, sin nombres: conversación con familias y recorrido por el mercado o el campo",
    "Cómo lo viven niñas y niños (qué les gusta, qué les cansa): asamblea de aula con dibujo, cuidando que nadie quede expuesto",
    "Si alguna tarea es peligrosa (químicos, maquinaria, cargas, noche, calle): no se investiga; si aparece un indicio, va a la ruta de protección",
    "Qué hace hoy la escuela con las faltas de temporada: CTE"
   ],
   "al": "Si un indicio apunta a trabajo peligroso o que impide asistir (químicos, maquinaria, cargas pesadas, trabajo nocturno o en la calle sin adultos) de una niña o un niño en particular: no investigar, no entrevistar, no confrontar; avisar hoy a la dirección y seguir el protocolo estatal. La dirección da aviso a la Procuraduría de Protección de Niñas, Niños y Adolescentes, como obliga la Ley General de los Derechos de Niñas, Niños y Adolescentes. Si el trabajo peligroso es una condición colectiva (por ejemplo, temporada de corte con agroquímicos), se emite un aviso institucional en el PEMC a la autoridad competente y la ficha se trabaja en el aula solo en clave de derechos, sin relatos de casos. Nada de esto entra a la ficha, al código ni al Word."
  },
  "S03": {
   "t": "Trabajar mucho y vivir al día",
   "n": "N01",
   "sl": "Madres y padres trabajan jornadas largas, informales o con traslados de horas y, aun así, el ingreso no alcanza; el tiempo para acompañar a la niñez se reduce. Ganan los empleadores y las cadenas que pagan poco y sin prestaciones; pierden las familias, a quienes la escuela suele leer como «desinteresadas» cuando no llegan a reuniones o no ayudan con las tareas.",
   "ejes": [
    {
     "e": "INC",
     "p": true,
     "pq": "Las familias quedan fuera de la vida escolar por motivos de clase: reuniones en horario laboral, tareas que suponen un adulto disponible y avisos que no llegan son barreras para el aprendizaje y la participación. Si una familia no puede participar, no están incluidos todos."
    },
    {
     "e": "PC",
     "p": false,
     "pq": "Pensamiento crítico pide interrogar lo que pasa inadvertido porque se considera normal. La explicación «no les interesa» oculta una estructura de trabajo precario; la ficha mueve la mirada de la culpa individual a las causas."
    }
   ],
   "prob": [
    "¿En qué trabajan las personas de nuestras familias y cuántas horas al día?",
    "¿Por qué hay gente que trabaja todo el día y aun así no le alcanza?",
    "¿Cómo podría la escuela organizarse con los horarios reales de nuestras familias?"
   ],
   "iv": "Niñas y niños investigan los trabajos de la comunidad (entrevistas, el día de una persona trabajadora, cálculo de traslados) y el colectivo acuerda reuniones en horarios posibles, tareas que no suponen un adulto libre y un reconocimiento público al trabajo de las familias.",
   "pot": [
    "Redes de vecinas y familiares que se apoyan con horarios",
    "Oficios y saberes laborales de las familias",
    "Organizaciones de comerciantes, cooperativas o sindicatos",
    "Familias que ya se turnan para recoger a niñas y niños",
    "Comités vecinales"
   ],
   "ind": [
    "Horarios reales y traslados de las familias, sin datos de ingreso: encuesta breve en la inscripción o en asamblea",
    "Qué explicación circula en el colectivo docente: diálogo en el CTE con esta ficha",
    "Qué cambios en la escuela facilitarían su participación: asamblea en horario accesible o mensaje de voz",
    "Quién cuida a niñas y niños mientras los adultos trabajan: si aparece, explorar también el tema de cuidados"
   ],
   "al": ""
  },
  "S04": {
   "t": "Ultraprocesados más a la mano que la comida propia",
   "n": "N02",
   "sl": "Dentro de la escuela ya está prohibida la venta de productos con sellos, pero afuera, en la tienda y en la casa, los ultraprocesados y las bebidas azucaradas son lo más barato, lo más rápido y lo más anunciado, y el agua para beber no siempre está disponible. Ganan las empresas que producen y anuncian esos productos; pierden la salud y el gusto de la niñez, mientras la explicación que circula culpa a las madres.",
   "ejes": [
    {
     "e": "VS",
     "p": true,
     "pq": "El eje Vida saludable reconoce que los principales problemas de salud del alumnado están determinados por condiciones que causan desnutrición, sobrepeso y obesidad, y promueve la alimentación saludable."
    },
    {
     "e": "PC",
     "p": false,
     "pq": "Pensamiento crítico pide interrogar lo que parece normal y oponerse a la desigualdad: aquí, la publicidad y el mercado que hacen cotidiano lo ultraprocesado y que reparten de forma desigual quién puede comer fresco."
    }
   ],
   "prob": [
    "¿Por qué las papitas y el refresco son más fáciles de conseguir que una fruta o un vaso de agua limpia?",
    "¿Quién gana dinero cuando comemos esos productos y quién se enferma?",
    "¿Qué comían nuestras abuelas y abuelos a nuestra edad y qué podríamos recuperar?"
   ],
   "iv": "Un proyecto con familias que investiga etiquetas y anuncios, recupera recetas locales baratas y rápidas, gestiona agua para beber en la escuela y acuerda con los vendedores cercanos otra oferta a la salida.",
   "pot": [
    "Recetas y saberes alimentarios de las abuelas",
    "Huertos, milpa, mercados y tianguis",
    "Lineamientos de alimentos vigentes como herramienta de exigencia",
    "Vendedores cercanos dispuestos a cambiar su oferta",
    "Resultados de Vive Saludable de la escuela (agregados)",
    "Comité de salud o CEAP"
   ],
   "ind": [
    "Qué se vende dentro y fuera de la escuela: recorrido con niñas y niños (fotovoz) y revisión en el CTE",
    "Si la escuela tiene los resultados de Vive Saludable y qué dicen, sin datos individuales: dirección",
    "Por qué las familias eligen ese lonche (precio, tiempo, gusto): conversación con madres y padres en horario accesible, sin culpas",
    "Si hay agua para beber durante la jornada: dirección y CEAP"
   ],
   "al": ""
  },
  "S05": {
   "t": "Hambre donde sí hay alimentos",
   "n": "N02",
   "sl": "En comunidades que siembran, pescan o venden alimentos, y en ciudades con abundancia de comida, hay niñas y niños que llegan sin comer, comen poco o crecen menos de lo que podrían. Ganan los intermediarios y mercados que se quedan con el valor de lo producido; pierde la niñez de las familias productoras y empobrecidas, sobre todo indígena y rural, cuya hambre se explica como descuido y no como desigualdad.",
   "ejes": [
    {
     "e": "VS",
     "p": true,
     "pq": "Vida saludable parte de que los principales problemas de salud del alumnado están determinados por condiciones que causan desnutrición, sobrepeso y obesidad, y promueve la alimentación saludable como derecho."
    },
    {
     "e": "INC",
     "p": false,
     "pq": "El hambre se concentra por motivos de clase, etnia y territorio. Quien llega sin comer no participa en igualdad: es una barrera para el aprendizaje que está en las condiciones del contexto, no en la niña o el niño."
    }
   ],
   "prob": [
    "¿Qué sembramos, pescamos o vendemos aquí y a dónde se va?",
    "¿Por qué quien produce la comida a veces no tiene suficiente para comer?",
    "¿Qué podemos hacer entre todas y todos para que nadie aprenda con hambre?"
   ],
   "iv": "La escuela organiza con familias y CEAP una alimentación escolar con productos locales (huerto, milpa escolar, compras a productores de la comunidad), y niñas y niños documentan el camino «de la milpa a la mesa» para exigir a las instancias de alimentación y desarrollo social lo que corresponde.",
   "pot": [
    "Milpa, huertos y productores locales",
    "Servicio de alimentación escolar u horario extendido, si existe",
    "Cocinas o comedores comunitarios",
    "Trueque y redes de apoyo entre familias",
    "Colectivos de mujeres y tequio"
   ],
   "ind": [
    "Si el hambre es diaria, de temporada (secas) o de fin de quincena: conversación con familias, sin señalar, y con el comité de salud",
    "Qué programas de alimentación llegan y si funcionan: dirección y CEAP",
    "Qué piensan niñas y niños de la comida de la escuela y de casa: asamblea con dibujo, sin preguntar a nadie si comió",
    "Datos agregados de talla y peso de Vive Saludable: dirección"
   ],
   "al": "Si un indicio apunta a hambre severa o desnutrición visible de una niña o un niño en particular: no registrar su nombre ni preguntarle frente al grupo; avisar hoy a la dirección para que gestione atención con el centro de salud y el DIF y, si hay otras señales de desprotección, dé aviso a la Procuraduría de Protección según el protocolo estatal. Mientras tanto, la escuela asegura alimento durante la jornada sin exponer a la niña o el niño. Solo se guarda un recordatorio de aviso pendiente, sin categoría."
  },
  "S06": {
   "t": "Saberes alimentarios propios desplazados",
   "n": "N02",
   "sl": "La milpa, los quelites, el maíz nativo, la pesca o la recolección se nombran como «comida de pobres» o «de antes», mientras lo empaquetado se presenta como moderno, y la escuela a veces refuerza esa jerarquía en mensajes, premios y festejos. Ganan quienes venden lo industrializado y una idea colonial de progreso; pierden las personas mayores que guardan esos saberes, la soberanía alimentaria de la comunidad y la salud de la niñez.",
   "ejes": [
    {
     "e": "IC",
     "p": true,
     "pq": "Interculturalidad crítica busca una interacción simétrica con diversas culturas, saberes y lenguas, y critica la jerarquía colonial que llama «atraso» a los saberes propios. La asimetría está en qué comida y qué saber se consideran valiosos."
    },
    {
     "e": "VS",
     "p": false,
     "pq": "Vida saludable promueve la alimentación saludable y reconoce que salud humana y ambiente dependen uno del otro: la milpa y la comida local son a la vez alimentación saludable y cuidado del territorio."
    }
   ],
   "prob": [
    "¿Qué comidas de nuestra comunidad conocemos y quién sabe prepararlas?",
    "¿Por qué algunas personas dicen que la tortilla o los quelites son «comida de pobres»? ¿Quién lo dice y a quién le conviene?",
    "¿Qué podemos aprender de las abuelas y los abuelos sobre comer bien?"
   ],
   "iv": "Niñas y niños elaboran con personas mayores un recetario o calendario alimentario comunitario, bilingüe cuando hay lengua originaria, que lleva esas comidas al menú escolar y a una muestra abierta a la comunidad.",
   "pot": [
    "Personas mayores sabedoras de cocina, cultivo y recolección",
    "Milpa, huertos y semillas nativas",
    "Medicina tradicional ligada a plantas",
    "Nombres de plantas y comidas en la lengua de la comunidad",
    "Fiestas con comida tradicional",
    "Colectivos de cocineras"
   ],
   "ind": [
    "Qué saberes alimentarios siguen vivos y quién los porta: recorrido y entrevistas de niñas y niños a personas mayores",
    "Variante y escritura de los nombres en la lengua: docente hablante de la zona",
    "Qué mensajes da la escuela sobre la comida (carteles, premios, festejos): revisión en el CTE",
    "Cómo valoran esa comida las familias jóvenes: asamblea"
   ],
   "al": ""
  },
  "S07": {
   "t": "Vista, dientes y salud sin atención cercana",
   "n": "N02",
   "sl": "Niñas y niños ven mal el pizarrón, tienen dolor de muelas o enfermedades que no se atienden porque el servicio de salud está lejos, no tiene personal o cuesta, y los lentes o el dentista no están a su alcance. Gana un sistema que detecta (las brigadas miden) pero no siempre atiende; pierde la niñez, cuyo dolor o mala visión se confunde con distracción o con «no aprender».",
   "ejes": [
    {
     "e": "VS",
     "p": true,
     "pq": "Vida saludable abarca la prevención de enfermedades y el cuidado de la salud; la salud visual y bucal son condiciones básicas para vivir y aprender, y su atención es parte del derecho a la salud."
    }
   ],
   "prob": [
    "¿Qué pasa en clase cuando alguien no ve bien o le duele una muela?",
    "¿Por qué a unas personas las atienden pronto y a otras no?",
    "¿Qué podemos pedir, y a quién, para que la salud llegue a nuestra escuela?"
   ],
   "iv": "Con el centro de salud y las familias, niñas y niños hacen una campaña de cuidado bucal y visual, la escuela gestiona en colectivo que los resultados de las brigadas se conviertan en lentes y consultas, y mientras tanto se acomoda el aula (lugar, tamaño de letra).",
   "pot": [
    "Brigadas de Vive Saludable y su registro",
    "Centro de salud o servicios del sistema público cercanos",
    "DIF y servicios aliados que sí responden",
    "Medicina tradicional como saber, sin sustituir la atención",
    "Familias organizadas para gestionar"
   ],
   "ind": [
    "Si la escuela recibió resultados de Vive Saludable y qué siguió después, en datos agregados: dirección",
    "Distancia, horarios y costo del servicio de salud: familias y comité de salud",
    "Qué ajustes de aula ya se hacen: CTE (vínculo con el Paso 8)",
    "Qué sienten niñas y niños cuando no ven o les duele algo: asamblea, sin señalar a nadie"
   ],
   "al": ""
  },
  "S08": {
   "t": "Sustancias normalizadas alrededor de la niñez",
   "n": "N02",
   "sl": "Alcohol, tabaco y vapeadores se venden cerca de la escuela y se consumen frente a niñas y niños en fiestas y calles; en Fase 5 aparecen vapeadores, aunque su venta está prohibida desde 2025. Ganan quienes venden a menores y una publicidad que asocia el consumo con diversión o madurez; pierde la niñez, que aprende a verlo como normal, y la comunidad, que carga con sus efectos.",
   "ejes": [
    {
     "e": "VS",
     "p": true,
     "pq": "Vida saludable incluye la prevención de adicciones; el entorno de consumo y venta a menores es una condición de riesgo para la salud de la niñez."
    },
    {
     "e": "PC",
     "p": false,
     "pq": "Pensamiento crítico pide cuestionar lo que pasa inadvertido porque se considera normal: el consumo en fiestas, la publicidad y una venta ilegal que se tolera."
    }
   ],
   "prob": [
    "¿Qué cosas venden cerca de la escuela que no son para niñas y niños? ¿Por qué se venden igual?",
    "¿Por qué en los anuncios y en las fiestas parece que tomar o vapear es divertido?",
    "¿Qué otras formas de convivir y celebrar tenemos en la comunidad?"
   ],
   "iv": "En Fases 4 y 5, niñas y niños analizan anuncios y mensajes, proponen con la comunidad celebraciones y espacios sin consumo frente a la niñez, y la dirección gestiona por la vía institucional que se cumpla la prohibición de venta a menores.",
   "pot": [
    "Estrategia en el aula: prevención de adicciones (guía SEP para docentes y familias)",
    "Deporte, juego y espacios comunitarios",
    "Tradiciones festivas con lugar para la niñez sin consumo",
    "Comité de salud y madres y padres preocupados",
    "Jóvenes y personas referentes"
   ],
   "ind": [
    "Qué se vende y dónde, cerca de la escuela: recorrido del colectivo (no con niñas y niños si hay riesgo)",
    "Cómo ven niñas y niños el consumo en su entorno: asamblea con una codificación (una fiesta), sin preguntar por su casa",
    "Si hay vapeadores en Fase 5 y cómo se consiguen: CTE y familias, sin revisar mochilas ni señalar",
    "Qué apoyos ofrecen los servicios de salud de la zona: dirección"
   ],
   "al": "Si un indicio apunta a que una niña o un niño en particular consume sustancias o es inducido por adultos a consumir o vender: no investigar ni confrontar; avisar hoy a la dirección y seguir el protocolo estatal. La dirección coordina con salud y, si hay desprotección o inducción por adultos, da aviso a la Procuraduría de Protección. Si la venta cercana está ligada a grupos de riesgo, se actúa con cautela: no se hacen mapeos ni denuncias desde el aula y la gestión va por la vía institucional (PEMC)."
  },
  "S09": {
   "t": "Noches cortas, cuerpos quietos: sueño, pantallas y movimiento",
   "n": "N02",
   "sl": "Niñas y niños duermen poco, se mueven poco y pasan horas frente a pantallas diseñadas para retener su atención, en casas sin espacio y calles donde no se puede jugar. Ganan las plataformas que viven del tiempo de pantalla; pierden el descanso, el cuerpo y la atención de la niñez, y la explicación suele culpar a las familias o a la propia niña o niño.",
   "ejes": [
    {
     "e": "VS",
     "p": true,
     "pq": "Vida saludable abarca el cuidado del cuerpo y la prevención de enfermedades; el sueño suficiente y la actividad física son condiciones de salud que el eje promueve."
    },
    {
     "e": "PC",
     "p": false,
     "pq": "Pensamiento crítico pide interrogar la realidad y lo que parece normal: cómo funcionan las aplicaciones que capturan la atención y quién gana con que no se suelten."
    }
   ],
   "prob": [
    "¿Cuántas horas dormimos y qué nos quita el sueño?",
    "¿Por qué cuesta tanto dejar el celular o la tele? ¿Quién gana con que no los soltemos?",
    "¿Dónde y a qué podemos jugar y movernos aquí?"
   ],
   "iv": "Niñas y niños investigan su propio día (diario anónimo de sueño y movimiento), descubren cómo las aplicaciones retienen la atención y acuerdan con familias y escuela pausas activas, juegos recuperados de las personas mayores y un lugar para moverse.",
   "pot": [
    "Juegos tradicionales y de calle",
    "Espacios comunitarios disponibles",
    "Educación física y pausas activas",
    "Usos creativos de lo digital",
    "Asambleas con familias previstas por el Acuerdo 09/09/26 sobre celulares"
   ],
   "ind": [
    "Horas de sueño y de pantalla del grupo: diario de un día en el aula, sin nombres",
    "Qué alternativas de juego y movimiento hay: recorrido con niñas y niños (fotovoz)",
    "Cómo lo ven las familias: asamblea (puede ser la que pide el Acuerdo de celulares)",
    "Contacto con adultos desconocidos en línea: no se indaga aquí; ante un indicio, se sigue la ruta de protección"
   ],
   "al": "Si al trabajar el tema aparece un indicio de contacto de un adulto desconocido en línea con una niña o un niño en particular (Fases 4 y 5): no investigar ni pedir capturas; avisar hoy a la dirección y seguir el protocolo estatal. En el aula solo se trabaja autocuidado digital en general."
  },
  "S10": {
   "t": "Agua desigual: tandeo, pipas, escuela sin agua",
   "n": "N03",
   "sl": "El agua llega por tandeo, en pipa o no llega, a los hogares y al plantel: sanitarios sin agua, bebederos secos, manos sin lavar y días sin clase. Ganan quienes concentran concesiones, pozos o el negocio de las pipas, y las zonas que sí reciben agua continua; pierden las colonias y localidades periféricas, la salud de la niñez y su tiempo de clase.",
   "ejes": [
    {
     "e": "VS",
     "p": true,
     "pq": "Vida saludable incluye la prevención de enfermedades y plantea que salud humana y ambiente dependen uno del otro: sin agua no hay higiene, hidratación ni sanitarios dignos."
    },
    {
     "e": "INC",
     "p": false,
     "pq": "El acceso al agua se reparte por clase y territorio. Cuando se suspenden clases o los sanitarios no funcionan, la niñez de las zonas sin agua aprende menos días y en peores condiciones: es una barrera de contexto."
    }
   ],
   "prob": [
    "¿De dónde viene el agua que usamos en casa y en la escuela, y por qué a veces no llega?",
    "¿Por qué en unas colonias o comunidades hay agua todo el día y en otras no?",
    "¿Qué podemos hacer para cuidar, guardar y pedir el agua que necesitamos?"
   ],
   "iv": "Niñas y niños miden el agua que usa y que le falta a la escuela, diseñan con el CEAP una captación de lluvia o una mejora posible, y presentan con la comunidad una petición documentada a la autoridad del agua.",
   "pot": [
    "Comités de agua o vecinales y su memoria de gestiones",
    "Defensa del agua y del territorio",
    "Captación pluvial y saberes de manejo del agua (pozos, jagüeyes)",
    "CEAP y recursos de La Escuela es Nuestra para obras",
    "Familias con experiencia de gestión ante autoridades"
   ],
   "ind": [
    "Cuántos días al mes falta el agua en la escuela y qué se hace: dirección y CEAP",
    "Cómo llega el agua a las casas: mapa del agua elaborado con niñas y niños",
    "Quién decide la distribución (organismo operador, comité, concesiones): personas que han gestionado",
    "Qué saben niñas y niños del agua de su lugar: aula"
   ],
   "al": ""
  },
  "S11": {
   "t": "El agua que cargan las niñas",
   "n": "N03",
   "sl": "Donde el agua no llega a la casa, acarrearla, guardarla y administrarla recae sobre todo en mujeres y niñas, que pierden tiempo de juego, descanso y escuela. Gana un orden que da por natural que ellas carguen y que el servicio no llegue; pierden las niñas, cuya carga no se ve porque se nombra «ayudar en casa».",
   "ejes": [
    {
     "e": "IG",
     "p": true,
     "pq": "Igualdad de género pide no reproducir los modelos de desigualdad hacia las niñas y entender esa desigualdad como histórica, no como algo natural: el acarreo es trabajo asignado por sexo que les quita tiempo de juego y de escuela."
    },
    {
     "e": "VS",
     "p": false,
     "pq": "Vida saludable une salud y ambiente: cargas pesadas, agua de calidad incierta y menos descanso afectan el cuerpo de quienes acarrean."
    }
   ],
   "prob": [
    "¿Quién trae el agua a nuestra casa y cuánto tiempo le toma?",
    "¿Por qué casi siempre son las niñas y las mujeres las que cargan el agua?",
    "¿Cómo podríamos repartir ese trabajo y conseguir que el agua llegue más cerca?"
   ],
   "iv": "Niñas y niños miden el tiempo y el peso del acarreo y lo comparan entre niñas y niños, proponen en casa otro reparto y llevan a la asamblea o a la autoridad una propuesta de captación o toma cercana.",
   "pot": [
    "Colectivos de mujeres y redes de cuidado",
    "Comités de agua y asamblea",
    "Defensa del agua y captación de lluvia",
    "Padres y madres que ya comparten tareas",
    "Memoria de gestiones por el agua"
   ],
   "ind": [
    "Quién acarrea y cuánto tiempo: registro de un día hecho por niñas y niños, sin nombres, comparando niñas y niños",
    "Qué opinan las mujeres de la comunidad: reunión en horario accesible",
    "Qué gestiones ha habido por el agua: personas que gestionaron",
    "Si la carga afecta la asistencia: patrón de faltas por temporada (CTE)"
   ],
   "al": ""
  },
  "S12": {
   "t": "Tóxicos que enferman: plomo, humo, río, mina, agroquímicos",
   "n": "N03",
   "sl": "La comunidad vive cerca de algo que enferma (un río contaminado, una mina, campos fumigados, quemas o tiraderos) o, dentro de casa, con loza vidriada con plomo y humo de leña porque las alternativas cuestan más. Ganan las empresas y los mercados que trasladan el costo del daño a la comunidad o pagan poco por lo que ella produce; pierden la salud y la capacidad de aprender de la niñez, mientras el daño se vuelve paisaje: «así ha sido siempre».",
   "ejes": [
    {
     "e": "VS",
     "p": true,
     "pq": "Vida saludable plantea que la salud humana y el ambiente dependen uno del otro e incluye la prevención de enfermedades; la exposición a tóxicos es un problema de salud y de ambiente a la vez."
    },
    {
     "e": "PC",
     "p": false,
     "pq": "Pensamiento crítico pide interrogar lo que se ha vuelto normal y oponerse a la injusticia: quién produce el daño, quién lo paga y por qué se acepta. Es una contradicción territorial y de poder."
    }
   ],
   "prob": [
    "¿Qué hay en nuestro río, nuestro aire o nuestra tierra que antes no estaba?",
    "¿Quién gana con lo que contamina y quién se enferma?",
    "¿Qué saben las personas mayores del lugar y qué podemos hacer para cuidarnos y cuidarlo?"
   ],
   "iv": "Un proyecto de monitoreo comunitario hecho con niñas y niños (observación del río, mapa de humos o fumigaciones, prueba de alternativas como el esmalte sin plomo o la estufa ahorradora) que termina en una presentación pública y en una petición documentada a la autoridad ambiental o sanitaria.",
   "pot": [
    "Defensa del agua y del territorio",
    "Alfareras y alfareros que ya usan esmalte sin plomo; la artesanía como saber",
    "Universidades o personas investigadoras que han estudiado la zona",
    "Centro de salud",
    "Memoria de luchas y saberes ecológicos de personas mayores"
   ],
   "ind": [
    "Qué fuentes de daño reconoce la comunidad y desde cuándo: recorrido y entrevistas a personas mayores",
    "Si hay estudios o registros de salud o ambientales: dirección, centro de salud, autoridades",
    "Si la escuela está expuesta (fumigación cercana, humo): CTE",
    "Si el tema es seguro de tratar en público (conflicto con empresa o grupos): dirección y personas de confianza"
   ],
   "al": "Si niñas y niños quedan expuestos como condición colectiva (por ejemplo, fumigaciones junto a la escuela o en campos donde trabajan durante la temporada), la dirección emite un aviso institucional a la autoridad sanitaria o ambiental y lo registra en el PEMC; en el aula la ficha se trabaja en clave de derechos y prevención, sin relatos de niñas y niños. Si una niña o un niño presenta síntomas de intoxicación, se le atiende de inmediato y se avisa a la familia y al servicio de salud. Si el daño está en disputa con una empresa o con grupos armados, se actúa con cautela: no se mapean actores en público."
  },
  "S13": {
   "t": "Calor y sequía en el aula y en la milpa",
   "n": "N03",
   "sl": "Las sequías y el calor extremo se repiten: la milpa de temporal se pierde, el agua escasea y las aulas de lámina o sin sombra se vuelven insoportables. Ganan quienes pueden adaptarse (riego, edificios frescos, aire acondicionado); pierden las familias campesinas y las escuelas con menos recursos, que son las que menos contribuyen al cambio del clima.",
   "ejes": [
    {
     "e": "VS",
     "p": true,
     "pq": "Vida saludable plantea la interdependencia entre salud y ambiente e incluye la prevención de enfermedades: el calor extremo causa deshidratación y golpe de calor, y la pérdida de cosechas afecta la alimentación."
    }
   ],
   "prob": [
    "¿Cómo han cambiado el calor y la lluvia desde que nuestras abuelas y abuelos eran niños?",
    "¿Por qué el calor nos afecta más a nosotros que a otras escuelas o lugares?",
    "¿Qué podemos hacer para tener sombra, agua y frescura en la escuela y en la comunidad?"
   ],
   "iv": "Niñas y niños registran el clima local (temperatura en el aula, lluvias, calendario de la milpa con personas mayores) y la escuela, con el CEAP, pone en marcha acciones de adaptación: árboles, sombra, agua y horarios.",
   "pot": [
    "Calendario agrícola y saberes de lluvia de la comunidad",
    "Saberes de prevención ante desastres",
    "CEAP y La Escuela es Nuestra para sombra y ventilación",
    "Árboles nativos y viveros comunitarios",
    "Prácticas de captación de agua"
   ],
   "ind": [
    "Temperatura real de las aulas en temporada de calor: registro de niñas y niños con termómetro",
    "Cómo cambiaron la cosecha y el agua: entrevistas a personas mayores y productores",
    "Qué ajustes de horario o espacio ya se hacen: dirección y supervisión",
    "Si la escuela tiene un plan de protección civil para calor: dirección"
   ],
   "al": "Ante señales de golpe de calor o deshidratación de una niña o un niño: suspender la actividad, llevarla o llevarlo a la sombra, darle agua, avisar a la familia y al servicio de salud. Es atención inmediata, no un dato que se registre en la ficha."
  },
  "S14": {
   "t": "Territorio en transformación: megaproyecto, mina y despojo",
   "n": "N03",
   "sl": "Un megaproyecto, una mina, una carretera o un cambio de uso del suelo llega con promesas de empleo, pero transforma el agua, la tierra y la vida comunitaria, a veces sin consulta y dividiendo a las familias. Ganan empresas, inversionistas y quienes compran tierra barata; pierden las comunidades, sobre todo indígenas y campesinas, su territorio y sus decisiones, y la escuela queda en medio de la tensión.",
   "ejes": [
    {
     "e": "PC",
     "p": true,
     "pq": "Pensamiento crítico es la capacidad de interrogar la realidad y oponerse a la injusticia y la desigualdad: aquí, analizar quién decide sobre el territorio y a quién beneficia el «progreso»."
    },
    {
     "e": "IC",
     "p": false,
     "pq": "Interculturalidad crítica cuestiona la asimetría colonial entre la relación comunitaria con la tierra y la lógica que la trata como mercancía, y busca una interacción simétrica entre culturas y saberes."
    }
   ],
   "prob": [
    "¿Cómo era nuestro lugar antes y cómo es ahora? ¿Qué llegó y qué se fue?",
    "¿Quién decide lo que se construye en nuestra tierra y quién gana con eso?",
    "¿Qué queremos cuidar de nuestro territorio y cómo podemos decirlo?"
   ],
   "iv": "Niñas y niños reconstruyen con personas mayores el mapa y la historia del lugar, en la lengua de la comunidad si la hay, y presentan en asamblea lo que quieren cuidar, sin señalar a personas ni tomar partido en disputas que los expongan.",
   "pot": [
    "Asamblea y tequio",
    "Memoria de luchas y logros",
    "Defensa del agua y del territorio",
    "Lengua y nombres propios de los lugares",
    "Personas mayores y organizaciones de derechos"
   ],
   "ind": [
    "Qué cambió, desde cuándo y cómo lo nombra la comunidad: asamblea y personas de confianza",
    "Si el tema divide a las familias de la escuela y cómo tratarlo sin exponer a niñas y niños: CTE y dirección",
    "Si hubo consulta y qué se acordó: autoridades comunitarias",
    "Qué saben y sienten niñas y niños del cambio: dibujo del lugar «antes y ahora» en el aula"
   ],
   "al": "Si el conflicto por el territorio implica amenazas, violencia o presencia de grupos armados, se actúa con cautela: solo se registran efectos en la vida escolar, no se mapean actores ni lugares y el proyecto se limita a memoria y cuidado. Si una niña, un niño o su familia está en riesgo, avisar hoy a la dirección y seguir el protocolo estatal."
  },
  "S15": {
   "t": "Territorio turístico: empleo que llega, costa que se cierra",
   "n": "N03",
   "sl": "El turismo trae empleo, pero con jornadas largas y turnos nocturnos, vivienda cara y playas, cenotes o centros que se cierran o se venden a visitantes. Ganan hoteles, inmobiliarias e inversionistas; pierden las familias que sostienen el servicio, muchas llegadas de otros estados, y la niñez, que se queda sin espacio propio, sin adultos en casa y más expuesta a riesgos.",
   "ejes": [
    {
     "e": "PC",
     "p": true,
     "pq": "Pensamiento crítico pide interrogar la realidad y oponerse a la desigualdad: aquí, preguntar para quién es el territorio y por qué la riqueza que genera no se reparte."
    },
    {
     "e": "INC",
     "p": false,
     "pq": "El turismo reparte el espacio y los derechos por clase y origen: las familias que llegaron de otros estados a sostener el servicio viven en la periferia y su niñez queda fuera de espacios de su propio lugar."
    }
   ],
   "prob": [
    "¿Para quién es la playa (o el cenote, o el centro)? ¿Podemos ir cuando queremos?",
    "¿Quién trabaja para que los turistas estén cómodos y cómo vive esa gente?",
    "¿Qué lugares de aquí queremos que sigan siendo de todas y todos?"
   ],
   "iv": "Niñas y niños investigan los espacios públicos del lugar y quién puede usarlos, recuperan la historia de la comunidad antes del turismo y proponen a la autoridad municipal un espacio o un acceso para la niñez.",
   "pot": [
    "Cooperativas pesqueras o de servicios locales",
    "Organizaciones vecinales y comités",
    "Espacios comunitarios disponibles",
    "Memoria de la comunidad antes del turismo",
    "Bilingüismo de quienes trabajan con visitantes"
   ],
   "ind": [
    "Horarios de trabajo de las familias y quién cuida: encuesta breve de horarios, sin datos de ingreso",
    "Qué espacios públicos hay y cuáles se cerraron: recorrido y mapa con niñas y niños",
    "De dónde llegaron las familias: inscripción y asamblea",
    "Riesgos para niñas y niños en zonas turísticas: dirección, con la ruta estatal; nunca indagando casos"
   ],
   "al": "Si aparece un indicio de explotación sexual de una niña, un niño o adolescente (Fases 4 y 5: regalos o dinero de adultos, contacto con visitantes o intermediarios, ausencias inexplicables): no investigar, no entrevistar, no confrontar; avisar hoy a la dirección y seguir el protocolo estatal. La dirección da aviso a la Procuraduría de Protección y, si el riesgo es inminente, a emergencias (911). Nada se registra en la ficha, el código ni el Word."
  },
  "S16": {
   "t": "Reconstrucción desigual después del desastre",
   "n": "N03",
   "sl": "Tras un huracán, una inundación o un sismo, la ayuda y la reconstrucción llegan antes a unos lugares que a otros, la escuela vuelve a clases con daños y algunas familias pierden casa o trabajo y se van. Ganan quienes tienen contactos, recursos o seguros para recuperarse; pierden las familias más pobres y la niñez, que acumula días sin clase y aulas sin reparar.",
   "ejes": [
    {
     "e": "VS",
     "p": true,
     "pq": "Vida saludable incluye la prevención de accidentes y enfermedades y la relación entre salud y ambiente; después de un desastre hay riesgos de agua, salud e infraestructura que la escuela ayuda a prevenir."
    },
    {
     "e": "PC",
     "p": false,
     "pq": "Pensamiento crítico pide interrogar la realidad y oponerse a la injusticia: por qué la ayuda y la reconstrucción se reparten de forma desigual y quién decide cómo se reconstruye."
    }
   ],
   "prob": [
    "¿Qué pasó en nuestra comunidad con el huracán o la inundación y qué nos ayudó a salir adelante?",
    "¿Por qué la ayuda llegó a unos lugares antes que a otros?",
    "¿Qué sabemos hacer para prevenir y cuidarnos la próxima vez?"
   ],
   "iv": "Niñas y niños documentan con la comunidad lo que falta reparar, elaboran con los saberes locales un plan escolar y comunitario de prevención y presentan a la autoridad lo pendiente de la reconstrucción.",
   "pot": [
    "Saberes de prevención ante desastres",
    "Solidaridad, brigadas y tequio",
    "Protección civil y comités",
    "CEAP para reparaciones",
    "Memoria de desastres anteriores"
   ],
   "ind": [
    "Daños pendientes del plantel y de las viviendas: dirección, CEAP y autoridades",
    "Qué familias se fueron y cuáles llegaron: control escolar, sin nombres en la ficha",
    "Qué saberes de prevención tiene la comunidad: personas mayores, pescadores, campesinos",
    "Cómo están niñas y niños emocionalmente: observación en el aula; si hay malestar, explorar también el tema de ánimo y duelo"
   ],
   "al": "Si una niña o un niño perdió a un familiar o muestra malestar intenso tras el desastre (por ejemplo, ideas de muerte o autolesión), avisar hoy a la dirección para derivar a atención de salud o psicológica y seguir el protocolo estatal. No se piden relatos del desastre a niñas y niños frente al grupo."
  },
  "S17": {
   "t": "La pérdida sin lugar en la escuela tras el desastre",
   "n": "N03",
   "sl": "Después del desastre, la escuela vuelve a la normalidad lo antes posible y la pérdida (la casa, la cosecha, el animal, la persona) no tiene un lugar para nombrarse, aunque la comunidad tiene formas propias de recordar y acompañar. Gana la prisa por «recuperar el programa»; pierde la niñez, que carga sola el miedo y el duelo, y la escuela, que deja fuera los rituales, cantos y relatos con que la comunidad elabora lo vivido.",
   "ejes": [
    {
     "e": "AE",
     "p": true,
     "pq": "Artes y experiencias estéticas impulsa la expresión sensible del mundo y la relación con las manifestaciones culturales, con una dimensión reflexiva y afectiva. Los rituales, cantos y relatos de la comunidad son la forma de dar lugar a la pérdida; se valida porque esas prácticas existen, no por el duelo."
    },
    {
     "e": "VS",
     "p": false,
     "pq": "Vida saludable incluye el cuidado del bienestar y la prevención; después de un desastre, acompañar el miedo y el duelo es parte del cuidado de la salud de la niñez."
    }
   ],
   "prob": [
    "¿Qué cosas extrañamos de antes de el huracán o la inundación?",
    "¿Cómo recuerda y acompaña nuestra comunidad cuando pierde algo o a alguien?",
    "¿Qué podemos crear juntos para recordar y sentirnos mejor?"
   ],
   "iv": "Un proyecto artístico de memoria con la comunidad (mural, ofrenda, libro de relatos o canción) acompañado por quienes portan esos rituales, en el que nadie está obligado a contar lo que vivió.",
   "pot": [
    "Fiesta, danza y música",
    "Narrativa oral y memoria de las personas mayores",
    "Rituales, ofrendas y rezos de la comunidad",
    "Artistas y artesanos locales",
    "Servicios de apoyo psicosocial que sí responden"
   ],
   "ind": [
    "Qué prácticas de memoria y acompañamiento tiene la comunidad: personas mayores, autoridades tradicionales, iglesias",
    "Cómo están niñas y niños (miedo, sueño, juego): observación en el aula y el recreo, sin entrevistas de casos",
    "Qué apoyos psicosociales hay: dirección, DIF, salud",
    "Si las familias quieren que la escuela trate el tema y cómo: asamblea"
   ],
   "al": "Si una niña o un niño muestra malestar intenso (ideas de muerte, autolesión, aislamiento total) o perdió a un familiar, avisar hoy a la dirección para derivar a atención de salud o psicológica y seguir el protocolo estatal. En el aula se trabaja con la expresión colectiva, no con relatos individuales, y nadie está obligado a contar."
  },
  "S18": {
   "t": "Trayectos peligrosos para llegar a la escuela",
   "n": "N03",
   "sl": "Para llegar a la escuela, niñas y niños caminan por carreteras sin banqueta, cruzan avenidas, ríos o terrenos solos, o viajan largos tramos en transporte inseguro. Gana un trazo de calles y caminos pensado para vehículos y mercancías, no para la niñez; pierden quienes viven más lejos o en zonas sin transporte, que llegan cansados, faltan en temporada de lluvias o arriesgan su integridad.",
   "ejes": [
    {
     "e": "VS",
     "p": true,
     "pq": "Vida saludable incluye la prevención de accidentes; el tránsito vehicular, los cruces y los ríos crecidos en el trayecto son riesgos para la integridad de la niñez."
    }
   ],
   "prob": [
    "¿Por dónde venimos a la escuela y qué partes del camino nos dan miedo?",
    "¿Para quién están hechas las calles y los caminos: para los coches o para las personas?",
    "¿Qué podemos proponer para que todas y todos lleguemos seguros?"
   ],
   "iv": "Niñas y niños y familias identifican los puntos de riesgo vial del camino a la escuela y proponen a la autoridad municipal o comunitaria señalización, un cruce o reductores, junto con acuerdos para caminar acompañados en grupo.",
   "pot": [
    "Familias que ya caminan en grupo y madres y padres que comparten el cuidado",
    "Comités vecinales y autoridad comunitaria",
    "Transporte comunitario o rutas organizadas",
    "Protección civil",
    "Espacios comunitarios cercanos"
   ],
   "ind": [
    "Trayectos y tiempos: dibujo del camino a la escuela en el aula, sin datos de domicilio",
    "Puntos de riesgo vial: recorrido del colectivo con familias",
    "Si hubo accidentes o sustos recientes: dirección y familias",
    "Si la inseguridad del trayecto es un tema seguro de tratar: dirección"
   ],
   "al": "Si una niña o un niño refiere que un adulto la o lo sigue, acosa o intenta llevárselo en el trayecto: avisar hoy a la dirección y seguir el protocolo estatal; si el riesgo es inminente, llamar a emergencias (911). En contextos de violencia comunitaria no se hacen mapas de riesgo con niñas y niños."
  },
  "S19": {
   "t": "Niñas y niños que pasan el día sin adultos",
   "n": "N04",
   "sl": "Las jornadas laborales largas, los traslados de horas y la falta de servicios públicos de cuidado dejan a muchas niñas y niños solos o a cargo de hermanos apenas mayores. Ganan los empleadores y un sistema que no paga el cuidado; pierden las niñas y los niños, expuestos a accidentes, a comer lo que haya y a pantallas sin compañía, y las madres, que cargan con la culpa.",
   "ejes": [
    {
     "e": "IG",
     "p": true,
     "pq": "El eje pide cuestionar las prácticas institucionalizadas. La falta de un sistema de cuidados descarga el cuidado en las mujeres y en las hermanas mayores, una desigualdad histórica."
    },
    {
     "e": "VS",
     "p": false,
     "pq": "El eje incluye la prevención de accidentes y la alimentación saludable, riesgos que aumentan cuando la niñez pasa tiempo sin adultos."
    }
   ],
   "prob": [
    "¿Quién nos cuida cuando no estamos en la escuela?",
    "¿Qué hacemos cuando estamos solos y qué nos gustaría hacer?",
    "¿Quién debería ayudar a las familias a cuidar a las niñas y los niños?"
   ],
   "iv": "Tejer con familias y vecinos una red de cuidado comunitario (acompañamiento a la salida, espacios para la tarea y el juego) y llevar a las autoridades la exigencia de servicios de cuidado.",
   "pot": [
    "Redes de vecinas",
    "Comités vecinales",
    "Bibliotecas y espacios comunitarios",
    "Horario extendido de La Escuela es Nuestra",
    "Abuelas cuidadoras"
   ],
   "ind": [
    "Con niñas y niños: qué hacen en las horas sin adultos y qué les preocupa.",
    "Con madres y padres, en un horario accesible: qué apoyos necesitarían.",
    "Con las autoridades municipales: qué servicios de cuidado o espacios hay."
   ],
   "al": "Si una niña o un niño en particular pasa largos periodos sin ningún adulto responsable, sin comer o en riesgo, se avisa a la dirección para que, junto con la familia y sin culparla, se siga el protocolo y, si hace falta, se dé aviso a la Procuraduría de Protección de Niñas, Niños y Adolescentes."
  },
  "S20": {
   "t": "Las niñas sostienen cuidados y quehaceres",
   "n": "N04",
   "sl": "Cuidar hermanos, enfermos o abuelos, cocinar y limpiar recae en las niñas, mientras a los niños se les deja libres para jugar o estudiar. Gana un orden que descarga en las mujeres, y también en las niñas, el trabajo de cuidar sin reconocimiento ni apoyo del Estado; pierden las niñas, que llegan cansadas, faltan o no tienen tiempo para jugar.",
   "ejes": [
    {
     "e": "IG",
     "p": true,
     "pq": "El eje pide entender la desigualdad de género como histórica y no natural. La división sexual del trabajo de cuidados es su expresión más cotidiana, y la brecha de trabajo no remunerado entre mujeres y hombres empieza en la infancia."
    }
   ],
   "prob": [
    "¿Quién hace qué en nuestras casas? ¿Por qué?",
    "¿Cuánto tiempo tienen para jugar las niñas y cuánto los niños?",
    "¿Cómo podríamos repartir los cuidados para que todas y todos tengamos tiempo de aprender y jugar?"
   ],
   "iv": "Investigar con el grupo cómo se reparte el tiempo en las casas (un «reloj del cuidado»), reconocer el valor de cuidar y proponer acuerdos familiares y comunitarios para repartirlo.",
   "pot": [
    "Padres que comparten el cuidado",
    "Colectivos de mujeres y redes de cuidado",
    "Abuelas cuidadoras",
    "Horario extendido o alimentación escolar",
    "Niños que ya participan en las tareas de la casa"
   ],
   "ind": [
    "Con niñas y niños, con un reloj o un diario del tiempo: quién hace qué en casa, sin juzgar a ninguna familia.",
    "Con madres y padres: qué apoyos de cuidado necesitan.",
    "Con el CTE: si la escuela también reparte tareas por sexo."
   ],
   "al": ""
  },
  "S21": {
   "t": "Patio, palabra y tareas repartidos por sexo",
   "n": "N04",
   "sl": "En la escuela los niños ocupan el centro del patio y la palabra en clase, mientras a las niñas se les asigna barrer, decorar o cuidar el orden. Este currículum oculto, que nadie decidió en voz alta, enseña quién manda y quién sirve: las niñas pierden espacio de juego y de voz, y los niños pierden la experiencia de cuidar.",
   "ejes": [
    {
     "e": "IG",
     "p": true,
     "pq": "El eje pide cuestionar las prácticas institucionalizadas, y el reparto por sexo de espacios y tareas escolares es una de ellas."
    }
   ],
   "prob": [
    "¿Quién usa más el patio en el recreo? ¿Por qué?",
    "¿Quién habla más en clase y a quién se escucha?",
    "¿Cómo podríamos repartir las comisiones y el patio para que sea justo?"
   ],
   "iv": "Que niñas y niños investiguen el uso del patio y de la palabra (un mapa del recreo, un conteo de turnos para hablar) y propongan nuevas reglas de uso y comisiones que se turnen.",
   "pot": [
    "Niñas y niños que ya juegan en grupos mixtos",
    "Docentes de educación física",
    "Asambleas de aula",
    "Experiencias de fotovoz en primaria",
    "Juegos tradicionales"
   ],
   "ind": [
    "Con niñas y niños, con fotovoz o con un mapa del recreo: quién está dónde.",
    "Con el CTE: cómo asignamos comisiones y turnos para hablar.",
    "Con las familias: qué esperan de las niñas y de los niños en la escuela."
   ],
   "al": ""
  },
  "S22": {
   "t": "«Los hombres no lloran»: masculinidades que lastiman",
   "n": "N04",
   "sl": "A los niños se les enseña que ser hombre es aguantar, no llorar, pelear y mandar, y a las niñas, que deben ceder. Esa idea sostiene un orden en el que los varones dominan, pero también los lastima a ellos, que callan lo que sienten y se arriesgan, y lastima a las niñas, que pagan la violencia que nace de ahí.",
   "ejes": [
    {
     "e": "IG",
     "p": true,
     "pq": "El eje pide entender la desigualdad como histórica y cuestionar los patrones que la sostienen. Los mandatos de masculinidad son parte de esos patrones."
    },
    {
     "e": "PC",
     "p": false,
     "pq": "El eje se define por oponerse al machismo y cuestionar lo que pasa inadvertido por parecer normal. Los mandatos de hombría son un ejemplo claro."
    }
   ],
   "prob": [
    "¿Qué nos han dicho que significa «ser hombre» y «ser mujer»?",
    "¿Qué hacemos con la tristeza o el miedo? ¿Los niños pueden llorar?",
    "¿Qué hombres de nuestra comunidad cuidan a otros y cómo lo hacen?"
   ],
   "iv": "Un proyecto con los propios niños y con hombres de la comunidad que cuidan, para nombrar emociones y construir otras formas de ser hombre basadas en el cuidado y el respeto.",
   "pot": [
    "Padres y abuelos que cuidan",
    "Maestros que muestran otras formas de ser hombre",
    "Deporte y música como espacios para expresar lo que se siente",
    "Niñas y niños que defienden a otros"
   ],
   "ind": [
    "Con niñas y niños, por separado si conviene: qué les piden ser.",
    "Con padres y abuelos: qué aprendieron sobre ser hombre.",
    "Con el CTE: qué les decimos a los niños cuando lloran o pelean."
   ],
   "al": ""
  },
  "S23": {
   "t": "Al crecer, las niñas pierden lugar en la escuela",
   "n": "N04",
   "sl": "En 5.º y 6.º, sobre muchas niñas pesan las expectativas de ayudar en casa, cuidar, «portarse como señoritas» o formar pronto una familia, y la escuela deja de verse como su lugar. Gana un orden que reserva el estudio y la calle a los varones; pierden las niñas, cuya trayectoria escolar se acorta.",
   "ejes": [
    {
     "e": "IG",
     "p": true,
     "pq": "El eje pide entender la desigualdad de género como histórica y no como un rasgo cultural natural, y cuestionar las prácticas institucionalizadas que limitan a las niñas."
    },
    {
     "e": "INC",
     "p": false,
     "pq": "Si falta una por motivos de sexo o de género, no están incluidas todas. Que se acorte la trayectoria escolar de las niñas es una forma de exclusión."
    }
   ],
   "prob": [
    "¿Qué queremos ser de grandes? ¿Las niñas y los niños pueden soñar lo mismo?",
    "¿Quiénes de nuestra comunidad siguieron estudiando y qué les ayudó?",
    "¿Qué tendría que cambiar para que todas las niñas lleguen a la secundaria?"
   ],
   "iv": "Acompañar el paso a secundaria de todas las niñas con un proyecto de vida construido en el aula, encuentros con mujeres de la comunidad que siguieron estudiando y acuerdos con las familias y con la secundaria cercana.",
   "pot": [
    "Mujeres de la comunidad que siguieron estudiando",
    "Madres que apoyan el estudio de sus hijas",
    "Becas y programas, como la beca Rita Cetina",
    "Colectivos de mujeres",
    "Una secundaria cercana dispuesta a vincularse",
    "Niñas que ya son líderes en el grupo"
   ],
   "ind": [
    "Con las niñas de 5.º y 6.º, en un espacio propio: qué imaginan para su futuro y qué les preocupa del paso a secundaria.",
    "Con madres y padres: qué necesitarían para que sus hijas sigan estudiando.",
    "Con la supervisión: datos de paso a secundaria por sexo.",
    "Con la secundaria cercana: transporte y horarios."
   ],
   "al": "Si alguien sabe de una unión, un «compromiso», un embarazo o un intercambio que involucre a una niña en particular, no se comenta en la sesión ni se habla con ella frente al grupo: se avisa ese mismo día a la dirección, que sigue el protocolo estatal y da aviso a la Procuraduría de Protección de Niñas, Niños y Adolescentes. La ficha nunca registra casos ni nombres, ni atribuye la situación a la cultura de un pueblo."
  },
  "S24": {
   "t": "Pubertad y menstruación sin agua ni sanitarios dignos",
   "n": "N04",
   "sl": "En Fase 5, las niñas que empiezan a menstruar encuentran sanitarios sin agua, sin puerta o sin bote, sin toallas a la mano y con burlas o silencio, y algunas faltan esos días. Gana un orden que trata la menstruación como vergüenza y asunto privado, y una escuela que no la contempla en su presupuesto; pierden las niñas asistencia, comodidad y su derecho a vivir el cuerpo sin vergüenza.",
   "ejes": [
    {
     "e": "IG",
     "p": true,
     "pq": "Igualdad de género pide no reproducir los patrones de desigualdad y discriminación hacia las niñas y cuestionar prácticas institucionalizadas: tratar la menstruación como vergüenza y no prever condiciones para ella es una de esas prácticas."
    },
    {
     "e": "VS",
     "p": false,
     "pq": "Vida saludable incluye la educación integral en sexualidad y la salud: agua, higiene e información científica sobre los cambios del cuerpo."
    }
   ],
   "prob": [
    "¿Qué cambios vive nuestro cuerpo al crecer y por qué a veces da pena hablar de eso?",
    "¿Qué necesita una escuela para que todas y todos estemos cómodos en el baño?",
    "¿Qué podemos hacer para que nadie se burle de los cambios del cuerpo?"
   ],
   "iv": "Con el centro de salud y las familias, el grupo de Fase 5 habla de pubertad con información científica, la escuela gestiona con el CEAP sanitarios con agua, puerta y botes, y se crea un botiquín con toallas acordado con niñas y niños.",
   "pot": [
    "Maestras, madres y padres dispuestos a acompañar",
    "Centro de salud y servicios aliados",
    "CEAP y La Escuela es Nuestra para sanitarios",
    "Libros de texto con contenidos de educación integral en sexualidad",
    "Colectivos de mujeres y padres que comparten el cuidado"
   ],
   "ind": [
    "Condiciones reales de los sanitarios: recorrido del colectivo y, si lo desean, de las niñas con una maestra",
    "Qué necesitan las niñas: buzón anónimo o conversación de una maestra con las niñas de Fase 5, sin preguntar por casos",
    "Qué piensan las familias de tratar el tema: asamblea",
    "Qué apoyo puede dar el centro de salud: dirección"
   ],
   "al": "Si al trabajar el tema aparece un indicio de embarazo, unión o «compromiso» de una niña, o de abuso sexual: no investigar ni entrevistar; avisar hoy a la dirección y seguir el protocolo estatal (lineamientos del Acuerdo 17/05/25); la dirección da aviso a la Procuraduría de Protección. Nada se registra en la ficha."
  },
  "S25": {
   "t": "Pubertad y menstruación entre burla y silencio",
   "n": "N04",
   "sl": "Los cambios del cuerpo en 5.º y 6.º llegan sin información y entre burlas, y la menstruación se vive con vergüenza, sin agua, sanitarios ni toallas en la escuela. Gana un silencio que trata el cuerpo de las niñas como algo que hay que esconder; pierden ellas, que faltan, dejan de participar o tienen miedo de mancharse.",
   "ejes": [
    {
     "e": "IG",
     "p": true,
     "pq": "El eje pide no reproducir patrones de discriminación hacia las niñas, y el estigma de la menstruación las aparta de la escuela."
    },
    {
     "e": "VS",
     "p": false,
     "pq": "El eje incluye la educación integral en sexualidad y la salud: conocer y cuidar el cuerpo en la pubertad forma parte de él."
    }
   ],
   "prob": [
    "¿Qué cambios vamos a vivir en nuestro cuerpo al crecer?",
    "¿Por qué a veces da vergüenza hablar de la menstruación?",
    "¿Qué necesita la escuela para que nadie falte por estos cambios?"
   ],
   "iv": "Información clara para niñas y niños sobre la pubertad, acuerdos contra la burla y gestión con el CEAP y el centro de salud para que la escuela tenga agua, sanitarios y toallas.",
   "pot": [
    "Madres y abuelas",
    "Centro de salud",
    "CEAP con recursos de La Escuela es Nuestra",
    "Colectivos de mujeres",
    "Materiales de educación integral en sexualidad"
   ],
   "ind": [
    "Con las niñas de 5.º y 6.º, en un espacio propio: qué necesitan.",
    "Con las madres: cómo se habla del tema en casa.",
    "Con el CEAP y la dirección: en qué estado están los sanitarios y el agua."
   ],
   "al": "Si una niña presenta un embarazo o señales de violencia sexual, no se habla de ello en grupo: se avisa ese mismo día a la dirección, que sigue el protocolo estatal y da aviso a la Procuraduría de Protección de Niñas, Niños y Adolescentes."
  },
  "S26": {
   "t": "Burla a quien no cumple lo esperado por género",
   "n": "N04",
   "sl": "A los niños que juegan con niñas, lloran o no quieren jugar fútbol, y a las niñas que juegan rudo o no se arreglan, se les señala con burlas, a veces homofóbicas; lo mismo pasa con las familias que no tienen la forma esperada. Gana una norma rígida sobre cómo deben ser niñas y niños; pierden quienes no caben en ella, que viven aislamiento y miedo.",
   "ejes": [
    {
     "e": "IG",
     "p": true,
     "pq": "El eje busca que el alumnado cuestione prácticas institucionalizadas y entienda la desigualdad de género como histórica. La norma rígida sobre cómo ser niña o niño es una de esas prácticas."
    },
    {
     "e": "INC",
     "p": false,
     "pq": "El eje nombra el sexo y el género entre los motivos de exclusión: quien es señalado por no cumplir la norma queda fuera del juego y de la palabra."
    }
   ],
   "prob": [
    "¿Hay juegos, colores o trabajos que sean solo de niñas o solo de niños? ¿Quién lo decidió?",
    "¿Cómo se siente que se burlen de ti por ser como eres?",
    "¿Cómo son las familias que conocemos y qué tienen en común?"
   ],
   "iv": "Un aula donde cada quien puede jugar, vestirse y sentir sin ser señalado: acuerdos contra las burlas de género y un proyecto sobre las muchas formas de ser niña, niño y familia en la comunidad.",
   "pot": [
    "Madres y padres que comparten el cuidado",
    "Niñas y niños que ya juegan juntos sin distinción",
    "Colectivos de mujeres",
    "Cuadernos de apoyo curricular de Igualdad de género (SEP 2024)",
    "Personas referentes de la comunidad"
   ],
   "ind": [
    "Con niñas y niños: qué juegos o gustos sienten que «no les tocan».",
    "Con el CTE: si nosotros reforzamos la norma (comentarios, filas o formaciones por sexo).",
    "Con las familias: cómo hablar del respeto a la diversidad sin imponer (depende de la decisión 7 del usuario)."
   ],
   "al": "Si las burlas se vuelven acoso grave o constante, o hay señales de autolesión, se avisa a la dirección para activar el protocolo de acoso y canalizar, sin exhibir a nadie y sin revelar ante el grupo ni ante la familia aspectos de la identidad de una niña o un niño."
  },
  "S27": {
   "t": "La lengua de la casa no tiene lugar en la escuela",
   "n": "N05",
   "sl": "La comunidad vive en su lengua y la escuela funciona solo en español: niñas y niños hablan su lengua en el recreo y callan en clase. Gana la norma escolar monolingüe y pierden niñas y niños, que aprenden a la vez contenidos y que su lengua no sirve para estudiar.",
   "ejes": [
    {
     "e": "IC",
     "p": true,
     "pq": "El eje pide una interacción simétrica entre culturas, saberes y lenguas. Aquí hay una asimetría institucional: una lengua vale para aprender y la otra no."
    },
    {
     "e": "LE",
     "p": false,
     "pq": "El eje tiende puentes entre las prácticas escolares y las de la comunidad. Esa apropiación pasa por leer y escribir también en la lengua propia."
    }
   ],
   "prob": [
    "¿En qué lengua platicamos en el recreo y en qué lengua hablamos en clase? ¿Por qué cambia?",
    "¿Qué cosas sabemos decir mejor en nuestra lengua que en español?",
    "¿Qué pasaría si una parte de nuestras clases fuera en nuestra lengua?"
   ],
   "iv": "Un proyecto bilingüe con personas mayores (glosarios, carteles, relatos) que convierta la lengua de la casa en lengua de estudio del aula y de la escuela.",
   "pot": [
    "Personas mayores y madres hablantes dispuestas a participar",
    "Libros de texto en lengua originaria disponibles",
    "Docente o figura hablante en la zona",
    "Asamblea que ya pidió educación en la lengua"
   ],
   "ind": [
    "Qué variante se habla y si tiene escritura acordada (con un docente hablante de la zona)",
    "Qué piensan las familias de que se enseñe en la lengua (asamblea o visitas)",
    "Cómo se sienten niñas y niños al usar su lengua en clase (asamblea de aula, dibujos)"
   ],
   "al": ""
  },
  "S28": {
   "t": "Una lengua que se apaga entre las niñas y los niños",
   "n": "N05",
   "sl": "Abuelas, abuelos y madres o padres hablan la lengua de la comunidad, pero niñas y niños ya no la aprenden en casa. Pierden la comunidad y la niñez, que dejan de heredar una forma de nombrar el mundo. Lo que se impone es la idea de que el español da futuro y la lengua propia no.",
   "ejes": [
    {
     "e": "IC",
     "p": true,
     "pq": "El eje concibe las culturas como matrices dinámicas y critica la colonialidad. Que una lengua deje de transmitirse por desprestigio muestra una jerarquía colonial que se puede cuestionar."
    },
    {
     "e": "LE",
     "p": false,
     "pq": "El eje reconoce las prácticas orales y escritas de la comunidad. Escribir y leer en la lengua ayuda a revitalizarla."
    }
   ],
   "prob": [
    "¿Quién en nuestra familia habla la lengua de la comunidad? ¿Quién la aprendió y quién no?",
    "¿Por qué crees que algunas personas dejaron de enseñarla?",
    "¿Qué se pierde cuando nadie entiende lo que dice una abuela?"
   ],
   "iv": "Niñas y niños como aprendices y registradores de la lengua con sus mayores: diccionario ilustrado, canciones o cápsulas de radio escolar.",
   "pot": [
    "Hablantes mayores con tiempo y deseo de enseñar",
    "Niñas y niños que entienden la lengua aunque no la hablen",
    "Cantos, rezos o juegos que todavía se dicen en la lengua"
   ],
   "ind": [
    "Vitalidad entre los más pequeños, en Fase 3 y preescolar (familias, recorrido)",
    "Si hay un programa de revitalización o un hablante formado en la zona (supervisión, INPI o DGEIIB)"
   ],
   "al": ""
  },
  "S29": {
   "t": "Burla o castigo por la lengua o el acento",
   "n": "N05",
   "sl": "En el aula o el patio se ridiculiza o se corrige con vergüenza a quien habla su lengua, tiene acento o 'habla mocho'. Esa jerarquía la imponen pares y a veces adultos; pierden niñas y niños hablantes, que aprenden a esconder su lengua.",
   "ejes": [
    {
     "e": "IC",
     "p": true,
     "pq": "El eje denuncia el racismo y la discriminación. La burla por la lengua es racialización cotidiana."
    }
   ],
   "prob": [
    "¿Alguna vez se han reído de cómo hablas? ¿Cómo te sentiste?",
    "¿Por qué crees que algunas formas de hablar se ven 'mejor' que otras?",
    "¿Qué acuerdo podemos hacer para que todas las lenguas se escuchen con respeto?"
   ],
   "iv": "Acuerdos de convivencia escritos en las lenguas del grupo y una muestra en la que cada niña o niño enseñe palabras de su lengua o de su familia.",
   "pot": [
    "Niñas y niños que defienden a sus compañeros",
    "Familias orgullosas de su lengua",
    "Protocolo escolar de convivencia ya existente"
   ],
   "ind": [
    "Si la burla también viene de adultos de la escuela (CTE, en confianza)",
    "Cómo lo viven niñas y niños hablantes (asamblea de aula con codificación)"
   ],
   "al": "Si la burla es sistemática, grave o se dirige siempre a la misma niña o niño, se atiende con el protocolo escolar de convivencia y acoso de la entidad, a través de la dirección. La ficha no registra nombres."
  },
  "S30": {
   "t": "Burlas por color de piel, lengua u origen",
   "n": "N05",
   "sl": "En el trato cotidiano (apodos por el color de piel, burlas al acento o a la lengua, chistes sobre «indios» o «negros») se repite una jerarquía colonial que pone lo blanco, lo mestizo y lo urbano arriba. Ganan quienes ocupan ese lugar sin darse cuenta; pierden niñas y niños indígenas, afromexicanos o morenos, que aprenden a esconder quiénes son.",
   "ejes": [
    {
     "e": "IC",
     "p": true,
     "pq": "El eje parte de reconocer las asimetrías de la sociedad mexicana y critica el racismo y el colonialismo. El racismo cotidiano es esa asimetría convertida en trato."
    },
    {
     "e": "INC",
     "p": false,
     "pq": "Si falta una o uno por motivos de etnia, lengua o cultura, no están incluidos todos. Quien esconde su origen para que no lo señalen no participa plenamente."
    }
   ],
   "prob": [
    "¿De dónde vienen nuestras familias y qué lenguas se hablaban en ellas?",
    "¿Por qué algunas personas creen que un color de piel o una lengua vale más que otro?",
    "¿Qué podemos hacer cuando oímos un chiste que hace sentir mal a alguien por cómo es?"
   ],
   "iv": "Un proyecto de orgullo y memoria de los orígenes del grupo (historias de familia, lenguas, rostros de la comunidad) que convierta lo que se escondía en saber compartido y en acuerdos contra el racismo.",
   "pot": [
    "Lenguas vivas",
    "Afromexicanidad viva",
    "Narrativa oral de las personas mayores",
    "Fiestas y danzas",
    "Docentes hablantes de la lengua",
    "Libros de texto en lenguas originarias"
   ],
   "ind": [
    "Con niñas y niños, con autorretratos o historias de familia: cómo se nombran a sí mismos.",
    "Con familias indígenas o afromexicanas: qué han vivido en la escuela.",
    "Con el CTE: qué decimos o permitimos nosotros."
   ],
   "al": "Si las burlas se vuelven acoso grave o constante contra una niña o un niño, la dirección activa el protocolo de acoso escolar, sin exhibir a nadie."
  },
  "S31": {
   "t": "Origen indígena que se calla en la ciudad",
   "n": "N05",
   "sl": "Familias indígenas que llegaron a la ciudad o a la cabecera esconden su origen y su lengua para no ser discriminadas, y la escuela general no lo pregunta ni lo nombra. Se mantiene la ficción de una escuela 'sin indígenas' y pierden niñas y niños, que crecen sin poder nombrar su historia.",
   "ejes": [
    {
     "e": "IC",
     "p": true,
     "pq": "El eje parte de reconocer las asimetrías de la sociedad mexicana. Callar el origen para protegerse es efecto del racismo estructural."
    },
    {
     "e": "LE",
     "p": false,
     "pq": "La lengua de herencia rara vez se lee o escribe en la escuela urbana. El eje pide puentes entre las prácticas de la comunidad y las escolares."
    }
   ],
   "prob": [
    "¿De dónde vienen nuestras familias? ¿Qué trajeron consigo?",
    "¿Por qué a veces las personas no cuentan de dónde son?",
    "¿Cómo sería una escuela donde todos pudieran decir de dónde vienen sin miedo?"
   ],
   "iv": "Un mapa de los orígenes y las lenguas de las familias del grupo, construido con ellas y con su permiso, que se vuelva parte del proyecto escolar.",
   "pot": [
    "Madres y padres hablantes",
    "Redes de paisanos y fiestas del pueblo de origen",
    "Organizaciones indígenas urbanas"
   ],
   "ind": [
    "Qué familias desean ser reconocidas y cómo (entrevistas voluntarias, sin censo)",
    "Qué lenguas hay en el grupo"
   ],
   "al": ""
  },
  "S32": {
   "t": "Afromexicanidad que la escuela no nombra",
   "n": "N05",
   "sl": "En la comunidad hay familias que se reconocen afromexicanas, pero la escuela no habla de su historia ni de su presencia: se enseña un país de 'indígenas y mestizos'. Pierden niñas y niños afromexicanos, que no se ven en lo que aprenden y escuchan estereotipos sobre su piel o su cabello.",
   "ejes": [
    {
     "e": "IC",
     "p": true,
     "pq": "El eje es crítica del racismo y del colonialismo. Borrar de la historia escolar a un pueblo reconocido constitucionalmente es una asimetría que se debe nombrar."
    },
    {
     "e": "AE",
     "p": false,
     "pq": "El eje impulsa la relación con las manifestaciones culturales. La música, la danza y la oralidad afromexicanas vivas son la vía de reconocimiento."
    }
   ],
   "prob": [
    "¿Quiénes llegaron a esta región hace mucho tiempo y por qué no siempre se cuenta?",
    "¿Qué música, bailes o palabras de aquí vienen de pueblos africanos?",
    "¿Cómo se siente que la escuela no hable de tu familia?"
   ],
   "iv": "Proyecto de memoria y arte afromexicano con sabedoras y músicos locales, presentado a la comunidad como historia propia y no como 'folclor'.",
   "pot": [
    "Grupos de danza o música afromexicana",
    "Personas mayores que cuentan la historia del pueblo",
    "Organizaciones afromexicanas de la región"
   ],
   "ind": [
    "Cómo se nombran a sí mismas las familias (afromexicanas, negras, morenas) en asamblea",
    "Si niñas y niños viven comentarios por su apariencia (asamblea de aula, con cuidado)"
   ],
   "al": ""
  },
  "S33": {
   "t": "Saberes propios tratados como 'atraso'",
   "n": "N05",
   "sl": "La medicina tradicional, la milpa, la partería o el calendario lunar se presentan en la escuela como superstición frente a 'la ciencia'. Pierden las y los sabedores y niñas y niños, que aprenden a avergonzarse de lo que saben sus casas; se sostiene una jerarquía colonial del saber.",
   "ejes": [
    {
     "e": "IC",
     "p": true,
     "pq": "El eje busca una relación simétrica entre saberes. Descalificar el saber local es colonialidad del saber."
    },
    {
     "e": "PC",
     "p": false,
     "pq": "El eje pide interrogar lo que se da por normal. Aquí se interroga quién decide qué cuenta como conocimiento."
    }
   ],
   "prob": [
    "¿Qué sabe tu abuela o tu abuelo que no viene en los libros?",
    "¿Cómo sabemos si un saber es verdadero? ¿Quién lo decide?",
    "¿Qué podríamos investigar juntando lo que sabe la comunidad y lo que dice la ciencia?"
   ],
   "iv": "Investigación de diálogo de saberes (por ejemplo, plantas del lugar) en la que sabedores y niñas y niños comparan, prueban y documentan.",
   "pot": [
    "Sabedoras y sabedores reconocidos",
    "Huertos, milpas o parcelas cercanas",
    "Calendario agrícola y ritual vivo"
   ],
   "ind": [
    "Qué saberes desean compartir las y los sabedores y cuáles no (respeto a lo reservado)",
    "Qué temas del programa sintético se pueden poner en diálogo (CTE)"
   ],
   "al": ""
  },
  "S34": {
   "t": "Lo que saben las familias se queda fuera del aula",
   "n": "N05",
   "sl": "Las familias tienen oficios y saberes (comercio, albañilería, cocina, costura, cultivo, mecánica) que la escuela no pregunta ni usa. No hay desprecio explícito, pero se desperdicia el saber de las familias trabajadoras y gana un currículo que llega 'de fuera'.",
   "ejes": [
    {
     "e": "INC",
     "p": true,
     "pq": "El eje no se reduce a incorporar a todos a la escuela: excluir por clase también es dejar fuera el saber de las familias trabajadoras."
    },
    {
     "e": "IC",
     "p": false,
     "pq": "El eje reconoce saberes de matrices culturales diversas; los oficios populares son una de ellas."
    }
   ],
   "prob": [
    "¿Qué sabe hacer alguien de tu casa en su trabajo?",
    "¿Ese saber sirve para aprender matemáticas, ciencias o a escribir? ¿Cómo?",
    "¿Por qué en la escuela casi no se habla de los trabajos de nuestras familias?"
   ],
   "iv": "Proyecto con 'expertas y expertos de casa': niñas y niños entrevistan a familiares sobre su oficio y convierten ese saber en contenido de clase.",
   "pot": [
    "Madres y padres con oficios dispuestos a visitar",
    "Talleres, mercados o parcelas cercanas",
    "Niñas y niños que ayudan en los oficios y saben explicarlos"
   ],
   "ind": [
    "Qué familias pueden y quieren participar, y en qué horario (encuesta breve, reunión)",
    "Cuidar que no se confunda con trabajo infantil"
   ],
   "al": ""
  },
  "S35": {
   "t": "Lo de fuera vale más: lo propio se desprecia",
   "n": "N05",
   "sl": "Niñas y niños y familias valoran más la ropa, la música, la comida y las formas de vida de la publicidad y las pantallas que las propias, a las que llaman 'de rancho' o 'de pobres'. Ganan las marcas y las industrias culturales; la comunidad pierde autoestima y formas de vida propias (invasión cultural).",
   "ejes": [
    {
     "e": "PC",
     "p": true,
     "pq": "El eje es interrogar la realidad y lo que pasa inadvertido por parecer normal: aquí, la publicidad que fija qué vale."
    },
    {
     "e": "IC",
     "p": false,
     "pq": "El eje critica la asimetría entre culturas: lo propio se subordina a una matriz cultural dominante."
    }
   ],
   "prob": [
    "¿Por qué algunas cosas nos parecen 'mejores' solo porque salen en la tele o en el celular?",
    "¿Quién gana cuando queremos lo que anuncian?",
    "¿Qué cosas de aquí nos gustan y casi nunca decimos?"
   ],
   "iv": "Campaña escolar hecha por niñas y niños que 'anuncie' lo propio (comida, música, oficios) con los mismos recursos de la publicidad, para desmontarla.",
   "pot": [
    "Prácticas locales todavía vivas (fiesta, cocina, música)",
    "Niñas y niños que crean contenido con el celular",
    "Radio o bocina comunitaria"
   ],
   "ind": [
    "Qué contenidos y marcas mencionan niñas y niños (asamblea, dibujos)",
    "Qué piensan las familias de los cambios en sus hijas e hijos (reunión)"
   ],
   "al": ""
  },
  "S36": {
   "t": "Trayectorias interrumpidas por el calendario jornalero",
   "n": "N06",
   "sl": "Las familias jornaleras se mueven con las cosechas y la escuela sigue un calendario fijo: niñas y niños llegan o se van a mitad del ciclo, se les da de baja, repiten o quedan en extraedad, y en el lugar de destino su lengua no tiene lugar. Gana una agroindustria que depende de mano de obra barata que se mueve, y un sistema escolar que no se adapta; pierde la niñez jornalera, mayoritariamente indígena, su continuidad escolar y el reconocimiento de su lengua y su saber.",
   "ejes": [
    {
     "e": "INC",
     "p": true,
     "pq": "Inclusión: si falta una o uno por motivos de clase, etnia, lengua o condición migratoria, no están incluidos todos. El calendario rígido, las bajas y los trámites son barreras para el aprendizaje y la participación de la niñez jornalera."
    },
    {
     "e": "IC",
     "p": false,
     "pq": "Interculturalidad crítica busca una interacción simétrica con las lenguas y saberes de las familias jornaleras, que en el destino suelen tratarse como inferiores."
    }
   ],
   "prob": [
    "¿A dónde viajan o de dónde vienen las familias que trabajan en el campo, y qué cosechan?",
    "¿Por qué quienes cosechan la comida que se vende lejos tienen que dejar la escuela?",
    "¿Cómo podría la escuela recibir y despedir a quienes llegan y se van, sin que pierdan lo aprendido?"
   ],
   "iv": "Una bitácora viajera de cada niña o niño que la escuela de destino u origen continúa, con acuerdos de inscripción sin trabas, bienvenida en la lengua de quienes llegan y un proyecto corto sobre el camino de los alimentos.",
   "pot": [
    "Redes de familias que viajan juntas",
    "Lenguas originarias de quienes llegan",
    "Saberes agrícolas y de oficio",
    "Docentes hablantes de la lengua",
    "Asambleas y organizaciones jornaleras"
   ],
   "ind": [
    "Calendario de salidas y llegadas: familias y control escolar, sin nombres en la ficha",
    "Lenguas de quienes llegan: inscripción y familias; validar con una persona hablante",
    "Si niñas y niños trabajan en el corte y en qué condiciones: conversación con familias; si hay trabajo peligroso, se sigue la ruta de protección",
    "Qué hace la escuela con las altas y bajas: CTE y control escolar"
   ],
   "al": "Si niñas y niños trabajan en campos con agroquímicos, maquinaria o calor extremo durante la temporada, se trata como condición colectiva estructural: la dirección emite un aviso institucional en el PEMC a la autoridad competente y en el aula se trabaja en clave de derechos, sin relatos de casos. Si un indicio se refiere a una niña o un niño en particular (trabajo peligroso, lesiones, explotación), avisar hoy a la dirección y seguir el protocolo estatal; la dirección da aviso a la Procuraduría de Protección."
  },
  "S37": {
   "t": "Entre dos escuelas y dos idiomas",
   "n": "N06",
   "sl": "Niñas y niños que llegan de Estados Unidos con familias deportadas o retornadas leen y escriben en inglés, pero aquí se les trata como «atrasados» en español, y los trámites, el duelo por lo que dejaron y el «no eres de aquí» complican su inicio. Gana una escuela que mide solo en español y una política migratoria que separa familias; pierde la niñez binacional, cuyo bilingüismo se desperdicia.",
   "ejes": [
    {
     "e": "INC",
     "p": true,
     "pq": "Inclusión nombra la lengua y la condición migratoria como motivos de exclusión; los trámites y una evaluación solo en español son barreras para el aprendizaje y la participación de la niñez retornada o binacional."
    },
    {
     "e": "LE",
     "p": false,
     "pq": "El eje pide tender puentes entre las prácticas letradas de niñas y niños y las de la escuela y reconocer el derecho a leer y producir textos propios. Aquí hay prácticas de lectura y escritura en inglés y español que la escuela puede reconocer; se valida por esas prácticas, no por el rezago en español."
    }
   ],
   "prob": [
    "¿Qué lenguas hablamos y leemos en nuestro grupo y en nuestras familias?",
    "¿Por qué saber inglés se ve como algo bueno para unos y como un problema para otros?",
    "¿Cómo podemos dar la bienvenida a quien llega de otro país y aprender de lo que trae?"
   ],
   "iv": "Niñas y niños retornados y no retornados producen juntos textos en inglés y español (guía de la escuela, cartas, relatos de ida y vuelta), y el colectivo acuerda una bienvenida y una evaluación que reconozcan lo que ya saben.",
   "pot": [
    "Bilingüismo de quienes llegan o regresan",
    "Familias binacionales y su experiencia",
    "Inscripción sin apostilla y Documento de Transferencia del Estudiante Migrante Binacional",
    "Programas de atención a personas repatriadas",
    "Docentes y jóvenes que hablan inglés; personas referentes"
   ],
   "ind": [
    "Cuántas familias retornadas o binacionales hay y qué documentos les faltan: control escolar y dirección, sin nombres en la ficha",
    "Qué leen y escriben niñas y niños en inglés: muestra de textos en el aula",
    "Cómo viven su llegada: asamblea de aula con una codificación; atención al duelo",
    "Si hay rechazo o burla por cómo hablan: observación en el recreo y CTE"
   ],
   "al": "Si una niña o un niño llegó sin un adulto responsable o su familia fue separada y nadie está a cargo, avisar hoy a la dirección para que dé aviso a la Procuraduría de Protección según el protocolo estatal. La situación migratoria nunca se registra en la ficha."
  },
  "S38": {
   "t": "El idioma de quienes regresan se trata como problema",
   "n": "N06",
   "sl": "Niñas y niños retornados o binacionales llegan con el inglés como lengua fuerte, y la escuela lo trata como obstáculo: se les exige 'ponerse al corriente' en español y su bilingüismo no se aprovecha. Gana una escuela monolingüe; pierden niñas y niños, que viven el regreso como pérdida.",
   "ejes": [
    {
     "e": "LE",
     "p": true,
     "pq": "El eje parte de las prácticas reales de lectura y escritura; un bilingüismo letrado es un recurso, no una carencia."
    },
    {
     "e": "IC",
     "p": false,
     "pq": "El eje concibe las culturas como matrices dinámicas; la experiencia binacional se debe reconocer con simetría."
    }
   ],
   "prob": [
    "¿Qué palabras o historias trajeron quienes vivieron en otro país?",
    "¿Por qué hablar dos idiomas puede ser una ventaja?",
    "¿Cómo podemos recibir mejor a quien llega a nuestra escuela?"
   ],
   "iv": "Proyecto bilingüe en el que niñas y niños retornados son tutores de inglés y cuentan su experiencia, y el grupo construye una guía de bienvenida.",
   "pot": [
    "Niñas y niños bilingües",
    "Familias con experiencia migrante",
    "Documento de transferencia binacional y normas de inscripción sin apostilla"
   ],
   "ind": [
    "Cuántas niñas y niños del grupo están en esta situación (sin listas)",
    "Cómo vivieron el regreso (con cuidado; puede haber duelo)"
   ],
   "al": ""
  },
  "S39": {
   "t": "Familias que viven separadas por la migración",
   "n": "N06",
   "sl": "Madres o padres trabajan en Estados Unidos o en otra ciudad y sostienen a la familia con remesas, mientras niñas y niños crecen al cuidado de abuelas, tías o hermanas mayores. Gana una economía que necesita trabajo migrante pero no deja a las familias estar juntas; pierden la niñez el vínculo cotidiano y las mujeres que reciben el cuidado, y la caída de remesas de 2025 aprieta a muchas casas.",
   "ejes": [
    {
     "e": "IG",
     "p": true,
     "pq": "Igualdad de género pide ver como histórica, no natural, la división del trabajo de cuidados: el cuidado de la niñez que se queda recae en abuelas, madres y niñas mayores."
    },
    {
     "e": "INC",
     "p": false,
     "pq": "Inclusión nombra la condición migratoria como motivo de exclusión: tareas y reuniones que suponen la presencia de madre y padre dejan fuera a estas familias y a sus cuidadoras."
    }
   ],
   "prob": [
    "¿Quiénes de nuestras familias viven lejos y por qué se fueron?",
    "¿Quién nos cuida cuando mamá o papá no están, y quién cuida a quien nos cuida?",
    "¿Cómo podemos mantenernos cerca de quien está lejos?"
   ],
   "iv": "Un proyecto de cartas, audios o videos entre niñas y niños y sus familiares lejanos, que reconstruye la historia migrante de la comunidad y reconoce en público a las cuidadoras, con tareas y reuniones adaptadas a abuelas y tutoras.",
   "pot": [
    "Abuelas y tías cuidadoras; redes familiares",
    "Comunicación digital con quien está lejos",
    "Memoria migrante de la comunidad",
    "Clubes o asociaciones de migrantes",
    "Padres y madres que comparten el cuidado a distancia"
   ],
   "ind": [
    "Con quién viven niñas y niños, en general y sin listas nominales: conversación con tutoras y tutores en asamblea",
    "Cómo viven la distancia: carta o dibujo en el aula, sin obligar a nadie",
    "Si la baja de remesas afecta alimentación o asistencia: familias y CTE; si sí, abrir Sustento",
    "Si alguna niña o niño quedó sin adulto responsable: no se indaga en grupo; va a la dirección"
   ],
   "al": "Si una niña o un niño queda sin un adulto responsable de su cuidado, avisar hoy a la dirección para que dé aviso a la Procuraduría de Protección o al DIF según el protocolo estatal. No se registra en la ficha."
  },
  "S40": {
   "t": "Desplazamiento forzado: llegar a mitad del ciclo sin red",
   "n": "N06",
   "sl": "Familias que tuvieron que dejar su comunidad llegan de otro lugar del estado o del país, a veces sin documentos, con miedo y sin red, y la escuela puede recibirlas o pedirles papeles que no tienen. Ganan quienes obligan a salir y una indiferencia institucional que no reconoce el desplazamiento; pierde la niñez desplazada, que pierde a la vez casa, escuela y amistades.",
   "ejes": [
    {
     "e": "INC",
     "p": true,
     "pq": "Inclusión: si falta una o uno por su condición migratoria, no están incluidos todos. Exigir documentos para inscribir o dejar sola a quien llega a mitad de ciclo son barreras para el aprendizaje y la participación."
    },
    {
     "e": "VS",
     "p": false,
     "pq": "Vida saludable incluye el cuidado del bienestar: quien llega tras dejar su comunidad necesita un entorno escolar seguro y acompañamiento antes que exigencias."
    }
   ],
   "prob": [
    "¿Qué se siente llegar a un lugar nuevo donde no conoces a nadie?",
    "¿Qué necesita alguien que acaba de llegar para sentirse en casa en la escuela?",
    "¿Cómo podemos recibir a las niñas y niños que llegan durante el año?"
   ],
   "iv": "Niñas y niños diseñan un protocolo de bienvenida (madrinas y padrinos, recorrido por la escuela, carta de bienvenida) y el colectivo acuerda inscribir sin trabas y acompañar con cuidado, sin preguntar por lo que la familia vivió.",
   "pot": [
    "Familias y vecinas que acogen",
    "Niñas y niños que reciben y acompañan",
    "Servicios aliados que sí responden: salud, DIF, apoyo psicosocial",
    "Autoridades educativas que facilitan la inscripción sin documentos",
    "Comités y organización vecinal"
   ],
   "ind": [
    "Cuántas llegadas hubo y qué necesitan (documentos, útiles): control escolar y dirección, sin registrar causas ni lugares",
    "Qué apoyos hay para inscripción y atención psicosocial: supervisión, DIF, salud",
    "Cómo se sienten quienes llegan: observación cuidadosa en el aula, sin entrevistas",
    "Qué es seguro decir en público: dirección"
   ],
   "al": "Esta ficha se trabaja siempre con cuidado: no se pregunta a niñas y niños ni a familias por qué se fueron, de dónde ni de quién. Si un indicio sobre una niña o un niño en particular apunta a amenaza, desaparición o asesinato de un familiar, o a reclutamiento: no investigar, avisar hoy a la dirección y seguir el protocolo estatal; la dirección da aviso a la Procuraduría de Protección y, si el riesgo es inminente, a emergencias (911). Nada de esto se registra en la ficha ni en el código."
  },
  "S41": {
   "t": "Niñez de paso: tránsito, albergues y trato a quien migra",
   "n": "N06",
   "sl": "Por la comunidad pasan o se quedan un tiempo familias migrantes de otros países, en albergues, campamentos o cuartos rentados; algunas niñas y niños llegan a la escuela por semanas, y en el entorno conviven la solidaridad con la desconfianza, las burlas o el rechazo hacia «los de fuera». Ganan las redes que lucran con la migración y un discurso que culpa a quien migra; pierden la niñez en tránsito, que ejerce poco su derecho a la escuela, y la comunidad, que pierde una oportunidad de encuentro.",
   "ejes": [
    {
     "e": "INC",
     "p": true,
     "pq": "Inclusión nombra la condición migratoria como motivo de exclusión: la niñez en tránsito tiene derecho a la escuela aunque se quede unas semanas, y los trámites o el rechazo son barreras para ejercerlo."
    },
    {
     "e": "IC",
     "p": false,
     "pq": "Interculturalidad crítica critica el racismo y advierte que el multiculturalismo puede mantener las diferencias a distancia; busca relaciones simétricas con las culturas y lenguas de quienes llegan de otros países."
    }
   ],
   "prob": [
    "¿Por qué hay personas que salen de su país con sus hijas e hijos?",
    "¿Cómo tratamos a quien llega de otro lugar? ¿Cómo nos gustaría que nos trataran?",
    "¿Qué podemos aprender de quienes vienen de lejos y qué podemos ofrecerles mientras están aquí?"
   ],
   "iv": "Niñas y niños preparan materiales de bienvenida en varias lenguas y un intercambio cultural con el albergue, y la escuela acuerda con la supervisión una inscripción ágil para estancias cortas.",
   "pot": [
    "Albergues y organizaciones de ayuda humanitaria",
    "Familias y vecinas solidarias; tradición de hospitalidad",
    "Lenguas y saberes de quienes llegan",
    "Inscripción sin documentos ni apostilla",
    "Servicios aliados que sí responden"
   ],
   "ind": [
    "Cuántas niñas y niños pasan y por cuánto tiempo: albergue y control escolar, sin nombres",
    "Qué lenguas hablan: albergue y familias",
    "Qué discursos circulan sobre migrantes en la comunidad: asamblea con una codificación",
    "Qué apoyos ofrece el albergue: visita del colectivo"
   ],
   "al": "Si una niña o un niño migrante está sin un adulto responsable, o hay indicios de trata, explotación o violencia: no investigar ni entrevistar; avisar hoy a la dirección y seguir el protocolo estatal; la dirección da aviso a la Procuraduría de Protección y, si el riesgo es inminente, a emergencias (911). Nunca se registra la situación migratoria."
  },
  "S42": {
   "t": "Quien llega de fuera es tratado como de paso",
   "n": "N06",
   "sl": "A las niñas y los niños que llegan por el jornaleo, el retorno de Estados Unidos, el desplazamiento o el tránsito se les recibe con desconfianza, con apodos («el gringo», «los de la sierra») o con la idea de que «al cabo se van». Gana una comunidad escolar que no se mueve de su centro; pierden quienes llegan, que no son vistos como parte del grupo y cuyo bagaje no se reconoce.",
   "ejes": [
    {
     "e": "IC",
     "p": true,
     "pq": "El eje busca una interacción simétrica con diversas culturas, saberes y lenguas, y advierte que el multiculturalismo puede mantener las diferencias a distancia. Recibir a quien llega como «de paso» es justo esa distancia."
    },
    {
     "e": "INC",
     "p": false,
     "pq": "El eje nombra la condición migratoria entre los motivos de exclusión: si quien llega no participa, no están incluidos todos."
    }
   ],
   "prob": [
    "¿Alguna vez llegamos a un lugar nuevo? ¿Qué nos ayudó a sentirnos bienvenidos?",
    "¿Por qué las familias se mudan de un lugar a otro?",
    "¿Qué podemos aprender de quienes llegan de otro lugar?"
   ],
   "iv": "Un protocolo de bienvenida hecho por el grupo (padrinos y madrinas de llegada, un mapa de la escuela, palabras en las lenguas de quienes llegan) y una carpeta que acompañe a cada niña o niño cuando se vaya.",
   "pot": [
    "Bilingüismo de quienes llegan o regresan",
    "Redes de familias que viajan juntas",
    "Albergues o casas de migrantes que colaboran",
    "Docentes con experiencia migratoria",
    "Documento de Transferencia del Estudiante Migrante Binacional"
   ],
   "ind": [
    "Con niñas y niños que llegaron: cómo fue su primer día y qué les hubiera ayudado.",
    "Con las familias que llegan: qué necesitan de la escuela.",
    "Con el CTE: cómo inscribimos y recibimos, y si damos de baja a quien se va."
   ],
   "al": "Si una niña o un niño que llega muestra señales de trabajo peligroso, de haber vivido violencia en el camino o de no estar con adultos responsables, se avisa ese mismo día a la dirección, que sigue el protocolo estatal y da aviso a la Procuraduría de Protección de Niñas, Niños y Adolescentes. La situación migratoria o de documentos nunca se registra en la planeación."
  },
  "S43": {
   "t": "Faltas intermitentes que la escuela no alcanza a leer",
   "n": "N06",
   "sl": "Niñas y niños faltan uno o dos días seguido por causas que se cruzan (enfermedad sin atender, lluvias, trabajo, cuidado de hermanos, falta de agua, trámites), y la escuela lo registra como falta individual o desinterés. Gana un sistema que mide asistencia sin preguntar por las condiciones; pierde la niñez de las familias con más carencias, cuyas faltas se acumulan hasta la reprobación o el abandono.",
   "ejes": [
    {
     "e": "INC",
     "p": true,
     "pq": "Inclusión aclara que no basta con inscribir: si una o uno falta de forma intermitente por motivos de clase o por condiciones del contexto, no están incluidos todos. Leer las faltas solo como asunto individual es una barrera para el aprendizaje y la participación."
    }
   ],
   "prob": [
    "¿Por qué a veces no podemos venir a la escuela?",
    "¿Qué pasa en el grupo cuando alguien falta y qué se pierde?",
    "¿Cómo podemos ayudar a que quien faltó se ponga al corriente sin que se sienta mal?"
   ],
   "iv": "Niñas y niños organizan compañeras y compañeros de enlace que guardan materiales y explican lo visto a quien faltó, y el colectivo acuerda leer las faltas por patrón y causa antes de sancionar y llevar al PEMC las causas que la escuela sí puede atender.",
   "pot": [
    "Niñas y niños que ayudan a sus pares",
    "Familias y vecinas que avisan y acompañan",
    "Servicios aliados que sí responden",
    "Registro de asistencia que ya existe en la escuela",
    "Tutorías y trabajo entre pares"
   ],
   "ind": [
    "Patrón de faltas por mes y por causa: control escolar en el CTE, en datos agregados y sin nombres en la ficha",
    "Qué dicen las familias de las faltas: conversación individual de confianza, no en asamblea",
    "Qué hace hoy la escuela ante faltas repetidas: CTE",
    "Si alguna causa se repite (agua, salud, trabajo): abrir esa rama en la relectura"
   ],
   "al": "Si una niña o un niño deja de asistir sin aviso y la escuela no logra contacto con la familia, la dirección sigue su ruta de seguimiento y, si hay indicios de riesgo (trabajo peligroso, violencia, desaparición), el protocolo estatal, con aviso a la Procuraduría de Protección. La ficha no registra casos."
  },
  "S44": {
   "t": "Golpes y gritos para educar, vistos como normales",
   "n": "N07",
   "sl": "Se educa con golpes, gritos o humillaciones «por su bien», porque así se educó a las generaciones anteriores y porque muchas familias crían con jornadas largas, estrés y pocos apoyos. La autoridad adulta se impone sin un costo inmediato; pierden las niñas y los niños, que aprenden que quien te quiere también te lastima, y pierden las familias, que se quedan solas con la crianza.",
   "ejes": [
    {
     "e": "VS",
     "p": true,
     "pq": "El eje incluye la prevención de violencias y el bienestar emocional. La disciplina violenta daña la salud física y emocional, y prevenirla es parte de una vida saludable."
    }
   ],
   "prob": [
    "¿Cómo nos gusta que nos corrijan cuando nos equivocamos?",
    "¿Por qué algunas personas grandes piensan que pegar sirve para educar? ¿Sirve de verdad?",
    "¿Qué podemos hacer en el salón cuando alguien se enoja, sin lastimar a nadie?"
   ],
   "iv": "Acordar con niñas, niños y familias formas de poner límites sin violencia (círculos de diálogo, encuentros de crianza con madres y abuelas que crían distinto) y hacer del aula un ejemplo de autoridad que no lastima.",
   "pot": [
    "Madres, padres y abuelas que crían con ternura y firmeza",
    "Prácticas comunitarias de consejo (personas mayores, padrinos, madrinas)",
    "Talleres de crianza del DIF o del centro de salud",
    "Reglamento de convivencia que se puede revisar",
    "Niñas y niños que ya proponen acuerdos"
   ],
   "ind": [
    "Con las familias, en una reunión en horario accesible: qué les funciona para poner límites y qué apoyos les harían falta.",
    "Con niñas y niños, con dibujos o historias y sin pedir relatos de casa: cómo les gusta que los corrijan.",
    "Con el CTE: cómo corregimos nosotros.",
    "Con el DIF o el centro de salud: qué talleres de crianza hay."
   ],
   "al": "La ficha habla de la crianza en general. Si en el aula una niña o un niño cuenta que le pegan, tiene lesiones o tiene miedo de volver a casa, no se le interroga ni se confronta a la familia: se le escucha con calma, se avisa ese mismo día a la dirección y se sigue el protocolo estatal de maltrato, con aviso a la Procuraduría de Protección de Niñas, Niños y Adolescentes. Si el riesgo es inminente, se llama a emergencias (911). No se registran detalles en la planeación."
  },
  "S45": {
   "t": "La violencia contra mujeres y niñas se calla",
   "n": "N07",
   "sl": "La violencia contra mujeres y niñas, en la casa, en la calle y en los trayectos, se explica como «cosa de pareja», «así son los hombres» o culpa de ellas, y por eso se calla. Ganan quienes ejercen el control; pierden las niñas, que aprenden a tener miedo y a no hablar, y los niños, a quienes se les enseña que mandar es ser hombre.",
   "ejes": [
    {
     "e": "IG",
     "p": true,
     "pq": "El eje pide no reproducir los modelos y patrones de desigualdad, violencia y discriminación hacia las niñas y adolescentes y entender la desigualdad como histórica, no natural. Esta ficha nombra esa violencia y la forma en que se justifica."
    },
    {
     "e": "VS",
     "p": false,
     "pq": "El eje abarca la prevención de violencias y la salud emocional. Vivir o presenciar violencia de género daña la salud integral de la niñez."
    }
   ],
   "prob": [
    "¿Por qué hay lugares por donde las niñas no se sienten seguras al caminar?",
    "¿Quién dijo que las mujeres deben aguantar y los hombres mandar?",
    "¿A quién le podemos pedir ayuda si alguien nos trata mal, en la escuela o fuera de ella?"
   ],
   "iv": "Que la escuela sea un lugar donde se nombra el respeto y se aprende a pedir ayuda: acuerdos de trato igualitario, caminos seguros acordados con las familias y alianza con los colectivos de mujeres y los servicios de la comunidad.",
   "pot": [
    "Colectivos de mujeres y redes de cuidado",
    "Madres organizadas",
    "Instancia municipal de las mujeres o DIF",
    "Hombres de la comunidad que comparten el cuidado",
    "Niñas y niños que defienden a sus compañeras"
   ],
   "ind": [
    "Con madres y mujeres de la comunidad, en un espacio seguro y sin hablar de casos: qué apoyos hay y cuáles faltan.",
    "Con niñas y niños, por separado si conviene: dónde se sienten seguros.",
    "Con el CTE: si conocemos la ruta de aviso y el protocolo estatal.",
    "Con los servicios: instancia de las mujeres, DIF."
   ],
   "al": "Si una niña o un niño en particular vive violencia en casa, acoso sexual o una relación de control, o si alguien sabe que una madre está en riesgo, no se comenta en grupo ni se interroga a nadie: se avisa ese mismo día a la dirección, que sigue el protocolo estatal y da aviso a la Procuraduría de Protección de Niñas, Niños y Adolescentes. Si el riesgo es inminente, se llama a emergencias (911). En la planeación no se registran casos ni nombres."
  },
  "S46": {
   "t": "Del cuidado del cuerpo no se habla",
   "n": "N07",
   "sl": "En la casa y en la escuela no se habla del cuerpo, de los límites ni de los secretos que no hay que guardar, por pudor, por miedo o porque «no es tema para niños». Ese silencio deja a la niñez sin palabras y sin adultos de confianza a quienes contar, y favorece a quien abusa, que cuenta con que nadie hablará.",
   "ejes": [
    {
     "e": "VS",
     "p": true,
     "pq": "El eje incluye la educación integral en sexualidad y la prevención de violencias. Enseñar el nombre de las partes del cuerpo, el derecho a decir no y a quién pedir ayuda forma parte de él."
    },
    {
     "e": "IG",
     "p": false,
     "pq": "El eje pide no reproducir patrones de violencia hacia las niñas y cuestionar prácticas institucionalizadas. La violencia sexual recae sobre todo en ellas, y prevenirla con perspectiva de género es parte del eje."
    }
   ],
   "prob": [
    "¿Quiénes son las personas grandes en las que confiamos cuando algo nos preocupa?",
    "¿Qué secretos nos hacen sentir bien y cuáles nos hacen sentir mal?",
    "¿Cómo se llaman las partes de nuestro cuerpo y quién decide quién puede tocarlo?"
   ],
   "iv": "Un trabajo de prevención primaria acordado con las familias (nombrar el cuerpo, decir no, reconocer a los adultos de confianza) y un colectivo que conoce y practica la ruta de aviso.",
   "pot": [
    "Protocolos estatales y materiales oficiales de prevención",
    "Centro de salud y DIF",
    "Madres y padres dispuestos a hablar del tema",
    "Docentes con formación en educación integral en sexualidad",
    "Niñas y niños que ya saben a quién acudir"
   ],
   "ind": [
    "Con el CTE y la dirección: si el protocolo estatal de violencia sexual está a la mano y quién es el enlace.",
    "Con las familias: qué les da miedo de hablar del cuerpo y qué palabras usan en casa.",
    "Con niñas y niños: a quién acuden cuando algo les preocupa."
   ],
   "al": "Esta ficha es de prevención primaria, no de detección. Si aparece un indicio sobre una niña o un niño en particular (conducta o lenguaje sexual impropio para su edad, miedo a una persona concreta, regalos o dinero de un adulto, dolor al sentarse, un relato), no se le interroga, no se confronta a nadie, no se toman fotos ni se registran detalles. Se avisa ese mismo día a la dirección, que sigue el protocolo estatal de violencia sexual y da aviso a la Procuraduría de Protección de Niñas, Niños y Adolescentes. Si el riesgo es inminente, se llama a emergencias (911). Los lineamientos de la SEP contra la violencia sexual en educación básica (Acuerdo 17/05/25; fechas por cotejar) obligan a la prevención."
  },
  "S47": {
   "t": "El miedo interrumpe la escuela: cuidar primero",
   "n": "N07",
   "sl": "La violencia armada o el control de grupos criminales decide cuándo abre la escuela, por dónde se camina y de qué se puede hablar. Quienes la ejercen ganan control del territorio y del silencio; pierden niñas, niños y familias, a quienes se les recorta el derecho a aprender, jugar y moverse sin miedo.",
   "ejes": [
    {
     "e": "VS",
     "p": true,
     "pq": "El eje abarca la prevención de violencias y accidentes y el bienestar emocional. La contradicción afecta la seguridad física y emocional de la niñez en la escuela y en los trayectos, y lo que corresponde es cuidar y proteger."
    }
   ],
   "prob": [
    "¿Qué lugares de la escuela nos hacen sentir seguros y tranquilos? ¿Por qué?",
    "¿Qué hacemos juntos cuando algo nos da miedo?",
    "¿Quiénes nos cuidan cuando venimos y nos vamos de la escuela, y cómo podemos cuidarnos entre todos?"
   ],
   "iv": "Hacer de la escuela un territorio de cuidado: acuerdos de protección con las familias y la autoridad educativa, rituales de llegada y de calma, y espacios de juego y expresión que devuelvan a la niñez la experiencia de un lugar seguro.",
   "pot": [
    "Redes de familias que acompañan los trayectos",
    "Personas de confianza (conserjes, vendedores, abuelas) que cuidan las entradas y salidas",
    "Juegos, cantos y prácticas que dan calma",
    "Protocolo de seguridad escolar y simulacros que ya existen",
    "Servicios de apoyo psicosocial que sí responden",
    "Un colectivo docente que se sostiene entre sí"
   ],
   "ind": [
    "Con el CTE y la dirección: si hay un protocolo de seguridad escolar y una ruta de aviso vigentes, y cómo se comunica una suspensión.",
    "Con las familias, en un espacio seguro y sin preguntar por hechos: qué necesitan para que sus hijas e hijos lleguen y regresen tranquilos.",
    "Con niñas y niños, solo con dibujo o juego y nunca con relatos: dónde se sienten seguros.",
    "Con la supervisión: qué apoyos psicosociales hay para la escuela."
   ],
   "al": "La ficha nunca registra hechos, lugares ni actores, y no propone proyectos que mapeen la violencia. Si alguien del colectivo conoce un riesgo para una niña o un niño en particular (amenaza, señales de reclutamiento, desaparición o asesinato de un familiar), no lo comenta en la sesión: avisa ese mismo día a la dirección, que sigue el protocolo estatal y da aviso a la Procuraduría de Protección de Niñas, Niños y Adolescentes. Si el riesgo es inminente, se llama a emergencias (911). Hay que cuidar también a quien da el aviso: el aviso lo da la institución, no la persona."
  },
  "S48": {
   "t": "Ausencias por violencia que no se pueden nombrar",
   "n": "N07",
   "sl": "Cuando la desaparición, el asesinato o el encarcelamiento de familiares se vuelven parte del paisaje, el miedo y el estigma («en algo andarían») obligan a callar el dolor. Gana el silencio que protege a quienes ejercen la violencia; pierden las niñas y los niños, que viven duelos sin respuesta ni acompañamiento y a veces cambian de pronto de quién los cuida.",
   "ejes": [
    {
     "e": "VS",
     "p": true,
     "pq": "El eje incluye el bienestar emocional y la prevención de violencias. Un duelo sin acompañamiento afecta la salud integral de la niñez y pide una respuesta de cuidado."
    },
    {
     "e": "AE",
     "p": false,
     "pq": "El eje impulsa la expresión sensible del mundo y su relación con las manifestaciones culturales, con una dimensión reflexiva y afectiva. Las prácticas de memoria que la comunidad ya tiene (altares, cantos, ofrendas, rezos) dan un lenguaje para elaborar lo que no se puede decir con palabras."
    }
   ],
   "prob": [
    "¿Cómo recordamos en nuestra comunidad a las personas que queremos y ya no están con nosotros?",
    "¿Qué nos ayuda cuando sentimos tristeza o extrañamos a alguien?",
    "¿Cómo podemos acompañar a una compañera o un compañero triste sin preguntarle lo que no quiere contar?"
   ],
   "iv": "Una escuela que acompaña sin pedir relatos: un rincón o un ritual de memoria construido con las prácticas de la comunidad y acuerdos del colectivo para cuidar a la niñez en duelo, con el apoyo de servicios especializados.",
   "pot": [
    "Altares, ofrendas, rezos, novenarios y cantos",
    "Abuelas y redes de vecinas que cuidan",
    "Personas de confianza en la escuela",
    "Servicios de apoyo psicosocial que responden",
    "Docentes con experiencia en acompañar duelos"
   ],
   "ind": [
    "Con el CTE: a qué apoyos psicosociales se puede derivar y cómo se informa a la escuela de un cambio de tutor, sin registrar casos.",
    "Con familias o personas de confianza, solo si es seguro: qué prácticas de memoria se viven y si conviene llevarlas a la escuela.",
    "Con niñas y niños: nada sobre los hechos; solo qué les da calma (dibujo, juego, música)."
   ],
   "al": "Si alguien del colectivo sabe que una niña o un niño en particular perdió a un familiar por desaparición o asesinato, o vive amenazas, no se comenta en la sesión ni se le pregunta a la niña o al niño: se avisa ese mismo día a la dirección, que sigue el protocolo estatal y da aviso a la Procuraduría de Protección de Niñas, Niños y Adolescentes para coordinar el apoyo psicosocial. Si hay ideas de morir o autolesión, el aviso es inmediato. Nunca se registran nombres, hechos ni lugares, ni se proponen proyectos de búsqueda o de mapeo."
  },
  "S49": {
   "t": "La violencia ofrece pertenencia, dinero y prestigio",
   "n": "N07",
   "sl": "Donde faltan oportunidades, reconocimiento y espacios propios para la niñez, la violencia y la narcocultura ofrecen un modelo de éxito (armas, dinero, poder, mujeres como trofeo) que se cuela en juegos, música y aspiraciones. Ganan quienes reclutan y quienes lucran con esa imagen; pierden las niñas y los niños, sobre todo los mayores empujados hacia una hombría violenta, y la comunidad, que ve la muerte como algo normal.",
   "ejes": [
    {
     "e": "PC",
     "p": true,
     "pq": "El eje es la capacidad de interrogar la realidad, oponerse a la injusticia y cuestionar lo que pasa inadvertido por parecer normal. Aquí se trata de leer críticamente los mensajes que presentan la violencia como éxito y de preguntar quién gana con ellos: una contradicción de poder y de medios."
    },
    {
     "e": "IG",
     "p": false,
     "pq": "El eje pide no reproducir modelos de violencia y discriminación y entender la desigualdad de género como algo histórico. La narcocultura propone una masculinidad armada y trata a las mujeres como objeto, y eso se puede cuestionar en el aula."
    }
   ],
   "prob": [
    "¿Qué dicen las canciones y los videos que más escuchamos sobre lo que es tener éxito? ¿Qué no dicen?",
    "¿Qué otras formas hay de que nos respeten y nos quieran en nuestra comunidad?",
    "¿Quién gana cuando la violencia se pone de moda en canciones y videos?"
   ],
   "iv": "Construir con niñas y niños referentes propios de valentía y éxito (oficios, deportes, música, historias de personas de la comunidad) y espacios de pertenencia en la escuela, como equipos, bandas o talleres, que compitan con lo que ofrece la violencia.",
   "pot": [
    "Deporte, música, banda de guerra y talleres",
    "Personas de la comunidad que siguieron estudiando",
    "Jóvenes que acompañan a la niñez",
    "Fiestas y prácticas propias que dan pertenencia",
    "Docentes en quienes la niñez confía"
   ],
   "ind": [
    "Con niñas y niños de las Fases 4 y 5, en asamblea de aula y sin preguntar por personas ni hechos: qué admiran y por qué.",
    "Con las familias: qué espacios para la niñez y la juventud hay o se perdieron.",
    "Con el CTE: cómo reaccionamos ante esos juegos (castigo, silencio o diálogo).",
    "Con la supervisión: qué programas de prevención hay en el municipio."
   ],
   "al": "La ficha describe un clima colectivo, nunca a una niña o un niño. Las señales particulares de reclutamiento o «utilización» (dinero u objetos sin explicación, adultos ajenos que esperan a la salida, encargos de vigilar o «avisar», ausencias intermitentes) no se investigan ni se comentan en grupo: se avisa ese mismo día a la dirección para activar el protocolo estatal y la Procuraduría de Protección de Niñas, Niños y Adolescentes. Si el riesgo es inminente, se llama a emergencias (911). No se propone ningún proyecto que nombre grupos, lugares o personas."
  },
  "S50": {
   "t": "Malestar emocional sin espacio ni escucha",
   "n": "N08",
   "sl": "La tristeza, el enojo, el miedo o la ansiedad se ven a diario en el aula, pero la escuela tiene poco tiempo y pocas herramientas para escuchar, y los servicios de salud mental casi no llegan. Gana una lógica que solo atiende la conducta que molesta; pierden las niñas y los niños, cuyo malestar se castiga o se ignora.",
   "ejes": [
    {
     "e": "VS",
     "p": true,
     "pq": "El eje abarca el bienestar emocional y la prevención: atender el malestar forma parte de la salud integral."
    }
   ],
   "prob": [
    "¿Qué sentimos cuando algo nos preocupa y cómo se nota en el cuerpo?",
    "¿Con quién podemos hablar cuando estamos tristes o enojados?",
    "¿Qué podemos hacer en el salón para estar más tranquilos?"
   ],
   "iv": "Un tiempo y un espacio diarios de escucha en el aula (asamblea de emociones, rincón de calma) y una ruta acordada con salud o el DIF para canalizar lo que la escuela no puede atender.",
   "pot": [
    "Docentes que escuchan",
    "Juego, arte y música",
    "Servicios de salud mental que sí responden",
    "Familias atentas",
    "Materiales de educación socioemocional"
   ],
   "ind": [
    "Con niñas y niños, con dibujos o un «semáforo de emociones»: qué les preocupa.",
    "Con las familias: qué cambios notan en casa.",
    "Con el CTE y salud: a dónde se puede derivar."
   ],
   "al": "Si una niña o un niño habla de querer morir, tiene marcas de autolesión, o dibuja o escribe sobre hacerse daño, no se deja para después ni se comenta en grupo: se le acompaña con calma, se avisa de inmediato a la dirección, que informa a la familia según el protocolo estatal, y se canaliza a salud. Si el riesgo es inminente, se llama a emergencias (911)."
  },
  "S51": {
   "t": "Duelos y orfandad sin lugar en la escuela",
   "n": "N08",
   "sl": "Las muertes por enfermedad, accidentes, feminicidio o la pandemia, y las separaciones por migración, dejan a niñas y niños en duelo o al cuidado de abuelas y tías, pero la escuela sigue su calendario como si nada. Gana una escuela que separa aprender de sentir; pierden las niñas y los niños, que cargan solos con la pérdida, aunque la comunidad sabe acompañarla con sus propios rituales.",
   "ejes": [
    {
     "e": "AE",
     "p": true,
     "pq": "El eje impulsa la expresión sensible del mundo y su relación con las manifestaciones culturales, con una dimensión reflexiva y afectiva. Los rituales y las prácticas de memoria de la comunidad ofrecen un lenguaje para elaborar el duelo."
    },
    {
     "e": "VS",
     "p": false,
     "pq": "El eje abarca el bienestar emocional: un duelo acompañado protege la salud integral."
    }
   ],
   "prob": [
    "¿Cómo recordamos en nuestras familias a quienes ya no están?",
    "¿Qué nos ayuda cuando extrañamos a alguien?",
    "¿Cómo podemos acompañar a una compañera o un compañero que está triste?"
   ],
   "iv": "Un proyecto de memoria hecho con las prácticas de la comunidad (ofrenda, relatos, cantos) y acuerdos del colectivo para acompañar a la niñez en duelo y reconocer a quienes ahora la cuidan.",
   "pot": [
    "Día de Muertos y ofrendas",
    "Narrativa oral de las personas mayores",
    "Fiestas, música y danza",
    "Abuelas y tías cuidadoras",
    "Servicios de apoyo que responden"
   ],
   "ind": [
    "Con familias y cuidadores: si conviene llevar la memoria a la escuela y cómo hacerlo.",
    "Con niñas y niños: qué les ayuda cuando extrañan a alguien.",
    "Con el CTE: cómo nos enteramos de un duelo y cómo acompañamos."
   ],
   "al": "Si una niña o un niño en duelo expresa ideas de morir o de hacerse daño, o si la orfandad se debe a un feminicidio o a violencia y no hay adultos responsables, se avisa de inmediato a la dirección, que sigue el protocolo estatal y da aviso a la Procuraduría de Protección de Niñas, Niños y Adolescentes."
  },
  "S52": {
   "t": "Alfabetización inicial que no termina de consolidarse",
   "n": "N09",
   "sl": "Muchas niñas y niños llegan a 3.º sin leer ni escribir de forma convencional, y la escuela lo atribuye al niño o a la familia. Se protege así una enseñanza descontextualizada; pierden quienes llegan con menos libros en casa y menos tiempo adulto disponible.",
   "ejes": [
    {
     "e": "LE",
     "p": true,
     "pq": "El eje plantea hacer de la escuela una comunidad de lectoras y lectores. La ficha parte de las prácticas que hay, no solo del rezago."
    },
    {
     "e": "INC",
     "p": false,
     "pq": "El eje mira las barreras en el contexto. Quien no se alfabetiza a tiempo queda fuera de casi todo lo demás."
    }
   ],
   "prob": [
    "¿Para qué nos sirve leer y escribir aquí, en nuestra comunidad?",
    "¿Qué palabras ya sabemos leer en la calle, en la tienda o en el celular?",
    "¿A quién le queremos escribir algo de verdad?"
   ],
   "iv": "Alfabetización a partir de textos reales del entorno (nombres, anuncios, recetas, mensajes), con lectura compartida con familias y escritura para destinatarios reales.",
   "pot": [
    "Textos del entorno que niñas y niños ya reconocen",
    "Familias que leen o cuentan historias",
    "Biblioteca de aula o escolar"
   ],
   "ind": [
    "Proporción por grado y fase (diagnóstico de inicio)",
    "Cómo se enseña hoy a leer en cada grupo (CTE, observación entre pares)"
   ],
   "al": ""
  },
  "S53": {
   "t": "Leer en español sin comprender cuando la lengua es otra",
   "n": "N09",
   "sl": "Niñas y niños cuya lengua dominante no es el español se alfabetizan en español, una segunda lengua que todavía no dominan: descifran pero no comprenden. Pierden niñas y niños, a quienes se lee como 'atrasados'; se mantiene una alfabetización pensada para hablantes de español.",
   "ejes": [
    {
     "e": "LE",
     "p": true,
     "pq": "El eje reconoce el derecho a leer para comprender el mundo cotidiano. Ese derecho no se cumple si se lee en una lengua que no se domina."
    },
    {
     "e": "IC",
     "p": false,
     "pq": "Elegir la lengua de alfabetización es una decisión de poder. El eje pide simetría entre lenguas."
    }
   ],
   "prob": [
    "¿En qué lengua entendemos mejor un cuento? ¿Por qué?",
    "¿Qué pasa en nuestra cabeza cuando leemos palabras que no sabemos qué significan?",
    "¿Cómo podríamos leer primero en nuestra lengua y luego en español?"
   ],
   "iv": "Alfabetización inicial en la lengua materna con textos producidos por la comunidad, y paso gradual y explícito al español como segunda lengua.",
   "pot": [
    "Narrativa oral viva en la familia",
    "Libros de texto y materiales en la lengua",
    "Hermanos mayores bilingües que pueden leer con los pequeños"
   ],
   "ind": [
    "Lengua en que lee mejor cada grupo (complemento G; diagnóstico de inicio)",
    "Si la supervisión respalda alfabetizar en la lengua materna y con qué materiales (CTE, supervisión)"
   ],
   "al": ""
  },
  "S54": {
   "t": "Se escribe para el cuaderno, no para alguien",
   "n": "N09",
   "sl": "En la escuela se copia, se hacen planas y se contestan cuestionarios, pero casi nunca se escribe para un destinatario real ni para decir algo propio. Se sostiene la escritura como ejercicio; pierden niñas y niños, que no descubren la escritura como poder de decir su palabra.",
   "ejes": [
    {
     "e": "LE",
     "p": true,
     "pq": "El eje reconoce el derecho a producir textos que defiendan el pensamiento propio, no solo a reproducir."
    },
    {
     "e": "PC",
     "p": false,
     "pq": "Escribir para opinar, reclamar o proponer ejerce la capacidad de interrogar la realidad."
    }
   ],
   "prob": [
    "¿A quién le has escrito algo que de verdad leyó?",
    "¿Qué te gustaría decirle por escrito a alguien de la comunidad o a una autoridad?",
    "¿Qué cambia cuando escribimos para que alguien nos responda?"
   ],
   "iv": "Escritura con destinatario real: periódico mural, cartas a autoridades, folletos para las familias o un libro del grupo que circule en la comunidad.",
   "pot": [
    "Asuntos de la comunidad que niñas y niños quieren comunicar",
    "Periódico mural o radio escolar",
    "Familias y autoridades que pueden responder"
   ],
   "ind": [
    "Qué tipos de texto se producen hoy en cada grupo (revisión de cuadernos en CTE)",
    "A quién quieren escribir niñas y niños (asamblea de aula)"
   ],
   "al": ""
  },
  "S55": {
   "t": "Pocos libros a la mano y casi nada que leer por gusto",
   "n": "N09",
   "sl": "La biblioteca escolar está cerrada, guardada o vacía, y en casa y en la comunidad casi no hay textos que no sean de la escuela. Pierden niñas y niños de familias con menos recursos: leer queda como tarea y no como derecho ni gusto.",
   "ejes": [
    {
     "e": "LE",
     "p": true,
     "pq": "El eje pide que la escuela sea una comunidad de lectoras y lectores. Eso exige textos disponibles y tiempo para leer por gusto."
    },
    {
     "e": "INC",
     "p": false,
     "pq": "El acceso a la cultura escrita se reparte por clase y territorio; el eje pide eliminar esas barreras."
    }
   ],
   "prob": [
    "¿Qué te gustaría leer que no encuentras aquí?",
    "¿Dónde hay letras en nuestra comunidad?",
    "¿Cómo podríamos hacer que los libros salgan de la escuela y lleguen a las casas?"
   ],
   "iv": "Biblioteca circulante gestionada por niñas y niños, con préstamo a casa, lectura en voz alta con familias y libros hechos por el grupo.",
   "pot": [
    "Acervo escolar existente aunque guardado",
    "Personas que cuentan historias",
    "Sala de lectura, radio o biblioteca municipal cercana"
   ],
   "ind": [
    "Estado y uso del acervo escolar (recorrido en CTE)",
    "Qué se lee en las casas (conversación con familias, sin juicio)"
   ],
   "al": ""
  },
  "S56": {
   "t": "Lo que la comunidad lee, escribe y cuenta no entra a la escuela",
   "n": "N09",
   "sl": "La comunidad tiene prácticas letradas y orales propias (actas de asamblea, rezos, cantos, recetas, mensajes, avisos, relatos) que la escuela no reconoce como lectura ni escritura. Gana una idea escolar estrecha de la cultura escrita; pierden quienes leen y escriben 'de otra manera'.",
   "ejes": [
    {
     "e": "LE",
     "p": true,
     "pq": "El eje tiende puentes entre las prácticas escolares y las de la comunidad: esta ficha parte justo de ellas."
    },
    {
     "e": "IC",
     "p": false,
     "pq": "Reconocer prácticas en otras lenguas y formatos es relación simétrica entre culturas."
    }
   ],
   "prob": [
    "¿Qué se escribe en nuestra comunidad y quién lo escribe?",
    "¿Qué historias se cuentan en tu casa que nunca se han escrito?",
    "¿Quién se queda fuera cuando algo solo se dice por escrito?"
   ],
   "iv": "Un archivo del grupo con textos y relatos de la comunidad (recetas, actas, leyendas), transcritos y editados por niñas y niños con permiso de sus autores.",
   "pot": [
    "Narradoras y narradores orales",
    "Actas, cancioneros, recetarios familiares",
    "Radio o bocina comunitaria"
   ],
   "ind": [
    "Quién queda fuera de las prácticas escritas de la comunidad (mujeres mayores, no hablantes de español)",
    "Qué textos pueden compartirse y cuáles son reservados (autoridades, familias)"
   ],
   "al": ""
  },
  "S57": {
   "t": "Número de cuaderno que no sirve para leer la vida",
   "n": "N09",
   "sl": "En la escuela el número se reduce a operaciones y planas, mientras en la comunidad se calcula todo el tiempo: en el tianguis, en la milpa, en las cuentas de la casa, en los préstamos y en el pago por día. Gana una enseñanza que premia la rapidez y la memoria; pierden quienes no ven para qué sirve lo que aprenden, quienes ya calculan bien fuera del aula sin que nadie lo reconozca y la comunidad, que se queda sin herramientas para leer precios, deudas y salarios.",
   "ejes": [
    {
     "e": "INC",
     "p": true,
     "pq": "Inclusión pide eliminar las barreras para el aprendizaje y la participación: un número enseñado sin relación con la vida deja fuera a quienes aprenden desde su experiencia y desconoce lo que ya saben hacer."
    },
    {
     "e": "PC",
     "p": false,
     "pq": "Pensamiento crítico pide interrogar la realidad: medir, contar y comparar son herramientas para leer precios, salarios, deudas y repartos, y para preguntar si son justos."
    }
   ],
   "prob": [
    "¿Dónde usan los números las personas de nuestra comunidad cada día?",
    "¿Cuánto cuesta lo que comemos en una semana y cuánto se gana por un día de trabajo?",
    "¿Cómo se reparte algo de forma justa cuando no alcanza para todos?"
   ],
   "iv": "El grupo investiga precios, medidas y repartos reales de su comunidad (el tianguis, la milpa, la cooperativa escolar) con ayuda de las familias, y presenta lo que encontró con tablas y gráficas hechas por ellos.",
   "pot": [
    "Familias que comercian, miden o llevan cuentas",
    "Medidas y numeración propias de la comunidad o de su lengua",
    "Juegos tradicionales de conteo y azar",
    "Cooperativa escolar o tienda cercana"
   ],
   "ind": [
    "Dónde y cómo calculan las familias: conversación con madres, padres y comerciantes",
    "Si existe numeración o medida propia en la lengua de la comunidad: con una persona hablante",
    "Qué problemas de número les interesan a niñas y niños: asamblea de aula"
   ],
   "al": ""
  },
  "S58": {
   "t": "La pantalla que cuida cuando no hay quien cuide",
   "n": "N10",
   "sl": "Mientras las personas adultas trabajan jornadas largas o lejos de casa, el celular o la televisión se vuelven la forma más segura y barata de que niñas y niños estén en casa. Ganan las plataformas que retienen su atención y un orden laboral que no deja tiempo para cuidar; pierden niñas y niños, que se quedan solos frente a contenidos que nadie conversa con ellos, y las familias, a quienes se culpa de algo que no eligieron.",
   "ejes": [
    {
     "e": "PC",
     "p": true,
     "pq": "Pensamiento crítico pide cuestionar lo que se considera normal: la pantalla como solución de cuidado oculta la falta de tiempo y de redes que impone el trabajo, y lo que la industria gana con la atención infantil."
    },
    {
     "e": "VS",
     "p": false,
     "pq": "Vida saludable incluye el sueño, la actividad física y el bienestar emocional, que se afectan cuando la pantalla ocupa el tiempo libre sin acompañamiento."
    }
   ],
   "prob": [
    "¿Qué hacemos cuando no hay nadie en casa?",
    "¿Quién decide lo que vemos en la pantalla y quién gana cuando la vemos muchas horas?",
    "¿Qué otras cosas nos gustaría hacer en la tarde y con quién?"
   ],
   "iv": "El grupo registra su propio uso de pantallas sin culpas, analiza qué ve y quién lo produce, y con familias y vecinas arma una red o un calendario de actividades de tarde (juegos, lectura, deporte) en espacios cercanos.",
   "pot": [
    "Redes de vecinas y colectivos de cuidado",
    "Juegos tradicionales y de calle que recuerdan las personas mayores",
    "Espacios comunitarios disponibles por la tarde",
    "Usos creativos de lo digital"
   ],
   "ind": [
    "Cuánto tiempo y qué ven: registro anónimo hecho por el propio grupo, sin preguntar por su casa en público",
    "Qué horarios de trabajo tienen las familias: conversación en horario accesible, sin culpas",
    "Qué espacios y personas podrían acompañar las tardes: CTE y comité de padres"
   ],
   "al": "Si aparece un indicio de que un adulto desconocido contacta en línea a una niña o un niño, o le pide fotos o encuentros: no investigar ni revisar su teléfono frente al grupo; avisar hoy a la dirección, que sigue el protocolo estatal y da aviso a la Procuraduría de Protección; 911 si el riesgo es inminente. La ficha no registra casos."
  },
  "S59": {
   "t": "Violencia y narcocultura como entretenimiento",
   "n": "N10",
   "sl": "Niñas y niños consumen y repiten corridos, videos, retos y juegos que presentan la violencia y el crimen como éxito y como forma de ser hombre. Ganan quienes producen y monetizan ese contenido, y quienes reclutan; pierden niñas y niños, cuyas aspiraciones se estrechan.",
   "ejes": [
    {
     "e": "PC",
     "p": true,
     "pq": "El eje es oponerse a la injusticia y cuestionar lo que se vuelve normal: aquí, la violencia como espectáculo."
    },
    {
     "e": "IG",
     "p": false,
     "pq": "El eje pide cuestionar prácticas que reproducen violencia; estos contenidos promueven masculinidades violentas y cosifican a las mujeres."
    },
    {
     "e": "AE",
     "p": false,
     "pq": "El eje trabaja la expresión sensible y reflexiva; analizar y crear otras músicas e imágenes disputa el gusto."
    }
   ],
   "prob": [
    "¿Qué historias cuentan las canciones y videos que más escuchamos?",
    "¿Qué nos dicen sobre cómo deben ser los hombres y las mujeres?",
    "Si tú hicieras una canción sobre tu comunidad, ¿qué contaría?"
   ],
   "iv": "Taller de creación (canción, cómic, video) donde niñas y niños cuentan otras historias de su lugar y las presentan a sus familias.",
   "pot": [
    "Músicos y jóvenes creadores locales",
    "Niñas y niños con gusto por la música y el video",
    "Espacios de arte o deporte comunitarios"
   ],
   "ind": [
    "Qué contenidos consumen y en qué plataformas (asamblea de aula, sin juzgar)",
    "Qué opciones culturales hay para niñas y niños fuera de la escuela (recorrido, aliados)"
   ],
   "al": "Si hay señales de que una niña o niño es contactado o utilizado por grupos delictivos (dinero u objetos sin explicación, adultos ajenos a la salida, encargos), no se investiga ni se pregunta al niño: se avisa ese día a la dirección, se sigue el protocolo estatal y se acude a la Procuraduría de Protección; ante riesgo inminente, a emergencias. En contextos de violencia no se propone ningún proyecto que mapee la violencia."
  },
  "S60": {
   "t": "Cuerpos y géneros a la medida de las redes",
   "n": "N10",
   "sl": "En videos, retos y perfiles que siguen niñas y niños circula un modelo único de cuerpo, de belleza y de cómo «debe» ser una niña o un niño, medido en aprobación y en «likes». Ganan las marcas y las cuentas que viven de esa comparación; pierden niñas y niños que empiezan a rechazar su cuerpo, a burlarse del de otros o a callar lo que no encaja, sobre todo al acercarse la pubertad.",
   "ejes": [
    {
     "e": "PC",
     "p": true,
     "pq": "Pensamiento crítico pide interrogar los mensajes que se vuelven normales: quién produce el modelo de cuerpo y de género que circula en redes y quién gana con la comparación."
    },
    {
     "e": "IG",
     "p": false,
     "pq": "Igualdad de género pide desmontar estereotipos y mandatos de género; las redes los reproducen y exigen a niñas y niños cumplirlos."
    }
   ],
   "prob": [
    "¿Cómo son los cuerpos que más aparecen en los videos que vemos y cómo son los cuerpos de la gente de nuestra comunidad?",
    "¿Quién gana cuando nos sentimos mal con nuestro cuerpo?",
    "¿Qué cosas nos dicen que «no son de niñas» o «no son de niños» en las redes?"
   ],
   "iv": "El grupo analiza anuncios y videos, compara los cuerpos y modelos de género que muestran con los de su comunidad y produce sus propios retratos, mensajes o campañas con otras formas de ser niña o niño.",
   "pot": [
    "Usos creativos de lo digital",
    "Prácticas artísticas y deportivas del grupo y de la comunidad",
    "Madres y padres que comparten el cuidado",
    "Niñas y niños que preguntan y proponen"
   ],
   "ind": [
    "Qué cuentas y retos siguen: conversación con el grupo a partir de una codificación, sin pedir que muestren sus teléfonos",
    "Si hay burlas o rechazo por el cuerpo dentro de la escuela: CTE y docentes de educación física",
    "Qué materiales de educación integral en sexualidad usa la escuela: dirección"
   ],
   "al": "Si aparece un indicio de intercambio de imágenes íntimas, de acoso sexual en línea o de contacto de un adulto con una niña o un niño: no revisar teléfonos ni exhibir a nadie; avisar hoy a la dirección, que sigue el protocolo estatal contra la violencia sexual y da aviso a la Procuraduría de Protección. Si hay señales de autolesión o de trastornos de la alimentación, el aviso a la dirección es inmediato. La ficha no registra casos."
  },
  "S61": {
   "t": "Rumores y desinformación que nadie conversa con niñas y niños",
   "n": "N10",
   "sl": "Por grupos de mensajería y redes circulan rumores, noticias falsas y miedos (robachicos, curas milagro, retos, amenazas) que niñas y niños repiten sin que un adulto los ayude a contrastarlos. Ganan quienes lucran con el miedo y la atención; pierden niñas y niños y familias, que deciden con información falsa.",
   "ejes": [
    {
     "e": "PC",
     "p": true,
     "pq": "El eje es la capacidad de interrogar la realidad. Contrastar lo que circula es su forma más directa."
    },
    {
     "e": "LE",
     "p": false,
     "pq": "Leer críticamente textos digitales y producir información verificada es apropiarse de la cultura escrita de hoy."
    }
   ],
   "prob": [
    "¿Cómo sabemos si algo que vimos en el celular es verdad?",
    "¿Quién gana cuando un rumor se comparte miles de veces?",
    "¿Qué podemos hacer antes de reenviar algo?"
   ],
   "iv": "Un 'verificador' escolar donde niñas y niños investigan rumores que circulan y publican sus hallazgos para las familias.",
   "pot": [
    "Niñas y niños que preguntan y dudan",
    "Familias interesadas en proteger a sus hijos",
    "Radio comunitaria o periódico mural"
   ],
   "ind": [
    "Qué rumores circulan en el grupo y en las familias (asamblea, buzón anónimo)",
    "Si hay grupos de mensajería de familias de la escuela y qué se comparte (dirección, CEAP)"
   ],
   "al": "Si aparece el contacto de un adulto desconocido en línea con alguna niña o niño, no se investiga ni se registra en la ficha: se avisa ese día a la dirección y se sigue el protocolo estatal; la Procuraduría de Protección es la autoridad competente."
  },
  "S62": {
   "t": "Brecha digital: aprender sin conexión ni equipo",
   "n": "N10",
   "sl": "La escuela, los trámites y muchas tareas suponen celular con datos, computadora e internet, pero en la comunidad o en muchas casas no los hay o se comparten entre varios. Ganan quienes ya tienen acceso y las empresas que venden conectividad cara; pierden las familias rurales, indígenas y empobrecidas, cuya niñez queda fuera de tareas, avisos e información.",
   "ejes": [
    {
     "e": "INC",
     "p": true,
     "pq": "El acceso digital se reparte por clase y territorio; tareas y avisos que lo suponen son barreras para el aprendizaje y la participación que están en la escuela, no en las familias."
    },
    {
     "e": "PC",
     "p": false,
     "pq": "Pensamiento crítico pide interrogar la desigualdad que se da por normal: quién decide que lo digital es obligatorio y por qué en unos lugares hay conexión y en otros no."
    }
   ],
   "prob": [
    "¿Quién tiene celular, computadora o internet en nuestras casas y para qué los usamos?",
    "¿Por qué en unos lugares hay internet y en otros no? ¿Quién decide eso?",
    "¿Cómo podemos aprender y comunicarnos sin que nadie quede fuera?"
   ],
   "iv": "La escuela acuerda con las familias una comunicación que no dependa de datos (recados, carteles, radio comunitaria) y niñas y niños crean contenidos con los medios que sí tienen y gestionan un punto de acceso compartido.",
   "pot": [
    "Biblioteca, sala de lectura o radio comunitaria",
    "Usos creativos de lo digital",
    "Libros de texto en papel, también en lenguas originarias",
    "Puntos de acceso comunitarios",
    "Jóvenes que saben de tecnología"
   ],
   "ind": [
    "Qué acceso tienen las familias, sin preguntar ingresos: encuesta breve en la inscripción o en asamblea",
    "Qué tareas o avisos suponen internet: revisión en el CTE",
    "Conectividad y equipo de la escuela: dirección",
    "Qué usos digitales hacen niñas y niños: conversación en el aula"
   ],
   "al": ""
  },
  "S63": {
   "t": "Celular en la escuela: una regla sin acuerdo",
   "n": "N10",
   "sl": "La restricción del celular en las escuelas llega como norma, pero el teléfono es también la vía con la que muchas familias trabajadoras se comunican con sus hijos y con la escuela. Si la regla se aplica sin diálogo, gana el control y pierden la confianza y la posibilidad de aprender a usar críticamente lo digital; si no se aplica, gana la distracción y pierde el tiempo de aprender.",
   "ejes": [
    {
     "e": "PC",
     "p": true,
     "pq": "Pensamiento crítico pide que niñas y niños analicen y argumenten: construir en asamblea los acuerdos de uso del celular es leer críticamente su lugar en la vida escolar, en vez de solo obedecer o transgredir."
    },
    {
     "e": "VS",
     "p": false,
     "pq": "Vida saludable incluye el bienestar emocional y la convivencia, que se afectan con el uso sin acuerdos y con los conflictos que provoca."
    }
   ],
   "prob": [
    "¿Para qué usamos el celular y para qué nos sirve en la escuela?",
    "¿Quién decide las reglas del celular y por qué?",
    "¿Qué acuerdo sería justo para nosotros, para las familias y para el aprendizaje?"
   ],
   "iv": "El grupo y las familias construyen en asamblea un acuerdo de uso del celular que respeta la norma vigente, define cómo se comunica la escuela con las familias y reserva momentos para aprender a usar lo digital con sentido crítico.",
   "pot": [
    "Niñas y niños que preguntan y proponen",
    "Usos creativos de lo digital",
    "Comités y CEAP"
   ],
   "ind": [
    "Qué dice exactamente la norma vigente y cómo la aplicará la escuela: dirección",
    "Para qué necesitan las familias el contacto por celular: reunión en horario accesible",
    "Qué piensan niñas y niños de la regla: asamblea de aula"
   ],
   "al": "Si en el uso del celular aparece un indicio de acoso, de contacto de un adulto desconocido o de intercambio de imágenes íntimas, se sigue la ruta de protección: aviso hoy a la dirección y protocolo estatal, sin revisar teléfonos frente al grupo."
  },
  "S64": {
   "t": "Apodos, exclusión y golpes entre compañeros",
   "n": "N11",
   "sl": "Entre compañeros circulan apodos, burlas, exclusión del juego y golpes que las personas adultas suelen ver como «cosas de niños». Gana quien se impone con la fuerza o con el grupo; pierden quienes son señalados, que dejan de participar o de querer ir a la escuela, y también quienes miran sin saber qué hacer.",
   "ejes": [
    {
     "e": "INC",
     "p": true,
     "pq": "El eje busca que nadie quede fuera y contempla eliminar las barreras para el aprendizaje y la participación. El acoso saca del juego y de la participación a quien es señalado."
    }
   ],
   "prob": [
    "¿Cómo se siente que te pongan un apodo que no te gusta?",
    "¿Qué hacemos cuando vemos que molestan a alguien, y qué podríamos hacer?",
    "¿Qué reglas de juego harían que nadie se quede fuera en el recreo?"
   ],
   "iv": "Acuerdos de convivencia hechos por el propio grupo, recreos con juegos donde todos caben y una red de compañeras y compañeros que acompañan a quien es molestado.",
   "pot": [
    "Niñas y niños que ya defienden a otros",
    "Juegos tradicionales y cooperativos",
    "Asambleas de aula",
    "Protocolo escolar de acoso",
    "Docentes de educación física"
   ],
   "ind": [
    "Con niñas y niños, con un mapa del recreo o con dibujos: dónde y cuándo pasan las burlas.",
    "Con el CTE: cómo respondemos hoy y si conocemos el protocolo de acoso.",
    "Con las familias: qué escuchan en casa sobre lo que pasa en la escuela."
   ],
   "al": "Si el acoso contra una niña o un niño es grave o constante, o deja lesiones, la dirección activa el protocolo escolar y estatal de acoso, sin exhibir a nadie ante el grupo. Si hay señales de autolesión o ideas de morir, el aviso a la dirección es inmediato. No se registran nombres en la planeación."
  },
  "S65": {
   "t": "Lo que se escribe en los grupos también lastima",
   "n": "N11",
   "sl": "En los grupos de mensajería, las redes y los videojuegos circulan burlas, fotos sin permiso, amenazas y rumores que siguen a niñas y niños hasta su casa. Ganan las plataformas que viven de la atención y quienes se esconden detrás de la pantalla; pierden quienes son exhibidos, mientras la palabra escrita se usa para herir y no para decir lo propio.",
   "ejes": [
    {
     "e": "PC",
     "p": true,
     "pq": "El eje pide interrogar la realidad y lo que parece normal. Leer críticamente cómo funcionan los grupos y las redes, quién gana con la exhibición y qué se comparte sin pensar es una contradicción mediática que este eje atiende de lleno."
    },
    {
     "e": "LE",
     "p": false,
     "pq": "El eje reconoce el derecho a producir textos que defiendan el pensamiento propio y a tender puentes entre las prácticas escolares y las de la comunidad. Los mensajes digitales son prácticas letradas reales, y desde ellos se puede disputar ese uso."
    }
   ],
   "prob": [
    "¿Qué pasa con un mensaje o una foto después de enviarlos?",
    "¿Por qué parece más fácil burlarse de alguien por el celular que en persona?",
    "¿Cómo podemos usar lo que escribimos y grabamos para cuidarnos en lugar de lastimarnos?"
   ],
   "iv": "Que el grupo escriba sus propios acuerdos y mensajes de convivencia digital (carteles, cápsulas de radio, un reglamento hecho por niñas y niños) y los presente a las familias en las asambleas previstas por la regulación del celular.",
   "pot": [
    "Usos creativos de lo digital",
    "Radio escolar o comunitaria",
    "Niñas y niños que saben de tecnología",
    "Asambleas con las familias sobre el celular (Acuerdo 09/09/26)",
    "Biblioteca escolar"
   ],
   "ind": [
    "Con niñas y niños de las Fases 4 y 5: qué plataformas usan y qué les incomoda de lo que pasa ahí.",
    "Con las familias, en la asamblea sobre el celular: qué grupos existen y qué acuerdos tienen.",
    "Con el CTE: cómo respondemos a los conflictos que vienen de la pantalla."
   ],
   "al": "Si una niña o un niño recibe mensajes de un adulto desconocido, le piden fotos, o circulan imágenes íntimas o amenazas, no se revisa su celular ni se reenvía el contenido: se avisa ese mismo día a la dirección, que sigue el protocolo estatal y da aviso a la Procuraduría de Protección de Niñas, Niños y Adolescentes y a la autoridad competente. No se guardan capturas ni nombres en la planeación."
  },
  "S66": {
   "t": "Burlas por el cuerpo y la apariencia",
   "n": "N11",
   "sl": "Las burlas por el peso, la talla, los dientes, los lentes o la forma del cuerpo se toleran como juego, mientras los medios venden un solo modelo de cuerpo valioso. Ganan ese modelo y la industria que lo promueve; pierden las niñas y los niños que dejan de jugar, de comer frente a otros o de participar en educación física.",
   "ejes": [
    {
     "e": "INC",
     "p": true,
     "pq": "El eje pide eliminar las barreras para la participación: a quien se burlan por su cuerpo deja de participar en el juego, en la clase o en educación física."
    },
    {
     "e": "VS",
     "p": false,
     "pq": "El eje abarca el bienestar emocional y una relación sana con el cuerpo y la alimentación. La burla daña la salud emocional y puede alejar de la actividad física."
    }
   ],
   "prob": [
    "¿Todos los cuerpos son iguales? ¿Qué pasaría si lo fueran?",
    "¿Quién decide qué cuerpo es «bonito» en los anuncios y en las redes?",
    "¿Cómo podemos jugar para que todos los cuerpos puedan participar?"
   ],
   "iv": "Un proyecto sobre la diversidad de los cuerpos y todo lo que pueden hacer (juegos, retratos, entrevistas) que cambie las reglas del recreo y de educación física para que participen todas y todos.",
   "pot": [
    "Juegos tradicionales",
    "Docentes de educación física",
    "Resultados de Vive Saludable de la escuela, usados sin señalar a nadie",
    "Niñas y niños que defienden",
    "Retrato y artes visuales"
   ],
   "ind": [
    "Con niñas y niños: en qué momentos se sienten incómodos con su cuerpo en la escuela.",
    "Con el CTE: cómo usamos los resultados de Vive Saludable sin exhibir a nadie.",
    "Con las familias: qué comentarios sobre el cuerpo se hacen en casa."
   ],
   "al": "Si una niña o un niño deja de comer, se autolesiona o dice que no quiere vivir por cómo se ve, se avisa de inmediato a la dirección para seguir el protocolo y canalizar a salud. No se aborda en grupo."
  },
  "S67": {
   "t": "Quien no puede pagar queda señalado",
   "n": "N11",
   "sl": "Uniformes, útiles, cooperaciones, festivales y celulares marcan quién «tiene» y quién no, y la escuela convierte esas diferencias en burlas, exclusiones o culpa de las familias. Gana una idea de mérito que oculta la desigualdad de clase; pierden las niñas y los niños de las familias con menos ingresos, que se avergüenzan y dejan de participar.",
   "ejes": [
    {
     "e": "INC",
     "p": true,
     "pq": "El eje nombra la clase entre los motivos de exclusión: si una niña o un niño deja de participar por no poder pagar, no están incluidos todos."
    },
    {
     "e": "PC",
     "p": false,
     "pq": "El eje pide oponerse a la desigualdad y cuestionar lo que se ve como normal. La ficha invita a ver la pobreza como una relación social de poder y no como culpa individual."
    }
   ],
   "prob": [
    "¿Valemos más por lo que tenemos?",
    "¿Por qué algunas familias tienen más dinero que otras, si todas trabajan?",
    "¿Qué podemos hacer para que nadie se quede fuera de una actividad por no poder pagar?"
   ],
   "iv": "Acuerdos escolares para que ninguna actividad dependa de pagar (festivales sin costo, útiles compartidos, uniforme flexible) y un proyecto en el que el grupo investigue cuánto cuesta ir a la escuela y qué le toca garantizar al Estado.",
   "pot": [
    "Solidaridad entre familias",
    "CEAP y La Escuela es Nuestra",
    "Beca Rita Cetina",
    "Cooperativas o tianguis de intercambio",
    "Oficios de las familias"
   ],
   "ind": [
    "Con las familias, en reunión: qué gastos de la escuela les pesan más.",
    "Con niñas y niños: cuándo se han sentido fuera por no tener algo.",
    "Con el CTE y el CEAP: qué cobramos o exigimos."
   ],
   "al": ""
  },
  "S68": {
   "t": "La escuela pone barreras para aprender y participar",
   "n": "N11",
   "sl": "La escuela se organizó pensando en un alumno «típico», y por eso sus clases, materiales, tiempos y actitudes dejan fuera a quienes aprenden, se comunican o se mueven de otra manera. Se mantiene una enseñanza homogénea; pierden quienes reciben la etiqueta de «no puede», cuando la barrera está en el contexto.",
   "ejes": [
    {
     "e": "INC",
     "p": true,
     "pq": "El eje contempla eliminar las barreras para el aprendizaje y la participación, y aclara que no basta con estar inscrito. Esta ficha nombra esas barreras en el contexto escolar."
    }
   ],
   "prob": [
    "¿Todos aprendemos de la misma forma?",
    "¿Qué cosas del salón o de la escuela le hacen difícil a alguien participar?",
    "¿Cómo podemos cambiar una actividad para que todos podamos hacerla?"
   ],
   "iv": "Rediseñar con el grupo una actividad o un espacio de la escuela para que todas y todos participen (diseño universal), y llevar al CTE y al PEMC los ajustes que dependen de la escuela.",
   "pot": [
    "USAER o CAM que responde",
    "Familias que conocen a fondo a sus hijas e hijos",
    "Compañeros que apoyan",
    "Libros de texto en braille y macrotipo",
    "Docentes con experiencia en inclusión"
   ],
   "ind": [
    "Con las niñas y niños que enfrentan barreras y sus familias: qué les ayuda y qué les estorba.",
    "Con USAER o CAM: qué apoyos hay.",
    "Con el CTE: qué ajustes dependen de la organización escolar."
   ],
   "al": ""
  },
  "S69": {
   "t": "Niñez con discapacidad que no llega a la escuela",
   "n": "N11",
   "sl": "En la comunidad hay niñas y niños con discapacidad que no van a la escuela porque se piensa que «no pueden», porque no hay transporte, rampas ni apoyos, o porque las familias temen el rechazo. Gana una escuela que no tiene que cambiar; pierden esas niñas y niños su derecho a aprender, y sus madres, que suelen dejarlo todo para cuidarlos.",
   "ejes": [
    {
     "e": "INC",
     "p": true,
     "pq": "El eje aclara que no basta con incorporar a todos a la escuela, pero empieza por ahí: si falta una o uno por motivos de capacidad, no están incluidos todos."
    },
    {
     "e": "VS",
     "p": false,
     "pq": "El eje abarca el acceso a la salud y el bienestar. La falta de atención y de rehabilitación, y el aislamiento, afectan la salud integral de estas niñas y niños."
    }
   ],
   "prob": [
    "¿Todas las niñas y los niños de nuestra comunidad vienen a la escuela? ¿Quiénes faltan?",
    "¿Qué tendría que tener la escuela para que cualquier niña o niño pueda venir?",
    "¿Cómo podemos invitar y recibir a quien todavía no viene?"
   ],
   "iv": "Que el grupo haga un recorrido de accesibilidad por la escuela y el camino y proponga cambios, y que la escuela, con USAER y las familias, salga a buscar e invitar a quienes faltan.",
   "pot": [
    "Familias organizadas",
    "USAER, CAM, DIF o unidad de rehabilitación que responde",
    "CEAP con recursos",
    "Asociaciones de personas con discapacidad",
    "Compañeras y compañeros dispuestos a recibir"
   ],
   "ind": [
    "Con las familias de niñas y niños con discapacidad: qué les impide inscribirlos y qué necesitarían.",
    "Con el DIF, salud y USAER: qué apoyos y qué transporte hay.",
    "Con el CTE: si estamos dispuestos a recibirlos y con qué apoyos."
   ],
   "al": "Si una niña o un niño con discapacidad vive encierro, desatención grave o maltrato, se avisa a la dirección, que sigue el protocolo y da aviso a la Procuraduría de Protección de Niñas, Niños y Adolescentes, sin culpar a la familia y buscando apoyos."
  },
  "S70": {
   "t": "Ver, oír o comunicarse distinto, leído como «no aprender»",
   "n": "N11",
   "sl": "Cuando una niña o un niño no ve bien el pizarrón, no oye bien o se comunica con señas o de otra manera, la escuela suele leerlo como falta de interés o de capacidad, y enseña solo con la voz y el pizarrón. Gana una enseñanza que no cambia; pierden quienes llegan a la palabra por otros caminos, a quienes se les cierra la cultura escrita.",
   "ejes": [
    {
     "e": "INC",
     "p": true,
     "pq": "El eje contempla eliminar las barreras de comunicación para aprender y participar. Aquí la barrera está en la forma de enseñar, no en la niña o el niño."
    },
    {
     "e": "LE",
     "p": false,
     "pq": "El eje reconoce el derecho a leer y a producir textos. Las prácticas de comunicación y lectura accesibles en la familia, el aula o la comunidad son el punto de partida para construir el acceso a la cultura escrita."
    }
   ],
   "prob": [
    "¿De cuántas formas podemos decir algo sin hablar?",
    "¿Qué necesita una compañera o un compañero que no ve bien el pizarrón o no oye bien para aprender con nosotros?",
    "¿Cómo podemos hacer carteles y textos que entienda todo el grupo?"
   ],
   "iv": "Que el grupo aprenda señas básicas y haga materiales accesibles (letra grande, imágenes, audio), mientras la escuela gestiona con Vive Saludable, salud y USAER la revisión de la vista o del oído y los apoyos.",
   "pot": [
    "Familias que se comunican con señas",
    "Lengua de Señas Mexicana",
    "Libros de texto en braille y macrotipo",
    "Resultados de agudeza visual de Vive Saludable",
    "USAER",
    "Compañeros que interpretan"
   ],
   "ind": [
    "Con las familias: cómo se comunican en casa y qué saben de la vista o el oído de su hija o hijo.",
    "Con salud, Vive Saludable y USAER: qué revisiones y apoyos hay.",
    "Con niñas y niños: qué les ayuda a entender."
   ],
   "al": ""
  },
  "S71": {
   "t": "Quien va «atrasado» carga solo con la culpa",
   "n": "N11",
   "sl": "Cuando una niña o un niño no lee, no escribe o no calcula como se espera, la explicación suele ser «no le echa ganas» o «en su casa no lo apoyan», y casi nunca «¿qué pasa en nuestra forma de enseñar?». Esa lectura protege a la escuela de revisarse; pierden las niñas y los niños, muchas veces los más pobres, los indígenas o los de extraedad, que reciben menos expectativas y menos oportunidades.",
   "ejes": [
    {
     "e": "PC",
     "p": true,
     "pq": "El eje pide interrogar lo que parece normal. Las orientaciones del CTE proponen pasar de «¿qué le ocurre al estudiante?» a «¿qué sucede en la enseñanza que obstaculiza el aprendizaje?», es decir, que el colectivo se mire a sí mismo."
    },
    {
     "e": "INC",
     "p": false,
     "pq": "Las expectativas distintas según el origen, la clase o la «capacidad» excluyen: si de una o uno se espera menos, no están incluidos todos."
    }
   ],
   "prob": [
    "¿Todos aprendemos al mismo ritmo y de la misma forma?",
    "¿Qué nos ayuda a aprender algo que nos cuesta trabajo?",
    "¿Cómo podemos aprender juntos sin que nadie se sienta menos?"
   ],
   "iv": "Que el colectivo revise sus expectativas y sus prácticas con evidencias del propio grupo, y organice apoyos dentro del aula (tutoría entre compañeros, grupos flexibles) en lugar de etiquetar.",
   "pot": [
    "Tutoría entre compañeros",
    "Docentes que ya trabajan por niveles",
    "Familias que apoyan de otras maneras (oralidad, oficios)",
    "Niñas y niños que preguntan y proponen",
    "El CTE como espacio para revisar la práctica"
   ],
   "ind": [
    "Con el CTE: qué esperamos de cada grupo y en qué datos nos basamos.",
    "Con niñas y niños: qué les ayuda a aprender.",
    "Con las familias: cómo apoyan y qué saberes tienen."
   ],
   "al": ""
  },
  "S72": {
   "t": "Una escuela sin lugar para el arte y el juego",
   "n": "N12",
   "sl": "El arte y el juego se reducen a festivales, a decorar o a premiar cuando 'se terminó lo importante'; no hay tiempo ni espacio para crear. Gana una idea de escuela productiva; pierden niñas y niños, que se quedan sin un lenguaje para expresar lo que viven, y quienes no tienen otra oportunidad fuera.",
   "ejes": [
    {
     "e": "AE",
     "p": true,
     "pq": "El eje impulsa la expresión sensible del mundo con una dimensión reflexiva y afectiva; sin tiempo ni espacio no ocurre."
    }
   ],
   "prob": [
    "¿Cuándo pudiste crear algo libre en la escuela esta semana?",
    "¿Qué te gustaría expresar con dibujo, música o baile?",
    "¿Qué sientes cuando juegas y qué aprendes?"
   ],
   "iv": "Un espacio fijo de creación y juego con artistas o personas de la comunidad, cuyos productos se muestran como obra de niñas y niños.",
   "pot": [
    "Niñas y niños con intereses expresivos",
    "Artistas y artesanos locales",
    "Espacios comunitarios disponibles"
   ],
   "ind": [
    "Qué intereses expresivos tiene cada grupo",
    "Qué tiempo real tiene el arte en el horario (CTE)"
   ],
   "al": ""
  },
  "S73": {
   "t": "Calle y espacio público sin lugar para jugar",
   "n": "N12",
   "sl": "En la colonia o la comunidad no hay dónde jugar con libertad: la calle es de los coches, los terrenos se cerraron o son inseguros y el juego queda encerrado en la casa o en la pantalla, aunque las personas mayores recuerdan muchos juegos de calle. Ganan los usos del espacio que dejan dinero o dan paso al tránsito; pierde la niñez su derecho al juego y la comunidad un lugar de encuentro.",
   "ejes": [
    {
     "e": "AE",
     "p": true,
     "pq": "Artes y experiencias estéticas impulsa la expresión sensible del mundo y la relación con las manifestaciones culturales. El juego tradicional y de calle es una práctica cultural y estética viva de la comunidad que necesita un espacio; se valida porque esas prácticas existen, no por la carencia de lugar."
    }
   ],
   "prob": [
    "¿Dónde jugaban nuestras abuelas y abuelos y dónde jugamos ahora?",
    "¿Por qué la calle es más de los coches que de las niñas y los niños?",
    "¿Qué lugar podríamos recuperar para jugar todas y todos?"
   ],
   "iv": "Niñas y niños recuperan juegos de calle con personas mayores, los enseñan en el patio y organizan con la comunidad un día de calle para jugar o la apertura del patio escolar fuera del horario.",
   "pot": [
    "Juego tradicional y de calle",
    "Espacios comunitarios disponibles",
    "Personas mayores que recuerdan juegos",
    "Patio escolar y CEAP",
    "Comités vecinales y ligas deportivas"
   ],
   "ind": [
    "Qué espacios existen y quién los usa: recorrido con fotovoz de niñas y niños",
    "Qué juegos recuerdan las personas mayores: entrevistas hechas por niñas y niños",
    "Si el patio puede abrirse fuera del horario: dirección y CEAP",
    "Si el espacio público es inseguro por violencia: dirección"
   ],
   "al": "En contextos de violencia comunitaria no se mapean con niñas y niños los espacios inseguros: el proyecto se limita a espacios de la escuela."
  },
  "S74": {
   "t": "Prácticas propias reducidas a 'folclor' escolar",
   "n": "N12",
   "sl": "La fiesta, la danza o el traje de la comunidad aparecen en la escuela solo como número de festival, sin su sentido, su historia ni sus portadores, mientras se celebra con más peso lo nacional o lo comercial. Gana un multiculturalismo decorativo; pierden quienes viven esas prácticas como parte de su mundo.",
   "ejes": [
    {
     "e": "AE",
     "p": true,
     "pq": "El eje pide una relación reflexiva con las manifestaciones culturales, no solo su exhibición."
    },
    {
     "e": "IC",
     "p": false,
     "pq": "El eje advierte que el multiculturalismo puede mantener las diferencias a distancia; el folclor escolar lo hace."
    }
   ],
   "prob": [
    "¿Qué significa para tu familia la fiesta de la comunidad?",
    "¿Quién enseña la danza o la música y cómo la aprendió?",
    "¿Qué cambia cuando bailamos algo sin saber por qué se baila?"
   ],
   "iv": "Investigar con los portadores el sentido de una práctica propia y presentarla a la comunidad como conocimiento, no como espectáculo.",
   "pot": [
    "Danzantes, músicos y mayordomías",
    "Calendario festivo comunitario",
    "Familias que guardan trajes, instrumentos o relatos"
   ],
   "ind": [
    "Qué prácticas pueden mostrarse fuera de su contexto y cuáles no (portadores, autoridades)",
    "Qué se celebra y qué se omite en el calendario escolar (CTE)"
   ],
   "al": ""
  },
  "S75": {
   "t": "Experiencias estéticas lejos del alcance de niñas y niños",
   "n": "N12",
   "sl": "Fuera de la escuela, niñas y niños casi no tienen acceso a talleres, música en vivo, teatro, museos o espacios de creación: lo que hay queda lejos, cuesta o es para otros. Gana una distribución desigual de la cultura; pierden niñas y niños de localidades rurales y periferias, aunque su comunidad tenga prácticas propias.",
   "ejes": [
    {
     "e": "AE",
     "p": true,
     "pq": "El eje impulsa la relación con las manifestaciones culturales; la ficha parte del acceso y de las prácticas existentes."
    },
    {
     "e": "INC",
     "p": false,
     "pq": "El acceso a la cultura se reparte por clase y territorio; el eje pide quitar esas barreras."
    }
   ],
   "prob": [
    "¿Dónde puedes ver o hacer música, teatro o pintura cerca de tu casa?",
    "¿Por qué algunas niñas y niños tienen más opciones que otros?",
    "¿Qué podríamos traer o crear aquí para todos?"
   ],
   "iv": "Un festival o galería comunitaria hecho por niñas y niños con artistas locales, y la gestión ante el municipio de un taller permanente.",
   "pot": [
    "Artistas y artesanos locales",
    "Casa de cultura, plaza o salón comunitario",
    "Programas culturales municipales o estatales"
   ],
   "ind": [
    "Qué ofertas culturales existen y a qué costo (municipio, recorrido)",
    "Qué les gustaría hacer a niñas y niños (asamblea de aula)"
   ],
   "al": ""
  },
  "S76": {
   "t": "Familias convocadas para informar, no para decidir",
   "n": "N13",
   "sl": "La escuela llama a las familias para entregar boletas, pedir cooperaciones o dar avisos, en horarios y lenguas que no son las suyas; casi nunca para decidir. Gana la comodidad institucional; pierden madres trabajadoras, hablantes de otra lengua y familias que no pueden asistir, que quedan como 'las que no participan'.",
   "ejes": [
    {
     "e": "INC",
     "p": true,
     "pq": "El eje mira las barreras del contexto: horarios, lengua y canales que dejan fuera a algunas familias."
    },
    {
     "e": "IG",
     "p": false,
     "pq": "El trabajo de participar recae en las madres sin que tengan poder de decisión; el eje pide cuestionar ese reparto."
    }
   ],
   "prob": [
    "¿Quién de tu familia va a las juntas de la escuela? ¿Por qué esa persona?",
    "¿Qué le gustaría decidir a tu familia sobre la escuela?",
    "¿Cómo podríamos invitar a las familias para que de verdad puedan venir y opinar?"
   ],
   "iv": "Una asamblea escolar con horario acordado, en las lenguas de las familias, donde se decida una parte del proyecto comunitario.",
   "pot": [
    "CEAP o comité activo",
    "Madres organizadas",
    "Asamblea comunitaria"
   ],
   "ind": [
    "Qué horarios y canales prefieren las familias (consulta breve)",
    "Qué quieren aprender y qué les preocupa (asamblea)"
   ],
   "al": ""
  },
  "S77": {
   "t": "La palabra de niñas y niños no llega a quien decide",
   "n": "N13",
   "sl": "A niñas y niños se les pregunta poco y, cuando opinan, su palabra no cambia nada: las decisiones de la escuela y de la comunidad las toman los adultos. Gana el adultocentrismo; pierden niñas y niños, que aprenden que su voz no cuenta (cultura del silencio).",
   "ejes": [
    {
     "e": "PC",
     "p": true,
     "pq": "El eje es la capacidad de niñas y niños de interrogar la realidad y oponerse a la injusticia; requiere espacios donde su palabra tenga efecto."
    },
    {
     "e": "INC",
     "p": false,
     "pq": "La edad es motivo de exclusión de la toma de decisiones; el eje pide que no falte nadie."
    }
   ],
   "prob": [
    "¿Quién decide las cosas en nuestra escuela? ¿Y en la comunidad?",
    "¿Alguna vez dijiste una idea y pasó algo con ella?",
    "¿Qué decisión de la escuela te gustaría tomar con tus compañeros?"
   ],
   "iv": "Asamblea de niñas y niños con una decisión real a su cargo (un espacio, una regla, una parte del proyecto) y una respuesta pública de la dirección o la autoridad.",
   "pot": [
    "Niñas y niños que preguntan y proponen",
    "Asamblea comunitaria o CEAP que puede escuchar",
    "Docentes dispuestos a ceder decisiones"
   ],
   "ind": [
    "Qué espacios de participación existen y qué pasó con lo que se dijo (dirección, niñas y niños)",
    "Si las niñas participan igual que los niños (observación)"
   ],
   "al": "Si al dar la palabra a niñas y niños aparece un relato que indica riesgo para una niña o niño en particular, no se profundiza ni se registra en la asamblea: se acude ese día a la dirección y se sigue el protocolo estatal."
  },
  "S78": {
   "t": "Comunidad y escuela que desconfían una de otra",
   "n": "N13",
   "sl": "Hay desconfianza mutua: la comunidad ve la escuela como algo ajeno o impuesto, y la escuela ve a la comunidad como obstáculo; puede haber divisiones internas (partidos, religión, conflicto agrario). Pierden niñas y niños, que quedan en medio; gana la inercia de no dialogar.",
   "ejes": [
    {
     "e": "PC",
     "p": true,
     "pq": "El eje pide entender las causas históricas de un conflicto y el papel que juega la propia escuela en él."
    },
    {
     "e": "IC",
     "p": false,
     "pq": "Cuando la escuela llegó como institución de castellanización o de fuera, la desconfianza es una herencia de esa asimetría."
    }
   ],
   "prob": [
    "¿Cómo era la escuela cuando estudiaron nuestras abuelas y abuelos?",
    "¿Qué cosas han hecho juntas la escuela y la comunidad?",
    "¿Qué necesitaríamos para confiar más unos en otros?"
   ],
   "iv": "Un proyecto pequeño y visible acordado en asamblea, con un compromiso de la escuela que se cumple y se devuelve públicamente.",
   "pot": [
    "Autoridades comunitarias dispuestas al diálogo",
    "Memoria de proyectos compartidos",
    "Personas puente (exalumnos, docentes de la zona)"
   ],
   "ind": [
    "Origen de la desconfianza desde la voz de la comunidad (entrevistas con personas mayores y autoridades)",
    "Qué divisiones conviene no tocar en un proyecto escolar (dirección, supervisión)"
   ],
   "al": ""
  },
  "S79": {
   "t": "'Así ha sido siempre': organización que no llega a la escuela",
   "n": "N13",
   "sl": "Frente a sus problemas, la comunidad repite que 'así es' o 'no se puede', aunque existen asambleas, comités o colectivos que ya han logrado cosas; la escuela no se vincula con ellos. Ganan quienes se benefician de que nada cambie; pierden niñas y niños, que no ven la organización como posibilidad.",
   "ejes": [
    {
     "e": "PC",
     "p": true,
     "pq": "El eje cuestiona lo que se ve como normal; pasar de 'así es' a 'esto tiene causas y se puede cambiar' es su núcleo."
    },
    {
     "e": "INC",
     "p": false,
     "pq": "Vincular a niñas y niños con la organización comunitaria los incluye como sujetos de las decisiones colectivas."
    }
   ],
   "prob": [
    "¿Qué ha logrado nuestra comunidad cuando se organiza?",
    "¿Por qué a veces pensamos que las cosas no pueden cambiar?",
    "¿Qué problema de aquí podríamos ayudar a resolver como escuela?"
   ],
   "iv": "Un proyecto de Aprendizaje Servicio con el comité o la asamblea, en el que niñas y niños participan en una gestión real y la documentan.",
   "pot": [
    "Asamblea, tequio o comités activos",
    "Memoria de luchas y logros",
    "Personas con cargos dispuestas a trabajar con la escuela"
   ],
   "ind": [
    "Qué logros recuerda la comunidad y quiénes participaron (personas mayores, autoridades)",
    "Qué riesgos tendría que la escuela se vincule (conflictos políticos; dirección)"
   ],
   "al": ""
  },
  "S80": {
   "t": "La memoria de la comunidad que nadie cuenta a niñas y niños",
   "n": "N13",
   "sl": "La historia del lugar (su fundación, sus luchas, sus pérdidas, sus logros) vive en la memoria de las personas mayores, pero la escuela enseña sobre todo una historia nacional lejana. Pierden niñas y niños, que no saben de dónde vienen ni que su comunidad ha transformado su realidad; gana una historia oficial sin rostros locales.",
   "ejes": [
    {
     "e": "PC",
     "p": true,
     "pq": "Conocer las causas históricas y los actos de la comunidad permite ver la realidad como histórica y transformable."
    },
    {
     "e": "LE",
     "p": false,
     "pq": "Registrar y escribir la memoria oral convierte a niñas y niños en autores de la cultura escrita de su comunidad."
    }
   ],
   "prob": [
    "¿Cómo era nuestra comunidad cuando tus abuelos eran niños?",
    "¿Qué cosas logró la gente de aquí y cómo lo hizo?",
    "¿Qué historia de nuestro lugar debería conocer todo el mundo?"
   ],
   "iv": "Libro, línea del tiempo o radio-relato de la memoria local hecho con las personas mayores y devuelto a la comunidad.",
   "pot": [
    "Personas mayores narradoras",
    "Fotografías y documentos familiares",
    "Autoridades y archivos comunitarios"
   ],
   "ind": [
    "Qué temas de memoria son seguros de tratar y cuáles son dolorosos (personas mayores, autoridades)",
    "Quiénes quieren contar y cómo (visitas)"
   ],
   "al": "En territorios con violencia o desaparición reciente, la memoria se trabaja solo como historia de logros y de vida comunitaria, sin recoger relatos de hechos violentos ni nombres; si surge un duelo o una situación de riesgo de una niña o niño, se acude a la dirección y al protocolo estatal."
  }
 }
};
