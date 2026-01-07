export interface BibleCollection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  benefit?: string;
  coverColor: string;
  accentColor: string;
  language: string;
  metadataPath: string;
  type: 'full-bible' | 'collection';
  booksFilter?: number[];
  icon: 'cross' | 'scroll' | 'heart' | 'sparkles' | 'book';
  bookCount?: number;
  badge?: string;
  featured?: boolean;
}

export interface CollectionsData {
  collections: BibleCollection[];
}
