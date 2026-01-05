import { QuizQuestion } from './quizData';

export type { QuizQuestion };

// GÉNESIS - 15 preguntas
export const genesisQuestions: QuizQuestion[] = [
  {
    id: 'gen-001',
    type: 'multiple-choice',
    question: '¿Cuántos días tomó la creación según Génesis?',
    options: ['5 días', '6 días', '7 días', '10 días'],
    correctAnswer: 1,
    explanation: 'Dios creó todo en 6 días y descansó el séptimo día.',
    reference: 'Génesis 2:2',
    difficulty: 'facil',
    category: 'genesis',
    tags: ['creacion', 'genesis', 'AT']
  },
  {
    id: 'gen-002',
    type: 'multiple-choice',
    question: '¿Cómo se llamaba la esposa de Abraham?',
    options: ['Rebeca', 'Sara', 'Raquel', 'Lea'],
    correctAnswer: 1,
    explanation: 'Sara fue la esposa de Abraham y madre de Isaac.',
    reference: 'Génesis 17:15',
    difficulty: 'facil',
    category: 'genesis',
    tags: ['personaje', 'abraham', 'sara']
  },
  {
    id: 'gen-003',
    type: 'multiple-choice',
    question: '¿Cuántos hijos tuvo Jacob?',
    options: ['10 hijos', '12 hijos', '14 hijos', '7 hijos'],
    correctAnswer: 1,
    explanation: 'Jacob tuvo 12 hijos que formaron las 12 tribus de Israel.',
    reference: 'Génesis 35:22-26',
    difficulty: 'facil',
    category: 'genesis',
    tags: ['jacob', 'tribus', 'israel']
  },
  {
    id: 'gen-004',
    type: 'multiple-choice',
    question: '¿Quién fue vendido por sus hermanos como esclavo?',
    options: ['Benjamín', 'José', 'Rubén', 'Judá'],
    correctAnswer: 1,
    explanation: 'José fue vendido por sus hermanos por 20 piezas de plata.',
    reference: 'Génesis 37:28',
    difficulty: 'facil',
    category: 'genesis',
    tags: ['jose', 'hermanos']
  },
  {
    id: 'gen-005',
    type: 'multiple-choice',
    question: '¿Qué árbol estaba prohibido en el Edén?',
    options: ['Árbol de la vida', 'Árbol del bien y del mal', 'Árbol de higuera', 'Árbol de olivo'],
    correctAnswer: 1,
    explanation: 'Dios prohibió comer del árbol del conocimiento del bien y del mal.',
    reference: 'Génesis 2:17',
    difficulty: 'facil',
    category: 'genesis',
    tags: ['eden', 'creacion', 'pecado']
  },
  {
    id: 'gen-006',
    type: 'multiple-choice',
    question: '¿Cuántos años vivió Matusalén?',
    options: ['800 años', '900 años', '969 años', '1000 años'],
    correctAnswer: 2,
    explanation: 'Matusalén vivió 969 años, siendo el hombre más longevo de la Biblia.',
    reference: 'Génesis 5:27',
    difficulty: 'medio',
    category: 'genesis',
    tags: ['matusalen', 'patriarcas']
  },
  {
    id: 'gen-007',
    type: 'multiple-choice',
    question: '¿Qué señal dio Dios después del diluvio?',
    options: ['Una estrella', 'Un arcoíris', 'Una paloma', 'Un terremoto'],
    correctAnswer: 1,
    explanation: 'El arcoíris fue la señal del pacto de Dios con Noé.',
    reference: 'Génesis 9:13',
    difficulty: 'facil',
    category: 'genesis',
    tags: ['noe', 'diluvio', 'pacto']
  },
  {
    id: 'gen-008',
    type: 'multiple-choice',
    question: '¿Quién luchó con un ángel toda la noche?',
    options: ['Abraham', 'Isaac', 'Jacob', 'José'],
    correctAnswer: 2,
    explanation: 'Jacob luchó con el ángel en Peniel y recibió el nombre Israel.',
    reference: 'Génesis 32:24-28',
    difficulty: 'medio',
    category: 'genesis',
    tags: ['jacob', 'israel', 'angel']
  },
  {
    id: 'gen-009',
    type: 'multiple-choice',
    question: '¿Cuál fue el primer asesinato registrado en la Biblia?',
    options: ['Caín mató a Abel', 'Lamec mató a un joven', 'Esaú mató a Jacob', 'José fue asesinado'],
    correctAnswer: 0,
    explanation: 'Caín mató a su hermano Abel por celos.',
    reference: 'Génesis 4:8',
    difficulty: 'facil',
    category: 'genesis',
    tags: ['cain', 'abel', 'pecado']
  },
  {
    id: 'gen-010',
    type: 'multiple-choice',
    question: '¿De qué fue hecha Eva?',
    options: ['Del polvo de la tierra', 'De una costilla de Adán', 'Del barro del río', 'De la palabra de Dios'],
    correctAnswer: 1,
    explanation: 'Dios formó a Eva de una costilla de Adán mientras dormía.',
    reference: 'Génesis 2:21-22',
    difficulty: 'facil',
    category: 'genesis',
    tags: ['eva', 'creacion', 'adan']
  },
  {
    id: 'gen-011',
    type: 'multiple-choice',
    question: '¿Qué soñó José que enojó a sus hermanos?',
    options: ['Que sería rey', 'Que sus gavillas se inclinaban ante la suya', 'Que tendría muchos hijos', 'Que viajaría a Egipto'],
    correctAnswer: 1,
    explanation: 'José soñó que las gavillas de sus hermanos se inclinaban ante la suya.',
    reference: 'Génesis 37:7',
    difficulty: 'medio',
    category: 'genesis',
    tags: ['jose', 'suenos']
  },
  {
    id: 'gen-012',
    type: 'multiple-choice',
    question: '¿Por cuántas piezas de plata fue vendido José?',
    options: ['10 piezas', '20 piezas', '30 piezas', '40 piezas'],
    correctAnswer: 1,
    explanation: 'José fue vendido por 20 piezas de plata a los mercaderes.',
    reference: 'Génesis 37:28',
    difficulty: 'medio',
    category: 'genesis',
    tags: ['jose', 'venta']
  },
  {
    id: 'gen-013',
    type: 'multiple-choice',
    question: '¿Quién era el hijo mayor de Jacob?',
    options: ['José', 'Judá', 'Rubén', 'Simeón'],
    correctAnswer: 2,
    explanation: 'Rubén fue el primogénito de Jacob con Lea.',
    reference: 'Génesis 29:32',
    difficulty: 'medio',
    category: 'genesis',
    tags: ['ruben', 'jacob', 'hijos']
  },
  {
    id: 'gen-014',
    type: 'multiple-choice',
    question: '¿Qué ciudad destruyó Dios junto con Sodoma?',
    options: ['Jericó', 'Gomorra', 'Nínive', 'Babel'],
    correctAnswer: 1,
    explanation: 'Sodoma y Gomorra fueron destruidas por su maldad.',
    reference: 'Génesis 19:24-25',
    difficulty: 'facil',
    category: 'genesis',
    tags: ['sodoma', 'gomorra', 'juicio']
  },
  {
    id: 'gen-015',
    type: 'multiple-choice',
    question: '¿Cuál era la profesión de Abel?',
    options: ['Agricultor', 'Pastor de ovejas', 'Carpintero', 'Pescador'],
    correctAnswer: 1,
    explanation: 'Abel era pastor de ovejas, mientras Caín era labrador.',
    reference: 'Génesis 4:2',
    difficulty: 'facil',
    category: 'genesis',
    tags: ['abel', 'profesion']
  }
];

