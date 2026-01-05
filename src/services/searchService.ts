// Service for searching Bible references and text

import { fetchBibleMetadata, fetchChapter } from '@/services/bibleDataService';
import type { LanguageCode } from '@/types/language';
import type { BookInfo } from '@/types/bible';

export interface SearchResult {
  bookSlug: string;
  bookName: string;
  chapter: number;
  verseNumber: number;
  verseText: string;
  matchedText: string;
}

export interface ReferenceParseResult {
  bookSlug: string;
  bookName: string;
  chapter: number;
  verse?: number;
  valid: boolean;
}

// Common Bible book name variations (Spanish)
const bookAliases: Record<string, string> = {
  'gen': 'genesis',
  'gén': 'genesis',
  'génesis': 'genesis',
  'ex': 'exodo',
  'éx': 'exodo',
  'éxodo': 'exodo',
  'exodo': 'exodo',
  'lev': 'levitico',
  'lv': 'levitico',
  'num': 'numeros',
  'nm': 'numeros',
  'dt': 'deuteronomio',
  'deut': 'deuteronomio',
  'jos': 'josue',
  'jue': 'jueces',
  'rut': 'rut',
  '1sam': '1-samuel',
  '1 sam': '1-samuel',
  '2sam': '2-samuel',
  '2 sam': '2-samuel',
  '1rey': '1-reyes',
  '1 rey': '1-reyes',
  '2rey': '2-reyes',
  '2 rey': '2-reyes',
  '1cr': '1-cronicas',
  '1 cr': '1-cronicas',
  '2cr': '2-cronicas',
  '2 cr': '2-cronicas',
  'esd': 'esdras',
  'neh': 'nehemias',
  'est': 'ester',
  'job': 'job',
  'sal': 'salmos',
  'salmo': 'salmos',
  'prov': 'proverbios',
  'pr': 'proverbios',
  'ecl': 'eclesiastes',
  'ec': 'eclesiastes',
  'cnt': 'cantares',
  'cantar': 'cantares',
  'is': 'isaias',
  'isa': 'isaias',
  'jer': 'jeremias',
  'lam': 'lamentaciones',
  'ez': 'ezequiel',
  'dn': 'daniel',
  'dan': 'daniel',
  'os': 'oseas',
  'jl': 'joel',
  'am': 'amos',
  'abd': 'abdias',
  'jon': 'jonas',
  'miq': 'miqueas',
  'nah': 'nahum',
  'hab': 'habacuc',
  'sof': 'sofonias',
  'hag': 'hageo',
  'zac': 'zacarias',
  'mal': 'malaquias',
  'mt': 'mateo',
  'mat': 'mateo',
  'mc': 'marcos',
  'mr': 'marcos',
  'lc': 'lucas',
  'jn': 'juan',
  'hch': 'hechos',
  'hec': 'hechos',
  'ro': 'romanos',
  'rom': 'romanos',
  '1cor': '1-corintios',
  '1 cor': '1-corintios',
  '2cor': '2-corintios',
  '2 cor': '2-corintios',
  'gal': 'galatas',
  'gl': 'galatas',
  'ef': 'efesios',
  'fil': 'filipenses',
  'col': 'colosenses',
  '1tes': '1-tesalonicenses',
  '1 tes': '1-tesalonicenses',
  '2tes': '2-tesalonicenses',
  '2 tes': '2-tesalonicenses',
  '1tim': '1-timoteo',
  '1 tim': '1-timoteo',
  '2tim': '2-timoteo',
  '2 tim': '2-timoteo',
  'tit': 'tito',
  'flm': 'filemon',
  'heb': 'hebreos',
  'stg': 'santiago',
  '1pe': '1-pedro',
  '1 pe': '1-pedro',
  '2pe': '2-pedro',
  '2 pe': '2-pedro',
  '1jn': '1-juan',
  '1 jn': '1-juan',
  '2jn': '2-juan',
  '2 jn': '2-juan',
  '3jn': '3-juan',
  '3 jn': '3-juan',
  'jud': 'judas',
  'ap': 'apocalipsis',
  'apoc': 'apocalipsis',
};

// Parse a biblical reference like "Juan 3:16" or "Salmos 23"
export function parseReference(input: string): ReferenceParseResult | null {
  const normalized = input.toLowerCase().trim();
  
  // Pattern: "Book Chapter:Verse" or "Book Chapter"
  const pattern = /^(.+?)\s*(\d+)\s*(?::(\d+))?$/;
  const match = normalized.match(pattern);
  
  if (!match) return null;
  
  const [, bookPart, chapterStr, verseStr] = match;
  const bookNormalized = bookPart.trim().toLowerCase();
  
  // Try to find the book slug
  let bookSlug = bookAliases[bookNormalized];
  if (!bookSlug) {
    // Try direct match with slug format
    bookSlug = bookNormalized.replace(/\s+/g, '-');
  }
  
  const chapter = parseInt(chapterStr, 10);
  const verse = verseStr ? parseInt(verseStr, 10) : undefined;
  
  return {
    bookSlug,
    bookName: bookPart,
    chapter,
    verse,
    valid: true,
  };
}

// Search for text in a specific chapter
export async function searchInChapter(
  languageCode: LanguageCode,
  bookSlug: string,
  chapter: number,
  query: string
): Promise<SearchResult[]> {
  const chapterData = await fetchChapter(languageCode, bookSlug, chapter);
  if (!chapterData) return [];
  
  const results: SearchResult[] = [];
  const queryLower = query.toLowerCase();
  
  for (const verse of chapterData.verses) {
    if (verse.text.toLowerCase().includes(queryLower)) {
      results.push({
        bookSlug,
        bookName: chapterData.book,
        chapter,
        verseNumber: verse.number,
        verseText: verse.text,
        matchedText: query,
      });
    }
  }
  
  return results;
}

// Get book info by slug from metadata
export async function getBookBySlug(
  languageCode: LanguageCode,
  slug: string
): Promise<BookInfo | null> {
  const metadata = await fetchBibleMetadata(languageCode);
  if (!metadata) return null;
  
  return metadata.books.find((book) => book.slug === slug) || null;
}
