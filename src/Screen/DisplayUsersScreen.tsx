import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import React from 'react';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { ProjectTheme } from '../../theme/theme';
import Button from '../Component/BottomButtonComponent';

type Props = NativeStackScreenProps<RootStackParamList, 'Users'>;

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

export default function DisplayUsersScreen({ navigation }: Props) {
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
      <View>
        <Text style={nameStyle}>Användare 1</Text>
        <Text style={nameStyle}>Användare 2</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
        }}
      >
        <Button title="Lägg till" onPress={() => {}} />
        <Button title="Ta bort" onPress={() => {}} />
      </View>
    </View>
  );
}
