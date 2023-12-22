import React, { FC, useEffect } from 'react';
import { useNotes } from '@/context/NotesProvider';
import styles from './Sidebar.module.scss';
import ListItem from './components/ListItem';

const Sidebar: FC = () => {
  const { notes, getNotes, removeNote, setActiveNote, activeNote } = useNotes();

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  useEffect(() => {
    if (!activeNote && notes.length > 0) {
      setActiveNote(notes[0]);
    }
  }, [activeNote, notes, setActiveNote]);

  return (
    <ul className={styles.sidebar}>
      {notes.map((note) => (
        <ListItem
          key={note.id}
          note={note}
          onItemClick={setActiveNote}
          isActive={activeNote?.id === note.id}
          onRemoveNote={(id: number) => removeNote(id)}
        />
      ))}
    </ul>
  );
};

export default Sidebar;
