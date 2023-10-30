import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import Button from '../Component/BottomButtonComponent';
import { ProjectTheme } from '../../theme/theme';
import ChooseEmoji from '../Component/ChooseEmoji';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { useHomeContext } from '../Context/HomeContext';
import { useProfileContext } from '../Context/ProfileContext';
import { useAccountContext } from '../Context/AccountContext';

type Props = NativeStackScreenProps<RootStackParamList, 'JoinHousehold'>;

export default function JoinHouseholdScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const { connectToHome } = useHomeContext();
  const { getAllProfiles } = useProfileContext();
  const { account } = useAccountContext();

  const handleAvatarSelection = (avatar: string) => {
    console.log('Selected avatar:', avatar);
    setSelectedAvatar(avatar);
  };

  const connectToHomeFunction = async () => {
    console.log('Start search');
    const allProfiles = getAllProfiles();
    if (account) {
      await connectToHome(
        parseInt(code),
        name,
        selectedAvatar,
        account,
        allProfiles
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: ProjectTheme.colors.background,
        paddingTop: 40,
      }}
    >
      <View>
        <TextInput
          style={placeholderStyle}
          placeholder="Ditt namn"
          placeholderTextColor={ProjectTheme.inputPlaceholderColor}
          onChangeText={(text) => setName(text)}
          value={name}
        />

        <TextInput
          style={placeholderStyle}
          placeholder="Hushålls kod"
          placeholderTextColor={ProjectTheme.inputPlaceholderColor}
          onChangeText={(text) => {
            // Use a regular expression to keep only numeric characters
            const numericText = text.replace(/[^0-9]/g, '');
            setCode(numericText);
          }}
          value={code}
        />
      </View>

      <View style={{ position: 'absolute', top: 180 }}>
        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
          Välj tillgänglig avatar
        </Text>
      </View>

      <View
        style={{
          position: 'absolute',
          top: 230,
        }}
      >
        <ChooseEmoji
          selectedEmoji={selectedAvatar}
          onSelectEmoji={handleAvatarSelection}
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
          title="Anslut"
          onPress={() => {
            connectToHomeFunction();
            navigation.navigate('MyHouseholds');
          }}
        />
        <Button
          title="Stäng"
          onPress={() => {
            navigation.navigate('MyHouseholds');
          }}
        />
      </View>
    </View>
  );
}

const placeholderStyle = {
  width: 300,
  height: 45,
  backgroundColor: ProjectTheme.inputBackground,
  borderRadius: ProjectTheme.borderRadius.medium,
  paddingLeft: 10,
  marginBottom: 15,
  color: ProjectTheme.colors.textcolor,
  elevation: ProjectTheme.elevation.small,
};
