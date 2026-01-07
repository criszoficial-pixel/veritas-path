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
      
      {isCompleted && (
        <div 
          className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{
            background: `hsl(${collection.accentColor} / 0.2)`,
            color: `hsl(${collection.accentColor})`,
          }}
        >
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
      
      {/* Progress section */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between text-xs" style={{ color: `hsl(${collection.accentColor})` }}>
          <span className="opacity-70">{progress.percentage}% completado</span>
          <span className="opacity-70">
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
        
        <div 
          className="flex items-center gap-2 text-sm mt-3"
          style={{ color: `hsl(${collection.accentColor})` }}
        >
          <BookOpen className="w-4 h-4 opacity-70" />
          <span className="opacity-90">{motivationalMessage}</span>
        </div>
      </div>
    </div>
  );
}
