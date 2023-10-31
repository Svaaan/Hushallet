import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { ProjectTheme } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';
import Button from '../Component/BottomButtonComponent';
import { mockedProfile } from '../../data/mockedProfiles';
import { useAccountContext } from '../Context/AccountContext';

export default function CreateAccountScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAccountData, account } = useAccountContext();
  const [isAccountSet, setIsAccountSet] = useState(false);

  const placeholderStyle = {
    width: 300,
    height: 45,
    backgroundColor: ProjectTheme.inputBackground,
    borderRadius: ProjectTheme.borderRadius.medium,
    paddingLeft: 10,
    marginBottom: 45,
    color: ProjectTheme.colors.textcolor,
    elevation: ProjectTheme.elevation.small,
  };

  const navigation = useNavigation();

  useEffect(() => {
    if (isAccountSet) {
      console.log('account: ', account);
      navigation.navigate('Login');
    }
  }, [isAccountSet, account, navigation]);

  const handleRegistration = () => {
    const today = new Date();

    const newAccount = {
      id: Number(today.getMilliseconds().toString().slice(-4)),
      username,
      password,
      userId: mockedProfile.length + 1,
    };

    console.log('New Account:', newAccount);

    setAccountData(newAccount);
    setIsAccountSet(true); // Set the flag to true after setting the account data
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
