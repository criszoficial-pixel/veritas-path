import type { BibleMetadata, ChapterData, BookInfo } from '@/types/bible';
import type { LanguageCode } from '@/types/language';

// In-memory cache to avoid re-fetching
const metadataCache = new Map<string, BibleMetadata>();
const chapterCache = new Map<string, ChapterData>();

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
      // Fallback to Spanish if language not available
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
    // Fallback to Spanish
    if (languageCode !== 'es') {
      return fetchBibleMetadata('es');
    }
    return null;
  }
}

/**
 * Fetches a specific chapter's verses
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
    if (!response.ok) {
      return null;
    }
    
    const chapterData: ChapterData = await response.json();
    chapterCache.set(cacheKey, chapterData);
    return chapterData;
  } catch (error) {
    console.error(`Error loading chapter ${bookSlug} ${chapter}:`, error);
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
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/\s+/g, '-');
}

/**
 * Finds a book by its display name in the metadata
 */
export function findBookByName(metadata: BibleMetadata, bookName: string): BookInfo | undefined {
  // First try exact match
  const exactMatch = metadata.books.find(book => book.name === bookName);
  if (exactMatch) return exactMatch;
  
  // Try case-insensitive match
  const lowerName = bookName.toLowerCase();
  return metadata.books.find(book => book.name.toLowerCase() === lowerName);
}

/**
 * Clears all cached data (useful for language changes)
 */
export function clearBibleCache(): void {
  metadataCache.clear();
  chapterCache.clear();
}
