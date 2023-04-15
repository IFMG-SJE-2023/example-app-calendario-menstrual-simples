import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "./src/components/Tabnavigator";
import Login  from './src/screens/Login';
export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>

  );
}
