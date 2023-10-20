import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { ProjectTheme } from '../../theme/theme';
import { mockUsers } from '../../data/mockedUsers';
import { mockedAccounts } from '../../data/mockedAccount';
import { useNavigation } from '@react-navigation/native';

export default function CreateAccountScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');

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

  const buttonStyle = {};

  const navigation = useNavigation();

  const handleRegistration = () => {
    const newAccount = {
      id: mockedAccounts.length + 1,
      username: username,
      password: password,
      userId: mockUsers.length + 1,
    };

    const newUser = {
      id: mockUsers.length + 1,
      avatar: '',
      name: name,
      code: 0,
      is_paused: false,
      claimedChores: [],
      is_owner: false,
    };

    console.log('New User:', newUser);
    console.log('New Account:', newAccount);

    mockedAccounts.push(newAccount);
    mockUsers.push(newUser);

    navigation.navigate('Login');
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
      <View style={{ justifyContent: 'flex-start' }}>
        <TextInput
          style={placeholderStyle}
          placeholder="Namn"
          placeholderTextColor={ProjectTheme.inputPlaceholderColor}
          onChangeText={(text) => setname(text)}
          value={name}
        />

        <TextInput
          style={placeholderStyle}
          placeholder="Användarnamn"
          placeholderTextColor={ProjectTheme.inputPlaceholderColor}
          onChangeText={(text) => setUsername(text)}
          value={username}
        />

        <TextInput
          style={placeholderStyle}
          placeholder="Lösenord"
          placeholderTextColor={ProjectTheme.inputPlaceholderColor}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width:"100%",
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          style={{
            width: 160,
            height: 40,
            backgroundColor: ProjectTheme.buttonPrimary.color,
            borderRadius: ProjectTheme.borderRadius.medium,
            elevation: ProjectTheme.elevation.medium,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            console.log('Spara button pressed'); // Add this line for debugging
            handleRegistration();
          }}
        >
          <Text style={{ color: ProjectTheme.colors.textcolor }}>Spara</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 160,
            height: 40,
            backgroundColor: ProjectTheme.buttonPrimary.color,
            borderRadius: ProjectTheme.borderRadius.medium,
            elevation: ProjectTheme.elevation.medium,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.navigate('Start');
          }}
        >
          <Text style={{ color: ProjectTheme.colors.textcolor }}>Stäng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
