import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import StatisticsScreen from '../Screen/StatisticsScreen';

export type HouseholdSwipeParamList = {
  Today: undefined;
  Statistics: undefined;
};

const Swipe = createMaterialTopTabNavigator<HouseholdSwipeParamList>();

// https://reactnavigation.org/docs/material-top-tab-navigator#tabbar

export default function HouseholdSwipeNavigator() {
  return (
    <Swipe.Navigator initialRouteName="Statistics" tabBar={() => null}>
      {/* <Swipe.Screen name="Today" component={() => null} /> */}
      <Swipe.Screen name="Statistics" component={StatisticsScreen} />
    </Swipe.Navigator>
  );
}
