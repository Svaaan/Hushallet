import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ChoreEvent } from '../../data/mockedChoreEvents';
import { Chore } from '../../data/mockedChores';
import { ProjectTheme } from '../../theme/theme';
import { useChoreEventsContext } from '../Context/ChoreEventContext';
import { useChoresContext } from '../Context/ChoressContext';
import { useProfileContext } from '../Context/ProfileContext';
import { HouseholdSwipeScreenProps } from '../Navigation/types';

type Props = HouseholdSwipeScreenProps<'Today'>;

export default function TodayScreen({ navigation }: Props) {
  const [isNewChoreAdded, setIsNewChoreAdded] = useState(false);
  const { chores } = useChoresContext();
  const { choreEvents } = useChoreEventsContext();
  // const { profiles } = useProfileContext();
  const profiles = mockedProfile;

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

  useEffect(() => {
    if (isNewChoreAdded) {
      setIsNewChoreAdded(false);
    }
  }, [isNewChoreAdded]);

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

  // 1. Filtera choreEvents på choreId
  // 2. Sortera på datum med senaste först
  // 3. Plocka ut de första om de var gjorde idag.
  // 4. Spara även lastCompleted från den första.

  return (
    <View style={{ flex: 1 }}>
      {chores.map((chore) => {
        const { completedToday, lastCompleted, overdue } =
          getCompletedEventsData(choreEvents, chore);

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
              {completedToday.length > 0 ? (
                completedToday.map((event) => {
                  const profile = profiles.find(
                    (p) => p.id === event.profile_id
                  );
                  console.log('EVENT', event);
                  if (!profile) return null;
                  return (
                    <Image
                      key={profile.id}
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
                    backgroundColor: overdue ? 'red' : '#f2f2f2',
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
                    {getDaysBetween(new Date(), lastCompleted)}
                    {/* {chore.interval} */}
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
            position: 'absolute',
            bottom: -50,
            right: 0,
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
            position: 'absolute',
            bottom: -50,
            left: 0,
            right: 0,
          }}
          onPress={handleGoToEditTask}
        >
          <Text style={{ color: ProjectTheme.colors.textcolor }}>Ändra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function sameDay(d1: Date, d2: Date) {
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
