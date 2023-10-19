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
  const slectedUserId = React.useRef<string>('1'); // Ref to store the selected user id
  const [titel, setTitel] = React.useState('');
  const [discription, setDiscription] = React.useState('');
  const [interval, setInterval] = React.useState('');
  const [rating, setRating] = React.useState('');

  const handelAddTask = async () => {
    try {
      const taskData = {
        id: uuid.v4(),
        SlectedUserId: slectedUserId.current,
        Titel: titel,
        Discription: discription,
        Interval: parseInt(interval, 10),
        Rating: parseInt(rating, 10),
      };

      await AsyncStorage.setItem(
        taskData.id as string,
        JSON.stringify(taskData)
      );
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
          paddingLeft: 10,
          paddingRight: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            paddingTop: 14,
            justifyContent: 'center',
            alignContent: 'center',
            height: 66,
          }}
        >
          Skapa en ny syssla
        </Text>
      </View>
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: 'F2F2F2',
        }} />
      <View style={{
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 60,
      }}>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
            paddingLeft: 10,
          }}
          placeholder="Titel"
          value={titel}
          onChangeText={(text) => setTitel(text)}
        />
        <TextInput
          style={{
            height: 100,
            borderColor: 'gray',
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
            paddingLeft: 10,
          }}
          placeholder="Beskrivning"
          value={discription}
          onChangeText={(text) => setDiscription(text)}
          multiline
          numberOfLines={4}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            paddingLeft: 10,
          }}
          placeholder="Återkommer:"
          value={interval.toString()} // Convert to string
          onChangeText={(text) => setInterval(text)}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            paddingLeft: 10,
          }}
          placeholder="Värde:"
          value={rating.toString()} // Convert to string
          onChangeText={(text) => setRating(text)}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 20,
          }}
        >
          <Button
            style={{
              marginBottom: 5,
              height: 50,
              justifyContent: 'center',
              backgroundColor: ProjectTheme.colors.primary
            }}
            icon="camera"
            mode="contained"
            onPress={handelAddTask}
            labelStyle={{ color: ProjectTheme.colors.secondary }}
            rippleColor={ProjectTheme.colors.background}
          >
            Spara
          </Button>
          <Button
            style={{
              marginBottom: 5,
              height: 50,
              justifyContent: 'center',
              backgroundColor: ProjectTheme.colors.primary
            }}
            icon="camera"
            mode="contained"
            onPress={() => navigation.navigate('Profile')}
            labelStyle={{ color: ProjectTheme.colors.secondary }}
            rippleColor={ProjectTheme.colors.background}
          >
            Stäng
          </Button>
        </View>
      </View>
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
