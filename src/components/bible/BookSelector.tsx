import { useState } from 'react';
import { Link } from 'react-router-dom';
import { books } from '@/data/bibleData';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export const BookSelector = () => {
  const [activeTestament, setActiveTestament] = useState<'AT' | 'NT'>('AT');

  const filteredBooks = books.filter((book) => book.testament === activeTestament);

  return (
    <div className="space-y-4">
      {/* Testament Toggle */}
      <div className="flex gap-2 p-1 bg-secondary rounded-xl">
        <button
          onClick={() => setActiveTestament('AT')}
          className={cn(
            'flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200',
            activeTestament === 'AT'
              ? 'bg-primary text-primary-foreground shadow-soft'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Antiguo Testamento
        </button>
        <button
          onClick={() => setActiveTestament('NT')}
          className={cn(
            'flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200',
            activeTestament === 'NT'
              ? 'bg-primary text-primary-foreground shadow-soft'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Nuevo Testamento
        </button>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {filteredBooks.map((book) => (
          <Link
            key={book.id}
            to={`/leer/${book.name}/1`}
            className="group flex items-center justify-between p-4 rounded-xl bg-card hover:bg-secondary border border-border/50 transition-all duration-200 hover:shadow-soft"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">{book.shortName}</span>
              </div>
              <div>
                <h3 className="font-medium text-foreground">{book.name}</h3>
                <p className="text-xs text-muted-foreground">{book.chapters} capítulos</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
};
