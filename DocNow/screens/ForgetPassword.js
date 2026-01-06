import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { sendPasswordResetEmail } from "firebase/auth";

const PrimaryColor = '#0A3B74';

const ForgetPassword = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);


  // register user
  const [email, setEmail] = useState('');

  // alert
  const handleSendCode = async () => {
  if (!email) {
    alert("Ingresa un correo válido");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Se envió un correo para restablecer tu contraseña");
    navigation.navigate("Login");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/*header*/}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>

          <Image 
            source={require('../assets/logoDocNow.png')} 
            style={{ width: 40, height: 40, resizeMode: 'contain',}}
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>Olvidé mi contraseña</Text>
        <Text style={styles.subtitle}>Por favor, ingresa un correo electrónico para recibir un código de verificación</Text>

        {/* Form */}
        <View style={styles.form}>
          {/* Email */}
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleSendCode}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>

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
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    position: 'relative',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: PrimaryColor,
    marginBottom: 25,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    marginTop: 5,
    width: '85%',
    alignContent: 'center',
    textAlign: 'center',
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
  button: {
    marginTop: '95%',
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
});

export default ForgetPassword;
