import React from 'react';

import { Text, View } from 'react-native';
import { ChoreEvent } from '../../data/mockedChoreEvents';
import { mockChores } from '../../data/mockedChores';
import ChoreChart from '../Component/ChoreChart';
import PieChartWithCenteredLabels from '../Component/PieChartWithCenteredLabels ';
import { useChoreEventsContext } from '../Context/ChoreEventContext';
import { HouseholdSwipeScreenProps } from '../Navigation/types';

type Props = HouseholdSwipeScreenProps<'CurrentWeekStatisticsScreen'>;

function getCurrentWeekDates() {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - currentDay);
  const endDate = new Date(currentDate);
  endDate.setDate(startDate.getDate() + 6);

  return { startDate, endDate };
}

export default function StatisticsScreen({ navigation }: Props) {
  const { startDate, endDate } = getCurrentWeekDates();
  const { choreEvents } = useChoreEventsContext();

  const currentWeekEvents = choreEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate >= startDate && eventDate <= endDate;
  });

  // Group mockedChoreEvents by chore_id
  const eventsByChoreId: { [key: number]: ChoreEvent[] } = {};
  currentWeekEvents.forEach((event) => {
    if (!eventsByChoreId[event.chore_id]) {
      eventsByChoreId[event.chore_id] = [];
    }
    eventsByChoreId[event.chore_id].push(event);
  });

  return (
    <View>
      <PieChartWithCenteredLabels
        startDate={startDate}
        endDate={endDate}
        choreEvents={currentWeekEvents}
        slices={[]}
        height={300} // default
        width={300} // default
      />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {mockChores.map((chore) => {
          return (
            <View key={chore.id} style={{ width: '33%', padding: 8 }}>
              <ChoreChart
                choreEvents={eventsByChoreId[chore.id]}
                startDate={startDate}
                endDate={endDate}
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: '600',
                }}
              >
                {chore.name}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
