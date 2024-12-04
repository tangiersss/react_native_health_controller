import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import _Layout from './_layout';

const App = () => {
  return (
    <NavigationContainer>
      <_Layout />
    </NavigationContainer>
  );
};

AppRegistry.registerComponent('Main', () => App);

export default App;