import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { ProjectTheme } from '../../theme/theme';
import Button from '../Component/BottomButtonComponent';

type Props = NativeStackScreenProps<RootStackParamList, 'EditHousehold'>;

export default function EditHouseholdScreen({ navigation }: Props) {
  const [newName, setName] = useState('');
  const [newOwner, setOwner] = useState('');

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
          placeholder="Nytt namn"
          placeholderTextColor={ProjectTheme.inputPlaceholderColor}
          onChangeText={(text) => setName(text)}
          value={newName}
        />

        <TextInput
          style={placeholderStyle} // Apply the placeholderStyle here
          placeholder="Nytt ägar namn"
          placeholderTextColor={ProjectTheme.inputPlaceholderColor}
          onChangeText={(text) => setOwner(text)}
          value={newOwner}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
        }}
      >
        <Button title="Spara" onPress={() => {}} />

        <Button title="Stäng" onPress={() => {}} />
      </View>
    </View>
  );
}
