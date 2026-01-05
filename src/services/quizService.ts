import { QuizResult, UserQuizStats, achievements, getCategoryById } from '@/data/quizData';
import { getRandomQuestions, QuizQuestion } from '@/data/quizQuestions';

const QUIZ_RESULTS_KEY = 'bible-quiz-results';
const QUIZ_STATS_KEY = 'bible-quiz-stats';
const DAILY_CHALLENGE_KEY = 'bible-daily-challenge';

// Obtener resultados guardados
export const getQuizResults = (): QuizResult[] => {
  try {
    const stored = localStorage.getItem(QUIZ_RESULTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Guardar resultado de quiz
export const saveQuizResult = (result: QuizResult): void => {
  const results = getQuizResults();
  results.push(result);
  localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(results));
  
  // Actualizar estadísticas
  updateUserStats(result);
};

// Obtener estadísticas del usuario
export const getUserStats = (): UserQuizStats => {
  try {
    const stored = localStorage.getItem(QUIZ_STATS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore
  }
  
  return {
    totalQuizzes: 0,
    totalCorrect: 0,
    totalQuestions: 0,
    bestStreak: 0,
    currentStreak: 0,
    totalPoints: 0,
    achievements: [],
    quizzesByCategory: {}
  };
};

// Actualizar estadísticas
const updateUserStats = (result: QuizResult): void => {
  const stats = getUserStats();
  
  stats.totalQuizzes += 1;
  stats.totalCorrect += result.correctAnswers;
  stats.totalQuestions += result.totalQuestions;
  stats.totalPoints += result.score;
  
  // Actualizar por categoría
  if (!stats.quizzesByCategory[result.categoryId]) {
    stats.quizzesByCategory[result.categoryId] = 0;
  }
  stats.quizzesByCategory[result.categoryId] += 1;
  
  // Calcular mejor racha de este quiz
  let currentStreak = 0;
  let maxStreak = 0;
  for (const answer of result.answers) {
    if (answer.isCorrect) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }
  
  stats.bestStreak = Math.max(stats.bestStreak, maxStreak);
  
  // Verificar logros
  const newAchievements = checkAchievements(stats, result);
  stats.achievements = [...new Set([...stats.achievements, ...newAchievements])];
  
  // Sumar puntos de logros nuevos
  for (const achievementId of newAchievements) {
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement && !stats.achievements.includes(achievementId)) {
      stats.totalPoints += achievement.points;
    }
  }
  
  localStorage.setItem(QUIZ_STATS_KEY, JSON.stringify(stats));
};

// Verificar logros
const checkAchievements = (stats: UserQuizStats, result: QuizResult): string[] => {
  const newAchievements: string[] = [];
  
  for (const achievement of achievements) {
    if (!stats.achievements.includes(achievement.id)) {
      // Verificación especial para quiz perfecto
      if (achievement.id === 'quiz-perfecto') {
        if (result.correctAnswers === result.totalQuestions) {
          newAchievements.push(achievement.id);
        }
      } else if (achievement.condition(stats)) {
        newAchievements.push(achievement.id);
      }
    }
  }
  
  return newAchievements;
};

// Calcular puntuación
export const calculateScore = (
  correctAnswers: number,
  totalQuestions: number,
  answers: { isCorrect: boolean; timeSpent: number }[]
): number => {
  let score = 0;
  let streak = 0;
  
  for (const answer of answers) {
    if (answer.isCorrect) {
      // Puntos base por respuesta correcta
      score += 10;
      
      // Bonus por respuesta rápida (menos de 5 segundos)
      if (answer.timeSpent < 5) {
        score += 5;
      }
      
      // Bonus por racha
      streak++;
      if (streak === 3) {
        score += 15;
      } else if (streak === 5) {
        score += 25;
      } else if (streak === 10) {
        score += 50;
      }
    } else {
      streak = 0;
    }
  }
  
  // Bonus por quiz perfecto
  if (correctAnswers === totalQuestions) {
    score += 50;
  }
  
  return score;
};

// Obtener preguntas para un quiz
export const getQuizQuestions = (categoryId: string, count: number = 10): QuizQuestion[] => {
  return getRandomQuestions(categoryId, count);
};

// Desafío diario
interface DailyChallenge {
  date: string;
  categoryId: string;
  completed: boolean;
  score?: number;
}

export const getDailyChallenge = (): { categoryId: string; isCompleted: boolean; previousScore?: number } => {
  const today = new Date().toISOString().split('T')[0];
  
  try {
    const stored = localStorage.getItem(DAILY_CHALLENGE_KEY);
    if (stored) {
      const challenge: DailyChallenge = JSON.parse(stored);
      if (challenge.date === today) {
        return {
          categoryId: challenge.categoryId,
          isCompleted: challenge.completed,
          previousScore: challenge.score
        };
      }
    }
  } catch {
    // Ignore
  }
  
  // Generar nuevo desafío diario
  const categories = ['genesis', 'mateo', 'jesus', 'versiculos-famosos', 'creacion', 'moises'];
  const randomIndex = Math.floor(Math.random() * categories.length);
  const categoryId = categories[randomIndex];
  
  const newChallenge: DailyChallenge = {
    date: today,
    categoryId,
    completed: false
  };
  
  localStorage.setItem(DAILY_CHALLENGE_KEY, JSON.stringify(newChallenge));
  
  return {
    categoryId,
    isCompleted: false
  };
};

export const completeDailyChallenge = (score: number): void => {
  const today = new Date().toISOString().split('T')[0];
  
  try {
    const stored = localStorage.getItem(DAILY_CHALLENGE_KEY);
    if (stored) {
      const challenge: DailyChallenge = JSON.parse(stored);
      if (challenge.date === today) {
        challenge.completed = true;
        challenge.score = score;
        localStorage.setItem(DAILY_CHALLENGE_KEY, JSON.stringify(challenge));
      }
    }
  } catch {
    // Ignore
  }
};

// Obtener mejor resultado por categoría
export const getBestResultByCategory = (categoryId: string): QuizResult | null => {
  const results = getQuizResults().filter(r => r.categoryId === categoryId);
  if (results.length === 0) return null;
  
  return results.reduce((best, current) => 
    current.score > best.score ? current : best
  );
};

// Estadísticas de categoría
export const getCategoryStats = (categoryId: string) => {
  const results = getQuizResults().filter(r => r.categoryId === categoryId);
  const category = getCategoryById(categoryId);
  
  if (results.length === 0) {
    return {
      attempts: 0,
      bestScore: 0,
      averageScore: 0,
      bestPercentage: 0,
      totalQuestions: category?.questionCount || 0
    };
  }
  
  const bestResult = results.reduce((best, current) => 
    current.score > best.score ? current : best
  );
  
  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  
  return {
    attempts: results.length,
    bestScore: bestResult.score,
    averageScore: Math.round(totalScore / results.length),
    bestPercentage: Math.round((bestResult.correctAnswers / bestResult.totalQuestions) * 100),
    totalQuestions: category?.questionCount || 0
  };
};
