import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PrimaryColor = '#0A3B74';

const PatientAdmin = () => {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');

    const archivades = [
    {
      id: 1,
      name: "Daniel flores Zazueta",
      sex: "male",
      age: 21,
      service: "Rayos X",
      image: "https://imgs.search.brave.com/PyiinRrY5IiCJP7f0qr4dC0_-gnIw5e2twwoXwRgGzI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/aG9tYnJlLWZlbGl6/LXBpZS1wbGF5YV8x/MDc0MjAtOTg2My5q/cGc_c2VtdD1haXNf/aHlicmlkJnc9NzQw/JnE9ODA",
      date: "13 Sept. 2022",
      hour: "10:00 AM",
      status : "Confirmado",
      clinic: 15,
    },
    {
      id: 2,
      name: "David Montoya Lopez",
      sex: "male",
      age: 21,
      service: "Consulta",
      image: "https://imgs.search.brave.com/GfUo1G7t01wG8lxoeHybzFdEqI9i4TtrddTz64ZjqwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM4/ODY0ODYxNy9lcy9m/b3RvL2pvdmVuLWNh/dWMlQzMlQTFzaWNv/LWNvbmZpYWRvLWNv/bi1yb3BhLWNhc3Vh/bC1kZS1tZXpjbGls/bGEtY29uLWxvcy1i/cmF6b3MtY3J1emFk/b3MtbWlyYW5kby1h/LWxhLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1UWE9WckJi/S3VPQ3dqUVR0NGtP/VTdJUGIwTTdxeXhz/bVVPMi1vVjlEVm13/PQ",
      date: "15 Sept. 2022",
      hour: "03:30 PM",
      status : "Pendiente",
      clinic: 12,
    },
    {
      id: 3,
      name: "Maria Jose Perez Luna",
      sex: "female",
      age: 21,
      service: "Consulta",
      image: "https://imgs.search.brave.com/DYV3BxkQ8UMDNBQZ0FGyoj6mhA-PVkTQLImT7hBztMs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzEzLzM4LzM5/LzM2MF9GXzcxMzM4/Mzk5NV9OTnZKZ2U1/emFpbVFsdzRXVW1n/U3ZHMVhMVUdzcTBI/ai5qcGc",
      date: "20 Sept. 2022",
      hour: "08:00 AM",
      status : "Cancelado",
      clinic: 3,
    },
    {
      id: 4,
      name: "Daniel flores Zazueta",
      sex: "male",
      age: 21,
      service: "Rayos X",
      image: "https://imgs.search.brave.com/PyiinRrY5IiCJP7f0qr4dC0_-gnIw5e2twwoXwRgGzI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/aG9tYnJlLWZlbGl6/LXBpZS1wbGF5YV8x/MDc0MjAtOTg2My5q/cGc_c2VtdD1haXNf/aHlicmlkJnc9NzQw/JnE9ODA",
      date: "13 Sept. 2022",
      hour: "10:00 AM",
      status : "Confirmado",
      clinic: 15,
    },
    {
      id: 5,
      name: "David Montoya Lopez",
      sex: "male",
      age: 21,
      service: "Consulta",
      image: "https://imgs.search.brave.com/GfUo1G7t01wG8lxoeHybzFdEqI9i4TtrddTz64ZjqwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM4/ODY0ODYxNy9lcy9m/b3RvL2pvdmVuLWNh/dWMlQzMlQTFzaWNv/LWNvbmZpYWRvLWNv/bi1yb3BhLWNhc3Vh/bC1kZS1tZXpjbGls/bGEtY29uLWxvcy1i/cmF6b3MtY3J1emFk/b3MtbWlyYW5kby1h/LWxhLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1UWE9WckJi/S3VPQ3dqUVR0NGtP/VTdJUGIwTTdxeXhz/bVVPMi1vVjlEVm13/PQ",
      date: "15 Sept. 2022",
      hour: "03:30 PM",
      status : "Pendiente",
      clinic: 12,
    },
    {
      id: 6,
      name: "Maria Jose Perez Luna",
      sex: "female",
      age: 21,
      service: "Consulta",
      image: "https://imgs.search.brave.com/DYV3BxkQ8UMDNBQZ0FGyoj6mhA-PVkTQLImT7hBztMs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzEzLzM4LzM5/LzM2MF9GXzcxMzM4/Mzk5NV9OTnZKZ2U1/emFpbVFsdzRXVW1n/U3ZHMVhMVUdzcTBI/ai5qcGc",
      date: "20 Sept. 2022",
      hour: "08:00 AM",
      status : "Cancelado",
      clinic: 3,
    },
  ];

    const renderArchivades = (item) => 
    (
      <View key={item.id} style={styles.archiveCard}>
        {/* info doctor */}
        <View style={styles.doctorInfo}>
          <Image source={{ uri: item.image }} style={styles.archiveImage} />
          <View style={styles.archiveInfo}>
            <Text style={styles.doctorName} numberOfLines={2} ellipsizeMode="tail">
                {item.name}
            </Text>
            <Text style={styles.doctorService}>Ver citas</Text>
          </View>
    
        </View>
    
        {/* boton */}
        <View style={styles.groupButtons}>
          <View style={styles.dateInfo}>
            <TouchableOpacity style={styles.evaluateButton}>
              <Text style={styles.evaluateText}>Editar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dateInfo}>
            <TouchableOpacity style={styles.notesButton}>
              <Text style={styles.notesText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
            {/*header*/}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
    
                <Image 
                source={require('../../assets/logoDocNow.png')} 
                style={{ width: 30, height: 30, resizeMode: 'contain',}}
                />
            </View>
            
            <Text style={styles.title}>Pacientes</Text>

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

            {archivades.map(renderArchivades)}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: PrimaryColor,
    marginBottom: 25,
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
    backgroundColor: PrimaryColor,
    paddingVertical: 9, 
    paddingHorizontal: 23,
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
    backgroundColor: '#DC0202',
    paddingVertical: 8, 
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: '#DC0202',
    borderWidth: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginRight: 10,
  },
  notesText: {
    color: '#fff',
  },
  groupButtons: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
});

export default PatientAdmin;