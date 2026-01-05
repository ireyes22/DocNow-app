import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from "@react-navigation/native";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import React, { useState } from 'react';
import Pay from "./Pay";

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

    const [selectedServices, setSelectedServices] = useState([]);

    const { doctor } = route.params;

    const [selected, setSelected] = useState("2022-09-13");
    
    //datos para el calendario
    const markedDates = {
      "2025-12-11": { marked: true, dotColor: PrimaryColor },
      "2025-12-13": { selected: true, selectedColor: PrimaryColor, dotColor: PrimaryColor, marked: true },
      "2025-12-20": { marked: true, dotColor: PrimaryColor },
      "2025-12-27": { marked: true, dotColor: PrimaryColor },
    };

    const toggleService = (service) => {
      setSelectedServices(prev =>
        prev.includes(service)
          ? prev.filter(s => s !== service)
          : [...prev, service]
      );
    };

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

        <Image source={{ uri: doctor.image }} style={styles.doctorImage} />

        {/* doctor name and specialty */}
        <View style={styles.doctorName}>
            <Text style={styles.nameDoctor}>{doctor.sex === "female" ? "Dra." : "Dr."} {doctor.name}</Text>
            <Text style={styles.specialityDoctor}>{doctor.specialty}</Text>
        </View>

        {/* services */}
        <View style={styles.contactContainer}>
            <Text style={styles.contactLabel}>Servicios disponibles</Text>

            <View style={styles.contactRow}>
                <Ionicons name="ellipse" size={15} color={PrimaryColor} />
                <Text style={styles.contactText}>Inyecciones</Text>
                <Text style={styles.contactText}>$100</Text>
            </View>

            <View style={styles.contactRow}>
                <Ionicons name="ellipse" size={15} color={PrimaryColor} />
                <Text style={styles.contactText}>Rayos X</Text>
                <Text style={styles.contactText}>$700</Text>
            </View>

            <View style={styles.contactRow}>
                <Ionicons name="ellipse" size={15} color={PrimaryColor} />
                <Text style={styles.contactText}>Ultrasonidos</Text>
                <Text style={styles.contactText}>$650</Text>
            </View>

            <View style={styles.contactRow}>
                <Ionicons name="ellipse" size={15} color={PrimaryColor} />
                <Text style={styles.contactText}>Consulta</Text>
                <Text style={styles.contactText}>$400</Text>
            </View>
        </View>

        {/* contacts */}
        <View style={styles.contactContainer}>
          <Text style={styles.contactLabel}>Solicita tus servicios</Text>

          {["Inyecciones", "Rayos X", "Ultrasonidos", "Consulta"].map(service => (
            <TouchableOpacity
              key={service}
              style={styles.contactRow}
              onPress={() => toggleService(service)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={
                  selectedServices.includes(service)
                    ? "checkbox"
                    : "square-outline"
                }
                size={22}
                color={PrimaryColor}
              />

              <Text style={styles.contactText}>{service}</Text>
            </TouchableOpacity>
          ))}
        </View>


        {/* availability */}
        <View style={styles.contactContainer}>
            <Text style={styles.contactLabel}>Disponibilidad</Text>

            <View style={styles.contactRow}>
                <Text style={styles.contactText}>Lunes a Viernes</Text>
            </View>

            <View style={styles.contactRow}>
                <Text style={styles.contactText}>Matutino</Text>
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
            markedDates={{
              ...markedDates,
              [selected]: { selected: true, selectedColor: PrimaryColor}
            }}
            theme={{
              textMonthFontSize: 22,
              textMonthFontWeight: "bold",
              selectedDayBackgroundColor: "#0A3B74",
              todayTextColor: "#0A3B74",
              dotColor: "#0A3B74",
            }}
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
            <TouchableOpacity style={styles.timeButton}>
              <Text style={styles.timeButtonSelectText}>9:00 AM</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.timeOfButton}>
              <Text style={styles.timeButtonText}>9:30 AM</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.timeOfButton}>
              <Text style={styles.timeButtonText}>10:00 AM</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.timeOfButton}>
              <Text style={styles.timeButtonText}>10:30 AM</Text>
            </TouchableOpacity>
          </View>
          
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.contactLabel}>Total: $400</Text>
        </View>

        {/* button */}
        <TouchableOpacity style={styles.editButton}
          onPress={() =>
          navigation.navigate("Pay", {
            doctor
          })}
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

});

export default RegisterAppointment;