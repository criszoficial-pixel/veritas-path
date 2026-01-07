import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Bookmark, BookOpen, Trash2, Image, Tag } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { cn } from '@/lib/utils';
import { ShareVerseDialog } from '@/components/share/ShareVerseDialog';

interface SelectedVerse {
  text: string;
  reference: string;
}

const Marcadores = () => {
  const navigate = useNavigate();
  const { bookmarks, categories, remove, getByCategory } = useBookmarks();
  const [selectedVerse, setSelectedVerse] = useState<SelectedVerse | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get category info helper
  const getCategoryById = (categoryId: string) => 
    categories.find(c => c.id === categoryId);

  // Filter bookmarks based on selected category
  const filteredBookmarks = useMemo(() => {
    if (selectedCategory === null) return bookmarks;
    if (selectedCategory === 'uncategorized') return bookmarks.filter(b => !b.categoryId);
    return bookmarks.filter(b => b.categoryId === selectedCategory);
  }, [bookmarks, selectedCategory]);

  // Count bookmarks without category
  const uncategorizedCount = bookmarks.filter(b => !b.categoryId).length;

  const handleNavigate = (bookmark: typeof bookmarks[0]) => {
    navigate(`/leer/${encodeURIComponent(bookmark.bookName)}/${bookmark.chapter}`);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  const handleShareAsImage = (bookmark: typeof bookmarks[0]) => {
    if (bookmark.verseText) {
      setSelectedVerse({
        text: bookmark.verseText,
        reference: bookmark.reference,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-lg">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link to="/perfil" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Perfil</span>
          </Link>
          <h1 className="text-lg font-semibold text-foreground">Mis Marcadores</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="container px-4 py-6 space-y-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
              selectedCategory === null
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            Todos ({bookmarks.length})
          </button>
          
          {categories.map(cat => {
            const count = getByCategory(cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5",
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: cat.color }} 
                />
                {cat.name} ({count})
              </button>
            );
          })}
          
          {uncategorizedCount > 0 && (
            <button
              onClick={() => setSelectedCategory('uncategorized')}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                selectedCategory === 'uncategorized'
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              Sin categoría ({uncategorizedCount})
            </button>
          )}
        </div>

        {filteredBookmarks.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Bookmark className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              {selectedCategory ? 'Sin marcadores en esta categoría' : 'Sin marcadores'}
            </h2>
            <p className="text-muted-foreground max-w-xs mx-auto">
              {selectedCategory 
                ? 'Aún no tienes marcadores guardados en esta categoría.'
                : 'Guarda tus versículos y capítulos favoritos para acceder a ellos rápidamente.'
              }
            </p>
            {!selectedCategory && (
              <Button onClick={() => navigate('/leer')} className="mt-4">
                <BookOpen className="h-4 w-4 mr-2" />
                Explorar la Biblia
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {filteredBookmarks.length} {filteredBookmarks.length === 1 ? 'marcador' : 'marcadores'} 
              {selectedCategory && selectedCategory !== 'uncategorized' ? ' en esta categoría' : ' guardados'}
            </p>

            {filteredBookmarks.map((bookmark) => {
              const category = bookmark.categoryId ? getCategoryById(bookmark.categoryId) : null;
              
              return (
                <div
                  key={bookmark.id}
                  className="rounded-xl bg-card border border-border/50 overflow-hidden"
                >
                  <button
                    onClick={() => handleNavigate(bookmark)}
                    className="w-full p-4 text-left hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Bookmark className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-foreground">
                            {bookmark.reference}
                          </h3>
                          {category && (
                            <span
                              className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: `${category.color}20`,
                                color: category.color,
                              }}
                            >
                              <Tag className="h-3 w-3" />
                              {category.name}
                            </span>
                          )}
                        </div>
                        {bookmark.verseText && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2 italic">
                            "{bookmark.verseText}"
                          </p>
                        )}
                        {bookmark.note && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                            📝 {bookmark.note}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatDate(bookmark.timestamp)}
                        </p>
                      </div>
                    </div>
                  </button>

                  <div className="flex border-t border-border/50">
                    <button
                      onClick={() => handleNavigate(bookmark)}
                      className="flex-1 px-4 py-3 text-sm text-muted-foreground hover:bg-secondary/50 transition-colors flex items-center justify-center gap-2"
                    >
                      <BookOpen className="h-4 w-4" />
                      Leer
                    </button>
                    <div className="w-px bg-border/50" />
                    {bookmark.verseText && (
                      <>
                        <button
                          onClick={() => handleShareAsImage(bookmark)}
                          className="flex-1 px-4 py-3 text-sm text-muted-foreground hover:bg-secondary/50 transition-colors flex items-center justify-center gap-2"
                        >
                          <Image className="h-4 w-4" />
                          Imagen
                        </button>
                        <div className="w-px bg-border/50" />
                      </>
                    )}
                    <button
                      onClick={() => remove(bookmark.id)}
                      className="flex-1 px-4 py-3 text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />

      {selectedVerse && (
        <ShareVerseDialog
          isOpen={!!selectedVerse}
          onClose={() => setSelectedVerse(null)}
          verse={selectedVerse.text}
          reference={selectedVerse.reference}
        />
      )}
    </div>
  );
};

export default Marcadores;
