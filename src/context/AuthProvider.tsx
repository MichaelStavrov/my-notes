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
  signUp: (newUser: User, cb: () => void) => void;
  signIn: (newUser: User, cb: () => void) => void;
  signOut: (cb: () => void) => void;
}

const AuthContext = createContext<AuthState>({ user: null } as AuthState);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signUp = (newUser: User, cb: () => void) => {
    setUser(newUser);
    cb();
  };

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
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
