// Verses organized by spiritual topic/need

export interface TopicVerse {
  reference: string;
  text: string;
  bookSlug: string;
  chapter: number;
  verseNumbers: number[];
}

export interface TopicCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  verses: TopicVerse[];
}

export const versesByTopic: Record<string, TopicCategory> = {
  // === EMOCIONES ===
  ansiedad: {
    id: 'ansiedad',
    name: 'Ansiedad y Preocupación',
    icon: '😰',
    description: 'Versículos para cuando te sientes ansioso o preocupado',
    verses: [
      {
        reference: 'Filipenses 4:6-7',
        text: 'Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias. Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.',
        bookSlug: 'filipenses',
        chapter: 4,
        verseNumbers: [6, 7],
      },
      {
        reference: '1 Pedro 5:7',
        text: 'Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.',
        bookSlug: '1-pedro',
        chapter: 5,
        verseNumbers: [7],
      },
      {
        reference: 'Mateo 6:34',
        text: 'Así que, no os afanéis por el día de mañana, porque el día de mañana traerá su afán.',
        bookSlug: 'mateo',
        chapter: 6,
        verseNumbers: [34],
      },
      {
        reference: 'Isaías 41:10',
        text: 'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo.',
        bookSlug: 'isaias',
        chapter: 41,
        verseNumbers: [10],
      },
      {
        reference: 'Salmos 55:22',
        text: 'Echa sobre Jehová tu carga, y él te sustentará.',
        bookSlug: 'salmos',
        chapter: 55,
        verseNumbers: [22],
      },
      {
        reference: 'Juan 14:27',
        text: 'La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo.',
        bookSlug: 'juan',
        chapter: 14,
        verseNumbers: [27],
      },
    ],
  },
  paz: {
    id: 'paz',
    name: 'Paz Interior',
    icon: '🕊️',
    description: 'Versículos para encontrar paz en medio de las tormentas',
    verses: [
      {
        reference: 'Juan 14:27',
        text: 'La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da.',
        bookSlug: 'juan',
        chapter: 14,
        verseNumbers: [27],
      },
      {
        reference: 'Isaías 26:3',
        text: 'Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera.',
        bookSlug: 'isaias',
        chapter: 26,
        verseNumbers: [3],
      },
      {
        reference: 'Filipenses 4:7',
        text: 'Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones.',
        bookSlug: 'filipenses',
        chapter: 4,
        verseNumbers: [7],
      },
      {
        reference: 'Salmos 4:8',
        text: 'En paz me acostaré, y asimismo dormiré; porque solo tú, Jehová, me haces vivir confiado.',
        bookSlug: 'salmos',
        chapter: 4,
        verseNumbers: [8],
      },
      {
        reference: 'Romanos 15:13',
        text: 'El Dios de esperanza os llene de todo gozo y paz en el creer.',
        bookSlug: 'romanos',
        chapter: 15,
        verseNumbers: [13],
      },
      {
        reference: 'Colosenses 3:15',
        text: 'Y la paz de Dios gobierne en vuestros corazones.',
        bookSlug: 'colosenses',
        chapter: 3,
        verseNumbers: [15],
      },
    ],
  },
  tristeza: {
    id: 'tristeza',
    name: 'Tristeza y Depresión',
    icon: '😢',
    description: 'Consuelo para momentos de tristeza profunda',
    verses: [
      {
        reference: 'Salmos 34:18',
        text: 'Cercano está Jehová a los quebrantados de corazón; y salva a los contritos de espíritu.',
        bookSlug: 'salmos',
        chapter: 34,
        verseNumbers: [18],
      },
      {
        reference: 'Mateo 5:4',
        text: 'Bienaventurados los que lloran, porque ellos recibirán consolación.',
        bookSlug: 'mateo',
        chapter: 5,
        verseNumbers: [4],
      },
      {
        reference: 'Salmos 30:5',
        text: 'Por la noche durará el lloro, y a la mañana vendrá la alegría.',
        bookSlug: 'salmos',
        chapter: 30,
        verseNumbers: [5],
      },
      {
        reference: '2 Corintios 1:3-4',
        text: 'Bendito sea el Dios y Padre de nuestro Señor Jesucristo, Padre de misericordias y Dios de toda consolación.',
        bookSlug: '2-corintios',
        chapter: 1,
        verseNumbers: [3, 4],
      },
      {
        reference: 'Isaías 61:3',
        text: 'A ordenar que a los afligidos de Sion se les dé gloria en lugar de ceniza, óleo de gozo en lugar de luto.',
        bookSlug: 'isaias',
        chapter: 61,
        verseNumbers: [3],
      },
      {
        reference: 'Apocalipsis 21:4',
        text: 'Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto.',
        bookSlug: 'apocalipsis',
        chapter: 21,
        verseNumbers: [4],
      },
    ],
  },
  enojo: {
    id: 'enojo',
    name: 'Enojo y Frustración',
    icon: '😤',
    description: 'Guía bíblica para manejar el enojo',
    verses: [
      {
        reference: 'Efesios 4:26-27',
        text: 'Airaos, pero no pequéis; no se ponga el sol sobre vuestro enojo.',
        bookSlug: 'efesios',
        chapter: 4,
        verseNumbers: [26, 27],
      },
      {
        reference: 'Proverbios 15:1',
        text: 'La blanda respuesta quita la ira; mas la palabra áspera hace subir el furor.',
        bookSlug: 'proverbios',
        chapter: 15,
        verseNumbers: [1],
      },
      {
        reference: 'Santiago 1:19-20',
        text: 'Sea todo hombre pronto para oír, tardo para hablar, tardo para airarse.',
        bookSlug: 'santiago',
        chapter: 1,
        verseNumbers: [19, 20],
      },
      {
        reference: 'Proverbios 14:29',
        text: 'El que tarda en airarse es grande de entendimiento.',
        bookSlug: 'proverbios',
        chapter: 14,
        verseNumbers: [29],
      },
      {
        reference: 'Colosenses 3:8',
        text: 'Pero ahora dejad también vosotros todas estas cosas: ira, enojo, malicia, blasfemia.',
        bookSlug: 'colosenses',
        chapter: 3,
        verseNumbers: [8],
      },
    ],
  },
  gratitud: {
    id: 'gratitud',
    name: 'Gratitud',
    icon: '🙏',
    description: 'Versículos para cultivar un corazón agradecido',
    verses: [
      {
        reference: '1 Tesalonicenses 5:18',
        text: 'Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros.',
        bookSlug: '1-tesalonicenses',
        chapter: 5,
        verseNumbers: [18],
      },
      {
        reference: 'Salmos 103:2',
        text: 'Bendice, alma mía, a Jehová, y no olvides ninguno de sus beneficios.',
        bookSlug: 'salmos',
        chapter: 103,
        verseNumbers: [2],
      },
      {
        reference: 'Colosenses 3:17',
        text: 'Y todo lo que hacéis, sea de palabra o de hecho, hacedlo todo en el nombre del Señor Jesús, dando gracias a Dios.',
        bookSlug: 'colosenses',
        chapter: 3,
        verseNumbers: [17],
      },
      {
        reference: 'Filipenses 4:6',
        text: 'Sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias.',
        bookSlug: 'filipenses',
        chapter: 4,
        verseNumbers: [6],
      },
    ],
  },
  // === SITUACIONES DE VIDA ===
  perdida: {
    id: 'perdida',
    name: 'Pérdida y Duelo',
    icon: '💔',
    description: 'Consuelo para quienes atraviesan una pérdida',
    verses: [
      {
        reference: 'Salmos 23:4',
        text: 'Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo.',
        bookSlug: 'salmos',
        chapter: 23,
        verseNumbers: [4],
      },
      {
        reference: 'Juan 11:25-26',
        text: 'Yo soy la resurrección y la vida; el que cree en mí, aunque esté muerto, vivirá.',
        bookSlug: 'juan',
        chapter: 11,
        verseNumbers: [25, 26],
      },
      {
        reference: '1 Tesalonicenses 4:13-14',
        text: 'No os entristezcáis como los otros que no tienen esperanza.',
        bookSlug: '1-tesalonicenses',
        chapter: 4,
        verseNumbers: [13, 14],
      },
      {
        reference: 'Apocalipsis 21:4',
        text: 'Enjugará Dios toda lágrima de los ojos de ellos.',
        bookSlug: 'apocalipsis',
        chapter: 21,
        verseNumbers: [4],
      },
      {
        reference: '2 Corintios 5:8',
        text: 'Estar ausentes del cuerpo, y presentes al Señor.',
        bookSlug: '2-corintios',
        chapter: 5,
        verseNumbers: [8],
      },
    ],
  },
  enfermedad: {
    id: 'enfermedad',
    name: 'Enfermedad',
    icon: '🏥',
    description: 'Versículos de esperanza para tiempos de enfermedad',
    verses: [
      {
        reference: 'Salmos 103:2-3',
        text: 'Bendice, alma mía, a Jehová... el que sana todas tus dolencias.',
        bookSlug: 'salmos',
        chapter: 103,
        verseNumbers: [2, 3],
      },
      {
        reference: 'Jeremías 30:17',
        text: 'Mas yo haré venir sanidad para ti, y sanaré tus heridas, dice Jehová.',
        bookSlug: 'jeremias',
        chapter: 30,
        verseNumbers: [17],
      },
      {
        reference: 'Isaías 53:5',
        text: 'Por su llaga fuimos nosotros curados.',
        bookSlug: 'isaias',
        chapter: 53,
        verseNumbers: [5],
      },
      {
        reference: 'Santiago 5:15',
        text: 'Y la oración de fe salvará al enfermo, y el Señor lo levantará.',
        bookSlug: 'santiago',
        chapter: 5,
        verseNumbers: [15],
      },
      {
        reference: '3 Juan 1:2',
        text: 'Amado, yo deseo que tú seas prosperado en todas las cosas, y que tengas salud.',
        bookSlug: '3-juan',
        chapter: 1,
        verseNumbers: [2],
      },
    ],
  },
  trabajo: {
    id: 'trabajo',
    name: 'Trabajo y Finanzas',
    icon: '💼',
    description: 'Guía bíblica para el trabajo y las finanzas',
    verses: [
      {
        reference: 'Colosenses 3:23',
        text: 'Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres.',
        bookSlug: 'colosenses',
        chapter: 3,
        verseNumbers: [23],
      },
      {
        reference: 'Filipenses 4:19',
        text: 'Mi Dios, pues, suplirá todo lo que os falta conforme a sus riquezas en gloria.',
        bookSlug: 'filipenses',
        chapter: 4,
        verseNumbers: [19],
      },
      {
        reference: 'Proverbios 16:3',
        text: 'Encomienda a Jehová tus obras, y tus pensamientos serán afirmados.',
        bookSlug: 'proverbios',
        chapter: 16,
        verseNumbers: [3],
      },
      {
        reference: 'Mateo 6:33',
        text: 'Buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.',
        bookSlug: 'mateo',
        chapter: 6,
        verseNumbers: [33],
      },
      {
        reference: 'Deuteronomio 28:12',
        text: 'Jehová te abrirá su buen tesoro... para bendecir toda obra de tus manos.',
        bookSlug: 'deuteronomio',
        chapter: 28,
        verseNumbers: [12],
      },
    ],
  },
  conflictos: {
    id: 'conflictos',
    name: 'Conflictos y Relaciones',
    icon: '🤝',
    description: 'Sabiduría para resolver conflictos',
    verses: [
      {
        reference: 'Mateo 5:9',
        text: 'Bienaventurados los pacificadores, porque ellos serán llamados hijos de Dios.',
        bookSlug: 'mateo',
        chapter: 5,
        verseNumbers: [9],
      },
      {
        reference: 'Romanos 12:18',
        text: 'Si es posible, en cuanto dependa de vosotros, estad en paz con todos los hombres.',
        bookSlug: 'romanos',
        chapter: 12,
        verseNumbers: [18],
      },
      {
        reference: 'Proverbios 15:1',
        text: 'La blanda respuesta quita la ira; mas la palabra áspera hace subir el furor.',
        bookSlug: 'proverbios',
        chapter: 15,
        verseNumbers: [1],
      },
      {
        reference: 'Mateo 18:15',
        text: 'Si tu hermano peca contra ti, ve y repréndele estando tú y él solos.',
        bookSlug: 'mateo',
        chapter: 18,
        verseNumbers: [15],
      },
      {
        reference: 'Efesios 4:32',
        text: 'Sed benignos unos con otros, misericordiosos, perdonándoos unos a otros.',
        bookSlug: 'efesios',
        chapter: 4,
        verseNumbers: [32],
      },
    ],
  },
  // === NECESIDADES ESPIRITUALES ===
  perdon: {
    id: 'perdon',
    name: 'Perdón',
    icon: '🙏',
    description: 'Versículos sobre el perdón de Dios y perdonar a otros',
    verses: [
      {
        reference: '1 Juan 1:9',
        text: 'Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados.',
        bookSlug: '1-juan',
        chapter: 1,
        verseNumbers: [9],
      },
      {
        reference: 'Efesios 4:32',
        text: 'Perdonándoos unos a otros, como Dios también os perdonó a vosotros en Cristo.',
        bookSlug: 'efesios',
        chapter: 4,
        verseNumbers: [32],
      },
      {
        reference: 'Salmos 103:12',
        text: 'Cuanto está lejos el oriente del occidente, hizo alejar de nosotros nuestras rebeliones.',
        bookSlug: 'salmos',
        chapter: 103,
        verseNumbers: [12],
      },
      {
        reference: 'Mateo 6:14',
        text: 'Porque si perdonáis a los hombres sus ofensas, os perdonará también a vosotros vuestro Padre celestial.',
        bookSlug: 'mateo',
        chapter: 6,
        verseNumbers: [14],
      },
      {
        reference: 'Colosenses 3:13',
        text: 'De la manera que Cristo os perdonó, así también hacedlo vosotros.',
        bookSlug: 'colosenses',
        chapter: 3,
        verseNumbers: [13],
      },
      {
        reference: 'Isaías 1:18',
        text: 'Aunque vuestros pecados fueren como la grana, como la nieve serán emblanquecidos.',
        bookSlug: 'isaias',
        chapter: 1,
        verseNumbers: [18],
      },
    ],
  },
  fortaleza: {
    id: 'fortaleza',
    name: 'Fortaleza',
    icon: '💪',
    description: 'Versículos para encontrar fuerza en Dios',
    verses: [
      {
        reference: 'Filipenses 4:13',
        text: 'Todo lo puedo en Cristo que me fortalece.',
        bookSlug: 'filipenses',
        chapter: 4,
        verseNumbers: [13],
      },
      {
        reference: 'Isaías 40:31',
        text: 'Pero los que esperan a Jehová tendrán nuevas fuerzas.',
        bookSlug: 'isaias',
        chapter: 40,
        verseNumbers: [31],
      },
      {
        reference: 'Salmos 27:1',
        text: 'Jehová es mi luz y mi salvación; ¿de quién temeré?',
        bookSlug: 'salmos',
        chapter: 27,
        verseNumbers: [1],
      },
      {
        reference: '2 Corintios 12:9',
        text: 'Mi gracia te basta, porque mi poder se perfecciona en la debilidad.',
        bookSlug: '2-corintios',
        chapter: 12,
        verseNumbers: [9],
      },
      {
        reference: 'Josué 1:9',
        text: 'Mira que te mando que te esfuerces y seas valiente.',
        bookSlug: 'josue',
        chapter: 1,
        verseNumbers: [9],
      },
      {
        reference: 'Nehemías 8:10',
        text: 'El gozo de Jehová es vuestra fortaleza.',
        bookSlug: 'nehemias',
        chapter: 8,
        verseNumbers: [10],
      },
    ],
  },
  direccion: {
    id: 'direccion',
    name: 'Dirección y Guía',
    icon: '🧭',
    description: 'Versículos para cuando necesitas dirección',
    verses: [
      {
        reference: 'Proverbios 3:5-6',
        text: 'Fíate de Jehová de todo tu corazón... y él enderezará tus veredas.',
        bookSlug: 'proverbios',
        chapter: 3,
        verseNumbers: [5, 6],
      },
      {
        reference: 'Salmos 32:8',
        text: 'Te haré entender, y te enseñaré el camino en que debes andar.',
        bookSlug: 'salmos',
        chapter: 32,
        verseNumbers: [8],
      },
      {
        reference: 'Salmos 119:105',
        text: 'Lámpara es a mis pies tu palabra, y lumbrera a mi camino.',
        bookSlug: 'salmos',
        chapter: 119,
        verseNumbers: [105],
      },
      {
        reference: 'Isaías 30:21',
        text: 'Entonces tus oídos oirán a tus espaldas palabra que diga: Este es el camino, andad por él.',
        bookSlug: 'isaias',
        chapter: 30,
        verseNumbers: [21],
      },
      {
        reference: 'Santiago 1:5',
        text: 'Si alguno de vosotros tiene falta de sabiduría, pídala a Dios.',
        bookSlug: 'santiago',
        chapter: 1,
        verseNumbers: [5],
      },
    ],
  },
  fe: {
    id: 'fe',
    name: 'Fe y Confianza',
    icon: '✨',
    description: 'Versículos para fortalecer tu fe',
    verses: [
      {
        reference: 'Hebreos 11:1',
        text: 'Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.',
        bookSlug: 'hebreos',
        chapter: 11,
        verseNumbers: [1],
      },
      {
        reference: 'Romanos 10:17',
        text: 'La fe es por el oír, y el oír, por la palabra de Dios.',
        bookSlug: 'romanos',
        chapter: 10,
        verseNumbers: [17],
      },
      {
        reference: 'Marcos 11:24',
        text: 'Todo lo que pidiereis orando, creed que lo recibiréis, y os vendrá.',
        bookSlug: 'marcos',
        chapter: 11,
        verseNumbers: [24],
      },
      {
        reference: 'Mateo 17:20',
        text: 'Si tuviereis fe como un grano de mostaza... nada os será imposible.',
        bookSlug: 'mateo',
        chapter: 17,
        verseNumbers: [20],
      },
      {
        reference: '2 Corintios 5:7',
        text: 'Porque por fe andamos, no por vista.',
        bookSlug: '2-corintios',
        chapter: 5,
        verseNumbers: [7],
      },
    ],
  },
  tentacion: {
    id: 'tentacion',
    name: 'Tentaciones',
    icon: '🛡️',
    description: 'Versículos para resistir la tentación',
    verses: [
      {
        reference: '1 Corintios 10:13',
        text: 'No os ha sobrevenido ninguna tentación que no sea humana; pero fiel es Dios, que no os dejará ser tentados más de lo que podéis resistir.',
        bookSlug: '1-corintios',
        chapter: 10,
        verseNumbers: [13],
      },
      {
        reference: 'Santiago 4:7',
        text: 'Someteos, pues, a Dios; resistid al diablo, y huirá de vosotros.',
        bookSlug: 'santiago',
        chapter: 4,
        verseNumbers: [7],
      },
      {
        reference: 'Hebreos 4:15',
        text: 'Porque no tenemos un sumo sacerdote que no pueda compadecerse de nuestras debilidades, sino uno que fue tentado en todo según nuestra semejanza, pero sin pecado.',
        bookSlug: 'hebreos',
        chapter: 4,
        verseNumbers: [15],
      },
      {
        reference: 'Mateo 26:41',
        text: 'Velad y orad, para que no entréis en tentación.',
        bookSlug: 'mateo',
        chapter: 26,
        verseNumbers: [41],
      },
      {
        reference: 'Gálatas 5:16',
        text: 'Andad en el Espíritu, y no satisfagáis los deseos de la carne.',
        bookSlug: 'galatas',
        chapter: 5,
        verseNumbers: [16],
      },
    ],
  },
  proteccion: {
    id: 'proteccion',
    name: 'Protección',
    icon: '🛡️',
    description: 'Versículos sobre la protección de Dios',
    verses: [
      {
        reference: 'Salmos 91:1-2',
        text: 'El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente.',
        bookSlug: 'salmos',
        chapter: 91,
        verseNumbers: [1, 2],
      },
      {
        reference: 'Salmos 121:7-8',
        text: 'Jehová te guardará de todo mal; él guardará tu alma.',
        bookSlug: 'salmos',
        chapter: 121,
        verseNumbers: [7, 8],
      },
      {
        reference: 'Proverbios 18:10',
        text: 'Torre fuerte es el nombre de Jehová; a él correrá el justo, y será levantado.',
        bookSlug: 'proverbios',
        chapter: 18,
        verseNumbers: [10],
      },
      {
        reference: 'Salmos 46:1',
        text: 'Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.',
        bookSlug: 'salmos',
        chapter: 46,
        verseNumbers: [1],
      },
      {
        reference: '2 Tesalonicenses 3:3',
        text: 'Pero fiel es el Señor, que os afirmará y guardará del mal.',
        bookSlug: '2-tesalonicenses',
        chapter: 3,
        verseNumbers: [3],
      },
    ],
  },
  esperanza: {
    id: 'esperanza',
    name: 'Esperanza',
    icon: '🌅',
    description: 'Versículos que traen esperanza',
    verses: [
      {
        reference: 'Jeremías 29:11',
        text: 'Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.',
        bookSlug: 'jeremias',
        chapter: 29,
        verseNumbers: [11],
      },
      {
        reference: 'Romanos 15:13',
        text: 'El Dios de esperanza os llene de todo gozo y paz en el creer.',
        bookSlug: 'romanos',
        chapter: 15,
        verseNumbers: [13],
      },
      {
        reference: 'Hebreos 6:19',
        text: 'La cual tenemos como segura y firme ancla del alma.',
        bookSlug: 'hebreos',
        chapter: 6,
        verseNumbers: [19],
      },
      {
        reference: 'Lamentaciones 3:22-23',
        text: 'Por la misericordia de Jehová no hemos sido consumidos... nuevas son cada mañana.',
        bookSlug: 'lamentaciones',
        chapter: 3,
        verseNumbers: [22, 23],
      },
      {
        reference: 'Salmos 42:11',
        text: '¿Por qué te abates, oh alma mía? Espera en Dios.',
        bookSlug: 'salmos',
        chapter: 42,
        verseNumbers: [11],
      },
    ],
  },
};

