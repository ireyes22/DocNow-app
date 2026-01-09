import React, { useState }  from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

const PrimaryColor = '#0A3B74';

const SeeNotes = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { patient } = route.params;

  return(
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
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

            <Text style={styles.textDoctors}>{patient.name}</Text>

            <View style={styles.archiveCard}>
                {/* info doctor */}
                <View style={styles.doctorInfo}>
                    <Ionicons name="documents" size={100} color={PrimaryColor} style={styles.archiveImage} />
                    <View style={styles.archiveInfo}>
                    <Text style={styles.doctorName} numberOfLines={2} ellipsizeMode="tail">
                        {patient.date}
                    </Text>
                    <Text style={styles.doctorService}>{patient.service}</Text>
                    </View>
            
                </View>
            
                {/* boton */}
                <View style={styles.groupButtons}>
                    <View style={styles.dateInfo}>
                    <TouchableOpacity style={styles.evaluateButton} >
                        <Text style={styles.evaluateText}>Ver</Text>
                    </TouchableOpacity>
                    </View>
                </View>

            </View>
            </ScrollView>

            <TouchableOpacity style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Reespaldar</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
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
    scroll: {
        flexGrow: 1,
        paddingBottom: 120,
    },
    textDoctors: {
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: 10,
        color: PrimaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 20,
    },
    doctorService: {
      color: '#8F90A6',
    },
    archiveCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    archiveInfo: {
        flexDirection: 'column',
        padding: 15,
        flex: 1,
        overflow: 'hidden',
    },
    doctorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    doctorName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    archiveImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginLeft: 10,
    },
    evaluateButton: {
        backgroundColor: PrimaryColor,
        paddingVertical: 8, 
        paddingHorizontal: 20,
        borderRadius: 10,
        borderColor: PrimaryColor,
        borderWidth: 1,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginRight: 10,
    },
    evaluateText: {
        color: '#fff',
    },
    groupButtons: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    sendButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: PrimaryColor,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 5,
    },
    sendButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});

export default SeeNotes;
