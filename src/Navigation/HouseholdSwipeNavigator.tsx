import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import CustomTabBar from '../Component/CustomTabBar';
import { getCurrentMonthName, getCurrentYear } from '../Hooks/DateUtils';
import StatisticsScreen from '../Screen/CurrentWeekStatisticsScreen';
import LastWeekStatisticsScreen from '../Screen/LastWeekStatisticsScreen';
import MonthlyStatisticsScreen from '../Screen/MonthlyStatisticsScreen';
import TodayScreen from '../Screen/TodayScreen';
import YearlyStatisticsScreen from '../Screen/YearlyStatiscticsScreen';

export type HouseholdSwipeParamList = {
  Today: undefined;
  CreateTask: undefined;
  CurrentWeekStatisticsScreen: undefined;
  LastWeekStatistics: undefined;
  MonthlyStatistics: { monthName: string };
  YearlyStatistics: { year: string };
};

const Swipe = createMaterialTopTabNavigator<HouseholdSwipeParamList>();

export default function HouseholdSwipeNavigator() {
  const currentMonth = getCurrentMonthName();
  const currentYear = getCurrentYear();
  return (
    <Swipe.Navigator
      initialRouteName="Today"
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Swipe.Screen name="Today" component={TodayScreen} />
      <Swipe.Screen
        name="CurrentWeekStatisticsScreen"
        component={StatisticsScreen}
        options={{ title: 'This Week' }}
      />
      <Swipe.Screen
        name="LastWeekStatistics"
        component={LastWeekStatisticsScreen}
        options={{ title: 'Last Week' }}
      />
      <Swipe.Screen
        name="MonthlyStatistics"
        component={MonthlyStatisticsScreen}
        options={{ title: currentMonth }}
        initialParams={{ monthName: currentMonth }}
      />
      <Swipe.Screen
        name="YearlyStatistics"
        component={YearlyStatisticsScreen}
        options={{ title: currentYear }}
        initialParams={{ year: currentYear }}
      />
    </Swipe.Navigator>
  );
}
