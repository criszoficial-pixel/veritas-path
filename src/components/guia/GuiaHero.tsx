import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GuiaHeroProps {
  onScrollToContent: () => void;
}

export const GuiaHero = ({ onScrollToContent }: GuiaHeroProps) => {
  return (
    <section className="relative rounded-2xl overflow-hidden mb-8">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
          alt="Montañas al amanecer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      </div>
      
      {/* Content */}
      <div className="relative px-6 py-12 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Encuentra consuelo y guía en la Palabra de Dios
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Selecciona cómo te sientes o qué situación atraviesas, y te mostraremos versículos que pueden ayudarte.
        </p>
        <Button 
          onClick={onScrollToContent}
          className="gap-2"
        >
          Comenzar ahora
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};
