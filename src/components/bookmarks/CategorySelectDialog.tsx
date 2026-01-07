import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Folder, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  color: string;
}

interface CategorySelectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
  onCreateCategory: (name: string) => string;
}

const colorOptions = [
  { name: 'Amarillo', value: 'hsl(45, 93%, 47%)' },
  { name: 'Azul', value: 'hsl(217, 91%, 60%)' },
  { name: 'Verde', value: 'hsl(142, 71%, 45%)' },
  { name: 'Rosa', value: 'hsl(330, 81%, 60%)' },
  { name: 'Morado', value: 'hsl(262, 83%, 58%)' },
];

export function CategorySelectDialog({
  isOpen,
  onClose,
  categories,
  onSelectCategory,
  onCreateCategory,
}: CategorySelectDialogProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value);

  const handleSave = () => {
    if (isCreating && newCategoryName.trim()) {
      const newId = onCreateCategory(newCategoryName.trim());
      onSelectCategory(newId);
    } else if (selectedId) {
      onSelectCategory(selectedId);
    }
    handleClose();
  };

  const handleClose = () => {
    setSelectedId(null);
    setIsCreating(false);
    setNewCategoryName('');
    setSelectedColor(colorOptions[0].value);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Folder className="w-5 h-5 text-primary" />
            Guardar en...
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {/* Existing categories */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedId(category.id);
                setIsCreating(false);
              }}
              className={cn(
                'w-full flex items-center gap-3 p-3 rounded-xl border transition-all',
                selectedId === category.id && !isCreating
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              )}
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: category.color }}
              />
              <span className="font-medium text-left flex-1">{category.name}</span>
              {selectedId === category.id && !isCreating && (
                <Check className="w-5 h-5 text-primary" />
              )}
            </button>
          ))}

          {/* Create new category */}
          {!isCreating ? (
            <button
              onClick={() => {
                setIsCreating(true);
                setSelectedId(null);
              }}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-dashed border-border hover:border-primary/50 hover:bg-muted/50 transition-all"
            >
              <Plus className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">Crear nueva categoría</span>
            </button>
          ) : (
            <div className="space-y-3 p-3 rounded-xl border border-primary bg-primary/5">
              <Input
                placeholder="Nombre de la categoría"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={cn(
                      'w-8 h-8 rounded-full transition-all',
                      selectedColor === color.value
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                        : 'hover:scale-110'
                    )}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={!selectedId && (!isCreating || !newCategoryName.trim())}
            className="flex-1"
          >
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
