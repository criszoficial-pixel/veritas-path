import { Link } from 'react-router-dom';
import { Play, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CollectionProgress } from '@/hooks/useCollectionProgress';

interface ContinueReadingProps {
  collectionSlug: string;
  progress: CollectionProgress;
  accentColor: string;
}

export function ContinueReading({ collectionSlug, progress, accentColor }: ContinueReadingProps) {
  if (!progress.lastReadBook) {
    return null;
  }
  
  const { slug, name, chapter } = progress.lastReadBook;
  const nextChapter = chapter + 1;
  
  return (
    <div className="mb-6">
      <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
        <Play className="w-4 h-4" />
        Continúa donde lo dejaste
      </h2>
      
      <Link
        to={`/leer/${collectionSlug}/${slug}/${nextChapter}`}
        className="group flex items-center justify-between p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <div 
            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: `hsl(${accentColor} / 0.15)`,
              color: `hsl(${accentColor})`,
            }}
          >
            <BookOpen className="w-5 h-5" />
          </div>
          
          <div>
            <p className="font-medium text-foreground group-hover:text-primary transition-colors">
              {name} · Capítulo {nextChapter}
            </p>
            <p className="text-xs text-muted-foreground">
              Continúa tu lectura
            </p>
          </div>
        </div>
        
        <Button 
          variant="default" 
          size="sm"
          className="group-hover:bg-primary/90"
          style={{
            background: `hsl(${accentColor})`,
          }}
        >
          Leer
        </Button>
      </Link>
    </div>
  );
}
