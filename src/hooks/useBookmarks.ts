import { useState, useEffect, useCallback } from 'react';
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
  isBookmarked,
  type Bookmark,
} from '@/services/userDataService';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(getBookmarks());

  // Refresh bookmarks from localStorage
  const refresh = useCallback(() => {
    setBookmarks(getBookmarks());
  }, []);

  // Add a new bookmark
  const add = useCallback((bookmark: Omit<Bookmark, 'id' | 'timestamp'>) => {
    const newBookmark = addBookmark(bookmark);
    refresh();
    return newBookmark;
  }, [refresh]);

  // Remove a bookmark by ID
  const remove = useCallback((bookmarkId: string) => {
    removeBookmark(bookmarkId);
    refresh();
  }, [refresh]);

  // Check if a specific chapter/verse is bookmarked
  const checkBookmarked = useCallback((
    bookSlug: string,
    chapter: number,
    verseNumber?: number
  ): boolean => {
    return isBookmarked(bookSlug, chapter, verseNumber);
  }, []);

  // Toggle bookmark for a chapter
  const toggleChapterBookmark = useCallback((
    bookSlug: string,
    bookName: string,
    chapter: number
  ) => {
    const existing = bookmarks.find(
      b => b.bookSlug === bookSlug && b.chapter === chapter && !b.verseNumber
    );

    if (existing) {
      remove(existing.id);
      return false;
    } else {
      add({
        bookSlug,
        bookName,
        chapter,
        reference: `${bookName} ${chapter}`,
      });
      return true;
    }
  }, [bookmarks, add, remove]);

  // Toggle bookmark for a specific verse
  const toggleVerseBookmark = useCallback((
    bookSlug: string,
    bookName: string,
    chapter: number,
    verseNumber: number,
    verseText: string
  ) => {
    const existing = bookmarks.find(
      b => b.bookSlug === bookSlug && b.chapter === chapter && b.verseNumber === verseNumber
    );

    if (existing) {
      remove(existing.id);
      return false;
    } else {
      add({
        bookSlug,
        bookName,
        chapter,
        verseNumber,
        verseText,
        reference: `${bookName} ${chapter}:${verseNumber}`,
      });
      return true;
    }
  }, [bookmarks, add, remove]);

  // Listen for storage changes (for multi-tab sync)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'shalom_user_data') {
        refresh();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refresh]);

  return {
    bookmarks,
    add,
    remove,
    checkBookmarked,
    toggleChapterBookmark,
    toggleVerseBookmark,
    refresh,
    count: bookmarks.length,
  };
}
