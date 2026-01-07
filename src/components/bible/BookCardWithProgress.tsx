import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, BookOpen, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { BookInfo } from '@/types/bible';
import type { BookProgress } from '@/hooks/useBookProgress';
import type { BookSummary } from '@/types/bookSummary';

interface BookCardWithProgressProps {
  book: BookInfo;
  collectionSlug: string;
  index: number;
  accentColor: string;
  progress: BookProgress;
  summary?: BookSummary;
}

export function BookCardWithProgress({ 
  book, 
  collectionSlug, 
  index, 
  accentColor, 
  progress,
  summary,
}: BookCardWithProgressProps) {
  const getStatusInfo = () => {
    if (progress.isCompleted) {
      return {
        label: 'Completado',
        icon: CheckCircle2,
        colorClass: 'text-green-600 dark:text-green-400',
        bgClass: 'bg-green-100 dark:bg-green-900/30',
      };
    }
    if (progress.isStarted) {
      return {
        label: `${progress.chaptersRead}/${progress.totalChapters} capítulos`,
        icon: BookOpen,
        colorClass: 'text-primary',
        bgClass: 'bg-primary/10',
      };
    }
    return {
      label: 'Aún no has comenzado',
      icon: Clock,
      colorClass: 'text-muted-foreground',
      bgClass: 'bg-muted',
    };
  };
  
  const status = getStatusInfo();
  const StatusIcon = status.icon;
  
  // Determine which chapter to navigate to
  const targetChapter = progress.lastReadChapter 
    ? Math.min(progress.lastReadChapter + 1, book.chapters) 
    : 1;
  
  return (
    <Link
      to={`/leer/${collectionSlug}/${book.slug}/${targetChapter}`}
      className="group flex flex-col p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 opacity-0 animate-fade-in"
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: 'forwards',
      }}
    >
      <div className="flex items-start gap-4">
        {/* Book number indicator */}
        <div 
          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-sm"
          style={{
            background: progress.isCompleted 
              ? 'hsl(142, 71%, 45%, 0.15)' 
              : `hsl(${accentColor} / 0.15)`,
            color: progress.isCompleted 
              ? 'hsl(142, 71%, 45%)' 
              : `hsl(${accentColor})`,
          }}
        >
          {progress.isCompleted ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            book.id
          )}
        </div>
        
        {/* Book info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {book.name}
            </h3>
            <ChevronRight className="w-5 h-5 flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
          
          {/* Chapters count */}
          <p className="text-xs text-muted-foreground mt-0.5">
            {book.chapters} capítulos
          </p>
          
          {/* Status */}
          <div className="flex items-center gap-1.5 mt-2">
            <StatusIcon className={`w-3.5 h-3.5 ${status.colorClass}`} />
            <span className={`text-xs ${status.colorClass}`}>
              {status.label}
            </span>
          </div>
          
          {/* Progress bar (only if started) */}
          {progress.isStarted && (
            <div className="mt-2.5">
              <Progress 
                value={progress.percentage} 
                className="h-1.5 bg-muted"
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
