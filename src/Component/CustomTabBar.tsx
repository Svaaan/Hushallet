import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;

        return (
          <Text
            key={route.key}
            style={[
              styles.tabText,
              { color: index === state.index ? 'blue' : 'black' },
            ]}
            onPress={() => navigation.navigate(route.name)}
          >
            {label}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  tabText: {
    padding: 10,
  },
});

export default CustomTabBar;
