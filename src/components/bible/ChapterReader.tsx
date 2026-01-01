import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Bookmark, Settings2, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { books, getVerses, type Verse } from '@/data/bibleData';
import { getChapterAudioData, hasAudioData } from '@/data/audioSyncData';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useAudioSync } from '@/hooks/useAudioSync';
import { SyncedVerse } from './SyncedVerse';
import { AudioPlayerBar } from '@/components/audio/AudioPlayerBar';
import { cn } from '@/lib/utils';
import type { ChapterAudioData, VerseSyncData } from '@/types/audio';

export const ChapterReader = () => {
  const { bookName, chapter } = useParams();
  const navigate = useNavigate();
  const [verses, setVerses] = useState<Verse[]>([]);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('lg');
  const [audioData, setAudioData] = useState<ChapterAudioData | null>(null);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const verseRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const currentBook = books.find((b) => b.name === bookName);
  const currentChapter = parseInt(chapter || '1');

  // Audio player hook
  const audioPlayer = useAudioPlayer({
    onEnded: () => {
      // Auto-advance to next chapter
      if (currentBook && currentChapter < currentBook.chapters) {
        navigate(`/leer/${bookName}/${currentChapter + 1}`);
      }
    },
  });

  // Audio sync hook
  const { activePosition, seekToWord } = useAudioSync(audioData, audioPlayer.currentTime);

  // Load verses and audio data
  useEffect(() => {
    if (bookName && chapter) {
      const chapterVerses = getVerses(bookName, parseInt(chapter));
      if (chapterVerses.length > 0) {
        setVerses(chapterVerses);
      } else {
        const sampleVerses: Verse[] = Array.from({ length: 10 }, (_, i) => ({
          number: i + 1,
          text: `Este es el versículo ${i + 1} del capítulo ${chapter} de ${bookName}. En una versión completa, aquí aparecería el texto bíblico de la Reina Valera 1960.`,
        }));
        setVerses(sampleVerses);
      }

      // Load audio sync data
      const audio = getChapterAudioData(bookName, parseInt(chapter));
      setAudioData(audio);
      
      if (audio) {
        audioPlayer.loadAudio(audio.audioUrl);
      }
    }
  }, [bookName, chapter]);

  // Auto-scroll to active verse
  useEffect(() => {
    if (activePosition.verseNumber && audioPlayer.isPlaying) {
      const verseElement = verseRefs.current.get(activePosition.verseNumber);
      if (verseElement) {
        verseElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [activePosition.verseNumber, audioPlayer.isPlaying]);

  const goToPrevChapter = () => {
    audioPlayer.stop();
    if (currentChapter > 1) {
      navigate(`/leer/${bookName}/${currentChapter - 1}`);
    }
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
        if (!audioPlayer.isPlaying) {
          audioPlayer.play();
        }
        setShowAudioPlayer(true);
      }
    },
    [audioData, seekToWord, audioPlayer]
  );

  const toggleAudioPlayer = () => {
    if (showAudioPlayer && audioPlayer.isPlaying) {
      audioPlayer.pause();
    }
    setShowAudioPlayer(!showAudioPlayer);
  };

  const fontSizeClasses = {
    sm: 'text-base',
    base: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  // Convert regular verses to sync format for display
  const getSyncedVerseData = (verse: Verse): VerseSyncData | null => {
    if (!audioData) return null;
    return audioData.verses.find((v) => v.number === verse.number) || null;
  };

  const hasAudio = hasAudioData(bookName || '', currentChapter);

  return (
    <div className="min-h-screen bg-background pb-48">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-lg">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link to="/leer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Libros</span>
          </Link>
          
          <div className="flex items-center gap-1">
            {hasAudio && (
              <Button
                variant="ghost"
                size="icon"
                className={cn('h-9 w-9', showAudioPlayer && 'text-primary')}
                onClick={toggleAudioPlayer}
              >
                {showAudioPlayer ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            )}
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
            {verses.map((verse) => {
              const syncedData = getSyncedVerseData(verse);
              const isActiveVerse = activePosition.verseNumber === verse.number;
              const activeWordIdx = isActiveVerse ? activePosition.wordIndex : null;

              return (
                <div
                  key={verse.number}
                  ref={(el) => {
                    if (el) verseRefs.current.set(verse.number, el);
                  }}
                >
                  {syncedData ? (
                    <SyncedVerse
                      verse={syncedData}
                      activeWordIndex={activeWordIdx}
                      isActiveVerse={isActiveVerse && audioPlayer.isPlaying}
                      onWordClick={(wordIdx) => handleWordClick(verse.number, wordIdx)}
                    />
                  ) : (
                    <p className="text-foreground">
                      <sup className="verse-number">{verse.number}</sup>
                      {verse.text}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </article>
      </div>

      {/* Audio Player */}
      {hasAudio && showAudioPlayer && (
        <div className="fixed bottom-36 left-0 right-0 z-30 animate-fade-in">
          <div className="container px-4">
            <AudioPlayerBar
              isPlaying={audioPlayer.isPlaying}
              isLoading={audioPlayer.isLoading}
              currentTime={audioPlayer.currentTime}
              duration={audioPlayer.duration}
              playbackRate={audioPlayer.playbackRate}
              onTogglePlay={audioPlayer.togglePlay}
              onSeek={audioPlayer.seek}
              onSkip={audioPlayer.skip}
              onSpeedChange={audioPlayer.setSpeed}
              onStop={audioPlayer.stop}
            />
          </div>
        </div>
      )}

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
