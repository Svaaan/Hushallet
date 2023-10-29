import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ProjectTheme } from '../../theme/theme';
// import { red100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

interface IntervalsProps {
  selectedInterval: number;
  onIntervalChange: (value: number) => void;
}

const Intervals: React.FC<IntervalsProps> = ({
  selectedInterval = 0,
  onIntervalChange,
}) => {
  const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
  const [scrollViewOpen, setScrollViewOpen] = useState(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: 70,
        backgroundColor: ProjectTheme.inputBackground,
        borderRadius: ProjectTheme.borderRadius.medium,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        elevation: ProjectTheme.elevation.small,
      }}
    >
      {scrollViewOpen ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {numbers.map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => {
                setScrollViewOpen(false);
                onIntervalChange(number);
              }}
            >
              <Text style={{ margin: 10 }}>{number}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View>
          <TouchableOpacity onPress={() => setScrollViewOpen(true)}>
            <View style={{ flexDirection: 'row', paddingTop: 5 }}>
              <Text>Återkommer</Text>
              <Text style={{ paddingLeft: 200 }}>var</Text>
              <Text style={{ paddingLeft: 10 }}>{selectedInterval}</Text>
              <Text style={{ paddingLeft: 10 }}>dag</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Intervals;
{
  /* <Text style={{ paddingLeft: 10, backgroundColor: red100 }}></Text> */
}
