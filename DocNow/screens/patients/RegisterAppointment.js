import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from "@react-navigation/native";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import React, { useState } from 'react';
import Pay from "./Pay";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";

const PrimaryColor = '#0A3B74';

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: "Hoy"
};

LocaleConfig.defaultLocale = 'es';

const RegisterAppointment = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [selectedTime, setSelectedTime] = useState(null);
    const TIMES_MATUTINO = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM"];
    const TIMES_VESPERTINO = ["4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"];
    const [selectedServices, setSelectedServices] = useState([]);
    const { doctor } = route.params;
    const SERVICES = doctor.servicios;
    const turno = doctor.horarioDisponible;
    const [selected, setSelected] = useState("");
    const TIMES = turno === "Vespertino"
    ? TIMES_VESPERTINO
    : TIMES_MATUTINO;
    const auth = getAuth();
    const patientId = auth.currentUser.uid;
    const doctorId = doctor.id;
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // los meses empiezan en 0
    const dd = String(today.getDate()).padStart(2, '0');
    const todayString = `${yyyy}-${mm}-${dd}`; // formato "YYYY-MM-DD"

    // Crear un objeto de fechas marcadas para el calendario
    const markedDates = {
      [selected]: {
        selected: true,
        selectedColor: PrimaryColor, // color de la marca
      }
    };

    const toggleService = (service) => {
      setSelectedServices(prev => {
        const exists = prev.find(s => s.nombre === service.nombre);
        if (exists) {
          return prev.filter(s => s.nombre!== service.nombre);
        }
        return [...prev, service];
      });
    };

    // funcion para reservar una cita
    const reserveAppointment = async () => {
      if (!selected || selectedServices.length === 0) {
        alert("Selecciona fecha y al menos un servicio");
        return;
      }

      try {
        await addDoc(collection(db, "citas"), {
          doctorId: doctorId,
          pacienteId: patientId,
          fecha: selected,
          servicios: selectedServices,
          hora: selectedTime,
          total,
          estado: "pendiente",
          createdAt: Timestamp.now(),
        });

        navigation.navigate("Pay", {
          doctorId,
          fecha: selected,
          hora: selectedTime,
          servicios: selectedServices,
          total,
        });
      } catch (error) {
        console.error(error);
        alert("Error al reservar la cita");
      }
    };

    const goToPayment = () => {
      if (!selected || selectedServices.length === 0 || !selectedTime) {
        alert("Selecciona fecha, hora y al menos un servicio");
        return;
      }

      navigation.navigate("Pay", {
        doctorId,
        patientId,
        fecha: selected,
        hora: selectedTime,
        servicios: selectedServices,
        total,
      });
    };

    // suma precio servicios
    const total = selectedServices.reduce(
      (sum, service) => sum + Number(service.precio),
      0
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

        {/* services */}
        <View style={styles.contactContainer}>
            <Text style={styles.contactLabel}>Servicios disponibles</Text>

            {SERVICES.length === 0 ? (
            <Text style={styles.contactText}>
                No hay servicios registrados
            </Text>
            ) : (
              SERVICES.map((service, index) => (
                  <View key={index} style={styles.contactRow}>
                    <View style={styles.contactRow}>
                        <Ionicons name="ellipse" size={12} color={PrimaryColor} />
                        <Text style={styles.contactText}>{service.nombre}</Text>
                        {/* <Text style={styles.contactText}>${service.precio}</Text> */}
                    </View>
                    <Text style={styles.contactText}>${service.precio}</Text>

                    
                  </View>
              ))
            )}
        </View>

        {/* contacts */}
        <View style={styles.contactContainer}>
          <Text style={styles.contactLabel}>Solicita tus servicios</Text>

          {SERVICES.map((service, index) => (
            <TouchableOpacity
              key={`${service.name}-${index}`}
              style={styles.contactRow}
              onPress={() => toggleService(service)}
            >
              <Ionicons
                name={
                  selectedServices.some(s => s.nombre === service.nombre)
                    ? "checkbox"
                    : "square-outline"
                }
                size={22}
                color={PrimaryColor}
              />

              <Text style={styles.contactText}>
                {service.nombre} - ${service.precio}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* availability */}
        <View style={styles.contactContainer}>
            <Text style={styles.contactLabel}>Disponibilidad</Text>

            <View style={styles.contactRow}>
                <Text style={styles.contactText}>{doctor.diasDisponibles}</Text>
            </View>

            <View style={styles.contactRow}>
                <Text style={styles.contactText}>{doctor.horarioDisponible}</Text>
            </View>
        </View>

        {/* calendar */}
        <View style={styles.contactContainer}>
          <Text style={styles.contactLabel}>Proximas fechas</Text>
        </View>

        <View style={{ width: '100%' }}>
          <Calendar 
            style={styles.calendar}
            onDayPress={day => {
              setSelected(day.dateString); 
            }}
            markedDates={markedDates} 
            theme={{
              textMonthFontSize: 22,
              textMonthFontWeight: "bold",
              selectedDayBackgroundColor: "#0A3B74",
              todayTextColor: "#0A3B74",
              dotColor: "#0A3B74",
            }}
            minDate={todayString} // aquí deshabilitamos fechas pasadas
          />
        </View>
        
        <View style={styles.contactContainer}>
          <View style={styles.contactRow}>
                <Ionicons name="square" size={15} color='#AAAAAA' />
                <Text style={styles.contactText}>Sin disponibilidad</Text>
            </View>

            <View style={styles.contactRow}>
                <Ionicons name="square" size={15} color={PrimaryColor} />
                <Text style={styles.contactText}>Seleccionado</Text>
            </View>
        </View>

        {/* shedules */}
        <View style={styles.timeContainer}>
          <Text style={styles.contactLabel}>Horarios disponibles</Text>

          <View style={styles.timeGrid}>
            {TIMES.map(time => {
              const isSelected = selectedTime === time;

              return (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeSlot,
                    isSelected && styles.timeSlotSelected
                  ]}
                  onPress={() => setSelectedTime(time)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.timeText,
                      isSelected && styles.timeTextSelected
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.contactLabel}>Total: ${total}</Text>
        </View>

        {/* button */}
        <TouchableOpacity style={styles.editButton}
          onPress={goToPayment}
        >
            <Text style={styles.editButtonText}>Pagar</Text>
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
  timeContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20,
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
  calendar: {
    width: '100%',
    marginBottom: 20,
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
  timeButton: {
    marginTop: 10,
    width: "30%",
    backgroundColor: '#AAAAAA',
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: 'center',
    marginTop: 7,
    marginBottom: 20,
  },
  timeOfButton: {
    marginTop: 10,
    width: "30%",
    backgroundColor: '#ffff',
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: 'center',
    marginTop: 7,
    marginBottom: 20,
    borderColor: '#AAAAAA',
    borderWidth: 1,
  },
  timeButtonSelectText: {
    color: '#ffff',
    fontWeight: "600",
    fontSize: 15,
  },
  timeButtonText: {
    color: '#AAAAAA',
    fontWeight: "600",
    fontSize: 15,
  },
  editButton: {
    marginTop: 35,
    width: "70%",
    backgroundColor: PrimaryColor,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30, 
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  timeSlot: {
    width: "30%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: PrimaryColor,
    backgroundColor: "#fff",
  },
  timeSlotSelected: {
    backgroundColor: PrimaryColor,
  },
  timeText: {
    color: PrimaryColor,
    fontWeight: "600",
    fontSize: 15,
  },
  timeTextSelected: {
    color: "#fff",
  },
});

export default RegisterAppointment;