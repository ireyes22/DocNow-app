import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from "@react-navigation/native";
import StarRating from 'react-native-star-rating-widget';
import RegisterAppointment from "./RegisterAppointment";
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import {  auth,db } from '../../firebaseConfig';

const PrimaryColor = '#0A3B74';

const SeeDoctor = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [ratings, setRatings] = React.useState([]);

    const { doctor } = route.params;

    React.useEffect(() => {
  const fetchRatings = async () => {
    try {
      const q = query(
        collection(db, 'opiniones'),
        where('doctorId', '==', doctor.id),
        limit(3) // solo los primeros 3 comentarios
      );

      const snapshot = await getDocs(q);

      const ratingsData = snapshot.docs.map(doc => {
        const r = doc.data();
        return {
          id: doc.id,
          rating: r.rating,
          opinion: r.comentario,
          image: r.pacienteFoto,
          date: r.fecha?.toDate().toLocaleDateString('es-MX'),
        };
      });

      setRatings(ratingsData);

    } catch (error) {
      console.error("Error al cargar valoraciones:", error);
    }
  };

  fetchRatings();
}, [doctor]);


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

            <TouchableOpacity style={styles.servicesRow} 
            onPress={() =>
              navigation.navigate("Ratings", {
                doctorId: doctor.id,
              })
            }
            >
                <Text style={styles.textServices}>Valoraciones</Text>
                <Ionicons name="arrow-forward-outline" size={24} color={PrimaryColor} />
            </TouchableOpacity>

            {ratings.length === 0 ? (
              <Text style={{ textAlign: 'center', color: '#777', marginTop: 10 }}>
                Este médico aún no tiene valoraciones
              </Text>
            ) : (
              ratings.map(r => (
                <View key={r.id} style={styles.ratingCard}>
                  <Image source={{ uri: r.image }} style={styles.ratingImage} />
                  <View style={styles.ratingContent}>
                    <View style={styles.ratingHeader}>
                      <StarRating
                        rating={r.rating}
                        onChange={() => {}}
                        starSize={16}
                        enableSwiping={false}
                        starStyle={{ marginRight: 2 }}
                      />
                      {r.date && <Text style={styles.ratingDate}>{r.date}</Text>}
                    </View>
                    <Text style={styles.ratingText}>{r.opinion}</Text>
                  </View>
                </View>
              ))
            )}

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