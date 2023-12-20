import React, {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { Note } from '@/types';

interface ActiveNoteState {
  activeNote: Note | null;
  setActiveNote: (note: Note) => void;
}

const ActiveNoteContext = createContext({} as ActiveNoteState);

const ActiveNoteProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  const changeActiveNote = useCallback((note: Note) => setActiveNote(note), []);

  const state: ActiveNoteState = {
    activeNote,
    setActiveNote: changeActiveNote,
  };

  return (
    <ActiveNoteContext.Provider value={state}>
      {children}
    </ActiveNoteContext.Provider>
  );
};

export const useActiveNote = () => useContext(ActiveNoteContext);

export default ActiveNoteProvider;
