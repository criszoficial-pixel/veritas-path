import type { BibleMetadata, ChapterData, BookInfo } from '@/types/bible';

// Cache for metadata (Spanish only for v1)
let metadataCache: BibleMetadata | null = null;

/**
 * Fetches Bible metadata (Spanish RV1960)
 */
export async function fetchBibleMetadata(): Promise<BibleMetadata | null> {
  if (metadataCache) {
    return metadataCache;
  }

  try {
    const response = await fetch('/bible/es/metadata.json');
    if (!response.ok) {
      console.error('Failed to load Bible metadata');
      return null;
    }
    metadataCache = await response.json();
    return metadataCache;
  } catch (error) {
    console.error('Error loading Bible metadata:', error);
    return null;
  }
}

/**
 * Fetches a specific chapter (Spanish only)
 */
export async function fetchChapter(bookSlug: string, chapter: number): Promise<ChapterData | null> {
  try {
    const response = await fetch(`/bible/es/${bookSlug}/${chapter}.json`);
    if (!response.ok) {
      console.error(`Chapter not found: ${bookSlug}/${chapter}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading chapter ${bookSlug}/${chapter}:`, error);
    return null;
  }
}

/**
 * Converts a book name to a URL-friendly slug
 */
export function bookNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Finds a book by its slug in the metadata
 */
export function findBookBySlug(metadata: BibleMetadata, slug: string): BookInfo | undefined {
  const normalizedSlug = slug.toLowerCase();
  return metadata.books.find(book => book.slug.toLowerCase() === normalizedSlug);
}

/**
 * Finds a book by its display name in the metadata
 */
export function findBookByName(metadata: BibleMetadata, name: string): BookInfo | undefined {
  const normalizedName = name.toLowerCase();
  return metadata.books.find(book => book.name.toLowerCase() === normalizedName);
}
