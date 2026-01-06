import { Link } from 'react-router-dom';
import { BookOpen, Map, Brain, Heart, ChevronRight } from 'lucide-react';
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
        gradient: 'from-primary to-primary/80',
        bgGradient: 'from-primary/15 to-primary/5',
      }
    : {
        icon: BookOpen,
        label: 'Comenzar a Leer',
        description: 'Explora la Biblia',
        to: '/leer',
        gradient: 'from-primary to-primary/80',
        bgGradient: 'from-primary/15 to-primary/5',
      };

  const actions = [
    continueReadingAction,
    {
      icon: Brain,
      label: 'Quizzes',
      description: 'Pon a prueba tu fe',
      to: '/quizzes',
      gradient: 'from-accent to-accent/80',
      bgGradient: 'from-accent/15 to-accent/5',
    },
    {
      icon: Map,
      label: 'Historial',
      description: 'Lecturas recientes',
      to: '/historial',
      gradient: 'from-spirit to-spirit/80',
      bgGradient: 'from-spirit/15 to-spirit/5',
    },
    {
      icon: Heart,
      label: 'Necesito Ayuda',
      description: 'Guía espiritual',
      to: '/guia',
      gradient: 'from-destructive to-destructive/80',
      bgGradient: 'from-destructive/15 to-destructive/5',
    },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-semibold text-foreground px-1">Acceso Rápido</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Link
            key={action.label}
            to={action.to}
            className={cn(
              'group relative overflow-hidden rounded-xl p-4',
              'transition-all duration-300 ease-out',
              'hover:shadow-card hover:scale-[1.02] hover:-translate-y-0.5',
              'active:scale-[0.98]',
              `bg-gradient-to-br ${action.bgGradient}`
            )}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br blur-xl",
                action.bgGradient
              )} />
            </div>
            
            <div className="relative z-10 flex flex-col gap-3">
              <div className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center',
                'transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg',
                `bg-gradient-to-br ${action.gradient}`
              )}>
                <action.icon className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground text-sm">{action.label}</h3>
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
