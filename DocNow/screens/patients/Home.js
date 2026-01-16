import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Settings from '../Settings';
import SeeDoctor from './SeeDoctor';
import Login from  '../Login';

const PrimaryColor = '#0A3B74';

const Home = () => {
  const navigation = useNavigation();
  
  const [search, setSearch] = useState('');
    //array de servicios
  const services = [
    {
      id: 1,
      name: "Rayos X",
      image: "https://irp.cdn-website.com/3aeb46bf/dms3rep/multi/blog.webp"
    },
    {
      id: 2,
      name: "Ultrasonidos",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXFH-ggpwtOsq_p1l8mFh0ugH0ar_zGrrnKQ&s"
    },
    {
      id: 3,
      name: "Consulta",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc_1BtaNYvaSwlWouP7MQXjfXYM5PdHxi3XQ&s"
    }
  ];

  const doctors = [
    {
      id: 1,
      name: "Juan Perez",
      phone: "3453535345",
      email: "ejemplo@gmail.com",
      sex: "male",
      image: "https://www.clinicasantiago.com.ec/wp-content/uploads/2024/12/dr_victor_herna.jpg",
      specialty: 'Internista',
      clinic: "Consultorio 1",
    },
    {
      id: 2,
      name: "Maria Lopez",
      phone: "3453535345",
      email: "ejemplo@gmail.com",
      sex: "female",
      image: "https://cdn.agenciasinc.es/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/solo-el-8-de-las-medicas-alcanza-puestos-de-responsabilidad-en-hospitales/3405721-5-esl-MX/Solo-el-8-de-las-medicas-alcanza-puestos-de-responsabilidad-en-hospitales.jpg",
      specialty: 'Internista',
      clinic: "Consultorio 2",
    },
    {
      id: 3,
      name: "Araceli Young",
      phone: "3453535345",
      email: "ejemplo@gmail.com",
      sex: "female",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPd1ag04qAxUqyFsA1waifXN9eNnce45gdKQ&s",
      specialty: 'Internista',
      clinic: "Consultorio 3",
    }
  ];

  const appointments = [
    {
      id: 1,
      doctor: "Juan Perez",
      sex: "male",
      image: "https://www.clinicasantiago.com.ec/wp-content/uploads/2024/12/dr_victor_herna.jpg",
      date: "13 Sept. 2022",
      hour: "10:00 AM"
    },
    {
      id: 2,
      doctor: "Maria Lopez",
      sex: "female",
      image: "https://cdn.agenciasinc.es/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/solo-el-8-de-las-medicas-alcanza-puestos-de-responsabilidad-en-hospitales/3405721-5-esl-MX/Solo-el-8-de-las-medicas-alcanza-puestos-de-responsabilidad-en-hospitales.jpg",
      date: "15 Sept. 2022",
      hour: "03:30 PM"
    },
    {
      id: 3,
      doctor: "Araceli Young",
      sex: "female",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPd1ag04qAxUqyFsA1waifXN9eNnce45gdKQ&s",
      date: "20 Sept. 2022",
      hour: "08:00 AM"
    }
  ];

  //funcion para renderizar servicios
  const renderService = (item) => (
    <TouchableOpacity key={item.id} style={styles.serviceContainer}>
      <Image
        source={{ uri: item.image }}
        style={styles.roundImage}
        resizeMode="cover"
      />
      <Text style={styles.typeServices}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderDoctor = (item) => (
    <TouchableOpacity key={item.id} style={styles.doctorContainer}  
      onPress={() =>
        navigation.navigate("SeeDoctor", {
          doctor: item,
        })
    }>
      <Image
        source={{ uri: item.image }}
        style={styles.doctorsImage}
        resizeMode="cover"
      />
      <Text style={styles.typeServices}>{item.name}</Text>
    </TouchableOpacity>
  );

  //función para renderizar cada tarjeta
    const renderAppointment = (item) => (
      <View key={item.id} style={styles.appointmentCard}>
        
        {/* barra azul izquierda */}
        <View style={styles.leftBar} />
  
        {/* info doctor */}
        <View style={styles.doctorInfo}>
          <Image source={{ uri: item.image }} style={styles.appointmentImage} />
          <Text style={styles.doctorName} numberOfLines={2} ellipsizeMode="tail">
            {item.sex === "female" ? "Dra." : "Dr."} {item.doctor}
          </Text>
        </View>
  
        {/* linea divisora */}
        <View style={styles.divider} />
  
        {/* fecha */}
        <View style={styles.dateInfo}>
          <Ionicons name="calendar-outline" size={24} color={PrimaryColor} />
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.hourText}>{item.hour}</Text>
        </View>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        {/*header*/}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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

        <TouchableOpacity style={styles.servicesRow}>
          <Text style={styles.textServices}>Servicios</Text>
          <Ionicons name="arrow-forward-outline" size={24} color={PrimaryColor} />
        </TouchableOpacity>

        {/*generar servicios*/}
        <View style={styles.servicesGrid}>
          {services.map(renderService)}
        </View>

        <Text style={styles.textDoctors}>Medicos destacados</Text>

        {/* agregar top doctores */}
        <View style={styles.servicesGrid}>
          {doctors.map(renderDoctor)}
        </View>

        <Text style={styles.textDoctors}>Próximas citas</Text>

        {/* citas del paciente */}
        {appointments.map(renderAppointment)}

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
});

export default Home;