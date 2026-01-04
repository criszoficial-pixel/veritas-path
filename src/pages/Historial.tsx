import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { ChevronLeft, History, BookOpen, Clock } from 'lucide-react';
import { useUserProgress } from '@/hooks/useUserProgress';

const Historial = () => {
  const navigate = useNavigate();
  const { history } = useUserProgress();

  const handleNavigate = (item: typeof history[0]) => {
    navigate(`/leer/${encodeURIComponent(item.bookName)}/${item.chapter}`);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Hoy, ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
    }
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  // Group history by date
  const groupedHistory = history.reduce((groups, item) => {
    const date = new Date(item.timestamp).toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {} as Record<string, typeof history>);

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-lg">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link to="/perfil" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Perfil</span>
          </Link>
          <h1 className="text-lg font-semibold text-foreground">Historial</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="container px-4 py-6">
        {history.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <History className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Sin historial</h2>
            <p className="text-muted-foreground max-w-xs mx-auto">
              Tu historial de lectura aparecerá aquí cuando comiences a leer capítulos.
            </p>
            <Button onClick={() => navigate('/leer')} className="mt-4">
              <BookOpen className="h-4 w-4 mr-2" />
              Comenzar a leer
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              {history.length} {history.length === 1 ? 'capítulo leído' : 'capítulos leídos'}
            </p>

            {Object.entries(groupedHistory).map(([date, items]) => (
              <div key={date}>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 capitalize">
                  {date}
                </h3>
                <div className="space-y-2">
                  {items.map((item, index) => (
                    <button
                      key={`${item.bookSlug}-${item.chapter}-${index}`}
                      onClick={() => handleNavigate(item)}
                      className="w-full rounded-xl bg-card border border-border/50 p-4 text-left hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">
                            {item.bookName} {item.chapter}
                          </h4>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(item.timestamp)}
                          </p>
                        </div>
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Historial;
