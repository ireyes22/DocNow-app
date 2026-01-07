import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const PrimaryColor = '#0A3B74';

const Notifications = () => {
    const navigation = useNavigation();

    const appointments = [
    {
      id: 1,
      name: "Daniel flores Zazueta",
      sex: "male",
      image: "https://imgs.search.brave.com/PyiinRrY5IiCJP7f0qr4dC0_-gnIw5e2twwoXwRgGzI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/aG9tYnJlLWZlbGl6/LXBpZS1wbGF5YV8x/MDc0MjAtOTg2My5q/cGc_c2VtdD1haXNf/aHlicmlkJnc9NzQw/JnE9ODA",
      date: "13 Sept. 2022",
      hour: "10:00 AM",
      status : "Confirmado"
    },
    {
      id: 2,
      name: "David Montoya Lopez",
      sex: "male",
      image: "https://imgs.search.brave.com/GfUo1G7t01wG8lxoeHybzFdEqI9i4TtrddTz64ZjqwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM4/ODY0ODYxNy9lcy9m/b3RvL2pvdmVuLWNh/dWMlQzMlQTFzaWNv/LWNvbmZpYWRvLWNv/bi1yb3BhLWNhc3Vh/bC1kZS1tZXpjbGls/bGEtY29uLWxvcy1i/cmF6b3MtY3J1emFk/b3MtbWlyYW5kby1h/LWxhLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1UWE9WckJi/S3VPQ3dqUVR0NGtP/VTdJUGIwTTdxeXhz/bVVPMi1vVjlEVm13/PQ",
      date: "15 Sept. 2022",
      hour: "03:30 PM",
      status : "Pendiente"
    },
    {
      id: 3,
      name: "Maria Jose Perez Luna",
      sex: "female",
      image: "https://imgs.search.brave.com/DYV3BxkQ8UMDNBQZ0FGyoj6mhA-PVkTQLImT7hBztMs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzEzLzM4LzM5/LzM2MF9GXzcxMzM4/Mzk5NV9OTnZKZ2U1/emFpbVFsdzRXVW1n/U3ZHMVhMVUdzcTBI/ai5qcGc",
      date: "20 Sept. 2022",
      hour: "08:00 AM",
      status : "Cancelado"
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
          <View>
            <Text style={styles.doctorName} numberOfLines={2} ellipsizeMode="tail">
                {item.name}
            </Text>
            <Text>{item.status}</Text>
          </View>
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

    return(
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