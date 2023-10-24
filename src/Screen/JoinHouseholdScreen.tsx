import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { ProjectTheme } from '../../theme/theme';
import Button from '../Component/BottomButtonComponent';
import chickImage from '../../avatars/chick.png';
import foxImage from '../../avatars/fox.png';
import frogImage from '../../avatars/frog.png';
import octopusImage from '../../avatars/octopus.png';
import pigImage from '../../avatars/pig.png';
import whaleImage from '../../avatars/whale.png';

type Props = NativeStackScreenProps<RootStackParamList, 'JoinHousehold'>;

export default function JoinHouseholdScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');

  const availableAvatars = ['chick', 'fox', 'frog', 'octopus', 'pig', 'whale'];

  const handleAvatarSelection = (avatar) => {
    if (availableAvatars.includes(avatar)) {
      setSelectedAvatar(avatar);
  
      availableAvatars.splice(availableAvatars.indexOf(avatar), 1);
    } else {
      <Text>Avataren är inte tillgänglig!</Text>
    }
  };
  
  
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

  const saveUserData = () => {
    const newProfile = {
      name: name,
      code: code,
      avatar: selectedAvatar,
    }
    console.log('New profile created: ', newProfile);
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

      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginLeft: 5,
        }}
      >
        {availableAvatars.map((avatar) => (
          <View key={avatar} style={{ flexDirection: 'row', alignItems: 'center' }}>
             <View style={{ padding: 10, borderRadius: 30, backgroundColor: 'white' }}>
            <Checkbox
              status={selectedAvatar === avatar ? 'checked' : 'unchecked'}
              onPress={() => handleAvatarSelection(avatar)}
              color='black'
            />
            </View>
            <Image
              source={
                avatar === 'octopus'
                  ? octopusImage
                  : avatar === 'frog'
                  ? frogImage
                  : avatar === 'fox'
                  ? foxImage
                  : avatar === 'chick'
                  ? chickImage
                  : avatar === 'whale'
                  ? whaleImage
                  : pigImage
              }
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                borderWidth: selectedAvatar === avatar ? 2 : 0,
                borderColor: ProjectTheme.colors.primary,
                marginLeft: 260
              }}
            />
          </View>
        ))}
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
            saveUserData();
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
