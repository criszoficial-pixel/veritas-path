export interface BookSummary {
  shortDescription: string;
  summary: string;
  themes: string[];
}

export type BookSummaries = Record<string, BookSummary>;
