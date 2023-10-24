import React from 'react';
import { Text, View } from 'react-native';
import { ChoreEvent, mockChoreEvents } from '../../data/mockedChoreEvents';
import { mockChores } from '../../data/mockedChores';
import ChoreChart from '../Component/ChoreChart';
import PieChartWithCenteredLabels from '../Component/PieChartWithCenteredLabels ';
import { HouseholdSwipeScreenProps } from '../Navigation/types';

type Props = HouseholdSwipeScreenProps<'MonthlyStatistics'>;

export default function MonthlyStatisticsScreen({ route, navigation }: Props) {
  const { monthName } = route.params;

  // Calculate the start and end date for the monthly statistics
  const today = new Date();
  const currentMonthStartDate = new Date(
    today.getFullYear(), //- 1, 1); To get lastMonth data
    today.getMonth(),
    1
  );
  const currentMonthEndDate = new Date(
    today.getFullYear(),
    today.getMonth() + 1, // 0); to get last month data
    0
  );

  const monthlyChoreEvents = mockChoreEvents.filter((event) => {
    return (
      event.date >= currentMonthStartDate && event.date <= currentMonthEndDate
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
        startDate={currentMonthStartDate}
        endDate={currentMonthEndDate}
        choreEvents={monthlyChoreEvents}
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
                startDate={currentMonthStartDate}
                endDate={currentMonthEndDate}
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
