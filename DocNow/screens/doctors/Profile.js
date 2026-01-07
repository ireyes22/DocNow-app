import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PrimaryColor = '#0A3B74';

const Profile = () => {
  const navigation = useNavigation();

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

  const doctor = 
   {
     id: 1,
     image: "https://imgs.search.brave.com/v0d3ARpJSKV9wHsAuyc8XtOSbRI_aw0qQichI5ynE04/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ3/MDUwNTM1MS9waG90/by9wb3J0cmFpdC1v/Zi1hLXNtaWxpbmct/ZG9jdG9yLWhvbGRp/bmctZ2xhc3Nlcy1h/bmQtYS1tb2JpbGUt/cGhvbmUtYXQtdGhl/LW9mZmljZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9T1FY/NlNHMUs1TW4xNWUz/VkVsaTIzTmhKU2J1/NWszai02TXM1b2Nx/QnNIWT0",
     name: "Mario Orantes",
     sex: "male",
     phone: "345353454",
     email: "ejemplo@gmail.com",
     specialty: "consultorio 5",
     clinic: "Consultorio 15",
   };

   //render opinion
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

    return(
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
                </View>

                {/* contacts */}
                <View style={styles.contactContainer}>
                    <View style={styles.contactHeader}>
                        <Text style={styles.contactLabel}>Datos de contacto</Text>

                        {/* float button */}
                        <TouchableOpacity style={styles.floatingButton}>
                            <Ionicons name="create-outline" size={25} color={PrimaryColor} />
                        </TouchableOpacity>
                    </View>
        
                    <View style={styles.contactRow}>
                        <Ionicons name="call-outline" size={20} color={PrimaryColor} />
                        <Text style={styles.contactText}>{doctor.phone}</Text>
                    </View>
        
                    <View style={styles.contactRow}>
                        <Ionicons name="mail-outline" size={20} color={PrimaryColor} />
                        <Text style={styles.contactText}>{doctor.email}</Text>
                    </View>
        
                    <View style={styles.contactRow}>
                        <Ionicons name="business-outline" size={20} color={PrimaryColor} />
                        <Text style={styles.contactText}>{doctor.clinic}</Text>
                    </View>
                </View>

                {/* services */}
                <View style={styles.contactContainer}>
                    <Text style={styles.contactLabel}>Servicios ofertados</Text>
        
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

                {/* ratings*/}
                <View style={styles.contactContainer}>
        
                    <TouchableOpacity style={styles.servicesRow}>
                        <Text style={styles.textServices}>Valoraciones</Text>
                        <Ionicons name="arrow-forward-outline" size={24} color={PrimaryColor} />
                    </TouchableOpacity>
        
                    {ratings.map(renderRating)}
        
                </View>


            </View>
        </ScrollView>
    );
};

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
    contactLabel: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 20,
    },
    contactContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    contactHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    floatingButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EFEFF2',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
});

export default Profile;