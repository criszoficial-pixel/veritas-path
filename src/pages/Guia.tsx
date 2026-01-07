import { useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { GuiaHero } from '@/components/guia/GuiaHero';
import { EmotionPicker } from '@/components/guia/EmotionPicker';
import { SituationList } from '@/components/guia/SituationList';
import { SpiritualNeeds } from '@/components/guia/SpiritualNeeds';

const Guia = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Guía Espiritual" />
      
      <main className="container px-4 py-6">
        <GuiaHero onScrollToContent={handleScrollToContent} />
        
        <div ref={contentRef}>
          <EmotionPicker />
          <SituationList />
          <SpiritualNeeds />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Guia;
