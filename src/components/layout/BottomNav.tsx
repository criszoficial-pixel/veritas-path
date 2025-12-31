import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Map, Brain, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/leer', icon: BookOpen, label: 'Leer' },
  { path: '/aprender', icon: Map, label: 'Aprender' },
  { path: '/quizzes', icon: Brain, label: 'Quizzes' },
  { path: '/guia', icon: Heart, label: 'Guía' },
  { path: '/perfil', icon: User, label: 'Perfil' },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-lg safe-area-inset-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path || (path === '/leer' && location.pathname === '/');
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200',
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive && 'animate-fade-in')} strokeWidth={isActive ? 2.5 : 2} />
              <span className={cn('text-xs font-medium', isActive && 'font-semibold')}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
