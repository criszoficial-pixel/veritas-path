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
  lucideIcon: string;
  image: string;
  description: string;
  extendedDescription: string;
  verses: TopicVerse[];
}

export const versesByTopic: Record<string, TopicCategory> = {
  // === EMOCIONES ===
  ansiedad: {
    id: 'ansiedad',
    name: 'Ansiedad y Preocupación',
    lucideIcon: 'AlertCircle',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    description: 'Versículos para cuando te sientes ansioso o preocupado',
    extendedDescription: 'La ansiedad puede sentirse abrumadora, pero no tienes que enfrentarla solo. Dios nos invita a depositar nuestras cargas en Él y encontrar descanso en Su presencia. Estos versículos te recordarán que Su paz está disponible para ti en todo momento.',
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
    lucideIcon: 'Heart',
    image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&q=80',
    description: 'Versículos para encontrar paz en medio de las tormentas',
    extendedDescription: 'La paz que Dios ofrece no depende de nuestras circunstancias. Es una paz profunda que guarda nuestro corazón y mente incluso en los momentos más difíciles. Descubre cómo descansar en la presencia de Dios y experimentar Su shalom.',
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
    lucideIcon: 'CloudRain',
    image: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=1200&q=80',
    description: 'Consuelo para momentos de tristeza profunda',
    extendedDescription: 'En los valles más oscuros, Dios camina a nuestro lado. Él es cercano a los quebrantados de corazón y ofrece consuelo que trasciende nuestras circunstancias. Estos versículos te recordarán que la alegría viene después del llanto.',
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
    lucideIcon: 'Flame',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&q=80',
    description: 'Guía bíblica para manejar el enojo',
    extendedDescription: 'El enojo es una emoción humana, pero Dios nos llama a manejarlo con sabiduría. La Escritura nos enseña a ser lentos para airarnos y rápidos para escuchar. Aprende a canalizar tus emociones de manera que honre a Dios y proteja tus relaciones.',
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
    lucideIcon: 'Sun',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80',
    description: 'Versículos para cultivar un corazón agradecido',
    extendedDescription: 'La gratitud transforma nuestra perspectiva y nos acerca a Dios. Cuando elegimos agradecer, incluso en circunstancias difíciles, nuestro corazón se llena de gozo. Estos versículos te ayudarán a desarrollar un espíritu de agradecimiento constante.',
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
    lucideIcon: 'Cloud',
    image: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1200&q=80',
    description: 'Consuelo para quienes atraviesan una pérdida',
    extendedDescription: 'El duelo es un proceso profundo y personal. En medio del dolor, Dios promete caminar contigo. Él es el Padre de misericordias y el Dios de toda consolación. Estos versículos ofrecen esperanza eterna y la certeza de Su presencia en el valle.',
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
    lucideIcon: 'HeartPulse',
    image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&q=80',
    description: 'Versículos de esperanza para tiempos de enfermedad',
    extendedDescription: 'En tiempos de enfermedad, Dios es nuestro sanador y consolador. Aunque el cuerpo pueda debilitarse, Su gracia es suficiente y Su poder se perfecciona en nuestra debilidad. Encuentra fortaleza y esperanza en estas promesas de restauración.',
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
    lucideIcon: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
    description: 'Guía bíblica para el trabajo y las finanzas',
    extendedDescription: 'Dios se interesa por cada área de tu vida, incluyendo tu trabajo y finanzas. Él promete proveer para tus necesidades cuando buscas primero Su reino. Estos versículos te guiarán a trabajar con integridad y confiar en Su provisión.',
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
    lucideIcon: 'Users',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80',
    description: 'Sabiduría para resolver conflictos',
    extendedDescription: 'Las relaciones pueden ser complicadas, pero Dios nos da sabiduría para navegar los conflictos con gracia. Ser pacificadores es un llamado divino que refleja el corazón de Cristo. Descubre principios bíblicos para restaurar y fortalecer tus relaciones.',
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
    lucideIcon: 'HeartHandshake',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80',
    description: 'Versículos sobre el perdón de Dios y perdonar a otros',
    extendedDescription: 'El perdón es uno de los actos más poderosos de liberación espiritual. Perdonar no significa olvidar o justificar el daño, sino elegir la paz sobre el rencor. La Biblia nos enseña que fuimos perdonados para poder perdonar a otros.',
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
    lucideIcon: 'Shield',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
    description: 'Versículos para encontrar fuerza en Dios',
    extendedDescription: 'Cuando te sientes débil, Dios es tu fortaleza. Su poder se perfecciona en nuestra debilidad, y en Él podemos hacer todas las cosas. Estos versículos te recordarán que no dependes de tu propia fuerza, sino del poder infinito de Dios.',
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
    lucideIcon: 'Compass',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80',
    description: 'Versículos para cuando necesitas dirección',
    extendedDescription: 'En los cruces de caminos de la vida, Dios promete guiarte. Su Palabra es lámpara a tus pies y lumbrera a tu camino. Cuando confías en Él con todo tu corazón, Él endereza tus sendas y te muestra el camino que debes seguir.',
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
    lucideIcon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    description: 'Versículos para fortalecer tu fe',
    extendedDescription: 'La fe es la certeza de lo que esperamos y la convicción de lo que no vemos. Es el fundamento de nuestra relación con Dios y la llave que abre las puertas de lo imposible. Fortalece tu fe con estas poderosas promesas de la Escritura.',
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
    lucideIcon: 'ShieldAlert',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&q=80',
    description: 'Versículos para resistir la tentación',
    extendedDescription: 'La tentación es parte de la vida, pero Dios siempre provee una salida. Jesús mismo fue tentado y venció, mostrando que es posible resistir. Con la armadura de Dios y Su Palabra, puedes mantenerte firme ante cualquier tentación.',
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
    lucideIcon: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1200&q=80',
    description: 'Versículos sobre la protección de Dios',
    extendedDescription: 'Dios es tu refugio y fortaleza, tu pronto auxilio en las tribulaciones. Bajo Sus alas encontrarás protección, y Su fidelidad te rodeará como un escudo. Descansa en la seguridad de que el Todopoderoso vela por ti día y noche.',
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
    lucideIcon: 'Sunrise',
    image: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1200&q=80',
    description: 'Versículos que traen esperanza',
    extendedDescription: 'La esperanza en Dios es un ancla firme para el alma. Cuando todo parece oscuro, Sus promesas iluminan el camino. Él tiene planes de bienestar para ti, no de mal, para darte un futuro y una esperanza que no decepciona.',
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

// Icon map for dynamic rendering
export const topicIconMap: Record<string, string> = {
  ansiedad: 'AlertCircle',
  paz: 'Heart',
  tristeza: 'CloudRain',
  enojo: 'Flame',
  gratitud: 'Sun',
  perdida: 'Cloud',
  enfermedad: 'HeartPulse',
  trabajo: 'Briefcase',
  conflictos: 'Users',
  perdon: 'HeartHandshake',
  fortaleza: 'Shield',
  direccion: 'Compass',
  fe: 'Sparkles',
  tentacion: 'ShieldAlert',
  proteccion: 'ShieldCheck',
  esperanza: 'Sunrise',
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

// Quick access topics for home page (now with lucide icon names)
export const quickAccessTopics = [
  { id: 'ansiedad', label: 'Estoy ansioso', lucideIcon: 'AlertCircle' },
  { id: 'paz', label: 'Necesito paz', lucideIcon: 'Heart' },
  { id: 'perdon', label: 'Busco perdón', lucideIcon: 'HeartHandshake' },
  { id: 'fortaleza', label: 'Necesito fortaleza', lucideIcon: 'Shield' },
];
