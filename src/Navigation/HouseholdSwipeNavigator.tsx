import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import LastWeekStatisticsScreen from '../Screen/LastWeekStatisticsScreen';
import StatisticsScreen from '../Screen/StatisticsScreen';

export type HouseholdSwipeParamList = {
  Today: undefined;
  Statistics: undefined;
  CreateTask: undefined;
  LastWeekStatistics: undefined;
};

const Swipe = createMaterialTopTabNavigator<HouseholdSwipeParamList>();

// https://reactnavigation.org/docs/material-top-tab-navigator#tabbar

export default function HouseholdSwipeNavigator() {
  return (
    <Swipe.Navigator initialRouteName="Today">
      <Swipe.Screen name="Today" component={() => null} />
      <Swipe.Screen name="Statistics" component={StatisticsScreen} />
      <Swipe.Screen
        name="LastWeekStatistics"
        component={LastWeekStatisticsScreen}
      />
    </Swipe.Navigator>
  );
}
