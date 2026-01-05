import { Achievement } from '@/data/quizData';
import { cn } from '@/lib/utils';

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const AchievementBadge = ({ achievement, unlocked, size = 'md' }: AchievementBadgeProps) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-xl',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl'
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className={cn(
          "rounded-full flex items-center justify-center transition-all",
          sizeClasses[size],
          unlocked 
            ? "bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/30" 
            : "bg-muted grayscale opacity-50"
        )}
      >
        {achievement.icon}
      </div>
      <div className="text-center">
        <p className={cn(
          "text-sm font-medium",
          !unlocked && "text-muted-foreground"
        )}>
          {achievement.title}
        </p>
        {unlocked && (
          <p className="text-xs text-yellow-600 dark:text-yellow-400">
            +{achievement.points} pts
          </p>
        )}
      </div>
    </div>
  );
};
