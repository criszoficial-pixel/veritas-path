import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Pause, Bookmark, Share2, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { books, getVerses, type Verse } from '@/data/bibleData';
import { cn } from '@/lib/utils';

export const ChapterReader = () => {
  const { bookName, chapter } = useParams();
  const navigate = useNavigate();
  const [verses, setVerses] = useState<Verse[]>([]);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('lg');
  const [isPlaying, setIsPlaying] = useState(false);

  const currentBook = books.find((b) => b.name === bookName);
  const currentChapter = parseInt(chapter || '1');

  useEffect(() => {
    if (bookName && chapter) {
      const chapterVerses = getVerses(bookName, parseInt(chapter));
      if (chapterVerses.length > 0) {
        setVerses(chapterVerses);
      } else {
        // Generate sample verses if not available
        const sampleVerses: Verse[] = Array.from({ length: 10 }, (_, i) => ({
          number: i + 1,
          text: `Este es el versículo ${i + 1} del capítulo ${chapter} de ${bookName}. En una versión completa, aquí aparecería el texto bíblico de la Reina Valera 1960.`,
        }));
        setVerses(sampleVerses);
      }
    }
  }, [bookName, chapter]);

  const goToPrevChapter = () => {
    if (currentChapter > 1) {
      navigate(`/leer/${bookName}/${currentChapter - 1}`);
    }
  };

  const goToNextChapter = () => {
    if (currentBook && currentChapter < currentBook.chapters) {
      navigate(`/leer/${bookName}/${currentChapter + 1}`);
    }
  };

  const fontSizeClasses = {
    sm: 'text-base',
    base: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-lg">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link to="/leer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Libros</span>
          </Link>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Settings2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Chapter Title */}
      <div className="container px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">{bookName}</h1>
          <p className="text-muted-foreground">Capítulo {currentChapter}</p>
        </div>

        {/* Verses */}
        <article className="max-w-2xl mx-auto">
          <div className={cn('font-scripture leading-relaxed space-y-4', fontSizeClasses[fontSize])}>
            {verses.map((verse) => (
              <p key={verse.number} className="text-foreground">
                <sup className="verse-number">{verse.number}</sup>
                {verse.text}
              </p>
            ))}
          </div>
        </article>
      </div>

      {/* Chapter Navigation */}
      <div className="fixed bottom-20 left-0 right-0 z-30">
        <div className="container px-4">
          <div className="flex items-center justify-between bg-card/95 backdrop-blur-lg rounded-2xl p-2 shadow-card border border-border">
            <Button
              variant="ghost"
              onClick={goToPrevChapter}
              disabled={currentChapter <= 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Anterior</span>
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                {currentChapter} / {currentBook?.chapters}
              </span>
            </div>

            <Button
              variant="ghost"
              onClick={goToNextChapter}
              disabled={!currentBook || currentChapter >= currentBook.chapters}
              className="flex items-center gap-2"
            >
              <span className="hidden sm:inline">Siguiente</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
