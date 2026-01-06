// User data persistence service using localStorage

export interface ReadingProgress {
  bookSlug: string;
  bookName: string;
  chapter: number;
  timestamp: number;
  completed: boolean;
}

export interface Bookmark {
  id: string;
  bookSlug: string;
  bookName: string;
  chapter: number;
  verseNumber?: number;
  verseText?: string;
  reference: string;
  timestamp: number;
  note?: string;
}

export interface UserStats {
  chaptersRead: number;
  totalReadingTimeMinutes: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  weeklyActivity: Record<string, boolean>; // ISO date string -> active
}

export interface UserPreferences {
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  theme: 'light' | 'dark' | 'sepia';
  languageCode: string;
}

export interface PlanProgress {
  planId: string;
  completedReadings: { bookSlug: string; chapter: number; timestamp: number }[];
  startedAt: number;
}

export interface VerseNote {
  id: string;
  bookSlug: string;
  bookName: string;
  chapter: number;
  verseStart: number;
  verseEnd: number;
  verseText: string;
  reference: string;
  note: string;
  createdAt: number;
  updatedAt: number;
  // Legacy support
  verseNumber?: number;
}

interface UserData {
  history: ReadingProgress[];
  bookmarks: Bookmark[];
  notes: VerseNote[];
  searchHistory: string[];
  stats: UserStats;
  preferences: UserPreferences;
  lastReading: ReadingProgress | null;
  planProgress: Record<string, PlanProgress>;
}

const STORAGE_KEY = 'shalom_user_data';

const defaultUserData: UserData = {
  history: [],
  bookmarks: [],
  notes: [],
  searchHistory: [],
  stats: {
    chaptersRead: 0,
    totalReadingTimeMinutes: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: '',
    weeklyActivity: {},
  },
  preferences: {
    fontSize: 'lg',
    theme: 'light',
    languageCode: 'es',
  },
  lastReading: null,
  planProgress: {},
};

// Get all user data
export function getUserData(): UserData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultUserData, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Error loading user data:', error);
  }
  return defaultUserData;
}

// Save all user data
function saveUserData(data: UserData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
}

// Track chapter reading
export function trackChapterRead(
  bookSlug: string,
  bookName: string,
  chapter: number,
  readingTimeMinutes: number = 3
): void {
  const data = getUserData();
  const today = new Date().toISOString().split('T')[0];
  
  // Add to history (avoid duplicates within same day)
  const existingToday = data.history.find(
    h => h.bookSlug === bookSlug && h.chapter === chapter && 
        new Date(h.timestamp).toISOString().split('T')[0] === today
  );
  
  if (!existingToday) {
    data.history.unshift({
      bookSlug,
      bookName,
      chapter,
      timestamp: Date.now(),
      completed: true,
    });
    
    // Keep only last 100 history items
    data.history = data.history.slice(0, 100);
    
    // Update stats
    data.stats.chaptersRead += 1;
  }
  
  data.stats.totalReadingTimeMinutes += readingTimeMinutes;
  
  // Update streak
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  if (data.stats.lastActiveDate === yesterdayStr) {
    data.stats.currentStreak += 1;
  } else if (data.stats.lastActiveDate !== today) {
    data.stats.currentStreak = 1;
  }
  
  data.stats.longestStreak = Math.max(data.stats.longestStreak, data.stats.currentStreak);
  data.stats.lastActiveDate = today;
  data.stats.weeklyActivity[today] = true;
  
  // Update last reading
  data.lastReading = {
    bookSlug,
    bookName,
    chapter,
    timestamp: Date.now(),
    completed: true,
  };
  
  saveUserData(data);
}

// Get reading history
export function getReadingHistory(limit: number = 20): ReadingProgress[] {
  const data = getUserData();
  return data.history.slice(0, limit);
}

// Get last reading
export function getLastReading(): ReadingProgress | null {
  const data = getUserData();
  return data.lastReading;
}

