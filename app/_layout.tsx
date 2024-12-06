import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import MainScreen from './MainScreen';
import AnalysesScreen from './AnalysesScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

const _Layout = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#f8d7da',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/home.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Analyses"
        component={AnalysesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/analyses.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/profile.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default _Layout;
