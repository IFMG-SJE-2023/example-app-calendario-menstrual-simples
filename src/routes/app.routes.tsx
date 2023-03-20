import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import Home from "../screens/Home";

const{Navigator, Screen}= createNativeStackNavigator();

export function AppRoutes(){
      return(
        <Navigator screenOptions={{ headerShown:false}}>
            <Screen name="Login" component={Login}/>
            <Screen name="Home" component={Home}/>
        </Navigator>
      )
}