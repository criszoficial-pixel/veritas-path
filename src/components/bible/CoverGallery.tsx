import { useQuery } from '@tanstack/react-query';
import { BookCover } from './BookCover';
import { Skeleton } from '@/components/ui/skeleton';
import { Library } from 'lucide-react';
import type { CollectionsData } from '@/types/collections';

async function fetchCollections(): Promise<CollectionsData> {
  const response = await fetch('/bible/collections.json');
  if (!response.ok) {
    throw new Error('Failed to load collections');
  }
  return response.json();
}

export function CoverGallery() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['bible-collections'],
    queryFn: fetchCollections,
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-5 w-48 mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="aspect-[3/4] rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-12">
        <Library className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Error cargando biblioteca</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cover gallery grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {data.collections.map((collection, index) => (
          <BookCover 
            key={collection.id} 
            collection={collection} 
            index={index} 
          />
        ))}
      </div>

      {/* Footer note */}
      <p className="text-center text-xs text-muted-foreground pt-4">
        Más colecciones próximamente
      </p>
    </div>
  );
}
