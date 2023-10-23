import React from 'react';
import { Text, View } from 'react-native';
import { ChoreEvent, mockChoreEvents } from '../../data/mockedChoreEvents';
import { mockChores } from '../../data/mockedChores';
import ChoreChart from '../Component/ChoreChart';
import PieChartWithCenteredLabels from '../Component/PieChartWithCenteredLabels ';

import { HouseholdSwipeScreenProps } from '../Navigation/types';

type Props = HouseholdSwipeScreenProps<'LastWeekStatistics'>;

export default function LastWeekStatisticsScreen({ navigation }: Props) {
  const lastWeekStartDate = new Date();
  lastWeekStartDate.setDate(lastWeekStartDate.getDate() - 7);

  const lastWeekEndDate = new Date(lastWeekStartDate);
  lastWeekEndDate.setDate(lastWeekStartDate.getDate() + 6);

  const lastWeekChoreEvents = mockChoreEvents.filter((event) => {
    return event.date >= lastWeekStartDate && event.date <= lastWeekEndDate;
  });

  const eventsByChoreId: { [key: number]: ChoreEvent[] } = {};
  mockChoreEvents.forEach((event) => {
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
        lastWeekChoreEvents={lastWeekChoreEvents}
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
