import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


// screens
import home from "./screens/Home";
import Appointment from "./screens/Appointment";
import Notifications from "./screens/Notifications";
import Porfile from "./screens/Porfile";

const Tab = createBottomTabNavigator();

  
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ 
        headerShown: false,
        tabBarInactiveTintColor: '#0A3B74',
        tabBarActiveTintColor: '#071e39ff',
      }}
    >
      <Tab.Screen name="Home" component={home} />
      <Tab.Screen name="Citas" component={Appointment} />
      <Tab.Screen name="Notificaciones" component={Notifications} />
      <Tab.Screen name="Perfil" component={Porfile} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}