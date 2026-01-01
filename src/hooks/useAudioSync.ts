import { useMemo, useCallback } from 'react';
import type { ChapterAudioData, VerseSyncData, WordTimestamp } from '@/types/audio';

interface ActivePosition {
  verseNumber: number | null;
  verseIndex: number | null;
  wordIndex: number | null; // Index within the verse
  globalWordIndex: number | null; // Index across all words in chapter
}

interface UseAudioSyncReturn {
  activePosition: ActivePosition;
  getWordTimestamp: (verseNumber: number, wordIndex: number) => WordTimestamp | null;
  seekToWord: (verseNumber: number, wordIndex: number, seekFn: (time: number) => void) => void;
}

export function useAudioSync(
  syncData: ChapterAudioData | null,
  currentTime: number
): UseAudioSyncReturn {
  // Calculate active position based on current time
  const activePosition = useMemo((): ActivePosition => {
    if (!syncData) {
      return { verseNumber: null, verseIndex: null, wordIndex: null, globalWordIndex: null };
    }

    let globalWordIndex = 0;

    for (let verseIdx = 0; verseIdx < syncData.verses.length; verseIdx++) {
      const verse = syncData.verses[verseIdx];
      
      for (let wordIdx = 0; wordIdx < verse.words.length; wordIdx++) {
        const word = verse.words[wordIdx];
        
        if (currentTime >= word.start && currentTime < word.end) {
          return {
            verseNumber: verse.number,
            verseIndex: verseIdx,
            wordIndex: wordIdx,
            globalWordIndex,
          };
        }
        
        globalWordIndex++;
      }
    }

    // If we're past all words, return the last position
    if (syncData.verses.length > 0) {
      const lastVerse = syncData.verses[syncData.verses.length - 1];
      const lastWord = lastVerse.words[lastVerse.words.length - 1];
      
      if (currentTime >= lastWord.end) {
        return {
          verseNumber: lastVerse.number,
          verseIndex: syncData.verses.length - 1,
          wordIndex: lastVerse.words.length - 1,
          globalWordIndex: globalWordIndex - 1,
        };
      }
    }

    return { verseNumber: null, verseIndex: null, wordIndex: null, globalWordIndex: null };
  }, [syncData, currentTime]);

  // Get word timestamp for seeking
  const getWordTimestamp = useCallback(
    (verseNumber: number, wordIndex: number): WordTimestamp | null => {
      if (!syncData) return null;

      const verse = syncData.verses.find((v) => v.number === verseNumber);
      if (!verse || wordIndex < 0 || wordIndex >= verse.words.length) {
        return null;
      }

      return verse.words[wordIndex];
    },
    [syncData]
  );

  // Seek to a specific word
  const seekToWord = useCallback(
    (verseNumber: number, wordIndex: number, seekFn: (time: number) => void) => {
      const word = getWordTimestamp(verseNumber, wordIndex);
      if (word) {
        seekFn(word.start);
      }
    },
    [getWordTimestamp]
  );

  return {
    activePosition,
    getWordTimestamp,
    seekToWord,
  };
}
