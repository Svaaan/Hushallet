import React from 'react';
import { Text } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { ChoreEvent } from '../../data/mockedChoreEvents';
import { defaultColor, userColors } from './PieChartWithCenteredLabels ';

interface ChoreChartProps {
  choreEvents: ChoreEvent[];
  startDate: Date;
  endDate: Date;
}

class ChoreChart extends React.PureComponent<ChoreChartProps> {
  render() {
    const choreEvents = this.props.choreEvents || [];

    const filteredChoreEvents = choreEvents.filter((event) => {
      return (
        event.date >= this.props.startDate && event.date <= this.props.endDate
      );
    });

    // Check if there are choreEvents available
    if (filteredChoreEvents.length === 0) {
      return <Text>No event available for this chore.</Text>;
    }

    const userChoresCount: Record<string, number> = {};

    // Calculate the number of chores completed by each user based on the choreEvents data
    filteredChoreEvents.forEach((event) => {
      if (event.user_id !== null && event.user_id !== undefined) {
        const userKey = `${event.user_id}-${
          event.date.toISOString().split('T')[0]
        }`;
        if (userChoresCount[userKey] === undefined) {
          userChoresCount[userKey] = 1;
        } else {
          userChoresCount[userKey]++;
        }
      }
    });

    // Create an array of data items for the PieChart
    const transformedData = Object.keys(userChoresCount).map(
      (userKey, index) => {
        const [userId, date] = userKey.split('-');
        return {
          key: `${userId}-${date}-${index}`,
          amount: userChoresCount[userKey],
          svg: {
            fill: userColors[parseInt(userId, 10)] || defaultColor,
          },
        };
      }
    );

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
