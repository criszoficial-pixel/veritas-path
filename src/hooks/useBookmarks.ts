import { useState, useEffect, useCallback } from 'react';
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
  isBookmarked,
  getBookmarkCategories,
  addBookmarkCategory,
  getBookmarksByCategory,
  addBookmarkWithCategory,
  updateBookmarkCategory,
  deleteBookmarkCategory,
  isDefaultCategory,
  type Bookmark,
  type BookmarkCategory,
} from '@/services/userDataService';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(getBookmarks());
  const [categories, setCategories] = useState<BookmarkCategory[]>(getBookmarkCategories());

  // Refresh bookmarks and categories from localStorage
  const refresh = useCallback(() => {
    setBookmarks(getBookmarks());
    setCategories(getBookmarkCategories());
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
    categories,
    add,
    remove,
    checkBookmarked,
    toggleChapterBookmark,
    toggleVerseBookmark,
    refresh,
    count: bookmarks.length,
    addWithCategory: (bookmark: Omit<Bookmark, 'id' | 'timestamp'>, categoryId: string) => {
      addBookmarkWithCategory(bookmark, categoryId);
      refresh();
    },
    createCategory: (name: string, color?: string) => {
      const cat = addBookmarkCategory(name, color);
      refresh();
      return cat;
    },
    updateCategory: (id: string, name: string, color: string) => {
      updateBookmarkCategory(id, { name, color });
      refresh();
    },
    deleteCategory: (id: string) => {
      deleteBookmarkCategory(id);
      refresh();
    },
    isProtectedCategory: isDefaultCategory,
    getByCategory: (categoryId: string) => getBookmarksByCategory(categoryId),
  };
}
