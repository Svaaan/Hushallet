import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import CreateAccountScreen from '../Screen/CreateAccountScreen';
import CreateHomeScreen from '../Screen/CreateHomeScreen';
import HomeScreen from '../Screen/HomeScreen';
import LoginScreen from '../Screen/LoginScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import ProfileSettingScreen from '../Screen/ProfileSettingScreen';
import StatisticsScreen from '../Screen/StatisticsScreen';
import TaskScreen from '../Screen/TaskScreen';

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

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="CreateHome" component={CreateHomeScreen} options={{tabBarShowLabel:false}}/>
      <Tab.Screen name="CreateAccount" component={CreateAccountScreen} options={{tabBarShowLabel:false}}/>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
       options={{tabBarShowLabel:false}}
      />
      <Tab.Screen name="Login" component={LoginScreen} options={{tabBarShowLabel:false}} />
      <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabelStyle:{fontSize:14}}} />
      <Tab.Screen name="Statistics" component={StatisticsScreen} options={{tabBarShowLabel:false}}/>
      <Tab.Screen name="Task" component={TaskScreen} options={{tabBarShowLabel:false}} />
      <Tab.Screen name="ProfileSettings" component={ProfileSettingScreen} options={{tabBarShowLabel:false}} />
    </Tab.Navigator>
  );
}
