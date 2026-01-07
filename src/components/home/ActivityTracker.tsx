import { useUserProgress } from '@/hooks/useUserProgress';
import { cn } from '@/lib/utils';
import doveIcon from '@/assets/dove.png';

const DayIndicator = ({ 
  label, 
  isActive, 
  isToday 
}: { 
  label: string; 
  isActive: boolean; 
  isToday: boolean;
}) => {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div 
        className={cn(
          "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300",
          isActive 
            ? "bg-green-500 text-white shadow-sm shadow-green-500/30" 
            : "bg-muted text-muted-foreground",
          isToday && !isActive && "ring-2 ring-primary ring-offset-1 ring-offset-background",
          isToday && isActive && "ring-2 ring-green-400 ring-offset-1 ring-offset-background"
        )}
      >
        {isActive && (
          <img 
            src={doveIcon} 
            alt="" 
            className="w-4 h-4 brightness-0 invert" 
          />
        )}
      </div>
      <span className={cn(
        "text-[10px] font-medium",
        isToday ? "text-primary" : "text-muted-foreground"
      )}>
        {label}
      </span>
    </div>
  );
};

export const ActivityTracker = () => {
  const { stats, getWeeklyActivity } = useUserProgress();
  const weeklyActivity = getWeeklyActivity();
  const currentStreak = stats.currentStreak;
  
  const dayLabels = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;
  const isTodayComplete = weeklyActivity[todayIndex];
  
  const isPerfectWeek = weeklyActivity.every(day => day);

  const getMessage = () => {
    if (isPerfectWeek) return "🎉 ¡Semana perfecta!";
    if (currentStreak === 0) return "¡Comienza tu racha hoy!";
    if (isTodayComplete) return "¡Sigue así! Vuelve mañana";
    return "¡Completa hoy para mantener tu racha!";
  };

  const isMilestone = currentStreak >= 7;

  return (
    <div 
      className={cn(
        "rounded-2xl p-3 animate-fade-in transition-all border",
        isPerfectWeek 
          ? "bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-yellow-500/10 border-amber-500/20"
          : isMilestone
          ? "bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
          : "bg-card border-border"
      )}
    >
      {/* Streak Header */}
      <div className="flex items-center gap-2 mb-2">
        <div 
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
            isPerfectWeek
              ? "bg-gradient-to-br from-amber-500 to-orange-500"
              : isMilestone
              ? "bg-gradient-to-br from-primary to-accent"
              : currentStreak > 0
              ? "bg-primary"
              : "bg-muted"
          )}
        >
          <img 
            src={doveIcon} 
            alt="" 
            className={cn(
              "w-5 h-5",
              currentStreak > 0 ? "brightness-0 invert" : "opacity-50"
            )} 
          />
        </div>
        
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-foreground">
            {currentStreak}
          </span>
          <span className="text-sm text-muted-foreground">
            {currentStreak === 1 ? 'día' : 'días'}
          </span>
        </div>
      </div>

      {/* Weekly Calendar */}
      <div className="flex justify-between items-center px-1 mb-2">
        {dayLabels.map((label, index) => (
          <DayIndicator 
            key={index}
            label={label}
            isActive={weeklyActivity[index]}
            isToday={index === todayIndex}
          />
        ))}
      </div>

      {/* Motivational Message */}
      <p className={cn(
        "text-xs text-center font-medium",
        isPerfectWeek ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"
      )}>
        {getMessage()}
      </p>
    </div>
  );
};
