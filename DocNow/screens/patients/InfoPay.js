import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useRoute,useNavigation } from '@react-navigation/native';
import Settings from '../Settings';
import Ready from './Ready';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

const PrimaryColor = '#0A3B74';

const InfoPay = ({ route }) => {
  const navigation = useNavigation();
  const { doctorId, fecha, hora, servicios, total } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  const handleConfirmPayment = async () => {
  if (!cardNumber || !expiry || !cvv || !cardHolder) {
    alert('Por favor completa todos los datos de la tarjeta');
    return;
  }
  
  if (cardNumber.replace(/\s/g, '').length !== 16) {
    alert('Por favor ingresa un número de tarjeta válido');
    return;
  }

  try {

    await addDoc(collection(db, 'citas'), {
      doctorId,
      pacienteId: auth.currentUser.uid,
      fecha,
      hora,
      servicios,      
      total,
      estado: "pendiente",
      pagado: true,
      createdAt: serverTimestamp(),
    });

    navigation.navigate('Ready');

  } catch (error) {
    console.error('Error al guardar la cita:', error);
    alert('Ocurrió un error al procesar el pago');
  }
};
  return (
      <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/*header*/}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>

          <Image 
            source={require('../../assets/logoDocNow.png')} 
            style={{ width: 30, height: 30 }}
          />

          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Ionicons name="settings-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.textDoctors}>Métodos de pago</Text>

        <View style={styles.form}>
          {/* card number */}
          <Text style={styles.label}>Información de la tarjeta</Text>
          <TextInput
            style={styles.input}
            placeholder="0000 0000 0000 0000"
            keyboardType="numeric"
            maxLength={16}
            value={cardNumber}
            onChangeText={setCardNumber}
          />

          {/* MM/AA y CVV */}
          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>MM/AA</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/AA"
                keyboardType="numeric"
                maxLength={5}
                value={expiry}
                onChangeText={setExpiry}
              />
            </View>

            <View style={styles.half}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="CVV"
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
                value={cvv}
                onChangeText={setCvv}
              />
            </View>
          </View>

          {/* Titular */}
          <Text style={styles.label}>Nombre del titular de la tarjeta</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            value={cardHolder}
            onChangeText={setCardHolder}
          />
        </View>

        {/* button */}
        <TouchableOpacity style={styles.editButton}
          onPress={handleConfirmPayment}
        >
            <Text style={styles.editButtonText}>Confirmar</Text>
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
    // alignItems: 'center',
  },
  scroll: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50, 
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 20,
  },
  textDoctors: {
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 10,
    color: PrimaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  form: {
    width: '90%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    marginTop: 15,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    width: '48%',
  },
    editButton: {
    marginTop: 25,
    width: "70%",
    backgroundColor: PrimaryColor,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: 'center',
    marginTop: "60%",
    marginBottom: 10, 
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default InfoPay;