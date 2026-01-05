import { cn } from '@/lib/utils';
import { Square, Smartphone, Monitor } from 'lucide-react';
import { type ImageFormat } from '@/services/verseImageService';

interface FormatSelectorProps {
  selected: ImageFormat;
  onSelect: (format: ImageFormat) => void;
}

const formatOptions: { id: ImageFormat; name: string; icon: typeof Square; description: string }[] = [
  { id: 'square', name: 'Cuadrado', icon: Square, description: 'Instagram' },
  { id: 'story', name: 'Historia', icon: Smartphone, description: 'Stories' },
  { id: 'wide', name: 'Ancho', icon: Monitor, description: 'Facebook' },
];

export const FormatSelector = ({ selected, onSelect }: FormatSelectorProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {formatOptions.map((format) => {
        const Icon = format.icon;
        const isSelected = selected === format.id;

        return (
          <button
            key={format.id}
            onClick={() => onSelect(format.id)}
            className={cn(
              'flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all',
              isSelected
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            )}
          >
            <Icon className={cn('h-5 w-5', isSelected ? 'text-primary' : 'text-muted-foreground')} />
            <span className={cn('text-sm font-medium', isSelected ? 'text-primary' : 'text-foreground')}>
              {format.name}
            </span>
            <span className="text-xs text-muted-foreground">{format.description}</span>
          </button>
        );
      })}
    </div>
  );
};
