import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View, Image } from 'react-native';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { ProjectTheme } from '../../theme/theme';
import Button from '../Component/BottomButtonComponent';
import { useProfileContext } from '../Context/ProfileContext';
import { Home } from '../../data/mockedHomes';
import { Profile } from '../../data/mockedProfiles';
import { useHomeContext } from '../Context/HomeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const nameStyle = {
  width: 300,
  height: 40,
  backgroundColor: ProjectTheme.inputBackground,
  borderRadius: ProjectTheme.borderRadius.medium,
  paddingLeft: 10,
  marginBottom: 20,
  color: ProjectTheme.colors.textcolor,
  elevation: ProjectTheme.elevation.small,
};

export default function ProfileScreen({ navigation, route }: Props) {
  // Retrieve the profile_id from the route parameters
  const profile_id: number = route.params.userId;

  // Retrieve the profile data based on profile_id
  const { profiles } = useProfileContext();
  const profile: Profile | undefined = profiles.find(
    (p) => p.id === profile_id
  );
  const { enteredHome } = useHomeContext();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: ProjectTheme.colors.background,
        paddingTop: 20,
      }}
    >
      {profile ? (
        <>
          <Text>ID: {profile.id}</Text>
          <Text>Namn: {profile.name}</Text>
          <Text>Hushåll: {enteredHome?.name}</Text>
          <Text>Hushålls ägare: {profile.is_owner ? 'Ja' : 'Nej'}</Text>
          <Text>Aktivt konto: {!profile.is_paused ? 'Ja' : 'Nej'}</Text>
          <Text>Min avatar:</Text>
          <Image
            source={{ uri: profile.avatar }}
            style={{ width: 100, height: 100 }}
          />
        </>
      ) : (
        <Text>Profile not found</Text>
      )}

      <Button
        title="Mina Sysslor"
        onPress={() => {
          navigation.navigate('SwipeNav');
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
          marginTop: 20,
        }}
      >
        <Button
          title="Redigera Hushåll"
          onPress={() => {
            navigation.navigate('EditHousehold');
          }}
        />

        <Button
          title="Översikt"
          onPress={() => {
            navigation.navigate('Users');
          }}
        />
      </View>
    </View>
  );
}
