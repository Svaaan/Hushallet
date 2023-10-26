import { Image } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ChoreEvent, mockChoreEvents } from '../../data/mockedChoreEvents';
import { Chore, mockChores } from '../../data/mockedChores';
import { Profile, mockedProfile } from '../../data/mockedProfiles';
import { ProjectTheme } from '../../theme/theme';
import { useChoresContext } from '../Context/ChoressContext';
import { HouseholdSwipeScreenProps } from '../Navigation/types';

type Props = HouseholdSwipeScreenProps<'Today'>;

export default function TodayScreen({ navigation }: Props) {
  const { chores } = useChoresContext();
  const intervalDate = new Date();

  // Create a map to group chore events by chore ID
  const choreEventsMap = new Map<number, ChoreEvent[]>();
  mockChoreEvents.forEach((choreEvent) => {
    if (choreEventsMap.has(choreEvent.chore_id)) {
      choreEventsMap.get(choreEvent.chore_id)?.push(choreEvent);
    } else {
      choreEventsMap.set(choreEvent.chore_id, [choreEvent]);
    }
  });

  // Create a map to store user profiles by their ID
  const profilesMap = new Map<number, Profile>();
  mockedProfile.forEach((profile) => {
    profilesMap.set(profile.id, profile);
  });

  const handleGoToTaskDetails = (chore: Chore) => {
    // Pass the chore data to the TaskDetails screen.
    navigation.navigate('TaskDetails', { chore });
  };

  // Define a function to check if a chore has been completed within a specific date interval
  function hasCompletedWithinInterval(
    choreEvents: ChoreEvent[],
    chores: Chore[],
    intervalDate: Date
  ) {
    if (
      !choreEvents ||
      choreEvents.length === 0 ||
      !chores ||
      chores.length === 0
    ) {
      return false; // No completion events or chores
    }

    // Check if each chore has been completed within its own interval
    for (const chore of chores) {
      const completedChoreEvents = choreEvents.filter(
        (event) => event.chore_id === chore.id
      );

      if (completedChoreEvents.length > 0) {
        const eventDates = completedChoreEvents.map(
          (event) => new Date(event.date)
        );

        // Calculate the start date of the interval based on the chore's interval
        const startDate = new Date(intervalDate);
        startDate.setDate(intervalDate.getDate() - chore.interval);

        // Check if any of the completion events are within the interval
        if (
          eventDates.some(
            (eventDate) => eventDate >= startDate && eventDate <= intervalDate
          )
        ) {
          return true; // A completion event is within the interval for this chore
        }
      }
    }

    return false; // No completion events within the interval for any chore
  }

  return (
    <View>
      {chores.map((chore) => {
        const completedChoreEvents = choreEventsMap.get(chore.id);
        const completedByProfiles: Set<number> = new Set();

        if (completedChoreEvents) {
          completedChoreEvents.forEach((choreEvent) => {
            const profile = profilesMap.get(choreEvent.profile_id);
            if (profile) {
              completedByProfiles.add(profile.id);
            }
          });
        }

        return (
          <TouchableOpacity
            key={chore.id}
            onPress={() => handleGoToTaskDetails(chore)}
            style={{
              width: 390,
              height: 65,
              backgroundColor: ProjectTheme.buttonPrimary.color,
              borderRadius: ProjectTheme.borderRadius.medium,
              elevation: ProjectTheme.elevation.medium,
              alignItems: 'center',
              marginLeft: 10,
              marginRight: 10,
              marginTop: 10,
              paddingLeft: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
              }}
            >
              {chore.name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {completedChoreEvents &&
              hasCompletedWithinInterval(
                completedChoreEvents,
                mockChores,
                intervalDate
              ) ? (
                Array.from(completedByProfiles).map((profileId) => {
                  const profile = profilesMap.get(profileId);
                  if (profile?.avatar) {
                    return (
                      <Image
                        key={profile?.id}
                        source={profile.avatar}
                        style={{
                          width: 25,
                          height: 25,
                          borderRadius: 15,
                          marginRight: 7,
                        }}
                      />
                    );
                  }
                  return null; // Profile has no avatar, return null
                })
              ) : (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: '#f2f2f2',
                    borderRadius: 15,
                    marginRight: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                    }}
                  >
                    {chore.interval}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
