export interface BibleMetadata {
  version: string;
  versionShort: string;
  language: string;
  copyright: string;
  books: BookInfo[];
}

export interface BookInfo {
  id: number;
  name: string;
  shortName: string;
  slug: string;
  testament: 'AT' | 'NT';
  chapters: number;
}

export interface ChapterData {
  book: string;
  bookSlug: string;
  chapter: number;
  version: string;
  verses: VerseData[];
}

export interface VerseData {
  number: number;
  text: string;
}
