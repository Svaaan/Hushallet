import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Image, TextInput, View, Text, StyleSheet } from 'react-native';
import { Checkbox, Button } from 'react-native-paper';
import { ProjectTheme } from '../../theme/theme';
//import Button from '../Component/BottomButtonComponent';
import ChooseEmoji from '../Component/ChooseEmoji';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'JoinHousehold'>;

export default function JoinHouseholdScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');

  const handleAvatarSelection = (avatar: string) => {
    setSelectedAvatar(avatar);
  };

  const saveUserData = async () => {
    const newProfile = {
      name: name,
      code: code,
      avatar: selectedAvatar,
    };
    try {
      const profileString = JSON.stringify(newProfile);

      await AsyncStorage.setItem('userProfile', profileString);
      console.log('New profile saved to AsyncStorage: ', newProfile);
    } catch (error) {
      console.log('Error saving profile to AsyncStorage: ', error);
    }
  };

  const retrieveUserData = async () => {
    try {
      const profileString = await AsyncStorage.getItem('userProfile');
      if (profileString !== null) {
        const userProfile = JSON.parse(profileString);
        console.log('Retrieved profile from AsyncStorage: ', userProfile);
      } else {
        console.log('No profile found in AsyncStorage.');
      }
    } catch (error) {
      console.log('Error retrieving profile from AsyncStorage: ', error);
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
          onChangeText={(text) => setCode(text)}
          value={code}
        />
      </View>

      <View style={{position:'absolute', top: 160}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Välj tillgänglig avatar
        </Text>
      </View>

      <View
        style={{
          position: 'absolute',
          top: 200
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
        <View style={styles.footer}>
          <Button
            textColor="black"
            style={styles.button}
            onPress={() => {
              saveUserData();
              navigation.navigate('MyHouseholds');
            }}
          >
            Anslut
          </Button>
          <Button
            textColor="black"
            style={styles.button}
            onPress={() => {
              navigation.navigate('MyHouseholds');
            }}
          >
            Stäng
          </Button>
          <Button
            textColor="black"
            style={styles.button}
            onPress={() => {
              retrieveUserData();
            }}
          >
            Hämta
          </Button>
        </View>
      </View>
    </View>
  );
}

const placeholderStyle = {
  width: 300,
  height: 40,
  backgroundColor: ProjectTheme.inputBackground,
  borderRadius: ProjectTheme.borderRadius.medium,
  paddingLeft: 10,
  marginBottom: 10,
  color: ProjectTheme.colors.textcolor,
  elevation: ProjectTheme.elevation.small,
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 0,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  footer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 0,
    left: 0,
    right: 0,
  },
});