// Add bookmark
export function addBookmark(bookmark: Omit<Bookmark, 'id' | 'timestamp'>): Bookmark {
  const data = getUserData();
  
  // Check if already bookmarked
  const existing = data.bookmarks.find(
    b => b.bookSlug === bookmark.bookSlug && 
        b.chapter === bookmark.chapter && 
        b.verseNumber === bookmark.verseNumber
  );
  
  if (existing) {
    return existing;
  }
  
  const newBookmark: Bookmark = {
    ...bookmark,
    id: `${bookmark.bookSlug}-${bookmark.chapter}-${bookmark.verseNumber || 'all'}-${Date.now()}`,
    timestamp: Date.now(),
  };
  
  data.bookmarks.unshift(newBookmark);
  saveUserData(data);
  
  return newBookmark;
}

// Remove bookmark
export function removeBookmark(bookmarkId: string): void {
  const data = getUserData();
  data.bookmarks = data.bookmarks.filter(b => b.id !== bookmarkId);
  saveUserData(data);
}

// Get all bookmarks
export function getBookmarks(): Bookmark[] {
  const data = getUserData();
  return data.bookmarks;
}

// Check if chapter/verse is bookmarked
export function isBookmarked(bookSlug: string, chapter: number, verseNumber?: number): boolean {
  const data = getUserData();
  return data.bookmarks.some(
    b => b.bookSlug === bookSlug && 
        b.chapter === chapter && 
        (verseNumber === undefined || b.verseNumber === verseNumber)
  );
}

// Get user stats
export function getUserStats(): UserStats {
  const data = getUserData();
  
  // Calculate weekly activity for current week
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + 1); // Monday
  
  const weeklyActivity: Record<string, boolean> = {};
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    weeklyActivity[dateStr] = data.stats.weeklyActivity[dateStr] || false;
  }
  
  return {
    ...data.stats,
    weeklyActivity,
  };
}

// Update preferences
export function updatePreferences(prefs: Partial<UserPreferences>): void {
  const data = getUserData();
  data.preferences = { ...data.preferences, ...prefs };
  saveUserData(data);
}

// Get preferences
export function getPreferences(): UserPreferences {
  const data = getUserData();
  return data.preferences;
}

// Calculate estimated reading time in hours
export function getEstimatedReadingHours(): string {
  const data = getUserData();
  const hours = Math.floor(data.stats.totalReadingTimeMinutes / 60);
  if (hours < 1) {
    return `${data.stats.totalReadingTimeMinutes}m`;
  }
  return `${hours}h`;
}

// Get unique books read
export function getUniqueBooksRead(): number {
  const data = getUserData();
  const uniqueBooks = new Set(data.history.map(h => h.bookSlug));
  return uniqueBooks.size;
}

// ============= NOTES FUNCTIONS =============

// Migrate legacy note format
function migrateNote(note: VerseNote): VerseNote {
  if (note.verseNumber !== undefined && note.verseStart === undefined) {
    return {
      ...note,
      verseStart: note.verseNumber,
      verseEnd: note.verseNumber,
    };
  }
  return note;
}

// Add a note to a verse range
export function addNote(note: Omit<VerseNote, 'id' | 'createdAt' | 'updatedAt'>): VerseNote {
  const data = getUserData();
  
  // Migrate verseNumber to verseStart/verseEnd if needed
  const verseStart = note.verseStart ?? (note as any).verseNumber ?? 1;
  const verseEnd = note.verseEnd ?? verseStart;
  
  // Check if note already exists for this verse range
  const existingIndex = data.notes.findIndex(
    n => n.bookSlug === note.bookSlug && 
         n.chapter === note.chapter && 
         ((n.verseStart ?? n.verseNumber) === verseStart) &&
         ((n.verseEnd ?? n.verseNumber) === verseEnd)
  );
  
  const now = Date.now();
  
  if (existingIndex !== -1) {
    // Update existing note
    data.notes[existingIndex] = {
      ...data.notes[existingIndex],
      note: note.note,
      updatedAt: now,
    };
    saveUserData(data);
    return migrateNote(data.notes[existingIndex]);
  }
  
  const newNote: VerseNote = {
    ...note,
    verseStart,
    verseEnd,
    id: `note-${note.bookSlug}-${note.chapter}-${verseStart}-${verseEnd}-${now}`,
    createdAt: now,
    updatedAt: now,
  };
  
  data.notes.unshift(newNote);
  saveUserData(data);
  
  return newNote;
}

