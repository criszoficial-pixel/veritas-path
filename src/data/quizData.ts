export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank';
export type Difficulty = 'facil' | 'medio' | 'dificil';
export type CategoryType = 'libro' | 'tema' | 'personaje' | 'evento' | 'versiculo';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  reference: string;
  difficulty: Difficulty;
  category: string;
  tags: string[];
}

export interface QuizCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  type: CategoryType;
  questionCount: number;
}

export interface QuizResult {
  id: string;
  categoryId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  completedAt: number;
  answers: {
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
    timeSpent: number;
  }[];
}

export interface UserQuizStats {
  totalQuizzes: number;
  totalCorrect: number;
  totalQuestions: number;
  bestStreak: number;
  currentStreak: number;
  totalPoints: number;
  achievements: string[];
  quizzesByCategory: Record<string, number>;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (stats: UserQuizStats) => boolean;
  points: number;
}

export const quizCategories: QuizCategory[] = [
  // Por Libro - AT (Pentateuco - Azul marino oscuro)
  {
    id: 'genesis',
    title: 'Génesis',
    description: 'El libro de los orígenes: creación, patriarcas y José',
    icon: '🌍',
    color: 'hsl(212, 73%, 18%)',
    type: 'libro',
    questionCount: 15
  },
  {
    id: 'exodo',
    title: 'Éxodo',
    description: 'Moisés, las plagas y la liberación de Israel',
    icon: '🔥',
    color: 'hsl(212, 73%, 20%)',
    type: 'libro',
    questionCount: 32
  },
  {
    id: 'levitico',
    title: 'Levítico',
    description: 'Leyes de santidad, sacrificios y fiestas de Israel',
    icon: '📜',
    color: 'hsl(212, 73%, 22%)',
    type: 'libro',
    questionCount: 28
  },
  {
    id: 'numeros',
    title: 'Números',
    description: 'El pueblo en el desierto, censos y rebeliones',
    icon: '🏕️',
    color: 'hsl(212, 73%, 24%)',
    type: 'libro',
    questionCount: 28
  },
  {
    id: 'deuteronomio',
    title: 'Deuteronomio',
    description: 'Segunda ley, discursos finales de Moisés',
    icon: '📋',
    color: 'hsl(212, 73%, 26%)',
    type: 'libro',
    questionCount: 28
  },
  // Libros Históricos - Azul marino medio
  {
    id: 'josue',
    title: 'Josué',
    description: 'La conquista de Canaán y división de la tierra',
    icon: '⚔️',
    color: 'hsl(212, 59%, 25%)',
    type: 'libro',
    questionCount: 28
  },
  {
    id: 'jueces',
    title: 'Jueces',
    description: 'Los libertadores de Israel antes de los reyes',
    icon: '🛡️',
    color: 'hsl(212, 59%, 28%)',
    type: 'libro',
    questionCount: 28
  },
  {
    id: 'rut',
    title: 'Rut',
    description: 'Historia de lealtad y redención',
    icon: '🌾',
    color: 'hsl(212, 59%, 31%)',
    type: 'libro',
    questionCount: 20
  },
  {
    id: 'samuel',
    title: '1-2 Samuel',
    description: 'De Samuel a David: nacimiento de la monarquía',
    icon: '👑',
    color: 'hsl(212, 59%, 34%)',
    type: 'libro',
    questionCount: 35
  },
  {
    id: 'reyes',
    title: '1-2 Reyes',
    description: 'Los reyes de Israel y Judá, desde Salomón hasta el exilio',
    icon: '🏛️',
    color: 'hsl(212, 59%, 37%)',
    type: 'libro',
    questionCount: 35
  },
  {
    id: 'cronicas',
    title: '1-2 Crónicas',
    description: 'Historia paralela de los reyes con énfasis en el templo',
    icon: '📖',
    color: 'hsl(212, 59%, 40%)',
    type: 'libro',
    questionCount: 35
  },
  // Libros Poéticos - Teal oscuro
  {
    id: 'job',
    title: 'Job',
    description: 'El sufrimiento del justo y la soberanía de Dios',
    icon: '⚖️',
    color: 'hsl(198, 58%, 27%)',
    type: 'libro',
    questionCount: 30
  },
  {
    id: 'salmos',
    title: 'Salmos',
    description: 'Poesía, alabanza y sabiduría del rey David',
    icon: '🎵',
    color: 'hsl(198, 58%, 30%)',
    type: 'libro',
    questionCount: 10
  },
  {
    id: 'eclesiastes',
    title: 'Eclesiastés',
    description: 'Reflexiones sobre el sentido de la vida',
    icon: '🌅',
    color: 'hsl(198, 58%, 33%)',
    type: 'libro',
    questionCount: 25
  },
  {
    id: 'cantares',
    title: 'Cantares',
    description: 'El cántico de amor de Salomón',
    icon: '🌹',
    color: 'hsl(198, 58%, 36%)',
    type: 'libro',
    questionCount: 20
  },
  // Profetas Mayores - Azul marino claro
  {
    id: 'isaias',
    title: 'Isaías',
    description: 'El profeta mesiánico: juicio y esperanza',
    icon: '🔥',
    color: 'hsl(212, 50%, 30%)',
    type: 'libro',
    questionCount: 35
  },
  {
    id: 'jeremias',
    title: 'Jeremías',
    description: 'El profeta llorón y la caída de Jerusalén',
    icon: '😢',
    color: 'hsl(212, 50%, 33%)',
    type: 'libro',
    questionCount: 35
  },
  {
    id: 'lamentaciones',
    title: 'Lamentaciones',
    description: 'Lamentos por la destrucción de Jerusalén',
    icon: '💔',
    color: 'hsl(212, 50%, 36%)',
    type: 'libro',
    questionCount: 20
  },
  {
    id: 'ezequiel',
    title: 'Ezequiel',
    description: 'Visiones del profeta en el exilio',
    icon: '👁️',
    color: 'hsl(212, 50%, 39%)',
    type: 'libro',
    questionCount: 35
  },
  {
    id: 'daniel',
    title: 'Daniel',
    description: 'Sueños, profecías y fidelidad en Babilonia',
    icon: '🦁',
    color: 'hsl(212, 50%, 42%)',
    type: 'libro',
    questionCount: 35
  },
  // Profetas Menores - Teal medio
  {
    id: 'oseas',
    title: 'Oseas',
    description: 'Amor fiel de Dios a un pueblo infiel',
    icon: '💑',
    color: 'hsl(198, 50%, 35%)',
    type: 'libro',
    questionCount: 12
  },
  {
    id: 'joel',
    title: 'Joel',
    description: 'El día del Señor y el derramamiento del Espíritu',
    icon: '🦗',
    color: 'hsl(198, 50%, 37%)',
    type: 'libro',
    questionCount: 10
  },
  {
    id: 'amos',
    title: 'Amós',
    description: 'Justicia social y juicio contra las naciones',
    icon: '⚖️',
    color: 'hsl(198, 50%, 39%)',
    type: 'libro',
    questionCount: 12
  },
  {
    id: 'abdias',
    title: 'Abdías',
    description: 'Juicio contra Edom',
    icon: '⛰️',
    color: 'hsl(198, 50%, 41%)',
    type: 'libro',
    questionCount: 8
  },
  {
    id: 'jonas',
    title: 'Jonás',
    description: 'El profeta desobediente y la misericordia de Dios',
    icon: '🐋',
    color: 'hsl(198, 50%, 43%)',
    type: 'libro',
    questionCount: 12
  },
  {
    id: 'miqueas',
    title: 'Miqueas',
    description: 'Justicia, misericordia y la promesa del Mesías',
    icon: '🏘️',
    color: 'hsl(198, 50%, 45%)',
    type: 'libro',
    questionCount: 10
  },
  {
    id: 'nahum',
    title: 'Nahúm',
    description: 'La caída de Nínive',
    icon: '🏚️',
    color: 'hsl(198, 50%, 47%)',
    type: 'libro',
    questionCount: 8
  },
  {
    id: 'habacuc',
    title: 'Habacuc',
    description: 'El justo por la fe vivirá',
    icon: '❓',
    color: 'hsl(198, 50%, 49%)',
    type: 'libro',
    questionCount: 10
  },
  {
    id: 'sofonias',
    title: 'Sofonías',
    description: 'El día del Señor y la restauración',
    icon: '🌑',
    color: 'hsl(198, 50%, 51%)',
    type: 'libro',
    questionCount: 8
  },
  {
    id: 'hageo',
    title: 'Hageo',
    description: 'Reconstrucción del templo',
    icon: '🏗️',
    color: 'hsl(198, 50%, 53%)',
    type: 'libro',
    questionCount: 8
  },
  {
    id: 'zacarias',
    title: 'Zacarías',
    description: 'Visiones mesiánicas y el rey humilde',
    icon: '🐴',
    color: 'hsl(198, 50%, 55%)',
    type: 'libro',
    questionCount: 12
  },
  {
    id: 'malaquias',
    title: 'Malaquías',
    description: 'Llamado al arrepentimiento y promesa del Mesías',
    icon: '☀️',
    color: 'hsl(198, 50%, 57%)',
    type: 'libro',
    questionCount: 10
  },
  // Por Libro - NT - Teal claro
  {
    id: 'mateo',
    title: 'Mateo',
    description: 'El Evangelio del Rey: vida y enseñanzas de Jesús',
    icon: '👑',
    color: 'hsl(198, 45%, 45%)',
    type: 'libro',
    questionCount: 12
  },
  {
    id: 'juan',
    title: 'Juan',
    description: 'El Evangelio del amor: señales y discursos de Jesús',
    icon: '🕊️',
    color: 'hsl(198, 45%, 50%)',
    type: 'libro',
    questionCount: 10
  },
  // Personajes - Azul marino medio
  {
    id: 'abraham',
    title: 'Abraham',
    description: 'El padre de la fe y su caminar con Dios',
    icon: '⭐',
    color: 'hsl(212, 59%, 28%)',
    type: 'personaje',
    questionCount: 8
  },
  {
    id: 'moises',
    title: 'Moisés',
    description: 'El libertador de Israel y dador de la ley',
    icon: '📜',
    color: 'hsl(212, 59%, 32%)',
    type: 'personaje',
    questionCount: 10
  },
  {
    id: 'david',
    title: 'David',
    description: 'El pastor que se convirtió en rey',
    icon: '🎯',
    color: 'hsl(212, 59%, 36%)',
    type: 'personaje',
    questionCount: 10
  },
  {
    id: 'jesus',
    title: 'Jesús',
    description: 'La vida, muerte y resurrección del Mesías',
    icon: '✝️',
    color: 'hsl(212, 59%, 40%)',
    type: 'personaje',
    questionCount: 15
  },
  {
    id: 'pablo',
    title: 'Pablo',
    description: 'El apóstol a los gentiles y sus viajes misioneros',
    icon: '✉️',
    color: 'hsl(212, 59%, 44%)',
    type: 'personaje',
    questionCount: 10
  },
  // Eventos - Teal oscuro
  {
    id: 'creacion',
    title: 'La Creación',
    description: 'Los primeros días del mundo según Génesis',
    icon: '🌅',
    color: 'hsl(198, 58%, 28%)',
    type: 'evento',
    questionCount: 8
  },
  {
    id: 'diluvio',
    title: 'El Diluvio',
    description: 'Noé, el arca y el nuevo comienzo',
    icon: '🌊',
    color: 'hsl(198, 58%, 32%)',
    type: 'evento',
    questionCount: 8
  },
  {
    id: 'exodo-evento',
    title: 'El Éxodo',
    description: 'La salida de Egipto y el cruce del Mar Rojo',
    icon: '🏃',
    color: 'hsl(198, 58%, 36%)',
    type: 'evento',
    questionCount: 10
  },
  {
    id: 'crucifixion',
    title: 'Crucifixión y Resurrección',
    description: 'La semana santa y la victoria sobre la muerte',
    icon: '🌟',
    color: 'hsl(198, 58%, 40%)',
    type: 'evento',
    questionCount: 12
  },
  // Versículos - Azul marino
  {
    id: 'versiculos-famosos',
    title: 'Versículos Famosos',
    description: 'Completa y reconoce los versículos más conocidos',
    icon: '📖',
    color: 'hsl(212, 65%, 28%)',
    type: 'versiculo',
    questionCount: 15
  },
  // Categorías temáticas - Azul marino
  {
    id: 'mandamientos',
    title: 'Los 10 Mandamientos',
    description: 'La ley de Dios dada en el monte Sinaí',
    icon: '📋',
    color: 'hsl(212, 65%, 32%)',
    type: 'tema',
    questionCount: 15
  },
  {
    id: 'apostoles',
    title: 'Los 12 Apóstoles',
    description: 'Los discípulos elegidos por Jesús',
    icon: '👥',
    color: 'hsl(212, 65%, 36%)',
    type: 'personaje',
    questionCount: 15
  },
  // Nuevos libros
  {
    id: 'proverbios',
    title: 'Proverbios',
    description: 'Sabiduría y consejos del rey Salomón',
    icon: '💡',
    color: 'hsl(198, 58%, 39%)',
    type: 'libro',
    questionCount: 15
  },
  {
    id: 'apocalipsis',
    title: 'Apocalipsis',
    description: 'Visiones del fin, las 7 iglesias y la Nueva Jerusalén',
    icon: '🔮',
    color: 'hsl(212, 50%, 45%)',
    type: 'libro',
    questionCount: 15
  },
  {
    id: 'hechos',
    title: 'Hechos',
    description: 'La iglesia primitiva, Pentecostés y los viajes de Pablo',
    icon: '🔥',
    color: 'hsl(198, 45%, 42%)',
    type: 'libro',
    questionCount: 15
  },
  {
    id: 'romanos',
    title: 'Romanos',
    description: 'Justificación por fe y doctrina de la salvación',
    icon: '⚖️',
    color: 'hsl(198, 45%, 46%)',
    type: 'libro',
    questionCount: 12
  },
  // Categorías temáticas adicionales
  {
    id: 'milagros-jesus',
    title: 'Milagros de Jesús',
    description: 'Las obras sobrenaturales del Mesías',
    icon: '✨',
    color: 'hsl(198, 55%, 38%)',
    type: 'tema',
    questionCount: 12
  },
  {
    id: 'parabolas',
    title: 'Las Parábolas',
    description: 'Historias con enseñanzas profundas de Jesús',
    icon: '📚',
    color: 'hsl(198, 55%, 42%)',
    type: 'tema',
    questionCount: 12
  },
  {
    id: 'mujeres-biblia',
    title: 'Mujeres de la Biblia',
    description: 'Heroínas de fe a través de las Escrituras',
    icon: '👑',
    color: 'hsl(212, 55%, 38%)',
    type: 'personaje',
    questionCount: 10
  },
  {
    id: 'reyes-israel',
    title: 'Reyes de Israel',
    description: 'Los monarcas del pueblo de Dios',
    icon: '🏰',
    color: 'hsl(212, 55%, 42%)',
    type: 'personaje',
    questionCount: 10
  },
  {
    id: 'profecias',
    title: 'Profecías Mesiánicas',
    description: 'Predicciones cumplidas en Cristo',
    icon: '🔮',
    color: 'hsl(198, 55%, 46%)',
    type: 'tema',
    questionCount: 10
  }
];

