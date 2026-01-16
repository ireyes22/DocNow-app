import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const PrimaryColor = '#0A3B74';
const DangerColor = "#8B0000";

const Confirm = () => {
  const navigation = useNavigation();
    const route = useRoute();
  
    const { doctor } = route.params;

   //funcion para renderizar cada tarjeta
  const renderAppointment = (doctor) => (
    <View key={doctor.id} style={styles.appointmentCard}>
      
      {/* barra azul izquierda */}
      <View style={styles.leftBar} />

      {/* info doctor */}
      <View style={styles.doctorInfo}>
        <Image source={{ uri: doctor.image }} style={styles.appointmentImage} />
        <Text style={styles.doctorName} numberOfLines={2} ellipsizeMode="tail">
          {doctor.sex === "female" ? "Dra." : "Dr."} {doctor.name}
        </Text>
      </View>

      {/* linea divisora */}
      <View style={styles.divider} />

      {/* fecha */}
      <View style={styles.dateInfo}>
        <Ionicons name="calendar-outline" size={24} color={PrimaryColor} />
        <Text style={styles.dateText}>{doctor.date}</Text>
        <Text style={styles.hourText}>{doctor.hour}</Text>
      </View>
    </View>
  );

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

        <Text style={styles.textDoctors}>Confirmar cita</Text>

        {renderAppointment(doctor)}

        <TouchableOpacity style={styles.confirmButton} onPress={() => setEditMode(true)}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
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
  appointmentCard: {
    width: '90%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  leftBar: {
    width: 8,
    backgroundColor: PrimaryColor,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    flex: 1,
    overflow: 'hidden',
  },
  appointmentImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  doctorName: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
    maxWidth: 120,   
    flexShrink: 1,
  },
  divider: {
    width: 1,
    backgroundColor: '#ccc',
    height: '70%',
  },
  dateInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#000',
  },
  hourText: {
    fontSize: 15,
    marginTop: 3,
    color: '#000',
  },
  confirmButton: {
    marginTop: 25,
    width: "90%",
    backgroundColor: PrimaryColor,
    padding: 15,
    borderRadius: 10,
    marginTop: "75%",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 15,
    width: "90%",
    backgroundColor: DangerColor,
    borderRadius: 10,
    padding: 15,
    borderWidth: 2,
    borderColor: DangerColor,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Confirm;