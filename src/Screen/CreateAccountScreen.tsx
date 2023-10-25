import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { ProjectTheme } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';
import Button from '../Component/BottomButtonComponent';
import { mockedProfile } from '../../data/mockedProfiles';
import { Account, mockedAccounts } from '../../data/mockedAccount';
import { useAccountContext } from '../Context/AccountContext';

export default function CreateAccountScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');
  const { setAccountData, account } = useAccountContext();
  const [isAccountSet, setIsAccountSet] = useState(false);

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

  useEffect(() => {
    if (account) {
      console.log('account: ', account);
      navigation.navigate('Login');
    }
  }, [account]);

  const handleRegistration = () => {
    const today = new Date();

    const newAccount = {
      id: Number(today.getMilliseconds().toString().slice(-4)),
      username: username,
      password: password,
      userId: mockedProfile.length + 1,
    };

    console.log('New Account:', newAccount);
    //måste trycka på spara två gånger för statet hinner inte sättas direkt, kanske n use effect eller ngt?
    setAccountData(newAccount);
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