// ÉXODO - 12 preguntas
export const exodoQuestions: QuizQuestion[] = [
  {
    id: 'exo-001',
    type: 'multiple-choice',
    question: '¿Cuántas plagas envió Dios sobre Egipto?',
    options: ['7 plagas', '10 plagas', '12 plagas', '5 plagas'],
    correctAnswer: 1,
    explanation: 'Dios envió 10 plagas sobre Egipto antes del éxodo.',
    reference: 'Éxodo 7-12',
    difficulty: 'facil',
    category: 'exodo',
    tags: ['plagas', 'egipto', 'moises']
  },
  {
    id: 'exo-002',
    type: 'multiple-choice',
    question: '¿Dónde fue encontrado Moisés de bebé?',
    options: ['En un campo', 'En el río Nilo', 'En el desierto', 'En una cueva'],
    correctAnswer: 1,
    explanation: 'La hija del faraón encontró a Moisés en una canasta en el río Nilo.',
    reference: 'Éxodo 2:5-6',
    difficulty: 'facil',
    category: 'exodo',
    tags: ['moises', 'nilo', 'bebe']
  },
  {
    id: 'exo-003',
    type: 'multiple-choice',
    question: '¿Cuál fue la última plaga de Egipto?',
    options: ['Langostas', 'Oscuridad', 'Muerte de primogénitos', 'Granizo'],
    correctAnswer: 2,
    explanation: 'La décima plaga fue la muerte de todos los primogénitos de Egipto.',
    reference: 'Éxodo 12:29',
    difficulty: 'facil',
    category: 'exodo',
    tags: ['plagas', 'primogenitos']
  },
  {
    id: 'exo-004',
    type: 'multiple-choice',
    question: '¿Qué monte subió Moisés para recibir los mandamientos?',
    options: ['Monte Carmelo', 'Monte Sinaí', 'Monte de los Olivos', 'Monte Horeb'],
    correctAnswer: 1,
    explanation: 'Moisés subió al Monte Sinaí para recibir las tablas de la ley.',
    reference: 'Éxodo 19:20',
    difficulty: 'facil',
    category: 'exodo',
    tags: ['moises', 'sinai', 'mandamientos']
  },
  {
    id: 'exo-005',
    type: 'multiple-choice',
    question: '¿Qué hicieron los israelitas mientras Moisés estaba en el monte?',
    options: ['Oraron', 'Hicieron un becerro de oro', 'Construyeron casas', 'Pelearon con los enemigos'],
    correctAnswer: 1,
    explanation: 'El pueblo hizo un becerro de oro para adorarlo mientras Moisés estaba ausente.',
    reference: 'Éxodo 32:4',
    difficulty: 'facil',
    category: 'exodo',
    tags: ['becerro', 'idolatria']
  },
  {
    id: 'exo-006',
    type: 'multiple-choice',
    question: '¿Qué alimento envió Dios del cielo en el desierto?',
    options: ['Pan y frutas', 'Maná y codornices', 'Pescado y pan', 'Leche y miel'],
    correctAnswer: 1,
    explanation: 'Dios envió maná cada mañana y codornices para carne.',
    reference: 'Éxodo 16:13-15',
    difficulty: 'facil',
    category: 'exodo',
    tags: ['mana', 'codornices', 'desierto']
  },
  {
    id: 'exo-007',
    type: 'multiple-choice',
    question: '¿Cómo se llamaba el hermano de Moisés?',
    options: ['Josué', 'Aarón', 'Caleb', 'Eleazar'],
    correctAnswer: 1,
    explanation: 'Aarón fue el hermano mayor de Moisés y primer sumo sacerdote.',
    reference: 'Éxodo 4:14',
    difficulty: 'facil',
    category: 'exodo',
    tags: ['aaron', 'moises', 'hermano']
  },
  {
    id: 'exo-008',
    type: 'multiple-choice',
    question: '¿Qué objeto usó Moisés para dividir el Mar Rojo?',
    options: ['Una espada', 'Su mano', 'Su vara', 'Una trompeta'],
    correctAnswer: 2,
    explanation: 'Moisés extendió su vara sobre el mar y Dios lo dividió.',
    reference: 'Éxodo 14:16',
    difficulty: 'facil',
    category: 'exodo',
    tags: ['vara', 'mar rojo']
  },
  {
    id: 'exo-009',
    type: 'multiple-choice',
    question: '¿Quién era la hermana de Moisés?',
    options: ['María', 'Miriam', 'Séfora', 'Jocabed'],
    correctAnswer: 1,
    explanation: 'Miriam era la hermana de Moisés y Aarón, profetisa de Israel.',
    reference: 'Éxodo 15:20',
    difficulty: 'medio',
    category: 'exodo',
    tags: ['miriam', 'hermana']
  },
  {
    id: 'exo-010',
    type: 'multiple-choice',
    question: '¿Cuántos mandamientos recibió Moisés?',
    options: ['5 mandamientos', '7 mandamientos', '10 mandamientos', '12 mandamientos'],
    correctAnswer: 2,
    explanation: 'Moisés recibió los 10 mandamientos escritos en tablas de piedra.',
    reference: 'Éxodo 20:1-17',
    difficulty: 'facil',
    category: 'exodo',
    tags: ['mandamientos', 'ley']
  },
  {
    id: 'exo-011',
    type: 'multiple-choice',
    question: '¿Cuántos años vagaron los israelitas por el desierto?',
    options: ['20 años', '30 años', '40 años', '50 años'],
    correctAnswer: 2,
    explanation: 'Los israelitas vagaron 40 años en el desierto debido a su incredulidad.',
    reference: 'Números 14:33-34',
    difficulty: 'facil',
    category: 'exodo',
    tags: ['desierto', 'años']
  },
  {
    id: 'exo-012',
    type: 'multiple-choice',
    question: '¿Qué vio Moisés en la zarza ardiente?',
    options: ['Un ángel con espada', 'La presencia de Dios', 'Un león', 'Una serpiente'],
    correctAnswer: 1,
    explanation: 'Dios se apareció a Moisés en una zarza que ardía pero no se consumía.',
    reference: 'Éxodo 3:2-4',
    difficulty: 'facil',
    category: 'exodo',
    tags: ['zarza', 'llamado']
  }
];

// SALMOS - 10 preguntas
export const salmosQuestions: QuizQuestion[] = [
  {
    id: 'sal-001',
    type: 'multiple-choice',
    question: '¿Quién escribió la mayoría de los Salmos?',
    options: ['Salomón', 'Moisés', 'David', 'Asaf'],
    correctAnswer: 2,
    explanation: 'El rey David escribió aproximadamente la mitad de los 150 Salmos.',
    reference: 'Salmos',
    difficulty: 'facil',
    category: 'salmos',
    tags: ['david', 'autor']
  },
  {
    id: 'sal-002',
    type: 'multiple-choice',
    question: '¿Cuántos Salmos hay en total?',
    options: ['100 Salmos', '120 Salmos', '150 Salmos', '200 Salmos'],
    correctAnswer: 2,
    explanation: 'El libro de Salmos contiene 150 cánticos.',
    reference: 'Salmos',
    difficulty: 'facil',
    category: 'salmos',
    tags: ['numero', 'libro']
  },
  {
    id: 'sal-003',
    type: 'multiple-choice',
    question: '¿Cuál es el Salmo más corto?',
    options: ['Salmo 1', 'Salmo 23', 'Salmo 117', 'Salmo 150'],
    correctAnswer: 2,
    explanation: 'El Salmo 117 es el más corto con solo 2 versículos.',
    reference: 'Salmo 117',
    difficulty: 'medio',
    category: 'salmos',
    tags: ['corto', 'versiculo']
  },
  {
    id: 'sal-004',
    type: 'multiple-choice',
    question: '¿Cuál es el Salmo más largo?',
    options: ['Salmo 78', 'Salmo 89', 'Salmo 119', 'Salmo 136'],
    correctAnswer: 2,
    explanation: 'El Salmo 119 es el más largo con 176 versículos, dedicado a la Palabra de Dios.',
    reference: 'Salmo 119',
    difficulty: 'medio',
    category: 'salmos',
    tags: ['largo', 'palabra']
  },
  {
    id: 'sal-005',
    type: 'multiple-choice',
    question: '¿Cómo comienza el Salmo 23?',
    options: ['El Señor es mi luz', 'Jehová es mi pastor', 'Dios es mi refugio', 'El Señor es mi roca'],
    correctAnswer: 1,
    explanation: 'El Salmo 23 comienza con "Jehová es mi pastor, nada me faltará".',
    reference: 'Salmo 23:1',
    difficulty: 'facil',
    category: 'salmos',
    tags: ['pastor', 'versiculo']
  },
  {
    id: 'sal-006',
    type: 'multiple-choice',
    question: '¿Qué Salmo es conocido como el "Salmo del arrepentimiento"?',
    options: ['Salmo 23', 'Salmo 51', 'Salmo 91', 'Salmo 100'],
    correctAnswer: 1,
    explanation: 'El Salmo 51 fue escrito por David después de su pecado con Betsabé.',
    reference: 'Salmo 51',
    difficulty: 'medio',
    category: 'salmos',
    tags: ['arrepentimiento', 'david']
  },
  {
    id: 'sal-007',
    type: 'multiple-choice',
    question: '¿Qué instrumento musical se menciona frecuentemente en los Salmos?',
    options: ['Trompeta', 'Arpa', 'Flauta', 'Tambor'],
    correctAnswer: 1,
    explanation: 'El arpa es el instrumento más mencionado, especialmente asociado con David.',
    reference: 'Salmos',
    difficulty: 'facil',
    category: 'salmos',
    tags: ['musica', 'arpa']
  },
  {
    id: 'sal-008',
    type: 'multiple-choice',
    question: '¿Qué significa la palabra "Selah" en los Salmos?',
    options: ['Amén', 'Pausa musical', 'Gloria a Dios', 'Fin del Salmo'],
    correctAnswer: 1,
    explanation: 'Selah indica una pausa para reflexión o un interludio musical.',
    reference: 'Salmos',
    difficulty: 'medio',
    category: 'salmos',
    tags: ['selah', 'pausa']
  },
  {
    id: 'sal-009',
    type: 'multiple-choice',
    question: '¿Cuál es el Salmo de protección que menciona "bajo la sombra de sus alas"?',
    options: ['Salmo 23', 'Salmo 46', 'Salmo 91', 'Salmo 121'],
    correctAnswer: 2,
    explanation: 'El Salmo 91 promete la protección divina bajo la sombra de sus alas.',
    reference: 'Salmo 91:4',
    difficulty: 'medio',
    category: 'salmos',
    tags: ['proteccion', 'alas']
  },
  {
    id: 'sal-010',
    type: 'multiple-choice',
    question: '¿Cómo termina el Salmo 150?',
    options: ['Amén y amén', 'Todo lo que respira alabe a JAH', 'Bendito sea el Señor', 'Gloria al Altísimo'],
    correctAnswer: 1,
    explanation: 'El último versículo dice: "Todo lo que respira alabe a JAH. Aleluya."',
    reference: 'Salmo 150:6',
    difficulty: 'medio',
    category: 'salmos',
    tags: ['alabanza', 'final']
  }
];

