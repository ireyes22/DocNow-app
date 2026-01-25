import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import { useEffect } from 'react';

const PrimaryColor = '#0A3B74';

const Patients = ({onLogout}) => {
  const navigation = useNavigation();
  const [patients, setPatients] = useState([]);
    
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const currentDoctorId = auth.currentUser.uid; // doctor logueado

        // 1. Traer citas pendientes o confirmadas de este doctor
        const citasSnapshot = await getDocs(
          query(
            collection(db, "citas"),
            where("estado", "in", ["pendiente", "confirmada"]),
            where("doctorId", "==", currentDoctorId)
          )
        );

        // 2. Por cada cita, traer datos del paciente
        const patientsList = await Promise.all(
          citasSnapshot.docs.map(async (docCita) => {
            const citaData = docCita.data();

            const patientSnapshot = await getDocs(
              query(
                collection(db, "users"),
                where("__name__", "==", citaData.pacienteId)
              )
            );

            const patientDoc = patientSnapshot.docs[0]?.data();

            return {
              id: docCita.id,
              pacienteId: citaData.pacienteId,
              name: patientDoc?.nombre + " " + patientDoc?.apellidoPaterno + " " + patientDoc?.apellidoMaterno,
              sex: patientDoc?.sexo,
              image: patientDoc?.photoURL,
              date: citaData.fecha,
              hour: citaData.hora,
              service: citaData.servicio,
              status: citaData.estado,
            };
          })
        );

        setPatients(patientsList);

      } catch (error) {
        console.error("Error al cargar pacientes:", error);
      }
    };

    fetchPatients();
  }, []);

  const renderArchivades = (item) => (
    <View key={item.id} style={styles.archiveCard}>
      {/* info doctor */}
      <View style={styles.doctorInfo}>
        <Image source={{ uri: item.image }} style={styles.archiveImage} />
        <View style={styles.archiveInfo}>
          <Text style={styles.doctorName} numberOfLines={100} ellipsizeMode="tail">
            {item.name}
          </Text>
        </View>
      </View>

      {/* boton */}
      <View style={styles.dateInfo}>
        <TouchableOpacity style={styles.evaluateButton} 
          onPress={() =>
          navigation.navigate("SeeNotes", {
            patient: {
              citaId: item.id,
              id: item.pacienteId,
              name: item.name,
              date: item.date,
              service: item.service,
            }
          })
        }
        >
          <Text style={styles.evaluateText}>Ver notas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return(
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/*header*/}
        <View style={styles.header}>
          <TouchableOpacity onPress={onLogout}>
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

        <Text style={styles.textDoctors}>Pacientes</Text>
        
        {patients.length > 0 ? (
          patients.map(renderArchivades)
        ) : (
          <Text style={styles.noAppointmentsText}>
            No tienes citas próximas con pacientes.
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
    flexGrow: 1,
    paddingBottom: 120,
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50, 
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 10,
  },
  textDoctors: {
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 10,
    color: PrimaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
  archiveCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
},
  archiveInfo: {
    flexDirection: 'column',
    padding: 15,
    flex: 1,
    overflow: 'hidden',
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  archiveImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 10,
  },
  evaluateButton: {
    backgroundColor: '#7993B1',
    paddingVertical: 8, 
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: PrimaryColor,
    borderWidth: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginRight: 10,
  },
  evaluateText: {
    color: '#fff',
  },
  noAppointmentsText: {
    marginTop: 20,
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  }
});

export default Patients;