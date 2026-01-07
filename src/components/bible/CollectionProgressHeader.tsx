import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { BibleCollection } from '@/types/collections';
import type { CollectionProgress } from '@/hooks/useCollectionProgress';
import { getMotivationalMessage } from '@/hooks/useCollectionProgress';

interface CollectionProgressHeaderProps {
  collection: BibleCollection;
  progress: CollectionProgress;
}

export function CollectionProgressHeader({ collection, progress }: CollectionProgressHeaderProps) {
  const navigate = useNavigate();
  const motivationalMessage = getMotivationalMessage(progress, collection.title);
  const isCompleted = progress.percentage === 100;
  
  return (
    <div 
      className="relative rounded-xl p-6 mb-6 overflow-hidden"
      style={{
        background: `linear-gradient(145deg, hsl(${collection.coverColor}) 0%, hsl(${collection.coverColor} / 0.7) 50%, hsl(${collection.coverColor} / 0.5) 100%)`,
      }}
    >
      {/* Decorative elements */}
      <div 
        className="absolute top-4 right-4 w-24 h-24 rounded-full opacity-10"
        style={{
          background: `hsl(${collection.accentColor})`,
        }}
      />
      
      {isCompleted && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/20 text-white">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Completado
        </div>
      )}
      
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
        className="text-2xl md:text-3xl font-bold font-scripture text-white"
      >
        {collection.title}
      </h1>
      <p className="text-sm md:text-base text-white/80 mt-1">
        {collection.subtitle}
      </p>
      
      {/* Collection summary */}
      {collection.summary && (
        <p className="text-xs md:text-sm text-white/70 mt-3 leading-relaxed max-w-2xl">
          {collection.summary}
        </p>
      )}
      
      {/* Progress section */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between text-xs text-white/80">
          <span>{progress.percentage}% completado</span>
          <span>
            {progress.booksCompleted} de {progress.totalBooks} libros
          </span>
        </div>
        
        <Progress 
          value={progress.percentage} 
          className="h-2 bg-white/20"
          style={{
            '--progress-foreground': `hsl(${collection.accentColor})`,
          } as React.CSSProperties}
        />
        
        <div className="flex items-center gap-2 text-sm mt-3 text-white/90">
          <BookOpen className="w-4 h-4" />
          <span>{motivationalMessage}</span>
        </div>
      </div>
    </div>
  );
}
