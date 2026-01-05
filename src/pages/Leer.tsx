import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { BibleGallery } from '@/components/bible/BibleGallery';

const Leer = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Biblioteca Bíblica" />
      
      <main className="container px-4 py-6">
        <BibleGallery />
      </main>

      <BottomNav />
    </div>
  );
};

export default Leer;
