import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ReaderSettingsProps {
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  onFontSizeChange: (size: 'sm' | 'base' | 'lg' | 'xl') => void;
}

const fontSizeOptions: { value: 'sm' | 'base' | 'lg' | 'xl'; label: string; preview: string }[] = [
  { value: 'sm', label: 'Pequeño', preview: 'Aa' },
  { value: 'base', label: 'Normal', preview: 'Aa' },
  { value: 'lg', label: 'Grande', preview: 'Aa' },
  { value: 'xl', label: 'Muy grande', preview: 'Aa' },
];

export const ReaderSettings = ({ fontSize, onFontSizeChange }: ReaderSettingsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Settings2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Tamaño de texto</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {fontSizeOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onFontSizeChange(option.value)}
            className={cn(
              'flex items-center justify-between cursor-pointer',
              fontSize === option.value && 'bg-primary/10 text-primary'
            )}
          >
            <span>{option.label}</span>
            <span className={cn(
              'font-scripture',
              option.value === 'sm' && 'text-sm',
              option.value === 'base' && 'text-base',
              option.value === 'lg' && 'text-lg',
              option.value === 'xl' && 'text-xl'
            )}>
              {option.preview}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
