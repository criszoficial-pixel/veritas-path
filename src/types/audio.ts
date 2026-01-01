export interface WordTimestamp {
  word: string;
  start: number; // seconds
  end: number;   // seconds
}

export interface VerseSyncData {
  number: number;
  text: string;
  words: WordTimestamp[];
}

export interface ChapterAudioData {
  bookName: string;
  chapter: number;
  audioUrl: string;
  duration: number; // total seconds
  verses: VerseSyncData[];
}

export interface AudioPlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
}

export type PlaybackSpeed = 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2;

export interface SleepTimerOption {
  label: string;
  minutes: number | 'end-of-chapter';
}
