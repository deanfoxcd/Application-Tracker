import { useEffect, useState } from 'react';
import { Note } from '../../../types/Application';
import {
  createNote,
  deleteNote,
  fetchNotesByApplicationId,
  updateNote,
} from '../services/noteService';

export const useNotes = (jobApplicationId: number) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = () => {
    setLoading(true);
    fetchNotesByApplicationId(jobApplicationId)
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    refetch();
  }, [jobApplicationId]);

  const addNote = async (content: string) => {
    try {
      await createNote({ jobApplicationId, content });
      refetch();
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const editNote = async (id: number, content: string) => {
    try {
      await updateNote(id, { content });
      refetch();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const removeNote = async (id: number) => {
    try {
      await deleteNote(id);
      refetch();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return { notes, loading, addNote, editNote, removeNote };
};
