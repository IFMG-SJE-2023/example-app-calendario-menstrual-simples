import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import l from '../screens/Login';
import h from '../screens/Home';
import d from '../screens/Dicas';
import c from '../screens/Cadastro';
import tp from '../screens/TelaPrincipal';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabBarIcon = ({ name, color, size }) => {
  return <Ionicons name={name} color={color} size={size} />;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Tela Principal"
        component={tp}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="ios-home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendario"
        component={h}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="ios-calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Dicas"
        component={d}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="ios-information-circle-outline" color={color} size={size} />
          ),
        }}
      />
      
    </Tab.Navigator>
    
  );
};

const AppNavigator = () => {
  return (

    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={l} options={{ headerShown: false }} />
      <Stack.Screen name="Cadastro" component={c} options={{ headerShown: false }} />
      <Stack.Screen name="TelaPrincipal" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
    
  );
};

export default AppNavigator;