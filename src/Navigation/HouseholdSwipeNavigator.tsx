import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import LastWeekStatisticsScreen from '../Screen/LastWeekStatisticsScreen';
import MonthlyStatisticsScreen from '../Screen/MonthlyStatisticsScreen';
import StatisticsScreen from '../Screen/StatisticsScreen';
import TodayScreen from '../Screen/TodayScreen';
import YearlyStatisticsScreen from '../Screen/YearlyStatiscticsScreen';

export type HouseholdSwipeParamList = {
  Today: undefined;
  Statistics: undefined;
  CreateTask: undefined;
  LastWeekStatistics: undefined;
  MonthlyStatistics: undefined;
  YearlyStatistics: undefined;
};

const Swipe = createMaterialTopTabNavigator<HouseholdSwipeParamList>();

// https://reactnavigation.org/docs/material-top-tab-navigator#tabbar

export default function HouseholdSwipeNavigator() {
  return (
    <Swipe.Navigator initialRouteName="Today">
      <Swipe.Screen name="Today" component={TodayScreen} />
      <Swipe.Screen name="Statistics" component={StatisticsScreen} />
      <Swipe.Screen
        name="LastWeekStatistics"
        component={LastWeekStatisticsScreen}
      />
      <Swipe.Screen
        name="MonthlyStatistics"
        component={MonthlyStatisticsScreen}
      />
      <Swipe.Screen
        name="YearlyStatistics"
        component={YearlyStatisticsScreen}
      />
    </Swipe.Navigator>
  );
}
