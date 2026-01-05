import { useState, useEffect, useCallback } from 'react';
import {
  getNotesForChapter,
  addNote,
  updateNote,
  deleteNote,
  getNoteForVerse,
  type VerseNote,
} from '@/services/userDataService';

export function useVerseNotes(bookSlug: string, chapter: number) {
  const [notesMap, setNotesMap] = useState<Map<number, VerseNote>>(new Map());

  // Load notes for the chapter
  const refresh = useCallback(() => {
    const notes = getNotesForChapter(bookSlug, chapter);
    const map = new Map<number, VerseNote>();
    notes.forEach(note => map.set(note.verseNumber, note));
    setNotesMap(map);
  }, [bookSlug, chapter]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Check if a verse has a note
  const hasNote = useCallback((verseNumber: number): boolean => {
    return notesMap.has(verseNumber);
  }, [notesMap]);

  // Get note for a verse
  const getNote = useCallback((verseNumber: number): VerseNote | null => {
    return notesMap.get(verseNumber) || null;
  }, [notesMap]);

  // Save or update a note
  const saveNote = useCallback((
    verseNumber: number,
    noteContent: string,
    bookName: string,
    verseText: string
  ): VerseNote => {
    const existingNote = notesMap.get(verseNumber);
    
    if (existingNote) {
      const updated = updateNote(existingNote.id, noteContent);
      refresh();
      return updated || existingNote;
    } else {
      const newNote = addNote({
        bookSlug,
        bookName,
        chapter,
        verseNumber,
        verseText,
        reference: `${bookName} ${chapter}:${verseNumber}`,
        note: noteContent,
      });
      refresh();
      return newNote;
    }
  }, [bookSlug, chapter, notesMap, refresh]);

  // Remove a note
  const removeNote = useCallback((verseNumber: number): void => {
    const existingNote = notesMap.get(verseNumber);
    if (existingNote) {
      deleteNote(existingNote.id);
      refresh();
    }
  }, [notesMap, refresh]);

  return {
    notesMap,
    hasNote,
    getNote,
    saveNote,
    removeNote,
    refresh,
    count: notesMap.size,
  };
}
