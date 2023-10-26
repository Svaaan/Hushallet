import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { ProjectTheme } from '../../theme/theme';

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const activeRoute = state.routes[state.index];
  const { options } = descriptors[activeRoute.key];
  const label = options.title || activeRoute.name;

  const navigateToPrevTab = () => {
    // Get the index of the previous tab (or wrap around to the last tab if at the first tab)
    const prevTabIndex =
      state.index > 0 ? state.index - 1 : state.routes.length - 1;
    const prevTabRoute = state.routes[prevTabIndex];

    if (activeRoute.name === 'Today') {
      // Navigate to the "MyHouseholds" screen when on the "Today" tab
      navigation.navigate('MyHouseholds', {
        screen: 'Household',
        params: { screen: 'Today' },
      });
    } else {
      navigation.navigate(prevTabRoute.name);
    }
  };

  const navigateToNextTab = () => {
    // Get the index of the next tab (or wrap around to the first tab if at the last tab)
    const nextTabIndex =
      state.index < state.routes.length - 1 ? state.index + 1 : 0;
    const nextTabRoute = state.routes[nextTabIndex];

    navigation.navigate(nextTabRoute.name);
  };

  return (
    <View style={styles.tabBar}>
      <Button
        icon="chevron-left"
        children=""
        onPress={navigateToPrevTab}
        labelStyle={{
          color: ProjectTheme.colors.iconcolor,
          fontSize: ProjectTheme.iconSize,
        }}
        rippleColor={ProjectTheme.colors.background}
      />
      <Text style={styles.tabTextCentered}>{label}</Text>
      <Button
        icon="chevron-right"
        children=""
        onPress={navigateToNextTab}
        labelStyle={{
          color: ProjectTheme.colors.iconcolor,
          fontSize: ProjectTheme.iconSize,
        }}
        rippleColor={ProjectTheme.colors.background}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabTextCentered: {
    padding: 10,
    textAlign: 'center',
  },
  button: {
    padding: 0,
    flex: 1,
  },
});

export default CustomTabBar;
