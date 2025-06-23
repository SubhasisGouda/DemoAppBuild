import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const LoadingScreen: React.FC = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => spin());
    };
    spin();
  }, []);

  const spinInterpolate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Animated.View style={{ transform: [{ rotate: spinInterpolate }] }}>
          <FontAwesome5 name="react" size={84} color="white" />
        </Animated.View>
      </View>
      
      {/* Loading Text */}
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 60,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 2,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoadingScreen;