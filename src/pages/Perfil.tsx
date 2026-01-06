import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { User, BookOpen, Trophy, Clock, Settings, Heart, Bookmark, History, ChevronRight, StickyNote, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useBookmarks } from '@/hooks/useBookmarks';
import { getNotesCount } from '@/services/userDataService';
import { getUserStats } from '@/services/quizService';
import { DoveIcon } from '@/components/icons/DoveIcon';
import crownIcon from '@/assets/crown.png';

const Perfil = () => {
  const navigate = useNavigate();
  const { stats, readingTime, uniqueBooks, getWeeklyActivity } = useUserProgress();
  const { count: bookmarkCount } = useBookmarks();
  const notesCount = getNotesCount();
  const quizStats = getUserStats();
  
  const weeklyActivity = getWeeklyActivity();
  const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  const displayStats = [
    { label: 'Capítulos Leídos', value: stats.chaptersRead.toString(), icon: BookOpen, customIcon: null },
    { label: 'Libros Explorados', value: uniqueBooks.toString(), icon: Trophy, customIcon: null },
    { label: 'Días de Racha', value: stats.currentStreak.toString(), icon: null, customIcon: <DoveIcon size={20} animated={true} /> },
    { label: 'Tiempo Total', value: readingTime, icon: Clock, customIcon: null },
  ];

  const menuItems = [
    { label: 'Quizzes Bíblicos', icon: Brain, badge: quizStats.totalQuizzes > 0 ? quizStats.totalQuizzes.toString() : undefined, to: '/quizzes' },
    { label: 'Mis Marcadores', icon: Bookmark, badge: bookmarkCount > 0 ? bookmarkCount.toString() : undefined, to: '/marcadores' },
    { label: 'Mis Notas', icon: StickyNote, badge: notesCount > 0 ? notesCount.toString() : undefined, to: '/mis-notas' },
    { label: 'Historial de Lectura', icon: History, to: '/historial' },
    { label: 'Guía Espiritual', icon: Heart, to: '/guia' },
    { label: 'Configuración', icon: Settings, to: '/perfil' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Mi Perfil" showNotifications={false} />
      
      <main className="container px-4 py-6 space-y-8">
        {/* Profile Header */}
        <section className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
            <User className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Lector de Shalom</h2>
            <p className="text-muted-foreground">
              {stats.chaptersRead === 0 ? 'Comienza tu viaje' : `${stats.chaptersRead} capítulos leídos`}
            </p>
            {stats.longestStreak > 0 && (
              <p className="text-sm text-primary mt-1">
                🏆 Mejor racha: {stats.longestStreak} días
              </p>
            )}
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-3">
          {displayStats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-card p-4 border border-border/50">
              {stat.customIcon ? stat.customIcon : stat.icon && <stat.icon className="h-5 w-5 text-primary mb-2" />}
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Weekly Activity */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Actividad Semanal</h3>
          <div className="flex justify-between gap-2">
                {dayLabels.map((day, index) => {
              const isActive = weeklyActivity[index];
              const isToday = index === todayIndex;
              return (
                <div key={`${day}-${index}`} className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium',
                      isToday && isActive ? 'bg-amber-100 dark:bg-amber-900/30 ring-2 ring-primary' :
                      isToday ? 'ring-2 ring-primary bg-secondary' :
                      isActive ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-secondary'
                    )}
                  >
                    {isActive ? (
                      <img src={crownIcon} alt="Activo" className="w-6 h-6" />
                    ) : (
                      <span className="text-muted-foreground">{day}</span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{day}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Menu Items */}
        <section className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.to)}
              className="w-full flex items-center justify-between rounded-xl bg-card p-4 border border-border/50 hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && <span className="text-sm text-muted-foreground">{item.badge}</span>}
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </button>
          ))}
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Perfil;
