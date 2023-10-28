import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ProjectTheme } from '../../theme/theme';

const Intervals = () => {
  const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
  const [Nr, setNr] = useState(0);
  const [scrollViewOpen, setScrollViewOpen] = useState(false);

  const handleNumberSelection = (number: number) => {
    // Hantera det valda numret här
    setNr(number);
    console.log('Valt nummer:', number);
    setScrollViewOpen(false); // Stäng ScrollView efter val
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: 60,
        backgroundColor: ProjectTheme.inputBackground,
        borderRadius: ProjectTheme.borderRadius.medium,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 18,
        elevation: ProjectTheme.elevation.small,
      }}
    >
      {scrollViewOpen ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {numbers.map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => handleNumberSelection(number)}
            >
              <Text style={{ margin: 8 }}>{number}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <TouchableOpacity onPress={() => setScrollViewOpen(true)}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{}}>Återkommer</Text>
            <Text style={{ paddingLeft: 200 }}>var</Text>
            <Text style={{ paddingLeft: 10 }}>{Nr}</Text>
            <Text style={{ paddingLeft: 10 }}>dag</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Intervals;
