import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {  useRoute, useNavigation} from '@react-navigation/native';

const PrimaryColor = '#0A3B74';
const DangerColor = "#8B0000";

const Profile = ({ onLogout }) => {
    const navigation = useNavigation();
    const [editMode, setEditMode] = useState(false);
    const [selectedDays, setSelectedDays] = useState("lunes");
    const [selectedSchedule, setSelectedSchedule] = useState("matutino");
    const route = useRoute();
    // const { patient } = route.params;

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

                        {!editMode && (
                            <TouchableOpacity
                                style={styles.floatingButton}
                                onPress={() => setEditMode(true)}
                            >
                                <Ionicons name="create-outline" size={25} color={PrimaryColor} />
                            </TouchableOpacity>
                        )}
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
                    <View style={styles.servicesHeader}>
                        <Text style={styles.contactLabel}>Servicios ofertados</Text>
                        <Text style={styles.contactLabel}>Costo</Text>
                    </View>

                    {!editMode? (
                    <>
                        <View style={styles.serviceRow}>
                            <View style={styles.serviceLeft}>
                                <Ionicons name="ellipse" size={12} color={PrimaryColor} />
                                <Text style={styles.contactText}>Inyecciones</Text>
                            </View>

                            <Text style={styles.contactText}>$100</Text>
                        </View>

                        <View style={styles.serviceRow}>
                            <View style={styles.serviceLeft}>
                                <Ionicons name="ellipse" size={12} color={PrimaryColor} />
                                <Text style={styles.contactText}>Ultrasonido</Text>
                            </View>

                            <Text style={styles.contactText}>$650</Text>
                        </View>

                        <View style={styles.serviceRow}>
                            <View style={styles.serviceLeft}>
                                <Ionicons name="ellipse" size={12} color={PrimaryColor} />
                                <Text style={styles.contactText}>Rayos X</Text>
                            </View>

                            <Text style={styles.contactText}>$700</Text>
                        </View>

                        <View style={styles.serviceRow}>
                            <View style={styles.serviceLeft}>
                                <Ionicons name="ellipse" size={12} color={PrimaryColor} />
                                <Text style={styles.contactText}>Consulta</Text>
                            </View>

                            <Text style={styles.contactText}>$400</Text>
                        </View>
                    </>
                    ):(
                    <>
                        <View style={styles.serviceRow}>
                            <View style={styles.serviceLeft}>
                                <Ionicons name="ellipse" size={15} color={PrimaryColor} />
                            <TextInput
                                style={styles.inputServices}
                                keyboardType="default"
                                multiline={true}
                                ellipsizeMode="tail"
                                scrollEnabled={true}  
                            />

                            </View>

                            <TextInput
                                style={styles.inputPrices}
                                keyboardType="numbers-and-punctuation"
                                multiline={true}
                                ellipsizeMode="tail"
                                scrollEnabled={true}  
                            />
                        </View>

                        <View style={styles.serviceRow}>
                            <View style={styles.serviceLeft}>
                                <Ionicons name="ellipse" size={15} color={PrimaryColor} />
                            <TextInput
                                style={styles.inputServices}
                                keyboardType="default"
                                multiline={true}
                                ellipsizeMode="tail"
                                scrollEnabled={true}  
                            />

                            </View>

                            <TextInput
                                style={styles.inputPrices}
                                keyboardType="numbers-and-punctuation"
                                multiline={true}
                                ellipsizeMode="tail"
                                scrollEnabled={true}  
                            />
                        </View>

                        <View style={styles.serviceRow}>
                            <View style={styles.serviceLeft}>
                                <Ionicons name="ellipse" size={15} color={PrimaryColor} />
                            <TextInput
                                style={styles.inputServices}
                                keyboardType="default"
                                multiline={true}
                                ellipsizeMode="tail"
                                scrollEnabled={true}  
                            />

                            </View>

                            <TextInput
                                style={styles.inputPrices}
                                keyboardType="numbers-and-punctuation"
                                multiline={true}
                                ellipsizeMode="tail"
                                scrollEnabled={true}  
                            />
                        </View>
            
                        <View style={styles.serviceRow}>
                            <View style={styles.serviceLeft}>
                                <Ionicons name="ellipse" size={15} color={PrimaryColor} />
                            <TextInput
                                style={styles.inputServices}
                                keyboardType="default"
                                multiline={true}
                                ellipsizeMode="tail"
                                scrollEnabled={true}  
                            />

                            </View>

                            <TextInput
                                style={styles.inputPrices}
                                keyboardType="numbers-and-punctuation"
                                multiline={true}
                                ellipsizeMode="tail"
                                scrollEnabled={true}  
                            />
                        </View>
                    </>
                    )}  
                    
                </View>

                {/* availability */}
                <View style={styles.contactContainer}>
                    {!editMode? (
                    <>
                        <Text style={styles.contactLabel}>Disponibilidad</Text>
                    
                        <View style={styles.contactRow}>
                            <Text style={styles.contactText}>Lunes a Viernes</Text>
                        </View>
            
                        <View style={styles.contactRow}>
                            <Text style={styles.contactText}>Matutino</Text>
                        </View>
                    </> 
                    ):(
                    <>
                    <View>
                        <Text style={styles.disableContactLabel}>Días disponibles</Text>
                        <TouchableOpacity
                            style={
                            selectedDays === "lunes"
                                ? styles.selectButton
                                : styles.unselectButton
                            }
                            onPress={() => setSelectedDays("lunes")}
                        >
                            <Text
                            style={
                                selectedDays === "lunes"
                                ? styles.selectButtonText
                                : styles.unselectButtonText
                            }
                            >
                            Lunes a viernes
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={
                            selectedDays === "fin"
                                ? styles.selectButton
                                : styles.unselectButton
                            }
                            onPress={() => setSelectedDays("fin")}
                        >
                            <Text
                            style={
                                selectedDays === "fin"
                                ? styles.selectButtonText
                                : styles.unselectButtonText
                            }
                            >
                            Sábado y domingo
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.disableContactLabel}>Horario</Text>
                        <TouchableOpacity
                            style={
                            selectedSchedule === "matutino"
                                ? styles.selectButton
                                : styles.unselectButton
                            }
                            onPress={() => setSelectedSchedule("matutino")}
                        >
                            <Text
                            style={
                                selectedSchedule === "matutino"
                                ? styles.selectButtonText
                                : styles.unselectButtonText
                            }
                            >
                            Matutino
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={
                            selectedSchedule === "vespertino"
                                ? styles.selectButton
                                : styles.unselectButton
                            }
                            onPress={() => setSelectedSchedule("vespertino")}
                        >
                            <Text
                            style={
                                selectedSchedule === "vespertino"
                                ? styles.selectButtonText
                                : styles.unselectButtonText
                            }
                            >
                            Vespertino
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </>
                    )}
                </View>

                {/* ratings*/}
                {!editMode && (
                    <View style={styles.contactContainer}>
            
                        <TouchableOpacity style={styles.servicesRow}
                            onPress={() =>
                                navigation.navigate("Ratings", { ratings })
                            }
                        >
                            <Text style={styles.textServices}>Valoraciones</Text>
                            <Ionicons name="arrow-forward-outline" size={24} color={PrimaryColor} />
                        </TouchableOpacity>
            
                        {ratings.map(renderRating)}
            
                    </View>
                )}

                {/*buttoms*/}
                {!editMode ? (
                <>
                    <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                    <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
                    </TouchableOpacity>
                </>
                ) : (
                <>
                    <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Guardar</Text>
                    </TouchableOpacity>
        
                    <TouchableOpacity style={styles.cancelButton} onPress={() => setEditMode(false)}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </>
                )}

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
    logoutButton: {
        marginTop: 15,
        width: "90%",
        borderRadius: 10,
        padding: 15,
        borderWidth: 2,
        borderColor: DangerColor,
        alignItems: "center",
        alignContent: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },
    logoutButtonText: {
        color: DangerColor,
        fontSize: 18,
        fontWeight: "600",
    },
    saveButton: {
        marginTop: 35,
        width: "90%",
        backgroundColor: PrimaryColor,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        alignContent: 'center',
        alignSelf: 'center',
   },
   saveButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
   },
    cancelButton: {
        marginTop: 15,
        width: "90%",
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: PrimaryColor,
        alignItems: "center",
        alignContent: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },
    cancelButtonText: {
        color: PrimaryColor,
        fontSize: 18,
        fontWeight: "600",
    },
    selectButton: {
        marginTop: 12,
        width: "100%",
        backgroundColor: PrimaryColor,
        padding: 12,
        borderRadius: 10,
        alignContent: 'center',
        alignSelf: 'center',
   },
   selectButtonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
   },
   unselectButton: {
        marginTop: 12,
        width: "100%",
        backgroundColor: '#EEEEEE',
        padding: 12,
        borderRadius: 10,
        alignContent: 'center',
        alignSelf: 'center',
   },
   unselectButtonText: {
        color: "#000000",
        fontSize: 15,
        fontWeight: "600",
   },
   disableContactLabel: {
        color: "#919191",
        fontSize: 15,
        marginTop: 20,
    },
    inputPrices: {
        height: 45,
        width: "20%",
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#CBCBCB',
        textAlignVertical: "top",
    },
    inputServices: {
        height: 45,
        width: "70%",
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#CBCBCB',
        textAlignVertical: "top",
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

export default Profile;