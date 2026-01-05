import { useState, useEffect, useCallback } from 'react';
import {
  getNotesForChapter,
  addNote,
  updateNote,
  deleteNote,
  type VerseNote,
} from '@/services/userDataService';

export function useVerseNotes(bookSlug: string, chapter: number) {
  const [notes, setNotes] = useState<VerseNote[]>([]);

  // Load notes for the chapter
  const refresh = useCallback(() => {
    const chapterNotes = getNotesForChapter(bookSlug, chapter);
    setNotes(chapterNotes);
  }, [bookSlug, chapter]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Check if a verse has a note (is within any note range)
  const hasNote = useCallback((verseNumber: number): boolean => {
    return notes.some(note => {
      const start = note.verseStart ?? note.verseNumber ?? 0;
      const end = note.verseEnd ?? note.verseNumber ?? 0;
      return verseNumber >= start && verseNumber <= end;
    });
  }, [notes]);

  // Get note that contains a specific verse
  const getNote = useCallback((verseNumber: number): VerseNote | null => {
    return notes.find(note => {
      const start = note.verseStart ?? note.verseNumber ?? 0;
      const end = note.verseEnd ?? note.verseNumber ?? 0;
      return verseNumber >= start && verseNumber <= end;
    }) || null;
  }, [notes]);

  // Get note for a specific range
  const getNoteForRange = useCallback((verseStart: number, verseEnd: number): VerseNote | null => {
    return notes.find(note => {
      const start = note.verseStart ?? note.verseNumber ?? 0;
      const end = note.verseEnd ?? note.verseNumber ?? 0;
      return start === verseStart && end === verseEnd;
    }) || null;
  }, [notes]);

  // Save or update a note for a verse range
  const saveNote = useCallback((
    verseStart: number,
    verseEnd: number,
    noteContent: string,
    bookName: string,
    verseText: string
  ): VerseNote => {
    const existingNote = getNoteForRange(verseStart, verseEnd);
    const reference = verseStart === verseEnd 
      ? `${bookName} ${chapter}:${verseStart}`
      : `${bookName} ${chapter}:${verseStart}-${verseEnd}`;
    
    if (existingNote) {
      const updated = updateNote(existingNote.id, noteContent);
      refresh();
      return updated || existingNote;
    } else {
      const newNote = addNote({
        bookSlug,
        bookName,
        chapter,
        verseStart,
        verseEnd,
        verseText,
        reference,
        note: noteContent,
      });
      refresh();
      return newNote;
    }
  }, [bookSlug, chapter, getNoteForRange, refresh]);

  // Remove a note by its ID
  const removeNote = useCallback((noteId: string): void => {
    deleteNote(noteId);
    refresh();
  }, [refresh]);

  return {
    notes,
    hasNote,
    getNote,
    getNoteForRange,
    saveNote,
    removeNote,
    refresh,
    count: notes.length,
  };
}
