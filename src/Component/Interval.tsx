import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ProjectTheme } from '../../theme/theme';

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
              <Text style={{ margin: 10, fontSize: 15, fontWeight: 'bold' }}>
                {number}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View>
          <TouchableOpacity onPress={() => setScrollViewOpen(true)}>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 7,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
              >
                Återkommer
              </Text>
              <Text
                style={{
                  paddingLeft: 180,
                  paddingRight: 8,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
              >
                var
              </Text>
              <Text
                style={{
                  paddingLeft: 10,
                  backgroundColor: 'red',
                  borderRadius: 14,
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: 28,
                  height: 28,
                  paddingTop: 5,
                  fontSize: 15,
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                {selectedInterval}
              </Text>
              <Text
                style={{
                  paddingLeft: 10,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
              >
                dag
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Intervals;
