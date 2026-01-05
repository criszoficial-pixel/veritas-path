import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { VerseNote } from '@/services/userDataService';

interface NoteEditorProps {
  isOpen: boolean;
  onClose: () => void;
  reference: string;
  verseText: string;
  verseStart: number;
  verseEnd: number;
  existingNote: VerseNote | null;
  onSave: (noteContent: string) => void;
  onDelete: () => void;
}

export const NoteEditor = ({
  isOpen,
  onClose,
  reference,
  verseText,
  verseStart,
  verseEnd,
  existingNote,
  onSave,
  onDelete,
}: NoteEditorProps) => {
  const [noteContent, setNoteContent] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNoteContent(existingNote?.note || '');
    }
  }, [isOpen, existingNote]);

  const handleSave = () => {
    const trimmedContent = noteContent.trim();
    if (!trimmedContent) {
      toast.error('La nota no puede estar vacía');
      return;
    }
    onSave(trimmedContent);
    toast.success('Nota guardada');
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    toast.success('Nota eliminada');
    onClose();
  };

  const verseLabel = verseStart === verseEnd ? verseStart : `${verseStart}-${verseEnd}`;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
        <SheetHeader className="text-left pb-4">
          <SheetTitle className="text-lg font-bold text-foreground">
            {existingNote ? 'Editar nota' : 'Nueva nota'}
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-4">
          {/* Verse reference and text */}
          <div className="rounded-xl bg-muted/50 p-4 space-y-2">
            <p className="text-sm font-semibold text-primary">{reference}</p>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
              <sup className="text-xs font-bold mr-1">{verseLabel}</sup>
              {verseText}
            </p>
          </div>

          {/* Note textarea */}
          <Textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Escribe tu reflexión personal..."
            className="min-h-[200px] resize-none text-base"
            autoFocus
          />

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            {existingNote && (
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleDelete}
                className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Guardar
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
