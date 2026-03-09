import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const { session, loading } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ),
    ]).start();

    const timer = setTimeout(() => {
      if (!loading) {
        if (session) {
          router.replace('/(tabs)');
        } else {
          router.replace('/auth/login');
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [loading, session]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#1A1A2E', '#0F0F1E', '#000000']}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { rotate }],
          },
        ]}
      >
        <View style={styles.logo}>
          <Text style={styles.logoText}>S</Text>
        </View>
      </Animated.View>

      <Animated.Text style={[styles.appName, { opacity: fadeAnim }]}>
        Sada
      </Animated.Text>

      <Animated.Text
        style={[styles.tagline, { opacity: fadeAnim }]}
      >
        Connect. Share. Communicate.
      </Animated.Text>

      <View style={styles.developerCredit}>
        <Text style={styles.creditText}>Developed by</Text>
        <Text style={styles.developerName}>Abdullah Lazim</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 3,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  logoText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: '#AAAAAA',
    marginTop: 10,
    letterSpacing: 1,
  },
  developerCredit: {
    position: 'absolute',
    top: 50,
    left: 20,
    alignItems: 'flex-start',
  },
  creditText: {
    fontSize: 12,
    color: '#666666',
  },
  developerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginTop: 4,
  },
});
