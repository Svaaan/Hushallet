import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ChoreEvent } from '../../data/mockedChoreEvents';
import { Chore } from '../../data/mockedChores';
import { ProjectTheme } from '../../theme/theme';
import Button from '../Component/BottomButtonComponent';
import { useChoreEventsContext } from '../Context/ChoreEventContext';
import { useChoresContext } from '../Context/ChoressContext';
import { useProfileContext } from '../Context/ProfileContext';
import { HouseholdSwipeScreenProps } from '../Navigation/types';

type Props = HouseholdSwipeScreenProps<'Today'>;

export default function TodayScreen({ navigation }: Props) {
  const [isNewChoreAdded, setIsNewChoreAdded] = useState(false);
  const { chores } = useChoresContext();
  const { choreEvents } = useChoreEventsContext();
  const { profiles } = useProfileContext();

  const handleGoToChoreDetails = (choreId: number) => {
    // Pass the chore data to the ChoreDetails screen.
    navigation.navigate('ChoreDetails', { choreId });
  };
  const handleGoToCreateChore = () => {
    navigation.navigate('CreateChore');
  };
  useFocusEffect(
    React.useCallback(() => {
      setIsNewChoreAdded((prevValue) => !prevValue);
    }, [])
  );

  // Define a function to check if a chore has been completed within a specific date interval
  function getCompletedEventsData(choreEvents: ChoreEvent[], chore: Chore) {
    // Filter and sort choreEvents by date, latest first.
    const sortedEvents = choreEvents
      .filter((event) => chore.id === event.chore_id)
      .sort(
        (eventA, eventB) =>
          new Date(eventB.date).getTime() - new Date(eventA.date).getTime()
      );

    const completedToday = sortedEvents.filter((event) =>
      sameDay(event.date, new Date())
    );
    const lastCompleted = sortedEvents[0]?.date || new Date(); // FIXME: chore.createdAt
    const overdue = getDaysBetween(lastCompleted, new Date()) > chore.interval;

    return {
      completedToday,
      lastCompleted,
      overdue,
    };
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          marginTop: 5,
        }}
      >
        {chores.map((chore) => {
          const { completedToday, lastCompleted, overdue } =
            getCompletedEventsData(choreEvents, chore);

          return (
            <TouchableOpacity
              key={chore.id}
              onPress={() => handleGoToChoreDetails(chore.id)}
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
                {completedToday.length > 0 ? (
                  completedToday.map((event) => {
                    const profile = profiles.find(
                      (p) => p.id === event.profile_id
                    );
                    if (!profile) {
                      return null;
                    }
                    const avatarKey = `${profile.id}-${event.chore_id}-${event.id}`;
                    return (
                      <Image
                        key={avatarKey}
                        source={profile.avatar}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 15,
                          marginRight: 15,
                        }}
                      />
                    );
                  })
                ) : (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: overdue ? '#CD5D6F' : '#f2f2f2',
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
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
        }}
      >
        <Button title="Skapa syssla" onPress={() => handleGoToCreateChore()} />
      </View>
    </View>
  );
}

export function sameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function getDaysBetween(date1: Date, date2: Date) {
  // To calculate the time difference of two dates
  const Difference_In_Time = date2.getTime() - date1.getTime();

  // To calculate the no. of days between two dates
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return Math.floor(Math.abs(Difference_In_Days));
}
