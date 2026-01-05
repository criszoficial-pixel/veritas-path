import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useBookmarks } from '@/hooks/useBookmarks';
import { toast } from 'sonner';

interface BookmarkButtonProps {
  bookSlug: string;
  bookName: string;
  chapter: number;
}

export const BookmarkButton = ({ bookSlug, bookName, chapter }: BookmarkButtonProps) => {
  const { checkBookmarked, toggleChapterBookmark } = useBookmarks();
  const isMarked = checkBookmarked(bookSlug, chapter);

  const handleToggleBookmark = () => {
    const added = toggleChapterBookmark(bookSlug, bookName, chapter);
    if (added) {
      toast.success('Capítulo guardado en marcadores');
    } else {
      toast.success('Marcador eliminado');
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className={cn('h-9 w-9', isMarked && 'text-primary')}
      onClick={handleToggleBookmark}
    >
      <Bookmark className={cn('h-4 w-4', isMarked && 'fill-primary')} />
    </Button>
  );
};
