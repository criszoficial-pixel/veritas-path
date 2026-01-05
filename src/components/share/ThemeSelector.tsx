import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { type ImageTheme, getThemePreviewColors } from '@/services/verseImageService';

interface ThemeSelectorProps {
  selected: ImageTheme;
  onSelect: (theme: ImageTheme) => void;
}

const themeOptions: { id: ImageTheme; name: string }[] = [
  { id: 'divine', name: 'Divino' },
  { id: 'sunrise', name: 'Aurora' },
  { id: 'night', name: 'Noche' },
  { id: 'nature', name: 'Naturaleza' },
  { id: 'minimal', name: 'Minimal' },
];

export const ThemeSelector = ({ selected, onSelect }: ThemeSelectorProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {themeOptions.map((theme) => {
        const colors = getThemePreviewColors(theme.id);
        const isSelected = selected === theme.id;

        return (
          <button
            key={theme.id}
            onClick={() => onSelect(theme.id)}
            className={cn(
              'relative flex flex-col items-center gap-1.5 p-2 rounded-lg border-2 transition-all min-w-[70px]',
              isSelected
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-border hover:border-primary/50'
            )}
          >
            <div
              className="w-12 h-12 rounded-md flex items-center justify-center relative overflow-hidden"
              style={{ backgroundColor: colors.bg }}
            >
              <span
                className="text-xs font-scripture italic"
                style={{ color: colors.text }}
              >
                Aa
              </span>
              <div
                className="absolute bottom-1 right-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.accent }}
              />
              {isSelected && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{theme.name}</span>
          </button>
        );
      })}
    </div>
  );
};
