import { Check, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAllLanguages } from '@/data/languages';
import type { LanguageCode } from '@/types/language';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface LanguageSelectorProps {
  trigger?: React.ReactNode;
}

export function LanguageSelector({ trigger }: LanguageSelectorProps) {
  const { language, setLanguageCode } = useLanguage();
  const [open, setOpen] = useState(false);
  const allLanguages = getAllLanguages();

  const handleSelect = (code: LanguageCode) => {
    setLanguageCode(code);
    setOpen(false);
  };

  const defaultTrigger = (
    <Button variant="ghost" size="sm" className="gap-2">
      <Globe className="h-4 w-4" />
      <span>{language.flag}</span>
      <span className="hidden sm:inline">{language.nativeName}</span>
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {language.code === 'es' ? 'Seleccionar Idioma' : 'Select Language'}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="grid gap-1 p-1">
            {allLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code as LanguageCode)}
                className={cn(
                  'flex items-center justify-between w-full px-3 py-3 rounded-lg transition-colors text-left',
                  'hover:bg-secondary',
                  language.code === lang.code && 'bg-primary/10'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{lang.flag}</span>
                  <div>
                    <p className={cn(
                      'font-medium',
                      lang.rtl && 'font-arabic'
                    )}>
                      {lang.nativeName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {lang.bibleVersion}
                      {!lang.available && (
                        <span className="ml-2 text-accent">
                          ({language.code === 'es' ? 'Próximamente' : 'Coming soon'})
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                {language.code === lang.code && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
