import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "./src/components/Tabnavigator";

import AuthProvider from './src/contexts/auth';

export default function App() {
  return (

      <NavigationContainer>
        <AuthProvider>
        <TabNavigator />
        </AuthProvider>
      </NavigationContainer>

  );
}