// MATEO - 12 preguntas
export const mateoQuestions: QuizQuestion[] = [
  {
    id: 'mat-001',
    type: 'multiple-choice',
    question: '¿Cuántos Reyes Magos visitaron a Jesús según Mateo?',
    options: ['No especifica el número', '2 Magos', '3 Magos', '4 Magos'],
    correctAnswer: 0,
    explanation: 'Mateo no especifica cuántos magos fueron, solo menciona tres regalos.',
    reference: 'Mateo 2:1-11',
    difficulty: 'medio',
    category: 'mateo',
    tags: ['magos', 'nacimiento']
  },
  {
    id: 'mat-002',
    type: 'multiple-choice',
    question: '¿Dónde predicó Jesús el Sermón del Monte?',
    options: ['En Jerusalén', 'Cerca del mar de Galilea', 'En el templo', 'En Nazaret'],
    correctAnswer: 1,
    explanation: 'Jesús predicó el Sermón del Monte en una colina cerca del mar de Galilea.',
    reference: 'Mateo 5:1',
    difficulty: 'medio',
    category: 'mateo',
    tags: ['sermon', 'monte']
  },
  {
    id: 'mat-003',
    type: 'multiple-choice',
    question: '¿Cuántas bienaventuranzas enseñó Jesús?',
    options: ['5 bienaventuranzas', '7 bienaventuranzas', '8 bienaventuranzas', '10 bienaventuranzas'],
    correctAnswer: 2,
    explanation: 'Jesús enseñó 8 bienaventuranzas en el Sermón del Monte.',
    reference: 'Mateo 5:3-12',
    difficulty: 'medio',
    category: 'mateo',
    tags: ['bienaventuranzas', 'sermon']
  },
  {
    id: 'mat-004',
    type: 'multiple-choice',
    question: '¿Cuál fue la profesión de Mateo antes de seguir a Jesús?',
    options: ['Pescador', 'Carpintero', 'Recaudador de impuestos', 'Pastor'],
    correctAnswer: 2,
    explanation: 'Mateo era recaudador de impuestos (publicano) antes de su llamado.',
    reference: 'Mateo 9:9',
    difficulty: 'facil',
    category: 'mateo',
    tags: ['mateo', 'profesion']
  },
  {
    id: 'mat-005',
    type: 'multiple-choice',
    question: '¿Cuántos panes usó Jesús para alimentar a los 5000?',
    options: ['3 panes', '5 panes', '7 panes', '12 panes'],
    correctAnswer: 1,
    explanation: 'Jesús alimentó a 5000 personas con 5 panes y 2 peces.',
    reference: 'Mateo 14:17-21',
    difficulty: 'facil',
    category: 'mateo',
    tags: ['milagro', 'panes']
  },
  {
    id: 'mat-006',
    type: 'multiple-choice',
    question: '¿Quién caminó sobre el agua junto a Jesús?',
    options: ['Juan', 'Santiago', 'Pedro', 'Andrés'],
    correctAnswer: 2,
    explanation: 'Pedro caminó sobre el agua hacia Jesús, pero comenzó a hundirse por su duda.',
    reference: 'Mateo 14:29',
    difficulty: 'facil',
    category: 'mateo',
    tags: ['pedro', 'milagro']
  },
  {
    id: 'mat-007',
    type: 'multiple-choice',
    question: '¿Cuántas veces negó Pedro a Jesús?',
    options: ['Una vez', 'Dos veces', 'Tres veces', 'Cuatro veces'],
    correctAnswer: 2,
    explanation: 'Pedro negó conocer a Jesús tres veces antes de que cantara el gallo.',
    reference: 'Mateo 26:69-75',
    difficulty: 'facil',
    category: 'mateo',
    tags: ['pedro', 'negacion']
  },
  {
    id: 'mat-008',
    type: 'multiple-choice',
    question: '¿Por cuántas monedas de plata traicionó Judas a Jesús?',
    options: ['20 monedas', '30 monedas', '40 monedas', '50 monedas'],
    correctAnswer: 1,
    explanation: 'Judas recibió 30 monedas de plata por entregar a Jesús.',
    reference: 'Mateo 26:15',
    difficulty: 'facil',
    category: 'mateo',
    tags: ['judas', 'traicion']
  },
  {
    id: 'mat-009',
    type: 'multiple-choice',
    question: '¿Qué oración enseñó Jesús a sus discípulos?',
    options: ['El Credo', 'El Padre Nuestro', 'El Ave María', 'El Gloria'],
    correctAnswer: 1,
    explanation: 'Jesús enseñó el Padre Nuestro como modelo de oración.',
    reference: 'Mateo 6:9-13',
    difficulty: 'facil',
    category: 'mateo',
    tags: ['oracion', 'padre nuestro']
  },
  {
    id: 'mat-010',
    type: 'multiple-choice',
    question: '¿Quién bautizó a Jesús?',
    options: ['Pedro', 'Juan el Bautista', 'Elías', 'Un ángel'],
    correctAnswer: 1,
    explanation: 'Juan el Bautista bautizó a Jesús en el río Jordán.',
    reference: 'Mateo 3:13-16',
    difficulty: 'facil',
    category: 'mateo',
    tags: ['bautismo', 'juan']
  },
  {
    id: 'mat-011',
    type: 'multiple-choice',
    question: '¿Qué tentación NO presentó el diablo a Jesús?',
    options: ['Convertir piedras en pan', 'Tirarse del templo', 'Adorar al diablo', 'Multiplicar peces'],
    correctAnswer: 3,
    explanation: 'Las tres tentaciones fueron: pan, tirarse del templo, y adorar al diablo.',
    reference: 'Mateo 4:1-11',
    difficulty: 'medio',
    category: 'mateo',
    tags: ['tentacion', 'desierto']
  },
  {
    id: 'mat-012',
    type: 'multiple-choice',
    question: '¿Qué mandamiento dijo Jesús que era el más importante?',
    options: ['No robarás', 'Honra a tu padre y madre', 'Amarás al Señor tu Dios', 'No matarás'],
    correctAnswer: 2,
    explanation: 'Jesús dijo que el mayor mandamiento es amar a Dios con todo el corazón.',
    reference: 'Mateo 22:37-38',
    difficulty: 'facil',
    category: 'mateo',
    tags: ['mandamiento', 'amor']
  }
];

