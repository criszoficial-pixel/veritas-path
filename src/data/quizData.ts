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
  // Por Libro - AT
  {
    id: 'genesis',
    title: 'Génesis',
    description: 'El libro de los orígenes: creación, patriarcas y José',
    icon: '🌍',
    color: 'hsl(142, 76%, 36%)',
    type: 'libro',
    questionCount: 15
  },
  {
    id: 'exodo',
    title: 'Éxodo',
    description: 'Moisés, las plagas y la liberación de Israel',
    icon: '🔥',
    color: 'hsl(25, 95%, 53%)',
    type: 'libro',
    questionCount: 32
  },
  {
    id: 'levitico',
    title: 'Levítico',
    description: 'Leyes de santidad, sacrificios y fiestas de Israel',
    icon: '📜',
    color: 'hsl(280, 60%, 45%)',
    type: 'libro',
    questionCount: 28
  },
  {
    id: 'numeros',
    title: 'Números',
    description: 'El pueblo en el desierto, censos y rebeliones',
    icon: '🏕️',
    color: 'hsl(35, 80%, 45%)',
    type: 'libro',
    questionCount: 28
  },
  {
    id: 'deuteronomio',
    title: 'Deuteronomio',
    description: 'Segunda ley, discursos finales de Moisés',
    icon: '📋',
    color: 'hsl(180, 60%, 40%)',
    type: 'libro',
    questionCount: 28
  },
  // Libros Históricos
  {
    id: 'josue',
    title: 'Josué',
    description: 'La conquista de Canaán y división de la tierra',
    icon: '⚔️',
    color: 'hsl(0, 70%, 50%)',
    type: 'libro',
    questionCount: 28
  },
  {
    id: 'jueces',
    title: 'Jueces',
    description: 'Los libertadores de Israel antes de los reyes',
    icon: '🛡️',
    color: 'hsl(30, 75%, 45%)',
    type: 'libro',
    questionCount: 28
  },
  {
    id: 'rut',
    title: 'Rut',
    description: 'Historia de lealtad y redención',
    icon: '🌾',
    color: 'hsl(45, 85%, 50%)',
    type: 'libro',
    questionCount: 20
  },
  {
    id: 'samuel',
    title: '1-2 Samuel',
    description: 'De Samuel a David: nacimiento de la monarquía',
    icon: '👑',
    color: 'hsl(280, 65%, 50%)',
    type: 'libro',
    questionCount: 35
  },
  // Libros Poéticos
  {
    id: 'salmos',
    title: 'Salmos',
    description: 'Poesía, alabanza y sabiduría del rey David',
    icon: '🎵',
    color: 'hsl(262, 83%, 58%)',
    type: 'libro',
    questionCount: 10
  },
  // Por Libro - NT
  {
    id: 'mateo',
    title: 'Mateo',
    description: 'El Evangelio del Rey: vida y enseñanzas de Jesús',
    icon: '👑',
    color: 'hsl(221, 83%, 53%)',
    type: 'libro',
    questionCount: 12
  },
  {
    id: 'juan',
    title: 'Juan',
    description: 'El Evangelio del amor: señales y discursos de Jesús',
    icon: '🕊️',
    color: 'hsl(199, 89%, 48%)',
    type: 'libro',
    questionCount: 10
  },
  // Personajes
  {
    id: 'abraham',
    title: 'Abraham',
    description: 'El padre de la fe y su caminar con Dios',
    icon: '⭐',
    color: 'hsl(45, 93%, 47%)',
    type: 'personaje',
    questionCount: 8
  },
  {
    id: 'moises',
    title: 'Moisés',
    description: 'El libertador de Israel y dador de la ley',
    icon: '📜',
    color: 'hsl(16, 85%, 56%)',
    type: 'personaje',
    questionCount: 10
  },
  {
    id: 'david',
    title: 'David',
    description: 'El pastor que se convirtió en rey',
    icon: '🎯',
    color: 'hsl(340, 82%, 52%)',
    type: 'personaje',
    questionCount: 10
  },
  {
    id: 'jesus',
    title: 'Jesús',
    description: 'La vida, muerte y resurrección del Mesías',
    icon: '✝️',
    color: 'hsl(0, 84%, 60%)',
    type: 'personaje',
    questionCount: 15
  },
  {
    id: 'pablo',
    title: 'Pablo',
    description: 'El apóstol a los gentiles y sus viajes misioneros',
    icon: '✉️',
    color: 'hsl(271, 76%, 53%)',
    type: 'personaje',
    questionCount: 10
  },
  // Eventos
  {
    id: 'creacion',
    title: 'La Creación',
    description: 'Los primeros días del mundo según Génesis',
    icon: '🌅',
    color: 'hsl(173, 80%, 40%)',
    type: 'evento',
    questionCount: 8
  },
  {
    id: 'diluvio',
    title: 'El Diluvio',
    description: 'Noé, el arca y el nuevo comienzo',
    icon: '🌊',
    color: 'hsl(201, 96%, 32%)',
    type: 'evento',
    questionCount: 8
  },
  {
    id: 'exodo-evento',
    title: 'El Éxodo',
    description: 'La salida de Egipto y el cruce del Mar Rojo',
    icon: '🏃',
    color: 'hsl(32, 98%, 50%)',
    type: 'evento',
    questionCount: 10
  },
  {
    id: 'crucifixion',
    title: 'Crucifixión y Resurrección',
    description: 'La semana santa y la victoria sobre la muerte',
    icon: '🌟',
    color: 'hsl(47, 96%, 53%)',
    type: 'evento',
    questionCount: 12
  },
  // Versículos
  {
    id: 'versiculos-famosos',
    title: 'Versículos Famosos',
    description: 'Completa y reconoce los versículos más conocidos',
    icon: '📖',
    color: 'hsl(280, 87%, 38%)',
    type: 'versiculo',
    questionCount: 15
  },
  // Nuevas categorías temáticas
  {
    id: 'mandamientos',
    title: 'Los 10 Mandamientos',
    description: 'La ley de Dios dada en el monte Sinaí',
    icon: '📋',
    color: 'hsl(45, 93%, 47%)',
    type: 'tema',
    questionCount: 15
  },
  {
    id: 'apostoles',
    title: 'Los 12 Apóstoles',
    description: 'Los discípulos elegidos por Jesús',
    icon: '👥',
    color: 'hsl(200, 75%, 45%)',
    type: 'personaje',
    questionCount: 15
  },
  // Nuevos libros
  {
    id: 'proverbios',
    title: 'Proverbios',
    description: 'Sabiduría y consejos del rey Salomón',
    icon: '💡',
    color: 'hsl(35, 92%, 50%)',
    type: 'libro',
    questionCount: 15
  },
  {
    id: 'apocalipsis',
    title: 'Apocalipsis',
    description: 'Visiones del fin, las 7 iglesias y la Nueva Jerusalén',
    icon: '🔮',
    color: 'hsl(280, 70%, 50%)',
    type: 'libro',
    questionCount: 15
  },
  {
    id: 'hechos',
    title: 'Hechos',
    description: 'La iglesia primitiva, Pentecostés y los viajes de Pablo',
    icon: '🔥',
    color: 'hsl(15, 85%, 50%)',
    type: 'libro',
    questionCount: 15
  },
  {
    id: 'romanos',
    title: 'Romanos',
    description: 'Justificación por fe y doctrina de la salvación',
    icon: '⚖️',
    color: 'hsl(220, 70%, 50%)',
    type: 'libro',
    questionCount: 12
  },
  // Nuevas categorías temáticas
  {
    id: 'milagros-jesus',
    title: 'Milagros de Jesús',
    description: 'Las obras sobrenaturales del Mesías',
    icon: '✨',
    color: 'hsl(280, 80%, 55%)',
    type: 'tema',
    questionCount: 12
  },
  {
    id: 'parabolas',
    title: 'Las Parábolas',
    description: 'Historias con enseñanzas profundas de Jesús',
    icon: '📚',
    color: 'hsl(160, 70%, 40%)',
    type: 'tema',
    questionCount: 12
  },
  {
    id: 'mujeres-biblia',
    title: 'Mujeres de la Biblia',
    description: 'Heroínas de fe a través de las Escrituras',
    icon: '👑',
    color: 'hsl(330, 80%, 50%)',
    type: 'personaje',
    questionCount: 10
  },
  {
    id: 'reyes-israel',
    title: 'Reyes de Israel',
    description: 'Los monarcas del pueblo de Dios',
    icon: '🏰',
    color: 'hsl(45, 90%, 45%)',
    type: 'personaje',
    questionCount: 10
  },
  {
    id: 'profecias',
    title: 'Profecías Mesiánicas',
    description: 'Predicciones cumplidas en Cristo',
    icon: '🔮',
    color: 'hsl(200, 80%, 45%)',
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
    id: 'historicos-completo',
    title: 'Historiador de Israel',
    description: 'Completa quizzes de Josué, Jueces, Rut y Samuel',
    icon: '📜',
    condition: (stats) => 
      stats.quizzesByCategory['josue'] >= 1 &&
      stats.quizzesByCategory['jueces'] >= 1 &&
      stats.quizzesByCategory['rut'] >= 1 &&
      stats.quizzesByCategory['samuel'] >= 1,
    points: 500
  }
];

export const getCategoryById = (id: string): QuizCategory | undefined => {
  return quizCategories.find(cat => cat.id === id);
};

export const getCategoriesByType = (type: CategoryType): QuizCategory[] => {
  return quizCategories.filter(cat => cat.type === type);
};
