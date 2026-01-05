import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuizCard } from '@/components/quiz/QuizCard';
import { QuizStats } from '@/components/quiz/QuizStats';
import { getCategoriesByType, quizCategories, getCategoryById } from '@/data/quizData';
import { getDailyChallenge, getUserStats } from '@/services/quizService';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  ArrowLeft, 
  BookOpen, 
  Users, 
  Zap, 
  BookMarked,
  Trophy,
  Flame,
  Calendar,
  ChevronRight
} from 'lucide-react';

const Quizzes = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('todos');
  
  const dailyChallenge = getDailyChallenge();
  const dailyCategory = getCategoryById(dailyChallenge.categoryId);
  const stats = getUserStats();

  const libroCategories = getCategoriesByType('libro');
  const personajeCategories = getCategoriesByType('personaje');
  const eventoCategories = getCategoriesByType('evento');
  const versiculoCategories = getCategoriesByType('versiculo');

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link to="/">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-xl font-bold">Quizzes Bíblicos</h1>
                  <p className="text-sm text-muted-foreground">
                    Pon a prueba tu conocimiento
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                  <Trophy className="h-4 w-4 text-yellow-600" />
                  <span className="font-semibold text-yellow-700 dark:text-yellow-400">
                    {stats.totalPoints}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 space-y-6">
          {/* Desafío Diario */}
          <Link to={`/quizzes/jugar/${dailyChallenge.categoryId}?daily=true`}>
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 hover:border-primary/40 transition-all cursor-pointer group">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <Calendar className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="font-bold text-lg">Desafío Diario</h2>
                        {dailyChallenge.isCompleted && (
                          <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                            ✓ Completado
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {dailyCategory?.title} • {dailyCategory?.icon}
                      </p>
                      {dailyChallenge.isCompleted && dailyChallenge.previousScore && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Puntuación: {dailyChallenge.previousScore} pts
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">+50 XP</p>
                      <p className="text-xs text-muted-foreground">Bonus</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Estadísticas rápidas */}
          {stats.totalQuizzes > 0 && (
            <div className="grid grid-cols-3 gap-3">
              <Card>
                <CardContent className="p-3 text-center">
                  <Flame className="h-5 w-5 mx-auto mb-1 text-orange-500" />
                  <p className="text-lg font-bold">{stats.bestStreak}</p>
                  <p className="text-xs text-muted-foreground">Racha</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <Trophy className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
                  <p className="text-lg font-bold">{stats.totalQuizzes}</p>
                  <p className="text-xs text-muted-foreground">Quizzes</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <Zap className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                  <p className="text-lg font-bold">
                    {stats.totalQuestions > 0 
                      ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100)
                      : 0}%
                  </p>
                  <p className="text-xs text-muted-foreground">Precisión</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Tabs de categorías */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="todos" className="gap-1">
                <BookOpen className="h-4 w-4" />
                Todos
              </TabsTrigger>
              <TabsTrigger value="libros" className="gap-1">
                <BookMarked className="h-4 w-4" />
                Libros
              </TabsTrigger>
              <TabsTrigger value="personajes" className="gap-1">
                <Users className="h-4 w-4" />
                Personajes
              </TabsTrigger>
              <TabsTrigger value="eventos" className="gap-1">
                <Zap className="h-4 w-4" />
                Eventos
              </TabsTrigger>
              <TabsTrigger value="stats" className="gap-1">
                <Trophy className="h-4 w-4" />
                Estadísticas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="todos" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {quizCategories.map(category => (
                  <QuizCard key={category.id} category={category} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="libros" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {libroCategories.map(category => (
                  <QuizCard key={category.id} category={category} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="personajes" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {personajeCategories.map(category => (
                  <QuizCard key={category.id} category={category} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="eventos" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...eventoCategories, ...versiculoCategories].map(category => (
                  <QuizCard key={category.id} category={category} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="stats" className="mt-6">
              <QuizStats />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
};

export default Quizzes;
