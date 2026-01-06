import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Loader2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getChapterAudioData, hasAudioData } from '@/data/audioSyncData';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useAudioSync } from '@/hooks/useAudioSync';
import { useVerseNotes } from '@/hooks/useVerseNotes';
import { useTranslation } from '@/hooks/useTranslation';
import { SyncedVerse } from './SyncedVerse';
import { AudioPlayerBar } from '@/components/audio/AudioPlayerBar';
import { BookmarkButton } from './BookmarkButton';
import { ReaderSettings } from './ReaderSettings';
import { NoteEditor } from './NoteEditor';
import { VerseSelectionBar } from './VerseSelectionBar';
import { QuizSuggestion } from '@/components/quiz/QuizSuggestion';
import { cn } from '@/lib/utils';
import { fetchBibleMetadata, fetchChapter, findBookByName, findBookBySlug, bookNameToSlug } from '@/services/bibleDataService';
import { trackChapterRead, getPreferences, updatePreferences } from '@/services/userDataService';
import { toast } from 'sonner';
import type { ChapterAudioData, VerseSyncData } from '@/types/audio';
import type { BibleMetadata, ChapterData, VerseData, BookInfo } from '@/types/bible';

interface ChapterReaderProps {
  collectionSlug?: string;
}

export const ChapterReader = ({ collectionSlug: propCollectionSlug }: ChapterReaderProps) => {
  const { collectionSlug: urlCollectionSlug, bookName, chapter } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Use prop collectionSlug if provided, otherwise use URL param, or default to 'santa-biblia'
  const collectionSlug = propCollectionSlug || urlCollectionSlug || 'santa-biblia';
  const { t } = useTranslation();
  
  const [metadata, setMetadata] = useState<BibleMetadata | null>(null);
  const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  const [currentBook, setCurrentBook] = useState<BookInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chapterNotAvailable, setChapterNotAvailable] = useState(false);
  
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>(() => getPreferences().fontSize);
  const [audioData, setAudioData] = useState<ChapterAudioData | null>(null);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const verseRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null);
  
  // Verse selection state
  const [selectionStart, setSelectionStart] = useState<number | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<number | null>(null);
  
  // Note editor state
  const [noteEditorOpen, setNoteEditorOpen] = useState(false);

  const currentChapter = parseInt(chapter || '1');
  const targetVerse = searchParams.get('v');

  const audioPlayer = useAudioPlayer({
    onEnded: () => {
      if (currentBook && currentChapter < currentBook.chapters) {
        navigate(`/leer/${collectionSlug}/${bookName}/${currentChapter + 1}`);
      }
    },
  });

  const { activePosition, seekToWord } = useAudioSync(audioData, audioPlayer.currentTime);
  
  // Verse notes hook
  const { hasNote, getNote, getNoteForRange, saveNote, removeNote } = useVerseNotes(
    currentBook?.slug || '',
    currentChapter
  );
  
  // Get selected verse range
  const selectedRange = selectionStart !== null ? {
    start: Math.min(selectionStart, selectionEnd ?? selectionStart),
    end: Math.max(selectionStart, selectionEnd ?? selectionStart),
  } : null;
  
  // Check if a verse is in the selected range
  const isVerseSelected = (verseNumber: number): boolean => {
    if (!selectedRange) return false;
    return verseNumber >= selectedRange.start && verseNumber <= selectedRange.end;
  };
  
  // Handle verse number click for selection
  const handleVerseClick = (verseNumber: number) => {
    if (selectionStart === null) {
      // Start selection
      setSelectionStart(verseNumber);
      setSelectionEnd(null);
    } else if (selectionEnd === null) {
      // Complete selection
      setSelectionEnd(verseNumber);
    } else {
      // Start new selection
      setSelectionStart(verseNumber);
      setSelectionEnd(null);
    }
  };
  
  // Clear selection
  const clearSelection = () => {
    setSelectionStart(null);
    setSelectionEnd(null);
  };
  
  // Get text for selected verses
  const getSelectedVersesText = (): string => {
    if (!selectedRange || !chapterData) return '';
    return chapterData.verses
      .filter(v => v.number >= selectedRange.start && v.number <= selectedRange.end)
      .map(v => `${v.number} ${v.text}`)
      .join(' ');
  };
  
  // Handle opening note editor for selection
  const handleOpenNoteEditor = () => {
    if (!selectedRange) return;
    setNoteEditorOpen(true);
  };
  
  // Handle saving note
  const handleSaveNote = (noteContent: string) => {
    if (selectedRange && chapterData && currentBook) {
      const verseText = getSelectedVersesText();
      saveNote(selectedRange.start, selectedRange.end, noteContent, chapterData.book, verseText);
      clearSelection();
    }
  };
  
  // Handle deleting note
  const handleDeleteNote = () => {
    if (selectedRange) {
      const existingNote = getNoteForRange(selectedRange.start, selectedRange.end);
      if (existingNote) {
        removeNote(existingNote.id);
      }
      clearSelection();
    }
  };
  
  // Handle copy
  const handleCopy = async () => {
    if (!selectedRange || !chapterData) return;
    const text = getSelectedVersesText();
    const reference = selectedRange.start === selectedRange.end 
      ? `${chapterData.book} ${currentChapter}:${selectedRange.start}`
      : `${chapterData.book} ${currentChapter}:${selectedRange.start}-${selectedRange.end}`;
    
    try {
      await navigator.clipboard.writeText(`${text}\n— ${reference}`);
      toast.success('Copiado al portapapeles');
      clearSelection();
    } catch (err) {
      toast.error('Error al copiar');
    }
  };

  // Load metadata and chapter data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setChapterNotAvailable(false);
      clearSelection();
      
      // Load Spanish metadata
      const meta = await fetchBibleMetadata();
      setMetadata(meta);
      
      if (meta && bookName) {
        // Find by slug or display name
        let book = findBookBySlug(meta, bookName) || findBookByName(meta, bookName);
        
        // If not found, try converting the URL name to a slug
        if (!book) {
          const slugCandidate = bookNameToSlug(bookName);
          book = findBookBySlug(meta, slugCandidate);
        }
        
        if (book) {
          // Load the chapter
          const chapterResult = await fetchChapter(book.slug, currentChapter);
          if (chapterResult) {
            setChapterData(chapterResult);
            setCurrentBook(book);
            setChapterNotAvailable(false);
          } else {
            setChapterData(null);
            setCurrentBook(book);
            setChapterNotAvailable(true);
          }
        } else {
          setChapterData(null);
          setCurrentBook(null);
          setChapterNotAvailable(true);
        }
      }
      
      // Load audio data
      if (bookName) {
        const audio = getChapterAudioData(bookName, currentChapter, 'es');
        setAudioData(audio);
        if (audio) {
          audioPlayer.loadAudio(audio.audioUrl);
        }
      }
      
      setIsLoading(false);
    };
    
    loadData();
  }, [bookName, chapter, currentChapter]);

  // Track chapter reading when chapter data loads
  useEffect(() => {
    if (chapterData && currentBook) {
      const timer = setTimeout(() => {
        trackChapterRead(currentBook.slug, chapterData.book, currentChapter);
      }, 5000); // Track after 5 seconds of reading
      return () => clearTimeout(timer);
    }
  }, [chapterData, currentBook, currentChapter]);

  // Scroll to target verse from URL parameter
  useEffect(() => {
    if (targetVerse && chapterData && !isLoading) {
      const verseNum = parseInt(targetVerse);
      const timer = setTimeout(() => {
        const verseElement = verseRefs.current.get(verseNum);
        if (verseElement) {
          verseElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHighlightedVerse(verseNum);
          // Remove highlight after 3 seconds
          setTimeout(() => setHighlightedVerse(null), 3000);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [targetVerse, chapterData, isLoading]);

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
    if (currentChapter > 1) navigate(`/leer/${collectionSlug}/${bookName}/${currentChapter - 1}`);
  };

  const goToNextChapter = () => {
    audioPlayer.stop();
    if (currentBook && currentChapter < currentBook.chapters) {
      navigate(`/leer/${collectionSlug}/${bookName}/${currentChapter + 1}`);
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

  const hasAudio = hasAudioData(bookName || '', currentChapter, 'es');

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
          <Link to={collectionSlug ? `/leer/${collectionSlug}` : '/leer'} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
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
            <Link to={collectionSlug ? `/leer/${collectionSlug}` : '/leer'} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm font-medium">{t('nav.read')}</span>
            </Link>
          <div className="flex items-center gap-1">
            {hasAudio && (
              <Button variant="ghost" size="icon" className={cn('h-9 w-9', showAudioPlayer && 'text-primary')} onClick={toggleAudioPlayer}>
                {showAudioPlayer ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            )}
            {currentBook && chapterData && (
              <BookmarkButton 
                bookSlug={currentBook.slug} 
                bookName={chapterData.book} 
                chapter={currentChapter} 
              />
            )}
            <ReaderSettings 
              fontSize={fontSize} 
              onFontSizeChange={(size) => {
                setFontSize(size);
                updatePreferences({ fontSize: size });
              }} 
            />
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
              const isSelected = isVerseSelected(verse.number);
              const verseHasNote = hasNote(verse.number);

              return (
                <div 
                  key={verse.number} 
                  ref={(el) => { if (el) verseRefs.current.set(verse.number, el); }} 
                  className={cn(
                    "transition-all duration-300 rounded-lg",
                    highlightedVerse === verse.number && "bg-primary/15 px-3 py-2 -mx-3 ring-2 ring-primary/30",
                    isSelected && "bg-primary/10 px-3 py-2 -mx-3",
                    verseHasNote && !isSelected && "border-l-2 border-primary/40 pl-3"
                  )}
                >
                  {syncedData ? (
                    <div className="flex-1">
                      <SyncedVerse verse={syncedData} activeWordIndex={activeWordIdx} isActiveVerse={isActiveVerse && audioPlayer.isPlaying} onWordClick={(wordIdx) => handleWordClick(verse.number, wordIdx)} />
                    </div>
                  ) : (
                    <p className="text-foreground">
                      <span 
                        className={cn(
                          "verse-number cursor-pointer transition-colors",
                          isSelected ? "text-primary" : "hover:text-primary",
                          verseHasNote && "text-primary"
                        )}
                        onClick={() => handleVerseClick(verse.number)}
                      >
                        {verse.number}
                      </span>
                      {verse.text}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Quiz suggestion only at the end of the book */}
          {currentBook && chapterData && currentChapter === currentBook.chapters && (
            <QuizSuggestion 
              bookId={currentBook.slug}
              bookName={chapterData.book}
            />
          )}
        </article>
      </div>

      {/* Verse Selection Bar */}
      {selectedRange && chapterData && (
        <VerseSelectionBar
          verseStart={selectedRange.start}
          verseEnd={selectedRange.end}
          bookName={chapterData.book}
          chapter={currentChapter}
          onAddNote={handleOpenNoteEditor}
          onCopy={handleCopy}
          onCancel={clearSelection}
        />
      )}

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

      {/* Note Editor */}
      {selectedRange && chapterData && (
        <NoteEditor
          isOpen={noteEditorOpen}
          onClose={() => setNoteEditorOpen(false)}
          reference={selectedRange.start === selectedRange.end 
            ? `${chapterData.book} ${currentChapter}:${selectedRange.start}`
            : `${chapterData.book} ${currentChapter}:${selectedRange.start}-${selectedRange.end}`
          }
          verseText={getSelectedVersesText()}
          verseStart={selectedRange.start}
          verseEnd={selectedRange.end}
          existingNote={getNoteForRange(selectedRange.start, selectedRange.end)}
          onSave={handleSaveNote}
          onDelete={handleDeleteNote}
        />
      )}
    </div>
  );
};
