import type { BookInfo } from '@/types/bible';
import { BookSpine } from './BookSpine';

interface BookShelfProps {
  books: BookInfo[];
  startIndex?: number;
}

export function BookShelf({ books, startIndex = 0 }: BookShelfProps) {
  return (
    <div className="relative">
      {/* Books container */}
      <div className="flex gap-1 px-4 pb-3 overflow-x-auto scrollbar-hide">
        {books.map((book, idx) => (
          <BookSpine 
            key={book.id} 
            book={book} 
            index={startIndex + idx} 
          />
        ))}
      </div>
      
      {/* Shelf surface */}
      <div className="relative h-3 mx-2 rounded-b-sm" style={{
        background: 'linear-gradient(180deg, hsl(30, 30%, 35%) 0%, hsl(30, 35%, 25%) 100%)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}>
        {/* Wood grain texture */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 21px)',
        }} />
      </div>
      
      {/* Shelf bracket shadows */}
      <div className="absolute -bottom-1 left-4 w-2 h-4 bg-gradient-to-b from-black/20 to-transparent" />
      <div className="absolute -bottom-1 right-4 w-2 h-4 bg-gradient-to-b from-black/20 to-transparent" />
    </div>
  );
}
