import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Settings from '../Settings';

const PrimaryColor = '#0A3B74';

const Notifications = () => {
  const navigation = useNavigation();

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

   //funcion para renderizar cada tarjeta
  const renderAppointment = (item) => (
    <View key={item.id} style={styles.appointmentCard}>
      
      {/* barra azul izquierda */}
      <View style={styles.leftBar} />

      {/* info doctor */}
      <View style={styles.doctorInfo}>
        <Image source={{ uri: item.image }} style={styles.appointmentImage} />
        <Text style={styles.doctorName} numberOfLines={1} ellipsizeMode="tail">
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
      <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
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

        <Text style={styles.textDoctors}>Notificaciones</Text>

        {appointments.map(renderAppointment)}
        
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
});

export default Notifications;