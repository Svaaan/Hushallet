import React from 'react';
import { PieChart } from 'react-native-svg-charts';
import { ChoreEvent } from '../../data/mockedChoreEvents';
import { defaultColor, userColors } from './PieChartWithCenteredLabels ';

interface ChoreChartProps {
  choreEvents: ChoreEvent[];
}

class ChoreChart extends React.PureComponent<ChoreChartProps> {
  render() {
    const userChoresCount: Record<number, number> = {};

    // Calculate the number of chores completed by each user based on the choreEvents data
    this.props.choreEvents.forEach((event) => {
      if (event.user_id !== null) {
        if (userChoresCount[event.user_id] === undefined) {
          userChoresCount[event.user_id] = 1;
        } else {
          userChoresCount[event.user_id]++;
        }
      }
    });

    // Create an array of data items for the PieChart
    const transformedData = Object.keys(userChoresCount).map((userId) => ({
      key: parseInt(userId, 10),
      amount: userChoresCount[parseInt(userId, 10)],
      svg: {
        fill: userColors[parseInt(userId, 10)] || defaultColor,
      },
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
