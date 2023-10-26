import React, { ReactNode, createContext, useContext, useState } from 'react';
import { Chore } from '../../data/mockedChores';

type ChoreContextType = {
  chores: Chore[];
  setChore: (chores: Chore[]) => void;
};

const ChorContext = createContext<ChoreContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chores, setChores] = useState<Chore[]>([]);

  return (
    <ChorContext.Provider
      value={{
        chores,
        setChore: setChores,
      }}
    >
      {children}
    </ChorContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(ChorContext);

  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }

  return context;
};
