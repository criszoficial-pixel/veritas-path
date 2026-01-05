export interface BibleCollection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverColor: string;
  accentColor: string;
  language: string;
  metadataPath: string;
  type: 'full-bible' | 'collection';
  booksFilter?: number[];
  icon: 'cross' | 'scroll' | 'heart' | 'sparkles' | 'book';
}

export interface CollectionsData {
  collections: BibleCollection[];
}
