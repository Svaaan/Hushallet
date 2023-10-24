import React from 'react';
import { Text, View } from 'react-native';
import { ChoreEvent, mockChoreEvents } from '../../data/mockedChoreEvents';
import { mockChores } from '../../data/mockedChores';
import ChoreChart from '../Component/ChoreChart';
import PieChartWithCenteredLabels from '../Component/PieChartWithCenteredLabels ';
import { HouseholdSwipeScreenProps } from '../Navigation/types';

type Props = HouseholdSwipeScreenProps<'YearlyStatistics'>;

export default function YearlyStatisticsScreen({ navigation }: Props) {
  // Calculate the start and end date for the monthly statistics
  const today = new Date();
  const currentYearStartDate = new Date(today.getFullYear(), 0, 1);
  const currentYearEndDate = new Date(today.getFullYear() + 1, 0, 0);

  const yearlyChoreEvents = mockChoreEvents.filter((event) => {
    return (
      event.date >= currentYearStartDate && event.date <= currentYearEndDate
    );
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
        startDate={currentYearStartDate}
        endDate={currentYearEndDate}
        choreEvents={yearlyChoreEvents}
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
                startDate={currentYearStartDate}
                endDate={currentYearEndDate}
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
