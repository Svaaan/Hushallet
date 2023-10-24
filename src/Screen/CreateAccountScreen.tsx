import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { ProjectTheme } from '../../theme/theme';
import { mockUsers } from '../../data/mockedUsers';
import { mockedAccounts } from '../../data/mockedAccount';
import { useNavigation } from '@react-navigation/native';
import Button from '../Component/BottomButtonComponent';

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
          width: '100%',
        }}
      >
        <Button
          title="Spara"
          onPress={() => {
            handleRegistration();
          }}
        />

        <Button
          title="Stäng"
          onPress={() => {
            navigation.navigate('Start');
          }}
        />
      </View>
    </View>
  );
}
