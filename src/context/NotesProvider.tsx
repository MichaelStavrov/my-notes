import {
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
  initialNotes: Note[];
  notes: Note[];
  updatedNote: Note | null;
  activeNote: Note | null;
  setActiveNote: (note: Note | null) => void;
  getNotes: (cb?: (notes: Note[]) => void) => void;
  addNote: (note: AddNoteProps) => void;
  removeNote: (noteId: number) => void;
  removeAllNotes: () => void;
  updateNote: (noteId: number, newNote: Note) => void;
  filterNotes: (value: string) => void;
  resetNotes: () => void;
}

const NotesContext = createContext<NotesState>({} as NotesState);

const NotesProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [initialNotes, setInitialNotes] = useState<Note[]>([]);
  const [updatedNote, setUpdatedNote] = useState<Note | null>(null);
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  const changeActiveNote = useCallback(
    (note: Note | null) => setActiveNote(note),
    []
  );

  const filterNotes = useCallback(
    (value: string) => {
      const lowerValue = value.toLocaleLowerCase();
      const filteredNotes = initialNotes.filter(
        ({ name, content }) =>
          name.toLocaleLowerCase().includes(lowerValue) ||
          content.toLocaleLowerCase().includes(lowerValue)
      );

      setNotes(filteredNotes);
      setActiveNote(filteredNotes[0]);
    },
    [initialNotes]
  );

  const getNotes = useCallback(
    async (cb?: (notes: Note[]) => void) => {
      if (user?.id) {
        const newNotes = await notesService.fetchNotes(user?.id);
        if (newNotes) {
          setInitialNotes(newNotes);
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

      await getNotes((newNotes) => setActiveNote(newNotes[0]));
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
      await notesService.patchNote(noteId, {
        ...newNote,
        creationDate: new Date().toLocaleDateString(),
      });

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

  const resetNotes = useCallback(() => {
    setNotes([]);
    setInitialNotes([]);
  }, []);

  const state: NotesState = {
    initialNotes,
    notes,
    updatedNote,
    activeNote,
    setActiveNote: changeActiveNote,
    getNotes,
    addNote,
    removeNote,
    updateNote,
    removeAllNotes,
    filterNotes,
    resetNotes,
  };

  return (
    <NotesContext.Provider value={state}>{children}</NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);

export default NotesProvider;
