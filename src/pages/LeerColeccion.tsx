import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import type { CollectionsData, BibleCollection } from '@/types/collections';
import type { BibleMetadata, BookInfo } from '@/types/bible';

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

const LeerColeccion = () => {
  const { collectionSlug } = useParams<{ collectionSlug: string }>();
  const navigate = useNavigate();
  const [testament, setTestament] = useState<'AT' | 'NT'>('AT');

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

  // Filter books based on collection type
  const filteredBooks = useMemo(() => {
    if (!metadata) return [];
    
    let books = metadata.books;
    
    // If collection has a book filter, apply it
    if (collection?.booksFilter) {
      books = books.filter(book => collection.booksFilter!.includes(book.id));
    }
    
    // For full bible, filter by testament
    if (collection?.type === 'full-bible') {
      books = books.filter(book => book.testament === testament);
    }
    
    return books;
  }, [metadata, collection, testament]);

  const isLoading = loadingCollections || loadingMetadata;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <Header title="Cargando..." />
        <main className="container px-4 py-6 space-y-6">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-10 w-64 mx-auto" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
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
        {/* Collection header */}
        <div 
          className="relative rounded-xl p-6 mb-6 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, hsl(${collection.coverColor}) 0%, hsl(${collection.coverColor} / 0.8) 100%)`,
          }}
        >
          {/* Decorative elements */}
          <div 
            className="absolute top-4 right-4 w-24 h-24 rounded-full opacity-10"
            style={{
              background: `hsl(${collection.accentColor})`,
            }}
          />
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/leer')}
            className="mb-4 -ml-2 text-white/80 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Biblioteca
          </Button>
          
          <h1 
            className="text-2xl md:text-3xl font-bold font-scripture"
            style={{ color: `hsl(${collection.accentColor})` }}
          >
            {collection.title}
          </h1>
          <p 
            className="text-sm md:text-base opacity-80 mt-1"
            style={{ color: `hsl(${collection.accentColor})` }}
          >
            {collection.subtitle}
          </p>
          <p 
            className="text-xs opacity-60 mt-2"
            style={{ color: `hsl(${collection.accentColor})` }}
          >
            {collection.description}
          </p>
        </div>

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

        {/* Books list */}
        <div className="space-y-2">
          {filteredBooks.map((book, index) => (
            <BookCard 
              key={book.id} 
              book={book} 
              collectionSlug={collection.slug}
              index={index}
              accentColor={collection.accentColor}
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

interface BookCardProps {
  book: BookInfo;
  collectionSlug: string;
  index: number;
  accentColor: string;
}

function BookCard({ book, collectionSlug, index, accentColor }: BookCardProps) {
  return (
    <Link
      to={`/leer/${collectionSlug}/${book.slug}/1`}
      className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 opacity-0 animate-fade-in"
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: 'forwards',
      }}
    >
      {/* Book number indicator */}
      <div 
        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-sm"
        style={{
          background: `hsl(${accentColor} / 0.15)`,
          color: `hsl(${accentColor})`,
        }}
      >
        {book.id}
      </div>
      
      {/* Book info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
          {book.name}
        </h3>
        <p className="text-xs text-muted-foreground">
          {book.chapters} {book.chapters === 1 ? 'capítulo' : 'capítulos'}
        </p>
      </div>
      
      {/* Arrow */}
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </Link>
  );
}

export default LeerColeccion;
