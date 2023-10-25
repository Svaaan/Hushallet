import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { useProfileContext } from '../Context/ProfileContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation, route }: Props) {
  const { getProfileById } = useProfileContext();

  const profileId = route.params.userId;
  const profile = getProfileById(profileId);

  return (
    <View style={styles.container}>
      <Text>User ID: {profile?.id}</Text>
      <Text>Username: {profile?.name}</Text>
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
