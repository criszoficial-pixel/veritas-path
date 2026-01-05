import { Link } from 'react-router-dom';
import type { BookInfo } from '@/types/bible';
import { getBookCategory } from '@/lib/bookCategories';

interface BookSpineProps {
  book: BookInfo;
  index: number;
}

export function BookSpine({ book, index }: BookSpineProps) {
  const category = getBookCategory(book);
  
  return (
    <Link
      to={`/leer/${book.slug}/1`}
      className="group relative flex-shrink-0 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:z-10"
      style={{
        animationDelay: `${index * 30}ms`,
      }}
    >
      {/* Book spine */}
      <div
        className="relative h-32 w-12 rounded-sm shadow-md transition-all duration-300 group-hover:shadow-xl"
        style={{
          backgroundColor: category.color,
          boxShadow: `
            inset -2px 0 4px rgba(0,0,0,0.2),
            inset 2px 0 4px rgba(255,255,255,0.1),
            2px 4px 8px rgba(0,0,0,0.2)
          `,
        }}
      >
        {/* Decorative top band */}
        <div 
          className="absolute top-2 left-1 right-1 h-0.5 rounded-full opacity-40"
          style={{ backgroundColor: category.textColor }}
        />
        
        {/* Book title - vertical text */}
        <div className="absolute inset-0 flex items-center justify-center p-1">
          <span
            className="text-xs font-semibold tracking-wide whitespace-nowrap overflow-hidden text-ellipsis max-h-24"
            style={{
              color: category.textColor,
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
            }}
          >
            {book.name}
          </span>
        </div>
        
        {/* Decorative bottom band */}
        <div 
          className="absolute bottom-2 left-1 right-1 h-0.5 rounded-full opacity-40"
          style={{ backgroundColor: category.textColor }}
        />
        
        {/* Spine edge highlight */}
        <div className="absolute top-0 left-0 w-0.5 h-full bg-white/10 rounded-l-sm" />
      </div>
      
      {/* Hover tooltip */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
        <div className="bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
          {book.name}
          <span className="text-muted-foreground ml-1">({book.chapters} cap.)</span>
        </div>
      </div>
    </Link>
  );
}
