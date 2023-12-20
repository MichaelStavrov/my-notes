import React, { FC, useEffect } from 'react';
import styles from './Notes.module.scss';
import { db } from '@/api/db';
import { Button } from 'antd';
import { useNotes } from '@/context/NotesProvider';
import Sidebar from '@/components/Sidebar';

const Notes: FC = () => {
  const { addNote, getNotes } = useNotes();

  async function deleteUsers() {
    await db.users.clear();
  }

  async function deleteNotes() {
    await db.notes.clear();
  }

  return (
    <section className={styles.notes}>
      <div className={styles.header}>header</div>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.workspace}>
        <Button onClick={deleteNotes}>Delete Notes</Button>
        <Button onClick={deleteUsers}>Delete Users</Button>
        <Button
          onClick={() => {
            addNote({
              name: 'Note',
              content:
                'contentcontentcontentcontentcontentcontentcontentcontentcontent',
            });
          }}
        >
          Create Note
        </Button>
        <Button onClick={getNotes}>GEt Notes</Button>
      </div>
    </section>
  );
};

export default Notes;
