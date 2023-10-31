import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ProjectTheme } from '../../theme/theme';
import { Home, mockedHomes } from '../../data/mockedHomes';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { TextInput } from 'react-native-paper';
import { useAccountContext } from '../Context/AccountContext';
import { useHomeContext } from '../Context/HomeContext';
import { Profile, mockedProfile } from '../../data/mockedProfiles';
import { useProfileContext } from '../Context/ProfileContext';
import Button from '../Component/BottomButtonComponent';
import ChooseEmoji from '../Component/ChooseEmoji';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateHousehold'>;

const placeholderStyle = {
  width: 300,
  height: 45,
  backgroundColor: ProjectTheme.inputBackground,
  borderRadius: ProjectTheme.borderRadius.small,
  paddingLeft: 10,
  marginTop: 20,
  color: ProjectTheme.colors.textcolor,
  elevation: ProjectTheme.elevation.small,
};

export default function CreateHouseholdScreen({ navigation }: Props) {
  const [householdName, setHouseholdName] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [profileName, setProfileName] = useState('');

  const { account } = useAccountContext();
  const { createHome } = useHomeContext();

  const [selectedAvatar, setSelectedAvatar] = useState('');
  const { createProfile } = useProfileContext();

  const handleAvatarSelection = (avatar: string) => {
    setSelectedAvatar(avatar);
  };

  useEffect(() => {
    const uniqueCode = findUniqueCode(
      mockedHomes.map((home) => home.home_code)
    );
    setGeneratedCode(uniqueCode.toString());
  }, []);

  const handleSaveButtonPress = () => {
    if (householdName !== '' && account) {
      console.log(mockedHomes[mockedHomes.length - 1].id);
      const homeId = mockedHomes[mockedHomes.length - 1].id + 1;
      const newHousehold: Home = {
        id: homeId,
        name: householdName,
        home_code: Number(generatedCode),
      };
      mockedHomes.push(newHousehold);
      createHome(newHousehold);
      console.log('hushåll som ska pushas in: ', newHousehold);
      const profileId = mockedProfile[mockedProfile.length - 1].id + 1;
      const setOwner: Profile = {
        is_owner: true,
        id: profileId,
        name: profileName,
        avatar: selectedAvatar,
        is_paused: false,
        account_id: account.id,
        homeId: homeId,
      };
      mockedProfile.push(setOwner);
      createProfile(setOwner);
      console.log('profilen skapades: ', setOwner);

      navigation.navigate('MyHouseholds');
    }
  };

  const handleBackButtonPress = () => {
    navigation.navigate('MyHouseholds');
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: ProjectTheme.colors.background,
        justifyContent: 'space-between',
      }}
    >
      <View>
        <TextInput
          placeholder="Namn på hushåll"
          style={placeholderStyle}
          onChangeText={(text) => setHouseholdName(text)}
          value={householdName}
        />
        <TextInput
          placeholder="Profilnamn"
          style={placeholderStyle}
          onChangeText={(text) => setProfileName(text)}
          value={profileName}
        />
        <TextInput
          placeholder="Genererad kod"
          style={placeholderStyle}
          value={generatedCode}
          editable={false}
        />
      </View>
      <View style={{ position: 'absolute', top: 210, alignSelf: 'center' }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
          Välj tillgänglig avatar
        </Text>
      </View>

      <View
        style={{
          position: 'absolute',
          top: 240,
          left: 50,
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
        <Button title="Spara" onPress={() => handleSaveButtonPress()} />
        <Button title="Stäng" onPress={() => handleBackButtonPress()} />
      </View>
    </View>
  );
}

function generateUniqueRandomCode(existingCodes: number[]) {
  function generateRandomCode() {
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  }
  let randomCode;
  do {
    randomCode = generateRandomCode();
  } while (existingCodes.includes(randomCode));
  return randomCode;
}

function findUniqueCode(existingCodes: number[]): number {
  let uniqueCode;
  do {
    uniqueCode = generateUniqueRandomCode(existingCodes);
  } while (existingCodes.includes(uniqueCode));
  return uniqueCode;
}
