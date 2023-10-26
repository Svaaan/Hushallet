import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ProjectTheme } from '../../theme/theme';
import { Home, mockedHomes } from '../../data/mockedHomes';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { Button, TextInput } from 'react-native-paper';
import { useAccountContext } from '../Context/AccountContext';
import { useHomeContext } from '../Context/HomeContext';
import { ProfileProvider } from '../Context/ProfileContext';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateHousehold'>;

export default function CreateHouseholdScreen({ navigation }: Props) {
  const [householdName, setHouseholdName] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const { account } = useAccountContext();
  const { createHome } = useHomeContext();

  useEffect(() => {
    const uniqueCode = findUniqueCode(
      mockedHomes.map((home) => home.home_code)
    );
    setGeneratedCode(uniqueCode.toString());
  }, []);

  const handleSaveButtonPress = () => {
    if (householdName !== '' && account) {
      const newHousehold: Home = {
        id: mockedHomes.length + 1,
        name: householdName,
        profile_id: account.id,
        home_code: parseInt(generatedCode),
      };
      console.log('hushåll som ska pushas in: ', newHousehold);
      mockedHomes.push(newHousehold);
      createHome(newHousehold);
      navigation.navigate('MyHouseholds');
    }
  };

  const handleBackButtonPress = () => {
    navigation.navigate('MyHouseholds');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Skapa Hushåll</Text>
      </View>
      <TextInput
        placeholder="Namn på hushåll"
        style={styles.input}
        onChangeText={(text) => setHouseholdName(text)}
        value={householdName}
      />
      <TextInput
        placeholder="Genererad kod"
        style={styles.input}
        value={generatedCode}
        editable={false}
      />
      <View style={styles.footer}>
        <Button
          textColor="black"
          style={styles.button}
          mode="contained"
          onPress={() => handleSaveButtonPress()}
        >
          Spara
        </Button>
        <Button
          textColor="black"
          style={styles.button}
          mode="contained"
          onPress={() => handleBackButtonPress()}
        >
          Tillbaka
        </Button>
      </View>
    </View>
  );
}

function generateUniqueRandomCode(existingCodes: number[]) {
  function generateRandomCode() {
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  }
  let randomCode;
  do {
    randomCode = generateRandomCode();
  } while (existingCodes.includes(randomCode));
  return randomCode;
}

function findUniqueCode(existingCodes: number[]): number {
  let uniqueCode;
  do {
    uniqueCode = generateUniqueRandomCode(existingCodes);
  } while (existingCodes.includes(uniqueCode));
  return uniqueCode;
}

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
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 0,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
});
