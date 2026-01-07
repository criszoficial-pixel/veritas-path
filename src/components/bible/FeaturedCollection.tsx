import { Link } from 'react-router-dom';
import { Star, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { BibleCollection } from '@/types/collections';

interface FeaturedCollectionProps {
  collection: BibleCollection;
}

export function FeaturedCollection({ collection }: FeaturedCollectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
        <span className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wide">
          Recomendado para ti
        </span>
      </div>
      
      <Link
        to={`/leer/${collection.slug}`}
        className="group block rounded-xl overflow-hidden border border-border/50 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
        style={{
          boxShadow: `0 4px 20px hsl(${collection.coverColor} / 0.1)`,
        }}
      >
        <div className="flex items-stretch">
          {/* Mini Cover */}
          <div 
            className="w-24 md:w-32 flex-shrink-0 flex items-center justify-center p-4"
            style={{
              background: `linear-gradient(135deg, hsl(${collection.coverColor}) 0%, hsl(${collection.coverColor} / 0.8) 100%)`,
            }}
          >
            <BookOpen 
              className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110"
              style={{ color: `hsl(${collection.accentColor})` }}
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 p-4 md:p-5 flex flex-col justify-center">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-scripture text-lg md:text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {collection.title} Completa
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {collection.subtitle}
                </p>
                <p className="text-sm text-foreground/80 hidden md:block">
                  {collection.benefit}
                </p>
              </div>
              
              <div className="hidden md:block flex-shrink-0">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  Comenzar
                  <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-3 mt-3">
              <span className="text-xs text-muted-foreground">
                {collection.bookCount} libros
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {collection.description}
              </span>
            </div>
          </div>
          
          {/* Mobile arrow */}
          <div className="md:hidden flex items-center pr-4">
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>
      </Link>
    </div>
  );
}
