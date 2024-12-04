import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import MainScreen from './MainScreen';  // Главная страница (экран)
import AnalysesScreen from './AnalysesScreen';  // Экран с анализами
import ProfileScreen from './ProfileScreen';  // Экран профиля

const Tab = createBottomTabNavigator();

const _Layout = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',  // Цвет активной вкладки
        tabBarInactiveTintColor: '#888',  // Цвет неактивной вкладки
        tabBarStyle: {
          backgroundColor: '#f8d7da',  // Цвет фона панели
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/home.png')}  // Иконка для вкладки Home
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
              source={require('../assets/analyses.png')}  // Иконка для вкладки Analyses
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
              source={require('../assets/profile.png')}  // Иконка для вкладки Profile
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
