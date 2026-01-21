import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Settings from '../Settings';
import Confirm from './Confirm';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useEffect } from 'react';
import { getAuth } from "firebase/auth";

const PrimaryColor = '#0A3B74';

const Notifications = () => {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState([]);

  // traer citas reservadas
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const auth = getAuth();
        const userId = auth.currentUser?.uid;

        if (!userId) return;

        const citasSnapshot = await getDocs(
          query(
            collection(db, "citas"),
            where("estado", "==", "pendiente"),
            where("pacienteId", "==", userId)
          )
        );

        const citasConDoctor = await Promise.all(
          citasSnapshot.docs.map(async (docCita) => {
            const citaData = docCita.data();

            const doctorSnapshot = await getDocs(
              query(
                collection(db, "users"),
                where("__name__", "==", citaData.doctorId)
              )
            );

            const doctorDoc = doctorSnapshot.docs[0]?.data();

            return {
              id: docCita.id,
              fecha: citaData.fecha,
              hora: citaData.hora,
              doctorNombre: doctorDoc?.nombre,
              doctorApellido: doctorDoc?.apellidoPaterno,
              doctorSexo: doctorDoc?.sexo,
              doctorFoto: doctorDoc?.photoURL,
            };
          })
        );

        setAppointments(citasConDoctor);
      } catch (error) {
        console.error("Error al cargar citas:", error);
      }
    };

    fetchAppointments();
  }, []);

   //funcion para renderizar cada tarjeta
  const renderAppointment = (item) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => navigation.navigate("Confirm", {
        appointmentId: item.id,
        doctor: {
          image: item.doctorFoto,
          name: `${item.doctorNombre} ${item.doctorApellido}`,
          sex: item.doctorSexo,
          date: item.fecha,
          hour: item.hora,
        },
      })}
    >
    <View style={styles.appointmentCard}>
      
      {/* barra azul izquierda */}
      <View style={styles.leftBar} />

      {/* info doctor */}
      <View style={styles.doctorInfo}>
        <Image source={{ uri: item.doctorFoto}} style={styles.appointmentImage} />
        <Text style={styles.doctorName} numberOfLines={2} ellipsizeMode="tail">
          {item.doctorSexo === "Femenino" ? "Dra." : "Dr."} {item.doctorNombre}{item.doctorApellido}
        </Text>
      </View>

      {/* linea divisora */}
      <View style={styles.divider} />

      {/* fecha */}
      <View style={styles.dateInfo}>
        <Ionicons name="calendar-outline" size={24} color={PrimaryColor} />
        <Text style={styles.dateText}>{item.fecha}</Text>
        <Text style={styles.hourText}>{item.hora}</Text>
      </View>
    </View>
    </TouchableOpacity>
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

        <Text style={styles.textDoctors}>Notificaciones</Text>

        {/* citas del paciente */}
        {appointments.length > 0 ? (
          appointments.map(renderAppointment)
        ) : (
          <Text style={styles.noAppointmentsText}>
            No tienes notificaciones
          </Text>
        )}

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
  noAppointmentsText: {
    marginTop: 20,
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  }
});

export default Notifications;