import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ChoreDetailsScreen from '../Screen/ChoreDetailsScreen';
import CreateAccountScreen from '../Screen/CreateAccountScreen';
import CreateChoreScreen from '../Screen/CreateChoreScreen';
import CreateHouseholdScreen from '../Screen/CreateHouseholdScreen';
import DisplayUsersScreen from '../Screen/DisplayUsersScreen';
import EditChore from '../Screen/EditChoreScreen';
import EditHouseholdScreen from '../Screen/EditHouseholdScreen';
import HouseProfileScreen from '../Screen/HouseProfileScreen';
import JoinHouseholdScreen from '../Screen/JoinHouseholdScreen';
import LoginScreen from '../Screen/LoginScreen';
import MyHouseholdsScreen from '../Screen/MyHouseholdsScreen';
import StartScreen from '../Screen/StartScreen';
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
  CreateChores: undefined;
  JoinHousehold: undefined;
  EditHousehold: undefined;
  Users: undefined;
  EditChore: { choreId: number };
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
        options={{ title: 'Hushållet' }}
      />

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="ChoreDetails"
          component={ChoreDetailsScreen}
          options={{ title: 'Syssla detaljer' }}
        />
        <Stack.Screen
          name="CreateChores"
          component={CreateChoreScreen}
          options={{ title: 'Skapa Syssla' }}
        />
        <Stack.Screen
          name="EditChore"
          component={EditChore}
          options={{ title: 'Redigera Syssla' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
