import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StickyNote, Search, Trash2, ChevronRight, BookOpen } from 'lucide-react';
import { getAllNotes, deleteNote, type VerseNote } from '@/services/userDataService';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const MisNotas = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<VerseNote[]>(getAllNotes());
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(note => {
    const query = searchQuery.toLowerCase();
    return (
      note.reference.toLowerCase().includes(query) ||
      note.note.toLowerCase().includes(query) ||
      note.verseText.toLowerCase().includes(query)
    );
  });

  const handleDelete = (noteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNote(noteId);
    setNotes(getAllNotes());
    toast.success('Nota eliminada');
  };

  const handleNavigateToVerse = (note: VerseNote) => {
    navigate(`/leer/${note.bookSlug}/${note.chapter}`);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Mis Notas" showBack />
      
      <main className="container px-4 py-6 space-y-6">
        {/* Search */}
        {notes.length > 0 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar en mis notas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        )}

        {/* Notes list */}
        {filteredNotes.length > 0 ? (
          <div className="space-y-3">
            {filteredNotes.map((note) => (
              <button
                key={note.id}
                onClick={() => handleNavigateToVerse(note)}
                className="w-full text-left rounded-xl bg-card p-4 border border-border/50 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0 space-y-2">
                    {/* Reference */}
                    <div className="flex items-center gap-2">
                      <StickyNote className="h-4 w-4 text-primary shrink-0" />
                      <span className="font-semibold text-primary text-sm">{note.reference}</span>
                    </div>
                    
                    {/* Verse text */}
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      "{note.verseText}"
                    </p>
                    
                    {/* Note content */}
                    <p className="text-sm text-foreground line-clamp-3">
                      {note.note}
                    </p>
                    
                    {/* Date */}
                    <p className="text-xs text-muted-foreground">
                      {formatDate(note.updatedAt)}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={(e) => handleDelete(note.id, e)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
              {searchQuery ? (
                <Search className="h-8 w-8 text-muted-foreground" />
              ) : (
                <StickyNote className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">
                {searchQuery ? 'Sin resultados' : 'Sin notas aún'}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {searchQuery 
                  ? 'No se encontraron notas que coincidan con tu búsqueda.' 
                  : 'Toca el número de un versículo mientras lees para agregar una nota personal.'
                }
              </p>
            </div>
            {!searchQuery && (
              <Button variant="outline" onClick={() => navigate('/leer')}>
                <BookOpen className="h-4 w-4 mr-2" />
                Ir a leer
              </Button>
            )}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default MisNotas;
