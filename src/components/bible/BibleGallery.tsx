import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBibleMetadata } from '@/services/bibleDataService';
import { BookShelf } from './BookShelf';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen } from 'lucide-react';
import type { BookInfo } from '@/types/bible';

export function BibleGallery() {
  const [testament, setTestament] = useState<'AT' | 'NT'>('AT');

  const { data: metadata, isLoading, error } = useQuery({
    queryKey: ['bible-metadata'],
    queryFn: () => fetchBibleMetadata(),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-6 w-24 mx-auto" />
        </div>
        <Skeleton className="h-10 w-64 mx-auto" />
        <div className="space-y-8">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (error || !metadata) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Error loading Bible library</p>
      </div>
    );
  }

  const filteredBooks = metadata.books.filter(book => book.testament === testament);
  
  // Split books into shelves (groups for display)
  const booksPerShelf = 10;
  const shelves: BookInfo[][] = [];
  for (let i = 0; i < filteredBooks.length; i += booksPerShelf) {
    shelves.push(filteredBooks.slice(i, i + booksPerShelf));
  }

  return (
    <div className="space-y-6">
      {/* Header with version info */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">{metadata.version}</h2>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          {metadata.versionShort}
        </span>
      </div>

      {/* Testament toggle */}
      <Tabs value={testament} onValueChange={(v) => setTestament(v as 'AT' | 'NT')} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="AT">Antiguo Testamento</TabsTrigger>
          <TabsTrigger value="NT">Nuevo Testamento</TabsTrigger>
        </TabsList>

        <TabsContent value="AT" className="mt-6">
          <div className="space-y-8">
            {shelves.map((shelfBooks, idx) => (
              <BookShelf 
                key={`at-shelf-${idx}`} 
                books={shelfBooks} 
                startIndex={idx * booksPerShelf}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="NT" className="mt-6">
          <div className="space-y-8">
            {shelves.map((shelfBooks, idx) => (
              <BookShelf 
                key={`nt-shelf-${idx}`} 
                books={shelfBooks} 
                startIndex={idx * booksPerShelf}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Copyright footer */}
      <p className="text-center text-xs text-muted-foreground pt-4">
        {metadata.copyright}
      </p>
    </div>
  );
}
