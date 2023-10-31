import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ProjectTheme } from '../../theme/theme';
// import { red100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

interface RaingsProps {
  selectedRating: number;
  onRatingChange: (value: number) => void;
}

const ChoresRating: React.FC<RaingsProps> = ({
  selectedRating = 0,
  onRatingChange,
}) => {
  const numbers = [1, 2, 4, 6, 7, 8];
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
                onRatingChange(number);
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
                Värde:
              </Text>
              {/* <Text
                style={{
                  paddingLeft: 180,
                  paddingRight: 8,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
              >
                var
              </Text> */}

              <Text
                style={{
                  paddingLeft: 10,
                  fontSize: 15,
                }}
              >
                Hur energikrävande är sysslan?
              </Text>
              <Text
                style={{
                  paddingLeft: 10,
                  backgroundColor: ProjectTheme.colors.secondaryContainer,
                  borderRadius: 14,
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: 28,
                  height: 28,
                  paddingTop: 5,
                }}
              >
                {selectedRating}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ChoresRating;
