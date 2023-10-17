import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { ProjectTheme } from '../../theme/theme';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Start'>;

export default function StartScreen({ navigation }: Props) {
  const imageUrl = 'https://i.imgur.com/UvoPa2i.png'; // Image URL

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />

      <TouchableOpacity
        style={[styles.button, ProjectTheme.buttonPrimary]}
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, ProjectTheme.buttonPrimary]}
        onPress={() => {
          navigation.navigate('CreateAccount');
        }}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ProjectTheme.colors.secondary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    marginTop: 110,
    width: 200,
    height: 200,
  },
  button: {
    width: 200,
    height: 50,
    marginTop: 45, // Adjust the marginTop to increase the distance from the image
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ProjectTheme.borderRadius.medium,
  },
  buttonText: {
    color: ProjectTheme.buttonPrimary.color,
    fontSize: ProjectTheme.typography.body.fontSize,
  },
});
