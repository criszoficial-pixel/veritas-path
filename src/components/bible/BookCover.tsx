import { Link } from 'react-router-dom';
import { Cross, ScrollText, Heart, Sparkles, BookOpen } from 'lucide-react';
import type { BibleCollection } from '@/types/collections';

interface BookCoverProps {
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

export function BookCover({ collection, index }: BookCoverProps) {
  const Icon = iconMap[collection.icon] || BookOpen;
  
  return (
    <Link
      to={`/leer/${collection.slug}`}
      className="group relative block opacity-0 animate-cover-appear"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Book container with 3D perspective */}
      <div 
        className="relative aspect-[3/4] w-full transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:rotate-y-[-8deg]"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Main cover */}
        <div 
          className="absolute inset-0 rounded-r-lg rounded-l-sm overflow-hidden shadow-xl transition-all duration-500 group-hover:shadow-2xl"
          style={{
            background: `linear-gradient(135deg, hsl(${collection.coverColor}) 0%, hsl(${collection.coverColor} / 0.8) 100%)`,
            boxShadow: `
              4px 4px 10px hsl(${collection.coverColor} / 0.4),
              8px 8px 20px hsl(${collection.coverColor} / 0.2),
              inset -2px 0 10px hsl(0 0% 0% / 0.2)
            `,
          }}
        >
          {/* Decorative border */}
          <div 
            className="absolute inset-3 rounded-sm border-2 opacity-30"
            style={{
              borderColor: `hsl(${collection.accentColor})`,
            }}
          />
          
          {/* Inner decorative frame */}
          <div 
            className="absolute inset-5 rounded-sm border opacity-20"
            style={{
              borderColor: `hsl(${collection.accentColor})`,
            }}
          />
          
          {/* Icon */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Icon 
              className="w-12 h-12 md:w-16 md:h-16 transition-all duration-300 group-hover:scale-110"
              style={{
                color: `hsl(${collection.accentColor})`,
                filter: `drop-shadow(0 2px 4px hsl(${collection.coverColor} / 0.5))`,
              }}
            />
          </div>
          
          {/* Ornamental line */}
          <div 
            className="absolute top-[45%] left-1/2 -translate-x-1/2 w-16 h-0.5 opacity-50"
            style={{
              background: `linear-gradient(90deg, transparent, hsl(${collection.accentColor}), transparent)`,
            }}
          />
          
          {/* Title */}
          <div className="absolute inset-x-4 top-1/2 text-center">
            <h3 
              className="font-scripture text-xl md:text-2xl font-bold tracking-wide leading-tight"
              style={{
                color: `hsl(${collection.accentColor})`,
                textShadow: `0 2px 4px hsl(${collection.coverColor})`,
              }}
            >
              {collection.title}
            </h3>
            
            {/* Decorative divider */}
            <div 
              className="mx-auto my-2 w-12 h-px opacity-60"
              style={{
                background: `hsl(${collection.accentColor})`,
              }}
            />
            
            <p 
              className="text-xs md:text-sm opacity-80 font-ui"
              style={{
                color: `hsl(${collection.accentColor})`,
              }}
            >
              {collection.subtitle}
            </p>
          </div>
          
          {/* Bottom ornament */}
          <div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-8 opacity-30"
            style={{
              borderBottom: `2px solid hsl(${collection.accentColor})`,
              borderLeft: `2px solid hsl(${collection.accentColor})`,
              borderRight: `2px solid hsl(${collection.accentColor})`,
              borderRadius: '0 0 50% 50%',
            }}
          />
          
          {/* Spine shadow gradient */}
          <div 
            className="absolute top-0 left-0 bottom-0 w-4 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, hsl(0 0% 0% / 0.3), transparent)',
            }}
          />
          
          {/* Page edges effect */}
          <div 
            className="absolute top-1 right-0 bottom-1 w-1 rounded-r-sm"
            style={{
              background: 'linear-gradient(90deg, hsl(40 30% 90%), hsl(40 30% 85%))',
              boxShadow: 'inset 0 0 2px hsl(0 0% 0% / 0.1)',
            }}
          />
        </div>
        
        {/* Book spine (left side) */}
        <div 
          className="absolute top-0 left-0 bottom-0 w-3 rounded-l-sm transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, hsl(${collection.coverColor} / 0.6), hsl(${collection.coverColor}))`,
            transform: 'translateX(-100%) rotateY(90deg)',
            transformOrigin: 'right center',
          }}
        />
      </div>
      
      {/* Hover glow effect */}
      <div 
        className="absolute -inset-2 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 -z-10 blur-xl"
        style={{
          background: `hsl(${collection.accentColor} / 0.2)`,
        }}
      />
    </Link>
  );
}