// JUAN - 10 preguntas
export const juanQuestions: QuizQuestion[] = [
  {
    id: 'jua-001',
    type: 'multiple-choice',
    question: '¿Cuál fue el primer milagro de Jesús según Juan?',
    options: ['Sanar a un ciego', 'Caminar sobre el agua', 'Convertir agua en vino', 'Multiplicar panes'],
    correctAnswer: 2,
    explanation: 'El primer milagro de Jesús fue convertir agua en vino en las bodas de Caná.',
    reference: 'Juan 2:1-11',
    difficulty: 'facil',
    category: 'juan',
    tags: ['milagro', 'cana', 'vino']
  },
  {
    id: 'jua-002',
    type: 'multiple-choice',
    question: '¿A quién resucitó Jesús en Betania?',
    options: ['El hijo de la viuda', 'La hija de Jairo', 'Lázaro', 'Tabita'],
    correctAnswer: 2,
    explanation: 'Jesús resucitó a Lázaro después de 4 días de muerto.',
    reference: 'Juan 11:43-44',
    difficulty: 'facil',
    category: 'juan',
    tags: ['lazaro', 'resurreccion']
  },
  {
    id: 'jua-003',
    type: 'multiple-choice',
    question: '¿Qué dijo Jesús a Nicodemo sobre nacer de nuevo?',
    options: ['Es imposible', 'Hay que nacer del agua y del Espíritu', 'Solo los niños pueden', 'Es una metáfora'],
    correctAnswer: 1,
    explanation: 'Jesús dijo que es necesario nacer del agua y del Espíritu para ver el reino de Dios.',
    reference: 'Juan 3:5',
    difficulty: 'medio',
    category: 'juan',
    tags: ['nicodemo', 'nacer de nuevo']
  },
  {
    id: 'jua-004',
    type: 'multiple-choice',
    question: '¿Cuántos canastos sobraron después de alimentar a los 5000?',
    options: ['5 canastos', '7 canastos', '12 canastos', '3 canastos'],
    correctAnswer: 2,
    explanation: 'Sobraron 12 canastos llenos de pedazos después del milagro.',
    reference: 'Juan 6:13',
    difficulty: 'medio',
    category: 'juan',
    tags: ['milagro', 'panes', 'canastos']
  },
  {
    id: 'jua-005',
    type: 'multiple-choice',
    question: '¿Qué dijo Jesús que era "el camino, la verdad y la vida"?',
    options: ['La Biblia', 'El templo', 'Él mismo', 'La oración'],
    correctAnswer: 2,
    explanation: 'Jesús dijo: "Yo soy el camino, la verdad y la vida".',
    reference: 'Juan 14:6',
    difficulty: 'facil',
    category: 'juan',
    tags: ['yo soy', 'camino']
  },
  {
    id: 'jua-006',
    type: 'multiple-choice',
    question: '¿Qué hizo Jesús antes de la última cena?',
    options: ['Oró en el huerto', 'Lavó los pies de los discípulos', 'Predicó un sermón', 'Sanó a un enfermo'],
    correctAnswer: 1,
    explanation: 'Jesús lavó los pies de sus discípulos como ejemplo de servicio.',
    reference: 'Juan 13:5',
    difficulty: 'facil',
    category: 'juan',
    tags: ['pies', 'servicio', 'ultima cena']
  },
  {
    id: 'jua-007',
    type: 'multiple-choice',
    question: '¿Quién fue el discípulo que dudó de la resurrección?',
    options: ['Pedro', 'Judas', 'Tomás', 'Felipe'],
    correctAnswer: 2,
    explanation: 'Tomás dudó hasta que vio las heridas de Jesús resucitado.',
    reference: 'Juan 20:24-29',
    difficulty: 'facil',
    category: 'juan',
    tags: ['tomas', 'duda', 'resurreccion']
  },
  {
    id: 'jua-008',
    type: 'multiple-choice',
    question: '¿Qué le dijo Jesús a la mujer samaritana en el pozo?',
    options: ['Que orara más', 'Que él tenía agua viva', 'Que dejara de pecar', 'Que le diera de beber'],
    correctAnswer: 1,
    explanation: 'Jesús le ofreció agua viva que salta para vida eterna.',
    reference: 'Juan 4:10-14',
    difficulty: 'medio',
    category: 'juan',
    tags: ['samaritana', 'agua viva']
  },
  {
    id: 'jua-009',
    type: 'multiple-choice',
    question: '¿Cuántos días estuvo Lázaro muerto antes de que Jesús lo resucitara?',
    options: ['1 día', '2 días', '3 días', '4 días'],
    correctAnswer: 3,
    explanation: 'Lázaro llevaba 4 días en el sepulcro cuando Jesús llegó.',
    reference: 'Juan 11:17',
    difficulty: 'medio',
    category: 'juan',
    tags: ['lazaro', 'dias']
  },
  {
    id: 'jua-010',
    type: 'multiple-choice',
    question: '¿Qué versículo es conocido como "el evangelio en miniatura"?',
    options: ['Juan 1:1', 'Juan 3:16', 'Juan 14:6', 'Juan 20:31'],
    correctAnswer: 1,
    explanation: 'Juan 3:16 resume el evangelio: "Porque de tal manera amó Dios al mundo..."',
    reference: 'Juan 3:16',
    difficulty: 'facil',
    category: 'juan',
    tags: ['juan 3:16', 'evangelio']
  }
];

// PERSONAJES - Abraham (8 preguntas)
export const abrahamQuestions: QuizQuestion[] = [
  {
    id: 'abr-001',
    type: 'multiple-choice',
    question: '¿De qué ciudad salió Abraham por mandato de Dios?',
    options: ['Harán', 'Ur de los Caldeos', 'Egipto', 'Canaán'],
    correctAnswer: 1,
    explanation: 'Abraham salió de Ur de los Caldeos hacia la tierra prometida.',
    reference: 'Génesis 11:31',
    difficulty: 'medio',
    category: 'abraham',
    tags: ['ur', 'llamado']
  },
  {
    id: 'abr-002',
    type: 'multiple-choice',
    question: '¿Cómo se llamaba Abraham originalmente?',
    options: ['Abel', 'Abram', 'Aarón', 'Amós'],
    correctAnswer: 1,
    explanation: 'Su nombre original era Abram, que significa "padre enaltecido".',
    reference: 'Génesis 17:5',
    difficulty: 'facil',
    category: 'abraham',
    tags: ['nombre', 'abram']
  },
  {
    id: 'abr-003',
    type: 'multiple-choice',
    question: '¿Cuántos años tenía Abraham cuando nació Isaac?',
    options: ['75 años', '86 años', '99 años', '100 años'],
    correctAnswer: 3,
    explanation: 'Abraham tenía 100 años cuando nació su hijo Isaac.',
    reference: 'Génesis 21:5',
    difficulty: 'medio',
    category: 'abraham',
    tags: ['isaac', 'edad']
  },
  {
    id: 'abr-004',
    type: 'multiple-choice',
    question: '¿Quién era Agar en la historia de Abraham?',
    options: ['Su hija', 'La sierva de Sara', 'Su hermana', 'Una profetisa'],
    correctAnswer: 1,
    explanation: 'Agar era la sierva egipcia de Sara, madre de Ismael.',
    reference: 'Génesis 16:1',
    difficulty: 'facil',
    category: 'abraham',
    tags: ['agar', 'sierva']
  },
  {
    id: 'abr-005',
    type: 'multiple-choice',
    question: '¿Qué pidió Dios que Abraham sacrificara?',
    options: ['Un cordero', 'Un toro', 'A su hijo Isaac', 'Diez bueyes'],
    correctAnswer: 2,
    explanation: 'Dios probó a Abraham pidiéndole sacrificar a Isaac.',
    reference: 'Génesis 22:2',
    difficulty: 'facil',
    category: 'abraham',
    tags: ['isaac', 'sacrificio']
  },
  {
    id: 'abr-006',
    type: 'multiple-choice',
    question: '¿Qué animal proveyó Dios para el sacrificio en lugar de Isaac?',
    options: ['Un cordero', 'Un carnero', 'Una paloma', 'Un toro'],
    correctAnswer: 1,
    explanation: 'Dios proveyó un carnero trabado en un zarzal.',
    reference: 'Génesis 22:13',
    difficulty: 'facil',
    category: 'abraham',
    tags: ['carnero', 'provision']
  },
  {
    id: 'abr-007',
    type: 'multiple-choice',
    question: '¿Cuál fue el nombre del hijo de Abraham con Agar?',
    options: ['Isaac', 'Ismael', 'Jacob', 'Esaú'],
    correctAnswer: 1,
    explanation: 'Ismael fue el hijo de Abraham con Agar, la sierva.',
    reference: 'Génesis 16:15',
    difficulty: 'facil',
    category: 'abraham',
    tags: ['ismael', 'agar']
  },
  {
    id: 'abr-008',
    type: 'multiple-choice',
    question: '¿Cuántos años vivió Abraham?',
    options: ['125 años', '150 años', '175 años', '200 años'],
    correctAnswer: 2,
    explanation: 'Abraham vivió 175 años y fue sepultado por Isaac e Ismael.',
    reference: 'Génesis 25:7-9',
    difficulty: 'dificil',
    category: 'abraham',
    tags: ['muerte', 'edad']
  }
];