export const achievements: Achievement[] = [
  {
    id: 'primera-trivia',
    title: 'Primera Trivia',
    description: 'Completa tu primer quiz',
    icon: '🎉',
    condition: (stats) => stats.totalQuizzes >= 1,
    points: 50
  },
  {
    id: 'conocedor-genesis',
    title: 'Conocedor de Génesis',
    description: 'Obtén 100% en un quiz de Génesis',
    icon: '🌍',
    condition: (stats) => stats.quizzesByCategory['genesis'] >= 1,
    points: 100
  },
  {
    id: 'racha-5',
    title: 'Racha de 5',
    description: '5 respuestas correctas seguidas',
    icon: '🔥',
    condition: (stats) => stats.bestStreak >= 5,
    points: 75
  },
  {
    id: 'racha-10',
    title: 'Racha de 10',
    description: '10 respuestas correctas seguidas',
    icon: '💥',
    condition: (stats) => stats.bestStreak >= 10,
    points: 150
  },
  {
    id: 'quiz-perfecto',
    title: 'Quiz Perfecto',
    description: 'Completa un quiz con 100% de aciertos',
    icon: '⭐',
    condition: (stats) => stats.totalQuizzes >= 1,
    points: 200
  },
  {
    id: 'explorador',
    title: 'Explorador Bíblico',
    description: 'Completa quizzes de 5 categorías diferentes',
    icon: '🗺️',
    condition: (stats) => Object.keys(stats.quizzesByCategory).length >= 5,
    points: 250
  },
  {
    id: 'estudioso',
    title: 'Estudioso',
    description: 'Responde 100 preguntas correctamente',
    icon: '📚',
    condition: (stats) => stats.totalCorrect >= 100,
    points: 300
  },
  {
    id: 'maestro',
    title: 'Maestro Bíblico',
    description: 'Alcanza 1000 puntos totales',
    icon: '🏆',
    condition: (stats) => stats.totalPoints >= 1000,
    points: 500
  },
  // Nuevos logros para nuevas categorías
  {
    id: 'conocedor-ley',
    title: 'Conocedor de la Ley',
    description: 'Domina los 10 mandamientos',
    icon: '📋',
    condition: (stats) => stats.quizzesByCategory['mandamientos'] >= 1,
    points: 100
  },
  {
    id: 'seguidor-apostoles',
    title: 'Seguidor de los Apóstoles',
    description: 'Conoce a los 12 discípulos',
    icon: '👥',
    condition: (stats) => stats.quizzesByCategory['apostoles'] >= 1,
    points: 100
  },
  {
    id: 'sabio-salomon',
    title: 'Sabio como Salomón',
    description: 'Domina el libro de Proverbios',
    icon: '💡',
    condition: (stats) => stats.quizzesByCategory['proverbios'] >= 1,
    points: 100
  },
  {
    id: 'vidente',
    title: 'Vidente del Apocalipsis',
    description: 'Conoce las profecías de Juan',
    icon: '🔮',
    condition: (stats) => stats.quizzesByCategory['apocalipsis'] >= 1,
    points: 100
  },
  {
    id: 'historiador-iglesia',
    title: 'Historiador de la Iglesia',
    description: 'Domina el libro de Hechos',
    icon: '🔥',
    condition: (stats) => stats.quizzesByCategory['hechos'] >= 1,
    points: 100
  },
  {
    id: 'teologo',
    title: 'Teólogo',
    description: 'Comprende la doctrina de Romanos',
    icon: '⚖️',
    condition: (stats) => stats.quizzesByCategory['romanos'] >= 1,
    points: 100
  },
  // Logros para nuevas categorías
  {
    id: 'testigo-milagros',
    title: 'Testigo de Milagros',
    description: 'Conoce los milagros de Jesús',
    icon: '✨',
    condition: (stats) => stats.quizzesByCategory['milagros-jesus'] >= 1,
    points: 100
  },
  {
    id: 'interprete-parabolas',
    title: 'Intérprete de Parábolas',
    description: 'Comprende las enseñanzas de Jesús',
    icon: '📚',
    condition: (stats) => stats.quizzesByCategory['parabolas'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-heroinas',
    title: 'Conocedor de Heroínas',
    description: 'Conoce a las mujeres de la Biblia',
    icon: '👑',
    condition: (stats) => stats.quizzesByCategory['mujeres-biblia'] >= 1,
    points: 100
  },
  {
    id: 'historiador-reyes',
    title: 'Historiador de Reyes',
    description: 'Domina la historia de los reyes',
    icon: '🏰',
    condition: (stats) => stats.quizzesByCategory['reyes-israel'] >= 1,
    points: 100
  },
  {
    id: 'estudioso-profecias',
    title: 'Estudioso de Profecías',
    description: 'Conoce las profecías mesiánicas',
    icon: '🔮',
    condition: (stats) => stats.quizzesByCategory['profecias'] >= 1,
    points: 100
  },
  // Logros del Pentateuco
  {
    id: 'conocedor-levitico',
    title: 'Conocedor de Levítico',
    description: 'Domina las leyes de santidad',
    icon: '📜',
    condition: (stats) => stats.quizzesByCategory['levitico'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-numeros',
    title: 'Conocedor de Números',
    description: 'Conoce la travesía en el desierto',
    icon: '🏕️',
    condition: (stats) => stats.quizzesByCategory['numeros'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-deuteronomio',
    title: 'Conocedor de Deuteronomio',
    description: 'Domina los discursos de Moisés',
    icon: '📋',
    condition: (stats) => stats.quizzesByCategory['deuteronomio'] >= 1,
    points: 100
  },
  {
    id: 'pentateuco-completo',
    title: 'Maestro del Pentateuco',
    description: 'Completa quizzes de los 5 libros de Moisés',
    icon: '📚',
    condition: (stats) => 
      stats.quizzesByCategory['genesis'] >= 1 &&
      stats.quizzesByCategory['exodo'] >= 1 &&
      stats.quizzesByCategory['levitico'] >= 1 &&
      stats.quizzesByCategory['numeros'] >= 1 &&
      stats.quizzesByCategory['deuteronomio'] >= 1,
    points: 500
  },
  // Logros de Libros Históricos
  {
    id: 'conocedor-josue',
    title: 'Conquistador',
    description: 'Domina la conquista de Canaán',
    icon: '⚔️',
    condition: (stats) => stats.quizzesByCategory['josue'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-jueces',
    title: 'Conocedor de Jueces',
    description: 'Conoce a los libertadores de Israel',
    icon: '🛡️',
    condition: (stats) => stats.quizzesByCategory['jueces'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-rut',
    title: 'Conocedor de Rut',
    description: 'Comprende la historia de Rut',
    icon: '🌾',
    condition: (stats) => stats.quizzesByCategory['rut'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-samuel',
    title: 'Conocedor de Samuel',
    description: 'Domina la historia de Samuel y David',
    icon: '👑',
    condition: (stats) => stats.quizzesByCategory['samuel'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-reyes',
    title: 'Conocedor de Reyes',
    description: 'Domina la historia de los reyes de Israel y Judá',
    icon: '🏛️',
    condition: (stats) => stats.quizzesByCategory['reyes'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-cronicas',
    title: 'Cronista Real',
    description: 'Conoce las crónicas del reino',
    icon: '📖',
    condition: (stats) => stats.quizzesByCategory['cronicas'] >= 1,
    points: 100
  },
  {
    id: 'historicos-completo',
    title: 'Historiador de Israel',
    description: 'Completa quizzes de todos los libros históricos',
    icon: '📜',
    condition: (stats) => 
      stats.quizzesByCategory['josue'] >= 1 &&
      stats.quizzesByCategory['jueces'] >= 1 &&
      stats.quizzesByCategory['rut'] >= 1 &&
      stats.quizzesByCategory['samuel'] >= 1 &&
      stats.quizzesByCategory['reyes'] >= 1 &&
      stats.quizzesByCategory['cronicas'] >= 1,
    points: 750
  },
  // Logros de Libros Poéticos
  {
    id: 'conocedor-job',
    title: 'Paciente como Job',
    description: 'Domina el libro del sufrimiento y la fe',
    icon: '⚖️',
    condition: (stats) => stats.quizzesByCategory['job'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-eclesiastes',
    title: 'Filósofo Sabio',
    description: 'Reflexiona con el Predicador',
    icon: '🌅',
    condition: (stats) => stats.quizzesByCategory['eclesiastes'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-cantares',
    title: 'Romántico Bíblico',
    description: 'Conoce el cantar de los cantares',
    icon: '🌹',
    condition: (stats) => stats.quizzesByCategory['cantares'] >= 1,
    points: 100
  },
  {
    id: 'poeticos-completo',
    title: 'Poeta de Israel',
    description: 'Completa quizzes de todos los libros poéticos',
    icon: '🎭',
    condition: (stats) => 
      stats.quizzesByCategory['job'] >= 1 &&
      stats.quizzesByCategory['salmos'] >= 1 &&
      stats.quizzesByCategory['proverbios'] >= 1 &&
      stats.quizzesByCategory['eclesiastes'] >= 1 &&
      stats.quizzesByCategory['cantares'] >= 1,
    points: 750
  },
  // Logros de Profetas Mayores
  {
    id: 'conocedor-isaias',
    title: 'Profeta Mesiánico',
    description: 'Domina las profecías de Isaías',
    icon: '🔥',
    condition: (stats) => stats.quizzesByCategory['isaias'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-jeremias',
    title: 'Profeta Llorón',
    description: 'Comprende el mensaje de Jeremías',
    icon: '😢',
    condition: (stats) => stats.quizzesByCategory['jeremias'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-lamentaciones',
    title: 'Compasivo',
    description: 'Reflexiona sobre las Lamentaciones',
    icon: '💔',
    condition: (stats) => stats.quizzesByCategory['lamentaciones'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-ezequiel',
    title: 'Visionario',
    description: 'Conoce las visiones de Ezequiel',
    icon: '👁️',
    condition: (stats) => stats.quizzesByCategory['ezequiel'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-daniel',
    title: 'Fiel en Babilonia',
    description: 'Domina el libro de Daniel',
    icon: '🦁',
    condition: (stats) => stats.quizzesByCategory['daniel'] >= 1,
    points: 100
  },
  {
    id: 'profetas-mayores-completo',
    title: 'Voz de los Profetas',
    description: 'Completa quizzes de todos los profetas mayores',
    icon: '📢',
    condition: (stats) => 
      stats.quizzesByCategory['isaias'] >= 1 &&
      stats.quizzesByCategory['jeremias'] >= 1 &&
      stats.quizzesByCategory['lamentaciones'] >= 1 &&
      stats.quizzesByCategory['ezequiel'] >= 1 &&
      stats.quizzesByCategory['daniel'] >= 1,
    points: 750
  },
  // Logros de Profetas Menores
  {
    id: 'conocedor-oseas',
    title: 'Amante Fiel',
    description: 'Comprende el amor de Dios en Oseas',
    icon: '💑',
    condition: (stats) => stats.quizzesByCategory['oseas'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-joel',
    title: 'Profeta del Espíritu',
    description: 'Conoce las profecías de Joel',
    icon: '🦗',
    condition: (stats) => stats.quizzesByCategory['joel'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-amos',
    title: 'Defensor de Justicia',
    description: 'Domina el mensaje de Amós',
    icon: '⚖️',
    condition: (stats) => stats.quizzesByCategory['amos'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-abdias',
    title: 'Juez de Edom',
    description: 'Conoce la profecía de Abdías',
    icon: '⛰️',
    condition: (stats) => stats.quizzesByCategory['abdias'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-jonas',
    title: 'Misionero Reluctante',
    description: 'Comprende la historia de Jonás',
    icon: '🐋',
    condition: (stats) => stats.quizzesByCategory['jonas'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-miqueas',
    title: 'Profeta de Belén',
    description: 'Conoce las profecías de Miqueas',
    icon: '🏘️',
    condition: (stats) => stats.quizzesByCategory['miqueas'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-nahum',
    title: 'Testigo de Nínive',
    description: 'Domina el juicio de Nahúm',
    icon: '🏚️',
    condition: (stats) => stats.quizzesByCategory['nahum'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-habacuc',
    title: 'Justo por Fe',
    description: 'Comprende las preguntas de Habacuc',
    icon: '❓',
    condition: (stats) => stats.quizzesByCategory['habacuc'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-sofonias',
    title: 'Vigía del Día',
    description: 'Conoce el día del Señor en Sofonías',
    icon: '🌑',
    condition: (stats) => stats.quizzesByCategory['sofonias'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-hageo',
    title: 'Constructor del Templo',
    description: 'Domina el mensaje de Hageo',
    icon: '🏗️',
    condition: (stats) => stats.quizzesByCategory['hageo'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-zacarias',
    title: 'Visionario Mesiánico',
    description: 'Conoce las visiones de Zacarías',
    icon: '🐴',
    condition: (stats) => stats.quizzesByCategory['zacarias'] >= 1,
    points: 100
  },
  {
    id: 'conocedor-malaquias',
    title: 'Mensajero Final',
    description: 'Domina el último profeta del AT',
    icon: '☀️',
    condition: (stats) => stats.quizzesByCategory['malaquias'] >= 1,
    points: 100
  },
  {
    id: 'profetas-menores-completo',
    title: 'Los Doce Profetas',
    description: 'Completa quizzes de todos los profetas menores',
    icon: '📜',
    condition: (stats) => 
      stats.quizzesByCategory['oseas'] >= 1 &&
      stats.quizzesByCategory['joel'] >= 1 &&
      stats.quizzesByCategory['amos'] >= 1 &&
      stats.quizzesByCategory['abdias'] >= 1 &&
      stats.quizzesByCategory['jonas'] >= 1 &&
      stats.quizzesByCategory['miqueas'] >= 1 &&
      stats.quizzesByCategory['nahum'] >= 1 &&
      stats.quizzesByCategory['habacuc'] >= 1 &&
      stats.quizzesByCategory['sofonias'] >= 1 &&
      stats.quizzesByCategory['hageo'] >= 1 &&
      stats.quizzesByCategory['zacarias'] >= 1 &&
      stats.quizzesByCategory['malaquias'] >= 1,
    points: 1000
  }
];

export const getCategoryById = (id: string): QuizCategory | undefined => {
  return quizCategories.find(cat => cat.id === id);
};

export const getCategoriesByType = (type: CategoryType): QuizCategory[] => {
  return quizCategories.filter(cat => cat.type === type);
};
