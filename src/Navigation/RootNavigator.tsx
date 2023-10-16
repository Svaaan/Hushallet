import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CreateAccountScreen from '../Screen/CreateAccountScreen';
import CreateHomeScreen from '../Screen/CreateHomeScreen';
import HomeScreen from '../Screen/HomeScreen';
import LoginScreen from '../Screen/LoginScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import ProfileSettingScreen from '../Screen/ProfileSettingScreen';
import StatisticsScreen from '../Screen/StatisticsScreen';
import TaskScreen from '../Screen/TaskScreen';
import SplashScreen from './../Screen/SplashScreen';

export type RootStackParamList = {
  Home: undefined;
  CreateHome: undefined;
  CreateAccount: undefined;
  Profile: undefined;
  Login: undefined;
  Task: undefined;
  Statistics: undefined;
  ProfileSettings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateHome" component={CreateHomeScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Statistics" component={StatisticsScreen} />
      <Stack.Screen name="Task" component={TaskScreen} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettingScreen} />
    </Stack.Navigator>
  );
}
