import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Library } from 'lucide-react';
import { FeaturedCollection } from './FeaturedCollection';
import { CollectionCard } from './CollectionCard';
import { BeginnerTip } from './BeginnerTip';
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
        <Skeleton className="h-24 w-full rounded-xl" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[3/4] rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
            </div>
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

  const featuredCollection = data.collections.find(c => c.featured);
  const thematicCollections = data.collections.filter(c => !c.featured);

  return (
    <div className="space-y-8">
      {/* Featured Collection */}
      {featuredCollection && (
        <FeaturedCollection collection={featuredCollection} />
      )}

      {/* Thematic Collections */}
      {thematicCollections.length > 0 && (
        <div>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-foreground mb-1">
              Colecciones Temáticas
            </h3>
            <p className="text-xs text-muted-foreground">
              Para profundizar en temas específicos
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {thematicCollections.map((collection, index) => (
              <CollectionCard 
                key={collection.id} 
                collection={collection} 
                index={index} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Beginner Tip */}
      <BeginnerTip />
    </div>
  );
}
