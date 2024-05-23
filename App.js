import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import UserProvider from './src/contexts/UserContext';

import { NavigationContainer } from '@react-navigation/native';

import Route from './src/navigations/Route';

const App = () => {

  return (
    <SafeAreaProvider>
      <StatusBar />
      <UserProvider>
        <NavigationContainer>
          <Route />
        </NavigationContainer>
      </UserProvider>
    </SafeAreaProvider>
  );
};

export default App;