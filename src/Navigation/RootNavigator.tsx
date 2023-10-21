import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CreateAccountScreen from '../Screen/CreateAccountScreen';

import CreateHouseholdScreen from '../Screen/CreateHouseholdScreen';
import HomeScreen from '../Screen/HomeScreen';
import LoginScreen from '../Screen/LoginScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import ProfileSettingScreen from '../Screen/ProfileSettingScreen';
import TaskDetailsScreen from '../Screen/TaskDetailsScreen';
import HouseholdSwipeNavigator from './HouseholdSwipeNavigator';
import StartScreen from '../Screen/StartScreen';

export type RootStackParamList = {
  Home: undefined;
  Start: undefined;
  CreateHousehold: undefined;
  CreateAccount: undefined;
  Profile: undefined;
  Login: undefined;
  TaskDetails: undefined;
  CreateTask: undefined;
  ProfileSettings: undefined;
  Household: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="CreateHousehold" component={CreateHouseholdScreen} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettingScreen} />

      <Stack.Screen name="Household" component={HouseholdSwipeNavigator} />

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
        {/* <Stack.Screen name="CreateTask" component={() => null} /> */}
      </Stack.Group>
    </Stack.Navigator>
  );
}
