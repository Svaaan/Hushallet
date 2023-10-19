import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { mockChores } from '../../data/mockedChores';
import ChoreChart from '../Component/ChoreChart';
import PieChartWithCenteredLabels from '../Component/PieChartWithCenteredLabels ';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Statistics'>;

export default function StatisticsScreen({ navigation }: Props) {
  return (
    <>
      <PieChartWithCenteredLabels />
      {mockChores.map((chore) => {
        return <ChoreChart key={chore.id} />;
      })}
    </>
  );
}
