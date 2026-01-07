import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { CollectionProgressHeader } from '@/components/bible/CollectionProgressHeader';
import { ContinueReading } from '@/components/bible/ContinueReading';
import { BookCardWithProgress } from '@/components/bible/BookCardWithProgress';
import { useCollectionProgress } from '@/hooks/useCollectionProgress';
import { getMultipleBooksProgress } from '@/hooks/useBookProgress';
import type { CollectionsData, BibleCollection } from '@/types/collections';
import type { BibleMetadata, BookInfo } from '@/types/bible';
import type { BookSummaries } from '@/types/bookSummary';

async function fetchCollections(): Promise<CollectionsData> {
  const response = await fetch('/bible/collections.json');
  if (!response.ok) throw new Error('Failed to load collections');
  return response.json();
}

async function fetchBibleMetadata(path: string): Promise<BibleMetadata> {
  const response = await fetch(path);
  if (!response.ok) throw new Error('Failed to load metadata');
  return response.json();
}

async function fetchBookSummaries(): Promise<BookSummaries> {
  const response = await fetch('/bible/es/book-summaries.json');
  if (!response.ok) throw new Error('Failed to load book summaries');
  return response.json();
}

const LeerColeccion = () => {
  const { collectionSlug } = useParams<{ collectionSlug: string }>();
  const navigate = useNavigate();
  const [testament, setTestament] = useState<'AT' | 'NT'>('AT');
  const [booksProgress, setBooksProgress] = useState<Record<string, ReturnType<typeof getMultipleBooksProgress>[string]>>({});

  // Fetch collections
  const { data: collectionsData, isLoading: loadingCollections } = useQuery({
    queryKey: ['bible-collections'],
    queryFn: fetchCollections,
  });

  // Find the current collection
  const collection = useMemo(() => {
    return collectionsData?.collections.find(c => c.slug === collectionSlug);
  }, [collectionsData, collectionSlug]);

  // Fetch bible metadata for this collection
  const { data: metadata, isLoading: loadingMetadata } = useQuery({
    queryKey: ['bible-metadata', collection?.metadataPath],
    queryFn: () => fetchBibleMetadata(collection!.metadataPath),
    enabled: !!collection?.metadataPath,
  });

  // Fetch book summaries
  const { data: bookSummaries } = useQuery({
    queryKey: ['book-summaries'],
    queryFn: fetchBookSummaries,
  });

  // Filter books based on collection type
  const allCollectionBooks = useMemo(() => {
    if (!metadata) return [];
    
    let books = metadata.books;
    
    // If collection has a book filter, apply it
    if (collection?.booksFilter) {
      books = books.filter(book => collection.booksFilter!.includes(book.id));
    }
    
    return books;
  }, [metadata, collection]);

  // For display (filtered by testament if full bible)
  const filteredBooks = useMemo(() => {
    if (!allCollectionBooks.length) return [];
    
    // For full bible, filter by testament
    if (collection?.type === 'full-bible') {
      return allCollectionBooks.filter(book => book.testament === testament);
    }
    
    return allCollectionBooks;
  }, [allCollectionBooks, collection, testament]);

  // Calculate collection progress
  const collectionProgress = useCollectionProgress(allCollectionBooks);

  // Update books progress when collection books change
  useEffect(() => {
    if (allCollectionBooks.length > 0) {
      const progress = getMultipleBooksProgress(allCollectionBooks);
      setBooksProgress(progress);
    }
  }, [allCollectionBooks]);

  const isLoading = loadingCollections || loadingMetadata;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <Header title="Cargando..." />
        <main className="container px-4 py-6 space-y-6">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-10 w-48" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <Header title="No encontrado" />
        <main className="container px-4 py-12 text-center">
          <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-6">Colección no encontrada</p>
          <Button onClick={() => navigate('/leer')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a la biblioteca
          </Button>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title={collection.title} />
      
      <main className="container px-4 py-6">
        {/* Collection header with progress */}
        <CollectionProgressHeader 
          collection={collection} 
          progress={collectionProgress} 
        />

        {/* Continue reading section */}
        <ContinueReading 
          collectionSlug={collection.slug}
          progress={collectionProgress}
          accentColor={collection.accentColor}
        />

        {/* Testament tabs (only for full bible) */}
        {collection.type === 'full-bible' && (
          <Tabs 
            value={testament} 
            onValueChange={(v) => setTestament(v as 'AT' | 'NT')} 
            className="w-full mb-6"
          >
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="AT">Antiguo Testamento</TabsTrigger>
              <TabsTrigger value="NT">Nuevo Testamento</TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {/* Section title */}
        <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          {collection.type === 'full-bible' 
            ? `Libros del ${testament === 'AT' ? 'Antiguo' : 'Nuevo'} Testamento`
            : 'Tu progreso en esta colección'
          }
        </h2>

        {/* Books list with progress */}
        <div className="space-y-2">
          {filteredBooks.map((book, index) => (
            <BookCardWithProgress 
              key={book.id} 
              book={book} 
              collectionSlug={collection.slug}
              index={index}
              accentColor={collection.accentColor}
              progress={booksProgress[book.slug] || {
                chaptersRead: 0,
                totalChapters: book.chapters,
                percentage: 0,
                lastReadChapter: null,
                isStarted: false,
                isCompleted: false,
              }}
              summary={bookSummaries?.[book.slug]}
            />
          ))}
        </div>

        {/* Footer */}
        {metadata && (
          <p className="text-center text-xs text-muted-foreground pt-6">
            {metadata.version} • {metadata.copyright}
          </p>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default LeerColeccion;
