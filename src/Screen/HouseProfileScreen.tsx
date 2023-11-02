import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
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

  const imageContainerStyle = {
    width: 300,
    height: 45,
    backgroundColor: ProjectTheme.inputBackground,
    borderRadius: ProjectTheme.borderRadius.medium,
    elevation: ProjectTheme.elevation.small,
    color: ProjectTheme.colors.textcolor,
    paddingLeft: 10,
    marginBottom: 25,
  };

  const avatarImageStyle = {
    width: 35,
    height: 35,
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
          <View style={imageContainerStyle}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: ProjectTheme.colors.textcolor,
                  textAlign: 'center',
                }}
              >
                Min emoji:
              </Text>
              <Image
                style={{
                  ...avatarImageStyle,
                  marginLeft: 10,
                }}
                source={{ uri: profile.avatar }}
              />
            </View>
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
            placeholder="Husshålls kod"
            value={`Hushålls kod: ${enteredHome?.home_code}`}
            editable={false}
          />

          <TextInput
            style={placeholderStyle}
            placeholder="Hushålls ägare"
            value={`Hushålls ägare: ${profile.is_owner ? 'Ja' : 'Nej'}`}
            editable={false}
          />
        </View>
      ) : (
        <Text>Profile not found</Text>
      )}

      <View
        style={{
          marginBottom: 230,
          elevation: ProjectTheme.elevation.small,
          width: 300,
          height: 45,
          backgroundColor: ProjectTheme.inputBackground,
          borderRadius: ProjectTheme.borderRadius.medium,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SwipeNav');
          }}
          style={{ flex: 1, width: '100%' }}
        >
          <Text
            style={{
              color: ProjectTheme.colors.textcolor,
              paddingLeft: 109,
              marginTop: 10,
              fontWeight: 'bold',
            }}
          >
            Mina Sysslor
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginBottom: 10,
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
