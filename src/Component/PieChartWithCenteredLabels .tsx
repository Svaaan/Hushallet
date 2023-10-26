import React from 'react';
import { Text } from 'react-native';
import { G, Image } from 'react-native-svg';
import { PieChart } from 'react-native-svg-charts';
import { ChoreEvent, mockChoreEvents } from '../../data/mockedChoreEvents';
import { mockedProfile } from '../../data/mockedProfiles';

export const profileColors: Record<number, string> = {
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
  startDate?: Date;
  endDate?: Date;
  choreEvents?: ChoreEvent[];
}

class PieChartWithCenteredLabels extends React.PureComponent<LabelsProps> {
  render() {
    // Initialize an object to store the number of chores completed by each profile
    const profileChoresCount: Record<number, number> = {};

    //Debuggin: Printa the startDate / endDate
    // console.log('startDate:', this.props.startDate);
    // console.log('endDate:', this.props.endDate);

    // Filter the chore events based on the specified date range
    const filteredChoreEvents = mockChoreEvents.filter((choreEvent) => {
      if (this.props.startDate && this.props.endDate) {
        const eventDate = new Date(choreEvent.date);
        return (
          eventDate >= this.props.startDate && eventDate <= this.props.endDate
        );
      }
      return true; // If no date range is specified, include all events
    });

    //Debuggin: Log filtered events from DB
    // console.log('filteredChoreEvents:', filteredChoreEvents);

    // Calculate the number of chores completed by each profile based on the mockChoreEvents data
    filteredChoreEvents.forEach((choreEvent) => {
      if (profileChoresCount[choreEvent.profile_id] === undefined) {
        profileChoresCount[choreEvent.profile_id] = 1;
      } else {
        profileChoresCount[choreEvent.profile_id]++;
      }
    });
    //Debuggin: Log profileChores count.
    // console.log('profileChoresCount:', profileChoresCount);

    const data: DataItem[] = mockedProfile.map((profile) => {
      const fill = profile
        ? profileColors[profile.id] || defaultColor
        : defaultColor;

      const amount = profile ? profileChoresCount[profile.id] || 0 : 0;

      return {
        key: profile.id,
        amount,
        svg: {
          fill,
        },
      };
    });

    // Filter the data and slices to include only profiles who have completed chores
    const filteredData = data.filter((item) => item.amount > 0);

    if (filteredData.length === 0) {
      return <Text>No chores completed yet.</Text>;
    }

    const Labels: React.FC<LabelsProps> = ({ slices }) => {
      return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        const profile = mockedProfile.find(
          (profile) => profile.id === data.key
        );
        const imageSource = profile?.avatar;

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
      <>
        <PieChart
          style={{ marginTop: 5, height: 300 }}
          valueAccessor={({ item }: { item: DataItem }) => item.amount}
          data={filteredData}
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
