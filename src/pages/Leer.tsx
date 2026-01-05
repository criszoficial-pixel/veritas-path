import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { CoverGallery } from '@/components/bible/CoverGallery';

const Leer = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Biblioteca Sagrada" />
      
      <main className="container px-4 py-6">
        <CoverGallery />
      </main>

      <BottomNav />
    </div>
  );
};

export default Leer;
