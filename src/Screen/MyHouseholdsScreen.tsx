import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { ProjectTheme } from '../../theme/theme';
import Button from '../Component/BottomButtonComponent';
import { Home } from '../../data/mockedHomes';
import { useAccountContext } from '../Context/AccountContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { useHomeContext } from '../Context/HomeContext';
import { useProfileContext } from '../Context/ProfileContext';

type Props = NativeStackScreenProps<RootStackParamList, 'MyHouseholds'>;

export default function MyHouseholdsScreen({ navigation }: Props) {
  const { account } = useAccountContext();
  const { profiles } = useProfileContext();
  const { homes, setHomesByProfiles, enterHome } = useHomeContext();

  const updateAllStates = () => {
    if (profiles) {
      // alla hem som profiler har till state
      setHomesByProfiles(profiles);
    }
  };

  const getProfileId = (homeId: number) => {
    const profile = profiles.find((p) => p.homeId === homeId);
    if (profile) {
      return profile.id;
    }
    return 500;
  };

  const getProfileAvatar = (profileId: number) => {
    const profile = profiles.find((p) => p.id === profileId);
    return profile?.avatar;
  };

  useEffect(() => {
    updateAllStates();
  }, [account]);

  const navigateToUserProfile = (profile_id: number, homeId: number) => {
    console.log('Aktiv profil data: ', profiles);
    enterHome(homeId);
    navigation.navigate('Profile', { userId: profile_id });
  };

  const placeholderStyle = {
    width: 300,
    height: 45,
    backgroundColor: ProjectTheme.inputBackground,
    borderRadius: ProjectTheme.borderRadius.medium,
    paddingLeft: 10,
    color: ProjectTheme.colors.textcolor,
    elevation: ProjectTheme.elevation.small,
  };

  const avatarImageStyle = {
    width: 35,
    height: 35,
    marginLeft: 260,
    bottom: 40
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: ProjectTheme.colors.background,
      }}
    >
      <View style={{ paddingTop: 40 }}>
        {account && homes.length === 0 ? (
          <View style={{ alignItems: 'center' }}>
            <Text>Få ordning och reda i hemmet med hela familjen.</Text>
            <Text> Skapa ett hem nedan!</Text>
          </View>
        ) : (
          homes.map((home: Home) => (
            <View
              key={home.id}
              style={{
                marginVertical: 1,
              }}
            >
              <TouchableOpacity
                key={home.id}
                onPress={() => {
                  const profileId = getProfileId(home.id);
                  if (profileId) {
                    navigateToUserProfile(profileId, home.id);
                  }
                }}
                style={{ marginVertical: 20 }}
              >
                <TextInput
                  style={placeholderStyle}
                  placeholder="Hushålls namn"
                  value={`Hushåll: ${home.name}`}
                  editable={false}
                />
                <Image
                  style={{
                    ...avatarImageStyle,
                  }}
                  source={{
                    uri: getProfileAvatar(getProfileId(home.id))
                  }}
                />
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
        }}
      >
        <Button
          title="Gå med i hushåll"
          onPress={() => {
            navigation.navigate('JoinHousehold');
          }}
        />
        <Button
          title="Skapa hushåll"
          onPress={() => {
            navigation.navigate('CreateHousehold');
          }}
        />
      </View>
    </View>
  );
}