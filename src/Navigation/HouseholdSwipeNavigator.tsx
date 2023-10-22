import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import StatisticsScreen from '../Screen/StatisticsScreen';
import TodayScreen from '../Screen/TodayScreen';

export type HouseholdSwipeParamList = {
  Today: undefined;
  Statistics: undefined;
};

const Swipe = createMaterialTopTabNavigator<HouseholdSwipeParamList>();

// https://reactnavigation.org/docs/material-top-tab-navigator#tabbar

export default function HouseholdSwipeNavigator() {
  return (
    <Swipe.Navigator initialRouteName="Today">
      <Swipe.Screen name="Today" component={TodayScreen} />
      <Swipe.Screen name="Statistics" component={StatisticsScreen} />
    </Swipe.Navigator>
  );
}

