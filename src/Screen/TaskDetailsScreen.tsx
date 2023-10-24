import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Button, Image, Text, View } from 'react-native';
import uuid from 'react-native-uuid';
import { RootStackParamList } from '../Navigation/RootNavigator';
type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetails'>;

interface Task {
  id: string;
  slectedHomeId: string;
  name: string;
  imageUri: string;
  discription: string;
  interval: string;
  task_rating: string;
}

export default function TaskDetailsScreen({ navigation }: Props) {
  const [taskData, setTaskData] = useState<Task | null>(null);
  const slectedUserId = React.useRef<string>('1');
  const slectedHomeId = React.useRef<string>('1');
  const slectedtaskData_id = React.useRef<string>('1');
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
  return (
    <View>
      <Text>Task Data</Text>
      {taskData ? (
        <>
          <Text>ID: {taskData.id}</Text>
          <Text>Selected Home ID: {taskData.slectedHomeId}</Text>
          <Text>Title: {taskData.name}</Text>
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
          <Text>Description: {taskData.discription}</Text>
          <Text>Interval: {taskData.interval}</Text>
          <Text>Rating: {taskData.task_rating}</Text>
        </>
      ) : (
        <Text>Loading task data...</Text>
      )}
      <Button title="Avklarat" onPress={handelTaskAvklarat} />
    </View>
  );
}
