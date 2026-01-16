import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const PrimaryColor = '#0A3B74';

const SelectUser = () => {
  const navigation = useNavigation();
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/*header*/}
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>

            <Image 
            source={require('../../assets/logoDocNow.png')} 
            style={{ width: 30, height: 30, resizeMode: 'contain',}}
            />
        </View>

        {/* Title */}
        <Text style={styles.title}>Comencemos</Text>
        <Text style={styles.subtitle}>Por favor, elige una opción para continuar</Text>

        {/* buttons */}
        <View>
            <TouchableOpacity  style={[
                styles.optionButton,
                selectedRole === 'patient' && styles.optionSelected
            ]
        }
            onPress={() => setSelectedRole('patient')}>
                <Image 
                    source={
                    selectedRole === 'patient'
                        ? require('../../assets/patient_active.png')
                        : require('../../assets/patient_disable.png')
                    }
                    style={styles.icon}
                />
               <View style={styles.textSection}>
                    <Text style={[
                        styles.textOne,
                        selectedRole === 'patient' && styles.textBold
                    ]}>Paciente</Text>
                    <Text style={styles.textTwo}>Registrar paciente</Text>
                </View> 
            </TouchableOpacity>

            <TouchableOpacity style={[
                styles.optionButton,
                selectedRole === 'doctor' && styles.optionSelected
            ]}
            onPress={() => setSelectedRole('doctor')}>
                <Image 
                    source={
                    selectedRole === 'doctor'
                        ? require('../../assets/doctor_active.png')
                        : require('../../assets/doctor_disable.png')
                    }
                    style={styles.icon}
                />
                <View style={styles.textSection}>
                    <Text style={[
                        styles.textOne,
                        selectedRole === 'doctor' && styles.textBold
                    ]}>Doctor</Text>
                    <Text style={styles.textTwo}>Registrar doctor</Text>
                </View>
            </TouchableOpacity>
        </View>


        {/* Button */}
        <TouchableOpacity style={[
            styles.button,
            !selectedRole && { opacity: 0.5 }
        ]}
        disabled={!selectedRole}
        onPress={() => {
            navigation.navigate('RegisterUser', {
            tipo: selectedRole === 'patient' ? 'paciente' : 'doctor'
            });
        }}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scroll: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    header: {
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        position: 'relative',
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: PrimaryColor,
        marginBottom: 25,
    },
    subtitle: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
        marginTop: 5,
        width: '85%',
        alignContent: 'center',
        textAlign: 'center',
    },
    optionButton: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        width: '90%',
        backgroundColor: '#f1f1f1',
        borderRadius: 15,
        marginBottom: 20,
    },
    optionSelected: {
        backgroundColor: '#E6F0FA',
        borderWidth: 1,
        borderColor: PrimaryColor,
    },
    icon: {
        width: 74,
        height: 74,
    },
    textOne: {
        fontSize: 16,
        color: PrimaryColor,
    },
    textBold: {
        fontWeight: 'bold',
    },
    textSection: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    textTwo: {
        fontSize: 15,
        color: '#646464',
    },
    button: {
        marginTop: '50%',
        width: '70%',
        backgroundColor: PrimaryColor,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default SelectUser;