// PERSONAJES - Moisés (10 preguntas)
export const moisesQuestions: QuizQuestion[] = [
  {
    id: 'moi-001',
    type: 'multiple-choice',
    question: '¿Quién adoptó a Moisés de bebé?',
    options: ['Una esclava hebrea', 'La hija del Faraón', 'Una profetisa', 'La esposa del sacerdote'],
    correctAnswer: 1,
    explanation: 'La hija del Faraón encontró y adoptó a Moisés del Nilo.',
    reference: 'Éxodo 2:5-10',
    difficulty: 'facil',
    category: 'moises',
    tags: ['adopcion', 'faraon']
  },
  {
    id: 'moi-002',
    type: 'multiple-choice',
    question: '¿Por qué huyó Moisés de Egipto la primera vez?',
    options: ['Por las plagas', 'Por matar a un egipcio', 'Por predicar a Dios', 'Por robar'],
    correctAnswer: 1,
    explanation: 'Moisés mató a un egipcio que golpeaba a un hebreo y huyó.',
    reference: 'Éxodo 2:11-15',
    difficulty: 'facil',
    category: 'moises',
    tags: ['huida', 'egipcio']
  },
  {
    id: 'moi-003',
    type: 'multiple-choice',
    question: '¿Dónde vivió Moisés después de huir de Egipto?',
    options: ['Canaán', 'Madián', 'Asiria', 'Babilonia'],
    correctAnswer: 1,
    explanation: 'Moisés vivió en Madián, donde se casó con Séfora.',
    reference: 'Éxodo 2:15-21',
    difficulty: 'medio',
    category: 'moises',
    tags: ['madian', 'exilio']
  },
  {
    id: 'moi-004',
    type: 'multiple-choice',
    question: '¿Cuál era el impedimento que Moisés decía tener para hablar?',
    options: ['Era mudo', 'Era tartamudo', 'No sabía el idioma', 'Era muy joven'],
    correctAnswer: 1,
    explanation: 'Moisés dijo ser "tardo en el habla y torpe de lengua".',
    reference: 'Éxodo 4:10',
    difficulty: 'medio',
    category: 'moises',
    tags: ['habla', 'excusa']
  },
  {
    id: 'moi-005',
    type: 'multiple-choice',
    question: '¿Cuál fue la primera plaga de Egipto?',
    options: ['Ranas', 'Sangre', 'Moscas', 'Granizo'],
    correctAnswer: 1,
    explanation: 'La primera plaga convirtió el agua del Nilo en sangre.',
    reference: 'Éxodo 7:20',
    difficulty: 'facil',
    category: 'moises',
    tags: ['plaga', 'sangre']
  },
  {
    id: 'moi-006',
    type: 'multiple-choice',
    question: '¿Por qué no pudo Moisés entrar a la tierra prometida?',
    options: ['Era muy viejo', 'Golpeó la roca en lugar de hablarle', 'No tenía fe', 'Murió en batalla'],
    correctAnswer: 1,
    explanation: 'Moisés golpeó la roca dos veces en lugar de hablarle como Dios mandó.',
    reference: 'Números 20:11-12',
    difficulty: 'medio',
    category: 'moises',
    tags: ['roca', 'desobediencia']
  },
  {
    id: 'moi-007',
    type: 'multiple-choice',
    question: '¿Cuántos años tenía Moisés cuando murió?',
    options: ['100 años', '110 años', '120 años', '130 años'],
    correctAnswer: 2,
    explanation: 'Moisés murió a los 120 años con su vista y fuerza intactas.',
    reference: 'Deuteronomio 34:7',
    difficulty: 'medio',
    category: 'moises',
    tags: ['muerte', 'edad']
  },
  {
    id: 'moi-008',
    type: 'multiple-choice',
    question: '¿Qué libros de la Biblia escribió Moisés?',
    options: ['Los 4 Evangelios', 'Los Salmos', 'El Pentateuco (5 primeros libros)', 'Los Profetas'],
    correctAnswer: 2,
    explanation: 'Moisés escribió el Pentateuco: Génesis, Éxodo, Levítico, Números y Deuteronomio.',
    reference: 'Tradición bíblica',
    difficulty: 'medio',
    category: 'moises',
    tags: ['pentateuco', 'escritos']
  },
  {
    id: 'moi-009',
    type: 'multiple-choice',
    question: '¿Qué brillaba en el rostro de Moisés al bajar del monte Sinaí?',
    options: ['Su cabello', 'Su piel resplandecía', 'Sus ojos', 'Sus manos'],
    correctAnswer: 1,
    explanation: 'El rostro de Moisés resplandecía por haber hablado con Dios.',
    reference: 'Éxodo 34:29-30',
    difficulty: 'medio',
    category: 'moises',
    tags: ['rostro', 'resplandor']
  },
  {
    id: 'moi-010',
    type: 'multiple-choice',
    question: '¿Quién fue el sucesor de Moisés?',
    options: ['Aarón', 'Caleb', 'Josué', 'Eleazar'],
    correctAnswer: 2,
    explanation: 'Josué fue elegido por Dios para suceder a Moisés y entrar a Canaán.',
    reference: 'Deuteronomio 31:7-8',
    difficulty: 'facil',
    category: 'moises',
    tags: ['josue', 'sucesor']
  }
];

