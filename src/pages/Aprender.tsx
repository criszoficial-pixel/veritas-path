import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Calendar, Star, Heart, ChevronRight, Check } from 'lucide-react';
import { readingPlans, type ReadingPlan } from '@/data/readingPlans';
import { isPlanChapterCompleted } from '@/services/userDataService';
import { cn } from '@/lib/utils';

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
        <Header title={selectedPlan.title} showBack />
        
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
        {/* Intro */}
        <section className="text-center space-y-2">
          <h2 className="text-xl font-bold text-foreground">Planes de Lectura</h2>
          <p className="text-muted-foreground text-sm">
            Elige un plan y lee la Biblia de forma organizada
          </p>
        </section>

        {/* Plans List */}
        <section className="space-y-4">
          {readingPlans.map((plan) => {
            const Icon = iconMap[plan.icon];
            const progress = calculatePlanProgress(plan);
            const hasStarted = progress > 0;
            
            return (
              <button
                key={plan.id}
                onClick={() => startPlan(plan)}
                className="group w-full text-left p-4 rounded-xl bg-card border border-border hover:bg-accent transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-foreground group-hover:text-accent-foreground">{plan.title}</h3>
                      <span className="text-xs text-muted-foreground group-hover:text-accent-foreground/70 flex-shrink-0">{plan.duration}</span>
                    </div>
                    <p className="text-sm text-muted-foreground group-hover:text-accent-foreground/80 mt-1">{plan.description}</p>
                    {hasStarted && (
                      <div className="mt-3 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground group-hover:text-accent-foreground/70">Progreso</span>
                          <span className="text-primary group-hover:text-accent-foreground font-medium">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-1.5" />
                      </div>
                    )}
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent-foreground flex-shrink-0 self-center" />
                </div>
              </button>
            );
          })}
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Aprender;
