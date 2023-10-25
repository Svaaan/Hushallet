import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { ProjectTheme } from '../../theme/theme';
import { RootStackScreenProps } from '../Navigation/types';
import { useProfileContext } from '../Context/ProfileContext';
import { useAccountContext } from '../Context/AccountContext';

type Props = RootStackScreenProps<'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAccountContext();
  const { setProfilesByAccountId, profiles } = useProfileContext();
  const { account } = useAccountContext();

  //loggas inte in när man skapat konto
  async function handleLogin() {
    console.log('account state: ', account);
    console.log(username, password);
    const success = await login(username, password);
    console.log('konto som loggar in:', username);
    if (account) {
      setProfilesByAccountId(account.id);
    }
    if (success) {
      navigation.navigate('MyHouseholds');
    }
  }

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
        justifyContent: 'flex-start',
        backgroundColor: ProjectTheme.colors.background,
        paddingTop: 270,
      }}
    >
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

      <TouchableOpacity
        style={{
          width: 300,
          height: 40,
          backgroundColor: ProjectTheme.buttonPrimary.color,
          borderRadius: ProjectTheme.borderRadius.medium,
          elevation: ProjectTheme.elevation.medium,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 20,
        }}
        onPress={handleLogin}
      >
        <Text style={{ color: ProjectTheme.colors.textcolor }}>Logga In</Text>
      </TouchableOpacity>
    </View>
  );
}
