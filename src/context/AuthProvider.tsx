import React, {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import userService from '@/api/services/user.service';
import { encryptPassword } from '@/utils/encryptPassword';
import { decryptPassword } from '@/utils/decryptPassword';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  signUp: (newUser: User, cb: () => void, errorCb?: () => void) => void;
  signIn: (newUser: User, cb: () => void, errorCb?: () => void) => void;
  signOut: (cb: () => void) => void;
}

const AuthContext = createContext<AuthState>({ user: null } as AuthState);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const getUser = useCallback(async (login: string) => {
    const user = await userService.fetchUser(login);

    return user;
  }, []);

  const signUp = useCallback(
    async (data: User, cb: () => void, errorCb?: () => void) => {
      const userIsExist = await getUser(data.login);

      if (userIsExist) {
        errorCb?.();
      } else {
        const newUser: User = {
          ...data,
          password: encryptPassword(data.password),
        };

        await userService.createUser(newUser);
        setUser(newUser);
        cb();
      }
    },
    [getUser]
  );

  const signIn = useCallback(
    async (data: User, cb: () => void, errorCb?: () => void) => {
      const applicant = await getUser(data.login);

      if (applicant && data.password === decryptPassword(applicant.password)) {
        setUser(applicant);
        cb();
      } else {
        errorCb?.();
      }
    },
    [getUser]
  );

  const signOut = useCallback((cb: () => void) => {
    setUser(null);
    cb();
  }, []);

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
