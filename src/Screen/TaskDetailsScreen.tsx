import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetails'>;

interface Task {
  id: string;
  SlectedHomeId: string;
  Titel: string;
  imageUri: string;
  Discription: string;
  Interval: string;
  Rating: string;
}

export default function TaskDetailsScreen({ navigation }: Props) {
  const [taskData, setTaskData] = useState<Task | null>(null);

  // Function to retrieve task data from AsyncStorage
  async function getTaskDataFromAsyncStorage() {
    try {
      const storedTaskData = await AsyncStorage.getItem('taskDataKey'); // Replace 'taskDataKey' with your actual key
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

  return (
    <View>
      <Text>Task Data</Text>
      {taskData ? (
        <>
          <Text>ID: {taskData.id}</Text>
          <Text>Selected Home ID: {taskData.SlectedHomeId}</Text>
          <Text>Title: {taskData.Titel}</Text>
          <Text>Image URI: {taskData.imageUri}</Text>
          <Text>Description: {taskData.Discription}</Text>
          <Text>Interval: {taskData.Interval}</Text>
          <Text>Rating: {taskData.Rating}</Text>
        </>
      ) : (
        <Text>Loading task data...</Text>
      )}
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}
