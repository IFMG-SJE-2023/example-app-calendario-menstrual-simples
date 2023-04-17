import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Dicas from '../screens/Dicas';
import Cadastro from '../screens/Cadastro';
import TelaPrincipal from '../screens/TelaPrincipal';
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
        name="TelaPrincipal"
        component={TelaPrincipal}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="ios-home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="ios-home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Dicas"
        component={Dicas}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="ios-home" color={color} size={size} />
          ),
        }}
      />
      
    </Tab.Navigator>
    
  );
};

const AppNavigator = () => {
  return (

    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
      <Stack.Screen name="TelaPrincipal" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
    
  );
};

export default AppNavigator;