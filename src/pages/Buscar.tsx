import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BookOpen, ArrowRight, History, Loader2, X } from 'lucide-react';
import { parseReference, getBookBySlug } from '@/services/searchService';
import { getReadingHistory, addSearchToHistory, getSearchHistory } from '@/services/userDataService';
import { useTextSearch } from '@/hooks/useTextSearch';
import { SearchResultItem } from '@/components/search/SearchResultItem';

type SearchMode = 'reference' | 'text';
type Testament = 'all' | 'nt' | 'at';

const Buscar = () => {
  const navigate = useNavigate();
  const [searchMode, setSearchMode] = useState<SearchMode>('text');
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [testament, setTestament] = useState<Testament>('all');

  const { results, isSearching, hasSearched, search, clearResults, currentQuery } = useTextSearch({
    maxResults: 50,
  });

  const recentHistory = useMemo(() => getReadingHistory(5), []);
  const searchHistory = useMemo(() => getSearchHistory(5), []);

  // Trigger text search when query or testament changes
  useEffect(() => {
    if (searchMode === 'text' && query.trim().length >= 2) {
      search(query, testament);
    }
  }, [query, testament, searchMode, search]);

  const handleReferenceSearch = async () => {
    if (!query.trim()) return;
    
    setError('');
    const parsed = parseReference(query);
    
    if (parsed) {
      const book = await getBookBySlug(parsed.bookSlug);
      if (book) {
        navigate(`/leer/${book.slug}/${parsed.chapter}`);
        return;
      }
    }
    
    setError('No se encontró la referencia. Intenta con formato: "Juan 3:16" o "Salmos 23"');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchMode === 'reference') {
      handleReferenceSearch();
    }
  };

  const handleModeChange = (mode: string) => {
    setSearchMode(mode as SearchMode);
    setError('');
    if (mode === 'reference') {
      clearResults();
    }
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setError('');
  };

  const handleClearQuery = () => {
    setQuery('');
    clearResults();
  };

  // Save to history when user clicks a result
  useEffect(() => {
    if (hasSearched && results.length > 0 && currentQuery) {
      addSearchToHistory(currentQuery);
    }
  }, [hasSearched, results.length, currentQuery]);

  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery);
    setSearchMode('text');
  };

  const quickReferences = [
    { label: 'Juan 3:16', bookSlug: 'juan', chapter: 3 },
    { label: 'Salmos 23', bookSlug: 'salmos', chapter: 23 },
    { label: 'Romanos 8', bookSlug: 'romanos', chapter: 8 },
    { label: 'Génesis 1', bookSlug: 'genesis', chapter: 1 },
    { label: 'Mateo 5', bookSlug: 'mateo', chapter: 5 },
    { label: 'Filipenses 4', bookSlug: 'filipenses', chapter: 4 },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Buscar" showBack />
      
      <main className="container px-4 py-6 space-y-6">
        {/* Search Mode Tabs */}
        <Tabs value={searchMode} onValueChange={handleModeChange}>
          <TabsList className="w-full">
            <TabsTrigger value="text" className="flex-1">Por Texto</TabsTrigger>
            <TabsTrigger value="reference" className="flex-1">Por Referencia</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search Input */}
        <section className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder={searchMode === 'text' ? 'Buscar palabra (ej: amor)' : 'Buscar referencia (ej: Juan 3:16)'}
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-10 h-12 text-base"
            />
            {query && (
              <button
                onClick={handleClearQuery}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Testament Filter (only for text search) */}
          {searchMode === 'text' && (
            <div className="flex gap-2">
              <Button
                variant={testament === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTestament('all')}
                className="flex-1"
              >
                Toda la Biblia
              </Button>
              <Button
                variant={testament === 'nt' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTestament('nt')}
                className="flex-1"
              >
                Nuevo T.
              </Button>
              <Button
                variant={testament === 'at' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTestament('at')}
                className="flex-1"
              >
                Antiguo T.
              </Button>
            </div>
          )}

          {searchMode === 'reference' && (
            <div className="flex justify-center">
              <Button onClick={handleReferenceSearch}>
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>
          )}
          
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
        </section>

        {/* Text Search Results */}
        {searchMode === 'text' && (
          <>
            {isSearching && (
              <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Buscando...</span>
              </div>
            )}

            {!isSearching && hasSearched && results.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No se encontraron versículos con "{currentQuery}"</p>
              </div>
            )}

            {!isSearching && results.length > 0 && (
              <section className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {results.length} versículo{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                </p>
                <div className="space-y-2">
                  {results.map((result, idx) => (
                    <SearchResultItem
                      key={`${result.bookSlug}-${result.chapter}-${result.verseNumber}-${idx}`}
                      result={result}
                      query={currentQuery}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* Reference Search Content */}
        {searchMode === 'reference' && (
          <>
            {/* Search History */}
            {searchHistory.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <History className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-muted-foreground">Búsquedas recientes</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((historyQuery, idx) => (
                    <button
                      key={`${historyQuery}-${idx}`}
                      onClick={() => handleHistoryClick(historyQuery)}
                      className="px-3 py-1.5 text-sm rounded-full bg-muted hover:bg-accent transition-colors"
                    >
                      {historyQuery}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Quick References */}
            <section className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Referencias populares</h3>
              <div className="grid grid-cols-2 gap-2">
                {quickReferences.map((ref) => (
                  <button
                    key={ref.label}
                    onClick={() => navigate(`/leer/${ref.bookSlug}/${ref.chapter}`)}
                    className="flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:bg-accent transition-colors text-left"
                  >
                    <span className="text-sm font-medium">{ref.label}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </section>

            {/* Recent History */}
            {recentHistory.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <History className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-muted-foreground">Lectura reciente</h3>
                </div>
                <div className="space-y-2">
                  {recentHistory.map((item, idx) => (
                    <button
                      key={`${item.bookSlug}-${item.chapter}-${idx}`}
                      onClick={() => navigate(`/leer/${item.bookSlug}/${item.chapter}`)}
                      className="flex items-center justify-between w-full p-3 rounded-xl bg-card border border-border hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">
                          {item.bookName} {item.chapter}
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Buscar;
