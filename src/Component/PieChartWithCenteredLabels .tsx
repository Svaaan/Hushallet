import React from 'react';
import { Text } from 'react-native';
import { G, Image } from 'react-native-svg';
import { PieChart } from 'react-native-svg-charts';
import { mockChoreEvents } from '../../data/mockedChoreEvents';
import { mockUsers } from '../../data/mockedUsers';

export const userColors: Record<number, string> = {
  1: '#FF7000', // Fox - Darker Orange
  2: '#CCCC00', // Chick - Darker Yellow
  3: '#0055AA', // Whale - Darker Blue
  4: '#009900', // Frog - Darker Green
  5: '#AA1100', // Octopus - Darker Pink
  6: '#FF0066', // Pig - Darker Red
};

export const defaultColor = '#000000';

export interface DataItem {
  key: number;
  amount: number;
  svg: {
    fill: string;
  };
}

interface SliceProps {
  labelCentroid: [number, number];
  pieCentroid: [number, number];
  data: DataItem;
}

interface LabelsProps {
  slices: SliceProps[];
  height: number;
  width: number;
}

class PieChartWithCenteredLabels extends React.PureComponent {
  render() {
    // Initialize an object to store the number of chores completed by each user
    const userChoresCount: Record<number, number> = {};

    // Calculate the number of chores completed by each user based on the mockChoreEvents data
    mockChoreEvents.forEach((choreEvent) => {
      if (userChoresCount[choreEvent.user_id] === undefined) {
        userChoresCount[choreEvent.user_id] = 1;
      } else {
        userChoresCount[choreEvent.user_id]++;
      }
    });

    const data: DataItem[] = mockUsers.map((user) => {
      const fill = user ? userColors[user.id] || defaultColor : defaultColor;

      const amount = user ? userChoresCount[user.id] || 0 : 0;

      return {
        key: user.id,
        amount,
        svg: {
          fill,
        },
      };
    });

    // Filter the data and slices to include only users who have completed chores
    const filteredData = data.filter((item) => item.amount > 0);

    const Labels: React.FC<LabelsProps> = ({ slices, height, width }) => {
      return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        const user = mockUsers.find((user) => user.id === data.key);
        const imageSource = user?.avatar;

        return (
          <G key={index} x={labelCentroid[0]} y={labelCentroid[1]}>
            <Image
              x={-15}
              y={-15}
              width={25}
              height={25}
              preserveAspectRatio="xMidYMid slice"
              opacity="1"
              href={imageSource}
            />
          </G>
        );
      });
    };

    return (
      <>
        <PieChart
          style={{ marginTop: 5, height: 300 }}
          valueAccessor={({ item }: { item: DataItem }) => item.amount}
          data={filteredData}
          // spacing={0}
          // innerRadius="0%"
          outerRadius="95%"
        >
          <Labels slices={filteredData as any} height={0} width={0} />
        </PieChart>
        <Text
          style={{
            justifyContent: 'center',
            textAlign: 'center',
            marginBottom: 50,
            fontSize: 24,
            fontWeight: 'bold',
          }}
        >
          Totalt
        </Text>
      </>
    );
  }
}

export default PieChartWithCenteredLabels;
