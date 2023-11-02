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
  const numbers = [1, 2, 4, 6, 8];
  const [scrollViewOpen, setScrollViewOpen] = useState(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: 70,
        backgroundColor: ProjectTheme.inputBackground,
        borderRadius: ProjectTheme.borderRadius.medium,
        paddingLeft: 25,
        paddingRight: 10,
        paddingTop: 5,
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
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: ProjectTheme.colors.secondaryContainer,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 10,
                }}
              >
                <Text style={{ margin: 10, fontSize: 15, fontWeight: 'bold' }}>
                  {number}
                </Text>
              </View>
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
                  paddingRight: 250,
                }}
              >
                Värde:
              </Text>

              <Text
                style={{
                  paddingLeft: 10,
                  backgroundColor: ProjectTheme.colors.secondaryContainer,
                  borderRadius: 14,
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: 28,
                  paddingTop: 2,
                  height: 28,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
              >
                {selectedRating}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
              }}
            >
              Hur energikrävande är sysslan?
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ChoresRating;
