import type { ChapterAudioData } from '@/types/audio';
import type { LanguageCode } from '@/types/language';

// Cache for loaded audio data by language
const audioCache = new Map<string, ChapterAudioData>();

// Sample sync data for Genesis 1 in Spanish (simulating Chatterbox + Whisper output)
const genesisChapter1Es: ChapterAudioData = {
  bookName: 'Génesis',
  chapter: 1,
  audioUrl: '/audio/es/genesis-1.mp3',
  duration: 45,
  verses: [
    {
      number: 1,
      text: 'En el principio creó Dios los cielos y la tierra.',
      words: [
        { word: 'En', start: 0.0, end: 0.25 },
        { word: 'el', start: 0.25, end: 0.45 },
        { word: 'principio', start: 0.45, end: 1.1 },
        { word: 'creó', start: 1.1, end: 1.5 },
        { word: 'Dios', start: 1.5, end: 1.9 },
        { word: 'los', start: 1.9, end: 2.1 },
        { word: 'cielos', start: 2.1, end: 2.6 },
        { word: 'y', start: 2.6, end: 2.75 },
        { word: 'la', start: 2.75, end: 2.9 },
        { word: 'tierra.', start: 2.9, end: 3.5 },
      ],
    },
    {
      number: 2,
      text: 'Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas.',
      words: [
        { word: 'Y', start: 3.5, end: 3.65 },
        { word: 'la', start: 3.65, end: 3.8 },
        { word: 'tierra', start: 3.8, end: 4.2 },
        { word: 'estaba', start: 4.2, end: 4.7 },
        { word: 'desordenada', start: 4.7, end: 5.5 },
        { word: 'y', start: 5.5, end: 5.65 },
        { word: 'vacía,', start: 5.65, end: 6.2 },
        { word: 'y', start: 6.2, end: 6.35 },
        { word: 'las', start: 6.35, end: 6.55 },
        { word: 'tinieblas', start: 6.55, end: 7.2 },
        { word: 'estaban', start: 7.2, end: 7.7 },
        { word: 'sobre', start: 7.7, end: 8.1 },
        { word: 'la', start: 8.1, end: 8.25 },
        { word: 'faz', start: 8.25, end: 8.55 },
        { word: 'del', start: 8.55, end: 8.75 },
        { word: 'abismo,', start: 8.75, end: 9.4 },
        { word: 'y', start: 9.4, end: 9.55 },
        { word: 'el', start: 9.55, end: 9.7 },
        { word: 'Espíritu', start: 9.7, end: 10.3 },
        { word: 'de', start: 10.3, end: 10.45 },
        { word: 'Dios', start: 10.45, end: 10.9 },
        { word: 'se', start: 10.9, end: 11.05 },
        { word: 'movía', start: 11.05, end: 11.5 },
        { word: 'sobre', start: 11.5, end: 11.9 },
        { word: 'la', start: 11.9, end: 12.05 },
        { word: 'faz', start: 12.05, end: 12.35 },
        { word: 'de', start: 12.35, end: 12.5 },
        { word: 'las', start: 12.5, end: 12.7 },
        { word: 'aguas.', start: 12.7, end: 13.3 },
      ],
    },
    {
      number: 3,
      text: 'Y dijo Dios: Sea la luz; y fue la luz.',
      words: [
        { word: 'Y', start: 13.3, end: 13.45 },
        { word: 'dijo', start: 13.45, end: 13.85 },
        { word: 'Dios:', start: 13.85, end: 14.35 },
        { word: 'Sea', start: 14.35, end: 14.7 },
        { word: 'la', start: 14.7, end: 14.85 },
        { word: 'luz;', start: 14.85, end: 15.4 },
        { word: 'y', start: 15.4, end: 15.55 },
        { word: 'fue', start: 15.55, end: 15.85 },
        { word: 'la', start: 15.85, end: 16.0 },
        { word: 'luz.', start: 16.0, end: 16.6 },
      ],
    },
    {
      number: 4,
      text: 'Y vio Dios que la luz era buena; y separó Dios la luz de las tinieblas.',
      words: [
        { word: 'Y', start: 16.6, end: 16.75 },
        { word: 'vio', start: 16.75, end: 17.05 },
        { word: 'Dios', start: 17.05, end: 17.5 },
        { word: 'que', start: 17.5, end: 17.7 },
        { word: 'la', start: 17.7, end: 17.85 },
        { word: 'luz', start: 17.85, end: 18.2 },
        { word: 'era', start: 18.2, end: 18.5 },
        { word: 'buena;', start: 18.5, end: 19.1 },
        { word: 'y', start: 19.1, end: 19.25 },
        { word: 'separó', start: 19.25, end: 19.8 },
        { word: 'Dios', start: 19.8, end: 20.25 },
        { word: 'la', start: 20.25, end: 20.4 },
        { word: 'luz', start: 20.4, end: 20.75 },
        { word: 'de', start: 20.75, end: 20.9 },
        { word: 'las', start: 20.9, end: 21.1 },
        { word: 'tinieblas.', start: 21.1, end: 21.9 },
      ],
    },
    {
      number: 5,
      text: 'Y llamó Dios a la luz Día, y a las tinieblas llamó Noche. Y fue la tarde y la mañana un día.',
      words: [
        { word: 'Y', start: 21.9, end: 22.05 },
        { word: 'llamó', start: 22.05, end: 22.5 },
        { word: 'Dios', start: 22.5, end: 22.95 },
        { word: 'a', start: 22.95, end: 23.1 },
        { word: 'la', start: 23.1, end: 23.25 },
        { word: 'luz', start: 23.25, end: 23.6 },
        { word: 'Día,', start: 23.6, end: 24.1 },
        { word: 'y', start: 24.1, end: 24.25 },
        { word: 'a', start: 24.25, end: 24.4 },
        { word: 'las', start: 24.4, end: 24.6 },
        { word: 'tinieblas', start: 24.6, end: 25.2 },
        { word: 'llamó', start: 25.2, end: 25.65 },
        { word: 'Noche.', start: 25.65, end: 26.3 },
        { word: 'Y', start: 26.3, end: 26.45 },
        { word: 'fue', start: 26.45, end: 26.75 },
        { word: 'la', start: 26.75, end: 26.9 },
        { word: 'tarde', start: 26.9, end: 27.35 },
        { word: 'y', start: 27.35, end: 27.5 },
        { word: 'la', start: 27.5, end: 27.65 },
        { word: 'mañana', start: 27.65, end: 28.2 },
        { word: 'un', start: 28.2, end: 28.4 },
        { word: 'día.', start: 28.4, end: 29.0 },
      ],
    },
  ],
};

