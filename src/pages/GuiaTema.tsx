import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { ChevronLeft, BookOpen, Bookmark, BookmarkCheck } from 'lucide-react';
import { getTopicById } from '@/data/versesByTopic';
import { useBookmarks } from '@/hooks/useBookmarks';
import { cn } from '@/lib/utils';

const GuiaTema = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { toggleVerseBookmark, checkBookmarked } = useBookmarks();

  const topic = topicId ? getTopicById(topicId) : undefined;

  if (!topic) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <Header title="Guía Espiritual" />
        <div className="container px-4 py-12 text-center">
          <p className="text-muted-foreground">Tema no encontrado</p>
          <Button variant="outline" onClick={() => navigate('/guia')} className="mt-4">
            Volver a Guía
          </Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  const handleBookmarkVerse = (verse: typeof topic.verses[0]) => {
    toggleVerseBookmark(
      verse.bookSlug,
      verse.reference.split(' ')[0],
      verse.chapter,
      verse.verseNumbers[0],
      verse.text
    );
  };

  const navigateToChapter = (verse: typeof topic.verses[0]) => {
    // Convert bookSlug to URL format (e.g., "1-pedro" -> "1 Pedro")
    const bookName = verse.reference.split(/\s+\d/)[0];
    navigate(`/leer/${encodeURIComponent(bookName)}/${verse.chapter}`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-lg">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link to="/guia" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Guía</span>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6">
        {/* Topic Header */}
        <section className="text-center py-4">
          <span className="text-4xl mb-4 block">{topic.icon}</span>
          <h1 className="text-2xl font-bold text-foreground mb-2">{topic.name}</h1>
          <p className="text-muted-foreground">{topic.description}</p>
          <p className="text-sm text-primary mt-2">{topic.verses.length} versículos</p>
        </section>

        {/* Verses List */}
        <section className="space-y-4">
          {topic.verses.map((verse, index) => {
            const isBookmarked = checkBookmarked(verse.bookSlug, verse.chapter, verse.verseNumbers[0]);
            
            return (
              <div
                key={index}
                className="rounded-xl bg-card border border-border/50 overflow-hidden"
              >
                <div className="p-5">
                  <blockquote className="font-scripture text-lg text-foreground leading-relaxed mb-4 italic">
                    "{verse.text}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary">
                      — {verse.reference}
                    </p>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-8 w-8",
                          isBookmarked && "text-primary"
                        )}
                        onClick={() => handleBookmarkVerse(verse)}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="h-4 w-4" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => navigateToChapter(verse)}
                      >
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => navigateToChapter(verse)}
                  className="w-full px-5 py-3 bg-secondary/50 text-sm text-muted-foreground hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  Leer capítulo completo
                </button>
              </div>
            );
          })}
        </section>

        {/* Back Button */}
        <div className="pt-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('/guia')}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Explorar más temas
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default GuiaTema;
