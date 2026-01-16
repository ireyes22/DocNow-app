import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import ForgetPassword from './ForgetPassword';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const PrimaryColor = '#0A3B74';
const SecondaryColor = '#498FC0';

const Login = ({ onLogin }) => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Error', 'Por favor completa todos los campos');
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = userCredential.user.uid;

    const userDoc = await getDoc(doc(db, "users", uid));
    // useEffect(() => {
    //   if (!auth.currentUser) return;

    //   const fetchUser = async () => {
    //     const userDoc = doc(db, "users", auth.currentUser.uid);
    //     const docSnap = await getDoc(userDoc);

    //     if (docSnap.exists()) {
    //       setUser(docSnap.data());
    //     }
    //   };

    //   fetchUser();
    // }, []);

    if (!userDoc.exists()) {
      Alert.alert("Error", "El usuario no tiene rol asignado");
      return;
    }

    const { rol } = userDoc.data();

    Alert.alert('Éxito', 'Inicio de sesión exitoso');
    onLogin(rol);

  } catch (error) {
    let errorMessage = 'Error al iniciar sesión';

    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'Usuario no encontrado';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Contraseña incorrecta';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Email inválido';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Credenciales inválidas';
        break;
      default:
        errorMessage = error.message;
    }

    Alert.alert('Error', errorMessage);
  }
};

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Logo */}
        <Image
          source={require('../assets/logoDocNow.png')}
          style={styles.logo}
        />

        {/* Title */}
        <Text style={styles.title}>Iniciar sesión</Text>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.inputPassword}>
            <TextInput
              style={styles.passwordInput}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={22}
                color={PrimaryColor}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
            <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button}
            onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        {/* Register */}
        <View style={styles.register}>
          <Text style={styles.registerText}>No tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerLink}>Regístrate</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: PrimaryColor,
    marginBottom: 25,
  },
  form: {
    width: '85%',
  },
  label: {
    fontSize: 15,
    color: '#555',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    height: 45,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#CBCBCB',
  },
  inputPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#CBCBCB',
  },
  passwordInput: {
    flex: 1,
  },
  forgot: {
    color: SecondaryColor,
    textAlign: 'right',
    marginTop: 10,
  },
  button: {
    marginTop: '80%',
    width: '70%',
    backgroundColor: PrimaryColor,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  register: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registerText: {
    color: '#888',
  },
  registerLink: {
    marginLeft: 5,
    color: PrimaryColor,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default Login;