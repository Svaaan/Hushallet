import React from 'react';

import { Text, View } from 'react-native';
import { ChoreEvent, mockChoreEvents } from '../../data/mockedChoreEvents';
import { mockChores } from '../../data/mockedChores';
import ChoreChart from '../Component/ChoreChart';
import PieChartWithCenteredLabels from '../Component/PieChartWithCenteredLabels ';
import { HouseholdSwipeScreenProps } from '../Navigation/types';

type Props = HouseholdSwipeScreenProps<'Statistics'>;

export default function StatisticsScreen({ navigation }: Props) {
  // Group mockedChoreEvents by chore_id
  const eventsByChoreId: { [key: number]: ChoreEvent[] } = {};
  mockChoreEvents.forEach((event) => {
    if (!eventsByChoreId[event.chore_id]) {
      eventsByChoreId[event.chore_id] = [];
    }
    eventsByChoreId[event.chore_id].push(event);
  });

  return (
    <View>
      <PieChartWithCenteredLabels />
      {mockChores.map((chore) => {
        return (
          <View key={chore.id}>
            <ChoreChart choreEvents={eventsByChoreId[chore.id]} />
            <Text>{chore.name}</Text>
          </View>
        );
      })}
    </View>
  );
}
