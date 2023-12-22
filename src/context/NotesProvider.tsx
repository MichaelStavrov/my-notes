import React, {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
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
  updatedNote: Note | null;
  activeNote: Note | null;
  setActiveNote: (note: Note) => void;
  getNotes: (cb?: (notes: Note[]) => void) => void;
  addNote: (note: AddNoteProps) => void;
  removeNote: (noteId: number) => void;
  removeAllNotes: () => void;
  updateNote: (noteId: number, newNote: Note) => void;
}

const NotesContext = createContext<NotesState>({} as NotesState);

const NotesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [updatedNote, setUpdatedNote] = useState<Note | null>(null);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const { user } = useAuth();

  const changeActiveNote = useCallback((note: Note) => setActiveNote(note), []);

  const getNotes = useCallback(
    async (cb?: (notes: Note[]) => void) => {
      if (user?.id) {
        const newNotes = await notesService.fetchNotes(user?.id);
        if (newNotes) {
          setNotes(newNotes);
          cb?.(newNotes);
        }
      }
    },
    [user?.id]
  );

  const addNote = useCallback(
    async ({ name, content }: AddNoteProps) => {
      if (user?.id) {
        await notesService.createNote({
          name,
          content,
          ownerId: user?.id,
          creationDate: new Date().toLocaleDateString(),
        });
        await getNotes((newNotes) =>
          setActiveNote(newNotes[newNotes.length - 1])
        );
      }
    },
    [getNotes, user?.id]
  );

  const removeNote = useCallback(
    async (noteId: number) => {
      await notesService.deleteNote(noteId);

      await getNotes();
    },
    [getNotes]
  );

  const removeAllNotes = useCallback(async () => {
    if (user?.id) {
      await notesService.deleteAllNotes(user?.id);
      await getNotes();
      setActiveNote(null);
    }
  }, [getNotes, user?.id]);

  const updateNote = useCallback(
    async (noteId: number, newNote: Note) => {
      await notesService.patchNote(noteId, newNote);

      if (user?.id) {
        const note = await notesService.fetchOneNote(user?.id, noteId);

        if (note) {
          setUpdatedNote(note);
        }
      }

      await getNotes();
    },
    [getNotes, user?.id]
  );

  const state: NotesState = {
    notes,
    updatedNote,
    activeNote,
    setActiveNote: changeActiveNote,
    getNotes,
    addNote,
    removeNote,
    updateNote,
    removeAllNotes,
  };

  return (
    <NotesContext.Provider value={state}>{children}</NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);

export default NotesProvider;
