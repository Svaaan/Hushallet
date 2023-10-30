import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
      //alla hem som profiler har till state
      setHomesByProfiles(profiles);
    }
  };

  const getProfileId = (homeId: number) => {
    const profile = profiles.find((p) => p.homeId === homeId);
    if (profile) {
      return profile.id;
    }
  };

  useEffect(() => {
    updateAllStates();
  }, [account]);

  const navigateToUserProfile = (profile_id: number, homeId: number) => {
    console.log('Aktiv profil data: ', profiles);
    enterHome(homeId);
    navigation.navigate('Profile', { userId: profile_id });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: ProjectTheme.colors.background,
        paddingTop: 200,
      }}
    >
      {account && homes.length === 0 ? (
        <View style={{ alignItems: 'center' }}>
          <Text>Få ordning och reda i hemmet med hela familjen.</Text>
          <Text> Skapa ett hem nedan!</Text>
        </View>
      ) : (
        homes.map((home: Home) => (
          <View key={home.id}>
            <TouchableOpacity
              onPress={() => {
                const profileId = getProfileId(home.id);
                if (profileId) {
                  navigateToUserProfile(profileId, home.id);
                  console.log('ProfileID', profileId);
                  console.log('HomeId',home.id);
                }
              }}
            >
              <Text>{home.name}</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
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
