import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { ProjectTheme } from '../../theme/theme';
import Button from '../Component/BottomButtonComponent';
import { useHomeContext } from '../Context/HomeContext';
import { useProfileContext } from '../Context/ProfileContext';
import { mockedHomes } from '../../data/mockedHomes';

type Props = NativeStackScreenProps<RootStackParamList, 'EditHousehold'>;

export default function EditHouseholdScreen({ navigation }: Props) {
  const [newName, setName] = useState('');
  const [newOwner, setOwner] = useState('');
  const { updateHomesWithOldName, setHomes, setHomesByProfiles } =
    useHomeContext();
  const { profiles } = useProfileContext();

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

  const handleSaveButtonPress = () => {
    // Update homes with oldName to have the name newName
    console.log('Profile', profiles[0].id);
    console.log('Connected Home', mockedHomes[0]);
    updateHomesWithOldName(mockedHomes[0].name, newName);
    navigation.goBack();
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
          style={placeholderStyle}
          placeholder="Nytt namn"
          placeholderTextColor={ProjectTheme.inputPlaceholderColor}
          onChangeText={(text) => setName(text)}
          value={newName}
        />

        <TextInput
          style={placeholderStyle}
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
        <Button
          title="Spara"
          onPress={() => {
            handleSaveButtonPress();
          }}
        />

        <Button
          title="Stäng"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
}
