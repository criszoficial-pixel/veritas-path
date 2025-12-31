import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { DailyVerseCard } from '@/components/home/DailyVerseCard';
import { QuickActions } from '@/components/home/QuickActions';
import { ProgressStats } from '@/components/home/ProgressStats';

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      
      <main className="container px-4 py-6 space-y-8">
        {/* Welcome Section */}
        <section className="animate-fade-in">
          <p className="text-muted-foreground mb-1">Bienvenido de vuelta</p>
          <h2 className="text-2xl font-bold text-foreground">Que la paz esté contigo ✨</h2>
        </section>

        {/* Daily Verse */}
        <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <DailyVerseCard />
        </section>

        {/* Progress Stats */}
        <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <ProgressStats />
        </section>

        {/* Quick Actions */}
        <section className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <QuickActions />
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
