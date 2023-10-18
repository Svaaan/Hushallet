import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ProjectTheme } from '../../theme/theme';

import { RootStackParamList } from '../Navigation/RootNavigator';
import { TextInput } from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateHome'>;

export default function CreateHomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* Custom header */}
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
    </View>
  );
}

const theme = ProjectTheme;

const styles = StyleSheet.create({
  container: {
    flex: theme.containerStyle.flex,
  },
  header: {
    padding: 10,
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
  },
});
