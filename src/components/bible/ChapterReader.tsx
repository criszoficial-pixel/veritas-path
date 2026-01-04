import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Bookmark, Settings2, Volume2, VolumeX, Loader2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getChapterAudioData, hasAudioData } from '@/data/audioSyncData';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useAudioSync } from '@/hooks/useAudioSync';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { SyncedVerse } from './SyncedVerse';
import { AudioPlayerBar } from '@/components/audio/AudioPlayerBar';
import { cn } from '@/lib/utils';
import { fetchBibleMetadata, fetchChapter, findBookByName, bookNameToSlug } from '@/services/bibleDataService';
import { trackChapterRead } from '@/services/userDataService';
import type { ChapterAudioData, VerseSyncData } from '@/types/audio';
import type { BibleMetadata, ChapterData, VerseData, BookInfo } from '@/types/bible';

export const ChapterReader = () => {
  const { bookName, chapter } = useParams();
  const navigate = useNavigate();
  const { languageCode } = useLanguage();
  const { t } = useTranslation();
  
  const [metadata, setMetadata] = useState<BibleMetadata | null>(null);
  const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  const [currentBook, setCurrentBook] = useState<BookInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chapterNotAvailable, setChapterNotAvailable] = useState(false);
  
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('lg');
  const [audioData, setAudioData] = useState<ChapterAudioData | null>(null);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const verseRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const currentChapter = parseInt(chapter || '1');

  const audioPlayer = useAudioPlayer({
    onEnded: () => {
      if (currentBook && currentChapter < currentBook.chapters) {
        navigate(`/leer/${bookName}/${currentChapter + 1}`);
      }
    },
  });

  const { activePosition, seekToWord } = useAudioSync(audioData, audioPlayer.currentTime);

  // Load metadata and chapter data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setChapterNotAvailable(false);
      
      // Load metadata first
      const meta = await fetchBibleMetadata(languageCode);
      setMetadata(meta);
      
      if (meta && bookName) {
        // Find the book in metadata
        const book = findBookByName(meta, bookName);
        setCurrentBook(book || null);
        
        if (book) {
          // Load the chapter using the book's slug
          const chapter = await fetchChapter(languageCode, book.slug, currentChapter);
          if (chapter) {
            setChapterData(chapter);
            setChapterNotAvailable(false);
          } else {
            setChapterData(null);
            setChapterNotAvailable(true);
          }
        }
      }
      
      // Load audio data (from existing system)
      if (bookName) {
        const audio = getChapterAudioData(bookName, currentChapter, languageCode);
        setAudioData(audio);
        if (audio) {
          audioPlayer.loadAudio(audio.audioUrl);
        }
      }
      
      setIsLoading(false);
    };
    
    loadData();
  }, [bookName, chapter, languageCode, currentChapter]);

  // Track chapter reading when chapter data loads
  useEffect(() => {
    if (chapterData && currentBook) {
      const timer = setTimeout(() => {
        trackChapterRead(currentBook.slug, chapterData.book, currentChapter);
      }, 5000); // Track after 5 seconds of reading
      return () => clearTimeout(timer);
    }
  }, [chapterData, currentBook, currentChapter]);

  useEffect(() => {
    if (activePosition.verseNumber && audioPlayer.isPlaying) {
      const verseElement = verseRefs.current.get(activePosition.verseNumber);
      if (verseElement) {
        verseElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activePosition.verseNumber, audioPlayer.isPlaying]);

  const goToPrevChapter = () => {
    audioPlayer.stop();
    if (currentChapter > 1) navigate(`/leer/${bookName}/${currentChapter - 1}`);
  };

  const goToNextChapter = () => {
    audioPlayer.stop();
    if (currentBook && currentChapter < currentBook.chapters) {
      navigate(`/leer/${bookName}/${currentChapter + 1}`);
    }
  };

  const handleWordClick = useCallback(
    (verseNumber: number, wordIndex: number) => {
      if (audioData) {
        seekToWord(verseNumber, wordIndex, audioPlayer.seek);
        if (!audioPlayer.isPlaying) audioPlayer.play();
        setShowAudioPlayer(true);
      }
    },
    [audioData, seekToWord, audioPlayer]
  );

  const toggleAudioPlayer = () => {
    if (showAudioPlayer && audioPlayer.isPlaying) audioPlayer.pause();
    setShowAudioPlayer(!showAudioPlayer);
  };

  const fontSizeClasses = { sm: 'text-base', base: 'text-lg', lg: 'text-xl', xl: 'text-2xl' };

  const getSyncedVerseData = (verse: VerseData): VerseSyncData | null => {
    if (!audioData) return null;
    return audioData.verses.find((v) => v.number === verse.number) || null;
  };

  const hasAudio = hasAudioData(bookName || '', currentChapter, languageCode);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Chapter not available state
  if (chapterNotAvailable || !chapterData) {
    return (
      <div className="min-h-screen bg-background pb-48">
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-lg">
          <div className="container flex h-14 items-center justify-between px-4">
            <Link to="/leer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm font-medium">{t('nav.read')}</span>
            </Link>
          </div>
        </header>
        
        <div className="container px-4 py-12">
          <div className="max-w-md mx-auto text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Próximamente</h2>
            <p className="text-muted-foreground">
              Este capítulo estará disponible próximamente. Estamos trabajando para agregar más contenido.
            </p>
            <Button variant="outline" onClick={() => navigate('/leer')}>
              Volver a libros
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-48">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-lg">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link to="/leer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm font-medium">{t('nav.read')}</span>
          </Link>
          <div className="flex items-center gap-1">
            {hasAudio && (
              <Button variant="ghost" size="icon" className={cn('h-9 w-9', showAudioPlayer && 'text-primary')} onClick={toggleAudioPlayer}>
                {showAudioPlayer ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-9 w-9"><Bookmark className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-9 w-9"><Settings2 className="h-4 w-4" /></Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">{chapterData.book}</h1>
          <p className="text-muted-foreground">{t('reader.chapter')} {currentChapter}</p>
          {metadata && (
            <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
              {metadata.versionShort}
            </span>
          )}
        </div>

        <article className="max-w-2xl mx-auto">
          <div className={cn('font-scripture leading-relaxed space-y-4', fontSizeClasses[fontSize])}>
            {chapterData.verses.map((verse) => {
              const syncedData = getSyncedVerseData(verse);
              const isActiveVerse = activePosition.verseNumber === verse.number;
              const activeWordIdx = isActiveVerse ? activePosition.wordIndex : null;

              return (
                <div key={verse.number} ref={(el) => { if (el) verseRefs.current.set(verse.number, el); }}>
                  {syncedData ? (
                    <SyncedVerse verse={syncedData} activeWordIndex={activeWordIdx} isActiveVerse={isActiveVerse && audioPlayer.isPlaying} onWordClick={(wordIdx) => handleWordClick(verse.number, wordIdx)} />
                  ) : (
                    <p className="text-foreground"><sup className="verse-number">{verse.number}</sup> {verse.text}</p>
                  )}
                </div>
              );
            })}
          </div>
        </article>
      </div>

      {hasAudio && showAudioPlayer && (
        <div className="fixed bottom-36 left-0 right-0 z-30 animate-fade-in">
          <div className="container px-4">
            <AudioPlayerBar isPlaying={audioPlayer.isPlaying} isLoading={audioPlayer.isLoading} currentTime={audioPlayer.currentTime} duration={audioPlayer.duration} playbackRate={audioPlayer.playbackRate} onTogglePlay={audioPlayer.togglePlay} onSeek={audioPlayer.seek} onSkip={audioPlayer.skip} onSpeedChange={audioPlayer.setSpeed} onStop={audioPlayer.stop} />
          </div>
        </div>
      )}

      <div className="fixed bottom-20 left-0 right-0 z-30">
        <div className="container px-4">
          <div className="flex items-center justify-between bg-card/95 backdrop-blur-lg rounded-2xl p-2 shadow-card border border-border">
            <Button variant="ghost" onClick={goToPrevChapter} disabled={currentChapter <= 1} className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" /><span className="hidden sm:inline">{t('reader.previous')}</span>
            </Button>
            <span className="text-sm font-medium text-muted-foreground">{currentChapter} / {currentBook?.chapters}</span>
            <Button variant="ghost" onClick={goToNextChapter} disabled={!currentBook || currentChapter >= currentBook.chapters} className="flex items-center gap-2">
              <span className="hidden sm:inline">{t('reader.next')}</span><ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
