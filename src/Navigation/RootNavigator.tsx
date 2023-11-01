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
  TaskDetails: { choreId: number };
  ProfileSettings: undefined;
  Household: undefined;
  CreateTask: undefined;
  JoinHousehold: undefined;
  EditHousehold: undefined;
  Users: undefined;
  EditTask: { choreId: number };
  SwipeNav: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Start"
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
        options={{ title: 'Skapa Konto' }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Logga in' }}
      />
      <Stack.Screen
        name="CreateHousehold"
        component={CreateHouseholdScreen}
        options={{ title: 'Skapa Hushåll' }}
      />
      <Stack.Screen
        name="JoinHousehold"
        component={JoinHouseholdScreen}
        options={{ title: 'Gå med Hushåll' }}
      />
      <Stack.Screen
        name="MyHouseholds"
        component={MyHouseholdsScreen}
        options={{ title: 'Mina Hushåll' }}
      />
      <Stack.Screen
        name="EditHousehold"
        component={EditHouseholdScreen}
        options={{ title: 'Redigera Hushåll' }}
      />
      <Stack.Screen
        name="Users"
        component={DisplayUsersScreen}
        options={{ title: 'Användare' }}
      />
      <Stack.Screen
        name="Household"
        component={HouseholdSwipeNavigator}
        options={{ title: 'Hushåll' }}
      />
      <Stack.Screen
        name="Profile"
        component={HouseProfileScreen}
        options={{ title: 'Profil' }}
      />
      <Stack.Screen
        name="SwipeNav"
        component={HouseholdSwipeNavigator}
        options={{ title: 'Sysslorna' }}
      />

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="TaskDetails"
          component={TaskDetailsScreen}
          options={{ title: 'Syssla detaljer' }}
        />
        <Stack.Screen
          name="CreateTask"
          component={CreateTaskScreen}
          options={{ title: 'Skapa Syssla' }}
        />
        <Stack.Screen
          name="EditTask"
          component={EditTask}
          options={{ title: 'Redigera Syssla' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
