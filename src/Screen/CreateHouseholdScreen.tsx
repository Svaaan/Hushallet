import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ProjectTheme } from '../../theme/theme';

import { RootStackParamList } from '../Navigation/RootNavigator';
import { Button, TextInput } from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateHousehold'>;

export default function CreateHouseholdScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Skapa Hushåll</Text>
      </View>
      <TextInput
        placeholder="Titel"
        style={styles.input}
      />
      <TextInput
        placeholder="Ägare"
        style={styles.input}
      />
      <View style={styles.footer}>
        <Button style={styles.button} mode="contained" onPress={() => counter + 1}>
          Spara
        </Button>
        <Button style={styles.button} mode="contained" onPress={() => counter - 1}>
          Avbryt
        </Button>
      </View>
    </View>
  );
}

let counter = 0;

const theme = ProjectTheme;

const styles = StyleSheet.create({
  container: {
    flex: theme.containerStyle.flex,
  },
  header: {
    padding: 10,
    backgroundColor: theme.headerBackgroundColor,
    elevation: 10,
  },
  headerText: {
    color: theme.headerTitleColor,
    fontSize: theme.typography.header.fontSize,
    fontWeight: theme.typography.header.fontWeight,
    textAlign: 'center',
  },
  input: {
    backgroundColor: theme.inputBackground,
    color: theme.inputPlaceholderColor,
    borderRadius: 10,
    height: 55,
    width: 350,
    marginLeft: 20,
    marginTop: 15,
    elevation: 5,
  },
  footer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button:{
    flex: 1, // Make buttons expand to fill the entire footer width
    borderWidth: 1, // Add a thin border to separate the buttons
    borderRadius: 0,
    borderColor: '#ccc', // Border color
    alignItems: 'center',
    backgroundColor: 'white',
    height: 80,
  }
});
