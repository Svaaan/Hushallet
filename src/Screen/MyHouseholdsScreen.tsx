import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { mockedHomes} from '../../data/mockedHomes';

type Props = NativeStackScreenProps<RootStackParamList, 'MyHouseholds'>;

export default function MyHouseholdsScreen({ navigation }: Props) {
  return (
    <View>
      <Text>
        {mockedHomes.map((home) => (
          <View key={home.id}>
            <Text>Name: {home.name}</Text>
            <Text>Owner ID: {home.owner_id}</Text>
            <Text>Home Code: {home.home_code}</Text>
          </View>
        ))}
      </Text>
    </View>
  );
}