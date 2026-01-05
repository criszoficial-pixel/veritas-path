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

export interface VerseNote {
  id: string;
  bookSlug: string;
  bookName: string;
  chapter: number;
  verseNumber: number;
  verseText: string;
  reference: string;
  note: string;
  createdAt: number;
  updatedAt: number;
}

interface UserData {
  history: ReadingProgress[];
  bookmarks: Bookmark[];
  notes: VerseNote[];
  stats: UserStats;
  preferences: UserPreferences;
  lastReading: ReadingProgress | null;
}

const STORAGE_KEY = 'shalom_user_data';

const defaultUserData: UserData = {
  history: [],
  bookmarks: [],
  notes: [],
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

// Add a note to a verse
export function addNote(note: Omit<VerseNote, 'id' | 'createdAt' | 'updatedAt'>): VerseNote {
  const data = getUserData();
  
  // Check if note already exists for this verse
  const existingIndex = data.notes.findIndex(
    n => n.bookSlug === note.bookSlug && n.chapter === note.chapter && n.verseNumber === note.verseNumber
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
    return data.notes[existingIndex];
  }
  
  const newNote: VerseNote = {
    ...note,
    id: `note-${note.bookSlug}-${note.chapter}-${note.verseNumber}-${now}`,
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

// Get note for a specific verse
export function getNoteForVerse(bookSlug: string, chapter: number, verseNumber: number): VerseNote | null {
  const data = getUserData();
  return data.notes.find(
    n => n.bookSlug === bookSlug && n.chapter === chapter && n.verseNumber === verseNumber
  ) || null;
}

// Get all notes
export function getAllNotes(): VerseNote[] {
  const data = getUserData();
  return data.notes;
}

// Get notes for a specific chapter
export function getNotesForChapter(bookSlug: string, chapter: number): VerseNote[] {
  const data = getUserData();
  return data.notes.filter(n => n.bookSlug === bookSlug && n.chapter === chapter);
}

// Get total notes count
export function getNotesCount(): number {
  const data = getUserData();
  return data.notes.length;
}
