import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { Brain, Trophy, Flame, Star, ChevronRight, Zap, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const quizCategories = [
  {
    id: 1,
    title: 'Desafío Diario',
    description: '10 preguntas aleatorias',
    icon: Zap,
    color: 'bg-accent/10 text-accent',
    iconBg: 'bg-accent',
    featured: true,
  },
  {
    id: 2,
    title: 'Por Libro Bíblico',
    description: '66 quizzes disponibles',
    icon: BookOpen,
    color: 'bg-primary/10 text-primary',
    iconBg: 'bg-primary',
  },
  {
    id: 3,
    title: 'Por Temas',
    description: 'Milagros, parábolas, profecías...',
    icon: Star,
    color: 'bg-spirit/10 text-spirit',
    iconBg: 'bg-spirit',
  },
  {
    id: 4,
    title: 'Por Personajes',
    description: 'David, Pablo, Moisés...',
    icon: Brain,
    color: 'bg-purple-500/10 text-purple-600',
    iconBg: 'bg-purple-500',
  },
];

const recentQuizzes = [
  { title: 'Salmos', score: 85, date: 'Hoy' },
  { title: 'Vida de David', score: 92, date: 'Ayer' },
  { title: 'Nuevo Testamento', score: 78, date: 'Hace 2 días' },
];

const Quizzes = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Quizzes" />
      
      <main className="container px-4 py-6 space-y-8">
        {/* Stats Banner */}
        <section className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-card p-4 text-center shadow-soft border border-border/50">
            <Trophy className="h-6 w-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">15</p>
            <p className="text-xs text-muted-foreground">Completados</p>
          </div>
          <div className="rounded-xl bg-card p-4 text-center shadow-soft border border-border/50">
            <Flame className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">7</p>
            <p className="text-xs text-muted-foreground">Racha</p>
          </div>
          <div className="rounded-xl bg-card p-4 text-center shadow-soft border border-border/50">
            <Star className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">85%</p>
            <p className="text-xs text-muted-foreground">Promedio</p>
          </div>
        </section>

        {/* Daily Challenge */}
        <section className="rounded-2xl bg-gradient-to-br from-accent to-accent/80 p-6 text-accent-foreground">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium opacity-80">⚡ Desafío del Día</span>
              <h3 className="text-xl font-bold mt-1">¡Pon a prueba tu conocimiento!</h3>
              <p className="text-sm opacity-80 mt-2">10 preguntas • 5 min aprox.</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <Zap className="h-8 w-8" />
            </div>
          </div>
          <Button variant="secondary" className="w-full mt-4">
            Comenzar Desafío
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </section>

        {/* Categories */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Categorías</h2>
          <div className="grid grid-cols-2 gap-3">
            {quizCategories.slice(1).map((category) => (
              <button
                key={category.id}
                className={cn(
                  'rounded-xl p-4 text-left transition-all duration-200 hover:shadow-soft',
                  category.color
                )}
              >
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-3', category.iconBg)}>
                  <category.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{category.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Recent Quizzes */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Recientes</h2>
          <div className="space-y-2">
            {recentQuizzes.map((quiz, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl bg-card p-4 border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{quiz.title}</h4>
                    <p className="text-xs text-muted-foreground">{quiz.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    'text-lg font-bold',
                    quiz.score >= 90 ? 'text-spirit' : quiz.score >= 70 ? 'text-accent' : 'text-destructive'
                  )}>
                    {quiz.score}%
                  </p>
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          'h-3 w-3',
                          quiz.score >= (star * 30) ? 'text-accent fill-accent' : 'text-muted'
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Quizzes;
