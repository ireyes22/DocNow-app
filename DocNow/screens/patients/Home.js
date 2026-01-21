import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Settings from '../Settings';
import SeeDoctor from './SeeDoctor';
import Login from  '../Login';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import { useEffect } from 'react';

const PrimaryColor = '#0A3B74';

const Home = ({onLogout}) => {
  const navigation = useNavigation();
  const [services, setServices] = useState([]);
  const [showAllServices, setShowAllServices] = useState(false);
  const [search, setSearch] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  
  // traer servicios
  useEffect(() => {
    const fetchServices = async () => {
      const querySnapshot = await getDocs(collection(db, 'servicios'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setServices(data);
    };

    fetchServices();
  }, []);
  
  // traer medicos destacados
  useEffect(() => {
    const fetchDoctors = async () => {
      const q = query(
        collection(db, 'users'),
        where('rol', '==', 'doctor'),
        where('destacado', '==', true)
      );

      const querySnapshot = await getDocs(q);

      const doctorsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDoctors(doctorsList);
    };

    fetchDoctors();
  }, []);

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
      } catch (error) {
        console.error("Error al cargar citas:", error);
      }
    };

    fetchAppointments();
  }, []);

  //funcion para renderizar servicios
  const renderService = (item) => (
    <TouchableOpacity key={item.id} style={styles.serviceContainer}>
      <Image
        source={{ uri: item.imagen }}
        style={styles.roundImage}
        resizeMode="cover"
      />
      <Text style={styles.typeServices}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  // renderizar doctores
  const renderDoctor = (item) => (
    <TouchableOpacity key={item.id} style={styles.doctorContainer}  
      onPress={() =>
        navigation.navigate("SeeDoctor", {
          doctor: item,
        })
    }>
      <Image
        source={{ uri: item.photoURL }}
        style={styles.doctorsImage}
        resizeMode="cover"
      />
      <Text style={styles.typeServices}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  //función para renderizar cada tarjeta
    const renderAppointment = (item) => (
      <View key={item.id} style={styles.appointmentCard}>
        
        {/* barra azul izquierda */}
        <View style={styles.leftBar} />
  
        {/* info doctor */}
        <View style={styles.doctorInfo}>
          <Image source={{ uri: item.doctorFoto }} style={styles.appointmentImage} />
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
    );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: '#fff' }}>
      <View style={styles.container}>
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

        {/*barra de busqueda*/}
        <View style={styles.searchBox}>
          <Ionicons 
            name="search-outline" 
            size={20} 
            color={PrimaryColor}
            style={{ marginRight: 8 }}
          />

          <TextInput
            style={styles.input}
            placeholder="Buscar"
            placeholderTextColor={PrimaryColor}
            onChangeText={setSearch}
            value={search}
          />
        </View>

        <TouchableOpacity style={styles.servicesRow} onPress={() => setShowAllServices(!showAllServices)}>
          <Text style={styles.textServices}>Servicios</Text>
          <Ionicons
            name={showAllServices ? "chevron-up-outline" : "arrow-forward-outline"}
            size={24}
            color={PrimaryColor}
          />
        </TouchableOpacity>

        {/*generar servicios*/}
        <View style={styles.servicesGrid}>
          {(showAllServices ? services : services.slice(0, 3)).map(renderService)}
        </View>

        <Text style={styles.textDoctors}>Medicos destacados</Text>

        {/* agregar top doctores */}
        <View style={styles.servicesGrid}>
          {doctors.map(renderDoctor)}
        </View>

        <Text style={styles.textDoctors}>Próximas citas</Text>

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
    marginBottom: 20,
  },
  searchBox: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: PrimaryColor,
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: PrimaryColor,
    fontSize: 16,
  },
  servicesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
    marginBottom: 20,
  },
  textServices: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: PrimaryColor,
  },
  roundImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: PrimaryColor,
  },
  typeServices: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  serviceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  servicesGrid: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  textDoctors: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: PrimaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
    marginBottom: 20,
  },
  doctorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  doctorsImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
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

export default Home;