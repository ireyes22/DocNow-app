import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';

// screens comunes
import Settings from './screens/Settings';
import Login from "./screens/Login";
import Register from "./screens/Register";
import ForgetPassword from "./screens/ForgetPassword";

// screens pacientes
import HomePatient from "./screens/patients/Home";
import Appointment from "./screens/patients/Appointment";
import Notifications from "./screens/patients/Notifications";
import Profile from "./screens/patients/Profile";
import SeeDoctor from "./screens/patients/SeeDoctor";
import RegisterAppointment from "./screens/patients/RegisterAppointment";
import Pay from "./screens/patients/Pay";
import infoPay from "./screens/patients/InfoPay";
import Ready from "./screens/patients/Ready";

// screens doctores

// screens administrador

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const PrimaryColor = '#0A3B74';
const SecondaryColor = '#498FC0';

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="Main" component={MyTabs} />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomePatient} />
      <Stack.Screen name="SeeDoctor" component={SeeDoctor} />
      <Stack.Screen name="RegisterAppointment" component={RegisterAppointment} />
      <Stack.Screen name="Pay" component={Pay} />
      <Stack.Screen name="InfoPay" component={infoPay} />
      <Stack.Screen name="Ready" component={Ready} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

function AppointmentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Appointment" component={Appointment} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

function NotificationsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
  
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ 
        headerShown: false,
        tabBarInactiveTintColor: PrimaryColor,
        tabBarActiveTintColor: SecondaryColor,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Citas" 
        component={AppointmentStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Notificaciones" 
        component={NotificationsStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={Profile} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AppStack() {
  return <MyTabs />;
}

export default function Navigation() {

  const isLoggedIn = false;

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <RootStack.Screen name="App" component={AppStack} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}