import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { fetchBibleMetadata } from '@/services/bibleDataService';
import type { BibleMetadata, BookInfo } from '@/types/bible';

export const BookSelector = () => {
  const [activeTestament, setActiveTestament] = useState<'AT' | 'NT'>('AT');
  const [metadata, setMetadata] = useState<BibleMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { languageCode } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const loadMetadata = async () => {
      setIsLoading(true);
      const data = await fetchBibleMetadata(languageCode);
      setMetadata(data);
      setIsLoading(false);
    };
    loadMetadata();
  }, [languageCode]);

  const filteredBooks = metadata?.books.filter((book) => book.testament === activeTestament) ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Version Badge */}
      {metadata && (
        <div className="text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {metadata.versionShort}
          </span>
        </div>
      )}

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
          {t('books.oldTestament')}
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
          {t('books.newTestament')}
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
                <p className="text-xs text-muted-foreground">{book.chapters} {t('reader.chapter').toLowerCase()}s</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
};
