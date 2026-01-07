import React, { useState } from "react";
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
import Rating from "./screens/patients/Rating";
import Confirm from "./screens/patients/Confirm";

// screens doctores
import Appointments from "./screens/doctors/Appointments";
import Patients from "./screens/doctors/Patients";
import ProfileDoc from "./screens/doctors/Profile";
import NotificationsDoc from "./screens/doctors/Notifications";

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
      <Stack.Screen name="Main" component={PatientTabs} />
    </Stack.Navigator>
  );
}

function PatientStack() {
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
      <Stack.Screen name="Rating" component={Rating} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

function NotificationsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Confirm" component={Confirm} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

function DoctorStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DoctorTabs" component={DoctorTabs} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
  
function PatientTabs() {
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
        component={PatientStack} 
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

function DoctorTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: PrimaryColor,
        tabBarActiveTintColor: SecondaryColor,
      }}
    >
      <Tab.Screen
        name="Pacientes"
        component={Patients}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Citas"
        component={Appointments}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Notificaciones"
        component={NotificationsDoc}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileDoc}
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
  return <PatientTabs />;
}

export default function Navigation() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole, setUserRole] = useState("doctor"); // "patient" | "doctor"

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>

        {!isLoggedIn ? (
          <RootStack.Screen name="Auth">
            {(props) => (
              <AuthStack
                {...props}
                onLoginPatient={() => {
                  setIsLoggedIn(true);
                  setUserRole("patient");
                }}
                onLoginDoctor={() => {
                  setIsLoggedIn(true);
                  setUserRole("doctor");
                }}
              />
            )}
          </RootStack.Screen>
        ) : userRole === "patient" ? (
          <RootStack.Screen name="PatientApp">
            {(props) => (
              <PatientStack
                {...props}
                onLogout={() => {
                  setIsLoggedIn(false);
                  setUserRole(null);
                }}
              />
            )}
          </RootStack.Screen>
        ) : (
          <RootStack.Screen name="DoctorApp">
            {(props) => (
              <DoctorStack
                {...props}
                onLogout={() => {
                  setIsLoggedIn(false);
                  setUserRole(null);
                }}
              />
            )}
          </RootStack.Screen>
        )}

      </RootStack.Navigator>
    </NavigationContainer>
  );
}


