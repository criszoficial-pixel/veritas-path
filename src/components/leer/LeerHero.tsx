import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface LeerHeroProps {
  onScrollToContent: () => void;
}

export function LeerHero({ onScrollToContent }: LeerHeroProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden mb-8">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80')`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      
      {/* Content */}
      <div className="relative z-10 px-6 py-12 md:py-16 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 font-scripture">
          Explora la Palabra de Dios
        </h1>
        
        <p className="text-white/90 text-sm md:text-base max-w-md mx-auto mb-6 leading-relaxed">
          Sumérgete en las Sagradas Escrituras. Selecciona una colección y comienza tu viaje espiritual.
        </p>
        
        <Button 
          onClick={onScrollToContent}
          variant="outline"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
        >
          Explorar colecciones
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