// PERSONAJES - Jesús (15 preguntas)
export const jesusQuestions: QuizQuestion[] = [
  {
    id: 'jes-001',
    type: 'multiple-choice',
    question: '¿En qué ciudad nació Jesús?',
    options: ['Nazaret', 'Jerusalén', 'Belén', 'Capernaum'],
    correctAnswer: 2,
    explanation: 'Jesús nació en Belén de Judea, como profetizó Miqueas.',
    reference: 'Mateo 2:1',
    difficulty: 'facil',
    category: 'jesus',
    tags: ['nacimiento', 'belen']
  },
  {
    id: 'jes-002',
    type: 'multiple-choice',
    question: '¿Cuántos discípulos eligió Jesús?',
    options: ['7 discípulos', '10 discípulos', '12 discípulos', '70 discípulos'],
    correctAnswer: 2,
    explanation: 'Jesús eligió 12 apóstoles principales.',
    reference: 'Mateo 10:1-4',
    difficulty: 'facil',
    category: 'jesus',
    tags: ['discipulos', 'apostoles']
  },
  {
    id: 'jes-003',
    type: 'multiple-choice',
    question: '¿Cuál era la profesión de José, padre terrenal de Jesús?',
    options: ['Pescador', 'Carpintero', 'Pastor', 'Sacerdote'],
    correctAnswer: 1,
    explanation: 'José era carpintero y Jesús aprendió el oficio de él.',
    reference: 'Mateo 13:55',
    difficulty: 'facil',
    category: 'jesus',
    tags: ['jose', 'carpintero']
  },
  {
    id: 'jes-004',
    type: 'multiple-choice',
    question: '¿Cuántos años tenía Jesús cuando comenzó su ministerio público?',
    options: ['25 años', '30 años', '33 años', '40 años'],
    correctAnswer: 1,
    explanation: 'Jesús tenía aproximadamente 30 años al comenzar su ministerio.',
    reference: 'Lucas 3:23',
    difficulty: 'medio',
    category: 'jesus',
    tags: ['ministerio', 'edad']
  },
  {
    id: 'jes-005',
    type: 'multiple-choice',
    question: '¿En qué monte fue la transfiguración de Jesús?',
    options: ['Monte Sinaí', 'Monte Tabor', 'Monte de los Olivos', 'Monte Carmelo'],
    correctAnswer: 1,
    explanation: 'La tradición señala el Monte Tabor como el lugar de la transfiguración.',
    reference: 'Mateo 17:1-2',
    difficulty: 'dificil',
    category: 'jesus',
    tags: ['transfiguracion', 'monte']
  },
  {
    id: 'jes-006',
    type: 'multiple-choice',
    question: '¿Cuántos días estuvo Jesús en el desierto siendo tentado?',
    options: ['7 días', '30 días', '40 días', '70 días'],
    correctAnswer: 2,
    explanation: 'Jesús ayunó y fue tentado durante 40 días en el desierto.',
    reference: 'Mateo 4:2',
    difficulty: 'facil',
    category: 'jesus',
    tags: ['tentacion', 'desierto']
  },
  {
    id: 'jes-007',
    type: 'multiple-choice',
    question: '¿Quiénes aparecieron con Jesús en la transfiguración?',
    options: ['Abraham e Isaac', 'Moisés y Elías', 'David y Salomón', 'Isaías y Jeremías'],
    correctAnswer: 1,
    explanation: 'Moisés y Elías aparecieron hablando con Jesús en su gloria.',
    reference: 'Mateo 17:3',
    difficulty: 'medio',
    category: 'jesus',
    tags: ['transfiguracion', 'moises', 'elias']
  },
  {
    id: 'jes-008',
    type: 'multiple-choice',
    question: '¿En qué huerto oró Jesús antes de ser arrestado?',
    options: ['Huerto del Edén', 'Huerto de Getsemaní', 'Huerto de los Olivos', 'Huerto de Betania'],
    correctAnswer: 1,
    explanation: 'Jesús oró intensamente en el huerto de Getsemaní.',
    reference: 'Mateo 26:36',
    difficulty: 'facil',
    category: 'jesus',
    tags: ['getsemani', 'oracion']
  },
  {
    id: 'jes-009',
    type: 'multiple-choice',
    question: '¿Cuál fue la última palabra de Jesús en la cruz según Juan?',
    options: ['Padre, perdónalos', 'Consumado es', 'Dios mío, Dios mío', 'En tus manos encomiendo mi espíritu'],
    correctAnswer: 1,
    explanation: 'Jesús dijo "Consumado es" antes de entregar su espíritu.',
    reference: 'Juan 19:30',
    difficulty: 'medio',
    category: 'jesus',
    tags: ['cruz', 'palabras']
  },
  {
    id: 'jes-010',
    type: 'multiple-choice',
    question: '¿Al tercer día de qué evento resucitó Jesús?',
    options: ['De su nacimiento', 'De su bautismo', 'De su muerte', 'De su transfiguración'],
    correctAnswer: 2,
    explanation: 'Jesús resucitó al tercer día después de su crucifixión.',
    reference: '1 Corintios 15:4',
    difficulty: 'facil',
    category: 'jesus',
    tags: ['resurreccion', 'tercer dia']
  },
  {
    id: 'jes-011',
    type: 'multiple-choice',
    question: '¿Quién fue la primera persona en ver a Jesús resucitado?',
    options: ['Pedro', 'Juan', 'María Magdalena', 'Tomás'],
    correctAnswer: 2,
    explanation: 'María Magdalena fue la primera en ver a Jesús resucitado.',
    reference: 'Juan 20:14-16',
    difficulty: 'medio',
    category: 'jesus',
    tags: ['resurreccion', 'maria magdalena']
  },
  {
    id: 'jes-012',
    type: 'multiple-choice',
    question: '¿Cuántos días pasó Jesús con sus discípulos después de resucitar?',
    options: ['7 días', '14 días', '40 días', '50 días'],
    correctAnswer: 2,
    explanation: 'Jesús estuvo 40 días apareciéndose a sus discípulos antes de ascender.',
    reference: 'Hechos 1:3',
    difficulty: 'medio',
    category: 'jesus',
    tags: ['resurreccion', 'ascension']
  },
  {
    id: 'jes-013',
    type: 'multiple-choice',
    question: '¿Qué prometió Jesús enviar después de su ascensión?',
    options: ['Más profetas', 'El Espíritu Santo', 'Ángeles protectores', 'Otro Mesías'],
    correctAnswer: 1,
    explanation: 'Jesús prometió enviar al Espíritu Santo como Consolador.',
    reference: 'Juan 14:16-17',
    difficulty: 'facil',
    category: 'jesus',
    tags: ['espiritu santo', 'promesa']
  },
  {
    id: 'jes-014',
    type: 'multiple-choice',
    question: '¿Cuántas parábolas aproximadamente enseñó Jesús?',
    options: ['Menos de 10', 'Entre 30-40', 'Más de 100', 'Exactamente 12'],
    correctAnswer: 1,
    explanation: 'Jesús enseñó aproximadamente 30-40 parábolas en los Evangelios.',
    reference: 'Los Evangelios',
    difficulty: 'dificil',
    category: 'jesus',
    tags: ['parabolas', 'ensenanzas']
  },
  {
    id: 'jes-015',
    type: 'multiple-choice',
    question: '¿Qué significa el nombre "Jesús"?',
    options: ['Rey de reyes', 'Jehová salva', 'Hijo del hombre', 'Príncipe de paz'],
    correctAnswer: 1,
    explanation: 'Jesús significa "Jehová salva" o "Yahvé es salvación".',
    reference: 'Mateo 1:21',
    difficulty: 'medio',
    category: 'jesus',
    tags: ['nombre', 'significado']
  }
];

// EVENTOS - Creación (8 preguntas)
export const creacionQuestions: QuizQuestion[] = [
  {
    id: 'cre-001',
    type: 'multiple-choice',
    question: '¿Qué creó Dios en el primer día?',
    options: ['Los cielos y la tierra', 'La luz', 'Los animales', 'El hombre'],
    correctAnswer: 1,
    explanation: 'En el primer día Dios creó la luz y la separó de las tinieblas.',
    reference: 'Génesis 1:3-5',
    difficulty: 'facil',
    category: 'creacion',
    tags: ['primer dia', 'luz']
  },
  {
    id: 'cre-002',
    type: 'multiple-choice',
    question: '¿En qué día creó Dios al hombre?',
    options: ['Tercer día', 'Quinto día', 'Sexto día', 'Séptimo día'],
    correctAnswer: 2,
    explanation: 'Dios creó al hombre en el sexto día, como corona de la creación.',
    reference: 'Génesis 1:26-31',
    difficulty: 'facil',
    category: 'creacion',
    tags: ['sexto dia', 'hombre']
  },
  {
    id: 'cre-003',
    type: 'multiple-choice',
    question: '¿Qué hizo Dios el séptimo día?',
    options: ['Creó a Eva', 'Descansó', 'Creó el jardín', 'Habló con Adán'],
    correctAnswer: 1,
    explanation: 'Dios descansó el séptimo día y lo santificó.',
    reference: 'Génesis 2:2-3',
    difficulty: 'facil',
    category: 'creacion',
    tags: ['septimo dia', 'descanso']
  },
  {
    id: 'cre-004',
    type: 'multiple-choice',
    question: '¿De qué fue formado Adán?',
    options: ['Del agua', 'Del polvo de la tierra', 'De la nada', 'De una roca'],
    correctAnswer: 1,
    explanation: 'Dios formó al hombre del polvo de la tierra y sopló aliento de vida.',
    reference: 'Génesis 2:7',
    difficulty: 'facil',
    category: 'creacion',
    tags: ['adan', 'polvo']
  },
  {
    id: 'cre-005',
    type: 'multiple-choice',
    question: '¿En qué día fueron creados el sol, la luna y las estrellas?',
    options: ['Primer día', 'Segundo día', 'Cuarto día', 'Quinto día'],
    correctAnswer: 2,
    explanation: 'Los astros fueron creados el cuarto día para señalar tiempos y estaciones.',
    reference: 'Génesis 1:14-19',
    difficulty: 'medio',
    category: 'creacion',
    tags: ['cuarto dia', 'astros']
  },
  {
    id: 'cre-006',
    type: 'multiple-choice',
    question: '¿Qué creó Dios en el segundo día?',
    options: ['Los mares', 'El firmamento', 'Las plantas', 'Los peces'],
    correctAnswer: 1,
    explanation: 'En el segundo día Dios creó el firmamento para separar las aguas.',
    reference: 'Génesis 1:6-8',
    difficulty: 'medio',
    category: 'creacion',
    tags: ['segundo dia', 'firmamento']
  },
  {
    id: 'cre-007',
    type: 'multiple-choice',
    question: '¿En qué día fueron creados los animales marinos y las aves?',
    options: ['Tercer día', 'Cuarto día', 'Quinto día', 'Sexto día'],
    correctAnswer: 2,
    explanation: 'Los peces y las aves fueron creados el quinto día.',
    reference: 'Génesis 1:20-23',
    difficulty: 'medio',
    category: 'creacion',
    tags: ['quinto dia', 'animales']
  },
  {
    id: 'cre-008',
    type: 'multiple-choice',
    question: '¿Cómo evaluó Dios su creación al final?',
    options: ['Dijo que era aceptable', 'Dijo que era bueno en gran manera', 'No dijo nada', 'Dijo que necesitaba mejoras'],
    correctAnswer: 1,
    explanation: 'Dios vio todo lo que había hecho y dijo que era bueno en gran manera.',
    reference: 'Génesis 1:31',
    difficulty: 'facil',
    category: 'creacion',
    tags: ['evaluacion', 'bueno']
  }
];

