import { useState, useEffect, useRef } from 'react';
import { BookOpen, Trophy, Clock, ClipboardCheck } from 'lucide-react';
import { useUserProgress } from '@/hooks/useUserProgress';
import { getUserStats } from '@/services/quizService';
import { cn } from '@/lib/utils';

// Animated counter hook
const useCountUp = (end: number, duration: number = 1000) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      countRef.current = Math.round(easeOut * end);
      setCount(countRef.current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
};

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string | number;
  label: string;
  color: string;
  delay: number;
  isNumeric?: boolean;
}

const StatCard = ({ icon: Icon, value, label, color, delay, isNumeric = false }: StatCardProps) => {
  const numericValue = typeof value === 'number' ? value : parseInt(value) || 0;
  const animatedValue = useCountUp(isNumeric ? numericValue : 0, 800);
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1 rounded-xl bg-card p-3 text-center shadow-soft",
        "transition-all duration-200 cursor-pointer select-none",
        "hover:shadow-card hover:scale-105 hover:-translate-y-0.5",
        "active:scale-95",
        isPressed && "ring-2 ring-primary/20"
      )}
      style={{ animationDelay: `${delay}s` }}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
    >
      <Icon className={`h-5 w-5 ${color}`} />
      <span className="text-xl font-bold text-foreground tabular-nums">
        {isNumeric ? animatedValue : value}
      </span>
      <span className="text-xs text-muted-foreground leading-tight">{label}</span>
    </div>
  );
};

export const ProgressStats = () => {
  const { stats, readingTime, uniqueBooks } = useUserProgress();
  const quizStats = getUserStats();

  const displayStats = [
    { 
      icon: BookOpen, 
      value: stats.chaptersRead, 
      label: 'Capítulos', 
      color: 'text-primary',
      isNumeric: true,
    },
    { 
      icon: Trophy, 
      value: uniqueBooks, 
      label: 'Libros', 
      color: 'text-accent',
      isNumeric: true,
    },
    { 
      icon: ClipboardCheck, 
      value: quizStats.totalQuizzes, 
      label: 'Tests', 
      color: 'text-green-500',
      isNumeric: true,
    },
    { 
      icon: Clock, 
      value: readingTime || '0m', 
      label: 'Tiempo', 
      color: 'text-spirit',
      isNumeric: false,
    },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-semibold text-foreground px-1">Tu Progreso</h2>
      <div className="grid grid-cols-4 gap-2">
        {displayStats.map((stat, index) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
            color={stat.color}
            delay={index * 0.1}
            isNumeric={stat.isNumeric}
          />
        ))}
      </div>
    </div>
  );
};
