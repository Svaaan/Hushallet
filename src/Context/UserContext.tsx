import React, { createContext, useContext, useState, useCallback } from 'react';

interface Account {
  id: number;
  username: string;
  password: string;
  userId: number; 
}

interface User {
  id: number;
  name: string;
  code: number;
  is_paused: boolean;
  claimedChores: number[];
}

const mockedUsers: User[] = [
  {
    id: 1,
    name: 'John',
    code: 12345,
    is_paused: false,
    claimedChores: [],
  },
  {
    id: 2,
    name: 'Alice',
    code: 67890,
    is_paused: false,
    claimedChores: [],
  },
  
];

const mockedAccounts: Account[] = [
  {
    id: 1,
    username: 'JohnAccount',
    password: 'password123',
    userId: 1, 
  },
  {
    id: 2,
    username: 'AliceAccount',
    password: 'alicePass',
    userId: 2, 
  },
];

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
      
      const loggedInUser = mockedUsers.find(
        (user) => user.id === account.userId
      );

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
    throw new Error(
      'To use UserContext, you must place it inside UserProvider.'
    );
  }
  return context;
}
