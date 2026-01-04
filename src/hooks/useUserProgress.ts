import { useState, useEffect, useCallback } from 'react';
import {
  getUserStats,
  getLastReading,
  getReadingHistory,
  trackChapterRead,
  getEstimatedReadingHours,
  getUniqueBooksRead,
  type UserStats,
  type ReadingProgress,
} from '@/services/userDataService';

export function useUserProgress() {
  const [stats, setStats] = useState<UserStats>(getUserStats());
  const [lastReading, setLastReading] = useState<ReadingProgress | null>(getLastReading());
  const [history, setHistory] = useState<ReadingProgress[]>(getReadingHistory());

  // Refresh data from localStorage
  const refresh = useCallback(() => {
    setStats(getUserStats());
    setLastReading(getLastReading());
    setHistory(getReadingHistory());
  }, []);

  // Track a chapter read
  const markChapterRead = useCallback((
    bookSlug: string,
    bookName: string,
    chapter: number,
    readingTimeMinutes?: number
  ) => {
    trackChapterRead(bookSlug, bookName, chapter, readingTimeMinutes);
    refresh();
  }, [refresh]);

  // Get reading time as formatted string
  const readingTime = getEstimatedReadingHours();

  // Get unique books count
  const uniqueBooks = getUniqueBooksRead();

  // Get current week activity (array of booleans for Mon-Sun)
  const getWeeklyActivity = useCallback((): boolean[] => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    
    const activity: boolean[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      activity.push(stats.weeklyActivity[dateStr] || false);
    }
    return activity;
  }, [stats.weeklyActivity]);

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
    stats,
    lastReading,
    history,
    readingTime,
    uniqueBooks,
    markChapterRead,
    getWeeklyActivity,
    refresh,
  };
}
