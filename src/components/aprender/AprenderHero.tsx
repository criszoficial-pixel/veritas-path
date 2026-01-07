import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AprenderHeroProps {
  onScrollToContent: () => void;
}

export const AprenderHero = ({ onScrollToContent }: AprenderHeroProps) => {
  return (
    <section className="relative rounded-2xl overflow-hidden mb-8">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1200&q=80"
          alt="Biblia abierta con luz natural"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      </div>
      
      {/* Content */}
      <div className="relative px-6 py-12 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Transforma tu vida con la lectura diaria
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Elige un plan de lectura que se adapte a tu tiempo y profundiza en la Palabra de Dios cada día.
        </p>
        <Button 
          onClick={onScrollToContent}
          className="gap-2"
        >
          Ver planes disponibles
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};
