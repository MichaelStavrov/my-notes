import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

interface User {
  name: string;
}

interface AuthState {
  user: User | null;
  signIn: (newUser: User, cb: () => void) => void;
  signOut: (cb: () => void) => void;
}

const AuthContext = createContext<AuthState>({} as AuthState);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = (newUser: User, cb: () => void) => {
    setUser(newUser);
    cb();
  };

  const signOut = (cb: () => void) => {
    setUser(null);
    cb();
  };

  const state: AuthState = {
    user,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
