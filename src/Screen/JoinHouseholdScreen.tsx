import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { ProjectTheme } from '../../theme/theme';
import Button from '../Component/BottomButtonComponent';
import EmojiSelection from '../Component/ChooseAvatar';

type Props = NativeStackScreenProps<RootStackParamList, 'JoinHousehold'>;

export default function JoinHouseholdScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');

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
        paddingTop: 75, 
      }}
    >
      <View>
        <TextInput
          style={placeholderStyle}
          placeholder="Namn"
          placeholderTextColor={ProjectTheme.inputPlaceholderColor}
          onChangeText={(text) => setName(text)}
          value={name}
        />

        <TextInput
          style={placeholderStyle}
          placeholder="Hushålls kod"
          placeholderTextColor={ProjectTheme.inputPlaceholderColor}
          onChangeText={(text) => setCode(text)}
          value={code}
        />

        <EmojiSelection
          selectedEmoji={selectedEmoji}
          onSelectEmoji={(emoji) => setSelectedEmoji(emoji)}
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
          title="Tillbaka"
          onPress={() => {
            // Here, you can also send the selectedEmoji along with other data when saving
            navigation.navigate('MyHouseholds');
          }}
        />

        <Button
          title="Anslut"
          onPress={() => {
            navigation.navigate('MyHouseholds');
          }}
        />
      </View>
    </View>
  );
}