// EVENTOS - Crucifixión y Resurrección (12 preguntas)
export const crucifixionQuestions: QuizQuestion[] = [
  {
    id: 'cru-001',
    type: 'multiple-choice',
    question: '¿Quién ayudó a Jesús a cargar la cruz?',
    options: ['Pedro', 'Juan', 'Simón de Cirene', 'Judas'],
    correctAnswer: 2,
    explanation: 'Simón de Cirene fue obligado a cargar la cruz de Jesús.',
    reference: 'Mateo 27:32',
    difficulty: 'medio',
    category: 'crucifixion',
    tags: ['simon', 'cruz']
  },
  {
    id: 'cru-002',
    type: 'multiple-choice',
    question: '¿Cómo se llamaba el lugar donde crucificaron a Jesús?',
    options: ['Betania', 'Gólgota', 'Getsemaní', 'Belén'],
    correctAnswer: 1,
    explanation: 'Gólgota significa "lugar de la calavera".',
    reference: 'Mateo 27:33',
    difficulty: 'facil',
    category: 'crucifixion',
    tags: ['golgota', 'lugar']
  },
  {
    id: 'cru-003',
    type: 'multiple-choice',
    question: '¿Qué escribieron en el letrero sobre la cruz?',
    options: ['Rey de Israel', 'Jesús Nazareno, Rey de los Judíos', 'El Mesías', 'Hijo de Dios'],
    correctAnswer: 1,
    explanation: 'El letrero decía "INRI" - Jesús Nazareno Rey de los Judíos.',
    reference: 'Juan 19:19',
    difficulty: 'medio',
    category: 'crucifixion',
    tags: ['inri', 'letrero']
  },
  {
    id: 'cru-004',
    type: 'multiple-choice',
    question: '¿Cuántas horas de oscuridad hubo durante la crucifixión?',
    options: ['1 hora', '2 horas', '3 horas', '6 horas'],
    correctAnswer: 2,
    explanation: 'Hubo oscuridad sobre toda la tierra durante 3 horas.',
    reference: 'Mateo 27:45',
    difficulty: 'medio',
    category: 'crucifixion',
    tags: ['oscuridad', 'horas']
  },
  {
    id: 'cru-005',
    type: 'multiple-choice',
    question: '¿Qué se rasgó en el templo cuando Jesús murió?',
    options: ['El altar', 'El velo', 'Las columnas', 'El techo'],
    correctAnswer: 1,
    explanation: 'El velo del templo se rasgó de arriba abajo.',
    reference: 'Mateo 27:51',
    difficulty: 'facil',
    category: 'crucifixion',
    tags: ['velo', 'templo']
  },
  {
    id: 'cru-006',
    type: 'multiple-choice',
    question: '¿Quién pidió el cuerpo de Jesús para sepultarlo?',
    options: ['Pedro', 'Juan', 'José de Arimatea', 'Nicodemo'],
    correctAnswer: 2,
    explanation: 'José de Arimatea, un discípulo secreto, pidió el cuerpo.',
    reference: 'Mateo 27:57-58',
    difficulty: 'medio',
    category: 'crucifixion',
    tags: ['jose arimatea', 'sepultura']
  },
  {
    id: 'cru-007',
    type: 'multiple-choice',
    question: '¿Quiénes fueron las primeras en ir al sepulcro el domingo?',
    options: ['Pedro y Juan', 'Las mujeres', 'Los soldados', 'Los fariseos'],
    correctAnswer: 1,
    explanation: 'Las mujeres fueron al sepulcro muy de mañana con especias aromáticas.',
    reference: 'Marcos 16:1-2',
    difficulty: 'facil',
    category: 'crucifixion',
    tags: ['mujeres', 'sepulcro']
  },
  {
    id: 'cru-008',
    type: 'multiple-choice',
    question: '¿Qué encontraron las mujeres en el sepulcro?',
    options: ['A Jesús dormido', 'A los soldados', 'La piedra removida y ángeles', 'El cuerpo de Jesús'],
    correctAnswer: 2,
    explanation: 'Encontraron la piedra removida y ángeles anunciando la resurrección.',
    reference: 'Mateo 28:2-6',
    difficulty: 'facil',
    category: 'crucifixion',
    tags: ['piedra', 'angeles']
  },
  {
    id: 'cru-009',
    type: 'multiple-choice',
    question: '¿Cuántos criminales fueron crucificados junto a Jesús?',
    options: ['Uno', 'Dos', 'Tres', 'Ninguno'],
    correctAnswer: 1,
    explanation: 'Dos criminales fueron crucificados a cada lado de Jesús.',
    reference: 'Lucas 23:32-33',
    difficulty: 'facil',
    category: 'crucifixion',
    tags: ['criminales', 'cruz']
  },
  {
    id: 'cru-010',
    type: 'multiple-choice',
    question: '¿Qué pidió uno de los criminales a Jesús?',
    options: ['Que lo salvara físicamente', 'Que lo recordara en su reino', 'Que maldijera a los romanos', 'Que bajara de la cruz'],
    correctAnswer: 1,
    explanation: 'El criminal arrepentido pidió ser recordado en el reino de Jesús.',
    reference: 'Lucas 23:42',
    difficulty: 'medio',
    category: 'crucifixion',
    tags: ['criminal', 'paraiso']
  },
  {
    id: 'cru-011',
    type: 'multiple-choice',
    question: '¿Qué día de la semana resucitó Jesús?',
    options: ['Viernes', 'Sábado', 'Domingo', 'Lunes'],
    correctAnswer: 2,
    explanation: 'Jesús resucitó el primer día de la semana, el domingo.',
    reference: 'Mateo 28:1',
    difficulty: 'facil',
    category: 'crucifixion',
    tags: ['domingo', 'resurreccion']
  },
  {
    id: 'cru-012',
    type: 'multiple-choice',
    question: '¿Qué dijo el centurión romano al ver morir a Jesús?',
    options: ['Era un criminal', 'Verdaderamente era Hijo de Dios', 'Era inocente', 'Era un profeta'],
    correctAnswer: 1,
    explanation: 'El centurión confesó que Jesús era verdaderamente Hijo de Dios.',
    reference: 'Mateo 27:54',
    difficulty: 'medio',
    category: 'crucifixion',
    tags: ['centurion', 'confesion']
  }
];

