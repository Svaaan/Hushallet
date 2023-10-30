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

          <TextInput value={`Namn: ${profile.name}`} editable={false} />

          <TextInput
            value={`Hushålls namn: ${enteredHome?.name}`}
            editable={false}
          />
          <TextInput
            value={`Hushålls ägare: ${profile.is_owner ? 'Ja' : 'Nej'}`}
            editable={false}
          />
          <TextInput
            value={`Pausat konto: ${!profile.is_paused ? 'Ja' : 'Nej'}`}
            editable={false}
          />
        </View>
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
