import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Chore } from '../../data/mockedChores';
import { ProjectTheme } from '../../theme/theme';
import { useChoresContext } from '../Context/ChoressContext';
import { HouseholdSwipeScreenProps } from '../Navigation/types';

type Props = HouseholdSwipeScreenProps<'Today'>;

export default function TodayScreen({ navigation }: Props) {
  const { chores } = useChoresContext();
  //för att få tag i profil = user.id och household.id för att hitta profilen det gäller

  const handleGoToTaskDetails = (chore: Chore) => {
    // You can pass the chore data to the TaskDetails screen.
    navigation.navigate('TaskDetails', { chore });
  };

  return (
    <View>
      {chores.map((chore) => (
        <TouchableOpacity
          key={chore.id}
          onPress={() => handleGoToTaskDetails(chore)}
          style={{
            width: 390,
            height: 65,
            backgroundColor: ProjectTheme.buttonPrimary.color,
            borderRadius: ProjectTheme.borderRadius.medium,
            elevation: ProjectTheme.elevation.medium,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            paddingLeft: 15,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
            }}
          >
            {chore.name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: 'lightgrey',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
              }}
            >
              <Text style={{ color: 'black', fontSize: 16 }}>
                {chore.interval}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
