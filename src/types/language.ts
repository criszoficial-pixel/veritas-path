export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  bibleVersion: string;
  rtl: boolean;
  available: boolean;
}

export type LanguageCode = 
  | 'ar' | 'da' | 'de' | 'el' | 'en' | 'es' | 'fi' | 'fr' 
  | 'he' | 'hi' | 'it' | 'ja' | 'ko' | 'ms' | 'nl' | 'no' 
  | 'pl' | 'pt' | 'ru' | 'sv' | 'sw' | 'tr' | 'zh';
