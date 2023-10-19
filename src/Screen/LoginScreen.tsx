import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { ProjectTheme } from '../../theme/theme';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
        }}
        onPress={() => {}}
      >
        <Text style={{ color: ProjectTheme.colors.textcolor }}>
          Logga In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
