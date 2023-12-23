import { FC, useEffect } from 'react';
import { useNotes } from '@/context/NotesProvider';
import ListItem from './components/ListItem';
import { Note } from '@/types';
import styles from './Sidebar.module.scss';

interface SideBarProps {
  onCloseEditor: () => void;
}

const Sidebar: FC<SideBarProps> = ({ onCloseEditor }) => {
  const { notes, getNotes, removeNote, setActiveNote, activeNote } = useNotes();

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  useEffect(() => {
    if (!activeNote && notes.length > 0) {
      setActiveNote(notes[0]);
    }
  }, [activeNote, notes, setActiveNote]);

  const handleItemClick = (note: Note) => {
    setActiveNote(note);
    onCloseEditor();
  };

  return (
    <ul className={styles.sidebar}>
      {notes.map((note) => (
        <ListItem
          key={note.id}
          note={note}
          onItemClick={handleItemClick}
          isActive={activeNote?.id === note.id}
          onRemoveNote={(id: number) => removeNote(id)}
        />
      ))}
    </ul>
  );
};

export default Sidebar;
