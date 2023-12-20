import React, { FC, PropsWithChildren } from 'react';
import AuthProvider from '@/context/AuthProvider';
import NotesProvider from '@/context/NotesProvider';
import ActiveNoteProvider from '@/context/ActiveNoteProvider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <NotesProvider>
        <ActiveNoteProvider>{children}</ActiveNoteProvider>
      </NotesProvider>
    </AuthProvider>
  );
};

export default Providers;
