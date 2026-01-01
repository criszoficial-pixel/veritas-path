import type { ChapterAudioData } from '@/types/audio';

// Sample sync data for Genesis 1 (simulating Chatterbox + Whisper output)
// In production, this would come from pre-generated JSON files
const genesisChapter1: ChapterAudioData = {
  bookName: 'Génesis',
  chapter: 1,
  audioUrl: '/audio/genesis-1.mp3', // Placeholder - would be actual pre-generated audio
  duration: 45, // seconds for demo
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

// Storage for audio sync data
const audioSyncDataMap: Record<string, ChapterAudioData> = {
  'Génesis-1': genesisChapter1,
};

export function getChapterAudioData(
  bookName: string,
  chapter: number
): ChapterAudioData | null {
  const key = `${bookName}-${chapter}`;
  return audioSyncDataMap[key] || null;
}

export function hasAudioData(bookName: string, chapter: number): boolean {
  const key = `${bookName}-${chapter}`;
  return key in audioSyncDataMap;
}
