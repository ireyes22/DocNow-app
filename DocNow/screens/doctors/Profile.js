import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation} from '@react-navigation/native';
import StarRating from 'react-native-star-rating-widget';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, collection, getDocs, query, where, limit } from 'firebase/firestore';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const PrimaryColor = '#0A3B74';
const DangerColor = "#8B0000";

const Profile = ({ onLogout }) => {
    const navigation = useNavigation();
    const [editMode, setEditMode] = useState(false);
    const [selectedDays, setSelectedDays] = useState("Lunes a viernes");
    const [selectedSchedule, setSelectedSchedule] = useState("Matutino");
    const [doctor, setDoctor] = useState(null);
    const [services, setServices] = useState([
        { nombre: "", precio: "" },
        { nombre: "", precio: "" },
        { nombre: "", precio: "" },
        { nombre: "", precio: "" },
    ]);
    const [ratings, setRatings] = useState([]);

    // guardar los datos editados del doctor
    const saveDoctorData = async () => {
        try {
            const doctorRef = doc(db, "users", auth.currentUser.uid);

            await updateDoc(doctorRef, {
            servicios: services.filter(s => s.nombre && s.precio),
            diasDisponibles: selectedDays,
            horarioDisponible: selectedSchedule,
            });

            alert("Perfil médico guardado");
            setEditMode(false);
        } catch (error) {
            console.error("Error al guardar perfil:", error);
            alert("Error al guardar");
        }
    };

    // cargar datos del doctor de firebase
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) return;

        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            setDoctor(data);

            if (data.servicios) {
                setServices(data.servicios);
            }

            setSelectedDays(data.diasDisponibles || "Lunes a viernes");
            setSelectedSchedule(data.horarioDisponible || "Matutino");
        }

        // Cargar las primeras 3 valoraciones
    try {
      const ratingsQuery = query(
        collection(db, 'opiniones'),
        where('doctorId', '==', user.uid),
        limit(3) // solo las primeras 3
      );

      const snapshot = await getDocs(ratingsQuery);
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

    });

    return () => unsubscribe();
    }, []);

    if (!doctor) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Cargando perfil...</Text>
            </View>
        );
    }

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

                <Image source={{ uri: doctor.photoURL }} style={styles.doctorImage} />

                {/* doctor name and specialty */}
                <View style={styles.doctorName}>
                    <Text style={styles.nameDoctor}>{doctor.sexo === "Femenino" ? "Dra." : "Dr."} {doctor.nombre} {doctor.apellidoPaterno}</Text>
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

                    {!editMode? (
                    <>
                        <>
                        {services.length === 0 ? (
                        <Text style={styles.contactText}>
                            No hay servicios registrados
                        </Text>
                        ) : (
                        services.map((service, index) => (
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
                        )}
                    </>
                    </>
                    ):(
                    <>
                        {services.map((service, index) => (
                        <View key={index} style={styles.serviceRow}>
                            <View style={styles.serviceLeft}>
                            <Ionicons name="ellipse" size={15} color={PrimaryColor} />
                            <TextInput
                                style={styles.inputServices}
                                value={service.nombre}
                                onChangeText={(text) => {
                                const updated = [...services];
                                updated[index].nombre = text;
                                setServices(updated);
                                }}
                            />
                            </View>

                            <TextInput
                            style={styles.inputPrices}
                            value={service.precio}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                const updated = [...services];
                                updated[index].precio = text;
                                setServices(updated);
                            }}
                            />
                        </View>
                        ))}
                    </>
                    )}  
                    
                </View>

                {/* availability */}
                <View style={styles.contactContainer}>
                    {!editMode? (
                    <>
                        <Text style={styles.contactLabel}>Disponibilidad</Text>
                    
                        <View style={styles.contactRow}>
                            <Text style={styles.contactText}>{doctor.diasDisponibles}</Text>
                        </View>
            
                        <View style={styles.contactRow}>
                            <Text style={styles.contactText}>{doctor.horarioDisponible}</Text>
                        </View>
                    </> 
                    ):(
                    <>
                    <View>
                        <Text style={styles.disableContactLabel}>Días disponibles</Text>
                        <TouchableOpacity
                            style={
                            selectedDays === "Lunes a viernes"
                                ? styles.selectButton
                                : styles.unselectButton
                            }
                            onPress={() => setSelectedDays("Lunes a viernes")}
                        >
                            <Text
                            style={
                                selectedDays === "Lunes a viernes"
                                ? styles.selectButtonText
                                : styles.unselectButtonText
                            }
                            >
                            Lunes a viernes
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={
                            selectedDays === "Sábado y domingo"
                                ? styles.selectButton
                                : styles.unselectButton
                            }
                            onPress={() => setSelectedDays("Sábado y domingo")}
                        >
                            <Text
                            style={
                                selectedDays === "Sábado y domingo"
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
                            selectedSchedule === "Matutino"
                                ? styles.selectButton
                                : styles.unselectButton
                            }
                            onPress={() => setSelectedSchedule("Matutino")}
                        >
                            <Text
                            style={
                                selectedSchedule === "Matutino"
                                ? styles.selectButtonText
                                : styles.unselectButtonText
                            }
                            >
                            Matutino
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={
                            selectedSchedule === "Vespertino"
                                ? styles.selectButton
                                : styles.unselectButton
                            }
                            onPress={() => setSelectedSchedule("Vespertino")}
                        >
                            <Text
                            style={
                                selectedSchedule === "Vespertino"
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
                            navigation.navigate("Ratings", {
                                doctorId: auth.currentUser.uid,
                            })
                            }
                        >
                            <Text style={styles.textServices}>Valoraciones</Text>
                            <Ionicons name="arrow-forward-outline" size={24} color={PrimaryColor} />
                        </TouchableOpacity>

                        {ratings.map(r => (
                        <View key={r.id} style={styles.ratingCard}>
                            <Image source={{ uri: r.image }} style={styles.ratingImage} />
                            <View style={styles.ratingContent}>
                            <View style={styles.ratingHeader}>
                                <StarRating rating={r.rating} onChange={() => {}} starSize={16} enableSwiping={false} starStyle={{ marginRight: 2 }} />
                                {r.date && <Text style={styles.ratingDate}>{r.date}</Text>}
                            </View>
                            <Text style={styles.ratingText}>{r.opinion}</Text>
                            </View>
                        </View>
                        ))}
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
                    <TouchableOpacity style={styles.saveButton} onPress={saveDoctorData}>
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