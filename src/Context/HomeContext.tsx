import React, { createContext, useContext, useState, useCallback } from 'react';
import { Home, mockedHomes } from '../../data/mockedHomes';
import { Profile } from '../../data/mockedProfiles';
import { Account } from '../../data/mockedAccount';

type HomeContextType = {
  homes: Home[];
  enteredHome: Home | null;
  setEnteredHome: (home: Home | null) => void;
  enterHome: (homeId: number) => void;
  setHomes: (homes: Home[]) => void;
  setHomesByProfiles: (profiles: Profile[]) => void;
  createHome: (home: Home) => void;
  joinHome: (homeId: number) => void;
  searchHome: (
    passcode: number,
    inputName: string,
    inputAvatar: string,
    account: Account,
    allProfiles: Profile[]
  ) => Promise<Home | null>;
  updateHomesWithOldName: (oldName: string, newName: string) => void;
};

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export function HomeProvider({ children }: { children: React.ReactNode }) {
  const [homes, setHomes] = useState<Home[]>([]);
  const [enteredHome, setEnteredHome] = useState<Home | null>(null);

  //en profil har ett homeid och en account id

  const setHomesByProfiles = (profiles: Profile[]) => {
    let allMyHomes: Home[] = [];

    profiles.forEach((profile) => {
      const home = mockedHomes.find((home) => home.id === profile.homeId);
      if (home) {
        if (!allMyHomes.some((h) => h.id === home.id)) {
          allMyHomes.push(home);
        }
      }

      const homeInState = homes.find((home) => home.id === profile.homeId);
      if (homeInState) {
        if (!allMyHomes.some((h) => h.id === homeInState.id)) {
          allMyHomes.push(homeInState);
        }
      }
    });
    setHomes(allMyHomes);
  };

  const enterHome = (homeId: number) => {
    const home = homes.find((h) => h.id === homeId);
    if (home) {
      setEnteredHome(home);
    }
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

  //Use passcode to enter house
  const searchHome = useCallback(
    async (
      passcode: number,
      inputName: string,
      inputAvatar: string,
      account: Account | null,
      allProfiles: Profile[]
    ) => {
      // Create a temporary profile for the account provided
      const tempProfile: Profile = {
        id: account?.id || 0,
        name: inputName || 'USERNAME_ERROR',
        avatar: inputAvatar || 'AVATAR_ERROR',
        is_paused: false,
        is_owner: false,
        account_id: account?.id || 0,
        homeId: 0, //sålänge
      };
      let foundDuplicateAvatar = false;
      console.log('Create temp profile: ', tempProfile);
      console.log('Looking');
      try {
        const matchedHomes = mockedHomes.filter(
          (home) => home.home_code === passcode
        );
        if (matchedHomes.length > 0) {
          console.log('Homes with the same passcode:', matchedHomes);
          matchedHomes.forEach((home) => {
            // Add all profiles that belong to this home
            console.log('List all profiles that belong to this home:');
            allProfiles.forEach((element) => {
              if (element.homeId === home.id) {
                console.log('Profile:', element);
              }
            });
            const matchedProfiles = allProfiles.filter(
              (element) => element.homeId === home.id
            );

            matchedProfiles.forEach((element) => {
              console.log(
                'Temp:',
                tempProfile.avatar,
                'Checked:',
                element.avatar
              );
              if (element.avatar == tempProfile.avatar) {
                // A matching avatar is found, set the flag
                foundDuplicateAvatar = true;
                console.log('Profile has the same avatar');
              } else {
                console.log('Profile does not have the same avatar');
              }
            });
          });

          // After iterating through all homes, check the flag
          console.log('Found avatar?:', foundDuplicateAvatar);

          if (!foundDuplicateAvatar) {
            // Join the first matching home if no duplicate avatars are found
            console.log('Joining', matchedHomes[0].name);
            joinHome(matchedHomes[0].id);
          } else {
            console.log('Found homes with duplicate avatars. Not joining.');
          }
        } else {
          console.log('No homes found with the provided passcode.');
        }
      } catch (error) {
        console.error('Did not find a home.', error);
      }
      return null;
    },
    [joinHome]
  );

  const updateHomesWithOldName = (oldName: string, newName: string): void => {
    mockedHomes.forEach((home) => {
      // Check if the home's name matches the provided oldName
      if (home.name === oldName && newName != '') {
        // Update the name for the matched home
        home.name = newName;
      }
    });
  };

  return (
    <HomeContext.Provider
      value={{
        homes,
        setHomes,
        setHomesByProfiles,
        createHome,
        joinHome,
        searchHome,
        updateHomesWithOldName,
        enteredHome,
        setEnteredHome,
        enterHome,
      }}
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
