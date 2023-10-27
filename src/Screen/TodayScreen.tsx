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

  const handleGoToTaskDetails = () => {
    // Pass the chore data to the TaskDetails screen.
    navigation.navigate('TaskDetails');
  };
  const handleGoToCreateChore = () => {
    navigation.navigate('CreateTask');
  };
  const handleGoToEditTask = () => {
    navigation.navigate('EditTask');
  };

  // Define a function to check if a chore has been completed within a specific date interval
  function hasCompletedWithinInterval(
    choreEvents: ChoreEvent[],
    chores: Chore[],
    today: Date
  ) {
    if (
      !choreEvents ||
      choreEvents.length === 0 ||
      !chores ||
      chores.length === 0
    ) {
      return [];
    }
    // Create a map to store the last completed date for each chore.
    const lastCompletedMap: Record<number, Date> = {};

    // Filter and sort choreEvents by date, latest first.
    choreEvents
      .filter((event) => chores.some((chore) => chore.id === event.chore_id))
      .sort((eventA, eventB) => new Date(eventB.date) - new Date(eventA.date))
      .forEach((event) => {
        const eventDate = new Date(event.date);
        const choreId = event.chore_id;

        // Check if the event was done today.
        if (
          eventDate.toDateString() === today.toDateString() &&
          (!lastCompletedMap[choreId] || eventDate > lastCompletedMap[choreId])
        ) {
          lastCompletedMap[choreId] = eventDate;
        }
      });

    return Object.values(lastCompletedMap).some(
      (lastCompletedDate) =>
        lastCompletedDate.toDateString() === today.toDateString()
    );
  }

  // 1. Filtera choreEvents på choreId
  // 2. Sortera på datum med senaste först
  // 3. Plocka ut de första om de var gjorde idag.
  // 4. Spara även lastCompleted från den första.

  return (
    <View style={{ flex: 1 }}>
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
            onPress={() => handleGoToTaskDetails()}
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
                      fontWeight: 'bold',
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'flex-end',
        }}
      >
        <TouchableOpacity
          style={{
            width: 200,
            height: 40,
            backgroundColor: ProjectTheme.buttonPrimary.color,
            borderRadius: ProjectTheme.borderRadius.medium,
            elevation: ProjectTheme.elevation.medium,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 5,
            marginVertical: 220,
          }}
          onPress={handleGoToCreateChore}
        >
          <Text style={{ color: ProjectTheme.colors.textcolor }}>
            Skapa syssla
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 200,
            height: 40,
            backgroundColor: ProjectTheme.buttonPrimary.color,
            borderRadius: ProjectTheme.borderRadius.medium,
            elevation: ProjectTheme.elevation.medium,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 5,
            marginVertical: 220,
          }}
          onPress={handleGoToEditTask}
        >
          <Text style={{ color: ProjectTheme.colors.textcolor }}>Ändra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
