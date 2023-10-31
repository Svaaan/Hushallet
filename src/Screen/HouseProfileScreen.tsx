import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { ProjectTheme } from '../../theme/theme';
import Button from '../Component/BottomButtonComponent';
import { useProfileContext } from '../Context/ProfileContext';
import { Profile } from '../../data/mockedProfiles';
import { useHomeContext } from '../Context/HomeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation, route }: Props) {
  const profile_id: number = route.params.userId;

  const { profiles } = useProfileContext();
  const profile: Profile | undefined = profiles.find(
    (p) => p.id === profile_id
  );
  const { enteredHome } = useHomeContext();

  const placeholderStyle = {
    width: 300,
    height: 45,
    backgroundColor: ProjectTheme.inputBackground,
    borderRadius: ProjectTheme.borderRadius.medium,
    paddingLeft: 10,
    marginBottom: 25,
    color: ProjectTheme.colors.textcolor,
    elevation: ProjectTheme.elevation.small,
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: ProjectTheme.colors.background,
        paddingTop: 70,
        justifyContent: 'space-between',
      }}
    >
      {profile ? (
        <View>
          <View>
            <Image
              source={{ uri: profile.avatar }}
              style={{
                width: 35,
                height: 35,
                alignItems: 'center',
                paddingRight: 10,
                marginBottom: 5,
              }}
            />
          </View>

          <TextInput
            style={placeholderStyle}
            placeholder="Namn"
            value={`Namn: ${profile.name}`}
            editable={false}
          />

          <TextInput
            style={placeholderStyle}
            placeholder="Hushålls namn"
            value={`Hushålls namn: ${enteredHome?.name}`}
            editable={false}
          />
          <TextInput
            style={placeholderStyle}
            placeholder="Hushålls ägare"
            value={`Hushålls ägare: ${profile.is_owner ? 'Ja' : 'Nej'}`}
            editable={false}
          />
          <TextInput
            style={placeholderStyle}
            placeholder="Pausat konto"
            value={`Pausat konto: ${!profile.is_paused ? 'Ja' : 'Nej'}`}
            editable={false}
          />
        </View>
      ) : (
        <Text>Profile not found</Text>
      )}

      <View
        style={{
          marginBottom: 230,
        }}
      >
        <Button
          title="Mina Sysslor"
          onPress={() => {
            navigation.navigate('SwipeNav');
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
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
