import { Check } from 'lucide-react';
import { useUserProgress } from '@/hooks/useUserProgress';

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
    <div className="flex flex-col items-center gap-1.5">
      <div 
        className={`
          w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300
          ${isActive 
            ? 'bg-green-500 text-white shadow-md shadow-green-500/30' 
            : 'bg-muted text-muted-foreground'
          }
          ${isToday && !isActive ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
          ${isToday && isActive ? 'ring-2 ring-green-400 ring-offset-2 ring-offset-background' : ''}
        `}
      >
        {isActive && <Check className="w-5 h-5" strokeWidth={3} />}
      </div>
      <span className={`text-xs font-medium ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>
        {label}
      </span>
    </div>
  );
};

export const WeeklyCalendar = () => {
  const { getWeeklyActivity } = useUserProgress();
  const weeklyActivity = getWeeklyActivity();
  
  const dayLabels = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  return (
    <div className="bg-card rounded-2xl p-4 border animate-fade-in">
      <div className="flex justify-between items-center px-2">
        {dayLabels.map((label, index) => (
          <DayIndicator 
            key={index}
            label={label}
            isActive={weeklyActivity[index]}
            isToday={index === todayIndex}
          />
        ))}
      </div>
    </div>
  );
};
