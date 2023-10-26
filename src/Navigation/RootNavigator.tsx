import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CreateAccountScreen from '../Screen/CreateAccountScreen';
import CreateHouseholdScreen from '../Screen/CreateHouseholdScreen';
import CreateTaskScreen from '../Screen/CreateTaskScreen';
import HomeScreen from '../Screen/HomeScreen';
import LoginScreen from '../Screen/LoginScreen';
import MyHouseholdsScreen from '../Screen/MyHouseholdsScreen';
import ProfileSettingScreen from '../Screen/ProfileSettingScreen';
import StartScreen from '../Screen/StartScreen';
import TaskDetailsScreen from '../Screen/TaskDetailsScreen';
import HouseholdSwipeNavigator from './HouseholdSwipeNavigator';
import JoinHouseholdScreen from '../Screen/JoinHouseholdScreen';
import HouseProfileScreen from '../Screen/HouseProfileScreen';

export type RootStackParamList = {
  Home: undefined;
  Start: undefined;
  CreateHousehold: undefined;
  MyHouseholds: undefined;
  CreateAccount: undefined;
  HouseProfile: undefined;
  Login: undefined;
  TaskDetails: undefined;
  ProfileSettings: undefined;
  Household: undefined;
  CreateTask: undefined;
  JoinHousehold: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="HouseProfile">
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="HouseProfile" component={HouseProfileScreen} />
      <Stack.Screen name="CreateHousehold" component={CreateHouseholdScreen} />
      <Stack.Screen name="JoinHousehold" component={JoinHouseholdScreen} />
      <Stack.Screen name="MyHouseholds" component={MyHouseholdsScreen} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettingScreen} />

      <Stack.Screen name="Household" component={HouseholdSwipeNavigator} />

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
        <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
