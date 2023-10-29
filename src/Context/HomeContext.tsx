import React, { createContext, useContext, useState, useCallback } from 'react';
import { Home, mockedHomes } from '../../data/mockedHomes';
import { Profile } from '../../data/mockedProfiles';

type HomeContextType = {
  homes: Home[];
  setHomes: (homes: Home[]) => void;
  setHomesByProfiles: (profiles: Profile[]) => void;
  createHome: (home: Home) => void;
  joinHome: (homeId: number) => void;
  searchHome: (passcode: number) => Promise<Home | null>;
  updateHomesWithOldName: (oldName: string, newName: string) => void;
};

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export function HomeProvider({ children }: { children: React.ReactNode }) {
  const [homes, setHomes] = useState<Home[]>([]);
  const [home, setHome] = useState<Home | null>(null);

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

  //Använd en kod för att ansluta
  const searchHome = useCallback(
    async (passcode: number) => {
      console.log('looking')
      try {
        const mockedHome = mockedHomes.find(
          (home) => home.home_code === passcode
        );

        if (mockedHome) {
          setHome(mockedHome);
          console.log('Found home!', mockedHome);
          if (home && home.id !== undefined) {
            console.log('Joining ', home.name)
            joinHome(home.id);
          }
          return mockedHome;
        }
      } catch (error) {
        console.error('Did not find a home.', error);
      }

      return null;
    },
    [home]
  );

  const updateHomesWithOldName = (oldName: string, newName: string): void => {
    mockedHomes.forEach((home) => {
      // Check if the home's name matches the provided oldName
      if (home.name === oldName && newName!= '') {
        // Update the name for the matched home
        home.name = newName;
      }
    });
  };
  

  return (
    <HomeContext.Provider
      value={{ homes, setHomes, setHomesByProfiles, createHome, joinHome, searchHome, updateHomesWithOldName}}
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
