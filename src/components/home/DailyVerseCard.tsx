import { useState } from 'react';
import { Share2, Bookmark, BookmarkCheck, BookOpen, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getDailyVerseByDate } from '@/data/dailyVerses';
import { useBookmarks } from '@/hooks/useBookmarks';
import { toast } from 'sonner';
import { ShareVerseDialog } from '@/components/share/ShareVerseDialog';

export const DailyVerseCard = () => {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dailyVerse = getDailyVerseByDate();
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
    <div className="relative overflow-hidden rounded-2xl divine-gradient p-6 text-primary-foreground shadow-card">
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

        <p className="text-sm font-medium text-primary-foreground/90 mb-4">
          — {dailyVerse.reference}
        </p>

        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm mb-4">
          <p className="text-sm leading-relaxed text-primary-foreground/90">
            <span className="font-semibold">Reflexión: </span>
            {dailyVerse.reflection}
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={handleReadMore}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Leer capítulo completo
        </Button>
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
