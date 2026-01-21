import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebaseConfig';
import { useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';

const PrimaryColor = '#0A3B74';

const DoctorAdmin = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [doctors, setDoctors] = useState([]);
    
  // cargar a todos los doctores
  useEffect(() => {
    const fetchDoctors = async () => {
      const q = query(
        collection(db, 'users'),
        where('rol', '==', 'doctor')
      );

      const querySnapshot = await getDocs(q);
      const doctorsList = [];

      querySnapshot.forEach((doc) => {
        doctorsList.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setDoctors(doctorsList);
    };

    fetchDoctors();
  }, []);

    const renderArchivades = (item) => 
    (
      <View key={item.id} style={styles.archiveCard}>
        {/* info doctor */}
        <View style={styles.doctorInfo}>
          <Image source={{ uri: item.photoURL }} style={styles.archiveImage} />
          <View style={styles.archiveInfo}>
            <Text style={styles.doctorName} numberOfLines={100} ellipsizeMode="tail">
                {item.sexo === "Femenino" ? "Dra." : "Dr."} {item.nombre} {item.apellidoPaterno} {item.apellidoMaterno}
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
            
            <Text style={styles.title}>Doctores</Text>

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

            {doctors.map(renderArchivades)}

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

export default DoctorAdmin;