import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { G, Image } from 'react-native-svg';
import { PieChart } from 'react-native-svg-charts';
import { mockChoreEvents } from '../../data/mockedChoreEvents';
import { mockUsers } from '../../data/mockedUsers';
import { RootStackParamList } from '../Navigation/RootNavigator';

const userColors = {
  John: '#FFA500', // Fox - Orange
  Alice: '#FFFF00', // Chick - Yellow
  Bob: '#0088FF', // Whale - Blue
  Maya: '#00FF00', // Frog - green
  April: '#600080', // Octopus - pink '#FF19FF'
  Michael: '#FF0000', // Pig - Red
};

const defaultColor = '#600080';

interface DataItem {
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
      const fill = user
        ? userColors[user.name as keyof typeof userColors] || defaultColor
        : defaultColor;

      const amount = user ? userChoresCount[user.id] || 0 : 0;

      return {
        key: user.id,
        amount, // Set the amount based on the number of chores completed
        svg: {
          fill,
        },
      };
    });

    const Labels: React.FC<LabelsProps> = ({ slices, height, width }) => {
      return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        const user = mockUsers.find((user) => user.id === data.key);
        const imageSource = user?.avatar;

        return (
          <G key={index} x={labelCentroid[0]} y={labelCentroid[1]}>
            <Image
              x={-10}
              y={-10}
              width={20}
              height={20}
              preserveAspectRatio="xMidYMid slice"
              opacity="1"
              href={imageSource}
            />
          </G>
        );
      });
    };

    return (
      <PieChart
        style={{ marginTop: 50, height: 200 }}
        valueAccessor={({ item }: { item: DataItem }) => item.amount}
        data={data}
        // spacing={0}
        // innerRadius="0%"
        outerRadius="95%"
      >
        <Labels slices={[]} height={0} width={0} />
      </PieChart>
    );
  }
}

export default PieChartWithCenteredLabels;
