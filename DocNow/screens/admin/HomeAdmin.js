import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PrimaryColor = '#0A3B74';

const HomeAdmin = ( {onLogout} ) => {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            {/*header*/}
            <View style={styles.header}>
                <TouchableOpacity onPress={onLogout}>
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

            <Text style={styles.textDoctors}>Bienvenido!</Text>

            <View>
                <View style={styles.groupButtons}>
                    <TouchableOpacity style={styles.adminButton}  onPress={() => navigation.navigate("SelectUser")}>
                        <Ionicons name="create-outline" size={74} color="white" />
                        <Text style={styles.adminButtonText}>Registrar usuario</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.adminButton} onPress={() => navigation.navigate("PatientAdmin")}>
                        <Image 
                            source={require('../../assets/patients.png')} 
                            style={{ width: 74, height: 74, }}
                        />
                        <Text style={styles.adminButtonText}>Pacientes</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.groupButtons}>
                    <TouchableOpacity style={styles.adminButton} onPress={() => navigation.navigate("DoctorAdmin")}>
                        <Image 
                            source={require('../../assets/doctors.png')} 
                            style={{ width: 74, height: 74 }}
                        />
                        <Text style={styles.adminButtonText}>Médicos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.adminButton} onPress={() => navigation.navigate("Reports")}>
                        <Image 
                            source={require('../../assets/report.png')} 
                            style={{ width: 74, height: 74 }}
                        />
                        <Text style={styles.adminButtonText}>Reportes</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.groupButtons}>
                    <TouchableOpacity style={styles.adminButton} onPress={() => navigation.navigate("Backup")}>
                        <Image 
                            source={require('../../assets/backrest.png')} 
                            style={{ width: 74, height: 74, }}
                        />
                        <Text style={styles.adminButtonText}>Respaldos</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
        marginBottom: 20,
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
    adminButton: {
        backgroundColor: PrimaryColor,
        padding: 5,
        width: 150,
        height: 150,
        borderRadius: 18,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: 20,
    },
    adminButtonText: {
        color: 'white',
        fontSize: 16,
    },
    groupButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        gap: 20,
    },
});

export default HomeAdmin;