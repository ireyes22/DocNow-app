import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRoute,useNavigation } from '@react-navigation/native';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const PrimaryColor = '#0A3B74';

const CreateNotes = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { patient, doctor } = route.params;

    // Inputs del formulario
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [diagnostico, setDiagnostico] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [tratamiento, setTratamiento] = useState('');

    const guardarNota = async () => {
  if (!diagnostico && !sintomas && !tratamiento) {
    alert('Agrega al menos diagnóstico, síntomas o tratamiento');
    return;
  }

  try {

     // 🔎 1. Verificar si ya existe una nota para esta cita
    const q = query(
      collection(db, 'notas'),
      where('citaId', '==', patient.citaId)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      alert('Esta cita ya tiene una nota registrada');
      return; // ⛔ NO guarda otra
    }
    
    await addDoc(collection(db, 'notas'), {
      citaId: patient.citaId,     

      pacienteId: patient.id, 
      pacienteNombre: patient.name,
      edad: patient.age ?? null,
      fechaCita: patient.date,

      doctorId: doctor.id,
      doctorNombre: doctor.nombre,
      clinic: doctor.clinic,

      peso: peso ? Number(peso) : null,
      altura: altura ? Number(altura) : null,

      diagnostico: diagnostico || '',
      sintomas: sintomas || '',
      tratamiento: tratamiento || '',

      createdAt: Timestamp.now(),
    });

    alert('Nota guardada correctamente');
    navigation.goBack();
  } catch (error) {
    console.error('Error al guardar nota:', error);
    alert('Error al guardar la nota');
  }
};

// console.log("PACIENTE ID:", patient.id);
// console.log("CITA ID:", patient.citaId);

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
                        <Text style={styles.contactText}>{patient.date}</Text>
                    </View>

                    <View style={styles.contactRow}>
                        <Text style={styles.contactLabel}>Nombre:</Text>
                        <Text style={styles.contactText}>{patient.name}</Text>
                    </View>
                    
                    <View style={styles.contactRow}>
                        <Text style={styles.contactLabel}>Edad:</Text>
                        <Text style={styles.contactText}>{patient.age}</Text>
                    </View>

                    <View style={styles.contactRow}>
                        <Text style={styles.contactLabel}>Consultorio:</Text>
                        <Text style={styles.contactText}>{doctor.clinic}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.half}>
                        <Text style={styles.label}>Peso(kg)</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={peso}
                            onChangeText={setPeso}
                        />
                    </View>

                    <View style={styles.half}>
                        <Text style={styles.label}>Altura(cm)</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={altura}
                            onChangeText={setAltura}
                        />
                    </View>
                </View>

                <Text style={styles.label}>Diagnóstico</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    multiline={true}
                    ellipsizeMode="tail"
                    scrollEnabled={true}  
                    value={diagnostico}
                    onChangeText={setDiagnostico}
                />

                <Text style={styles.label}>Sintomas</Text>
                <TextInput
                    style={styles.inputBig}
                    keyboardType="default"
                    multiline={true}
                    scrollEnabled={true}
                    value={sintomas}
                    onChangeText={setSintomas}
                />

                <Text style={styles.label}>Tratamiento</Text>
                <TextInput
                    style={styles.inputBig}
                    keyboardType="default"
                    placeholder='Añadir indicaciones...'
                    multiline={true}
                    scrollEnabled={true}  
                    value={tratamiento}
                    onChangeText={setTratamiento}
                />

                <TouchableOpacity style={styles.sendButton} onPress={guardarNota}>
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
});

export default CreateNotes;