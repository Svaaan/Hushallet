import React, { createContext, useContext, useState, useCallback } from 'react';
import { mockedProfile } from '../../data/mockedProfiles';
import { Account, mockedAccounts } from '../../data/mockedAccount';

type AccountContextType = {
  account: Account | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  setAccountData: (accountData: Account | null) => void;
};

const AccountContext = createContext<AccountContextType | null>(null);

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);

  const setAccountData = (accountData: Account | null) => {
    if (accountData) {
      setAccount(accountData);
    }
  };

  const login = useCallback((username: string, password: string) => {
    //första kollar i mockade listan om finns
    console.log('username: ', username, 'password', password);
    try {
      const mockedAccount = mockedAccounts.find(
        (acc) => acc.username === username && acc.password === password
      );
      if (!mockedAccount) {
        if (account?.username == username && account?.password == password) {
          setAccount(account);
          return true;
        }
      } else {
        setAccount(mockedAccount);
        console.log('Login success!', mockedAccount);
        return true;
      }
    } catch {}

    return false;
  }, []);

  const logout = useCallback(() => {
    setAccount(null);
  }, []);

  return (
    <AccountContext.Provider value={{ account, login, logout, setAccountData }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccountContext(): AccountContextType {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('Add userprovider into app.tsx');
  }
  return context;
}
