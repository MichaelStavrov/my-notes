import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import notesService from '@/api/services/notes.service';
import { Note } from '@/types';
import { useAuth } from './AuthProvider';

interface AddNoteProps {
  name: string;
  content: string;
}

interface NotesState {
  notes: Note[];
  getNotes: () => void;
  addNote: (note: AddNoteProps) => void;
  removeNote: (noteId: number) => void;
}

const NotesContext = createContext<NotesState>({} as NotesState);

const NotesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const { user } = useAuth();

  const getNotes = async () => {
    if (user?.id) {
      const newNotes = await notesService.fetchNotes(user?.id);
      if (newNotes) setNotes(newNotes);
    }
  };

  const addNote = async ({ name, content }: AddNoteProps) => {
    if (user?.id) {
      await notesService.createNote({ name, content, ownerId: user?.id });
      await getNotes();
    }
  };

  const removeNote = async (noteId: number) => {
    await notesService.deleteNote(noteId);

    await getNotes();
  };

  const state: NotesState = {
    notes,
    getNotes,
    addNote,
    removeNote,
  };

  return (
    <NotesContext.Provider value={state}>{children}</NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);

export default NotesProvider;
