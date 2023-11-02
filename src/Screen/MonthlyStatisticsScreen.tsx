import React from 'react';
import { Text, View } from 'react-native';
import { ChoreEvent } from '../../data/mockedChoreEvents';
import { mockChores } from '../../data/mockedChores';
import ChoreChart from '../Component/ChoreChart';
import PieChartWithCenteredLabels from '../Component/PieChartWithCenteredLabels ';
import { useChoreEventsContext } from '../Context/ChoreEventContext';
import { HouseholdSwipeScreenProps } from '../Navigation/types';

type Props = HouseholdSwipeScreenProps<'MonthlyStatistics'>;

export default function MonthlyStatisticsScreen({ navigation }: Props) {
  const { choreEvents } = useChoreEventsContext();
  // Calculate the start and end date for the monthly statistics
  const today = new Date();
  const lastMonthStartDate = new Date(
    today.getFullYear() - 1,
    1,
    today.getMonth(),
    1
  );
  const lastMonthEndDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    0 // 0); to get last month data
  );

  const monthlyChoreEvents = choreEvents.filter((event) => {
    return event.date >= lastMonthStartDate && event.date <= lastMonthEndDate;
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
        startDate={lastMonthStartDate}
        endDate={lastMonthEndDate}
        choreEvents={monthlyChoreEvents}
        slices={[]}
        height={300}
        width={300}
      />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {mockChores.map((chore) => {
          return (
            <View key={chore.id} style={{ width: '33%', padding: 8 }}>
              <ChoreChart
                choreEvents={eventsByChoreId[chore.id]}
                startDate={lastMonthStartDate}
                endDate={lastMonthEndDate}
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
