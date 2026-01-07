import { useMemo } from 'react';
import { getUserData } from '@/services/userDataService';
import type { BookInfo } from '@/types/bible';

export interface CollectionProgress {
  booksCompleted: number;
  booksStarted: number;
  totalBooks: number;
  chaptersRead: number;
  totalChapters: number;
  percentage: number;
  lastReadBook: { slug: string; name: string; chapter: number } | null;
}

export function useCollectionProgress(books: BookInfo[]): CollectionProgress {
  return useMemo(() => {
    if (!books.length) {
      return {
        booksCompleted: 0,
        booksStarted: 0,
        totalBooks: 0,
        chaptersRead: 0,
        totalChapters: 0,
        percentage: 0,
        lastReadBook: null,
      };
    }
    
    const data = getUserData();
    const bookSlugs = new Set(books.map(b => b.slug));
    
    // Filter history to only include books in this collection
    const collectionHistory = data.history.filter(h => bookSlugs.has(h.bookSlug));
    
    // Calculate chapters read per book
    const chaptersPerBook: Record<string, Set<number>> = {};
    let lastReadEntry: { slug: string; name: string; chapter: number; timestamp: number } | null = null;
    
    for (const entry of collectionHistory) {
      if (!chaptersPerBook[entry.bookSlug]) {
        chaptersPerBook[entry.bookSlug] = new Set();
      }
      chaptersPerBook[entry.bookSlug].add(entry.chapter);
      
      if (!lastReadEntry || entry.timestamp > lastReadEntry.timestamp) {
        lastReadEntry = {
          slug: entry.bookSlug,
          name: entry.bookName,
          chapter: entry.chapter,
          timestamp: entry.timestamp,
        };
      }
    }
    
    // Calculate stats
    let booksCompleted = 0;
    let booksStarted = 0;
    let chaptersRead = 0;
    let totalChapters = 0;
    
    for (const book of books) {
      const readChapters = chaptersPerBook[book.slug]?.size || 0;
      chaptersRead += readChapters;
      totalChapters += book.chapters;
      
      if (readChapters > 0) {
        booksStarted++;
        if (readChapters >= book.chapters) {
          booksCompleted++;
        }
      }
    }
    
    const percentage = totalChapters > 0 ? Math.round((chaptersRead / totalChapters) * 100) : 0;
    
    return {
      booksCompleted,
      booksStarted,
      totalBooks: books.length,
      chaptersRead,
      totalChapters,
      percentage,
      lastReadBook: lastReadEntry ? {
        slug: lastReadEntry.slug,
        name: lastReadEntry.name,
        chapter: lastReadEntry.chapter,
      } : null,
    };
  }, [books]);
}

export function getMotivationalMessage(progress: CollectionProgress, collectionTitle: string): string {
  const { percentage, chaptersRead, totalChapters, booksCompleted, totalBooks } = progress;
  
  if (percentage === 0) {
    return `¡Comienza tu viaje por ${collectionTitle}!`;
  }
  
  if (percentage === 100) {
    return `🎉 ¡Felicitaciones! Has completado ${collectionTitle}`;
  }
  
  if (percentage >= 75) {
    const remaining = totalChapters - chaptersRead;
    return `¡Casi lo logras! Solo ${remaining} capítulos más para completar ${collectionTitle}`;
  }
  
  if (percentage >= 50) {
    return `¡Vas muy bien! Ya llevas más de la mitad de ${collectionTitle}`;
  }
  
  if (percentage >= 25) {
    return `¡Buen progreso! Has leído ${chaptersRead} capítulos de ${collectionTitle}`;
  }
  
  return `¡Buen inicio! Llevas ${chaptersRead} capítulos leídos`;
}
