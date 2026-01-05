import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuizCard } from '@/components/quiz/QuizCard';
import { QuizStats } from '@/components/quiz/QuizStats';
import { getCategoriesByType, quizCategories, getCategoryById, QuizCategory } from '@/data/quizData';
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
  ChevronRight,
  Scroll,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategorySectionProps {
  title: string;
  icon: React.ReactNode;
  categories: QuizCategory[];
  showAll?: boolean;
  maxVisible?: number;
}

const CategorySection = ({ title, icon, categories, showAll = false, maxVisible = 4 }: CategorySectionProps) => {
  const displayCategories = showAll ? categories : categories.slice(0, maxVisible);
  const hasMore = categories.length > maxVisible && !showAll;

  if (categories.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="font-semibold text-foreground">{title}</h2>
          <span className="text-xs text-muted-foreground">({categories.length})</span>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {displayCategories.map(category => (
          <Link
            key={category.id}
            to={`/quizzes/jugar/${category.id}`}
            className="group"
          >
            <Card className="h-full hover:border-primary/50 transition-all hover:shadow-md">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {category.questionCount} preguntas
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {hasMore && (
          <Link to={`/quizzes?tab=${title.toLowerCase().replace(' ', '-')}`} className="group">
            <Card className="h-full border-dashed hover:border-primary/50 transition-all">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2 h-full min-h-[120px]">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  Ver todos ({categories.length})
                </p>
              </CardContent>
            </Card>
          </Link>
        )}
      </div>
    </section>
  );
};

const Quizzes = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('inicio');
  
  const dailyChallenge = getDailyChallenge();
  const dailyCategory = getCategoryById(dailyChallenge.categoryId);
  const stats = getUserStats();

  const libroCategories = getCategoriesByType('libro');
  const personajeCategories = getCategoriesByType('personaje');
  const eventoCategories = getCategoriesByType('evento');
  const temaCategories = getCategoriesByType('tema');
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

          {/* Tabs de navegación */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="inicio" className="gap-1">
                <Sparkles className="h-4 w-4" />
                Inicio
              </TabsTrigger>
              <TabsTrigger value="libros" className="gap-1">
                <BookMarked className="h-4 w-4" />
                Libros
              </TabsTrigger>
              <TabsTrigger value="temas" className="gap-1">
                <Scroll className="h-4 w-4" />
                Temas
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

            {/* Inicio - Vista general con secciones */}
            <TabsContent value="inicio" className="mt-6 space-y-8">
              <CategorySection 
                title="Por Libro" 
                icon={<BookMarked className="h-5 w-5 text-primary" />}
                categories={libroCategories}
                maxVisible={4}
              />
              
              <CategorySection 
                title="Por Tema" 
                icon={<Scroll className="h-5 w-5 text-amber-500" />}
                categories={[...temaCategories, ...versiculoCategories]}
                maxVisible={4}
              />
              
              <CategorySection 
                title="Por Personaje" 
                icon={<Users className="h-5 w-5 text-blue-500" />}
                categories={personajeCategories}
                maxVisible={4}
              />
              
              <CategorySection 
                title="Por Evento" 
                icon={<Zap className="h-5 w-5 text-orange-500" />}
                categories={eventoCategories}
                maxVisible={4}
              />
            </TabsContent>

            <TabsContent value="libros" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {libroCategories.map(category => (
                  <QuizCard key={category.id} category={category} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="temas" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...temaCategories, ...versiculoCategories].map(category => (
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
                {eventoCategories.map(category => (
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