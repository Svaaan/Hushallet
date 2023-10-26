import React, { createContext, useContext, useState } from 'react';
import { Home, mockedHomes } from '../../data/mockedHomes';
import { Profile } from '../../data/mockedProfiles';

type HomeContextType = {
  homes: Home[];
  setHomes: (homes: Home[]) => void;
  setHomesByProfiles: (profiles: Profile[]) => void;
};

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export function HomeProvider({ children }: { children: React.ReactNode }) {
  const [homes, setHomes] = useState<Home[]>([]);

  const setHomesByProfiles = (profiles: Profile[]) => {
    console.log('profiler som kommer in hit: ', profiles);
    let allMyHomes: Home[] = [];

    profiles.forEach((profile) => {
      const home = mockedHomes.find((home) => home.owner_id === profile.id);
      if (home) {
        if (!allMyHomes.some((h) => h.owner_id === home.owner_id)) {
          allMyHomes.push(home);
        }
      }

      const homeInState = homes.find((home) => home.owner_id === profile.id);
      if (homeInState) {
        if (!allMyHomes.some((h) => h.owner_id === homeInState.owner_id)) {
          allMyHomes.push(homeInState);
        }
      }
    });

    setHomes(allMyHomes);
  };

  return (
    <HomeContext.Provider value={{ homes, setHomes, setHomesByProfiles }}>
      {children}
    </HomeContext.Provider>
  );
}

export function useHomeContext() {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('Add HomeProvider into app.tsx');
  }
  return context;
}
