import { StickyNote, Copy, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VerseSelectionBarProps {
  verseStart: number;
  verseEnd: number;
  bookName: string;
  chapter: number;
  onAddNote: () => void;
  onCopy: () => void;
  onCancel: () => void;
  className?: string;
}

export const VerseSelectionBar = ({
  verseStart,
  verseEnd,
  bookName,
  chapter,
  onAddNote,
  onCopy,
  onCancel,
  className,
}: VerseSelectionBarProps) => {
  const reference = verseStart === verseEnd 
    ? `${bookName} ${chapter}:${verseStart}`
    : `${bookName} ${chapter}:${verseStart}-${verseEnd}`;

  return (
    <div 
      className={cn(
        'fixed bottom-36 left-0 right-0 z-40 animate-fade-in',
        className
      )}
    >
      <div className="container px-4">
        <div className="flex items-center justify-between bg-primary text-primary-foreground rounded-2xl p-3 shadow-lg">
          <span className="text-sm font-medium px-2">{reference}</span>
          
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onAddNote}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <StickyNote className="h-4 w-4 mr-1.5" />
              Nota
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onCopy}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Copy className="h-4 w-4 mr-1.5" />
              Copiar
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onCancel}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
