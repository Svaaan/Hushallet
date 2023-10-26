import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { ChoreEvent, mockChoreEvents } from '../../data/mockedChoreEvents';
import { Chore } from '../../data/mockedChores';
import { Profile, mockedProfile } from '../../data/mockedProfiles';
import { ProjectTheme } from '../../theme/theme';
import { useChoresContext } from '../Context/ChoressContext';
import { HouseholdSwipeScreenProps } from '../Navigation/types';

type Props = HouseholdSwipeScreenProps<'Today'>;

export default function TodayScreen({ navigation }: Props) {
  const { chores } = useChoresContext();

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
    // You can pass the chore data to the TaskDetails screen.
    navigation.navigate('TaskDetails', { chore });
  };

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
              {Array.from(completedByProfiles).map((profileId) => {
                const profile = profilesMap.get(profileId);
                return (
                  <Image
                    key={profile.id}
                    source={profile.avatar}
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 15,
                      marginRight: 7,
                    }}
                  />
                );
              })}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
