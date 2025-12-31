import { Link } from 'react-router-dom';
import { BookOpen, Map, Brain, Heart, TrendingUp, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const actions = [
  {
    icon: BookOpen,
    label: 'Continuar Leyendo',
    description: 'Salmos 23',
    to: '/leer/Salmos/23',
    color: 'bg-primary/10 text-primary',
    iconBg: 'bg-primary',
  },
  {
    icon: Map,
    label: 'Ruta Activa',
    description: 'Fundamentos de la Fe',
    to: '/aprender',
    color: 'bg-spirit/10 text-spirit',
    iconBg: 'bg-spirit',
  },
  {
    icon: Brain,
    label: 'Quiz Diario',
    description: '10 preguntas',
    to: '/quizzes',
    color: 'bg-accent/10 text-accent',
    iconBg: 'bg-accent',
  },
  {
    icon: Heart,
    label: 'Necesito Ayuda',
    description: 'Guía espiritual',
    to: '/guia',
    color: 'bg-destructive/10 text-destructive',
    iconBg: 'bg-destructive',
  },
];

export const QuickActions = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground px-1">Acceso Rápido</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            to={action.to}
            className={cn(
              'group relative overflow-hidden rounded-xl p-4 transition-all duration-200 hover:shadow-card',
              action.color
            )}
          >
            <div className="flex flex-col gap-3">
              <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', action.iconBg)}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">{action.label}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
