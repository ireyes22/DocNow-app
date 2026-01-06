import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation, useRoute  } from '@react-navigation/native';
import Settings from '../Settings';
import StarRating from 'react-native-star-rating-widget';

const PrimaryColor = '#0A3B74';
const SecondaryColor = '#498FC0';

const Rating = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { doctor } = route.params;

  const [rating, setRating] = useState(0);

  return (
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

        <Text style={styles.textDoctors}>Tu opinión importa</Text>

        <View style={styles.doctorInfo}>
          {/* image */}
          <Image source={{ uri: doctor.image }} style={styles.doctorImage} />

          <View style={styles.archiveInfo}>
            {/* doctor name */}
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
              Dr{doctor?.sex === "female" ? "a" : ""}. {doctor?.name}
            </Text>

            {/* services */}
            <Text style={{ fontSize: 16, marginBottom: 20, color: '#555' }}>
              {doctor?.service}
            </Text>

            {/* star rating */}
            <StarRating
              rating={rating}
              onChange={setRating}
              starSize={30}           
              color={SecondaryColor}    
              enableHalfStar={true}   
            />
          </View>
        </View>

        <TextInput
          style={styles.input}
          // value={curp}
          // onChangeText={setCurp}
          placeholder='Añadir comentario...'
          multiline={true}  
          scrollEnabled={true}  
        />

        <TouchableOpacity style={styles.sendButton} onPress={() => setEditMode(true)}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        
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
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    flex: 1,
    overflow: 'hidden',
  },
  archiveInfo: {
    flexDirection: 'column',
    padding: 10,
    overflow: 'hidden',
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  input: {
    height: 210,
    width: 340,
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: PrimaryColor,
    textAlignVertical: "top",
    marginTop: 20,
    fontSize: 16,
    color: "#000",
  },
  sendButton: {
    marginTop: 25,
    width: "90%",
    backgroundColor: PrimaryColor,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 15,
    width: "90%",
    borderRadius: 10,
    padding: 15,
    borderWidth: 2,
    borderColor: PrimaryColor,
    alignItems: "center",
  },
  cancelButtonText: {
    color: PrimaryColor,
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Rating;