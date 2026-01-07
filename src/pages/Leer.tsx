import { useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { LeerHero } from '@/components/leer/LeerHero';
import { CoverGallery } from '@/components/bible/CoverGallery';

const Leer = () => {
  const galleryRef = useRef<HTMLDivElement>(null);

  const handleScrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Biblioteca Sagrada" />
      
      <main className="container px-4 py-6">
        <LeerHero onScrollToContent={handleScrollToGallery} />
        
        <div ref={galleryRef} className="pt-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Colecciones Disponibles
            </h2>
            <p className="text-sm text-muted-foreground">
              Selecciona una colección para comenzar tu lectura
            </p>
          </div>
          <CoverGallery />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Leer;
