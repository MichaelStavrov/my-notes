import React, { FC, useEffect } from 'react';
import styles from './Header.module.scss';
import { useNotes } from '@/context/NotesProvider';
import { Button } from 'antd';

const Header: FC = () => {
  const { addNote } = useNotes();

  return (
    <div>
      <Button
        onClick={async () => {
          addNote({
            name: '',
            content: '',
          });
        }}
      >
        addNote
      </Button>
    </div>
  );
};

export default Header;
