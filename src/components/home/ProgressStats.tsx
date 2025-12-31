import { Flame, BookOpen, Trophy, Clock } from 'lucide-react';

const stats = [
  { icon: Flame, value: '7', label: 'Días de racha', color: 'text-orange-500' },
  { icon: BookOpen, value: '23', label: 'Capítulos', color: 'text-primary' },
  { icon: Trophy, value: '5', label: 'Logros', color: 'text-accent' },
  { icon: Clock, value: '4h', label: 'Esta semana', color: 'text-spirit' },
];

export const ProgressStats = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground px-1">Tu Progreso</h2>
      <div className="grid grid-cols-4 gap-2">
        {stats.map((stat) => (
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
