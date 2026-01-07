import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings, Lock, Pencil, Trash2, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  color: string;
}

interface CategoryManageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onUpdate: (id: string, name: string, color: string) => void;
  onDelete: (id: string) => void;
  isProtected: (id: string) => boolean;
}

const colorOptions = [
  { name: 'Amarillo', value: 'hsl(45, 93%, 47%)' },
  { name: 'Azul', value: 'hsl(217, 91%, 60%)' },
  { name: 'Verde', value: 'hsl(142, 71%, 45%)' },
  { name: 'Rosa', value: 'hsl(330, 81%, 60%)' },
  { name: 'Morado', value: 'hsl(262, 83%, 58%)' },
];

export function CategoryManageDialog({
  isOpen,
  onClose,
  categories,
  onUpdate,
  onDelete,
  isProtected,
}: CategoryManageDialogProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const startEditing = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
    setEditColor(category.color);
    setDeleteConfirmId(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
    setEditColor('');
  };

  const saveEditing = () => {
    if (editingId && editName.trim()) {
      onUpdate(editingId, editName.trim(), editColor);
      cancelEditing();
    }
  };

  const handleDelete = (categoryId: string) => {
    if (deleteConfirmId === categoryId) {
      onDelete(categoryId);
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(categoryId);
      setEditingId(null);
    }
  };

  const handleClose = () => {
    cancelEditing();
    setDeleteConfirmId(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Gestionar categorías
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2 py-2 max-h-80 overflow-y-auto">
          {categories.map((category) => {
            const isEditing = editingId === category.id;
            const isDeleting = deleteConfirmId === category.id;
            const protected_ = isProtected(category.id);

            if (isEditing) {
              return (
                <div
                  key={category.id}
                  className="p-3 rounded-xl border border-primary bg-primary/5 space-y-3"
                >
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Nombre de la categoría"
                    autoFocus
                    disabled={protected_}
                  />
                  <div className="flex gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setEditColor(color.value)}
                        className={cn(
                          'w-8 h-8 rounded-full transition-all',
                          editColor === color.value
                            ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                            : 'hover:scale-110'
                        )}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button size="sm" variant="ghost" onClick={cancelEditing}>
                      <X className="w-4 h-4 mr-1" />
                      Cancelar
                    </Button>
                    <Button size="sm" onClick={saveEditing} disabled={!editName.trim()}>
                      <Check className="w-4 h-4 mr-1" />
                      Guardar
                    </Button>
                  </div>
                </div>
              );
            }

            if (isDeleting) {
              return (
                <div
                  key={category.id}
                  className="p-3 rounded-xl border border-destructive bg-destructive/5 space-y-3"
                >
                  <p className="text-sm text-center">
                    ¿Eliminar "{category.name}"?
                    <br />
                    <span className="text-muted-foreground text-xs">
                      Los versículos guardados se mantendrán sin categoría.
                    </span>
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setDeleteConfirmId(null)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(category.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={category.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/50 transition-all"
              >
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: category.color }}
                />
                <span className="font-medium flex-1">{category.name}</span>
                {protected_ ? (
                  <Lock className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <div className="flex gap-1">
                    <button
                      onClick={() => startEditing(category)}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Button variant="outline" onClick={handleClose} className="w-full">
          Cerrar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
