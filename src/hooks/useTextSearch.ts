import { useState, useCallback, useRef } from 'react';
import { searchTextInBible, type TextSearchResult } from '@/services/searchService';
import type { LanguageCode } from '@/types/language';

interface UseTextSearchOptions {
  languageCode?: LanguageCode;
  maxResults?: number;
  debounceMs?: number;
}

export function useTextSearch(options: UseTextSearchOptions = {}) {
  const {
    languageCode = 'es',
    maxResults = 50,
    debounceMs = 300,
  } = options;

  const [results, setResults] = useState<TextSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const search = useCallback(
    async (query: string, testament: 'all' | 'nt' | 'at' = 'all') => {
      // Clear previous debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Abort previous search
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const trimmedQuery = query.trim();
      setCurrentQuery(trimmedQuery);

      if (trimmedQuery.length < 2) {
        setResults([]);
        setHasSearched(false);
        setIsSearching(false);
        return;
      }

      // Debounce the search
      debounceTimerRef.current = setTimeout(async () => {
        const controller = new AbortController();
        abortControllerRef.current = controller;

        setIsSearching(true);
        setHasSearched(true);

        try {
          const searchResults = await searchTextInBible(languageCode, trimmedQuery, {
            maxResults,
            testament,
            signal: controller.signal,
          });

          if (!controller.signal.aborted) {
            setResults(searchResults);
          }
        } catch (error) {
          if (error instanceof Error && error.name !== 'AbortError') {
            console.error('Search error:', error);
          }
        } finally {
          if (!controller.signal.aborted) {
            setIsSearching(false);
          }
        }
      }, debounceMs);
    },
    [languageCode, maxResults, debounceMs]
  );

  const clearResults = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setResults([]);
    setHasSearched(false);
    setIsSearching(false);
    setCurrentQuery('');
  }, []);

  return {
    results,
    isSearching,
    hasSearched,
    currentQuery,
    search,
    clearResults,
  };
}
