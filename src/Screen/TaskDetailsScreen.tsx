import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { ProjectTheme } from '../../theme/theme';
import { RootStackParamList } from '../Navigation/RootNavigator';

interface Task {
  id: string;
  slectedHomeId: string;
  name: string;
  imageUri: string;
  discription: string;
  interval: string;
  task_rating: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetails'>;

export default function TaskDetailsScreen({ navigation }: Props) {
  const [taskData, setTaskData] = useState<Task | null>(null);
  const slectedUserId = React.useRef<string>('1');
  const slectedHomeId = React.useRef<string>('1');
  const slectedtaskData_id = React.useRef<string>('1');
  const slectedoner_id = React.useRef<string>('1');
  async function getTaskDataFromAsyncStorage() {
    try {
      const storedTaskData = await AsyncStorage.getItem('taskDataKey');
      if (storedTaskData !== null) {
        setTaskData(JSON.parse(storedTaskData));
        console.log('Task data retrieved from AsyncStorage:', storedTaskData);
      }
    } catch (error) {
      console.error('Error retrieving task data:', error);
    }
  }
  useEffect(() => {
    getTaskDataFromAsyncStorage();
  }, []);
  const handelTaskAvklarat = async () => {
    try {
      const taskEvent = {
        id: uuid.v4(),
        user_id: slectedUserId.current,
        home_id: slectedHomeId.current,
        task_id: taskData?.id.toString(),
        date: new Date(),
      };
      await AsyncStorage.setItem('taskEventKey', JSON.stringify(taskEvent));
      console.log(taskEvent);
      navigation.navigate('Household');
    } catch (error) {
      console.log(error);
    }
  };
  const handelRedigera = () => {
    if (slectedUserId.current === slectedoner_id.current) {
      navigation.navigate('EditTask');
    } else {
      console.log(Error);
      navigation.navigate('TaskDetails');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'F2F2F2' }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'F2F2F2',
        }}
      >
        <ScrollView>
          {taskData ? (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'F2F2F2',
                margin: 10,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <Text style={{ paddingBottom: 10 }}>ID: {taskData.id}</Text>
              <Text style={{ paddingBottom: 10 }}>
                Selected Home ID: {taskData.slectedHomeId}
              </Text>
              <Text style={{ paddingBottom: 10 }}>Title: {taskData.name}</Text>
              <Text style={{ paddingBottom: 10 }}>
                Description: {taskData.discription}
              </Text>
              <Text style={{ paddingBottom: 10 }}>
                Interval: {taskData.interval}
              </Text>
              <Text style={{ paddingBottom: 10 }}>
                Rating: {taskData.task_rating}
              </Text>
              {Image && (
                <Image
                  source={{ uri: taskData.imageUri }}
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
            icon="application-edit-outline"
            mode="contained"
            onPress={handelRedigera}
            labelStyle={{ color: ProjectTheme.colors.secondary }}
            rippleColor={ProjectTheme.colors.background}
          >
            Redigera
          </Button>
        </View>
      </View>
    </View>
  );
}
