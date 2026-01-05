import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, ArrowRight, History } from 'lucide-react';
import { parseReference, getBookBySlug } from '@/services/searchService';
import { getReadingHistory } from '@/services/userDataService';
import type { LanguageCode } from '@/types/language';

const Buscar = () => {
  const navigate = useNavigate();
  const languageCode: LanguageCode = 'es';
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const recentHistory = useMemo(() => getReadingHistory(5), []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setError('');
    const parsed = parseReference(query);
    
    if (parsed) {
      // Verify the book exists
      const book = await getBookBySlug(languageCode, parsed.bookSlug);
      if (book) {
        navigate(`/leer/${book.slug}/${parsed.chapter}`);
        return;
      }
    }
    
    // If not a valid reference, show error
    setError('No se encontró la referencia. Intenta con formato: "Juan 3:16" o "Salmos 23"');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
      
      <main className="container px-4 py-6 space-y-8">
        {/* Search Input */}
        <section className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar referencia (ej: Juan 3:16)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 h-12 text-base"
            />
          </div>
          <Button onClick={handleSearch} className="w-full">
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
        </section>

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
      </main>

      <BottomNav />
    </div>
  );
};

export default Buscar;
