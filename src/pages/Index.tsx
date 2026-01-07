import { useState, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { HeroSection } from '@/components/home/HeroSection';
import { ProgressStats } from '@/components/home/ProgressStats';
import { QuickActions } from '@/components/home/QuickActions';
import { WelcomeModal } from '@/components/home/WelcomeModal';

const Index = () => {
  const [, forceUpdate] = useState({});
  
  const handleWelcomeComplete = useCallback(() => {
    forceUpdate({});
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      
      <main className="container px-4 py-6 space-y-6">
        {/* Hero Section with verse + greeting */}
        <section>
          <HeroSection />
        </section>

        {/* Progress Stats */}
        <section>
          <ProgressStats />
        </section>

        {/* Quick Actions */}
        <section>
          <QuickActions />
        </section>
      </main>

      <BottomNav />
      
      {/* Welcome Modal for first-time users */}
      <WelcomeModal onComplete={handleWelcomeComplete} />
    </div>
  );
};

export default Index;
