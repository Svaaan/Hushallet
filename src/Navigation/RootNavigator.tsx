import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CreateAccountScreen from '../Screen/CreateAccountScreen';
import CreateHouseholdScreen from '../Screen/CreateHouseholdScreen';
import CreateChoreScreen from '../Screen/CreateChoreScreen';
import DisplayUsersScreen from '../Screen/DisplayUsersScreen';
import EditHouseholdScreen from '../Screen/EditHouseholdScreen';
import EditChore from '../Screen/EditChoreScreen';
import HouseProfileScreen from '../Screen/HouseProfileScreen';
import JoinHouseholdScreen from '../Screen/JoinHouseholdScreen';
import LoginScreen from '../Screen/LoginScreen';
import MyHouseholdsScreen from '../Screen/MyHouseholdsScreen';
import StartScreen from '../Screen/StartScreen';
import ChoreDetailsScreen from '../Screen/ChoreDetailsScreen';
import HouseholdSwipeNavigator from './HouseholdSwipeNavigator';

export type RootStackParamList = {
  Start: undefined;
  CreateHousehold: undefined;
  MyHouseholds: undefined;
  CreateAccount: undefined;
  Profile: { userId: number };
  Login: undefined;
  ChoreDetails: { choreId: number };
  ProfileSettings: undefined;
  Household: undefined;
  CreateChore: undefined;
  JoinHousehold: undefined;
  EditHousehold: undefined;
  Users: undefined;
  EditChore: undefined;
  Chores: undefined;
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
      <Stack.Screen name="EditHousehold" component={EditHouseholdScreen} />
      <Stack.Screen name="Users" component={DisplayUsersScreen} />
      <Stack.Screen name="Household" component={HouseholdSwipeNavigator} />
      <Stack.Screen name="Profile" component={HouseProfileScreen} />
      <Stack.Screen name="Chores" component={HouseholdSwipeNavigator} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="ChoreDetails" component={ChoreDetailsScreen} />
        <Stack.Screen name="CreateChore" component={CreateChoreScreen} />
        <Stack.Screen name="EditChore" component={EditChore} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
