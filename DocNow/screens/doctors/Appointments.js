import React, { useState }  from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { useEffect } from 'react';


const PrimaryColor = '#0A3B74';
const SecondaryColor = '#498FC0';

const Appointments = () => {
  const navigation = useNavigation();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const doctorId = auth.currentUser.uid;

        // Traer solo citas pendientes o confirmadas de este doctor
        const citasSnapshot = await getDocs(
          query(
            collection(db, "citas"),
            where("estado", "in", ["pendiente", "confirmada", "cancelada"]),
            where("doctorId", "==", doctorId)
          )
        );

        const doctorSnapshot = await getDocs(
          query(
            collection(db, "users"),
            where("__name__", "==", doctorId)  // traemos los datos del doctor
          )
        );
        const doctorDoc = doctorSnapshot.docs[0]?.data();

        const patientsList = await Promise.all(
          citasSnapshot.docs.map(async (docCita) => {
            const cita = docCita.data();

            // Traer datos del paciente
            const patientSnapshot = await getDocs(
              query(
                collection(db, "users"),
                where("__name__", "==", cita.pacienteId)
              )
            );

            const patientDoc = patientSnapshot.docs[0]?.data();
            // Tomar los nombres de todos los servicios como string
            const serviciosNombres = Array.isArray(cita.servicios)
            ? cita.servicios.map(s => s.nombre).join(', ')
            : cita.servicios?.nombre || 'Consulta';

            return {
              id: docCita.id,
              name:
                patientDoc?.nombre +
                " " +
                patientDoc?.apellidoPaterno +
                " " +
                patientDoc?.apellidoMaterno,
              age: patientDoc?.edad,
              fechaNacimiento: patientDoc?.fechaNacimiento,
              image: patientDoc?.photoURL,
              date: cita.fecha,
              hour: cita.hora,
              service: serviciosNombres,
              status: cita.estado,

              doctorId: doctorId,                        
              doctorNombre: doctorDoc?.nombre + " " + doctorDoc?.apellidoPaterno + " " + doctorDoc?.apellidoMaterno,     
              clinic: doctorDoc?.consultorio || '',
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

  const renderArchivades = (item) => 
  (
    <View key={item.id} style={styles.archiveCard}>
      {/* info doctor */}
      <View style={styles.doctorInfo}>
        <Image source={{ uri: item.image }} style={styles.archiveImage} />
        <View style={styles.archiveInfo}>
          <Text style={styles.doctorName} numberOfLines={5} ellipsizeMode="tail">
              {item.name}
          </Text>
          <Text style={styles.doctorService}>
            {item.service}
          </Text>
        </View>
      </View>
  
      {/* boton */}
      <View style={styles.groupButtons}>
        <View style={styles.dateInfo}>
          <TouchableOpacity style={styles.evaluateButton}>
            <Text style={styles.evaluateText}>Finalizar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dateInfo}>
          <TouchableOpacity
            style={styles.notesButton}
            onPress={() =>
            navigation.navigate("CreateNotes", {
              patient: {
                id: item.id,
                name: item.name,
                date: item.date,
                age: item.age ?? null,
              },
              doctor: {
                id: item.doctorId,
                nombre: item.doctorNombre ?? '',
                clinic: item.clinic ?? '',
              }
            })
          }
          >
            <Text style={styles.notesText}>+ Notas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return(
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
              {patients.length > 0 ? (
                patients.map(renderArchivades)
              ) : (
                <Text style={styles.noAppointmentsText}>No tienes pacientes con citas hoy</Text>
              )}
          </ScrollView>
        </View>
  );
};

const History = () => {
  const navigation = useNavigation();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const doctorId = auth.currentUser.uid;

        // Traer solo citas pendientes o confirmadas de este doctor
        const citasSnapshot = await getDocs(
          query(
            collection(db, "citas"),
            where("estado", "in", ["pendiente", "confirmada"]),
            where("doctorId", "==", doctorId)
          )
        );

        const patientsList = await Promise.all(
          citasSnapshot.docs.map(async (docCita) => {
            const cita = docCita.data();

            // Traer datos del paciente
            const patientSnapshot = await getDocs(
              query(
                collection(db, "users"),
                where("__name__", "==", cita.pacienteId)
              )
            );

            const patientDoc = patientSnapshot.docs[0]?.data();
            // Tomar los nombres de todos los servicios como string
            const serviciosNombres = Array.isArray(cita.servicios)
            ? cita.servicios.map(s => s.nombre).join(', ')
            : cita.servicios?.nombre || 'Consulta';

            return {
              id: docCita.id,
              pacienteId: cita.pacienteId,
              name: patientDoc?.nombre + " " + patientDoc?.apellidoPaterno + " " + patientDoc?.apellidoMaterno,
              sex: patientDoc?.sexo,
              image: patientDoc?.photoURL,
              date: cita.fecha,
              hour: cita.hora,
              service: serviciosNombres,
              status: cita.estado,
              clinic: cita.clinic || '',
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

    const renderArchivades = (item) => 
  (
    <View key={item.id} style={styles.archiveCard}>
      {/* info doctor */}
      <View style={styles.doctorInfo}>
        <Image source={{ uri: item.image }} style={styles.archiveImage} />
        <View style={styles.archiveInfo}>
          <Text style={styles.doctorName} numberOfLines={5} ellipsizeMode="tail">
              {item.name}
          </Text>
          <Text style={styles.doctorService}>{item.service}</Text>
        </View>
  
      </View>
  
      {/* boton */}
      <View style={styles.groupButtons}>
        <View style={styles.dateInfo}>
          <TouchableOpacity style={styles.evaluateButton} 
          onPress={() =>
            navigation.navigate("SeeNotes", {
              patient: {
                name: item.name,
                date: item.date,
                service: item.service,
              }
            })
          }>
            <Text style={styles.evaluateText}>Ver notas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return(
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {patients.length > 0 ? (
            patients.map(renderArchivades)
          ) : (
            <Text style={styles.noAppointmentsText}>No tienes pacientes con citas hoy</Text>
          )}
        </ScrollView>
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

function AppointmentTab() {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#fff',}}>
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

      <Tab.Navigator
        initialRouteName ="Citas"
        screenOptions={{ 
        headerShown: false,
        tabBarInactiveTintColor: PrimaryColor,
        tabBarActiveTintColor: SecondaryColor,
      }}
      >
        <Tab.Screen name='Citas' component={Appointments} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name='Historial' 
          component={History} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="time" color={color} size={size} />
            ),
          }}
        />

      </Tab.Navigator>
    </View>
  );
}

export default AppointmentTab;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
    scroll: {
      flexGrow: 1,
      paddingBottom: 120,
      width: '100%',
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
    doctorService: {
      color: '#8F90A6',
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
    serviceText: {
      color: '#777',
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
    notesButton: {
      backgroundColor: '#fff',
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
    notesText: {
      color: '#7993B1',
    },
    groupButtons: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
    },
    noAppointmentsText: {
    marginTop: 20,
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  }
});
