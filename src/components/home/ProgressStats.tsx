import { Flame, BookOpen, Trophy, Clock } from 'lucide-react';
import { useUserProgress } from '@/hooks/useUserProgress';

export const ProgressStats = () => {
  const { stats, readingTime, uniqueBooks } = useUserProgress();

  const displayStats = [
    { 
      icon: Flame, 
      value: stats.currentStreak > 0 ? stats.currentStreak.toString() : '0', 
      label: 'Días de racha', 
      color: 'text-orange-500' 
    },
    { 
      icon: BookOpen, 
      value: stats.chaptersRead > 0 ? stats.chaptersRead.toString() : '0', 
      label: 'Capítulos', 
      color: 'text-primary' 
    },
    { 
      icon: Trophy, 
      value: uniqueBooks > 0 ? uniqueBooks.toString() : '0', 
      label: 'Libros', 
      color: 'text-accent' 
    },
    { 
      icon: Clock, 
      value: readingTime || '0m', 
      label: 'Tiempo', 
      color: 'text-spirit' 
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground px-1">Tu Progreso</h2>
      <div className="grid grid-cols-4 gap-2">
        {displayStats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 rounded-xl bg-card p-3 text-center shadow-soft"
          >
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
            <span className="text-xl font-bold text-foreground">{stat.value}</span>
            <span className="text-xs text-muted-foreground leading-tight">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
