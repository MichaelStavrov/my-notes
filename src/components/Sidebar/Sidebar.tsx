import React, { FC, useEffect } from 'react';
import { useNotes } from '@/context/NotesProvider';
import styles from './Sidebar.module.scss';
import ListItem from './components/ListItem';
import { useActiveNote } from '@/context/ActiveNoteProvider';

const Sidebar: FC = () => {
  const { notes, getNotes } = useNotes();
  const { setActiveNote, activeNote } = useActiveNote();
  console.log('activeNote ', activeNote);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  return (
    <ul className={styles.sidebar}>
      {notes.map((note) => (
        <ListItem
          key={note.id}
          note={note}
          onItemClick={setActiveNote}
          isActive={activeNote?.id === note.id}
        />
      ))}
    </ul>
  );
};

export default Sidebar;
