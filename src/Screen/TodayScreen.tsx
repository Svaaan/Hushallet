import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { HouseholdSwipeScreenProps } from '../Navigation/types';
import { useUserContext } from '../Context/UserContext';

type Props = HouseholdSwipeScreenProps<'Today'>;

export default function TodayScreen({ navigation }: Props) {


  //för att få tag i profil = user.id och household.id för att hitta profilen det gäller

  const handleGoToTaskDetails = () => {
    navigation.navigate('TaskDetails');
  };

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
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
