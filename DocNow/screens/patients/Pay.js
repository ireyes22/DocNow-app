import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Settings from '../Settings';
import InfoPay from './InfoPay';
import { auth, db } from '../../firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const PrimaryColor = '#0A3B74';

const Pay = ({ route }) => {
  const navigation = useNavigation();
  const { doctorId, pacienteId, fecha, hora, servicios, total } = route.params;

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

        <TouchableOpacity style={styles.editButton}
          onPress={() =>
            navigation.navigate("InfoPay", {
              pacienteId: auth.currentUser.uid,
              doctorId: doctorId,  
              fecha: fecha,
              hora: hora,
              servicios: servicios,
              total: total,
              tipo: 'credito',
            })
          }
        >
            <Ionicons name="card-outline" size={25} color='#000000' />
            <Text style={styles.editButtonText}>Agregar tarjeta crédito</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton}
          onPress={() =>
            navigation.navigate("InfoPay", {
              pacienteId: auth.currentUser.uid,
              doctorId: doctorId,  
              fecha: fecha,
              hora: hora,
              servicios: servicios,
              total: total,
              tipo: 'debito',
            })
          }
        >
            <Ionicons name="card-outline" size={25} color='#000000' />
            <Text style={styles.editButtonText}>Agregar tarjeta debito</Text>
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
    alignItems: 'center',
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
  editButton: {
    marginTop: 25,
    width: "70%",
    backgroundColor: "#F1F1F1",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20, 
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  editButtonText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default Pay;