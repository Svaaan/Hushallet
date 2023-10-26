import React, { createContext, useState } from 'react';
import { Chore } from '../../data/mockedChores';

type ChoreContextType = {
  chores: Chore[];
  setChores: (chores: Chore[]) => void;
};
const ChoreContext = createContext<ChoreContextType | null>(null);
export function ChoreProvider({ children }: { children: React.ReactNode }) {
  const [chores, setChores] = useState<Chore[]>([]);

  return (
    <ChoreContext.Provider value={{ chores, setChores }}>
      {children}
    </ChoreContext.Provider>
  );
}
export function useChoreContext() {
  const context = React.useContext(ChoreContext);
  if (!context) {
    throw new Error('Add ChoreProvider into app.tsx');
  }
  return context;
}