// Update an existing note
export function updateNote(noteId: string, content: string): VerseNote | null {
  const data = getUserData();
  const noteIndex = data.notes.findIndex(n => n.id === noteId);
  
  if (noteIndex === -1) return null;
  
  data.notes[noteIndex] = {
    ...data.notes[noteIndex],
    note: content,
    updatedAt: Date.now(),
  };
  
  saveUserData(data);
  return data.notes[noteIndex];
}

// Delete a note
export function deleteNote(noteId: string): void {
  const data = getUserData();
  data.notes = data.notes.filter(n => n.id !== noteId);
  saveUserData(data);
}

// Get note for a specific verse (checks if verse is within any note range)
export function getNoteForVerse(bookSlug: string, chapter: number, verseNumber: number): VerseNote | null {
  const data = getUserData();
  const note = data.notes.find(n => {
    if (n.bookSlug !== bookSlug || n.chapter !== chapter) return false;
    const start = n.verseStart ?? n.verseNumber ?? 0;
    const end = n.verseEnd ?? n.verseNumber ?? 0;
    return verseNumber >= start && verseNumber <= end;
  });
  return note ? migrateNote(note) : null;
}

// Get all notes
export function getAllNotes(): VerseNote[] {
  const data = getUserData();
  return data.notes.map(migrateNote);
}

// Get notes for a specific chapter
export function getNotesForChapter(bookSlug: string, chapter: number): VerseNote[] {
  const data = getUserData();
  return data.notes
    .filter(n => n.bookSlug === bookSlug && n.chapter === chapter)
    .map(migrateNote);
}

// Get total notes count
export function getNotesCount(): number {
  const data = getUserData();
  return data.notes.length;
}

// ============= SEARCH HISTORY FUNCTIONS =============

// Add a search to history
export function addSearchToHistory(query: string): void {
  const data = getUserData();
  const trimmedQuery = query.trim().toLowerCase();
  
  if (!trimmedQuery || trimmedQuery.length < 2) return;
  
  // Remove if already exists
  data.searchHistory = data.searchHistory.filter(q => q !== trimmedQuery);
  
  // Add to front
  data.searchHistory.unshift(trimmedQuery);
  
  // Keep only last 10 searches
  data.searchHistory = data.searchHistory.slice(0, 10);
  
  saveUserData(data);
}

// Get search history
export function getSearchHistory(limit: number = 5): string[] {
  const data = getUserData();
  return data.searchHistory.slice(0, limit);
}

// Clear search history
export function clearSearchHistory(): void {
  const data = getUserData();
  data.searchHistory = [];
  saveUserData(data);
}

// ============= PLAN PROGRESS FUNCTIONS =============

// Get progress for a specific plan
export function getPlanProgress(planId: string): PlanProgress | null {
  const data = getUserData();
  return data.planProgress[planId] || null;
}

// Mark a chapter as read for a specific plan
export function markPlanChapterRead(planId: string, bookSlug: string, chapter: number): void {
  const data = getUserData();
  
  if (!data.planProgress[planId]) {
    data.planProgress[planId] = {
      planId,
      completedReadings: [],
      startedAt: Date.now(),
    };
  }
  
  // Avoid duplicates
  const exists = data.planProgress[planId].completedReadings.some(
    r => r.bookSlug === bookSlug && r.chapter === chapter
  );
  
  if (!exists) {
    data.planProgress[planId].completedReadings.push({
      bookSlug,
      chapter,
      timestamp: Date.now(),
    });
  }
  
  saveUserData(data);
}

// Check if a chapter is completed for a specific plan
export function isPlanChapterCompleted(planId: string, bookSlug: string, chapter: number): boolean {
  const data = getUserData();
  const progress = data.planProgress[planId];
  if (!progress) return false;
  
  return progress.completedReadings.some(
    r => r.bookSlug === bookSlug && r.chapter === chapter
  );
}

// Calculate progress percentage for a plan
export function calculatePlanProgressPercent(planId: string, totalReadings: number): number {
  const progress = getPlanProgress(planId);
  if (!progress || totalReadings === 0) return 0;
  
  return Math.round((progress.completedReadings.length / totalReadings) * 100);
}

// Reset all plan progress
export function resetAllPlanProgress(): void {
  const data = getUserData();
  data.planProgress = {};
  saveUserData(data);
  
  // Clear plan start dates
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('plan_start_')) {
      localStorage.removeItem(key);
    }
  });
}
