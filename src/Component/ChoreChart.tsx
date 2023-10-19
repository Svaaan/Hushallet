import React from 'react';
import { PieChart } from 'react-native-svg-charts';
import { mockChoreEvents } from '../../data/mockedChoreEvents';
import { defaultColor, userColors } from './PieChartWithCenteredLabels ';

class ChoreChart extends React.PureComponent {
  render() {
    // Transform the mockedChoreEvents data to match the format expected by PieChart
    const transformedData = mockChoreEvents
      .filter((event) => event.user_id) // Filter out events without a user
      .map((event) => ({
        key: event.id,
        amount: 1, // Each chore is counted once
        svg: { fill: userColors[event.user_id] || defaultColor },
      }));
    return (
      <PieChart
        style={{ height: 100 }}
        valueAccessor={({ item }) => item.amount}
        data={transformedData}
        // spacing={0}
        outerRadius="95%"
      />
    );
  }
}

export default ChoreChart;