// VERSÍCULOS FAMOSOS - 15 preguntas
export const versiculosQuestions: QuizQuestion[] = [
  {
    id: 'ver-001',
    type: 'multiple-choice',
    question: 'Completa: "Porque de tal manera amó Dios al mundo..."',
    options: ['...que envió profetas', '...que dio a su Hijo unigénito', '...que creó la salvación', '...que perdonó a todos'],
    correctAnswer: 1,
    explanation: 'Juan 3:16 es conocido como el evangelio en miniatura.',
    reference: 'Juan 3:16',
    difficulty: 'facil',
    category: 'versiculos-famosos',
    tags: ['juan 3:16', 'amor']
  },
  {
    id: 'ver-002',
    type: 'multiple-choice',
    question: 'Completa: "Jehová es mi pastor..."',
    options: ['...nada me pasará', '...nada me faltará', '...siempre me guiará', '...nunca me dejará'],
    correctAnswer: 1,
    explanation: 'El Salmo 23 habla del cuidado de Dios como pastor.',
    reference: 'Salmo 23:1',
    difficulty: 'facil',
    category: 'versiculos-famosos',
    tags: ['salmo 23', 'pastor']
  },
  {
    id: 'ver-003',
    type: 'multiple-choice',
    question: 'Completa: "Todo lo puedo en Cristo que..."',
    options: ['...me ama', '...me fortalece', '...me salva', '...me guía'],
    correctAnswer: 1,
    explanation: 'Pablo escribió sobre el poder de Cristo en su vida.',
    reference: 'Filipenses 4:13',
    difficulty: 'facil',
    category: 'versiculos-famosos',
    tags: ['filipenses', 'fortaleza']
  },
  {
    id: 'ver-004',
    type: 'multiple-choice',
    question: '¿Dónde está escrito "En el principio era el Verbo"?',
    options: ['Génesis 1:1', 'Juan 1:1', 'Apocalipsis 1:1', 'Hebreos 1:1'],
    correctAnswer: 1,
    explanation: 'Juan comienza su evangelio declarando la divinidad de Cristo.',
    reference: 'Juan 1:1',
    difficulty: 'medio',
    category: 'versiculos-famosos',
    tags: ['juan 1', 'verbo']
  },
  {
    id: 'ver-005',
    type: 'multiple-choice',
    question: 'Completa: "Yo soy el camino, la verdad y..."',
    options: ['...la luz', '...la vida', '...la puerta', '...el amor'],
    correctAnswer: 1,
    explanation: 'Jesús declaró ser el único camino al Padre.',
    reference: 'Juan 14:6',
    difficulty: 'facil',
    category: 'versiculos-famosos',
    tags: ['camino', 'vida']
  },
  {
    id: 'ver-006',
    type: 'multiple-choice',
    question: '¿Quién dijo "He aquí yo estoy a la puerta y llamo"?',
    options: ['Pablo', 'Pedro', 'Jesús', 'Juan'],
    correctAnswer: 2,
    explanation: 'Jesús habla a la iglesia de Laodicea en Apocalipsis.',
    reference: 'Apocalipsis 3:20',
    difficulty: 'medio',
    category: 'versiculos-famosos',
    tags: ['apocalipsis', 'puerta']
  },
  {
    id: 'ver-007',
    type: 'multiple-choice',
    question: 'Completa: "Confía en Jehová con todo tu corazón, y no te apoyes en..."',
    options: ['...otros dioses', '...tu propia prudencia', '...las riquezas', '...los hombres'],
    correctAnswer: 1,
    explanation: 'Proverbios enseña a confiar en Dios sobre nuestra sabiduría.',
    reference: 'Proverbios 3:5',
    difficulty: 'medio',
    category: 'versiculos-famosos',
    tags: ['proverbios', 'confianza']
  },
  {
    id: 'ver-008',
    type: 'multiple-choice',
    question: '¿En qué libro está "El amor es paciente, es bondadoso"?',
    options: ['Romanos', '1 Corintios', 'Efesios', 'Gálatas'],
    correctAnswer: 1,
    explanation: '1 Corintios 13 es conocido como el capítulo del amor.',
    reference: '1 Corintios 13:4',
    difficulty: 'medio',
    category: 'versiculos-famosos',
    tags: ['corintios', 'amor']
  },
  {
    id: 'ver-009',
    type: 'multiple-choice',
    question: 'Completa: "Venid a mí todos los que estáis trabajados y cargados, y yo os..."',
    options: ['...sanaré', '...salvaré', '...haré descansar', '...bendeciré'],
    correctAnswer: 2,
    explanation: 'Jesús invita a los cansados a encontrar descanso en él.',
    reference: 'Mateo 11:28',
    difficulty: 'facil',
    category: 'versiculos-famosos',
    tags: ['descanso', 'invitacion']
  },
  {
    id: 'ver-010',
    type: 'multiple-choice',
    question: '¿Cuál es el versículo más corto de la Biblia en español?',
    options: ['Dios es amor', 'Jesús lloró', 'No temas', 'Ora siempre'],
    correctAnswer: 1,
    explanation: '"Jesús lloró" en Juan 11:35 es el versículo más corto.',
    reference: 'Juan 11:35',
    difficulty: 'medio',
    category: 'versiculos-famosos',
    tags: ['corto', 'jesus lloro']
  },
  {
    id: 'ver-011',
    type: 'multiple-choice',
    question: 'Completa: "Porque por gracia sois salvos por medio de..."',
    options: ['...las obras', '...la ley', '...la fe', '...el bautismo'],
    correctAnswer: 2,
    explanation: 'La salvación es por gracia mediante la fe, no por obras.',
    reference: 'Efesios 2:8',
    difficulty: 'medio',
    category: 'versiculos-famosos',
    tags: ['gracia', 'salvacion']
  },
  {
    id: 'ver-012',
    type: 'multiple-choice',
    question: '¿Dónde está el mandamiento "Amarás a tu prójimo como a ti mismo"?',
    options: ['Solo en el NT', 'Solo en el AT', 'En ambos testamentos', 'En ninguno'],
    correctAnswer: 2,
    explanation: 'Este mandamiento aparece en Levítico 19:18 y es citado por Jesús.',
    reference: 'Levítico 19:18, Mateo 22:39',
    difficulty: 'dificil',
    category: 'versiculos-famosos',
    tags: ['amor', 'projimo']
  },
  {
    id: 'ver-013',
    type: 'multiple-choice',
    question: 'Completa: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán..."',
    options: ['...dadas', '...añadidas', '...reveladas', '...prometidas'],
    correctAnswer: 1,
    explanation: 'Jesús enseña a priorizar el reino de Dios sobre las preocupaciones.',
    reference: 'Mateo 6:33',
    difficulty: 'medio',
    category: 'versiculos-famosos',
    tags: ['reino', 'prioridad']
  },
  {
    id: 'ver-014',
    type: 'multiple-choice',
    question: '¿Quién escribió "He peleado la buena batalla, he acabado la carrera"?',
    options: ['Pedro', 'Juan', 'Pablo', 'Santiago'],
    correctAnswer: 2,
    explanation: 'Pablo escribió esto a Timoteo cerca del final de su vida.',
    reference: '2 Timoteo 4:7',
    difficulty: 'medio',
    category: 'versiculos-famosos',
    tags: ['pablo', 'carrera']
  },
  {
    id: 'ver-015',
    type: 'multiple-choice',
    question: 'Completa: "El ladrón no viene sino para hurtar, matar y destruir; yo he venido para que tengan..."',
    options: ['...salvación', '...vida, y vida en abundancia', '...paz', '...victoria'],
    correctAnswer: 1,
    explanation: 'Jesús vino a dar vida abundante, no solo existencia.',
    reference: 'Juan 10:10',
    difficulty: 'medio',
    category: 'versiculos-famosos',
    tags: ['vida', 'abundancia']
  }
];

// Exportar todas las preguntas organizadas
export const allQuestions: Record<string, QuizQuestion[]> = {
  genesis: genesisQuestions,
  exodo: exodoQuestions,
  salmos: salmosQuestions,
  mateo: mateoQuestions,
  juan: juanQuestions,
  abraham: abrahamQuestions,
  moises: moisesQuestions,
  jesus: jesusQuestions,
  creacion: creacionQuestions,
  crucifixion: crucifixionQuestions,
  'versiculos-famosos': versiculosQuestions,
  // Aliases para categorías compuestas
  david: jesusQuestions.slice(0, 5), // Placeholder
  pablo: jesusQuestions.slice(5, 10), // Placeholder
  diluvio: creacionQuestions, // Reusa preguntas relacionadas
  'exodo-evento': exodoQuestions, // Reusa preguntas de Éxodo
};

export const getQuestionsByCategory = (categoryId: string): QuizQuestion[] => {
  return allQuestions[categoryId] || [];
};

export const getRandomQuestions = (categoryId: string, count: number): QuizQuestion[] => {
  const questions = getQuestionsByCategory(categoryId);
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const getTotalQuestionCount = (): number => {
  return Object.values(allQuestions).reduce((total, questions) => total + questions.length, 0);
};
