import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CreateAccountScreen from '../Screen/CreateAccountScreen';
import CreateHouseholdScreen from '../Screen/CreateHouseholdScreen';
import CreateTaskScreen from '../Screen/CreateTaskScreen';
import DisplayUsersScreen from '../Screen/DisplayUsersScreen';
import EditHouseholdScreen from '../Screen/EditHouseholdScreen';
import EditTask from '../Screen/EditTaskScreen';
import HouseProfileScreen from '../Screen/HouseProfileScreen';
import JoinHouseholdScreen from '../Screen/JoinHouseholdScreen';
import LoginScreen from '../Screen/LoginScreen';
import MyHouseholdsScreen from '../Screen/MyHouseholdsScreen';
import ProfileSettingScreen from '../Screen/ProfileSettingScreen';
import StartScreen from '../Screen/StartScreen';
import TaskDetailsScreen from '../Screen/TaskDetailsScreen';
import HouseholdSwipeNavigator from './HouseholdSwipeNavigator';

export type RootStackParamList = {
  Start: undefined;
  CreateHousehold: undefined;
  MyHouseholds: undefined;
  CreateAccount: undefined;
  Profile: { userId: number };
  Login: undefined;
  TaskDetails: undefined;
  ProfileSettings: undefined;
  Household: undefined;
  CreateTask: undefined;
  JoinHousehold: undefined;
  EditHousehold: undefined;
  Users: undefined;
  EditTask: undefined;
  SwipeNav: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CreateHousehold" component={CreateHouseholdScreen} />
      <Stack.Screen name="JoinHousehold" component={JoinHouseholdScreen} />
      <Stack.Screen name="MyHouseholds" component={MyHouseholdsScreen} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettingScreen} />
      <Stack.Screen name="EditHousehold" component={EditHouseholdScreen} />
      <Stack.Screen name="Users" component={DisplayUsersScreen} />
      <Stack.Screen name="Household" component={HouseholdSwipeNavigator} />
      <Stack.Screen name="Profile" component={HouseProfileScreen} />
      <Stack.Screen name="SwipeNav" component={HouseholdSwipeNavigator} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
        <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
        <Stack.Screen name="EditTask" component={EditTask} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
