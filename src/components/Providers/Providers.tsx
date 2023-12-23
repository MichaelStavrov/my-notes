import { FC, PropsWithChildren } from 'react';
import AuthProvider from '@/context/AuthProvider';
import NotesProvider from '@/context/NotesProvider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <NotesProvider>{children} </NotesProvider>
    </AuthProvider>
  );
};

export default Providers;
