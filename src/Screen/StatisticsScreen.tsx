import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ChoreEvent } from '../../data/mockedChoreEvents';
import { Chore } from '../../data/mockedChores';
import { User } from '../../data/mockedUsers';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Statistics'>;

interface Input {
  choreEvents: ChoreEvent[];
  users: User[];
  chores: Chore[];
  // period: string;
  // choreId?: string;
}

interface Output {
  data: number[];
  colors: string[];
  avatar: string[];
  choreCounts: number[];
  userNames: string[];
}

function transformer(input: Input): Output {
  const data: number[] = [];
  const colors: string[] = [];
  const avatar: string[] = [];
  const choreCounts: number[] = [];
  const userNames: string[] = [];

  input.users.forEach((user) => {
    const userChoreEvents = input.choreEvents.filter(
      (event) => event.user_id === user.id
    );

    const choreCount = userChoreEvents.length;

    data.push(choreCount);
    colors.push('');
    avatar.push('');
    choreCounts.push(choreCount);
    userNames.push(user.name);
  });
  return { data, colors, avatar, choreCounts, userNames };
}

export default function StatisticsScreen({ navigation }: Props) {
  const [data, setData] = useState<Output | null>({
    data: [],
    colors: [],
    avatar: [],
    choreCounts: [],
    userNames: [],
  });

  useEffect(() => {
    // Replace these with your actual data or functions
    const chores: Chore[] = require('../../data/mockedChores').mockChores;
    const users: User[] = require('../../data/mockedUsers').mockUsers;
    const choreEvents: ChoreEvent[] =
      require('../../data/mockedChoreEvents').mockChoreEvents;

    const transformedData: Output = transformer({
      choreEvents,
      users,
      chores,
    });

    // Set the transformed data in the state
    setData(transformedData);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Statistics Screen</Text>
      {data && (
        <View>
          {data.userNames.map((userName, index) => (
            <View key={index}>
              <Text>User: {userName}</Text>
              <Text>Number of Chores: {data.choreCounts[index]}</Text>
            </View>
          ))}
        </View>
      )}
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

// useEffect för att hämta all data! -------
// useEffect(() => {
//   const chores: Chore[] = require('../../data/mockedChores').mockChores;
//   const users: User[] = require('../../data/mockedUsers').mockUsers;
//   const choreEvents: ChoreEvent[] =
//     require('../../data/mockedChoreEvents').mockWorkEvents;

//   const transformedData: string = `
//     Chores: ${JSON.stringify(chores)}
//     Users: ${JSON.stringify(users)}
//     Chore Events: ${JSON.stringify(choreEvents)}
//   `;

//   setData(transformedData);
// }, []);

// return (
//   <View style={styles.container}>
//     <Text>Statistics Screen</Text>
//     {data && <Text>{data}</Text>}
//   </View>
// );
