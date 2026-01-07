import { useMemo } from 'react';
import { getUserData } from '@/services/userDataService';
import type { BookInfo } from '@/types/bible';

export interface BookProgress {
  chaptersRead: number;
  totalChapters: number;
  percentage: number;
  lastReadChapter: number | null;
  isStarted: boolean;
  isCompleted: boolean;
}

export function useBookProgress(bookSlug: string, totalChapters: number): BookProgress {
  return useMemo(() => {
    const data = getUserData();
    const bookHistory = data.history.filter(h => h.bookSlug === bookSlug);
    
    // Get unique chapters read
    const uniqueChapters = new Set(bookHistory.map(h => h.chapter));
    const chaptersRead = uniqueChapters.size;
    
    // Get last read chapter (most recent)
    const lastRead = bookHistory.length > 0 
      ? bookHistory.sort((a, b) => b.timestamp - a.timestamp)[0].chapter 
      : null;
    
    const percentage = totalChapters > 0 ? Math.round((chaptersRead / totalChapters) * 100) : 0;
    
    return {
      chaptersRead,
      totalChapters,
      percentage,
      lastReadChapter: lastRead,
      isStarted: chaptersRead > 0,
      isCompleted: chaptersRead >= totalChapters,
    };
  }, [bookSlug, totalChapters]);
}

export function getBookProgressSync(bookSlug: string, totalChapters: number): BookProgress {
  const data = getUserData();
  const bookHistory = data.history.filter(h => h.bookSlug === bookSlug);
  
  const uniqueChapters = new Set(bookHistory.map(h => h.chapter));
  const chaptersRead = uniqueChapters.size;
  
  const lastRead = bookHistory.length > 0 
    ? bookHistory.sort((a, b) => b.timestamp - a.timestamp)[0].chapter 
    : null;
  
  const percentage = totalChapters > 0 ? Math.round((chaptersRead / totalChapters) * 100) : 0;
  
  return {
    chaptersRead,
    totalChapters,
    percentage,
    lastReadChapter: lastRead,
    isStarted: chaptersRead > 0,
    isCompleted: chaptersRead >= totalChapters,
  };
}

export function getMultipleBooksProgress(books: BookInfo[]): Record<string, BookProgress> {
  const data = getUserData();
  const result: Record<string, BookProgress> = {};
  
  for (const book of books) {
    const bookHistory = data.history.filter(h => h.bookSlug === book.slug);
    const uniqueChapters = new Set(bookHistory.map(h => h.chapter));
    const chaptersRead = uniqueChapters.size;
    
    const lastRead = bookHistory.length > 0 
      ? bookHistory.sort((a, b) => b.timestamp - a.timestamp)[0].chapter 
      : null;
    
    const percentage = book.chapters > 0 ? Math.round((chaptersRead / book.chapters) * 100) : 0;
    
    result[book.slug] = {
      chaptersRead,
      totalChapters: book.chapters,
      percentage,
      lastReadChapter: lastRead,
      isStarted: chaptersRead > 0,
      isCompleted: chaptersRead >= book.chapters,
    };
  }
  
  return result;
}
