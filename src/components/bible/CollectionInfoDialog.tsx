import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Cross, ScrollText, Heart, Sparkles } from 'lucide-react';
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
  children: React.ReactNode;
}

const iconMap: Record<string, React.ElementType> = {
  cross: Cross,
  scroll: ScrollText,
  heart: Heart,
  sparkles: Sparkles,
  book: BookOpen,
};

export function CollectionInfoDialog({ collection, children }: CollectionInfoDialogProps) {
  const Icon = iconMap[collection.icon] || BookOpen;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-start gap-4 mb-2">
            {/* Mini cover */}
            <div 
              className="w-16 h-20 rounded-md flex-shrink-0 flex items-center justify-center shadow-md"
              style={{
                background: `linear-gradient(135deg, hsl(${collection.coverColor}) 0%, hsl(${collection.coverColor} / 0.8) 100%)`,
              }}
            >
              <Icon 
                className="w-6 h-6"
                style={{ color: `hsl(${collection.accentColor})` }}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <DialogTitle className="font-scripture text-xl mb-1">
                {collection.title}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                {collection.subtitle}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{collection.bookCount} libros</span>
                {collection.badge && (
                  <>
                    <span>·</span>
                    <span 
                      className="px-1.5 py-0.5 rounded-full text-[10px] font-medium"
                      style={{ 
                        background: `hsl(${collection.accentColor} / 0.15)`,
                        color: `hsl(${collection.accentColor})`,
                      }}
                    >
                      {collection.badge}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {collection.summary && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">
                ¿Qué es {collection.title}?
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {collection.summary}
              </p>
            </div>
          )}
          
          <div className="pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-1">
              {collection.description}
            </p>
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
