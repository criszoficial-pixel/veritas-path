import { memo } from 'react';
import type { VerseSyncData } from '@/types/audio';
import { cn } from '@/lib/utils';

interface SyncedVerseProps {
  verse: VerseSyncData;
  activeWordIndex: number | null;
  isActiveVerse: boolean;
  onWordClick: (wordIndex: number) => void;
}

export const SyncedVerse = memo(function SyncedVerse({
  verse,
  activeWordIndex,
  isActiveVerse,
  onWordClick,
}: SyncedVerseProps) {
  return (
    <p
      className={cn(
        'text-foreground transition-all duration-300 rounded-lg py-2 -mx-2 px-2',
        isActiveVerse && 'bg-accent/10'
      )}
    >
      <sup className="verse-number">{verse.number}</sup>
      {verse.words.map((wordData, idx) => (
        <span
          key={`${verse.number}-${idx}`}
          onClick={() => onWordClick(idx)}
          className={cn(
            'word cursor-pointer transition-all duration-150 rounded px-0.5 hover:bg-accent/20',
            activeWordIndex === idx && 'word-active bg-accent/40 text-accent-foreground font-medium'
          )}
        >
          {wordData.word}
          {idx < verse.words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
});
