import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Settings from '../Settings';
import Rating from './Rating';
import { createStackNavigator } from '@react-navigation/stack';


const PrimaryColor = '#0A3B74';
const SecondaryColor = '#498FC0';

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
  
// pantalla de mis citas
const MyAppointments = () => {

  const [selected, setSelected] = useState("2022-09-13");

  //datos para el calendario
  const markedDates = {
    "2025-12-11": { marked: true, dotColor: PrimaryColor },
    "2025-12-13": { selected: true, selectedColor: PrimaryColor, dotColor: PrimaryColor, marked: true },
    "2025-12-20": { marked: true, dotColor: PrimaryColor },
    "2025-12-27": { marked: true, dotColor: PrimaryColor },
  };

  const appointments = [
    {
      id: 1,
      doctor: "Juan Perez",
      sex: "male",
      image: "https://www.clinicasantiago.com.ec/wp-content/uploads/2024/12/dr_victor_herna.jpg",
      date: "13 Dic. 2025",
      hour: "10:00 AM"
    },
    {
      id: 2,
      doctor: "Maria Lopez",
      sex: "female",
      image: "https://cdn.agenciasinc.es/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/solo-el-8-de-las-medicas-alcanza-puestos-de-responsabilidad-en-hospitales/3405721-5-esl-MX/Solo-el-8-de-las-medicas-alcanza-puestos-de-responsabilidad-en-hospitales.jpg",
      date: "20 Dic. 2025",
      hour: "03:30 PM"
    },
    {
      id: 3,
      doctor: "Araceli Young",
      sex: "female",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPd1ag04qAxUqyFsA1waifXN9eNnce45gdKQ&s",
      date: "27 Dic. 2025",
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
          Dr{item.sex === "female" ? "a" : ""}. {item.doctor} 
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
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
          {/* Calendario */}
          <View style={{ width: '100%' }}>
            <Calendar 
              style={styles.calendar}
              locales={'es'}
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

          {appointments.map(renderAppointment)}

          <StatusBar style="auto" />
        </View>
    </ScrollView>
  );
};

// pantalla de citas archivadas
const ArchivedAppointments = () => {
  const navigation = useNavigation();

  const archivades = [
    {
      id: 1,
      sex: "male",
      doctor: "Juan Perez",
      image: "https://www.clinicasantiago.com.ec/wp-content/uploads/2024/12/dr_victor_herna.jpg",
      service: "Rayos X",
    },
    {
      id: 2,
      sex: "female",
      doctor: "Maria Lopez",
      image: "https://cdn.agenciasinc.es/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/solo-el-8-de-las-medicas-alcanza-puestos-de-responsabilidad-en-hospitales/3405721-5-esl-MX/Solo-el-8-de-las-medicas-alcanza-puestos-de-responsabilidad-en-hospitales.jpg",
      service: "Consulta",
    },
    {
      id: 3,
      sex: "female",
      doctor: "Araceli Young",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPd1ag04qAxUqyFsA1waifXN9eNnce45gdKQ&s",
      service: "Consulta",
    },
    {
      id: 4,
      sex: "female",
      doctor: "María Gonzalez",
      image: "https://www.shutterstock.com/image-photo/smiling-young-african-american-curly-600nw-2319779015.jpg",
      service: "Consulta",
    },
    {
      id: 5,
      sex: "male",
      doctor: "Ernesto Guluarte",
      image: "https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg",
      service: "Rayos X",
    },
    {
      id: 6,
      sex: "female",
      doctor: "Vanessa López",
      image: "https://media.istockphoto.com/id/171296819/es/foto/afroamericana-mujer-m%C3%A9dico-sostiene-un-portapapeles-aislado.jpg?s=612x612&w=0&k=20&c=cy6HdlYoFA_aqpMBV6Yo5Tj01piaQXD4OmBPi2Xj7Xc=",
      service: "Consulta",
    },
  ];

  const renderArchivades = (item) => (
    <View key={item.id} style={styles.archiveCard}>

      {/* info doctor */}
      <View style={styles.doctorInfo}>
        <Image source={{ uri: item.image }} style={styles.archiveImage} />
        <View style={styles.archiveInfo}>
          <Text style={styles.doctorName} numberOfLines={1} ellipsizeMode="tail">
            Dr{item.sex === "female" ? "a" : ""}. {item.doctor} 
          </Text>
          <Text style={styles.serviceText}>{item.service}</Text>
        </View>

      </View>

      {/* boton */}
      <View style={styles.dateInfo}>
        <TouchableOpacity style={styles.evaluateButton} 
         onPress={() =>
          navigation.navigate("Rating", {
            doctor: {
              name: item.doctor,
              image: item.image,
              sex: item.sex,
              service: item.service,
            }
          })} 
        >
          <Text style={styles.evaluateText}>Evaluar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
          
        {archivades.map(renderArchivades)}

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
  calendar: {
    width: '100%',
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
  archiveCard: {
    width: '95%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    borderTopColor: '#a8a6a6ff',
    borderTopWidth: 1,
  },
  archiveInfo: {
    flexDirection: 'column',
    padding: 15,
    flex: 1,
    overflow: 'hidden',
  },
  archiveImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  serviceText: {
    color: '#777',
  },
  evaluateButton: {
    backgroundColor: '#ffff',
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
  },
  evaluateText: {
    color: PrimaryColor,
  },
});

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#fff',}}>
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

      <Tab.Navigator
        initialRouteName ="Mis citas"
        screenOptions={{ 
        headerShown: false,
        tabBarInactiveTintColor: PrimaryColor,
        tabBarActiveTintColor: SecondaryColor,
      }}
      >
        <Tab.Screen name='Mis citas' component={MyAppointments} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name='Archivado' 
          component={ArchivedAppointments} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="archive" color={color} size={size} />
            ),
          }}
        />

      </Tab.Navigator>
    </View>
  );
}

export default MyTabs;