import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { ProjectTheme } from '../../theme/theme';
import { useProfileContext } from '../Context/ProfileContext';
import { useHomeContext } from '../Context/HomeContext';
import { useEffect } from 'react';
import { Home } from '../../data/mockedHomes';
import Button from '../Component/BottomButtonComponent';

type Props = NativeStackScreenProps<RootStackParamList, 'MyHouseholds'>;

export default function MyHouseholdsScreen({ navigation }: Props) {
  const { profiles } = useProfileContext();
  const { homes, setHomesByProfiles } = useHomeContext();

  const updateAllStates = () => {
    if (profiles) {
      setHomesByProfiles(profiles);
      console.log('homes', homes);
    }
  };

  useEffect(() => {
    updateAllStates();
  }, []);

  const navigateToUserProfile = (owner_id: number) => {
    navigation.navigate('Profile', { userId: owner_id });
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
      {homes && homes.length > 0 ? (
        homes.map((home: Home) => (
          <View key={home.id}>
            <TouchableOpacity
              onPress={() => navigateToUserProfile(home.owner_id)}
            >
              <Text>{home.name}</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Text>Få ordning och reda i hemmet med hela familjen.</Text>
          <Text> Skapa ett hem nedan!</Text>
        </View>
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