// Sample sync data for Genesis 1 in English
const genesisChapter1En: ChapterAudioData = {
  bookName: 'Genesis',
  chapter: 1,
  audioUrl: '/audio/en/genesis-1.mp3',
  duration: 42,
  verses: [
    {
      number: 1,
      text: 'In the beginning God created the heaven and the earth.',
      words: [
        { word: 'In', start: 0.0, end: 0.2 },
        { word: 'the', start: 0.2, end: 0.4 },
        { word: 'beginning', start: 0.4, end: 1.0 },
        { word: 'God', start: 1.0, end: 1.4 },
        { word: 'created', start: 1.4, end: 1.9 },
        { word: 'the', start: 1.9, end: 2.1 },
        { word: 'heaven', start: 2.1, end: 2.5 },
        { word: 'and', start: 2.5, end: 2.7 },
        { word: 'the', start: 2.7, end: 2.85 },
        { word: 'earth.', start: 2.85, end: 3.4 },
      ],
    },
    {
      number: 2,
      text: 'And the earth was without form, and void; and darkness was upon the face of the deep.',
      words: [
        { word: 'And', start: 3.4, end: 3.6 },
        { word: 'the', start: 3.6, end: 3.75 },
        { word: 'earth', start: 3.75, end: 4.1 },
        { word: 'was', start: 4.1, end: 4.35 },
        { word: 'without', start: 4.35, end: 4.8 },
        { word: 'form,', start: 4.8, end: 5.2 },
        { word: 'and', start: 5.2, end: 5.4 },
        { word: 'void;', start: 5.4, end: 5.9 },
        { word: 'and', start: 5.9, end: 6.1 },
        { word: 'darkness', start: 6.1, end: 6.6 },
        { word: 'was', start: 6.6, end: 6.85 },
        { word: 'upon', start: 6.85, end: 7.2 },
        { word: 'the', start: 7.2, end: 7.35 },
        { word: 'face', start: 7.35, end: 7.7 },
        { word: 'of', start: 7.7, end: 7.85 },
        { word: 'the', start: 7.85, end: 8.0 },
        { word: 'deep.', start: 8.0, end: 8.5 },
      ],
    },
    {
      number: 3,
      text: 'And God said, Let there be light: and there was light.',
      words: [
        { word: 'And', start: 8.5, end: 8.7 },
        { word: 'God', start: 8.7, end: 9.0 },
        { word: 'said,', start: 9.0, end: 9.4 },
        { word: 'Let', start: 9.4, end: 9.65 },
        { word: 'there', start: 9.65, end: 9.9 },
        { word: 'be', start: 9.9, end: 10.1 },
        { word: 'light:', start: 10.1, end: 10.6 },
        { word: 'and', start: 10.6, end: 10.8 },
        { word: 'there', start: 10.8, end: 11.05 },
        { word: 'was', start: 11.05, end: 11.3 },
        { word: 'light.', start: 11.3, end: 11.8 },
      ],
    },
  ],
};

// Static data maps by language
const audioSyncDataMap: Record<string, Record<string, ChapterAudioData>> = {
  es: {
    'Génesis-1': genesisChapter1Es,
  },
  en: {
    'Genesis-1': genesisChapter1En,
  },
};

// Get chapter audio data (sync version for backward compat)
export function getChapterAudioData(
  bookName: string,
  chapter: number,
  languageCode: LanguageCode = 'es'
): ChapterAudioData | null {
  const key = `${bookName}-${chapter}`;
  const langData = audioSyncDataMap[languageCode];
  return langData?.[key] || null;
}

// Check if audio data exists
export function hasAudioData(
  bookName: string,
  chapter: number,
  languageCode: LanguageCode = 'es'
): boolean {
  const key = `${bookName}-${chapter}`;
  return !!audioSyncDataMap[languageCode]?.[key];
}

// Async fetch for dynamic loading (future: load from CDN/Storage)
export async function fetchChapterAudioData(
  bookName: string,
  chapter: number,
  languageCode: LanguageCode = 'es'
): Promise<ChapterAudioData | null> {
  const cacheKey = `${languageCode}-${bookName}-${chapter}`;
  
  // Check cache first
  if (audioCache.has(cacheKey)) {
    return audioCache.get(cacheKey)!;
  }

  // Try static data first
  const staticData = getChapterAudioData(bookName, chapter, languageCode);
  if (staticData) {
    audioCache.set(cacheKey, staticData);
    return staticData;
  }

  // Future: fetch from CDN
  // try {
  //   const response = await fetch(`/audio/${languageCode}/${bookName}/chapter-${chapter}.json`);
  //   if (!response.ok) return null;
  //   const data = await response.json();
  //   audioCache.set(cacheKey, data);
  //   return data;
  // } catch {
  //   return null;
  // }

  return null;
}
