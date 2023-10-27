import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { mockChoreEvents } from '../../data/mockedChoreEvents';

// Define  type
interface ChoreEvent {
  id: number;
  profile_id: number;
  chore_id: number;
  date: Date;
}

// Define context type
interface ChoreEventsContextType {
  choreEvents: ChoreEvent[];
  initializeChoreEvents: () => void;
  createChoreEvent: (chore: ChoreEvent) => void;
}

// Creating the context
const ChoreEventsContext = createContext<ChoreEventsContextType>(null as any);

const fetchChoreEventsFromStorage = async (): Promise<ChoreEvent[]> => {
  try {
    const choreEventsJson = await AsyncStorage.getItem('choreEvents');

    if (choreEventsJson) {
      const choreEvents: ChoreEvent[] = JSON.parse(choreEventsJson);
      return choreEvents;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching choreEvents from AsyncStorage: ', error);
    throw error;
  }
};

// Create the provider component
export function ChoreEventsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [choreEvents, setChoreEvents] = useState<ChoreEvent[]>([]);

  // Initialization logic (you can implement this)
  const initializeChoreEvents = async () => {
    // Fetch choreEvents data and set it in the state
    const fetchedChoreEvents = await fetchChoreEventsFromStorage();

    // Check to see if any choreEvents are in AsyncStorage, Otherwise use the mockData
    if (fetchedChoreEvents.length === 0) {
      setChoreEvents(mockChoreEvents);
    } else {
      setChoreEvents(fetchedChoreEvents);
    }
  };

  // Function to create and save a choreEvent to AsyncStorage
  const createChoreEvent = async (newChoreEvent: ChoreEvent) => {
    try {
      // Add the new choreEvent to the existing choreEvents
      const updatedChoreEvents = [...choreEvents, newChoreEvent];

      // Save the updated choreEvents to AsyncStorage
      await AsyncStorage.setItem(
        'choreEvents',
        JSON.stringify(updatedChoreEvents)
      );

      // Update the state
      setChoreEvents(updatedChoreEvents);
    } catch (error) {
      console.error('Error creating choreEvent: ', error);
      throw error;
    }
  };

  // Initialize choreEvents when the app starts with useEffect
  useEffect(() => {
    initializeChoreEvents();
  }, []);

  return (
    <ChoreEventsContext.Provider
      value={{
        choreEvents,
        initializeChoreEvents,
        createChoreEvent,
      }}
    >
      {children}
    </ChoreEventsContext.Provider>
  );
}

// hook for using the context
export function useChoreEventsContext() {
  const context = useContext(ChoreEventsContext);
  if (!context) {
    throw new Error(
      'useChoreEventsContext must be used within a ChoreEventsProvider'
    );
  }
  return context;
}
