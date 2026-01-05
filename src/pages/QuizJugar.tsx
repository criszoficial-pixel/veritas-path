import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { QuizProgress } from '@/components/quiz/QuizProgress';
import { AnswerFeedback } from '@/components/quiz/AnswerFeedback';
import { useQuiz } from '@/hooks/useQuiz';
import { getCategoryById, achievements } from '@/data/quizData';
import { getUserStats } from '@/services/quizService';
import { 
  ArrowLeft, 
  Trophy, 
  Target, 
  Clock, 
  RotateCcw, 
  Home,
  Share2,
  Star,
  Flame
} from 'lucide-react';
import { cn } from '@/lib/utils';

const QuizJugar = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isDaily = searchParams.get('daily') === 'true';
  
  const category = getCategoryById(categoryId || '');
  
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedAnswer,
    isAnswered,
    isComplete,
    score,
    correctAnswers,
    progress,
    answers,
    selectAnswer,
    confirmAnswer,
    nextQuestion,
    resetQuiz
  } = useQuiz(categoryId || '', 10, isDaily);

  const stats = getUserStats();

  if (!category || !categoryId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">Categoría no encontrada</p>
            <Button onClick={() => navigate('/quizzes')}>
              Volver a Quizzes
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Pantalla de resultados
  if (isComplete) {
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const isPerfect = correctAnswers === totalQuestions;
    
    // Verificar nuevos logros
    const newAchievements = achievements.filter(a => 
      stats.achievements.includes(a.id) && 
      !answers.some(ans => ans.questionId.includes(a.id))
    );

    const getResultMessage = () => {
      if (percentage === 100) return '¡Perfecto! 🎉';
      if (percentage >= 80) return '¡Excelente! 🌟';
      if (percentage >= 60) return '¡Muy bien! 👏';
      if (percentage >= 40) return '¡Buen intento! 💪';
      return '¡Sigue practicando! 📖';
    };

    const getResultColor = () => {
      if (percentage >= 80) return 'text-green-600 dark:text-green-400';
      if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
      return 'text-orange-600 dark:text-orange-400';
    };

    return (
      <>
        <div className="min-h-screen bg-background">
          <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center gap-3">
                <Link to="/quizzes">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-xl font-bold">Resultados</h1>
                  <p className="text-sm text-muted-foreground">{category.title}</p>
                </div>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            <div className="max-w-lg mx-auto space-y-6">
              {/* Resultado principal */}
              <Card className={cn(
                "overflow-hidden",
                isPerfect && "border-yellow-500/50"
              )}>
                {isPerfect && (
                  <div className="h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500" />
                )}
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className={cn(
                      "w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4",
                      isPerfect 
                        ? "bg-gradient-to-br from-yellow-400 to-orange-500" 
                        : "bg-primary/10"
                    )}>
                      {isPerfect ? (
                        <Star className="h-12 w-12 text-white" />
                      ) : (
                        <Trophy className={cn("h-12 w-12", getResultColor())} />
                      )}
                    </div>
                    <h2 className={cn("text-2xl font-bold mb-2", getResultColor())}>
                      {getResultMessage()}
                    </h2>
                    <p className="text-muted-foreground">
                      {isDaily ? 'Desafío Diario Completado' : category.title}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-muted rounded-lg">
                      <Target className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                      <p className="text-2xl font-bold">{correctAnswers}/{totalQuestions}</p>
                      <p className="text-xs text-muted-foreground">Correctas</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                      <p className="text-2xl font-bold">{score}</p>
                      <p className="text-xs text-muted-foreground">Puntos</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <Flame className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                      <p className="text-2xl font-bold">{percentage}%</p>
                      <p className="text-xs text-muted-foreground">Precisión</p>
                    </div>
                  </div>

                  {/* Nuevos logros */}
                  {newAchievements.length > 0 && (
                    <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400 mb-2">
                        🎉 ¡Nuevo logro desbloqueado!
                      </p>
                      {newAchievements.map(achievement => (
                        <div key={achievement.id} className="flex items-center justify-center gap-2">
                          <span className="text-2xl">{achievement.icon}</span>
                          <span className="font-medium">{achievement.title}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <Button onClick={resetQuiz} className="w-full gap-2">
                      <RotateCcw className="h-4 w-4" />
                      Intentar de Nuevo
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/quizzes')}
                      className="w-full gap-2"
                    >
                      <Home className="h-4 w-4" />
                      Más Quizzes
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Resumen de respuestas */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Resumen de Respuestas</h3>
                  <div className="space-y-2">
                    {answers.map((answer, index) => (
                      <div 
                        key={answer.questionId}
                        className={cn(
                          "flex items-center gap-3 p-2 rounded-lg",
                          answer.isCorrect 
                            ? "bg-green-50 dark:bg-green-900/20" 
                            : "bg-red-50 dark:bg-red-900/20"
                        )}
                      >
                        <span className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white",
                          answer.isCorrect ? "bg-green-500" : "bg-red-500"
                        )}>
                          {index + 1}
                        </span>
                        <span className="text-sm flex-1">
                          Pregunta {index + 1}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {answer.timeSpent.toFixed(1)}s
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </>
    );
  }

  // Pantalla de juego
  return (
    <>
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => navigate('/quizzes')}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{category.icon}</span>
                    <h1 className="font-bold">{category.title}</h1>
                    {isDaily && (
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                        Diario
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <QuizProgress 
              current={currentIndex + 1} 
              total={totalQuestions} 
              correctAnswers={correctAnswers}
            />
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto space-y-4">
            {currentQuestion && (
              <>
                <QuestionCard
                  question={currentQuestion}
                  selectedAnswer={selectedAnswer}
                  isAnswered={isAnswered}
                  onSelectAnswer={selectAnswer}
                  onConfirm={confirmAnswer}
                />

                {isAnswered && (
                  <AnswerFeedback
                    isCorrect={selectedAnswer === currentQuestion.correctAnswer}
                    isLastQuestion={currentIndex === totalQuestions - 1}
                    onNext={nextQuestion}
                  />
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default QuizJugar;
