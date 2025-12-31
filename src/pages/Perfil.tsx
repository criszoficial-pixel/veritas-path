import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { 
  User, 
  BookOpen, 
  Trophy, 
  Flame, 
  Clock, 
  Settings, 
  Heart, 
  Bookmark, 
  History,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  { label: 'Capítulos Leídos', value: '47', icon: BookOpen },
  { label: 'Quizzes Completados', value: '23', icon: Trophy },
  { label: 'Días de Racha', value: '7', icon: Flame },
  { label: 'Horas Totales', value: '12', icon: Clock },
];

const menuItems = [
  { label: 'Mis Marcadores', icon: Bookmark, badge: '24' },
  { label: 'Historial de Lectura', icon: History },
  { label: 'Mis Logros', icon: Trophy, badge: '8/25' },
  { label: 'Frases Favoritas', icon: Heart, badge: '15' },
  { label: 'Configuración', icon: Settings },
];

const Perfil = () => {
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
            <h2 className="text-xl font-bold text-foreground">Peregrino</h2>
            <p className="text-muted-foreground">Nivel 4 • Discípulo</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-2 flex-1 max-w-32 bg-secondary rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-primary rounded-full" />
              </div>
              <span className="text-xs text-muted-foreground">3,250 / 6,000 pts</span>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-card p-4 border border-border/50"
            >
              <stat.icon className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Weekly Activity */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Actividad Semanal</h3>
          <div className="flex justify-between gap-2">
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => {
              const isActive = index < 5;
              const isToday = index === 4;
              return (
                <div key={day} className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium',
                      isToday
                        ? 'bg-primary text-primary-foreground'
                        : isActive
                        ? 'bg-spirit/20 text-spirit'
                        : 'bg-secondary text-muted-foreground'
                    )}
                  >
                    {isActive && <Flame className="h-4 w-4" />}
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
              className="w-full flex items-center justify-between rounded-xl bg-card p-4 border border-border/50 hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="text-sm text-muted-foreground">{item.badge}</span>
                )}
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </button>
          ))}
        </section>

        {/* Donate Section */}
        <section className="rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 p-6 border border-accent/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Apoya Nuestra Misión</h3>
              <p className="text-sm text-muted-foreground mt-1">
                100% de las donaciones van a causas benéficas
              </p>
              <Button variant="gold" size="sm" className="mt-3">
                Donar
              </Button>
            </div>
          </div>
        </section>

        {/* Sign Out */}
        <Button variant="outline" className="w-full text-muted-foreground">
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar Sesión
        </Button>
      </main>

      <BottomNav />
    </div>
  );
};

export default Perfil;
