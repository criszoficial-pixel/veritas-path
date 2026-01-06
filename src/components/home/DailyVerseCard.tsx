import { useState } from 'react';
import { Share2, Bookmark, BookmarkCheck, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getDailyVerseByDate } from '@/data/dailyVerses';
import { useBookmarks } from '@/hooks/useBookmarks';
import { toast } from 'sonner';
import { ShareVerseDialog } from '@/components/share/ShareVerseDialog';

const topicBackgrounds: Record<string, string> = {
  'confianza': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
  'fe': 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8',
  'amor': 'https://images.unsplash.com/photo-1518173946687-a4c036bc2c0c',
  'fortaleza': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
  'paz': 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5',
  'esperanza': 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1',
  'sabiduria': 'https://images.unsplash.com/photo-1448375240586-882707db888b',
  'gratitud': 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
  'perdon': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
  'servicio': 'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
  'obediencia': 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5',
  'provision': 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e',
  'gozo': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
  'oracion': 'https://images.unsplash.com/photo-1507400492013-162706c8c05e',
};

const defaultBackground = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4';

export const DailyVerseCard = () => {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dailyVerse = getDailyVerseByDate();
  const backgroundImage = topicBackgrounds[dailyVerse.topic] || defaultBackground;
  const { toggleVerseBookmark, checkBookmarked } = useBookmarks();

  const isVerseBookmarked = checkBookmarked(
    dailyVerse.bookSlug,
    dailyVerse.chapter,
    dailyVerse.verseNumbers[0]
  );

  const handleBookmark = () => {
    const wasAdded = toggleVerseBookmark(
      dailyVerse.bookSlug,
      dailyVerse.reference.split(' ')[0],
      dailyVerse.chapter,
      dailyVerse.verseNumbers[0],
      dailyVerse.verse
    );
    
    if (wasAdded) {
      toast.success('Versículo guardado');
    } else {
      toast.info('Marcador eliminado');
    }
  };

  const handleShare = async () => {
    const shareText = `"${dailyVerse.verse}" — ${dailyVerse.reference}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Versículo del Día - Shalom',
          text: shareText,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast.success('Versículo copiado al portapapeles');
    }
  };

  const handleReadMore = () => {
    const bookName = dailyVerse.reference.split(/\s+\d/)[0];
    const verseNumber = dailyVerse.verseNumbers[0];
    navigate(`/leer/${encodeURIComponent(bookName)}/${dailyVerse.chapter}?v=${verseNumber}`);
  };

  return (
    <div 
      className="relative overflow-hidden rounded-2xl p-6 text-white shadow-card bg-cover bg-center"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url(${backgroundImage}?w=800&q=80)`
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
            ✨ Versículo del Día
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 ${isVerseBookmarked ? 'text-primary-foreground' : ''}`}
              onClick={handleBookmark}
            >
              {isVerseBookmarked ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
              onClick={() => setShareDialogOpen(true)}
              title="Compartir como imagen"
            >
              <Image className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
              onClick={handleShare}
              title="Compartir texto"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <blockquote className="font-scripture text-xl md:text-2xl leading-relaxed mb-4 italic">
          "{dailyVerse.verse}"
        </blockquote>

        <button 
          onClick={handleReadMore}
          className="text-sm font-medium text-primary-foreground/90 mb-4 hover:underline cursor-pointer transition-all text-left"
        >
          — {dailyVerse.reference}
        </button>

      </div>

      <ShareVerseDialog
        isOpen={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        verse={dailyVerse.verse}
        reference={dailyVerse.reference}
      />
    </div>
  );
};
