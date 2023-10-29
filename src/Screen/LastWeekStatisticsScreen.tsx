import React from 'react';
import { Text, View } from 'react-native';
import { ChoreEvent } from '../../data/mockedChoreEvents';
import { mockChores } from '../../data/mockedChores';
import ChoreChart from '../Component/ChoreChart';
import PieChartWithCenteredLabels from '../Component/PieChartWithCenteredLabels ';

import { useChoreEventsContext } from '../Context/ChoreEventContext';
import { HouseholdSwipeScreenProps } from '../Navigation/types';

type Props = HouseholdSwipeScreenProps<'LastWeekStatistics'>;

export default function LastWeekStatisticsScreen({ navigation }: Props) {
  const { choreEvents } = useChoreEventsContext();
  const lastWeekStartDate = new Date();
  lastWeekStartDate.setDate(lastWeekStartDate.getDate() - 7);

  const lastWeekEndDate = new Date(lastWeekStartDate);
  lastWeekEndDate.setDate(lastWeekStartDate.getDate() + 6);

  const lastWeekChoreEvents = choreEvents.filter((event) => {
    return event.date >= lastWeekStartDate && event.date <= lastWeekEndDate;
  });

  const eventsByChoreId: { [key: number]: ChoreEvent[] } = {};
  choreEvents.forEach((event) => {
    if (!eventsByChoreId[event.chore_id]) {
      eventsByChoreId[event.chore_id] = [];
    }
    eventsByChoreId[event.chore_id].push(event);
  });

  return (
    <View>
      <PieChartWithCenteredLabels
        startDate={lastWeekStartDate}
        endDate={lastWeekEndDate}
        choreEvents={lastWeekChoreEvents}
        slices={[]} // placeholder
        height={300} // default
        width={300} // default
      />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {mockChores.map((chore) => {
          return (
            <View key={chore.id} style={{ width: '33%', padding: 8 }}>
              <ChoreChart
                choreEvents={eventsByChoreId[chore.id]}
                startDate={lastWeekStartDate}
                endDate={lastWeekEndDate}
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
