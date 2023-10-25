import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, mockUsers } from '../../data/mockedUsers';
import { mockedAccounts } from '../../data/mockedAccount';

type UserContextType = {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((username: string, password: string) => {
    const account = mockedAccounts.find(
      (acc) => acc.username === username && acc.password === password
    );

    if (account) {
      const loggedInUser = mockUsers.find((user) => user.id === account.userId);

      if (loggedInUser) {
        setUser(loggedInUser);
        console.log('Login success!');
        return true;
      }
    }

    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('Add userprovider into app.tsx');
  }
  return context;
}
