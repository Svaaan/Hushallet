import React from 'react';
import { PieChart } from 'react-native-svg-charts';
import { ChoreEvent } from '../../data/mockedChoreEvents';
import { defaultColor, profileColors } from './PieChartWithCenteredLabels ';

interface ChoreChartProps {
  choreEvents: ChoreEvent[];
  startDate: Date;
  endDate: Date;
}

function ChoreChart(props: ChoreChartProps) {
  if (!props || !props.choreEvents) {
    return null; // Return null if props or props.choreEvents are undefined
  }
  const filteredChoreEvents = props.choreEvents.filter((event) => {
    return event.date >= props.startDate && event.date <= props.endDate;
  });

  if (filteredChoreEvents.length === 0) {
    return null; // Return null if there are no filtered chore events
  }

  const profileChoresCount: Record<string, number> = {};

  // Calculate the number of chores completed by each profile based on the choreEvents data
  filteredChoreEvents.forEach((event) => {
    if (event.profile_id !== null && event.profile_id !== undefined) {
      const profileKey = `${event.profile_id}-${event.chore_id}`;
      if (profileChoresCount[profileKey] === undefined) {
        profileChoresCount[profileKey] = 1;
      } else {
        profileChoresCount[profileKey]++;
      }
    }
  });

  // Create an array of data items for the PieChart
  const transformedData = Object.keys(profileChoresCount).map(
    (profileKey, index) => {
      const [profileId, choreId] = profileKey.split('-');
      return {
        key: `${profileId}-${choreId}-${index}`,
        amount: profileChoresCount[profileKey],
        svg: {
          fill: profileColors[parseInt(profileId, 10)] || defaultColor,
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

export default ChoreChart;
