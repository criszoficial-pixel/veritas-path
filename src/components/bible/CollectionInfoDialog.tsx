import { Link } from 'react-router-dom';
import { Info, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { BibleCollection } from '@/types/collections';

interface CollectionInfoDialogProps {
  collection: BibleCollection;
}

export function CollectionInfoDialog({ collection }: CollectionInfoDialogProps) {
  if (!collection.summary) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="p-1 rounded-full hover:bg-muted/50 transition-colors"
          onClick={(e) => e.preventDefault()}
          aria-label={`Más información sobre ${collection.title}`}
        >
          <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, hsl(${collection.coverColor}) 0%, hsl(${collection.coverColor} / 0.8) 100%)`,
              }}
            >
              <BookOpen 
                className="w-5 h-5"
                style={{ color: `hsl(${collection.accentColor})` }}
              />
            </div>
            <DialogTitle className="font-scripture text-xl">
              ¿Qué es {collection.title}?
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {collection.summary}
          </p>
          
          <div className="flex items-center gap-4 py-3 border-t border-border/50">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {collection.bookCount} libros
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              {collection.description}
            </div>
          </div>
          
          <Button asChild className="w-full">
            <Link to={`/leer/${collection.slug}`}>
              Comenzar a leer
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
