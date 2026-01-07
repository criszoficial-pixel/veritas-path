import { useParams, Link, useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  BookOpen, 
  Bookmark, 
  BookmarkCheck,
  AlertCircle,
  Heart,
  CloudRain,
  Flame,
  Sun,
  Cloud,
  HeartPulse,
  Briefcase,
  Users,
  HeartHandshake,
  Shield,
  Compass,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Sunrise,
  Quote,
  ChevronRight
} from 'lucide-react';
import { getTopicById } from '@/data/versesByTopic';
import { useBookmarks } from '@/hooks/useBookmarks';
import { cn } from '@/lib/utils';

// Icon map for dynamic rendering
const iconComponents = {
  AlertCircle,
  Heart,
  CloudRain,
  Flame,
  Sun,
  Cloud,
  HeartPulse,
  Briefcase,
  Users,
  HeartHandshake,
  Shield,
  Compass,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Sunrise,
};

const GuiaTema = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { toggleVerseBookmark, checkBookmarked } = useBookmarks();

  const topic = topicId ? getTopicById(topicId) : undefined;

  if (!topic) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-lg">
          <div className="container flex h-14 items-center px-4">
            <Link to="/guia" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Guía</span>
            </Link>
          </div>
        </header>
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

  const IconComponent = iconComponents[topic.lucideIcon as keyof typeof iconComponents] || Heart;
  const featuredVerse = topic.verses[0];
  const otherVerses = topic.verses.slice(1);

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
    const bookName = verse.reference.split(/\s+\d/)[0];
    navigate(`/leer/${encodeURIComponent(bookName)}/${verse.chapter}`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-lg">
        <div className="container flex h-14 items-center px-4">
          <Link to="/guia" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Guía Espiritual</span>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Banner with Image */}
        <section className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={topic.image}
            alt={topic.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
          
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
              <IconComponent className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {topic.name}
            </h1>
            <p className="text-white/80 text-sm max-w-md">
              {topic.verses.length} versículos para meditar
            </p>
          </div>
        </section>

        {/* Extended Description */}
        <section className="container px-4 py-6">
          <div className="bg-card border border-border/50 rounded-xl p-5">
            <p className="text-foreground leading-relaxed">
              {topic.extendedDescription}
            </p>
          </div>
        </section>

        {/* Featured Verse */}
        <section className="container px-4 pb-6">
          <div className="flex items-center gap-2 mb-4">
            <Quote className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Versículo Destacado</h2>
          </div>
          
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative p-6 md:p-8">
              <blockquote className="font-scripture text-xl md:text-2xl text-foreground leading-relaxed mb-6 italic">
                "{featuredVerse.text}"
              </blockquote>
              
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-base font-semibold text-primary">
                  — {featuredVerse.reference}
                </p>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "gap-2",
                      checkBookmarked(featuredVerse.bookSlug, featuredVerse.chapter, featuredVerse.verseNumbers[0]) && "border-primary text-primary"
                    )}
                    onClick={() => handleBookmarkVerse(featuredVerse)}
                  >
                    {checkBookmarked(featuredVerse.bookSlug, featuredVerse.chapter, featuredVerse.verseNumbers[0]) ? (
                      <BookmarkCheck className="h-4 w-4" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                    Guardar
                  </Button>
                  
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-2"
                    onClick={() => navigateToChapter(featuredVerse)}
                  >
                    <BookOpen className="h-4 w-4" />
                    Leer capítulo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Verses */}
        {otherVerses.length > 0 && (
          <section className="container px-4 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">
                Más versículos sobre {topic.name.toLowerCase()}
              </h2>
              <span className="text-sm text-muted-foreground">({otherVerses.length})</span>
            </div>
            
            <div className="space-y-3">
              {otherVerses.map((verse, index) => {
                const isBookmarked = checkBookmarked(verse.bookSlug, verse.chapter, verse.verseNumbers[0]);
                
                return (
                  <div
                    key={index}
                    className="group bg-card border border-border/50 rounded-xl p-4 hover:border-border transition-colors"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <span className="text-sm font-medium text-muted-foreground">{index + 2}</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <blockquote className="font-scripture text-foreground leading-relaxed mb-3 italic">
                          "{verse.text}"
                        </blockquote>
                        
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <p className="text-sm font-medium text-primary">
                            {verse.reference}
                          </p>
                          
                          <div className="flex gap-1">
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
                              size="sm"
                              className="h-8 gap-1 text-muted-foreground hover:text-foreground"
                              onClick={() => navigateToChapter(verse)}
                            >
                              <span className="text-xs">Leer</span>
                              <ChevronRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="container px-4 pb-8">
          <div className="bg-secondary/30 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              ¿Necesitas más orientación?
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Explora otros temas que pueden ayudarte en tu camino espiritual
            </p>
            <Button
              variant="outline"
              onClick={() => navigate('/guia')}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Explorar más temas
            </Button>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default GuiaTema;
