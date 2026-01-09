import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, CommonActions } from '@react-navigation/native';

const PrimaryColor = '#0A3B74';

const Patients = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      })
    );
  };
    
  const archivades = [
  {
    id: 1,
    name: "Daniel flores Zazueta",
    sex: "male",
    image: "https://imgs.search.brave.com/PyiinRrY5IiCJP7f0qr4dC0_-gnIw5e2twwoXwRgGzI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/aG9tYnJlLWZlbGl6/LXBpZS1wbGF5YV8x/MDc0MjAtOTg2My5q/cGc_c2VtdD1haXNf/aHlicmlkJnc9NzQw/JnE9ODA",
    date: "13 Sept. 2022",
    service: "Rayos X",
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
    service: "Consulta",
    status : "Pendiente"
  },
  {
    id: 3,
    name: "Maria Jose Perez Luna",
    sex: "female",
    image: "https://imgs.search.brave.com/DYV3BxkQ8UMDNBQZ0FGyoj6mhA-PVkTQLImT7hBztMs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzEzLzM4LzM5/LzM2MF9GXzcxMzM4/Mzk5NV9OTnZKZ2U1/emFpbVFsdzRXVW1n/U3ZHMVhMVUdzcTBI/ai5qcGc",
    date: "20 Sept. 2022",
    hour: "08:00 AM",
    service: "Consulta",
    status : "Cancelado"
  }
  ];

  const renderArchivades = (item) => (
    <View key={item.id} style={styles.archiveCard}>
      {/* info doctor */}
      <View style={styles.doctorInfo}>
        <Image source={{ uri: item.image }} style={styles.archiveImage} />
        <View style={styles.archiveInfo}>
          <Text style={styles.doctorName} numberOfLines={2} ellipsizeMode="tail">
            {item.name}
          </Text>
        </View>
      </View>

      {/* boton */}
      <View style={styles.dateInfo}>
        <TouchableOpacity style={styles.evaluateButton} 
        //   onPress={() =>
        //   navigation.navigate("SeeNotes", {
        //     patient: {
        //       name: item.name,
        //       date: item.date,
        //       service: item.service,
        //     }
        //   })
        // }

          onPress={() =>
          navigation.navigate("SeeNotes", {
            patient: {
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

        <Text style={styles.textDoctors}>Pacientes</Text>
        
        {archivades.map(renderArchivades)}

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
});

export default Patients;