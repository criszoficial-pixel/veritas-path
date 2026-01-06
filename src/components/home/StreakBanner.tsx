import { Flame, Target, Sparkles } from 'lucide-react';
import { useUserProgress } from '@/hooks/useUserProgress';
import { cn } from '@/lib/utils';

export const StreakBanner = () => {
  const { stats } = useUserProgress();
  const currentStreak = stats.currentStreak;

  if (currentStreak === 0) {
    return (
      <div className="bg-gradient-to-r from-muted to-muted/50 rounded-2xl p-4 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">¡Comienza tu racha!</h3>
            <p className="text-sm text-muted-foreground">Lee hoy y empieza a construir tu hábito</p>
          </div>
          <Sparkles className="h-5 w-5 text-muted-foreground/50" />
        </div>
      </div>
    );
  }

  const isWeeklyMilestone = currentStreak >= 7;
  const isMajorMilestone = currentStreak >= 30;

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-2xl p-4 animate-fade-in transition-all",
        isMajorMilestone 
          ? "bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border border-amber-500/30" 
          : isWeeklyMilestone
          ? "bg-gradient-to-r from-primary/15 to-accent/15 border border-primary/20"
          : "bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/10"
      )}
    >
      {/* Glow effect for milestones */}
      {isWeeklyMilestone && (
        <div className="absolute inset-0 animate-pulse opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl" />
        </div>
      )}
      
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          {/* Fire icon with animation */}
          <div 
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
              isMajorMilestone 
                ? "bg-gradient-to-br from-amber-500 to-orange-600 animate-streak-fire" 
                : isWeeklyMilestone
                ? "bg-gradient-to-br from-primary to-accent"
                : "bg-primary"
            )}
          >
            <Flame 
              className={cn(
                "h-6 w-6 text-white",
                currentStreak > 0 && "animate-streak-flame"
              )} 
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground animate-count-up">
                {currentStreak}
              </span>
              <span className="text-sm text-muted-foreground">
                {currentStreak === 1 ? 'día' : 'días'} consecutivos
              </span>
            </div>
          </div>
          
          {/* Celebration sparkles for milestones */}
          {isWeeklyMilestone && (
            <Sparkles className="h-5 w-5 text-accent animate-pulse" />
          )}
        </div>
        
        {/* Motivational message */}
        {isMajorMilestone && (
          <p className="mt-3 text-sm text-foreground/80 font-medium">
            🏆 ¡Increíble dedicación! Eres un ejemplo de constancia.
          </p>
        )}
        {isWeeklyMilestone && !isMajorMilestone && (
          <p className="mt-3 text-sm text-foreground/80">
            ⭐ ¡Excelente! Mantén el ritmo, vas muy bien.
          </p>
        )}
      </div>
    </div>
  );
};
