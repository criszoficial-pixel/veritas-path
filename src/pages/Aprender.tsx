import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Calendar, Star, Heart, ChevronRight, Check, RotateCcw, Sparkles, Target, Flame, BookMarked } from 'lucide-react';
import { readingPlans, type ReadingPlan } from '@/data/readingPlans';
import { isPlanChapterCompleted, resetAllPlanProgress } from '@/services/userDataService';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const iconMap = {
  book: BookOpen,
  calendar: Calendar,
  star: Star,
  heart: Heart,
};

const Aprender = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<ReadingPlan | null>(null);
  const [, forceUpdate] = useState({});
  
  const calculatePlanProgress = (plan: ReadingPlan) => {
    let completedReadings = 0;
    let totalReadings = 0;
    
    for (const day of plan.schedule) {
      for (const reading of day.readings) {
        totalReadings++;
        if (isPlanChapterCompleted(plan.id, reading.bookSlug, reading.chapter)) {
          completedReadings++;
        }
      }
    }
    
    return totalReadings > 0 ? Math.round((completedReadings / totalReadings) * 100) : 0;
  };

  const getTodayReadings = (plan: ReadingPlan) => {
    // Simple calculation based on plan start
    const startKey = `plan_start_${plan.id}`;
    const startDate = localStorage.getItem(startKey);
    
    if (!startDate) return plan.schedule[0];
    
    const start = new Date(startDate);
    const today = new Date();
    const daysDiff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const dayIndex = Math.min(daysDiff, plan.schedule.length - 1);
    
    return plan.schedule[dayIndex] || plan.schedule[0];
  };

  const startPlan = (plan: ReadingPlan) => {
    const startKey = `plan_start_${plan.id}`;
    if (!localStorage.getItem(startKey)) {
      localStorage.setItem(startKey, new Date().toISOString());
    }
    setSelectedPlan(plan);
  };

  if (selectedPlan) {
    const todayReadings = getTodayReadings(selectedPlan);
    const progress = calculatePlanProgress(selectedPlan);
    
    return (
      <div className="min-h-screen bg-background pb-24">
        <Header title="" showBack onBack={() => setSelectedPlan(null)} />
        
        {/* Cover Image Banner */}
        <div className="relative h-48 -mt-2 overflow-hidden">
          <img 
            src={selectedPlan.coverImage}
            alt={selectedPlan.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-2xl font-bold text-foreground">{selectedPlan.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{selectedPlan.description}</p>
          </div>
        </div>
        
        <main className="container px-4 py-6 space-y-6">
          {/* Progress */}
          <section className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progreso del plan</span>
              <span className="font-medium text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </section>

          {/* Today's Readings */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Lectura de hoy - Día {todayReadings.day}</h2>
            <div className="space-y-2">
              {todayReadings.readings.map((reading, idx) => {
                const isCompleted = isPlanChapterCompleted(selectedPlan.id, reading.bookSlug, reading.chapter);
                
                return (
                  <button
                    key={`${reading.bookSlug}-${reading.chapter}-${idx}`}
                    onClick={() => navigate(`/leer/${reading.bookSlug}/${reading.chapter}?plan=${selectedPlan.id}`)}
                    className={cn(
                      'flex items-center justify-between w-full p-4 rounded-xl border transition-colors',
                      isCompleted 
                        ? 'bg-primary/10 border-primary/30' 
                        : 'bg-card border-border hover:bg-accent'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {isCompleted ? (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                      <span className={cn(
                        'font-medium',
                        isCompleted && 'text-primary'
                      )}>
                        {reading.bookSlug.charAt(0).toUpperCase() + reading.bookSlug.slice(1).replace(/-/g, ' ')} {reading.chapter}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          </section>

          {/* Back to Plans */}
          <div className="text-center">
            <Button variant="outline" onClick={() => setSelectedPlan(null)}>
              Ver todos los planes
            </Button>
          </div>
        </main>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Aprender" />
      
      <main className="container px-4 py-6 space-y-8">
        {/* Inspiring Banner */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-6 text-primary-foreground">
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 opacity-20">
            <BookMarked className="h-24 w-24" />
          </div>
          <div className="absolute -bottom-2 -left-2 opacity-10">
            <Sparkles className="h-16 w-16" />
          </div>
          
          {/* Main content */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wide opacity-90">Planes de Lectura</span>
            </div>
            
            <h2 className="text-2xl font-bold leading-tight">
              Transforma tu Vida con la Palabra
            </h2>
            
            <p className="text-sm leading-relaxed opacity-90 max-w-md">
              La lectura diaria de la Biblia fortalece tu fe, renueva tu mente y te acerca más a Dios. 
              Un plan estructurado te ayuda a mantener la disciplina espiritual.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs">
                <BookOpen className="h-4 w-4 opacity-80" />
                <span className="opacity-90">{readingPlans.length} planes disponibles</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Calendar className="h-4 w-4 opacity-80" />
                <span className="opacity-90">De 21 a 365 días</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Flame className="h-4 w-4 opacity-80" />
                <span className="opacity-90">Lectura guiada</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section subtitle */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm font-medium">
            Elige tu plan y comienza hoy
          </p>
        </div>

        {/* Plans List */}
        <section className="space-y-4">
        {readingPlans.map((plan) => {
            const progress = calculatePlanProgress(plan);
            const hasStarted = progress > 0;
            
            return (
              <button
                key={plan.id}
                onClick={() => startPlan(plan)}
                className="group w-full text-left rounded-xl bg-card border border-border hover:border-primary/30 transition-all overflow-hidden"
              >
                <div className="flex">
                  {/* Cover Image 16:9 a la izquierda */}
                  <div className="w-36 md:w-44 aspect-video flex-shrink-0 overflow-hidden">
                    <img 
                      src={plan.coverImage}
                      alt={plan.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Plan Info a la derecha */}
                  <div className="flex-1 min-w-0 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground line-clamp-1">
                        {plan.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {plan.description}
                      </p>
                    </div>
                    
                    <div className="space-y-2 mt-3">
                      {/* Duration */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{plan.duration}</span>
                      </div>
                      
                      {/* Progress */}
                      <div className="space-y-1">
                        <Progress value={progress} className="h-1.5" />
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-muted-foreground">
                            {progress}% completado
                          </span>
                          {/* Estado */}
                          <div className="flex items-center gap-1.5 text-xs">
                            {hasStarted ? (
                              <>
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <span className="text-green-600">En progreso</span>
                              </>
                            ) : (
                              <>
                                <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                                <span className="text-muted-foreground">Sin iniciar</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </section>

        {/* Reset All Plans */}
        <div className="flex justify-center pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              resetAllPlanProgress();
              forceUpdate({});
              toast.success('Todos los planes han sido reiniciados');
            }}
            className="text-xs text-muted-foreground hover:text-destructive"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
            Reiniciar todos los planes
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Aprender;
