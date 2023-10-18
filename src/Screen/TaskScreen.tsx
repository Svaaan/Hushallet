import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { ProjectTheme } from '../../theme/theme';
import { RootStackParamList } from '../Navigation/RootNavigator';

// Import statements

type Props = NativeStackScreenProps<RootStackParamList, 'Task'>;

export default function TaskScreen({ navigation }: Props) {
  const [admin, setAdmin] = React.useState('Admin');
  const [titel, setTitel] = React.useState('');
  const [discription, setDiscription] = React.useState('');
  const [interval, setInterval] = React.useState('');
  const [rating, setRating] = React.useState('');

  const handelAddTask = async () => {
    try {
      const taskData = {
        id: uuid.v4(),
        Titel: titel,
        Discription: discription,
        Interval: parseInt(interval),
        Rating: parseInt(rating),
      };

      await AsyncStorage.setItem(taskData.id as string, JSON.stringify(taskData));
      console.log(taskData);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ backgroundColor: 'F2F2F2' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: 'FFFFFF',
        }}
      >
        <Text
          style={{
            fontSize: 30,
            paddingTop: 15,
            alignContent: 'center',
            height: 66,
          }}
        >
          Skapa en ny syssla
        </Text>
      </View>
      <TextInput
        placeholder='Titel'
        value={titel}
        onChangeText={(text) => setTitel(text)}
      />
      <TextInput
        placeholder={'Beskrivning'}
        value={discription}
        onChangeText={(text) => setDiscription(text)}
        multiline={true}
        numberOfLines={4}
      />
      <TextInput
        placeholder={'Återkommer:'}
        value={interval.toString()} // Convert to string
        onChangeText={(text) => setInterval(text)}
      />
      <TextInput
        placeholder={'Värde:'}
        value={rating.toString()} // Convert to string
        onChangeText={(text) => setRating(text)}
      />
      <Button
        style={{ marginBottom: 5 }}
        icon="camera"
        mode="contained"
        onPress={handelAddTask}
        labelStyle={{ color: ProjectTheme.colors.secondary }}
        rippleColor={ProjectTheme.colors.background}
      >
        Spara
      </Button>
      <Button
        style={{ marginBottom: 5 }}
        icon="camera"
        mode="contained"
        onPress={() => console.log('Button pressed')}
        labelStyle={{ color: ProjectTheme.colors.secondary }}
        rippleColor={ProjectTheme.colors.background}
      >
        Stäng
      </Button>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
