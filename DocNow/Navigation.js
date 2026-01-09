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
import CreateNotes from "./screens/doctors/CreateNotes";
import SeeNotes from "./screens/doctors/SeeNotes";
import Ratings from "./screens/doctors/Ratings";

// screens administrador

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const PrimaryColor = '#0A3B74';
const SecondaryColor = '#498FC0';

function AuthStack({ onLogin }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props) => <Login {...props} onLogin={onLogin} />}
      </Stack.Screen>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
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

function DoctorStack({ onLogout }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DoctorTabs">
        {(props) => <DoctorTabs {...props} onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
function  HomeDoctorStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Patients" component={Patients} />
      <Stack.Screen name="SeeNotes" component={SeeNotes} />
    </Stack.Navigator>
  );
}

function AppointmentsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Appointments" component={Appointments} />
      <Stack.Screen name="CreateNotes" component={CreateNotes} />
      <Stack.Screen name="SeeNotes" component={SeeNotes} />
    </Stack.Navigator>
  );
}

function ProfileDocStack({ onLogout }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile">
        {(props) => <ProfileDoc {...props} onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen name="Ratings" component={Ratings} />
    </Stack.Navigator>
  );
}
  
// Patients menu
function PatientTabs({ onLogout }) {
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
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      >
        {(props) => <Profile {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

// Doctors menu
function DoctorTabs({ onLogout }) {
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
        component={HomeDoctorStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Citas"
        component={AppointmentsStack}
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
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      >
        {(props) => <ProfileDocStack {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // "patient" | "doctor"

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  const login = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <RootStack.Screen name="Auth">
            {(props) => <AuthStack {...props} onLogin={login} />}
          </RootStack.Screen>
        ) : userRole === "paciente" ? (
          <RootStack.Screen name="PatientApp">
            {(props) => <PatientTabs {...props} onLogout={logout} />}
          </RootStack.Screen>
        ) : (
          <RootStack.Screen name="DoctorApp">
            {(props) => <DoctorStack {...props} onLogout={logout} />}
          </RootStack.Screen>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}