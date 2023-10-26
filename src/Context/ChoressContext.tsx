import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { mockChores } from '../../data/mockedChores';

// Define chore type
interface Chore {
  id: number;
  home_id: number;
  name: string;
  description: string;
  task_rating: number;
  interval: number;
}

// Define context type
interface ChoresContextType {
  chores: Chore[];
  initializeChores: () => void;
  createChore: (chore: Chore) => void;
}

// Creating the context
const ChoresContext = createContext<ChoresContextType | undefined>(undefined);

const fetchChoresFromStorage = async (): Promise<Chore[]> => {
  try {
    const choresJson = await AsyncStorage.getItem('chores');

    if (choresJson) {
      const chores: Chore[] = JSON.parse(choresJson);
      return chores;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching chores from AsyncStorage: ', error);
    throw error;
  }
};

// Create the provider component
export function ChoresProvider({ children }: { children: React.ReactNode }) {
  const [chores, setChores] = useState<Chore[]>([]);

  // Initialization logic (you can implement this)
  const initializeChores = async () => {
    // Fetch chores data and set it in the state
    const fetchedChores = await fetchChoresFromStorage();

    // Check to see if any chores are in AsyncStorage, Otherwise use the mockData
    if (fetchedChores.length === 0) {
      setChores(mockChores);
    } else {
      setChores(fetchedChores);
    }
  };

  // Function to create and save a chore to AsyncStorage
  const createChore = async (newChore: Chore) => {
    try {
      // Add the new chore to the existing chores
      const updatedChores = [...chores, newChore];

      // Save the updated chores to AsyncStorage
      await AsyncStorage.setItem('chores', JSON.stringify(updatedChores));

      // Update the state
      setChores(updatedChores);
    } catch (error) {
      console.error('Error creating chore: ', error);
      throw error;
    }
  };

  // Initialize chores when the app starts with useEffect
  useEffect(() => {
    initializeChores();
  }, []);

  return (
    <ChoresContext.Provider value={{ chores, initializeChores, createChore }}>
      {children}
    </ChoresContext.Provider>
  );
}

// hook for using the context
export function useChoresContext() {
  const context = useContext(ChoresContext);
  if (!context) {
    throw new Error('useChoresContext must be used within a ChoresProvider');
  }
  return context;
}
