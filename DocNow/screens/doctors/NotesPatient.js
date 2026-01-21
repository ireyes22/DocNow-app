import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRoute,useNavigation } from '@react-navigation/native';
import { addDoc, collection, Timestamp, getDocs, query, where  } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const PrimaryColor = '#0A3B74';

const NotesPatient = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { patient, doctor } = route.params;
    const [nota, setNota] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchNota = async () => {
        try {
        const q = query(
            collection(db, 'notas'),
            where('pacienteId', '==', route.params.pacienteId)
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            setNota(snapshot.docs[0].data());
        }
        } catch (error) {
        console.error('Error al cargar nota:', error);
        } finally {
        setLoading(false);
        }
    };

    fetchNota();
    }, []);

    if (loading) {
    return (
        <View style={styles.container}>
        <Text>Cargando nota...</Text>
        </View>
    );
    }

    if (!nota) {
    return (
        <View style={styles.container}>
        <Text>No hay notas registradas</Text>
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
        
                <Image 
                    source={require('../../assets/logoDocNow.png')} 
                    style={{ width: 30, height: 30 }}
                />
        
                <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                    <Ionicons name="settings-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <Text style={styles.textDoctors}>Notas de consulta</Text>

            <View style={styles.form}>
                <View style={styles.contactContainer}>
                    <View style={styles.contactRow}>
                        <Text style={styles.contactLabel}>Fecha:</Text>
                        <Text style={styles.contactText}>{nota.fechaCita}</Text>
                    </View>

                    <View style={styles.contactRow}>
                        <Text style={styles.contactLabel}>Nombre:</Text>
                        <Text style={styles.contactText}>{nota.pacienteNombre}</Text>
                    </View>
                    
                    <View style={styles.contactRow}>
                        <Text style={styles.contactLabel}>Edad:</Text>
                        <Text style={styles.contactText}>{nota.edad}</Text>
                    </View>

                    <View style={styles.contactRow}>
                        <Text style={styles.contactLabel}>Consultorio:</Text>
                        <Text style={styles.contactText}>{nota.clinic}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.half}>
                        <Text style={styles.label}>Peso(kg)</Text>
                        <Text style={styles.readText}>{nota.peso ?? '—'}</Text>
                    </View>

                    <View style={styles.half}>
                        <Text style={styles.label}>Altura(cm)</Text>
                        <Text style={styles.readText}>{nota.altura ?? '—'}</Text>
                    </View>
                </View>

                <Text style={styles.label}>Diagnóstico</Text>
                <Text style={styles.readText}>{nota.diagnostico}</Text>

                <Text style={styles.label}>Sintomas</Text>
                <Text style={styles.readText}>{nota.sintomas}</Text>

                <Text style={styles.label}>Tratamiento</Text>
                <Text style={styles.readText}>{nota.tratamiento}</Text>

                <TouchableOpacity style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Guardar nota</Text>
                </TouchableOpacity>
        
                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>

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
    scroll: {
    flexGrow: 1,
  },
    header: {
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 50, 
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 30,
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
      form: {
        width: '90%',
    },
    input: {
        height: 45,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#CBCBCB',
        textAlignVertical: "top",
    },
    inputBig: {
        height: 100,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#CBCBCB',
        textAlignVertical: "top",
    },
    contactLabel: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    contactContainer: {
        marginTop: 10,
        gap: 10,
    },
    contactRow: {
        flexDirection: 'row',
    },
     contactText: {
        marginLeft: 8,
        fontSize: 14,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    half: {
        width: '48%',
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 6,
        marginTop: 15,
    },
    sendButton: {
        marginTop: 25,
        width: "90%",
        backgroundColor: PrimaryColor,
        padding: 15,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: "center",
    },
    sendButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    cancelButton: {
        marginTop: 20,
        width: "90%",
        borderRadius: 10,
        padding: 15,
        borderWidth: 2,
        borderColor: PrimaryColor,
        alignItems: "center",
        alignSelf: 'center',
        marginBottom: 20, 
    },
    cancelButtonText: {
        color: PrimaryColor,
        fontSize: 18,
        fontWeight: "600",
    },
    readText: {
        backgroundColor: '#F2F2F2',
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CBCBCB',
    }
});

export default NotesPatient;