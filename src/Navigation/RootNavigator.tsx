import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CreateAccountScreen from '../Screen/CreateAccountScreen';

import CreateHouseholdScreen from '../Screen/CreateHouseholdScreen';
import CreateTaskScreen from '../Screen/CreateTaskScreen';
import EditTaskScreen from '../Screen/EditTaskScreen';
import HomeScreen from '../Screen/HomeScreen';
import JoinHouseholdScreen from '../Screen/JoinHouseholdScreen';
import LoginScreen from '../Screen/LoginScreen';
import MyHouseholdsScreen from '../Screen/MyHouseholdsScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import ProfileSettingScreen from '../Screen/ProfileSettingScreen';
import StartScreen from '../Screen/StartScreen';
import TaskDetailsScreen from '../Screen/TaskDetailsScreen';
import HouseholdSwipeNavigator from './HouseholdSwipeNavigator';

export type RootStackParamList = {
  Home: undefined;
  Start: undefined;
  CreateHousehold: undefined;
  MyHouseholds: undefined;
  CreateAccount: undefined;
  Profile: undefined;
  Login: undefined;
  TaskDetails: undefined;
  ProfileSettings: undefined;
  Household: undefined;
  CreateTask: undefined;
  EditTask: undefined;
  JoinHousehold: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="TaskDetails">
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="CreateHousehold" component={CreateHouseholdScreen} />
      <Stack.Screen name="JoinHousehold" component={JoinHouseholdScreen} />
      <Stack.Screen name="MyHouseholds" component={MyHouseholdsScreen} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettingScreen} />

      <Stack.Screen name="Household" component={HouseholdSwipeNavigator} />

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
        <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
        <Stack.Screen name="EditTask" component={EditTaskScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
