import { StickyNote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VerseNoteIndicatorProps {
  hasNote: boolean;
  onClick: () => void;
  className?: string;
}

export const VerseNoteIndicator = ({ hasNote, onClick, className }: VerseNoteIndicatorProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center w-5 h-5 rounded-full transition-all',
        hasNote 
          ? 'bg-primary/20 text-primary hover:bg-primary/30' 
          : 'text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted',
        className
      )}
      title={hasNote ? 'Ver nota' : 'Agregar nota'}
    >
      <StickyNote className={cn('h-3 w-3', hasNote && 'fill-current')} />
    </button>
  );
};
