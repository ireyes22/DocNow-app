import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from "@react-navigation/native";
import RegisterAppointment from "./RegisterAppointment";

const PrimaryColor = '#0A3B74';

const SeeDoctor = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const { doctor } = route.params;

    const ratings = [
    {
        id: 1,
        image: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740&q=80",
        rating: 4,
        date: "13 Sept. 2022",
        opinion: "El mejor médico, me encanta su amabilidad",
    },
    {
        id: 2,
        image: "https://media.istockphoto.com/id/1053768920/es/foto/seria-bella-mujer-negro.jpg?s=612x612&w=0&k=20&c=8Q0sZYVER0FBkVhg3zKVN6KpzwnEnV5VBRiuhbmFxFw=",
        rating: 1,
        date: "25 Abr. 2022",
        opinion: "Pésimo servicio",
    },
    {
        id: 3,
        image: "https://www.hola.com/horizon/landscape/6a53cd5134b2-getty-chica-feliz-t.jpg",
        rating: 5,
        date: "27 Mar. 2022",
        opinion: "Buen servicio",
      
    }
  ];

    //función para renderizar las opiniones
    const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
        <Ionicons
        key={index}
        name="star"
        size={16}
        color={index < rating ? "#FFD700" : "#D9D9D9"}
        style={{ marginRight: 2 }}
        />
    ));
    };

    const renderRating = (item) => (
    <View key={item.id} style={styles.ratingCard}>
        
        {/* avatar */}
        <Image source={{ uri: item.image }} style={styles.ratingImage} />

        {/* content */}
        <View style={styles.ratingContent}>

        <View style={styles.ratingHeader}>
            <View style={styles.starsRow}>
            {renderStars(item.rating)}
            </View>

            {item.date && (
            <Text style={styles.ratingDate}>{item.date}</Text>
            )}
        </View>

        <Text style={styles.ratingText}>{item.opinion}</Text>
        </View>
    </View>
    );


  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        {/*header*/}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Ionicons name="settings-outline" size={24} color="black" />
            </TouchableOpacity>
        </View>

        <Image source={{ uri: doctor.photoURL }} style={styles.doctorImage} />

        {/* doctor name and specialty */}
        <View style={styles.doctorName}>
            <Text style={styles.nameDoctor}>{doctor.sexo === "Femenino" ? "Dra." : "Dr."} {doctor.nombre} {doctor.apellidoPaterno}</Text>
            <Text style={styles.specialityDoctor}>{doctor.especialidad}</Text>
        </View>

        {/* contacts */}
        <View style={styles.contactContainer}>
            <Text style={styles.contactLabel}>Contacto</Text>

            <View style={styles.contactRow}>
                <Ionicons name="call-outline" size={20} color={PrimaryColor} />
                <Text style={styles.contactText}>{doctor.telefono}</Text>
            </View>

            <View style={styles.contactRow}>
                <Ionicons name="mail-outline" size={20} color={PrimaryColor} />
                <Text style={styles.contactText}>{doctor.correo}</Text>
            </View>

            <View style={styles.contactRow}>
                <Ionicons name="business-outline" size={20} color={PrimaryColor} />
                <Text style={styles.contactText}>{doctor.consultorio}</Text>
            </View>
        </View>

        {/* services */}
        <View style={styles.contactContainer}>
          <View style={styles.servicesHeader}>
            <Text style={styles.contactLabel}>Servicios ofertados</Text>
            <Text style={styles.contactLabel}>Costo</Text>
          </View>

           {doctor.servicios && doctor.servicios.length > 0 ? (
            doctor.servicios.map((service, index) => (
              <View key={index} style={styles.serviceRow}>
                <View style={styles.serviceLeft}>
                  <Ionicons name="ellipse" size={12} color={PrimaryColor} />
                  <Text style={styles.contactText}>
                    {service.nombre}
                  </Text>
                </View>

                <Text style={styles.contactText}>
                  ${service.precio}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.contactText}>
              Este doctor no ha registrado servicios
            </Text>
          )}
        </View>

        {/* availability */}
        <View style={styles.contactContainer}>
          <Text style={styles.contactLabel}>Disponibilidad</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactText}>
              {doctor.diasDisponibles === "Lunes a viernes"
                ? "Lunes a Viernes"
                : "Sábado y Domingo"}
            </Text>
          </View>

          <View style={styles.contactRow}>
            <Text style={styles.contactText}>
              {doctor.horarioDisponible === "Matutino"
                ? "Matutino"
                : "Vespertino"}
            </Text>
          </View>
        </View>

        {/* ratings*/}
        <View style={styles.contactContainer}>

            <TouchableOpacity style={styles.servicesRow}>
                <Text style={styles.textServices}>Valoraciones</Text>
                <Ionicons name="arrow-forward-outline" size={24} color={PrimaryColor} />
            </TouchableOpacity>

            {ratings.map(renderRating)}

        </View>

        {/* button */}
        <TouchableOpacity style={styles.editButton} 
          onPress={() =>
          navigation.navigate("RegisterAppointment", {
            doctor: doctor,
          })}
        >
            <Text style={styles.editButtonText}>Solicitar cita</Text>
        </TouchableOpacity>

       </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50, 
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 20,
    position: 'absolute',
    zIndex: 10,
  },
  scroll: {
    flexGrow: 1,
  },
  doctorImage: {
    width: '100%',
    height: 300,
  },
  doctorName: {
    backgroundColor: PrimaryColor,
    alignItems: 'center',
    justifyContent: 'space-between', 
    padding: 10,
    borderRadius: 10,
    marginTop: -40,
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center', 
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  nameDoctor: {
    fontWeight: 'bold',
    color: '#ffff',
    textAlign: 'center',
    fontSize: 20,
  },
  specialityDoctor: {
    color: '#ffff',
    textAlign: 'center',
    fontSize: 16,
  },
  contactLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 20,
  },
  contactContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
   contactText: {
    marginLeft: 10,
    fontSize: 14,
  },
  servicesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
    marginBottom: 20,
  },
  textServices: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 10,
    marginVertical: 6,
  },
  ratingCard: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  ratingImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  ratingContent: {
    flex: 1,
  },
  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starsRow: {
    flexDirection: 'row',
  },
  ratingDate: {
    fontSize: 12,
    color: '#777',
  },
  ratingText: {
    marginTop: 6,
    fontSize: 14,
    color: '#000',
  },
  editButton: {
    marginTop: 25,
    width: "70%",
    backgroundColor: PrimaryColor,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: 'center',
    marginTop: 7,
    marginBottom: 20, 
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  servicesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  serviceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default SeeDoctor;