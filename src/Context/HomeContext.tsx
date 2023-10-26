import React, { createContext, useContext, useState } from 'react';
import { Home, mockedHomes } from '../../data/mockedHomes';
import { Profile } from '../../data/mockedProfiles';

type HomeContextType = {
  homes: Home[];
  setHomes: (homes: Home[]) => void;
  setHomesByProfiles: (profiles: Profile[]) => void;
  createHome: (home: Home) => void;
  joinHome: (homeId: number) => void;
};

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export function HomeProvider({ children }: { children: React.ReactNode }) {
  const [homes, setHomes] = useState<Home[]>([]);

  const setHomesByProfiles = (profiles: Profile[]) => {
    let allMyHomes: Home[] = [];

    profiles.forEach((profile) => {
      const home = mockedHomes.find((home) => home.profile_id === profile.id);
      if (home) {
        if (!allMyHomes.some((h) => h.profile_id === home.profile_id)) {
          allMyHomes.push(home);
        }
      }

      const homeInState = homes.find((home) => home.profile_id === profile.id);
      if (homeInState) {
        if (!allMyHomes.some((h) => h.profile_id === homeInState.profile_id)) {
          allMyHomes.push(homeInState);
        }
      }
    });

    setHomes(allMyHomes);
  };

  const createHome = (home: Home) => {
    setHomes([...homes, home]);
  };

  const joinHome = (homeId: number) => {
    const joinedHome = mockedHomes.find((home) => home.id === homeId);
    if (joinedHome) {
      setHomes([...homes, joinedHome]);
    }
  };

  return (
    <HomeContext.Provider
      value={{ homes, setHomes, setHomesByProfiles, createHome, joinHome }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export function useHomeContext() {
  const context = useContext(HomeContext);
  if (!context) {
    throw Error('Add HomeProvider into app.tsx');
  }
  return context;
}
