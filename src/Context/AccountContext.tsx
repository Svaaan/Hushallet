import React, { createContext, useContext, useState, useCallback } from 'react';
import { Account, mockedAccounts } from '../../data/mockedAccount';

type AccountContextType = {
  account: Account | null;
  login: (username: string, password: string) => Promise<boolean>;
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

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        const mockedAccount = mockedAccounts.find(
          (acc) => acc.username === username && acc.password === password
        );

        if (mockedAccount) {
          setAccount(mockedAccount);
          console.log('Login success!', mockedAccount);
          return true;
        } else if (
          account &&
          account.username === username &&
          account.password === password
        ) {
          console.log('Login success!', account);
          return true;
        }
      } catch (error) {
        console.error('Error during login:', error);
      }

      return false;
    },
    [account]
  );

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
