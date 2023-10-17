import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StatusBar, StyleSheet, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

export default function SplashScreen() {
  const imageUrl = 'https://i.imgur.com/UvoPa2i.png';

  const scaleValue = useRef(new Animated.Value(2)).current; // Start with a larger value

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1, // Scale down to the original size
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      // Animation completed
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Animated.Image
        source={{ uri: imageUrl }}
        style={{ ...styles.image, transform: [{ scale: scaleValue }] }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    marginTop: 150,
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});
