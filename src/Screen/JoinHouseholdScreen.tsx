import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { ProjectTheme } from '../../theme/theme';
import Button from '../Component/BottomButtonComponent';
import MyHouseholdsScreen from './MyHouseholdsScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'JoinHousehold'>;

export default function JoinHouseholdScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const placeholderStyle = {
    width: 300,
    height: 40,
    backgroundColor: ProjectTheme.inputBackground,
    borderRadius: ProjectTheme.borderRadius.medium,
    paddingLeft: 10,
    marginBottom: 20,
    color: ProjectTheme.colors.textcolor,
    elevation: ProjectTheme.elevation.small,
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
      <View style={{}}>
        <TextInput
          style={placeholderStyle} // Apply the placeholderStyle here
          placeholder="Namn"
          placeholderTextColor={ProjectTheme.inputPlaceholderColor}
          onChangeText={(text) => setName(text)}
          value={name}
        />

        <TextInput
          style={placeholderStyle} // Apply the placeholderStyle here
          placeholder="Hushålls kod"
          placeholderTextColor={ProjectTheme.inputPlaceholderColor}
          onChangeText={(text) => setCode(text)}
          value={code}
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
          title="Spara"
          onPress={() => {
            navigation.navigate('MyHouseholds')
          }}
        />

        <Button
          title="Stäng"
          onPress={() => {
            navigation.navigate('MyHouseholds')
          }}
        />
      </View>
    </View>
  );
}
