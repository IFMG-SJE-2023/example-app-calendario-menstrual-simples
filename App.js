import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "./src/components/Tabnavigator";
import { Provider } from 'react-redux';
import store from './store';



export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
}
