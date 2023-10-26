import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { ProjectTheme } from '../../theme/theme';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetails'>;

interface chore {
  id: string;
  slectedHomeId: string;
  name: string;
  imageUri: string;
  discription: string;
  interval: string;
  task_rating: string;
}

const TaskDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [Chore, setChore] = useState<chore | null>(null);
  const slectedUserId = React.useRef<string>('1');
  const slectedHomeId = React.useRef<string>('1');
  const slectedoner_id = React.useRef<string>('1');
  async function getChoreFromAsyncStorage() {
    try {
      const storedChore = await AsyncStorage.getItem('ChoreKey');
      if (storedChore !== null) {
        setChore(JSON.parse(storedChore));
        console.log('Task data retrieved from AsyncStorage:', storedChore);
      }
    } catch (error) {
      console.error('Error retrieving chore:', error);
    }
  }
  useEffect(() => {
    getChoreFromAsyncStorage();
  }, []);
  const handelTaskAvklarat = async () => {
    try {
      const ChoreEvent = {
        id: uuid.v4(),
        user_id: slectedUserId.current,
        home_id: slectedHomeId.current,
        Chore_id: Chore?.id.toString(),
        date: new Date(),
      };
      await AsyncStorage.setItem('ChoreEventKey', JSON.stringify(ChoreEvent));
      console.log('ChoreEvent', ChoreEvent);
      navigation.navigate('Household');
    } catch (error) {
      console.log(error);
    }
  };
  const handelRedigera = () => {
    if (slectedUserId.current === slectedoner_id.current) {
      navigation.navigate('EditTask');
    } else {
      console.log('You are not the owner of this task');
      navigation.navigate('TaskDetails');
    }
  };
  const nameStyle = {
    width: '100%',
    height: 40,
    backgroundColor: ProjectTheme.inputBackground,
    borderRadius: ProjectTheme.borderRadius.medium,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    marginBottom: 20,
    color: ProjectTheme.colors.textcolor,
    elevation: ProjectTheme.elevation.small,
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: ProjectTheme.colors.background,
        paddingTop: 20,
      }}
    >
      <ScrollView>
        {Chore ? (
          <View>
            <Text style={nameStyle}>ID: {Chore.id}</Text>
            <Text style={nameStyle}>
              Selected Home ID: {Chore.slectedHomeId}
            </Text>
            <Text style={nameStyle}>Title: {Chore.name}</Text>
            <Text style={nameStyle}>Description: {Chore.discription}</Text>
            <Text style={nameStyle}>Interval: {Chore.interval}</Text>
            <Text style={nameStyle}>Rating: {Chore.task_rating}</Text>
            {Image && (
              <Image
                source={{ uri: Chore.imageUri }}
                style={{
                  width: 380,
                  height: 225,
                  alignSelf: 'center',
                  marginBottom: 10,
                }}
              />
            )}
          </View>
        ) : (
          <Text>Loading task data...</Text>
        )}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <Button
          style={{
            marginBottom: 5,
            height: 50,
            width: '48%',
            justifyContent: 'center',
            backgroundColor: ProjectTheme.colors.primary,
          }}
          icon="archive-plus-outline"
          mode="contained"
          onPress={handelTaskAvklarat}
          labelStyle={{ color: ProjectTheme.colors.secondary }}
          rippleColor={ProjectTheme.colors.background}
        >
          Avklarat
        </Button>
        <Button
          style={{
            elevation: ProjectTheme.elevation.large,
            marginBottom: 5,
            height: 50,
            width: '48%',
            justifyContent: 'center',
            backgroundColor: ProjectTheme.colors.primary,
          }}
          icon="archive-cog-outline"
          mode="contained"
          onPress={handelRedigera}
          labelStyle={{ color: ProjectTheme.colors.secondary }}
          rippleColor={ProjectTheme.colors.background}
        >
          Redigera
        </Button>
      </View>
    </View>
  );
};
export default TaskDetailsScreen;
