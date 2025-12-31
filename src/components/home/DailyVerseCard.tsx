import { Share2, Bookmark, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getDailyVerse } from '@/data/bibleData';

export const DailyVerseCard = () => {
  const dailyVerse = getDailyVerse();

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
            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10">
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10">
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

        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-sm leading-relaxed text-primary-foreground/90">
            <span className="font-semibold">Reflexión: </span>
            {dailyVerse.reflection}
          </p>
        </div>
      </div>
    </div>
  );
};
