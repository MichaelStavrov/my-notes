import React, { FC, useCallback } from 'react';
import { useNotes } from '@/context/NotesProvider';
import Sidebar from '@/components/Sidebar';
import TextEditor from '@/components/TextEditor';
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthProvider';
import styles from './Notes.module.scss';

const Notes: FC = () => {
  const { updateNote, activeNote } = useNotes();
  const { user } = useAuth();

  const handleChange = useCallback(
    (value: string) => {
      const valueToArr = value.split('\n');

      const noteTitle =
        valueToArr.length > 1 ? valueToArr[0] : valueToArr.join('\n');
      const noteContent =
        valueToArr.length > 1 ? valueToArr.slice(1).join('\n') : '';

      if (activeNote?.id && user?.id) {
        updateNote(activeNote.id, {
          ...activeNote,
          content: noteContent,
          name: noteTitle,
        });
      }
    },
    [activeNote, updateNote, user?.id]
  );

  return (
    <section className={styles.notes}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.workspace}>
        {activeNote && (
          <TextEditor activeNote={activeNote} onChange={handleChange} />
        )}
      </div>
    </section>
  );
};

export default Notes;
