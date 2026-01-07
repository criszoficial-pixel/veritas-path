import { useState, useEffect } from 'react';
import { Share2, Bookmark, BookmarkCheck, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getDailyVerseByDate } from '@/data/dailyVerses';
import { useBookmarks } from '@/hooks/useBookmarks';
import { toast } from 'sonner';
import { CategorySelectDialog } from '@/components/bookmarks/CategorySelectDialog';
import { 
  getBookmarkCategories, 
  addBookmarkCategory,
  addBookmarkWithCategory,
  updateBookmarkCategory,
  deleteBookmarkCategory,
  isDefaultCategory,
} from '@/services/userDataService';

const topicBackgrounds: Record<string, string> = {
  'confianza': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
  'fe': 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=80',
  'amor': 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
  'fortaleza': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  'paz': 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=800&q=80',
  'esperanza': 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=800&q=80',
  'sabiduria': 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
  'gratitud': 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80',
  'perdon': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
  'servicio': 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80',
  'obediencia': 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=800&q=80',
  'provision': 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&w=800&q=80',
  'gozo': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
  'oracion': 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?auto=format&fit=crop&w=800&q=80',
};

const defaultBackground = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80';

export const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const navigate = useNavigate();
  const dailyVerse = getDailyVerseByDate();
  const backgroundImage = topicBackgrounds[dailyVerse.topic] || defaultBackground;
  const { toggleVerseBookmark, checkBookmarked, refresh } = useBookmarks();

  useEffect(() => {
    setImageLoaded(false);
    const img = new window.Image();
    img.src = backgroundImage;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => {
      const fallbackImg = new window.Image();
      fallbackImg.src = defaultBackground;
      fallbackImg.onload = () => setImageLoaded(true);
    };
  }, [backgroundImage]);

  const isVerseBookmarked = checkBookmarked(
    dailyVerse.bookSlug,
    dailyVerse.chapter,
    dailyVerse.verseNumbers[0]
  );

  const handleBookmark = () => {
    if (isVerseBookmarked) {
      // If already bookmarked, remove it
      toggleVerseBookmark(
        dailyVerse.bookSlug,
        dailyVerse.reference.split(' ')[0],
        dailyVerse.chapter,
        dailyVerse.verseNumbers[0],
        dailyVerse.verse
      );
      toast.info('Marcador eliminado');
    } else {
      // Open category dialog to save
      setShowCategoryDialog(true);
    }
  };

  const handleSaveWithCategory = (categoryId: string) => {
    const categories = getBookmarkCategories();
    const category = categories.find(c => c.id === categoryId);
    
    addBookmarkWithCategory(
      {
        bookSlug: dailyVerse.bookSlug,
        bookName: dailyVerse.reference.split(' ')[0],
        chapter: dailyVerse.chapter,
        verseNumber: dailyVerse.verseNumbers[0],
        verseText: dailyVerse.verse,
        reference: dailyVerse.reference,
      },
      categoryId
    );
    
    refresh();
    toast.success(`Guardado en ${category?.name || 'categoría'}`);
  };

  const handleCreateCategory = (name: string, color: string): string => {
    const newCategory = addBookmarkCategory(name, color);
    return newCategory.id;
  };

  const handleUpdateCategory = (id: string, name: string, color: string) => {
    updateBookmarkCategory(id, { name, color });
  };

  const handleDeleteCategory = (id: string) => {
    deleteBookmarkCategory(id);
  };

  const handleShare = async () => {
    const shareText = `"${dailyVerse.verse}" - ${dailyVerse.reference}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Versiculo del Dia - Shalom',
          text: shareText,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast.success('Versiculo copiado al portapapeles');
    }
  };

  const handleReadMore = () => {
    const bookName = dailyVerse.reference.split(/\s+\d/)[0];
    const verseNumber = dailyVerse.verseNumbers[0];
    navigate(`/leer/${encodeURIComponent(bookName)}/${dailyVerse.chapter}?v=${verseNumber}`);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-card">
      {/* Background with blur loading */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
          imageLoaded ? 'blur-0 scale-100' : 'blur-lg scale-105'
        }`}
        style={{ 
          backgroundImage: `url("${backgroundImage}")`
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      
      {/* Subtle decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-xl" />
      
      {/* Content */}
      <div className="relative z-10 p-6 text-white min-h-[320px] flex flex-col justify-between">
        {/* Verse Section */}
        <div className="space-y-4 animate-fade-in">
          {/* Topic badge */}
          <span className="inline-block text-xs font-medium bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full capitalize">
            {dailyVerse.topic} - Versiculo del Dia
          </span>
          
          {/* Verse */}
          <blockquote className="font-scripture text-xl md:text-2xl leading-relaxed italic">
            "{dailyVerse.verse}"
          </blockquote>
          
          {/* Reference */}
          <p className="text-white/80 font-medium">
            - {dailyVerse.reference}
          </p>
          
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={`h-9 px-3 text-white/80 hover:text-white hover:bg-white/10 ${isVerseBookmarked ? 'text-white bg-white/10' : ''}`}
              onClick={handleBookmark}
            >
              {isVerseBookmarked ? (
                <BookmarkCheck className="h-4 w-4 mr-1.5" />
              ) : (
                <Bookmark className="h-4 w-4 mr-1.5" />
              )}
              {isVerseBookmarked ? 'Guardado' : 'Guardar'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-3 text-white/80 hover:text-white hover:bg-white/10"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-1.5" />
              Compartir
            </Button>
          </div>
          
          <Button
            size="sm"
            className="h-9 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-0"
            onClick={handleReadMore}
          >
            Leer mas
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Category Select Dialog */}
      <CategorySelectDialog
        isOpen={showCategoryDialog}
        onClose={() => setShowCategoryDialog(false)}
        categories={getBookmarkCategories()}
        onSelectCategory={handleSaveWithCategory}
        onCreateCategory={handleCreateCategory}
        onUpdateCategory={handleUpdateCategory}
        onDeleteCategory={handleDeleteCategory}
        isProtected={isDefaultCategory}
      />
    </div>
  );
};