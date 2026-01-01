import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/i18n/translations';

type NestedKeyOf<T> = T extends object
  ? { [K in keyof T]: K extends string 
      ? T[K] extends object 
        ? `${K}.${NestedKeyOf<T[K]>}` 
        : K 
      : never 
    }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<typeof translations.es>;

export function useTranslation() {
  const { language } = useLanguage();
  
  const t = (key: TranslationKey): string => {
    const keys = key.split('.');
    let value: unknown = translations[language.code as keyof typeof translations] || translations.es;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Fallback to Spanish if key not found
        value = translations.es;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = (value as Record<string, unknown>)[fallbackKey];
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return { t, language };
}