// Get topic by ID
export function getTopicById(topicId: string): TopicCategory | undefined {
  return versesByTopic[topicId];
}

// Get all topics as array
export function getAllTopics(): TopicCategory[] {
  return Object.values(versesByTopic);
}

// Get topics by category (emociones, situaciones, espirituales)
export function getTopicsByCategory(category: 'emociones' | 'situaciones' | 'espirituales'): TopicCategory[] {
  const categoryMap: Record<string, string[]> = {
    emociones: ['ansiedad', 'paz', 'tristeza', 'enojo', 'gratitud'],
    situaciones: ['perdida', 'enfermedad', 'trabajo', 'conflictos'],
    espirituales: ['perdon', 'fortaleza', 'direccion', 'fe', 'tentacion', 'proteccion', 'esperanza'],
  };
  
  return categoryMap[category]?.map(id => versesByTopic[id]).filter(Boolean) || [];
}

// Quick access topics for home page
export const quickAccessTopics = [
  { id: 'ansiedad', label: 'Estoy ansioso', icon: '😰' },
  { id: 'paz', label: 'Necesito paz', icon: '🕊️' },
  { id: 'perdon', label: 'Busco perdón', icon: '🙏' },
  { id: 'fortaleza', label: 'Necesito fortaleza', icon: '💪' },
];
