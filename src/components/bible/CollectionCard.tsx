import { Link } from 'react-router-dom';
import { Cross, ScrollText, Heart, Sparkles, BookOpen } from 'lucide-react';
import type { BibleCollection } from '@/types/collections';

interface CollectionCardProps {
  collection: BibleCollection;
  index: number;
}

const iconMap = {
  cross: Cross,
  scroll: ScrollText,
  heart: Heart,
  sparkles: Sparkles,
  book: BookOpen,
};

export function CollectionCard({ collection, index }: CollectionCardProps) {
  const Icon = iconMap[collection.icon] || BookOpen;
  
  return (
    <Link
      to={`/leer/${collection.slug}`}
      className="group block opacity-0 animate-fade-in"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'forwards',
      }}
    >
      {/* Cover */}
      <div 
        className="relative aspect-[3/4] w-full rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl mb-3"
        style={{
          background: `linear-gradient(135deg, hsl(${collection.coverColor}) 0%, hsl(${collection.coverColor} / 0.8) 100%)`,
        }}
      >
        {/* Decorative border */}
        <div 
          className="absolute inset-2 rounded-sm border opacity-30"
          style={{ borderColor: `hsl(${collection.accentColor})` }}
        />
        
        {/* Icon */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Icon 
            className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110"
            style={{ color: `hsl(${collection.accentColor})` }}
          />
        </div>
        
        {/* Title */}
        <div className="absolute inset-x-3 top-1/2 text-center">
          <h3 
            className="font-scripture text-lg md:text-xl font-bold leading-tight"
            style={{ color: `hsl(${collection.accentColor})` }}
          >
            {collection.title}
          </h3>
          <div 
            className="mx-auto my-1.5 w-8 h-px opacity-60"
            style={{ background: `hsl(${collection.accentColor})` }}
          />
          <p 
            className="text-xs opacity-80"
            style={{ color: `hsl(${collection.accentColor})` }}
          >
            {collection.subtitle}
          </p>
        </div>
        
        {/* Badge */}
        {collection.badge && (
          <div 
            className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-medium"
            style={{ 
              background: `hsl(${collection.accentColor} / 0.2)`,
              color: `hsl(${collection.accentColor})`,
            }}
          >
            {collection.badge}
          </div>
        )}
        
        {/* Spine effect */}
        <div 
          className="absolute top-0 left-0 bottom-0 w-3 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, hsl(0 0% 0% / 0.3), transparent)' }}
        />
      </div>
      
      {/* Description below cover */}
      <div className="space-y-1.5 px-1">
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {collection.benefit || collection.description}
        </p>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground/70">
          <span>{collection.bookCount} libros</span>
        </div>
      </div>
    </Link>
  );
}
