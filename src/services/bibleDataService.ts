import type { BibleMetadata, ChapterData, BookInfo } from '@/types/bible';
import type { LanguageCode } from '@/types/language';

// In-memory cache to avoid re-fetching
const metadataCache = new Map<string, BibleMetadata>();
const chapterCache = new Map<string, ChapterData>();

// Mapping of English slugs to Spanish slugs
const englishToSpanishSlugMap: Record<string, string> = {
  'genesis': 'genesis',
  'exodus': 'exodo',
  'leviticus': 'levitico',
  'numbers': 'numeros',
  'deuteronomy': 'deuteronomio',
  'joshua': 'josue',
  'judges': 'jueces',
  'ruth': 'rut',
  '1-samuel': '1-samuel',
  '2-samuel': '2-samuel',
  '1-kings': '1-reyes',
  '2-kings': '2-reyes',
  '1-chronicles': '1-cronicas',
  '2-chronicles': '2-cronicas',
  'ezra': 'esdras',
  'nehemiah': 'nehemias',
  'esther': 'ester',
  'job': 'job',
  'psalms': 'salmos',
  'proverbs': 'proverbios',
  'ecclesiastes': 'eclesiastes',
  'song-of-solomon': 'cantares',
  'isaiah': 'isaias',
  'jeremiah': 'jeremias',
  'lamentations': 'lamentaciones',
  'ezekiel': 'ezequiel',
  'daniel': 'daniel',
  'hosea': 'oseas',
  'joel': 'joel',
  'amos': 'amos',
  'obadiah': 'abdias',
  'jonah': 'jonas',
  'micah': 'miqueas',
  'nahum': 'nahum',
  'habakkuk': 'habacuc',
  'zephaniah': 'sofonias',
  'haggai': 'hageo',
  'zechariah': 'zacarias',
  'malachi': 'malaquias',
  'matthew': 'mateo',
  'mark': 'marcos',
  'luke': 'lucas',
  'john': 'juan',
  'acts': 'hechos',
  'romans': 'romanos',
  '1-corinthians': '1-corintios',
  '2-corinthians': '2-corintios',
  'galatians': 'galatas',
  'ephesians': 'efesios',
  'philippians': 'filipenses',
  'colossians': 'colosenses',
  '1-thessalonians': '1-tesalonicenses',
  '2-thessalonians': '2-tesalonicenses',
  '1-timothy': '1-timoteo',
  '2-timothy': '2-timoteo',
  'titus': 'tito',
  'philemon': 'filemon',
  'hebrews': 'hebreos',
  'james': 'santiago',
  '1-peter': '1-pedro',
  '2-peter': '2-pedro',
  '1-john': '1-juan',
  '2-john': '2-juan',
  '3-john': '3-juan',
  'jude': 'judas',
  'revelation': 'apocalipsis'
};

/**
 * Fetches a chapter with Spanish fallback if not available in requested language
 */
async function fetchChapterWithSpanishFallback(
  bookSlug: string,
  chapter: number
): Promise<ChapterData | null> {
  const spanishSlug = englishToSpanishSlugMap[bookSlug.toLowerCase()] || bookSlug;
  
  try {
    const response = await fetch(`/bible/es/${spanishSlug}/${chapter}.json`);
    if (!response.ok) return null;
    
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) return null;
    
    const chapterData: ChapterData = await response.json();
    chapterCache.set(`en-${bookSlug}-${chapter}`, chapterData);
    return chapterData;
  } catch {
    return null;
  }
}

/**
 * Fetches Bible metadata for a specific language
 * Returns book list, version info, and copyright
 */
export async function fetchBibleMetadata(languageCode: LanguageCode = 'es'): Promise<BibleMetadata | null> {
  const cacheKey = languageCode;
  
  if (metadataCache.has(cacheKey)) {
    return metadataCache.get(cacheKey)!;
  }

  try {
    const response = await fetch(`/bible/${languageCode}/metadata.json`);
    if (!response.ok) {
      if (languageCode !== 'es') {
        return fetchBibleMetadata('es');
      }
      return null;
    }
    
    const metadata: BibleMetadata = await response.json();
    metadataCache.set(cacheKey, metadata);
    return metadata;
  } catch (error) {
    console.error(`Error loading Bible metadata for ${languageCode}:`, error);
    if (languageCode !== 'es') {
      return fetchBibleMetadata('es');
    }
    return null;
  }
}

/**
 * Fetches a specific chapter's verses
 * Falls back to Spanish if chapter not available in requested language
 */
export async function fetchChapter(
  languageCode: LanguageCode = 'es',
  bookSlug: string,
  chapter: number
): Promise<ChapterData | null> {
  const cacheKey = `${languageCode}-${bookSlug}-${chapter}`;
  
  if (chapterCache.has(cacheKey)) {
    return chapterCache.get(cacheKey)!;
  }

  try {
    const response = await fetch(`/bible/${languageCode}/${bookSlug}/${chapter}.json`);
    
    const contentType = response.headers.get('content-type');
    if (!response.ok || !contentType?.includes('application/json')) {
      if (languageCode !== 'es') {
        return fetchChapterWithSpanishFallback(bookSlug, chapter);
      }
      return null;
    }
    
    const chapterData: ChapterData = await response.json();
    chapterCache.set(cacheKey, chapterData);
    return chapterData;
  } catch (error) {
    console.error(`Error loading chapter ${bookSlug} ${chapter}:`, error);
    if (languageCode !== 'es') {
      return fetchChapterWithSpanishFallback(bookSlug, chapter);
    }
    return null;
  }
}

/**
 * Converts a book name to its slug format
 */
export function bookNameToSlug(bookName: string): string {
  return bookName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-');
}

/**
 * Finds a book by its display name in the metadata
 */
export function findBookByName(metadata: BibleMetadata, bookName: string): BookInfo | undefined {
  const exactMatch = metadata.books.find(book => book.name === bookName);
  if (exactMatch) return exactMatch;
  
  const lowerName = bookName.toLowerCase();
  return metadata.books.find(book => book.name.toLowerCase() === lowerName);
}

/**
 * Finds a book by its slug in the metadata
 */
export function findBookBySlug(metadata: BibleMetadata, bookSlug: string): BookInfo | undefined {
  return metadata.books.find(book => book.slug === bookSlug);
}

/**
 * Clears all cached data (useful for language changes)
 */
export function clearBibleCache(): void {
  metadataCache.clear();
  chapterCache.clear();
}
