import { Link } from 'react-router-dom';
import { BookOpen, Map, Brain, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserProgress } from '@/hooks/useUserProgress';

export const QuickActions = () => {
  const { lastReading } = useUserProgress();

  // Dynamic continue reading action
  const continueReadingAction = lastReading
    ? {
        icon: BookOpen,
        label: 'Continuar Leyendo',
        description: `${lastReading.bookName} ${lastReading.chapter}`,
        to: `/leer/${encodeURIComponent(lastReading.bookName)}/${lastReading.chapter}`,
        color: 'bg-primary/10 text-primary',
        iconBg: 'bg-primary',
      }
    : {
        icon: BookOpen,
        label: 'Comenzar a Leer',
        description: 'Explora la Biblia',
        to: '/leer',
        color: 'bg-primary/10 text-primary',
        iconBg: 'bg-primary',
      };

  const actions = [
    continueReadingAction,
    {
      icon: Brain,
      label: 'Quizzes',
      description: 'Pon a prueba tu fe',
      to: '/quizzes',
      color: 'bg-accent/10 text-accent',
      iconBg: 'bg-accent',
    },
    {
      icon: Map,
      label: 'Historial',
      description: 'Lecturas recientes',
      to: '/historial',
      color: 'bg-spirit/10 text-spirit',
      iconBg: 'bg-spirit',
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
