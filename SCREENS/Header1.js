// Header.js
import React from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

const Header = React.memo(({ scrollY }) => {
  const animatedStyle = {
    transform: [{
      translateY: scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [0, -100],
        extrapolate: 'clamp'
      })
    }]
  };

  return (
    <Animated.View style={[styles.header, animatedStyle]}>
      <Text style={styles.headerText}>My Header</Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  header: {
    height: 300,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default Header;
