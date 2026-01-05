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
    questionCount: 12
  },
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
  }
];

export const getCategoryById = (id: string): QuizCategory | undefined => {
  return quizCategories.find(cat => cat.id === id);
};

export const getCategoriesByType = (type: CategoryType): QuizCategory[] => {
  return quizCategories.filter(cat => cat.type === type);
};
