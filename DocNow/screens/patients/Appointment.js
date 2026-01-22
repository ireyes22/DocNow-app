import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { collection, getDocs, query, where,  getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import { useEffect } from 'react';

const PrimaryColor = '#0A3B74';
const SecondaryColor = '#498FC0';

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: "Hoy"
};

LocaleConfig.defaultLocale = 'es';
  
// pantalla de mis citas
const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  // traer citas reservadas
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const currentUserId = auth.currentUser.uid; // ID del paciente logueado

        const citasSnapshot = await getDocs(
          query(
            collection(db, "citas"),
            where("estado", "in", ["pendiente", "confirmada"]),
            where("pacienteId", "==", currentUserId) // FILTRO
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

        // marcar fechas en el calendario
        const newMarkedDates = {};
          citasConDoctor.forEach(cita => {
            newMarkedDates[cita.fecha] = {
            marked: true,
            dotColor: PrimaryColor,
            activeOpacity: 0,
          };
        });
        setMarkedDates(newMarkedDates);
      } catch (error) {
        console.error("Error al cargar citas:", error);
      }
    };

    fetchAppointments();
  }, []);

  //funcion para renderizar cada tarjeta
  const renderAppointment = (item) => (
    <View key={item.id} style={styles.appointmentCard}>
      
      {/* barra azul izquierda */}
      <View style={styles.leftBar} />

      {/* info doctor */}
      <View style={styles.doctorInfo}>
        <Image source={{ uri: item.doctorFoto }} style={styles.appointmentImage} />
        <Text style={styles.doctorName} numberOfLines={100} ellipsizeMode="tail">
         {item.doctorSexo === "Femenino" ? "Dra." : "Dr."} {item.doctorNombre} {item.doctorApellido} 
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
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: '#fff' }}>
      <View style={styles.container}>
          {/* Calendario */}
          <View style={{ width: '100%' }}>
            <Calendar 
              style={styles.calendar}
              locales={'es'}
              theme={{
                textMonthFontSize: 22,
                textMonthFontWeight: "bold",
                selectedDayBackgroundColor: "#0A3B74",
                todayTextColor: "#0A3B74",
                dotColor: "#0A3B74",
              }}
              markedDates={markedDates} 
            />
          </View>

          {/* citas del paciente */}
          {appointments.length > 0 ? (
            appointments.map(renderAppointment)
          ) : (
            <Text style={styles.noAppointmentsText}>
              No tienes próximas citas pendientes
            </Text>
          )}

          <StatusBar style="auto" />
        </View>
    </ScrollView>
  );
};

// pantalla de citas archivadas
const ArchivedAppointments = () => {
  const navigation = useNavigation();
  const [archivedAppointments, setArchivedAppointments] = useState([]);

useEffect(() => {
  const fetchArchived = async () => {
    try {
      const patientId = auth.currentUser.uid;

      const q = query(
        collection(db, 'citas'),
        where('pacienteId', '==', patientId),
        where('estado', '==', 'finalizada')
      );

      const snapshot = await getDocs(q);

      const appointments = await Promise.all(
        snapshot.docs.map(async docCita => {
        const cita = docCita.data();

        const doctorSnap = await getDoc(
          doc(db, 'users', cita.doctorId)
        );

        const opinionSnapshot = await getDocs(
          query(
            collection(db, 'opiniones'),
            where('citaId', '==', docCita.id),
            where('pacienteId', '==', patientId)
          )
        );

        const yaEvaluada = !opinionSnapshot.empty;

        console.log('CITA:', docCita.id, 'YA EVALUADA:', yaEvaluada);

        const doctor = doctorSnap.exists()
          ? doctorSnap.data()
          : null;

          return {
            id: docCita.id,
            doctorId: cita.doctorId,
            doctorName: doctor
              ? `${doctor.nombre} ${doctor.apellidoPaterno}`
              : 'Doctor',
            doctorSex: doctor?.sexo || 'Masculino',
            doctorImage:
              doctor?.photoURL || 'https://via.placeholder.com/150',
            service: Array.isArray(cita.servicios)
              ? cita.servicios.map(s => s.nombre).join(', ')
              : cita.servicios?.nombre || 'Consulta',
             yaEvaluada,
          };
        })
      );

      setArchivedAppointments(appointments);
    } catch (error) {
      console.error('Error al cargar citas archivadas:', error);
    }
  };

  fetchArchived();
}, []);

  const renderArchivades = (item) => (
    <View key={item.id} style={styles.archiveCard}>

      {/* info doctor */}
      <View style={styles.doctorInfo}>
        <Image source={{ uri: item.doctorImage }} style={styles.archiveImage} />
        <View style={styles.archiveInfo}>
          <Text style={styles.doctorName} numberOfLines={2} ellipsizeMode="tail">
            Dr{item.doctorSex === "Femenino" ? "a" : ""}. {item.doctorName} 
          </Text>
          <Text style={styles.serviceText}>{item.service}</Text>
        </View>

      </View>

      {/* boton */}
      {!item.yaEvaluada && (
        <View style={styles.dateInfo}>
          <TouchableOpacity
            style={styles.evaluateButton}
            onPress={() =>
              navigation.navigate("Rating", {
                doctor: {
                  id: item.doctorId,
                  name: item.doctorName,
                  image: item.doctorImage,
                  sex: item.doctorSex,
                  service: item.service,
                },
                citaId: item.id,
              })
            }
          >
            <Text style={styles.evaluateText}>Evaluar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: '#fff' }}>
      <View style={styles.container}>
          
        {archivedAppointments.length > 0 ? (
          archivedAppointments.map(renderArchivades)
        ) : (
          <Text style={styles.noAppointmentsText}>No tienes citas finalizadas</Text>
        )}

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
  calendar: {
    width: '100%',
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
  archiveCard: {
    width: '95%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    borderTopColor: '#a8a6a6ff',
    borderTopWidth: 1,
  },
  archiveInfo: {
    flexDirection: 'column',
    padding: 15,
    flex: 1,
    overflow: 'hidden',
  },
  archiveImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  serviceText: {
    color: '#777',
  },
  evaluateButton: {
    backgroundColor: '#ffff',
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
  },
  evaluateText: {
    color: PrimaryColor,
  },
  noAppointmentsText: {
    marginTop: 20,
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  }
});

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#fff',}}>
      {/*header*/}
      <View style={styles.header}>
        <TouchableOpacity>
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
        initialRouteName ="Mis citas"
        screenOptions={{ 
        headerShown: false,
        tabBarInactiveTintColor: PrimaryColor,
        tabBarActiveTintColor: SecondaryColor,
      }}
      >
        <Tab.Screen name='Mis citas' component={MyAppointments} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name='Archivado' 
          component={ArchivedAppointments} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="archive" color={color} size={size} />
            ),
          }}
        />

      </Tab.Navigator>
    </View>
  );
}

export default MyTabs;